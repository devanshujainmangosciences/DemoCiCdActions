/**
 * Screen component for Applicants
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthContext} from 'src/App';
import {addApplicantsIcon} from 'assets/icons';
import {VBCProgramPaymentFramework} from 'constants';
import {storeApplicantOverviewDataAction} from 'actions/applicant';

import {Container, AppText, Button, LoaderOverlay} from 'components';
import {vbcProgramAddApplicantAction} from 'actions';
import {genderTypes} from 'constants';
import Applicant from 'screens/vbc-program/add-applicant/Applicant';
import {requiredFields} from 'screens/vbc-program/add-applicant/formatter';
import {
  addApplicantApiCall,
  deleteApplicantApiCall,
  fetchApplicantsDataApiCall,
  submitToMangoExecutiveApiCall,
} from 'apis';
import {initialFormFields, initialFormFieldsError} from './formatter';
import {applicantInfoFieldsArray} from './formFields';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import styles from './styles';

const Applicants = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {vbcProgramStep1, vbcProgramUserCurrentStep, paymentSwitchInProgress} =
    useSelector((state) => state.vbcProgram);
  const {applicantOverviewData} = useSelector((state) => state.applicant);
  const {loginData, masterData} = useSelector((state) => state.login);
  const [allowAddApplicant, setAllowAddApplicant] = useState(true); // whether to show or hide save/cancel button
  const {toggleConfirmationModal, isConfirmed} = React.useContext(AuthContext);
  const [deleteApplicantId, setDeleteApplicantId] = useState('');
  const [isSubmitToMangoDisabled, setIsSubmitToMangoDisabled] = useState(true);

  const scrollViewRef = useRef(); // ref of main scroll view
  const {t} = useTranslation([
    'loanApplication',
    'validationMessages',
    'confirmationModal',
    'applicants',
  ]);

  const [formFields, setFormFields] = useState(initialFormFields);
  const [showAddApplicantForm, setShowAddApplicantForm] = useState(false);
  const [errorSubmitToMangoExecutive, setErrorSubmitToMangoExecutive] =
    useState('');
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [loading, setLoading] = useState(false);

  const {content, enrollmentStatus} = applicantOverviewData
    ? applicantOverviewData
    : {};

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      handleDeleteApplicant();
    }
  }, [isConfirmed]);

  /**
   * Checking whether we need to enable add applicants or not,
   * depending upon applicants length
   */
  useEffect(() => {
    if (
      (vbcProgramStep1 ===
        VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD &&
        content &&
        content.length === 1) ||
      (content && content.length === 5)
    ) {
      setAllowAddApplicant(false);
      setShowAddApplicantForm(false);
    } else {
      setAllowAddApplicant(true);
    }
  }, [content, vbcProgramStep1]);

  const handleNavigateToApplication = () => {
    const isVbcProgramStarted = vbcProgramUserCurrentStep === 4;
    if (isVbcProgramStarted) {
      navigate('VbcProgramStep4');
    } else {
      navigate('VbcProgramTerms');
    }
  };

  // decide to show add new applicant button based on enrollment status or not
  useEffect(() => {
    if (applicantOverviewData) {
      if (
        applicantOverviewData?.enrollmentStatus ===
          'Loan application yet to be submitted' ||
        applicantOverviewData.enrollmentStatus === 'Rejected'
      ) {
        setIsSubmitToMangoDisabled(false);
      }
      if (
        applicantOverviewData.enrollmentStatus ===
          'credit assessment under process' ||
        applicantOverviewData.enrollmentStatus === 'Approved'
      ) {
        setIsSubmitToMangoDisabled(true);
      }
    }
  }, [applicantOverviewData]);

  /** fetching applicants data from api call
   * and store it in global state
   */
  const fetchApplicantsDataService = async () => {
    setLoading(true);
    const {access_token} = loginData;
    const {apiResponse} = await fetchApplicantsDataApiCall(access_token);
    if (apiResponse) {
      dispatch(storeApplicantOverviewDataAction(apiResponse.data));
    }
    setLoading(false);
  };

  // submit to mango executive api call
  const submitToMangoExecutive = async () => {
    setLoading(true);
    const {access_token} = loginData;
    const {apiResponse, apiError} = await submitToMangoExecutiveApiCall(
      access_token
    );
    if (apiResponse) {
      navigate('VbcProgram');
    } else if (apiError) {
      setErrorSubmitToMangoExecutive(
        apiError.localizedMessage || t('validationMessages:somethingWentWrong')
      );
    }
    setLoading(false);
  };

  /** calling api function to get overview data */
  useEffect(() => {
    fetchApplicantsDataService();
  }, [loginData]);

  const handleChangeText =
    (type, inputType) => (value, textInputErrorMessage) => {
      const inputError = {
        ...formFieldsError,
        [`${type}Error`]: textInputErrorMessage,
      };
      setFormFieldsError(inputError);
      let values;
      if (inputType === 'dropdown') {
        values = {
          ...formFields,
          [type]: value?.name,
          // [type + 'Name']: value?.name,
        };
      } else {
        values = {...formFields, [type]: value};
      }
      setFormFields(values);
    };

  /**
   * when user presses save button for
   * adding applicant,
   * check validations,
   * call add applicant api,
   * dispatch action with updated list of applicants.
   */
  const handlePressSave = async () => {
    setLoading(true);
    setFormFieldsError({...formFieldsError, apiError: null});
    let errorObj = {};
    let isValidationError = false;

    /**
     * Check if there is already an error
     * present due to text input items.
     * If there are no errors -
     * call api to add applicants,
     * and dispatch action with the upated list
     * of applicants.
     */
    Object.keys(formFieldsError).map((item) => {
      if (item !== 'apiError' && formFieldsError[item]) {
        isValidationError = true;
      }
    });

    requiredFields.map((field) => {
      const fieldValue = formFields[field];
      if (!fieldValue) {
        isValidationError = true;
        errorObj = {
          ...errorObj,
          [`${field}Error`]: t('validationMessages:pleaseEnter') + t(field),
        };
      }
    });
    // show validation errors
    if (isValidationError) {
      setFormFieldsError({...formFieldsError, ...errorObj});
      setLoading(false);
      return;
    }
    const {apiResponse, apiError} = await addApplicantService(formFields);
    if (apiResponse) {
      dispatch(
        vbcProgramAddApplicantAction([...content, apiResponse.data?.data])
      );
      fetchApplicantsDataService();
      setFormFields(initialFormFields);
      setLoading(false);
      scrollViewRef.current.scrollToEnd();
    } else if (apiError) {
      setLoading(false);
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError: apiError.localizedMessage,
      });
    }
  };

  /** add applicant api call */
  const addApplicantService = async (body) => {
    const {access_token} = loginData;
    // const transformedBody = transfromAddApplicantRequest(body);
    const response = await addApplicantApiCall(body, access_token);
    return response;
  };

  /* when user presses cancel button while adding applicant */
  const handlePressCancel = () => {
    setShowAddApplicantForm(false);
    setFormFields(initialFormFields);
    setFormFieldsError(initialFormFieldsError);
  };

  // called when user confirms to delete the applicant, it delets the selected applicant
  const handleDeleteApplicant = async () => {
    const {access_token} = loginData;
    const {apiResponse} = await deleteApplicantApiCall(
      deleteApplicantId,
      access_token
    );
    if (apiResponse) {
      fetchApplicantsDataService();

      const newApplicantsList = content.filter(
        (item) => item.id != deleteApplicantId
      );
      dispatch(vbcProgramAddApplicantAction(newApplicantsList));
    }
  };

  const handleShowAddApplicantForm = () => {
    setShowAddApplicantForm(true);
  };

  /**
   * Callback.
   * when user presses delete button
   * on applicant listing -
   * we call remove applicant api to remove applicant
   * and dispatch action with the updated applicants list.
   */
  const handlePressApplicantDelete = async (applicantId) => {
    setDeleteApplicantId(applicantId);
    toggleConfirmationModal(t('confirmationModal:confirmDeleteApplicant'));
  };

  // fetches dropdown items based on field type
  const handleGetDropdownItems = (fieldType) => {
    switch (fieldType) {
      case 'gender': {
        return genderTypes;
      }
      case 'relationToPatient': {
        return masterData?.relationships;
      }
      default: {
        return [];
      }
    }
  };

  // returns user selected dropdown value
  const handleGetDropdownValue = (item) => {
    return formFields[item.dropdownValue];
  };

  // conditionally render form based on type of field
  const renderForm = (item) => {
    return (
      <ConditionalTextInput
        item={item}
        handleChangeText={handleChangeText}
        handleGetDropdownItems={handleGetDropdownItems}
        handleGetDropdownValue={handleGetDropdownValue}
        value={formFields[item.valueKey]}
        errorMessage={formFieldsError[item.errorMessageKey]}
        placeholder={t(item.placeholder)}
        required={item.required}
      />
    );
  };

  const isVbcProgramStarted = vbcProgramUserCurrentStep === 4;
  const showAddCancelButton = !content || (content && content.length < 5);
  const showCompleteApplicationButton =
    vbcProgramStep1 !== VBCProgramPaymentFramework.SELF_PAY &&
    vbcProgramStep1 !== VBCProgramPaymentFramework.LOAN_AGAINST_OWN_FD;

  const isShowSubmitButton =
    !isSubmitToMangoDisabled || paymentSwitchInProgress;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {isVbcProgramStarted &&
        (vbcProgramStep1 ===
          VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD ||
          vbcProgramStep1 ==
            VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE ||
          (VBCProgramPaymentFramework.SELF_PAY &&
            paymentSwitchInProgress === true)) ? (
          <>
            <Container
              isBackgroundPlain={true}
              style={styles.containerContainer}>
              <View style={styles.containerHeadingContainer}>
                <Image
                  source={addApplicantsIcon}
                  resizeMode={'contain'}
                  style={styles.headingIcon}
                />
                <AppText style={styles.containerHeading}>
                  {t('addApplicant')}
                </AppText>
              </View>
              {showAddApplicantForm ? (
                <>
                  {applicantInfoFieldsArray.map((item) => renderForm(item))}
                  <AppText style={styles.note}>
                    {t('addApplicantNoteFor1And5Members')}
                  </AppText>
                  {showAddCancelButton && (
                    <View style={styles.buttonContainer}>
                      <Button
                        onPressEvent={handlePressCancel}
                        style={styles.cancelButton}
                        label={t('cancel')}
                      />
                      <Button
                        onPressEvent={handlePressSave}
                        style={styles.saveButton}
                        label={t('save')}
                      />
                    </View>
                  )}
                  <View>
                    <AppText style={styles.apiErrorText}>
                      {formFieldsError.apiError}
                    </AppText>
                  </View>
                </>
              ) : (
                <>
                  {!isSubmitToMangoDisabled && (
                    <Button
                      disabled={!allowAddApplicant}
                      style={styles.saveAndProceedButtonContainer}
                      onPressEvent={handleShowAddApplicantForm}
                      label={t('addNewApplicant')}
                    />
                  )}
                  {isShowSubmitButton && (
                    <Button
                      disabled={
                        paymentSwitchInProgress
                          ? false
                          : isSubmitToMangoDisabled
                      }
                      style={styles.saveAndProceedButtonContainer}
                      onPressEvent={submitToMangoExecutive}
                      label={t('submitApplication')}
                    />
                  )}

                  {VBCProgramPaymentFramework.SELF_PAY &&
                  paymentSwitchInProgress === true ? (
                    <View style={styles.statusContainer}>
                      <AppText style={styles.statusText}>
                        {`${t('status')}: ${t('statusSelfPay')}`}
                      </AppText>
                    </View>
                  ) : (
                    <View style={styles.statusContainer}>
                      <AppText style={styles.statusText}>
                        {`${t('status')}: ${enrollmentStatus}`}
                      </AppText>
                    </View>
                  )}

                  <View>
                    <AppText style={styles.apiErrorText}>
                      {errorSubmitToMangoExecutive}
                    </AppText>
                  </View>
                </>
              )}
            </Container>
            {content && content.length > 0 && (
              <View style={styles.applicantContainer}>
                <Applicant
                  hideDeleteButton={isSubmitToMangoDisabled}
                  applicantData={content}
                  onApplicantDeletePress={handlePressApplicantDelete}
                />
              </View>
            )}
          </>
        ) : (
          <View>
            <Container
              style={styles.containerContainer}
              isBackgroundPlain={true}>
              <AppText style={[styles.note, {marginTop: 0}]}>
                {t('applicants:notEnrolledMessage')}
              </AppText>
            </Container>
            {showCompleteApplicationButton && (
              <Button
                style={styles.completeApplicationButtonContainer}
                onPressEvent={handleNavigateToApplication}
                label={t('completeApplication')}
              />
            )}
          </View>
        )}
      </View>
      {loading && <LoaderOverlay isVisible={loading} />}
    </KeyboardAwareScrollView>
  );
};

export default Applicants;
