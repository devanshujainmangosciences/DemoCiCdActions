/**
 * OTP screen component
 */
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {verifyOtpDataAction} from 'actions';
import {verifyOTPApiCall, registerationApiCall} from 'apis';
import {logo} from 'assets/icons';
import {Button, AppText, TextInput} from 'components';
import styles from './styles';
import {resendOtpApiCall} from '../../../apis';

const Otp = ({
  navigation: {navigate},
  route: {
    params: {registrationApiBody},
  },
}) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.login);
  const {registerData} = globalState;
  const initialFormFieldsState = {otp: null};
  const initialFormFieldsErrorState = {otpError: null, apiError: null};
  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsErrorState
  );
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null); // for tracking resend otp
  const {t} = useTranslation(['otp', 'validationMessages']);

  const handleChangeText = (value) => {
    // if there is any error on the current input field, make it null in the input error state key
    const inputError = {...formFieldsError, ['otpError']: null};
    setFormFields({otp: value});
    setFormFieldsError(inputError);
  };

  const resendOtpTimer = () => {
    let timeLeft = 30;
    const timerId = setInterval(() => {
      if (timeLeft == -1) {
        clearTimeout(timerId);
      } else {
        setRemainingTime(timeLeft);
        timeLeft--;
      }
    }, 1000);
  };

  /**
   * start resend otp timer
   */
  useEffect(() => {
    resendOtpTimer();
  }, []);

  /**
   * when user presses on resend otp
   * call registration api again
   * and start the timer
   */
  const handleResendOtp = () => {
    const {email} = registrationApiBody;
    resendOtpApiCall({
      username: email,
      token: registerData?.data,
    });
    resendOtpTimer(); // start timer
  };

  /** verify otp call */
  const callValidateOtpService = async (formFields) => {
    let apiBody = {
      otp: formFields?.otp?.trim(),
      token: registerData?.data,
    };
    const data = await verifyOTPApiCall(apiBody);
    return data;
  };

  /**
   * when user presses next button
   * to validate otp -
   * we check otp required validation
   * then call otp verification service
   */
  const handlePressNext = async () => {
    setLoading(true);
    setFormFieldsError(initialFormFieldsErrorState);
    const {otp} = formFields;
    if (!otp) {
      setFormFieldsError({
        otpError: t('validationMessages:pleaseEnter') + t('otp'),
        apiError: null,
      });
      setLoading(false);
      return;
    }
    setFormFieldsError(initialFormFieldsErrorState);
    const {apiResponse, apiError} = await callValidateOtpService(formFields);
    setLoading(false);
    if (apiError) {
      // verify otp error
      setFormFieldsError({
        ...initialFormFieldsErrorState,
        apiError: apiError.localizedMessage,
      });
    } else {
      // verify otp success
      dispatch(verifyOtpDataAction(apiResponse?.data));
      navigate('NewPassword', {
        loginApiBody: {
          phone: registerData?.name,
        },
      });
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={{flex: 0.3}}>
        <Image style={styles.logo} source={logo} resizeMode={'contain'} />
      </View>
      <View style={styles.registerContainer}>
        <AppText style={styles.registerText}>
          {t('Hello' + ' ')}
          <AppText style={styles.nameText}>{registerData?.name}</AppText>
        </AppText>
        <AppText style={styles.pleaseEnterText}>
          {t('pleaseEnterMessage')}
        </AppText>
        <TextInput
          placeholder={t('otp')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText}
          errorMessage={formFieldsError.otpError}
        />
        <Button
          disabled={loading}
          style={styles.buttonContainer}
          onPressEvent={handlePressNext}
          label={t('submit')}
          isLoading={loading}
        />
        <View>
          <AppText style={styles.apiErrorText}>
            {formFieldsError.apiError}
          </AppText>
        </View>
        <Button
          disabled={remainingTime || loading}
          onPressEvent={handleResendOtp}
          label={
            remainingTime
              ? t('resendOtpIn') + remainingTime + ' secs'
              : t('clickHereToResendOtp') + ' '
          }
          labelStyle={styles.loginHereText}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Otp;
