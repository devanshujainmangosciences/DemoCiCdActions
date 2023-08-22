/**
 * Starting point of the application
 * Helps in managing navigation based upon
 * user permission and authentication
 */
import 'react-native-gesture-handler';
import '../../i18n';
import React, {useEffect, useState} from 'react';
import {LogBox, Platform, StatusBar, Linking} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {useTranslation} from 'react-i18next';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';

import codePush from 'react-native-code-push';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import * as Sentry from '@sentry/react-native';
import {
  checkForInAppUpdates,
  getLoggedInUserData,
  removeKeyFromEncryptedStorage,
} from 'utils';
import {ConfirmationModal} from './components';
import {Theme} from 'constants';
import reduxStore from 'store';
import {AuthNavigator, AppNavigator} from 'navigation';
import EncryptedStorageKeys from 'constants/EncryptedStorageKeys';
import {initializeSentry} from 'configurations';
import {CodePushUpdateDialog} from 'components';
import {navigationRef, isReadyRef} from './navigation/RootNavigation';
import {getSecretsApiCall, getVersionApiCall} from './apis';
import {STORE_URL} from './constants';
import {fetchCodePushVersion} from './utils';

/** creating context. To manage auth/app navigator logic. */
export const AuthContext = React.createContext();

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

/** redux store */
const store = reduxStore;

const routingInstrumentation = initializeSentry();
// export const navigationRef = createNavigationContainerRef();

const App = () => {
  // const navigation = React.useRef();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // whether to show confirmation dialog
  const [isConfirmed, setIsConfirmed] = useState(false); // whether the user has confirmed when showing confirmation dialog
  const [showVersionUpdateModal, setShowVersionUpdateModal] = useState(false);
  const {t} = useTranslation(['sidebar']);

  // fetch latest version of the app from backend that must be installed
  const fetchVersionService = async () => {
    let req = {
      codePushVersion: fetchCodePushVersion(),
      ...Platform.select({
        android: {androidVersion: DeviceInfo.getVersion()},
        ios: {iosVersion: DeviceInfo.getVersion()},
      }),
    };
    const {apiResponse: versionApiResponse} = await getVersionApiCall(req);
    if (versionApiResponse?.data === false) {
      setShowVersionUpdateModal(true);
    }
  };

  // check at mouting, if user is logged in.
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor(Theme.snow);
    StatusBar.setBarStyle('dark-content');
    LogBox.ignoreAllLogs(true);
    const getSecrets = async () => {
      const {apiResponse, apiError} = await getSecretsApiCall();
      if (apiResponse) {
        getToken();
        fetchVersionService();
      }
    };
    getSecrets();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    checkForInAppUpdates();
  }, []);

  const authContext = {
    signIn: () => {
      setIsUserLoggedIn(true);
    },
    signOut: async () => {
      await removeKeyFromEncryptedStorage(
        EncryptedStorageKeys.LOGGED_IN_USER_DATA
      );
      setIsUserLoggedIn(false);
      getSecretsApiCall();
    },
    // to show confirmation modal from any component
    toggleConfirmationModal: (title) => {
      setModalTitle(title);
      setIsConfirmed(false);
      setShowConfirmationModal(true);
    },
    /** to reset confirmation value to false when we navigatefrom one to another component
     And both of them shows some modal */
    resetConfirmationValue: () => setIsConfirmed(false),

    // to get is user presses confirm button on the modal or not
    isConfirmed: isConfirmed,

    // to ge the title of the opened confirmation modal
    confirmationModalTitle: modalTitle,
  };

  // called when user click on cancel button of the modal
  const onCancelConfirmationModal = () => {
    setIsConfirmed(false);
    setShowConfirmationModal(false);
  };

  const getToken = async () => {
    const fetchedToken = await getLoggedInUserData();
    setIsUserLoggedIn(fetchedToken);
  };
  // called when user clicks on the confirm button of the modal
  const onConfirmedConfirmationModal = () => {
    setIsConfirmed(true);
    setShowConfirmationModal(false);
  };

  // register the navigation container with the routing instrumentation from Sentry
  const onNavigationContainerReady = () => {
    isReadyRef.current = true;
    return routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  const onConfirmedVersionUpdateModal = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(STORE_URL.IOS);
    } else {
      Linking.openURL(STORE_URL.ANDROID);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaProvider style={styles.container}>
        <Provider store={store}>
          <NavigationContainer
            ref={navigationRef}
            onReady={onNavigationContainerReady}>
            <AuthContext.Provider value={authContext}>
              {isUserLoggedIn ? (
                <AppNavigator navigationRef={navigationRef} />
              ) : (
                <AuthNavigator />
              )}
              <ConfirmationModal
                isVisible={showConfirmationModal}
                onConfirmedConfirmationModal={onConfirmedConfirmationModal}
                onCancelConfirmationModal={onCancelConfirmationModal}
                title={modalTitle}
              />

              <ConfirmationModal
                isVisible={showVersionUpdateModal}
                onConfirmedConfirmationModal={onConfirmedVersionUpdateModal}
                enableQuitButton={false}
                hideCloseButton={true}
                title={t('mandatoryUpdateRequired')}
              />
              <CodePushUpdateDialog />
            </AuthContext.Provider>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Sentry.wrap(codePush(codePushOptions)(App));
