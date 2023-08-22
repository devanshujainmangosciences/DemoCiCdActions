/**
 * Change Password screen component
 */
import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Button, AppText, TextInput, Container} from 'components';
import {decodeToken, validatePassword} from 'utils';
import {changePasswordApiCall} from 'apis';
import styles from './styles';

const ChangePassword = () => {
  const {navigate} = useNavigation();
  const {loginData} = useSelector((state) => state.login);
  const {access_token} = loginData;
  const {sub: userId} = decodeToken(access_token);

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
  const {t} = useTranslation(['changePassword', 'validationMessages']);

  const handleChangeText = (type) => (value, textInputErrorMessage) => {
    // if there is any error on the current input field, make it null in the input error state key
    const inputError = {
      ...formFieldsError,
      [`${type}Error`]: textInputErrorMessage,
    };
    setFormFields({...formFields, [type]: value});
    setFormFieldsError(inputError);
  };

  /** change password service */
  const callChangePasswordService = async (formFields) => {
    const {password} = formFields;
    let apiBody = {
      password,
      token: userId,
    };
    const data = await changePasswordApiCall(apiBody, access_token);
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
          passwordError:
            t('validationMessages:pleaseEnter') + t('createNewPassword'),
        };
      }
      if (!confirmPassword) {
        errorObj = {
          ...errorObj,
          confirmPasswordError:
            t('validationMessages:pleaseEnter') + t('confirmNewPassword'),
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
    const {apiError} = await callChangePasswordService(formFields);
    if (apiError) {
      setLoading(false);
      // change password api error
      setFormFieldsError({
        ...initialFormFieldsErrorState,
        apiError: apiError.localizedMessage,
      });
    } else {
      setLoading(false);
      navigate('Settings');
    }
  };

  return (
    <View style={styles.container}>
      <Container style={styles.registerContainer}>
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
      </Container>
    </View>
  );
};

export default ChangePassword;
