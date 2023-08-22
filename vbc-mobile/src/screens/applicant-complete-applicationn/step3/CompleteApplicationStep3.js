/**
 * Applicant Complete Application Step 3 screen
 */
import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from 'src/App';
import {
  documentsIcon,
  financialInformationIcon,
  professionalOtherFIIcon,
} from 'assets/icons';
import {AppText, Button, Container} from 'components';
import {rightMark, pendingDocuments} from 'assets/icons';
import {
  applicantCompleteApplicationStep4ApiCall,
  fetchApplicantOverviewDataApiCall,
} from 'apis';
import {
  saveApplicantLoanApplicationAction,
  storeApplicantOverviewDataAction,
} from 'actions';
import {transformApiResponseForRenderingFields} from './formatter';
import {
  OCCUPATION_VALUE,
  PAYMENT_FRAMEWORK_VALUE,
  VBCProgramPaymentFramework,
} from 'constants';
import {convertToYearsAndMonths} from 'utils';
import {getRequiredDocumentStatus} from '../applicant-documents-upload/formatter';
import {financialInfoFields} from './formFields';
import styles from './styles';

const CompleteApplicationStep3 = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation([
    'completeLoan',
    'validationMessages',
    'confirmationModal',
  ]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const {loginData} = useSelector((state) => state.login);
  const {applicantProgramData} = useSelector((state) => state.applicant);
  const {toggleConfirmationModal, isConfirmed} = React.useContext(AuthContext);

  const {step, paymentTypeOpted, currentFixedDepositBank, totalAmountPayable} =
    applicantProgramData || {};

  const isApplicationSubmitted = step === 4;

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      handleStartApplication();
    }
  }, [isConfirmed]);

  /** returns the value to be displayed */
  const getDisplayValue = (apiDataKey, apiDataValue) => {
    let value;
    switch (apiDataKey) {
      case 'occupation': {
        value = OCCUPATION_VALUE[apiDataValue];
        break;
      }
      case 'tenureAtCompany': {
        value = convertToYearsAndMonths(apiDataValue, t('years'), t('months'));
        break;
      }
      case 'experience': {
        value = convertToYearsAndMonths(apiDataValue, t('years'), t('months'));
        break;
      }
      case 'totalWorkExperience': {
        value = convertToYearsAndMonths(apiDataValue, t('years'), t('months'));
        break;
      }
      case 'yearsInBusiness': {
        value = convertToYearsAndMonths(apiDataValue, t('years'), t('months'));
        break;
      }
      default: {
        value = apiDataValue;
        break;
      }
    }
    return value;
  };

  /** rendering additional fields */
  const renderAdditionalFields = () => {
    const {financeDetails} = applicantProgramData || {};
    const fieldsToBeRendered = transformApiResponseForRenderingFields(
      financeDetails
    );
    if (fieldsToBeRendered) {
      return Object.keys(fieldsToBeRendered).map((item, index) => {
        if (
          fieldsToBeRendered[item] &&
          item !== 'bankName' &&
          item !== 'bankBranch' &&
          item !== 'bankAccountNumber' &&
          item !== 'bankIfscCode'
        ) {
          return (
            <View key={index.toString()} style={styles.valuesContainer}>
              <AppText style={styles.valueHeadingText}>{t(`${item}`)}:</AppText>
              <AppText style={styles.valueText}>
                {getDisplayValue(item, financeDetails[item])}
              </AppText>
            </View>
          );
        }
      });
    }
  };

  const renderUploadedDocuments = () => {
    const {requiredDocuments} = applicantProgramData || {};
    const {requiredDocumentsStatus} = getRequiredDocumentStatus(
      requiredDocuments
    );
    if (!requiredDocumentsStatus) {
      return;
    }
    return (
      <Container style={styles.uploadDocumentsContainer}>
        <View style={styles.documentsIconContainer}>
          <Image
            source={documentsIcon}
            resizeMode={'contain'}
            style={styles.reviewIcon}
          />
          <AppText style={styles.financialInfo}>
            {t('uploadedDocuments')}
          </AppText>
          {!isApplicationSubmitted && (
            <Button
              onPressEvent={handlePressEdit('step3')}
              style={[
                styles.accountDetailsContainerEditButton,
                {position: 'absolute', right: 0},
              ]}
              label={t('edit')}
              labelStyle={styles.accountDetailsContainerEditButtonText}
            />
          )}
        </View>

        <View style={styles.requiredDocumentContainer}>
          {requiredDocumentsStatus &&
            requiredDocumentsStatus.map((item, index) => {
              return (
                <View style={styles.requiredDocumentItemContainer} key={index}>
                  <View style={styles.documentName}>
                    <AppText style={styles.requiredDocumentText}>
                      {item?.name}
                    </AppText>
                  </View>
                  <View style={styles.imageView}>
                    {item.status === 'Uploaded' ? (
                      <Image
                        resizeMode={'contain'}
                        source={rightMark}
                        style={styles.rightMarkIcon}
                      />
                    ) : (
                      <Image
                        resizeMode={'contain'}
                        source={pendingDocuments}
                        style={styles.headerLeftIcon}
                      />
                    )}
                  </View>
                  {/* Old style. KEPT DELIBERATELY */}
                  {/* <View
                    style={
                      item.status === 'Uploaded'
                        ? styles.requiredDocumentStatusContainerUploaded
                        : styles.requiredDocumentStatusContainer
                    }>
                    <AppText style={styles.requiredDocumentStatusText}>
                      {item.status}
                    </AppText>
                  </View> */}
                </View>
              );
            })}
        </View>
      </Container>
    );
  };

  /** calling step 2 api to submit details */
  const submitStep4DetailsService = async (body) => {
    const {access_token} = loginData;
    const response = await applicantCompleteApplicationStep4ApiCall(
      access_token,
      body
    );
    return response;
  };

  // when user clicks on edit option, navigated to expected route based on step
  const handlePressEdit = (step) => () => {
    let navigateTo;
    switch (step) {
      case 'step1': {
        navigateTo = 'ApplicantCompleteApplicationStep1';
        break;
      }
      case 'step2': {
        navigateTo = 'ApplicantCompleteApplicationStep2';
        break;
      }
      case 'step3': {
        navigateTo = 'ApplicantCompleteApplicationDocumentsUpload';
        break;
      }
    }
    navigate(navigateTo);
  };

  // Starts the application when user confirms for start application from the modal.
  const handleStartApplication = async () => {
    setLoading(true);
    const {apiResponse, apiError} = await submitStep4DetailsService(
      applicantProgramData
    );
    setLoading(false);
    if (apiResponse) {
      dispatch(saveApplicantLoanApplicationAction(apiResponse.data?.data));

      /** fetching applicant overview data from api call
       * and store it in global state
       */
      const {access_token} = loginData;
      const {
        apiResponse: apiResponse1,
      } = await fetchApplicantOverviewDataApiCall(access_token);
      if (apiResponse1) {
        dispatch(storeApplicantOverviewDataAction(apiResponse1.data?.data));
      }
      navigate('ApplicantOverview');
    } else if (apiError) {
      setApiError(
        apiError.localizedMessage || t('validationMessages:somethingWentWrong')
      );
    }
  };

  // when user clicks on start application, show the confirmation modal
  const handlePressStartApplication = () => {
    toggleConfirmationModal(t('confirmationModal:confirmStartApplication'));
  };

  const renderPaymentTypeOpted = () => {
    return (
      <View style={styles.topContainer}>
        <AppText style={styles.selectedPaymentHeading}>
          {t('paymentFramework')}:
        </AppText>
        <AppText style={styles.selectedPayment}>
          {PAYMENT_FRAMEWORK_VALUE[paymentTypeOpted]}
        </AppText>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {paymentTypeOpted ===
        VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD ? (
          <Container style={styles.paymentContainer}>
            {renderPaymentTypeOpted()}
            <>
              <View style={styles.topContainer}>
                <AppText style={styles.selectedPaymentHeading}>
                  {t('amountPayable')}:
                </AppText>
                <AppText style={styles.selectedPayment}>
                  {'\u20B9'} {totalAmountPayable}
                </AppText>
              </View>
              <View style={styles.topContainerBank}>
                <AppText style={styles.currentFd}>
                  {t('whichBankCurrentlyHoldFd')}
                </AppText>
              </View>
              <AppText style={styles.bankName}>
                {currentFixedDepositBank}
              </AppText>
              <View style={styles.noteContainer}>
                <AppText style={styles.note}>
                  {t('loanAgainstCaregiversFdNote')}
                </AppText>
              </View>
            </>
          </Container>
        ) : (
          <Container style={styles.paymentContainer}>
            {renderPaymentTypeOpted()}
          </Container>
        )}

        <Container style={styles.accountDetailsContainer}>
          <View style={styles.accountDetailsContainerHeadingContainer}>
            <AppText style={styles.accountDetailsContainerHeading}>
              {t('financialInformation')}
            </AppText>
            {!isApplicationSubmitted && (
              <Button
                onPressEvent={handlePressEdit('step2')}
                style={styles.accountDetailsContainerEditButton}
                label={t('edit')}
                labelStyle={styles.accountDetailsContainerEditButtonText}
              />
            )}
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
          {financialInfoFields.map((item) => (
            <View style={styles.valuesContainer}>
              <AppText style={styles.valueHeadingText}>
                {t(item.heading)}:
              </AppText>
              <AppText style={styles.valueText}>
                {applicantProgramData?.financeDetails[item.valueKey]}
              </AppText>
            </View>
          ))}
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
          {renderAdditionalFields()}
        </Container>

        {paymentTypeOpted ===
          VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE &&
          renderUploadedDocuments()}

        {!isApplicationSubmitted && (
          <Button
            style={styles.startApplicationButton}
            onPressEvent={handlePressStartApplication}
            label={t('submit')}
            isLoading={loading}
          />
        )}
        <View>
          <AppText style={styles.apiErrorText}>{apiError}</AppText>
        </View>
      </View>
    </ScrollView>
  );
};

export default CompleteApplicationStep3;
