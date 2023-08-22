/**
 * Navigator that is used for all authenticated screens.
 */
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import Config from 'react-native-config';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import RNEventSource from 'react-native-event-source';
import {backIcon} from 'assets/icons';
import {useNavigation} from '@react-navigation/native';
import {Loader} from 'components';
import {EditProfile, MyProfile, TermsOfUse} from 'screens';
import {
  fetchAlertsApiCall,
  getNewAccessTokenFromRefreshTokenApiCall,
  getPermissionsApiCall,
} from 'apis';
import {AuthContext} from 'src/App';
import {
  getMasterDataAction,
  getUserPermissionsAction,
  loginApiSuccessAction,
  logoutAction,
  storeAlertsAction,
  updateAlertsAction,
} from 'actions';
import {decodeToken, getLoggedInUserData, getUserRole} from 'utils';
import BottomTabNavigator from './BottomTabNavigator';
import ApplicantBottomTabNavigator from './ApplicantBottomTabNavigator';
import ModalStackNavigator from './ModalStackNavigator';
import styles from './styles';
import {WaitingForApproval} from 'screens/waiting-for-approval';

/**
 * AppNavigator in which our entire application
 * that requires authentication is bind in this navigator.
 */
const AppNavigator = ({navigationRef}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {logout, loginData} = useSelector((state) => state.login);
  const {signOut} = React.useContext(AuthContext);
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('');
  const [userPermissions, setUserPermissions] = useState(null);
  const [requestIsDeclined, setRequestIsDeclined] = useState(false);

  /** calling api function to get alerts count */
  useEffect(() => {
    if (loginData) {
      fetchAlertsService();
    }
  }, [loginData]);

  // subscribe to server side events for in app notifications
  useEffect(() => {
    if (loginData) {
      const {access_token} = loginData;
      const {sub: userId} = decodeToken(access_token);
      const options = {headers: {Authorization: `Bearer ${access_token}`}};
      const eventSource = new RNEventSource(
        Config.MANGO_SCIENCES_API_URL_EVENTS,
        options
      );
      // appends ntification data from serverside events into alerts in redux state
      eventSource.addEventListener(userId, (event) => {
        const alertArr = [];
        alertArr.push(JSON.parse(event.data));
        dispatch(updateAlertsAction(alertArr));
        const recievedNotification = JSON.parse(event.data);
        if (
          recievedNotification?.content.includes(
            'registration request is approved'
          )
        ) {
          reCallLoginApi();
        } else if (
          recievedNotification?.content.includes(
            'registration request was declined'
          )
        ) {
          setRequestIsDeclined(true);
        }
      });
      return () => {
        eventSource.removeAllListeners();
        eventSource.close();
      };
    }
  }, [loginData]);

  // calls refresh token api after event is received for waiting for approval
  // to recieve new token
  const reCallLoginApi = async () => {
    const userData = await getLoggedInUserData();
    const {refresh_token} = userData;
    const {
      apiResponse: refreshTokenApiResponse,
      apiError: refreshTokenApiError,
    } = await getNewAccessTokenFromRefreshTokenApiCall(refresh_token);
    if (refreshTokenApiResponse) {
      dispatch(loginApiSuccessAction(refreshTokenApiResponse.data));
      setTimeout(() => {
        fetchUserPermissions();
      }, 3000);
    } else if (refreshTokenApiError) {
      // if refresh token api fails, then logout the user
      dispatch(logoutAction(true));
      return null;
    }
  };

  // fetching alert data from api call
  const fetchAlertsService = async () => {
    const {access_token} = loginData;
    const {sub: userId} = decodeToken(access_token);
    const {apiResponse} = await fetchAlertsApiCall(access_token, userId, 0);
    // store alerts data in redux store
    if (apiResponse) {
      dispatch(
        storeAlertsAction(
          apiResponse?.data?.data?.content,
          apiResponse?.data?.data?.unreadElements
        )
      );
    }
  };

  /**
   * When refresh token is expired -
   * we save redux state -> login reducer -> logout
   * as true/false. True means we have to logout.
   * As soon as we call logoutAction and authContext.signOut() function,
   * we again make that logout redux state to false.
   * This is the workaround -
   * becuase from apis.js file, we cannot get auth context instance.
   * In order to logout from the logic present at apis.js file,
   * we have to play with this useEffect here.
   */
  useEffect(() => {
    if (logout) {
      dispatch(logoutAction(false));
      signOut();
    }
  }, [logout]);

  useEffect(() => {
    if (requestIsDeclined) {
      setLoading(true);
      setTimeout(() => {
        handleNavigationLogic();
      }, 3000);
    }
  }, [requestIsDeclined]);

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  /**
   * Fetching user permissions -
   * and depending upon the response -
   * we set the initial route name.
   * Also fetching master data to
   * be used in dropdown values.
   */
  const fetchUserPermissions = async () => {
    setLoading(true);
    const fetchedToken = await getLoggedInUserData();
    const {access_token} = fetchedToken;
    const {sub: userId} = decodeToken(access_token);
    // dispatch(vbcProgramAction());
    const {apiResponse, apiError, apiStatus} = await getPermissionsApiCall(
      userId,
      access_token
    );
    if (apiResponse) {
      const userData = await getLoggedInUserData();
      setUserPermissions(apiResponse.data);
      dispatch(getUserPermissionsAction(apiResponse.data, userData));
    } else if (apiError) {
      if (apiStatus === 400) {
        dispatch(logoutAction(true));
        return null;
      }
    }
  };

  useEffect(() => {
    handleNavigationLogic();
  }, [userPermissions]);

  // perform navigation based on conditions
  const handleNavigationLogic = () => {
    if (userPermissions) {
      const {
        data: {
          flags: {profileUpdated, accepted},
        },
      } = userPermissions;
      const loggedInUserRole = getUserRole(userPermissions?.data);
      if (!profileUpdated) {
        if (!accepted && loggedInUserRole !== 'applicant') {
          setInitialRouteName('WaitingForApproval');
        } else {
          setInitialRouteName('EditProfile');
        }
      } else {
        if (loggedInUserRole === 'applicant') {
          setInitialRouteName('ApplicantBottomTabNavigator');
        } else {
          setInitialRouteName('BottomTabNavigator');
        }
      }
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.bottomBarItemView}>
      <Loader />
    </View>
  ) : (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        presentation: 'modal',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApplicantBottomTabNavigator"
        component={ApplicantBottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: true,
          headerTitle: 'My Profile',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={{
          fromScreen: 'Registration',
        }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WaitingForApproval"
        component={WaitingForApproval}
        initialParams={{
          requestIsDeclined: requestIsDeclined,
        }}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'TermsOfUse'}
        component={TermsOfUse}
        options={{
          headerShown: true,
          headerTitle: 'Terms of Use',
        }}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ModalNavigator"
        component={ModalStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
