/**
 * Private route is used to render the Components which are protected
 * PROPS:- routeItem( Route of the particular component)
 *         children(Component to render)
 * This component is also responsible to login to keycloak
 */
import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Routes as RoutesConfig} from '@/routes';
import {useAppDispatch, useAppSelector} from '../redux/redux-hooks';

import Keycloak from 'keycloak-js';
import {
  getUserPermissions,
  setCsrfToken,
  setKeycloakData,
  tokenRefreshed,
  setSelectedRole,
} from '../actions';
import * as Sentry from '@sentry/react';
import {
  TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_TIME,
  USER_ID,
  USER_SELECTED_ROLE,
  SELECTED_ROLE_NAME,
  DIRECT_PATH,
  LAST_SELECTED_ROLE,
  CURRENT_USER,
  TARGET,
  SECURE_TOKEN,
  ROLES,
} from '../constants';
import {secureLocalStorage} from '@/services/web.storage';
import RouteComponent from './RouteComponent';
import {
  checkIfRouteIsProtected,
  decodeToken,
  forceLogout,
  queryStringStringify,
} from '@/services/utility';

const PrivateRoute = ({routeItem, children}) => {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userPermissions = useAppSelector((state) => state.app.userPermissions);

  const history = useNavigate();
  const location = useLocation();

  /**
   * This UseEffects triggers the keycloak init function for login and keeps checking for token expiry and when token is expired
   * it triggers the update token logic.
   */
  useEffect(() => {
    const realm = import.meta.env.VITE_REALM;
    const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
    const clientId = import.meta.env.VITE_CLIENT_ID;

    let initOptions = {
      realm: realm,
      url: keycloakUrl,
      clientId: clientId,
      checkLoginIframe: false,
      onLoad: 'login-required',
    };
    if (!isAuthenticated) {
      let keycloak = new Keycloak(initOptions);
      keycloak
        .init({onLoad: initOptions.onLoad})
        .then((auth) => {
          if (!auth) {
            // console.log('CHECK+>', auth);
            window.location.reload();
            // Pasted this here from below and commented the below
            secureLocalStorage.removeItem(USER_SELECTED_ROLE);
            secureLocalStorage.removeItem(USER_ID);
            secureLocalStorage.removeItem(CURRENT_USER);
            Sentry.configureScope((scope) => scope.setUser(null));

            localStorage.removeItem(DIRECT_PATH);
          }
          //remove secureLocalStorage related to user before login

          const directPath = window.location.pathname;
          const url = new URL(window.location.href);
          if (directPath === '/secured-forward') {
            const parameterValue1 = url.searchParams.get('target');
            const parameterValue2 = url.searchParams.get('token');
            secureLocalStorage.setItem(TARGET, parameterValue1);
            secureLocalStorage.setItem(SECURE_TOKEN, parameterValue2);
          }
          localStorage.setItem(DIRECT_PATH, directPath);
          dispatch(setCsrfToken());

          /**
           * Commented this here from pasted above in if !auth condition.
           * This was causing USER_SELECTED_ROLE value to always gets null when page is refreshed.
           * Hence, user is always navigating to default route if single role is assigned
           * or if multiple roles are assigned to the logged in user - navigating to user-roles dropdown page.
           * */
          // secureLocalStorage.removeItem(USER_SELECTED_ROLE);
          //Token Refresh
          const reactToken = secureLocalStorage.getItem(TOKEN);
          if (auth && reactToken) {
            const userId = secureLocalStorage.getItem(USER_ID);
            // if (!masterData) dispatch(getMasterData());
            const selectedRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
            const selectedRoleName =
              secureLocalStorage.getItem(SELECTED_ROLE_NAME);
            dispatch(setSelectedRole(selectedRole, selectedRoleName));
            if (userId && !userPermissions) dispatch(getUserPermissions());
          }

          const interval = setInterval(() => {
            /** New Logic to fetch the refresh token */
            try {
              const keycloakInstance = window.keycloak;
              // const isTokenExpired = keycloakInstance.isTokenExpired();

              // console.log('KEYCLOAK=>', keycloakInstance);
              const timeSkew = keycloakInstance.timeSkew;
              const tokenExp = keycloakInstance.tokenParsed.exp;
              const refreshToken = keycloakInstance.refreshToken;
              const currentTime = new Date().getTime();
              const validTokenTimeInSeconds = Math.round(
                tokenExp + timeSkew - currentTime / 1000
              );
              const isRefreshRequired = validTokenTimeInSeconds <= 0;

              const isRefreshTokenValid =
                Math.round(
                  keycloakInstance.refreshTokenParsed.exp +
                    timeSkew -
                    currentTime / 1000
                ) > 0
                  ? true
                  : false;
              // console.log('isTokenExpired=>', isTokenExpired);
              // console.log('isRefreshTokenValid=>', isRefreshTokenValid);
              // console.log('validTokenTimeInSeconds=>', isRefreshRequired);
              if (isRefreshRequired && isRefreshTokenValid) {
                const myHeaders = new Headers();
                myHeaders.append(
                  'Content-Type',
                  'application/x-www-form-urlencoded'
                );

                const reqData = queryStringStringify({
                  client_id: clientId,
                  grant_type: 'refresh_token',
                  refresh_token: refreshToken,
                });

                const requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: reqData,
                  redirect: 'follow',
                };

                const tokenUrl = `${keycloakUrl}realms/${realm}/protocol/openid-connect/token`;
                fetch(tokenUrl, requestOptions)
                  .then((response) => response.text())
                  .then((result) => {
                    const responseData = JSON.parse(result);
                    const access_token = responseData?.access_token;
                    const refresh_token = responseData?.refresh_token;
                    secureLocalStorage.setItem(TOKEN, access_token);
                    secureLocalStorage.setItem(REFRESH_TOKEN, refresh_token);
                    const parsedLatestToken = decodeToken(access_token);
                    const parsedLatestRefreshToken = decodeToken(refresh_token);
                    const newKeycloakInstance = {...keycloakInstance};
                    newKeycloakInstance.tokenParsed = parsedLatestToken;
                    newKeycloakInstance.refreshTokenParsed =
                      parsedLatestRefreshToken;
                    delete window.keycloak;
                    window.keycloak = newKeycloakInstance;
                    setKeycloakData(newKeycloakInstance);
                    // console.log('newKey', newKeycloakInstance);
                    // console.log('Keycloak=>', keycloak);
                    dispatch(tokenRefreshed());
                  })
                  .catch((error) => {
                    console.log('Failed to Refresh token=>', error);
                    clearInterval(interval);
                    forceLogout();
                  });
              } else {
                // console.log(
                //   'Token not refreshed, valid for ' +
                //     Math.round(tokenExp + timeSkew - currentTime / 1000) +
                //     ' seconds'
                // );
              }
            } catch (error) {
              // debugger;
              console.log('FAILED TO REFRESH THE TOKEN=>', error);
              //In case of error it clears the interval
              clearInterval(interval);
              forceLogout();
            }
            //Commenting the update token logic since it was not working

            // keycloak
            //   .updateToken(TOKEN_MIN_VALIDITY)
            //   .then((refreshed) => {
            //     if (refreshed) {
            //       secureLocalStorage.setItem(TOKEN, keycloak.token);
            //       secureLocalStorage.setItem(
            //         REFRESH_TOKEN,
            //         keycloak.refreshToken
            //       );
            //       console.log('Token refreshed ' + refreshed);
            //     } else {
            //       console.log(
            //         'Token not refreshed, valid for ' +
            //           Math.round(
            //             keycloak.tokenParsed.exp +
            //               keycloak.timeSkew -
            //               new Date().getTime() / 1000
            //           ) +
            //           ' seconds'
            //       );
            //     }
            //   })
            //   .catch(() => {
            //     console.log('Failed to refresh token');
            //   });
          }, REFRESH_TOKEN_TIME);
          //load user profile
          keycloak.loadUserInfo().then((userProfile) => {
            auth && setIsAuthenticated(true);
            Sentry.setUser({email: userProfile?.email});
            secureLocalStorage.setItem(USER_ID, userProfile.sub);
            secureLocalStorage.setItem(
              CURRENT_USER,
              JSON.stringify(userProfile)
            );
            secureLocalStorage.setItem(TOKEN, keycloak.token);
            secureLocalStorage.setItem(REFRESH_TOKEN, keycloak.refreshToken);
            const userRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
            dispatch(setKeycloakData(keycloak));
            dispatch(setCsrfToken());
            // if (!masterData) dispatch(getMasterData());
            window.keycloak = keycloak;
            /** if role is not selected by user - navigate user to user roles path */
            !userRole && history(RoutesConfig.UserRoles.path);
          });
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, [isAuthenticated, history, setKeycloakData]);

  /**
   * Redirect Logic Function helps to make a decision in which route should be redirect to
   * @param {String} defaultRoute
   * @param {String} selectedRole
   */
  const redirectLogic = (
    defaultRoute,
    selectedRole,
    selectedRoleName,
    userPermissions
  ) => {
    if (selectedRole && selectedRoleName) {
      const lastSelectedRole = secureLocalStorage.getItem(LAST_SELECTED_ROLE);
      // const lastRouteVisited = localStorage.getItem(LAST_ROUTE_VISITED);
      const isMangoExecutiveOrFinance =
        selectedRoleName === ROLES.MANGO_EXECUTIVE ||
        selectedRoleName === ROLES.FINANCE;
      // const isDoctor = selectedRole === '4';
      const isPatient = selectedRoleName === ROLES.PATIENT;
      const isApplicant = selectedRoleName === ROLES.APPLICANT;
      const isPatientOrApplicant = isPatient || isApplicant;
      const isCorrectRole =
        isPatient || isApplicant || isMangoExecutiveOrFinance;
      const directPath = localStorage.getItem(DIRECT_PATH);
      const isSecuredPath =
        directPath &&
        directPath.includes('secured-forward') &&
        isMangoExecutiveOrFinance;

      if (
        userPermissions &&
        !userPermissions.flags.profileUpdated &&
        isPatientOrApplicant
      ) {
        const requiredPathName = isPatient
          ? RoutesConfig.CompleteProfile.path
          : isApplicant
          ? RoutesConfig.CompleteProfileApplicant.path
          : defaultRoute;

        history(requiredPathName, {state: {selectedRole}});
      } else {
        if (
          (directPath !== '/' &&
            selectedRole === lastSelectedRole &&
            isCorrectRole) ||
          isSecuredPath
        ) {
          const isProtected = checkIfRouteIsProtected(
            userPermissions,
            directPath
          );

          if (!isProtected) history(defaultRoute);
          else history(directPath);
        } else history(defaultRoute);
      }
    }
  };

  useEffect(() => {
    if (userPermissions) {
      // console.log('USER PERMISSION=>', userPermissions);
      const selectedRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
      const selectedRoleName = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
      dispatch(setSelectedRole(selectedRole, selectedRoleName));
      const currentRoute = location.pathname;
      const defaultRoute =
        userPermissions.roleDataMap[selectedRole]?.defaultRoute?.url;

      /*
            If default route is not equal to current route then this will be fired.
            It will check if the profile is updated or no only for patient and applicant and for other it will redirect to their default route.
            For applicant and patient newly added it will redirect to complete profile page
          */
      const isPatient = selectedRoleName === ROLES.PATIENT;
      const isApplicant = selectedRoleName === ROLES.APPLICANT;
      if (defaultRoute !== currentRoute) {
        const isProfileUpdated = userPermissions?.flags?.profileUpdated;
        if (isProfileUpdated) {
          redirectLogic(
            defaultRoute,
            selectedRole,
            selectedRoleName,
            userPermissions
          );
        } else if (isPatient || isApplicant) {
          history(
            isPatient
              ? RoutesConfig.CompleteProfile.path
              : RoutesConfig.CompleteProfileApplicant.path,
            {state: {selectedRole}}
          );
        } else {
          redirectLogic(
            defaultRoute,
            selectedRole,
            selectedRoleName,
            userPermissions
          );
        }
      }
    }
  }, [userPermissions]);

  return <RouteComponent routeItem={routeItem}>{children}</RouteComponent>;
};

export default PrivateRoute;
