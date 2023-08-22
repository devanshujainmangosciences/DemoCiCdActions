/**
 * NewPassword screen component
 */
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {resetPasswordApiCall, loginApiCall, addDevice} from 'apis';
import {Button, AppText, TextInput} from 'components';
import {loginApiSuccessAction} from 'actions';
import {AuthContext} from 'src/App';
import {
  decodeToken,
  getFromAsyncStorage,
  isUserAuthorized,
  validatePassword,
} from 'utils';
import {AsyncStorageKeys} from 'constants';
import {logo} from 'assets/icons';
import styles from './styles';

const NewPassword = ({
  route: {
    params: {loginApiBody},
  },
}) => {
  const dispatch = useDispatch();
  const {signIn} = React.useContext(AuthContext);
  const globalState = useSelector((state) => state.login);
  const {registerData, verifyOtpData} = globalState;
  const initialFormFieldsState = {password: null, confirmPassword: null};
  const initialFormFieldsErrorState = {
    passwordError: null,
    confirmPasswordError: null,
    apiError: null,
  };
  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsErrorState
  );
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation(['createPassword', 'validationMessages']);

  const handleChangeText = (type) => (value, textInputErrorMessage) => {
    // if there is any error on the current input field, make it null in the input error state key
    const inputError = {
      ...formFieldsError,
      [`${type}Error`]: textInputErrorMessage,
    };
    setFormFields({...formFields, [type]: value});
    setFormFieldsError(inputError);
  };

  /** update password service */
  const callUpdatePasswordService = async (formFields) => {
    const {password} = formFields;
    let apiBody = {
      password,
      token: verifyOtpData.data,
    };
    const data = await resetPasswordApiCall(apiBody);
    return data;
  };

  /**
   * when user presses on continue -
   * we validate password & confirm-password required validation
   * Then we check whether user entered same password/confirm-password,
   * if yes, we call update password service
   */
  const handlePressNext = async () => {
    setLoading(true);
    setFormFieldsError({...formFieldsError, apiError: null});
    const {password, confirmPassword} = formFields;
    if (!password || !confirmPassword) {
      let errorObj = {...formFieldsError};
      if (!password) {
        errorObj = {
          ...errorObj,
          passwordError: t('validationMessages:pleaseEnter') + t('newPassword'),
        };
      }
      if (!confirmPassword) {
        errorObj = {
          ...errorObj,
          confirmPasswordError:
            t('validationMessages:please') + t('confirmNewPassword'),
        };
      }
      setFormFieldsError(errorObj);
      setLoading(false);
      return;
    }

    let isValidationError = false;
    /**
     * Check if there is already an error
     * present due to text input items
     */
    Object.keys(formFieldsError).map((item) => {
      if (item !== 'apiError' && formFieldsError[item]) {
        if (
          !(
            item === 'confirmPasswordError' &&
            formFieldsError['confirmPasswordError'] ===
              t('validationMessages:passwordConfirmPassword')
          )
        ) {
          isValidationError = true;
        }
      }
    });
    // show validation errors
    if (isValidationError) {
      setFormFieldsError({...formFieldsError});
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      // password & confirm-password is not same
      setFormFieldsError({
        passwordError: null,
        confirmPasswordError: t('validationMessages:passwordConfirmPassword'),
      });
      setLoading(false);
      return;
    }
    setFormFieldsError(initialFormFieldsErrorState);
    const {apiError} = await callUpdatePasswordService(formFields);
    if (apiError) {
      setLoading(false);
      // reset password api error
      setFormFieldsError({
        ...initialFormFieldsErrorState,
        apiError: apiError.localizedMessage,
      });
    } else {
      // reset password api success
      // navigate('CompleteProfile');
      const loginInputs = {
        userName: registerData?.email || loginApiBody?.phone,
        password: formFields.password,
      };
      const {
        apiResponse: loginApiResponse,
        apiError: loginApiError,
      } = await loginApiCall(loginInputs);
      if (loginApiResponse) {
        const {data} = loginApiResponse;
        const {access_token, refresh_token} = data;
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
          // TODO: Handle when add device api throws error
          await addDevice(addDeviceApiData, access_token);
        }
        const decodeTokenResponse = decodeToken(access_token);
        if (isUserAuthorized(decodeTokenResponse)) {
          dispatch(loginApiSuccessAction(loginApiResponse.data));
          setLoading(false);
          signIn();
        } else {
          setFormFieldsError({
            ...initialFormFieldsErrorState,
            apiError: t('accessError'),
          });
        }
      } else {
        setFormFieldsError({
          ...initialFormFieldsErrorState,
          apiError: loginApiError.localizedMessage,
        });
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>
      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>
          {t('Hello' + ' ')}
          <AppText style={styles.nameText}>
            {registerData?.name || loginApiBody?.phone}
          </AppText>
        </AppText>

        <TextInput
          secureTextEntry
          value={formFields.password}
          validationFunction={validatePassword}
          validationErrorMessage={t('validationMessages:strongPassword')}
          placeholder={t('createNewPassword')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('password')}
          errorMessage={formFieldsError.passwordError}
        />

        <TextInput
          secureTextEntry
          value={formFields.confirmPassword}
          placeholder={t('confirmNewPassword')}
          style={[styles.textInputContainer, styles.textInputSeparator]}
          onChangeText={handleChangeText('confirmPassword')}
          errorMessage={formFieldsError.confirmPasswordError}
        />

        <Button
          disabled={loading}
          style={styles.buttonContainer}
          onPressEvent={handlePressNext}
          label={t('continue')}
          isLoading={loading}
        />
        <View>
          <AppText style={styles.apiErrorText}>
            {formFieldsError.apiError}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default NewPassword;
