/**
 * Applicant Overview screen
 */
import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Button, AppText, Container, Loader} from 'components';
import {
  fetchApplicantLoanApplicationDataApiCall,
  fetchApplicantOverviewDataApiCall,
} from 'apis/apis';
import Applicant from 'screens/vbc-program/add-applicant/Applicant';
import styles from './styles';
import {storeApplicantOverviewDataAction} from 'actions/applicant';
import {getFormattedDate} from 'utils';
import {saveApplicantLoanApplicationAction} from 'actions';
import {PAYMENT_FRAMEWORK_VALUE, VBCProgramPaymentFramework} from 'constants';

const ApplicantOverview = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {loginData} = useSelector((state) => state.login);
  const {applicantOverviewData} = useSelector((state) => state.applicant);
  const {t} = useTranslation(['applicationOverview']);
  const [fullPageLoading, setFullPagefullPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  /** calling api function to get overview data */
  useEffect(() => {
    loginData && fetchApplicantOverviewService();
  }, [loginData]);

  /** fetching applicant overview data from api call
   * and store it in global state
   */
  const fetchApplicantOverviewService = async () => {
    const {access_token} = loginData;
    const {apiResponse} = await fetchApplicantOverviewDataApiCall(access_token);
    if (apiResponse) {
      dispatch(storeApplicantOverviewDataAction(apiResponse.data?.data));
    }
    setFullPagefullPageLoading(false);
  };

  const handleNavigation = (apiResponse) => {
    let navigateTo = 'ApplicantCompleteApplicationStep1';
    if (apiResponse.data) {
      const {step} = apiResponse.data;
      switch (step) {
        case 1: {
          navigateTo = 'ApplicantCompleteApplicationStep2';
          break;
        }
        case 2: {
          /** payment framework is financial assistance - navigate to documents upload screen */
          if (
            paymentTypeOpted ===
            VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
          ) {
            navigateTo = 'ApplicantCompleteApplicationDocumentsUpload';
            break;
          }
          navigateTo = 'ApplicantCompleteApplicationStep3';
          break;
        }
        case 3: {
          navigateTo = 'ApplicantCompleteApplicationStep3';
          break;
        }
        case 4: {
          navigateTo = 'ApplicantCompleteApplicationStep3';
          break;
        }
      }
    }
    navigate(navigateTo);
  };

  // When user clicks on complete application button on the landing page
  const handlePressCompleteApplication = async () => {
    setLoading(true);
    const {access_token} = loginData;
    const {apiResponse} = await fetchApplicantLoanApplicationDataApiCall(
      access_token
    );
    setLoading(false);
    if (apiResponse) {
      dispatch(saveApplicantLoanApplicationAction(apiResponse.data?.data));
      handleNavigation(apiResponse.data);
    }
  };

  const {
    coApplicants,
    paymentTypeOpted,
    dateOfApplication,
    loanApplicationStatus,
  } = applicantOverviewData ? applicantOverviewData : {};

  if (fullPageLoading) {
    return (
      <View style={styles.fullPageLoaderContainer}>
        <Loader />
      </View>
    );
  }

  const formattedDateOfApplication = getFormattedDate(dateOfApplication);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollContainer}>
      <Container style={styles.containerOne}>
        <View style={styles.containerOneContainer}>
          <Image />
          <AppText style={styles.containerOneHeading}>
            {t('applicationOverview')}
          </AppText>
        </View>
        <View style={styles.valuesContainer}>
          <AppText style={styles.heading}>{t('modeUsed')}:</AppText>
          <AppText style={styles.value}>
            {PAYMENT_FRAMEWORK_VALUE[paymentTypeOpted]}
          </AppText>

          <AppText style={styles.heading}>{t('dateOfApplication')}:</AppText>
          <AppText style={styles.value}>{formattedDateOfApplication}</AppText>

          <AppText style={styles.heading}>{t('status')}:</AppText>
          <AppText style={styles.value}>{loanApplicationStatus}</AppText>
        </View>
      </Container>

      <Button
        disabled={!paymentTypeOpted}
        style={styles.buttonContainer}
        onPressEvent={handlePressCompleteApplication}
        label={t('completeApplication')}
        isLoading={loading}
      />

      <View style={styles.applicantContainer}>
        <Applicant
          title={t('coApplicants')}
          applicantData={coApplicants}
          onApplicantDeletePress={() => null}
          hideDeleteButton={true}
        />
      </View>
    </ScrollView>
  );
};

export default ApplicantOverview;
