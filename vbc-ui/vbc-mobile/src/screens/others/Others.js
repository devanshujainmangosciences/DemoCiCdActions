/**
 * Others tab screen
 */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AppText, Container} from 'components';
import DeviceInfo from 'react-native-device-info';

import {
  financialInformationIcon,
  myProfileIcon,
  documentsIcon,
  resourcesIcon,
  settingsIcon,
  logoutIcon,
  termsOfUse,
  help,
  privacyPolicy,
} from 'assets/icons';
import {AuthContext} from 'src/App';
import {clearAsyncStorage, getFromAsyncStorage, getUserRole} from 'utils';
import {logout} from 'actions';
import {AsyncStorageKeys} from 'constants';
import {logoutApiCall} from 'apis';
import styles from './styles';

const Others = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {signOut} = React.useContext(AuthContext);
  const {t} = useTranslation(['sidebar']);
  const {userPermissions, loginData} = useSelector((state) => state.login);
  const [isApplicant, setIsApplicant] = useState(false);

  useEffect(() => {
    if (userPermissions) {
      const loggedInUserRole = getUserRole(userPermissions.data);
      setIsApplicant(loggedInUserRole === 'applicant');
    }
  }, [userPermissions]);

  const handleLogout = async () => {
    // get device token from async storage and call an api to send this to mango science backend
    // device token is stored into async storage in index.js file
    const deviceToken = await getFromAsyncStorage(
      AsyncStorageKeys.DEVICE_TOKEN
    );
    const logoutBody = {
      deviceToken: JSON.parse(deviceToken)?.token,
    };
    const {access_token} = loginData;
    // TODO: Handle when add device api throws error
    await logoutApiCall(logoutBody, access_token);
  };

  /**
   * when any edit profile options is pressed.
   * We get user selected option type in type argument.
   * Basis on that, we navigate to the respective screen.
   */
  const handlePress = (type) => async () => {
    switch (type) {
      case 'editProfile': {
        navigate('MyProfile');
        return;
      }
      case 'financialInformation': {
        navigate('MyFinancialInformation');
        return;
      }
      case 'documents': {
        navigate('Documents');
        return;
      }
      case 'settings': {
        navigate('Settings');
        return;
      }
      case 'privacyPolicy': {
        navigate('PrivacyPolicy');
        return;
      }
      case 'termsOfUse': {
        navigate('TermsOfUse');
        return;
      }
      case 'help': {
        navigate('Help');
        return;
      }
      case 'resources': {
        navigate('Resources');
        return;
      }
      /**
       * when user presses logout.
       * Clearing async storage & redux store.
       * Navigating back to auth stack
       */
      case 'logout': {
        await handleLogout();
        clearAsyncStorage();
        dispatch(logout());
        signOut();
        return;
      }
      default: {
        return;
      }
    }
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      <Container
        style={styles.container}
        onPressEvent={handlePress('editProfile')}>
        <View style={styles.containerInner}>
          <Image
            source={myProfileIcon}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('profile')}</AppText>
        </View>
      </Container>

      {!isApplicant && (
        <Container
          style={styles.container}
          onPressEvent={handlePress('financialInformation')}>
          <View style={styles.containerInner}>
            <Image
              source={financialInformationIcon}
              style={styles.image}
              resizeMode={'contain'}
            />
            <AppText style={styles.containerItemText}>
              {t('financial-information')}
            </AppText>
          </View>
        </Container>
      )}

      {!isApplicant && (
        <Container
          style={styles.container}
          onPressEvent={handlePress('documents')}>
          <View style={styles.containerInner}>
            <Image
              source={documentsIcon}
              style={styles.image}
              resizeMode={'contain'}
            />
            <AppText style={styles.containerItemText}>{t('documents')}</AppText>
          </View>
        </Container>
      )}

      <Container
        style={styles.container}
        onPressEvent={handlePress('resources')}>
        <View style={styles.containerInner}>
          <Image
            source={resourcesIcon}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('resources')}</AppText>
        </View>
      </Container>

      <Container
        style={styles.container}
        onPressEvent={handlePress('settings')}>
        <View style={styles.containerInner}>
          <Image
            source={settingsIcon}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('settings')}</AppText>
        </View>
      </Container>

      <Container
        style={styles.container}
        onPressEvent={handlePress('privacyPolicy')}>
        <View style={styles.containerInner}>
          <Image
            source={privacyPolicy}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>
            {t('privacyPolicy')}
          </AppText>
        </View>
      </Container>

      <Container
        style={styles.container}
        onPressEvent={handlePress('termsOfUse')}>
        <View style={styles.containerInner}>
          <Image
            source={termsOfUse}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('termsOfUse')}</AppText>
        </View>
      </Container>

      <Container style={styles.container} onPressEvent={handlePress('help')}>
        <View style={styles.containerInner}>
          <Image source={help} style={styles.image} resizeMode={'contain'} />
          <AppText style={styles.containerItemText}>{t('help')}</AppText>
        </View>
      </Container>

      <Container style={styles.container} onPressEvent={handlePress('logout')}>
        <View style={styles.containerInner}>
          <Image
            source={logoutIcon}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('logout')}</AppText>
        </View>
      </Container>
      <AppText
        style={
          styles.versionText
        }>{`Version: ${DeviceInfo.getVersion()}(${DeviceInfo.getBuildNumber()})`}</AppText>
    </ScrollView>
  );
};

export default Others;

/**
 * <Button
        style={styles.sectionContainer}
        onPressEvent={handlePress('editProfile')}>
        <Image source={professionalOtherFIIcon} resizeMode={'contain'} />
        <AppText style={styles.sectionText}>{t('editProfile')}</AppText>
        <Icon type="AntDesign" name="caretright" style={styles.sectionIcon} />
      </Button>
      <Button
        style={styles.sectionContainer}
        onPressEvent={handlePress('financialInformation')}>
        <Image source={financialInformationIcon} resizeMode={'contain'} />
        <AppText style={styles.sectionText}>
          {t('financialInformation')}
        </AppText>
        <Icon type="AntDesign" name="caretright" style={styles.sectionIcon} />
      </Button>

      <Button style={styles.buttonContainer} onPressEvent={handlePressLogout}>
        <AppText style={styles.buttonText}>{t('Logout')}</AppText>
        {loading && (
          <View style={styles.buttonIconContainer}>
            <Loader style={styles.buttonIcon} />
          </View>
        )}
      </Button>
 */
