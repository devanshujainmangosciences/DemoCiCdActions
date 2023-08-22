/**
 * Screen component for Applicant (old copy)
 * Applicant option
 */
import React, {useEffect, useState, useRef} from 'react';
import {View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {downArrorIcon, addApplicantsIcon} from 'assets/icons';
import {Container, AppText, TextInput, Button} from 'components';
import {vbcProgramAddApplicantAction} from 'actions';
import {validateEmail, validateMobile} from 'utils';
import {genderTypes} from 'constants';
import Applicant from 'screens/vbc-program/add-applicant/Applicant';
import {requiredFields} from 'screens/vbc-program/add-applicant/formatter';
import {addApplicantApiCall, deleteApplicantApiCall} from 'apis';
import {transfromAddApplicantRequest} from './formatter';
import styles from './styles';

const Applicants = () => {
  const dispatch = useDispatch();
  const {vbcProgramStepAddApplicant, vbcProgramUserCurrentStep} = useSelector(
    (state) => state.vbcProgram
  );
  const {loginData} = useSelector((state) => state.login);
  const scrollViewRef = useRef(); // ref of main scroll view
  const {t} = useTranslation(['loanApplication', 'validationMessages']);

  const initialFormFields = {
    firstName: null,
    middleName: null,
    lastName: null,
    age: null,
    gender: null,
    genderName: null,
    mobile: null,
    email: null,
    relationshipWithPatient: null,
  };
  const initialFormFieldsError = {
    firstNameError: null,
    middleNameError: null,
    lastNameError: null,
    ageError: null,
    genderError: null,
    mobileError: null,
    emailError: null,
    relationshipWithPatientError: null,
    apiError: null,
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [applicants, setApplicants] = useState([]); // state that stores all applicants data
  const [loading, setLoading] = useState(false);

  /**
   * fetching applicants
   * from async storage
   * and saving it to local state
   * applicants
   */
  useEffect(() => {
    fetchApplicantsFromLocalStorage();
  }, []);

  /**
   * whenever local state applicants
   * is changing -
   * we are updating our async storage
   * with the new applicants
   */
  useEffect(() => {
    dispatch(vbcProgramAddApplicantAction(applicants));
  }, [applicants]);

  /**
   * fetching applicants
   * from async storage
   * and saving it to local state
   * applicants
   */
  const fetchApplicantsFromLocalStorage = async () => {
    const data = vbcProgramStepAddApplicant;
    if (data && data.length > 0) {
      setApplicants(data);
    } else {
      setApplicants([]);
    }
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
        [type]: value?.id,
        [type + 'Name']: value?.name,
      };
    } else {
      values = {...formFields, [type]: value};
    }
    setFormFields(values);
  };

  /**
   * when user presses save button for
   * adding applicant
   */
  const handlePressSave = async () => {
    setLoading(true);
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
      setLoading(false);
      return;
    }
    // applicants can be added till upto 5 times only
    if (!applicants || (applicants && applicants.length < 5)) {
      // attaching id to every applicant added
      const {apiResponse, apiError} = await addApplicantService(formFields);
      if (apiResponse) {
        const applicantId = apiResponse.data?.data?.id || Date.now().toString();
        const formFieldsWithId = {...formFields, applicantId};
        setApplicants([...applicants, {...formFieldsWithId}]);
        scrollViewRef.current.scrollToEnd();
        setFormFields(initialFormFields);
        setLoading(false);
      } else if (apiError) {
        setLoading(false);
        setFormFieldsError({
          ...initialFormFieldsError,
          apiError: apiError.localizedMessage,
        });
      }
    } else {
      // TODO
      setLoading(false);
    }
  };

  const addApplicantService = async (body) => {
    const {access_token} = loginData;
    const transformedBody = transfromAddApplicantRequest(body);
    const response = await addApplicantApiCall(transformedBody, access_token);
    return response;
  };

  /**
   * when user presses cancel button while adding applicant
   */
  const handlePressCancel = () => {
    setFormFields(initialFormFields);
    setFormFieldsError(initialFormFieldsError);
  };

  /**
   * Callback.
   * when user presses delete button
   * on applicant listing
   */
  const handlePressApplicantDelete = (applicantId) => {
    const {access_token} = loginData;
    const {apiResponse} = deleteApplicantApiCall(applicantId, access_token);
    if (apiResponse) {
      const newApplicantsList = applicants.filter(
        (item) => item.id !== applicantId && item.applicantId !== applicantId
      );
      setApplicants(newApplicantsList);
    }
  };

  const isVbcProgramStarted = vbcProgramUserCurrentStep === 4;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {isVbcProgramStarted ? (
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

              <TextInput
                value={formFields.firstName}
                required={true}
                placeholder={t('firstName')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('firstName')}
                errorMessage={formFieldsError.firstNameError}
              />

              <TextInput
                value={formFields.middleName}
                placeholder={t('middleName')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('middleName')}
                errorMessage={formFieldsError.middleNameError}
              />

              <TextInput
                value={formFields.lastName}
                placeholder={t('lastName')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('lastName')}
                errorMessage={formFieldsError.lastNameError}
              />

              <TextInput
                value={formFields.age}
                placeholder={t('age')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('age')}
                errorMessage={formFieldsError.ageError}
              />

              <TextInput
                required={true}
                inputType={'dropdown'}
                value={formFields.gender}
                dropdownValue={formFields.gender}
                dropdownItems={genderTypes}
                rightInputIcon={downArrorIcon}
                placeholder={t('gender')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('gender', 'dropdown')}
                errorMessage={formFieldsError.genderError}
              />

              <TextInput
                maxLength={10}
                validationFunction={validateMobile}
                validationErrorMessage={
                  t('validationMessages:pleaseEnterValid') + t('mobile')
                }
                value={formFields.mobile}
                required={true}
                placeholder={t('mobile')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('mobile')}
                errorMessage={formFieldsError.mobileError}
              />

              <TextInput
                validationFunction={validateEmail}
                validationErrorMessage={
                  t('validationMessages:pleaseEnterValid') + t('email')
                }
                value={formFields.email}
                required={true}
                placeholder={t('email')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('email')}
                errorMessage={formFieldsError.emailError}
              />

              <TextInput
                value={formFields.relationshipWithPatient}
                required={true}
                placeholder={t('relationshipWithPatient')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('relationshipWithPatient')}
                errorMessage={formFieldsError.relationshipWithPatientError}
              />

              <AppText style={styles.note}>
                {t('addApplicantNoteFor1And5Members')}
              </AppText>

              <View style={styles.buttonContainer}>
                <Button
                  disabled={loading}
                  onPressEvent={handlePressCancel}
                  style={styles.cancelButton}
                  label={t('cancel')}
                />

                <Button
                  disabled={loading}
                  onPressEvent={handlePressSave}
                  style={styles.saveButton}
                  label={t('save')}
                  isLoading={loading}
                />
              </View>
              <View>
                <AppText style={styles.apiErrorText}>
                  {formFieldsError.apiError}
                </AppText>
              </View>
            </Container>
            {applicants && applicants.length > 0 ? (
              <View style={styles.applicantContainer}>
                <Applicant
                  applicantData={applicants}
                  onApplicantDeletePress={handlePressApplicantDelete}
                />
              </View>
            ) : (
              <View style={styles.noApplicantContainer}>
                <AppText style={styles.noApplicantText}>
                  {t('noApplicantAdded')}
                </AppText>
              </View>
            )}
          </>
        ) : (
          <View>
            <AppText style={styles.programNotStarted}>
              {t('programNotStarted')}
            </AppText>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Applicants;
