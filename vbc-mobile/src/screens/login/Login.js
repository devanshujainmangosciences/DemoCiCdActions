/**
 * Login screen
 */
import React, {useState} from 'react';
import {View, Image, Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {AuthContext} from 'src/App';
import {
  loginApiSuccessAction,
  getUserPermissionsAction,
  verifyOtpDataAction,
} from 'actions';
import {Button, AppText, TextInput} from 'components';
import {logo} from 'assets/icons';
import {AsyncStorageKeys, errorTypes} from 'constants';
import {
  loginApiCall,
  getPermissionsApiCall,
  getResetPasswordTokenApiCall,
  verifyOTPApiCall,
  addDevice,
} from 'apis';
import {decodeToken, getFromAsyncStorage, isUserAuthorized} from 'utils';
import styles from './styles';
import {Loader} from '../../components';

const Login = ({navigation: {navigate}}) => {
  const {t} = useTranslation(['login', 'validationMessages']);
  const {secretsData} = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // context variable
  const {signIn} = React.useContext(AuthContext);

  // login inputs
  const [loginInputs, setLoginInputs] = useState({
    userName: null,
    password: null,
  });
  // login inputs error
  const [loginInputsError, setLoginInputsError] = useState({
    userNameError: null,
    passwordError: null,
    generalError: null,
  });
  // to show/hide loader
  const [loader, setLoader] = useState(false);

  // handling textInput change for userName & password
  const handleInputChange = (inputType) => (inputText) => {
    if (!loader) {
      // when there is no activity going on already
      // add text to current input field state key
      const input = {...loginInputs, [inputType]: inputText};
      // if there is any error on the current input field, make it null in the input error state key
      const inputError = {...loginInputsError, [`${inputType}Error`]: null};
      setLoginInputs(input);
      setLoginInputsError(inputError);
    }
  };

  const handlePressRegisteration = () => {
    // when there is no activity going on already
    navigate('Registeration');
  };

  const handlePressForgotPassword = () => {
    // when there is no activity going on already
    navigate('ForgotPassword');
  };

  /** verify otp call */
  const callValidateOtpService = async (formFields) => {
    let apiBody = {
      otp: formFields?.otp,
      token: formFields?.token,
    };
    const data = await verifyOTPApiCall(apiBody);
    return data;
  };

  /** handling events that should be checked on login press
   * Validation
   * API Call
   */
  const handlePressLogin = async () => {
    // when there is no activity going on already
    Keyboard.dismiss();
    setLoader(true);
    setLoginInputsError({
      userNameError: null,
      passwordError: null,
      generalError: null,
    });
    const {userName: userNameOriginal, password} = loginInputs;
    const userName = userNameOriginal?.toLowerCase();
    if (!userName || !password) {
      const errorInput = {
        ...loginInputsError,
        userNameError:
          !userName && t('validationMessages:pleaseEnter') + t('userName'),
        passwordError:
          !password && t('validationMessages:pleaseEnter') + t('password'),
      };
      setLoader(false);
      setLoginInputsError(errorInput);
      return;
    }
    const {apiResponse, apiError} = await loginApiCall(loginInputs);
    if (apiResponse) {
      const {data} = apiResponse;
      const {access_token, refresh_token} = data;
      const decodeTokenResponse = decodeToken(access_token);
      const {sub: userId} = decodeTokenResponse;
      if (isUserAuthorized(decodeTokenResponse)) {
        const {
          apiResponse: getPermissionsApiResponse,
          apiError: getPermissionsApiError,
        } = await getPermissionsApiCall(access_token);
        if (getPermissionsApiResponse) {
          const {data: permissionsData} = getPermissionsApiResponse;

          // get device token from async storage and call an api to send this to mango science backend
          // device token is stored into async storage in index.js file
          const deviceToken = await getFromAsyncStorage(
            AsyncStorageKeys.DEVICE_TOKEN
          );
          if (deviceToken) {
            const addDeviceApiData = {
              active: true,
              appOs: JSON.parse(deviceToken)?.os,
              appVersion: DeviceInfo.getVersion(),
              deviceToken: JSON.parse(deviceToken)?.token,
              deviceType: JSON.parse(deviceToken)?.os,
              refreshToken: refresh_token,
            };
            const {access_token} = data;
            // TODO: Handle when add device api throws error
            await addDevice(addDeviceApiData, access_token);
          }
          setLoader(false);
          dispatch(loginApiSuccessAction(data));
          dispatch(getUserPermissionsAction(permissionsData));
          signIn(); // context variable. setting it to navigate to AppStack
          return;
        } else if (getPermissionsApiError) {
          const errorInput = {
            ...loginInputsError,
            generalError: getPermissionsApiError.error_description,
          };
          setLoader(false);
          setLoginInputsError(errorInput);
        }
      } else {
        const errorInput = {
          ...loginInputsError,
          generalError: t('accessError'),
        };
        setLoader(false);
        setLoginInputsError(errorInput);
      }
    } else if (apiError) {
      const errorInput = {
        ...loginInputsError,
        generalError: apiError.error_description,
      };
      /** checking if the account is not setup -
       * calling api to fetch token that can be used in verify OTP screen
       * and navigating the user to Verify OTP screen
       */
      if (apiError.error_description === errorTypes.accountNotSetUp) {
        const {apiResponse: getTokenResponse, apiError: getTokenError} =
          await getResetPasswordTokenApiCall(userName);

        if (getTokenResponse) {
          const {data: tokenApiData} = getTokenResponse;
          const {data: token} = tokenApiData;
          const {apiResponse: otpApiResponse, apiError: OtpApiError} =
            await callValidateOtpService({
              otp: password,
              token: token,
            });

          if (OtpApiError) {
            // verify otp error
            const errorInput = {
              ...loginInputsError,
              generalError: OtpApiError.error_description,
            };
            setLoginInputsError(errorInput);
          } else {
            // verify otp success
            dispatch(verifyOtpDataAction(otpApiResponse?.data));
            navigate('NewPassword', {
              loginApiBody: {
                phone: userName,
              },
            });
          }
        } else {
          const errorInput = {
            ...loginInputsError,
            generalError: getTokenError.error_description,
          };
          setLoginInputsError(errorInput);
        }
      }
      setLoader(false);
      setLoginInputsError(errorInput);
    }
  };

  const {userNameError, passwordError, generalError} = loginInputsError;
  if (!secretsData?.['LOGIN_KEYCLOAK_URL']) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>

      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>{t('login')}</AppText>
        <TextInput
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          value={loginInputs.userName}
          placeholder={t('userName')}
          style={styles.textInputContainer}
          onChangeText={handleInputChange('userName')}
          errorMessage={userNameError}
        />
        <TextInput
          autoCapitalize={'none'}
          value={loginInputs.password}
          secureTextEntry
          placeholder={t('password')}
          style={styles.textInputContainer}
          onChangeText={handleInputChange('password')}
          errorMessage={passwordError}
        />

        <Button
          disabled={loader}
          style={styles.forgotPasswordContainer}
          onPressEvent={handlePressForgotPassword}
          label={t('forgotPassword')}
          labelStyle={styles.forgotPasswordText}
        />

        <Button
          disabled={loader}
          style={styles.buttonContainer}
          onPressEvent={handlePressLogin}
          isLoading={loader}
          label={t('continue')}
        />
        <View>
          <AppText style={styles.apiErrorText}>{generalError}</AppText>
        </View>

        <Button
          disabled={loader}
          style={styles.newUserContainer}
          onPressEvent={handlePressRegisteration}
          label={t('newUser')}
          labelStyle={styles.accountText}
        />
      </View>
    </View>
  );
};

export default Login;
