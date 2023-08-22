/**
 * Screen component for PBP program step 4
 */
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from 'src/App';

import {
  reviewApplicationIcon,
  financialInformationIcon,
  professionalOtherFIIcon,
} from 'assets/icons';
import {
  cancelVbcProgramApiCall,
  reapplyVbcProgramApiCall,
  storeVbcProgramStep4ApiCall,
} from 'apis';
import {
  Container,
  Button,
  AppText,
  HorizontalTimeline,
  Loader,
} from 'components';
import {Theme, VBCProgramPaymentFramework} from 'constants';
import {resetVbcProgramData, saveVbcProgramDataAction} from 'actions';
import Applicant from '../add-applicant/Applicant';
import {transformGetVbcProgramEnrollmentApiData} from '../formatter';
import {transformAllStepsDataToSendToVbcEnrollApi} from './formatter';
import {financialInfoFields, professionalInfoFields} from './formFields';
import styles from './styles';

const VbcProgramStep4 = () => {
  const dispatch = useDispatch();
  const {navigate, reset} = useNavigation();
  const {t} = useTranslation(['loanApplication', 'confirmationModal']);
  const {loginData} = useSelector((state) => state.login);
  const {userPermissions} = loginData;
  const vbcProgram = useSelector((state) => state.vbcProgram);
  const {vbcProgramStep1} = useSelector((state) => state.vbcProgram);
  const [loading, setLoading] = useState(false);
  const [reapplyLoading, setReapplyLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState(null);
  const {
    toggleConfirmationModal,
    isConfirmed,
    resetConfirmationValue,
    confirmationModalTitle,
  } = React.useContext(AuthContext);

  /** When user presses edit button */
  const handlePressEdit = (stepToBeNavigated) => () => {
    resetConfirmationValue();

    if (stepToBeNavigated === 'step2') {
      /**
       * if program has already started -
       * we navigate the user to Others stack - Financial Info screen
       */
      if (showStartApplicationButton) {
        navigate('VbcProgramStep2');
        return;
      }
      navigate('VbcProgramStep2');
      return;
    } else if (stepToBeNavigated === 'step1') {
      navigate('VbcProgramStep1');
      return;
    } else if (stepToBeNavigated === 'addApplicant') {
      navigate('VbcProgramAddApplicant');
      return;
    }
  };

  /**
   * PBP Program post service -
   * that sends user's all steps data
   */
  const callVBCEnrollService = async () => {
    const {access_token} = loginData;
    const apiBody = transformAllStepsDataToSendToVbcEnrollApi(vbcProgram);
    const data = await storeVbcProgramStep4ApiCall(apiBody, access_token);
    return data;
  };

  /**
   * Reapply PBP Program service -
   */
  const callVBCReapplyService = async () => {
    const {access_token} = loginData;
    const data = await reapplyVbcProgramApiCall(access_token);
    return data;
  };

  /**
   * Cancel PBP Program service -
   */
  const callVBCCancelService = async () => {
    const {access_token} = loginData;
    const data = await cancelVbcProgramApiCall(access_token);
    return data;
  };

  // called when user confirms to start application
  const handleStartApplication = async () => {
    setLoading(true);
    setApiSuccessMessage(null);
    setApiError(null);
    const {apiResponse, apiError} = await callVBCEnrollService();
    if (apiError) {
      setApiError(apiError?.localizedMessage);
      setLoading(false);
      resetConfirmationValue();
      return;
    } else if (apiResponse) {
      const transformedData = transformGetVbcProgramEnrollmentApiData(
        apiResponse.data?.data
      );
      /** saving the api data to redux store */
      dispatch(saveVbcProgramDataAction(transformedData));
      // reset({
      //   index: 1,
      //   routes: [{name: 'VbcProgramStep4'}],
      // });
      resetConfirmationValue();
      navigate('VbcProgram');
    }
  };

  // called when user confirms to reapply application
  const handleReapplyApplication = async () => {
    setReapplyLoading(true);
    setApiSuccessMessage(null);
    setApiError(null);
    const {apiResponse, apiError} = await callVBCReapplyService();
    if (apiError) {
      setApiError(apiError?.localizedMessage);
      setReapplyLoading(false);
      resetConfirmationValue();
      return;
    } else if (apiResponse) {
      setReapplyLoading(false);
      dispatch(resetVbcProgramData());
      resetConfirmationValue();
      reset({
        index: 1,
        routes: [{name: 'VbcProgram'}],
      });
    }
  };

  // called when user confirms to cancel application
  const handleCancelApplication = async () => {
    setLoading(true);
    setApiSuccessMessage(null);
    setApiError(null);
    const {apiResponse, apiError} = await callVBCCancelService();
    if (apiError) {
      setApiError(apiError?.localizedMessage);
      setLoading(false);
      resetConfirmationValue();
      return;
    } else if (apiResponse) {
      dispatch(resetVbcProgramData());
      resetConfirmationValue();
      reset({
        index: 1,
        routes: [{name: 'VbcProgram'}],
      });
    }
  };

  /**
   * when user presses reapply application
   */
  const handlePressReapplyApplication = async () => {
    toggleConfirmationModal(t('confirmationModal:reapplyApplication'));
  };

  /**
   * when user presses cancel application
   */
  const handlePressCancelApplication = async () => {
    toggleConfirmationModal(t('confirmationModal:cancelApplication'));
  };

  /**
   * when user presses start application
   * we call post api to submit all steps data
   */
  const handlePressStartApplication = async () => {
    toggleConfirmationModal(t('confirmationModal:confirmStartApplication'));
  };

  // navigates user to PBP Schedule
  const handleNavigateToVbcSchedule = () => {
    resetConfirmationValue();
    navigate('VbcSchedule');
  };
  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (
      isConfirmed &&
      confirmationModalTitle === t('confirmationModal:reapplyApplication')
    ) {
      handleReapplyApplication();
    } else if (
      isConfirmed &&
      confirmationModalTitle === t('confirmationModal:confirmStartApplication')
    ) {
      handleStartApplication();
    } else if (
      isConfirmed &&
      confirmationModalTitle === t('confirmationModal:cancelApplication')
    ) {
      handleCancelApplication();
    }
  }, [isConfirmed]);

  // const {step1, step2, step3, stepAddApplicants} = vbcProgramData;
  const {
    vbcProgramTotalPayableAmount,
    vbcProgramStep1: step1,
    vbcProgramStep2: step2,
    vbcProgramStep3: step3,
    vbcProgramStepAddApplicant,
    vbcProgramUserCurrentStep,
    vbcProgramAllowCancel,
  } = vbcProgram;

  /** shows whether the vbc program is already started or not */
  const showStartApplicationButton = vbcProgramUserCurrentStep !== 4;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.horizontalTimelineContainer}>
          <HorizontalTimeline totalCycleCount={4} presentCycleCount={4} />
        </View>
        <View style={styles.pageHeading}>
          <Image
            source={reviewApplicationIcon}
            resizeMode={'contain'}
            style={styles.reviewIcon}
          />
          <AppText style={styles.reviewText}>
            {t('reviewApplicationandConfirm')}
          </AppText>
        </View>

        <Container style={styles.paymentContainer}>
          <View
            style={[
              styles.accountDetailsContainerHeadingContainer,
              !showStartApplicationButton && {alignSelf: 'center'},
            ]}>
            <AppText style={styles.accountDetailsContainerHeading}>
              {t('paymentFramework')}
            </AppText>
            {showStartApplicationButton && (
              <Button
                onPressEvent={handlePressEdit('step1')}
                style={styles.accountDetailsContainerEditButton}
                label={t('edit')}
                labelStyle={styles.accountDetailsContainerEditButtonText}
              />
            )}
          </View>
          <AppText
            numberOfLines={1}
            style={[
              styles.paymentContainerDesc,
              !showStartApplicationButton && {alignSelf: 'center'},
            ]}>
            {t(step1)}
          </AppText>
        </Container>

        <Container style={styles.accountDetailsContainer}>
          <View style={styles.accountDetailsContainerHeadingContainer}>
            <AppText style={styles.accountDetailsContainerHeading}>
              {t('accountDetails')}
            </AppText>
            <Button
              onPressEvent={handlePressEdit('step2')}
              style={styles.accountDetailsContainerEditButton}
              label={t('edit')}
              labelStyle={styles.accountDetailsContainerEditButtonText}
            />
          </View>
          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={financialInformationIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('financialInformation')}
            </AppText>
          </View>
          {financialInfoFields.map((financialInfoItem) =>
            step2 ? (
              <View style={styles.valuesContainer}>
                <AppText style={styles.valueHeadingText}>
                  {t(financialInfoItem?.heading)}:
                </AppText>
                <AppText style={styles.valueText}>
                  {financialInfoItem?.valueKey === 'cancelledChequeDocument'
                    ? step2[financialInfoItem?.valueKey]?.documentName || '-'
                    : step2[financialInfoItem?.valueKey] || '-'}
                </AppText>
              </View>
            ) : null
          )}

          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={professionalOtherFIIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('professionalandotherfinancialinformation')}
            </AppText>
          </View>
          {professionalInfoFields.map((professionalInfoItem) =>
            step2 ? (
              <View style={styles.valuesContainer}>
                <AppText style={styles.valueHeadingText}>
                  {t(professionalInfoItem.heading)}:
                </AppText>
                <AppText style={styles.valueText}>
                  {professionalInfoItem.valueKey === 'insurance'
                    ? step2?.insurance
                      ? 'Yes'
                      : 'No'
                    : step2[professionalInfoItem.valueKey] || '-'}
                </AppText>
              </View>
            ) : null
          )}
        </Container>

        <View style={styles.applicantContainer}>
          <Applicant
            applicantData={vbcProgramStepAddApplicant}
            hideDeleteButton
            addEditButton={showStartApplicationButton}
            onEditButtonPress={handlePressEdit('addApplicant')}
          />
        </View>

        <Container style={styles.programCostContainer}>
          <View style={{alignItems: 'center'}}>
            <AppText style={styles.totalCostHeading}>
              {t('totalMedicationCost')}
            </AppText>
            <AppText style={styles.totalCostDesc}>
              {`₹ ${vbcProgramTotalPayableAmount || '-'} *`}
            </AppText>
            {vbcProgramStep1 === VBCProgramPaymentFramework.SELF_PAY ? (
              <AppText style={styles.footNote}>{t('selfPayFootNote')}</AppText>
            ) : (
              <AppText style={styles.footNote}>{t('loanFootNote')}</AppText>
            )}
          </View>
          {vbcProgramStep1 ===
            VBCProgramPaymentFramework.LOAN_AGAINST_OWN_FD && (
            <View style={styles.additionalContainer}>
              <AppText style={styles.currentBankFdText}>
                {t('currentBankFd')}
              </AppText>
              <AppText style={styles.step3Text}>{step3}</AppText>
            </View>
          )}
          {userPermissions?.data?.flags?.showSchedule && (
            <Button
              style={styles.scheduleButton}
              onPressEvent={handleNavigateToVbcSchedule}
              label={t('viewVBCschedule')}
            />
          )}
        </Container>

        {showStartApplicationButton && (
          <Button
            style={styles.startApplicationButton}
            onPressEvent={handlePressStartApplication}
            label={t('startApplication')}
            isLoading={loading}
          />
        )}
        {!showStartApplicationButton && vbcProgramAllowCancel && (
          <View style={styles.reapplyView}>
            <Button
              style={styles.reapplyButton}
              onPressEvent={handlePressCancelApplication}
              label={t('cancel')}
              isLoading={loading}
            />
            <Button
              style={styles.reapplyButton}
              onPressEvent={handlePressReapplyApplication}
              label={t('reapply')}
              isLoading={reapplyLoading}
            />
          </View>
        )}

        <View>
          <AppText
            style={[
              styles.apiErrorText,
              {color: apiError ? Theme.error : Theme.success},
            ]}>
            {apiError || apiSuccessMessage}
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
};

export default VbcProgramStep4;
