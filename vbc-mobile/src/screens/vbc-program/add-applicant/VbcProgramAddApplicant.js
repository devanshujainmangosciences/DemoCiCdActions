/**
 * Screen component for PBP program Add Applicant
 */
import React, {useEffect, useState, useRef} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'src/App';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import {Container, AppText, Button, HorizontalTimeline} from 'components';
import {saveVbcProgramDataAction, setDropdownSelectedValue} from 'actions';
import {VBCProgramPaymentFramework} from 'constants';
import {genderTypes} from 'constants';
import {addApplicantsIcon} from 'assets/icons';
import Applicant from './Applicant';
import {
  initialFormFields,
  initialFormFieldsError,
  requiredFields,
} from './formatter';
import {storeVbcProgramStep3ApiCall} from 'apis';
import {transformGetVbcProgramEnrollmentApiData} from '../formatter';
import {transformApiRequest} from './formatter';
import {applicantInfoFieldArray} from './formFields';
import styles from './styles';

const VBCProgramAddApplicant = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {
    vbcProgramStepAddApplicant,
    vbcProgramStep1,
    vbcProgramUserCurrentStep,
  } = useSelector((state) => state.vbcProgram);
  const {loginData, masterData} = useSelector((state) => state.login);
  const scrollViewRef = useRef(); // ref of main scroll view
  const {t} = useTranslation([
    'loanApplication',
    'validationMessages',
    'confirmationModal',
  ]);

  // context variable
  const {
    toggleConfirmationModal,
    isConfirmed,
    resetConfirmationValue,
  } = React.useContext(AuthContext);

  const [formFields, setFormFields] = useState(initialFormFields);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteApplicantId, setDeleteApplicantId] = useState('');
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [applicants, setApplicants] = useState([]); // state that stores all applicants data
  const [showSaveCancelButton, setShowCancelButton] = useState(true); // whether to show or hide save/cancel button
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * fetching applicants
   * from redux store
   * and saving it to local state
   * applicants.
   * Checking if Payment framework is caregiver's fd -
   * we can only add one applicant.
   */
  useEffect(() => {
    const data = vbcProgramStepAddApplicant;
    if (data?.length > 0) {
      if (
        vbcProgramStep1 === VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD
      ) {
        setApplicants([data[0]]);
      } else {
        setApplicants(data);
      }
    }
  }, [vbcProgramStepAddApplicant]);

  /**
   * Checking whether we need to show Save & Cancel button or not,
   * depending upon applicants length
   */
  useEffect(() => {
    if (
      (vbcProgramStep1 ===
        VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD &&
        applicants &&
        applicants.length === 1) ||
      (applicants && applicants.length === 5)
    ) {
      setShowCancelButton(false);
    } else {
      setShowCancelButton(true);
    }
  }, [applicants, vbcProgramStep1]);

  useEffect(() => {
    if (isEditing) {
      setShowCancelButton(true);
    }
  }, [isEditing]);

  /** calling api to save Step3 data */
  const saveVBCProgramStep3DataService = async () => {
    const {access_token} = loginData;
    const body = transformApiRequest(applicants);
    const response = await storeVbcProgramStep3ApiCall(body, access_token);
    return response;
  };

  /**
   * to get user input text/dropdown-items values
   * We are taking second parameter of first functions
   * as whether the fields is dropdown or not.
   * If yes, we have to arrange the selected value as 'id' & 'value'
   * to showcase the value in input field &
   * to send id to apis.
   */
  const handleChangeText = (type, inputType) => (
    value,
    textInputErrorMessage
  ) => {
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

  const handlePressEdit = (applicantItem) => {
    setFormFields(applicantItem);
    scrollViewRef.current.scrollToPosition(0, 0);
    setIsEditing(true);
  };

  // called when user confirms to delete the applicant, it delets the selected applicant
  const handleDeleteApplicant = () => {
    const newApplicantsList = applicants.filter(
      (item) =>
        item.applicantId != deleteApplicantId && item.id != deleteApplicantId
    );
    setApplicants(newApplicantsList);
    dispatch(setDropdownSelectedValue(null));
    setIsEditing(false);
  };

  /**
   * Callback.
   * when user presses delete button
   * on applicant listing
   */
  const handlePressApplicantDelete = (applicantId) => {
    setDeleteApplicantId(applicantId);
    toggleConfirmationModal(t('confirmationModal:confirmDeleteApplicant'));
  };

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      handleDeleteApplicant();
    }
  }, [isConfirmed]);

  /**
   * once api is called and response is received -
   * we transform the response and save the response in our global state variable.
   * After dispatching this action - we navigate the user to next step.
   */
  const handlePersistStep3ValuesAndNavigateToStep4 = (apiResponse) => {
    const transformedData = transformGetVbcProgramEnrollmentApiData(
      apiResponse.data?.data,
      masterData
    );
    /** saving the api data to redux store */
    dispatch(saveVbcProgramDataAction(transformedData));
    setLoading(false);
    resetConfirmationValue();
    navigate('VbcProgramStep4');
  };

  /**
   * when user presses on final button present at bottom -
   * Save and Proceed,
   * we check whether any applicant is present or not?,
   * if applicant/s are present -
   * we can step3 api to store them in server's db.
   */
  const handlePressSaveAndProceed = async () => {
    setLoading(true);
    if (
      // (!showApplicants && applicants && applicants.length === 1) ||
      applicants &&
      applicants.length > 0
    ) {
      const {apiResponse, apiError} = await saveVBCProgramStep3DataService();
      if (apiResponse) {
        handlePersistStep3ValuesAndNavigateToStep4(apiResponse);
      } else if (apiError) {
        setLoading(false);
        setApiError(
          apiError?.localizedMessage ||
            t('validationMessages:somethingWentWrong')
        );
      }
    } else {
      setLoading(false);
    }
    setIsEditing(false);
  };

  /**
   * when user presses save button for
   * adding applicant
   */
  const handlePressSave = async () => {
    setFormFieldsError({...formFieldsError, apiError: null});
    let errorObj = {};
    let isValidationError = false;

    /**
     * Check if there is already an error
     * present due to text input items
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
      return;
    }

    // handling the edit applicant case, finding if what user editing already present in the applicants list
    // and if yes, then updating it, else adding new one
    const filteredApplicants = applicants.filter(
      (item) =>
        (item.id || item.applicantId) ===
        (formFields.id || formFields.applicantId)
    );
    if (filteredApplicants.length > 0) {
      const newApplicants = applicants.map((item) => {
        if (
          (item.id || item.applicantId) ===
          (formFields.id || formFields.applicantId)
        ) {
          return {...formFields};
        } else {
          return {...item};
        }
      });
      setApplicants(newApplicants);
      scrollViewRef.current.scrollToEnd();
      setFormFields(initialFormFields);
      setIsEditing(false);
    } else {
      // attaching id to every applicant added
      const applicantId = Date.now().toString();
      const formFieldsWithId = {...formFields, applicantId};
      setApplicants([...(applicants || []), {...formFieldsWithId}]);
      scrollViewRef.current.scrollToEnd();
      setFormFields(initialFormFields);
      setIsEditing(false);
    }
  };

  /**
   * when user presses cancel button while adding applicant
   */
  const handlePressCancel = () => {
    setFormFields(initialFormFields);
    setFormFieldsError(initialFormFieldsError);
    setIsEditing(false);
  };

  // fetches dropdown items based on field type
  const handleGetDropdownItems = (fieldType) => {
    switch (fieldType) {
      case 'gender': {
        return genderTypes;
      }
      case 'relationToPatient': {
        return masterData.relationships;
      }
      default: {
        return [];
      }
    }
  };

  // returns selected dropdown value
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

  const note =
    vbcProgramStep1 ===
    VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
      ? t('addApplicantNoteFor5Members')
      : t('addApplicantNote');

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}>
      <View style={styles.container}>
        <View style={styles.horizontalTimelineContainer}>
          <HorizontalTimeline totalCycleCount={4} presentCycleCount={3} />
        </View>
        <Container isBackgroundPlain={true} style={styles.containerContainer}>
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
          {applicantInfoFieldArray.map((item) => renderForm(item))}
          <AppText style={styles.note}>{note}</AppText>
          {showSaveCancelButton && (
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
        </Container>
        {applicants?.length > 0 && (
          <View style={styles.applicantContainer}>
            <Applicant
              applicantData={applicants}
              onApplicantDeletePress={handlePressApplicantDelete}
              onApplicantEditPress={handlePressEdit}
              enableApplicantEdit={vbcProgramUserCurrentStep !== 4}
            />
          </View>
        )}
        <Button
          disabled={loading}
          style={styles.saveAndProceedButtonContainer}
          onPressEvent={handlePressSaveAndProceed}
          label={t('saveAndProceed')}
          isLoading={loading}
        />
        <View>
          <AppText style={styles.apiErrorText}>{apiError}</AppText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VBCProgramAddApplicant;
