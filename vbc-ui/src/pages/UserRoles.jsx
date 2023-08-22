/**
 * This Component used to render options of roles for the user who have multiple roles assigned.
 * Based on the role selected user will have default landing url for that role
 * IMPORTANT:
 * showLoader, toast, redirectTo, userPermissions are required
 */
import React, {useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {useTranslation} from 'react-i18next';
import {Routes} from '@/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  getApplicantOverview,
  getUserPermissions,
  setSelectedRole,
  setToast,
} from '@/actions';
import {Container, Image, Dropdown} from '@themesberg/react-bootstrap';
import {MangoCancerCareSVG} from '@/assets/images';
import {ProfileIcon} from '@/assets/icons';
import {
  USER_SELECTED_ROLE,
  SELECTED_ROLE_NAME,
  LAST_SELECTED_ROLE,
  USER_THEME,
  ROLES,
  DIRECT_PATH,
  ROLE_ID_MAP,
} from '../constants';

import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {forceLogout} from '@/services/utility';
import {secureLocalStorage} from '@/services/web.storage';
import {useNavigate} from 'react-router-dom';

const UserRoles = () => {
  const {t} = useTranslation(['newPatient']);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [dropdownConfig, setDropdownConfig] = useState({
    show: false,
    dropdownValues: null,
  });
  const {userPermissions} = useAppSelector((state) => state.app);
  const keycloak = useAppSelector((state) => state.app.keycloak);
  // const masterData = useAppSelector((state) => state.template.masterData);

  /**
   * get user permissions
   * by callling admin permissions api app action
   */
  useEffect(() => {
    if (keycloak && !userPermissions) {
      dispatch(getUserPermissions());
      // if (!masterData) dispatch(getMasterData());
    }
  }, [dispatch, userPermissions, keycloak]);

  /** format roles after getting response from permissions api */
  useEffect(() => {
    if (userPermissions) {
      const {roles, flags} = userPermissions;
      const dropdownValues = formatRoles(roles);
      if (dropdownValues.length === 1) {
        /**
         * this means that user is only assigned with one role -
         * becuase dropdownValues array contains one additional object
         * of placeholder - {value: 0, label: 'Select Role'}
         */
        const userDefaultSelectedRole = dropdownValues[0].value;
        const userDefaultTheme = dropdownValues[0].module;
        const userDefaultRoleName = roles[userDefaultSelectedRole].roleName;
        if (
          parseInt(userDefaultSelectedRole) === ROLE_ID_MAP[ROLES.APPLICANT] &&
          roles[userDefaultSelectedRole].roleName === ROLES.APPLICANT
        ) {
          dispatch(getApplicantOverview());
        }
        secureLocalStorage.setItem(USER_SELECTED_ROLE, userDefaultSelectedRole);
        secureLocalStorage.setItem(SELECTED_ROLE_NAME, userDefaultRoleName);
        dispatch(setSelectedRole(userDefaultSelectedRole, userDefaultRoleName));
        const selectedRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
        const lastSelectedRole = secureLocalStorage.getItem(LAST_SELECTED_ROLE);
        localStorage.setItem(USER_THEME, userDefaultTheme);
        let pathToNavigate =
          userPermissions.roleDataMap[userDefaultSelectedRole].defaultRoute.url;
        const isPatient = userDefaultRoleName === ROLES.PATIENT;
        const isApplicant = userDefaultRoleName === ROLES.APPLICANT;
        const isMangoExecutiveOrFinance =
          userDefaultRoleName === ROLES.MANGO_EXECUTIVE ||
          userDefaultRoleName === ROLES.FINANCE;
        const isCorrectRole = isPatient || isApplicant;
        const directPath = localStorage.getItem(DIRECT_PATH);
        const isSecuredPath =
          directPath &&
          directPath.includes('secured-forward') &&
          isMangoExecutiveOrFinance;
        // console.log('PATH TO NAVIGATE=>', pathToNavigate);
        // console.log('directPath=>', directPath);

        if (
          (directPath !== '/' &&
            selectedRole === lastSelectedRole &&
            isCorrectRole) ||
          isSecuredPath
        )
          pathToNavigate = directPath;

        if (flags.profileUpdated) {
          history(pathToNavigate);
        } else {
          const requiredPathName = isPatient
            ? Routes.CompleteProfile.path
            : isApplicant
            ? Routes.CompleteProfileApplicant.path
            : pathToNavigate;
          history(requiredPathName, {state: {selectedRole}});
        }
      } else if (dropdownValues.length > 1) {
        /**
         * user is assigned to multiple roles
         */
        setDropdownConfig({show: true, dropdownValues: dropdownValues});
      } else {
        /** user is not assigned to any role */
        dispatch(setToast('User is not authorized', true, 'warning'));
        setTimeout(() => {
          forceLogout();
        }, 3000);
      }
    }
  }, [userPermissions, history, dispatch]);

  /**
   * converts roles object coming from api
   * in dropdown object format
   */
  const formatRoles = (roles) => {
    let dropdownValues = [];
    for (let i in roles) {
      const roleConfig = {
        value: i,
        label: roles[i].roleName,
        module: roles[i].moduleName,
      };
      dropdownValues = [...dropdownValues, roleConfig];
    }
    return dropdownValues;
  };

  /**
   * get user selected dropdown value.
   * Save user selected role in browser local storage and
   * navigate user to selected role default page
   */
  const handleDropdownSelection = (event) => {
    const value = event.target.value;
    const {flags, roles} = userPermissions;
    const roleName = roles[value].roleName;
    const moduleName = roles[value].moduleName;
    secureLocalStorage.setItem(USER_SELECTED_ROLE, value);
    secureLocalStorage.setItem(SELECTED_ROLE_NAME, roleName);
    dispatch(setSelectedRole(value, roleName));
    localStorage.setItem(USER_THEME, moduleName);
    if (roleName === ROLES.APPLICANT) dispatch(getApplicantOverview());
    const isPatient = roleName === ROLES.PATIENT;
    const isApplicant = roleName === ROLES.APPLICANT;
    const isMangoExecutiveOrFinance =
      roleName === ROLES.MANGO_EXECUTIVE || roleName === ROLES.FINANCE;
    const pathToNavigate = userPermissions.roleDataMap[value].defaultRoute.url;
    if (flags.profileUpdated) {
      const directPath = localStorage.getItem(DIRECT_PATH);
      const isSecuredPath =
        directPath &&
        directPath.includes('secured-forward') &&
        isMangoExecutiveOrFinance;
      const lastSelectedRole = secureLocalStorage.getItem(LAST_SELECTED_ROLE);
      const isCorrectRole =
        isPatient || isApplicant || isMangoExecutiveOrFinance;
      if (
        (directPath !== '/' && value === lastSelectedRole && isCorrectRole) ||
        isSecuredPath
      )
        history(directPath);
      else history(pathToNavigate);
    } else {
      if (isPatient)
        history(Routes.CompleteProfile.path, {state: {selectedRole: value}});
      else if (isApplicant)
        history(Routes.CompleteProfileApplicant.path, {
          state: {selectedRole: value},
        });
      else history(pathToNavigate);
    }
  };
  /**
   * The function logs out the user by calling the `forceLogout` function with the `keycloak` parameter.
   */
  const logout = (e) => {
    e.preventDefault();
    forceLogout(keycloak);
  };
  return (
    dropdownConfig.show && (
      <main className="login-main">
        <div className="logo-container justify-content-between">
          <Image
            src={MangoCancerCareSVG}
            className="mango-logo d-none d-sm-block"
          />
          <Dropdown className="">
            <div className="pb-1 px-0" onClick={(e) => logout(e)}>
              <Dropdown.Item className="fw-bold d-none d-sm-block bg-white-hover">
                <ProfileIcon
                  fill="#a3a1a5"
                  className="me-2 user-avatar sm-avatar"
                />{' '}
                <span className="fw-normal">{t('logout')}</span>
              </Dropdown.Item>
            </div>
          </Dropdown>
        </div>
        <section>
          <Container className="center">
            <h4 className={`head-text`}> {t('chooseOneRoleToContinue')}</h4>
            <div className="loginBox select-role">
              <div className="Form">
                <div className="dropdown">
                  <FontAwesomeIcon icon={faAddressCard} />
                  <select
                    className="login-role admin"
                    onChange={handleDropdownSelection}>
                    <option value="">Select</option>
                    {dropdownConfig.dropdownValues.map((opt) => (
                      <option value={opt.value} key={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Container>
        </section>
        {/* <Footer /> */}
      </main>
    )
  );
};

export default UserRoles;
