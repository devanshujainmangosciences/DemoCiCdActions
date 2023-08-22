/**
 * Waiting for approval screen component
 */
import React from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useTranslation} from 'react-i18next';
import {AppText} from 'components';
import {logo} from 'assets/icons';
import styles from './styles';

const WaitingForApproval = ({
  route: {
    params: {requestIsDeclined},
  },
}) => {
  const globalState = useSelector((state) => state.login);
  const {navigate} = useNavigation();

  const {userPermissions, loginData} = globalState;
  const {t} = useTranslation([
    'createPassword',
    'validationMessages',
    'signUp',
  ]);

  // // subscribe to server side events for registration approval
  // useEffect(() => {
  //   if (loginData) {
  //     const {access_token} = loginData;
  //     const {sub: userId} = decodeToken(access_token);
  //     const options = {headers: {Authorization: `Bearer ${access_token}`}};
  //     const eventSource = new RNEventSource(
  //       MANGO_SCIENCES_API_URL_EVENTS,
  //       options
  //     );
  //     eventSource.addEventListener(userId, (event) => {
  //       console.log('>>>>>>>>>>>>>>>', event);
  //       // const recievedNotification = JSON.parse(event.data);
  //       // if (
  //       //   recievedNotification?.content.includes(
  //       //     'registration request is approved'
  //       //   )
  //       // ) {
  //       //   navigate('App');
  //       // }
  //     });
  //     return () => {
  //       eventSource.removeAllListeners();
  //       eventSource.close();
  //     };
  //   }
  // }, [loginData]);

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>
      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>
          {t('Hello' + ' ')}
          <AppText style={styles.nameText}>
            {userPermissions?.data?.user?.name}
          </AppText>
        </AppText>
        <View style={styles.infoView}>
          {requestIsDeclined ? (
            <>
              <AppText style={styles.infoText}>
                {t('signUp:requestDeclined')}
              </AppText>
              <AppText style={styles.infoText}>
                {t('signUp:declineCheckForAssistnce')}
              </AppText>
            </>
          ) : (
            <>
              <AppText style={styles.infoText}>
                {t('signUp:waitingForApproval')}
              </AppText>
              <AppText style={styles.infoText}>
                {t('signUp:pleaseContact')}
              </AppText>
              <AppText style={styles.infoText}>
                {t('signUp:relationshipManager')}
              </AppText>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default WaitingForApproval;
