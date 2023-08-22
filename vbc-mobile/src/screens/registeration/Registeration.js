/**
 * Registration screen component
 */
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Button, AppText, TextInput} from 'components';
import {registerDataAction} from 'actions';
import {logo} from 'assets/icons';
import {storeInAsyncStorage, validateEmailMobile} from 'utils';
import {registerationApiCall} from 'apis';
import {AsyncStorageKeys} from 'constants';
import styles from './styles';

const Registeration = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();
  const initialFormFieldsState = {name: null, email: null};
  const initialFormFieldsErrorState = {
    nameError: null,
    emailError: null,
    apiError: null,
  };
  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsErrorState
  );
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation(['signUp', 'validationMessages']);

  const handleChangeText = (type) => (value) => {
    // if there is any error on the current input field, make it null in the input error state key
    const inputError = {...formFieldsError, [`${type}Error`]: null};
    setFormFields({...formFields, [type]: value});
    setFormFieldsError(inputError);
  };

  const handlePressLogin = async () => {
    navigate('Login');
  };

  /** registration api call */
  const callRegistrationService = async (formFields) => {
    const {name, email} = formFields;
    storeInAsyncStorage(AsyncStorageKeys.NAME, JSON.stringify(name));
    let apiBody = {};
    // checking if user entered mobile or email
    if (email.includes('@')) {
      apiBody = {name, email};
    } else {
      apiBody = {name, phone: email};
    }
    const data = await registerationApiCall(apiBody);
    return {data, apiBody};
  };

  /**
   * Once user presses login button -
   * check for name/email-mobile required validation
   * check for email-mobile validity
   * If above both conditions fulfills -
   * call api
   */
  const handlePressNext = async () => {
    setLoading(true);
    setFormFieldsError(initialFormFieldsErrorState);
    const {name, email} = formFields;
    if (!name || !email) {
      let errorObj = {};
      // name/email-mobile required validation error
      if (!name) {
        errorObj = {
          ...errorObj,
          nameError: t('validationMessages:pleaseEnter') + t('name'),
        };
      }
      if (!email) {
        errorObj = {
          ...errorObj,
          emailError:
            t('validationMessages:pleaseEnter') +
            t('email') +
            '/' +
            t('mobile'),
        };
      }
      setFormFieldsError(errorObj);
      setLoading(false);
      return;
    }
    const isEmailOrPhoneValid = validateEmailMobile(email);
    if (!isEmailOrPhoneValid) {
      // email-mobile validity error
      setFormFieldsError({
        ...initialFormFieldsErrorState,
        emailError:
          t('validationMessages:pleaseEnterValid') +
          t('email') +
          '/' +
          t('mobile'),
      });
      setLoading(false);
      return;
    }
    setFormFieldsError(initialFormFieldsErrorState);
    // all validations are fulfilled.
    const {
      data: {apiResponse, apiError},
      apiBody,
    } = await callRegistrationService(formFields);
    setLoading(false);
    if (apiError) {
      /** register api gave error */
      setFormFieldsError({
        ...initialFormFieldsErrorState,
        apiError: apiError.localizedMessage,
      });
    } else if (apiResponse) {
      /** register api successful */
      /** saving register api response with user input form fields to the redux store */
      const dataToStore = {...apiResponse.data, ...formFields};
      dispatch(registerDataAction(dataToStore));
      navigate('Otp', {registrationApiBody: apiBody});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>
      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>{t('register')}</AppText>
        <TextInput
          autoCapitalize={'words'}
          value={formFields.name}
          placeholder={t('name')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('name')}
          errorMessage={formFieldsError.nameError}
        />
        <TextInput
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          value={formFields.email}
          placeholder={t('email') + '/' + t('mobile')}
          style={[styles.textInputContainer, styles.textInputSeparator]}
          onChangeText={handleChangeText('email')}
          errorMessage={formFieldsError.emailError}
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
        <Button disabled={loading} onPressEvent={handlePressLogin}>
          <AppText style={styles.haveAnAccountText}>
            {t('haveAnAccountLoginHere')}
          </AppText>
        </Button>
      </View>
    </View>
  );
};

export default Registeration;
