/**
 * Verify Contact Details screen
 */
import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {AppText, TextInput, Button, Container, Loader} from 'components';
import {
  getOtpApiCall,
  getRegistrationCompleteProfileApiCall,
  verifyContactDetailsApiCall,
} from 'apis';
import {getUserRole} from 'utils';
import styles from './styles';

const Verify = () => {
  const globalState = useSelector((state) => state.login);
  const {loginData} = globalState;
  const {access_token} = loginData;
  const {userPermissions} = useSelector((state) => state.login);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [showVerifyOtpEmail, setShowVerifyOtpEmail] = useState(false);
  const [showVerifyOtpMobile, setShowVerifyOtpMobile] = useState(false);
  const [loadingMobile, setLoadingMobile] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [generalError, setGeneralError] = useState({
    mobileError: null,
    emailError: null,
  });

  const {t} = useTranslation(['settings']);

  const loggedInUserRole = getUserRole(userPermissions?.data);
  const isApplicant = loggedInUserRole === 'applicant';
  /**
   * fetching user profile details by calling api
   * and then formatting the response of the api
   * with the component states
   */
  const fetchProfileData = async () => {
    setFullPageLoading(true);
    const {access_token} = loginData;
    const {apiResponse} = await getRegistrationCompleteProfileApiCall(
      access_token,
      isApplicant
    );
    if (apiResponse) {
      const {
        email,
        mobile,
        emailVerified,
        mobileVerified,
      } = apiResponse.data?.data;
      setEmail(email);
      setMobile(mobile);
      setIsEmailVerified(emailVerified);
      setIsMobileVerified(mobileVerified);
    }
    setFullPageLoading(false);
  };

  /**
   * fetch user profile details
   */
  useEffect(() => {
    loginData && fetchProfileData();
  }, [loginData]);

  /** get otp service */
  const callGetOtpService = async (type) => {
    let apiBody = {
      email: type === 'email' ? email : '',
      phone: type === 'mobile' ? mobile : '',
    };
    const data = await getOtpApiCall(apiBody, access_token, isApplicant);
    return data;
  };

  const handlePressGetOtp = (type) => async () => {
    if (type === 'mobile') {
      setLoadingMobile(true);
      const {apiError} = await callGetOtpService(type);
      if (apiError) {
        const errorInput = {
          ...generalError,
          mobileError: apiError.localizedMessage,
        };
        setGeneralError(errorInput);
      } else {
        setShowVerifyOtpMobile(true);
      }
      setLoadingMobile(false);
    } else if (type === 'email') {
      setLoadingEmail(true);
      const {apiError} = await callGetOtpService(type);
      if (apiError) {
        const errorInput = {
          ...generalError,
          emailError: apiError.localizedMessage,
        };
        setGeneralError(errorInput);
      } else {
        setShowVerifyOtpEmail(true);
      }
      setLoadingEmail(false);
    }
  };

  /** verify otp service */
  const callVerifyContactDetailsService = async (type) => {
    let apiBody = {
      email: type === 'email' ? email : '',
      otp: type === 'email' ? emailOtp : mobileOtp,
      phone: type === 'mobile' ? mobile : '',
    };
    const data = await verifyContactDetailsApiCall(
      apiBody,
      access_token,
      isApplicant
    );
    return data;
  };

  // when user clicks on very OTP, call api and set error and success responses
  const handlePressVerifyOtp = (type) => async () => {
    setGeneralError({
      mobileError: null,
      emailError: null,
    });
    if (type === 'mobile') {
      setLoadingMobile(true);
    } else {
      setLoadingEmail(true);
    }
    const {apiError} = await callVerifyContactDetailsService(type);

    if (apiError) {
      if (type === 'mobile') {
        const errorInput = {
          ...generalError,
          mobileError: apiError.localizedMessage,
        };
        setGeneralError(errorInput);
      } else if (type === 'email') {
        const errorInput = {
          ...generalError,
          emailError: apiError.localizedMessage,
        };
        setGeneralError(errorInput);
      }
    } else {
      fetchProfileData();
    }
    if (type === 'mobile') {
      setLoadingMobile(false);
    } else {
      setLoadingEmail(false);
    }
  };

  // When user enters OTP
  const handleChangeText = (type) => (value) => {
    if (type === 'mobile') {
      setMobileOtp(value);
    } else if (type === 'email') {
      setEmailOtp(value);
    }
  };

  // SHow full page loader when profile API hits
  if (fullPageLoading) {
    return (
      <View style={styles.fullPageLoadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      {mobile !== null && mobile !== '' && (
        <Container style={styles.container}>
          <View style={styles.containerInner}>
            <View style={{flex: 0.7}}>
              <TextInput
                disabled
                value={mobile}
                placeholder={t('mobile')}
                style={styles.textInputContainer}
                onChangeText={() => {}}
              />
            </View>
          </View>
          <View style={styles.infoView}>
            <View
              style={isMobileVerified ? styles.dotView : styles.dotViewError}
            />
            <AppText
              style={
                isMobileVerified
                  ? styles.containerItemText
                  : styles.containerItemTextError
              }>
              {isMobileVerified ? t('verified') : t('notVerified')}
            </AppText>
          </View>
          {showVerifyOtpMobile && !isMobileVerified && (
            <TextInput
              value={mobileOtp}
              placeholder={t('enterOtp')}
              style={styles.textInputContainer}
              onChangeText={handleChangeText('mobile')}
            />
          )}
          {!isMobileVerified && (
            <>
              <Button
                disabled={showVerifyOtpMobile && !mobileOtp}
                style={styles.buttonContainer}
                onPressEvent={
                  showVerifyOtpMobile
                    ? handlePressVerifyOtp('mobile')
                    : handlePressGetOtp('mobile')
                }
                label={showVerifyOtpMobile ? t('verifyOtp') : t('getOtp')}
                isLoading={loadingMobile}
              />
              {generalError?.mobileError && (
                <View>
                  <AppText style={styles.apiErrorText}>
                    {generalError?.mobileError}
                  </AppText>
                </View>
              )}
            </>
          )}
        </Container>
      )}

      {email !== null && email !== '' && (
        <Container style={styles.container}>
          <View style={styles.containerInner}>
            <TextInput
              disabled
              value={email}
              placeholder={t('email')}
              style={styles.textInputContainer}
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.infoView}>
            <View
              style={isEmailVerified ? styles.dotView : styles.dotViewError}
            />
            <AppText
              style={
                isEmailVerified
                  ? styles.containerItemText
                  : styles.containerItemTextError
              }>
              {isEmailVerified ? t('verified') : t('notVerified')}
            </AppText>
          </View>
          {showVerifyOtpEmail && !isEmailVerified && (
            <TextInput
              value={emailOtp}
              placeholder={t('enterOtp')}
              style={styles.textInputContainer}
              onChangeText={handleChangeText('email')}
            />
          )}
          {!isEmailVerified && (
            <>
              <Button
                disabled={showVerifyOtpEmail && !emailOtp}
                style={styles.buttonContainer}
                onPressEvent={
                  showVerifyOtpEmail
                    ? handlePressVerifyOtp('email')
                    : handlePressGetOtp('email')
                }
                label={showVerifyOtpEmail ? t('verifyOtp') : t('getOtp')}
                isLoading={loadingEmail}
              />
              {generalError?.emailError && (
                <View>
                  <AppText style={styles.apiErrorText}>
                    {generalError?.emailError}
                  </AppText>
                </View>
              )}
            </>
          )}
        </Container>
      )}
    </ScrollView>
  );
};

export default Verify;
