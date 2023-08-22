/**
 * Forgot Password screen.
 */
import React, {useEffect, useState} from 'react';
import {View, Image, Keyboard} from 'react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {forgotPasswordApiCall} from 'apis';
import {Button, AppText, TextInput} from 'components';
import {logo} from 'assets/icons';
import {validateEmailMobile} from 'utils';
import styles from './styles';

const ForgotPassword = ({navigation: {navigate}}) => {
  const {t} = useTranslation(['login', 'validationMessages']);
  const [loginInputs, setLoginInputs] = useState({
    userName: null,
  });
  const [loginInputsError, setLoginInputsError] = useState({
    userNameError: null,
    generalError: null,
  });
  // to show loader
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (loader) {
      setLoginInputsError({...loginInputsError, generalError: null});
    }
  }, [loader]);

  // handling textInput change for userName
  const handleInputChange = (inputType) => (inputText) => {
    const input = {...loginInputs, [inputType]: inputText};
    // if there is any error on the current input field, make it null in the input error state key
    const inputError = {...loginInputsError, [`${inputType}Error`]: null};
    setLoginInputs(input);
    setLoginInputsError(inputError);
  };

  //calls forgot password api
  const handleForgotPasswordApiCall = async () => {
    setLoader(true);
    const apiData = {
      username: loginInputs.userName,
    };
    const {apiResponse, apiError} = await forgotPasswordApiCall(apiData);
    if (apiResponse) {
      setLoader(false);
      navigate('Login');
    } else if (apiError) {
      setLoader(false);
      const errorInput = {
        ...loginInputsError,
        generalError: apiError.localizedMessage || apiError.error_description,
      };
      setLoginInputsError(errorInput);
    }
  };

  // when user click son forgot password, perform validation and calls api
  const handlePressForgotPassword = async () => {
    Keyboard.dismiss();
    const {userName} = loginInputs;
    if (!userName) {
      const errorInput = {
        ...loginInputsError,
        userNameError:
          !userName && t('validationMessages:pleaseEnter') + t('userName'),
      };
      setLoginInputsError(errorInput);
      return;
    }
    const isEmailOrPhoneValid = validateEmailMobile(userName);
    if (!isEmailOrPhoneValid) {
      // email-mobile validity error
      const errorInputs = {
        ...loginInputsError,
        userNameError:
          t('validationMessages:pleaseEnterValid') +
          t('email') +
          '/' +
          t('mobile'),
      };
      setLoginInputsError(errorInputs);
      return;
    }

    handleForgotPasswordApiCall();
  };

  const {userName} = loginInputs;
  const {userNameError, generalError} = loginInputsError;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>

      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>{t('forgotPassword')}</AppText>
        <TextInput
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          value={userName}
          placeholder={t('userName')}
          style={styles.textInputContainer}
          onChangeText={handleInputChange('userName')}
          errorMessage={userNameError}
        />

        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressForgotPassword}
          label={t('continue')}
          isLoading={loader}
        />
        <View>
          {generalError && (
            <AppText style={styles.errorText}>{generalError}</AppText>
          )}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Icon name="infocirlceo" as={AntDesign} style={styles.icon} />
        <AppText style={styles.bottomContainerTextContainer}>
          {t('forgotPasswordInfo')}
        </AppText>
      </View>
    </View>
  );
};

export default ForgotPassword;
