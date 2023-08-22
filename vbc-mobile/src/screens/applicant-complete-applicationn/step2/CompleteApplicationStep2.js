/**
 * Applicant Complete Application Step 2 screen
 */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  documentsIcon,
  financialInformationIcon,
  professionalOtherFIIcon,
} from 'assets/icons';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import {Container, AppText, Button, TextInput} from 'components';
import {occupationOptions, VBCProgramPaymentFramework} from 'constants';
import {
  applicantCompleteApplicationStep2ApiCall,
  fetchRequiredDocumentsApiCall,
  getMasterDataApiCall,
} from 'apis/apis';
import {saveApplicantLoanApplicationAction} from 'actions';
import {
  initialFormFieldsState,
  initialFormFieldsErrorState,
  transformApiRequest,
  getRequiredFields,
  transformApiResponse,
  financialInformationFields,
} from './formatter.js';
import {
  businessOwnerFields,
  financialInfoFieldsArray,
  professionalInfoFieldArray,
  salariedPrivateFields,
  selfEmployedFields,
} from './formFields';
import styles from './styles';
import {MASTER_DATA_FINANCE_APPLICANT} from 'constants/appConstants.js';
import {OCCUPATION_VALUE} from '../../../constants/dropdownItems.js';

const CompleteApplicationStep2 = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['completeLoan', 'validationMessages']);
  const {masterData, loginData} = useSelector((state) => state.login);
  const {applicantOverviewData, applicantProgramData} = useSelector(
    (state) => state.applicant
  );
  const {navigate} = useNavigation();
  const {params} = useRoute();

  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsErrorState
  );
  const [loading, setLoading] = useState(false);
  const [requiredDocuments, setRequiredDocuments] = useState(null);
  const isRequired =
    applicantOverviewData?.paymentTypeOpted ===
    VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE;

  /** Check if our redux store contains data of field -
   * If yes, save it in our local state
   */
  useEffect(() => {
    if (applicantProgramData) {
      const transformedBody = transformApiResponse(
        applicantProgramData,
        occupationOptions,
        masterData
      );
      setFormFields({...formFields, ...transformedBody});
    }
  }, []);

  /**
   * Checking if selectedOccupation is coming in navigation params.
   * If yes, set the formField value to this and
   * fetching required documents
   */
  useEffect(() => {
    fetchRequiredDocuments();
  }, []);

  /**
   * Checking if selectedOccupation is coming in navigation params.
   * If yes, set the formField value to this and
   * fetching required documents
   */
  const fetchRequiredDocuments = async () => {
    if (params && params.selectedOccupation) {
      setFormFields({
        ...formFields,
        occupation: params.selectedOccupation.value,
      });
      const {apiResponse} = await fetchRequiredDocumentsService(
        params.selectedOccupation.id
      );
      if (apiResponse) {
        setRequiredDocuments(apiResponse.data?.data);
      }
    }
  };

  /** Fetch required documents -
   * when field occupation value
   * is updated.
   */
  const fetchRequiredDocumentsOnUpdateOccupation = async () => {
    setFormFieldsError({...formFieldsError, apiError: null});
    const {apiResponse} = await fetchRequiredDocumentsService(
      formFields.occupation
    );
    if (apiResponse) {
      setRequiredDocuments(apiResponse.data?.data);
    }
  };

  useEffect(() => {
    fetchRequiredDocumentsOnUpdateOccupation();
  }, [formFields.occupation]);

  /** fetching required documents by api according to passed occupation type  */
  const fetchRequiredDocumentsService = async (occupationId) => {
    const {access_token} = loginData;
    const data = await fetchRequiredDocumentsApiCall(
      access_token,
      occupationId
    );
    return data;
  };

  // fetch master data for applicant
  useEffect(() => {
    fetchMasterDataService();
  }, []);

  // fetch master data based on required master data fields for applicant
  const fetchMasterDataService = async () => {
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_FINANCE_APPLICANT
    );
    return masterDataApiResponse;
  };

  /** callback function of textInput component */
  const handleChangeText =
    (type, inputType, convertToInt) => (value, textInputErrorMessage) => {
      // if there is any error on the current input field, make it null in the input error state key
      const inputError = {
        ...formFieldsError,
        apiError: null,
        [`${type}Error`]: textInputErrorMessage,
      };
      setFormFieldsError(inputError);
      let values;
      if (inputType === 'dropdown') {
        values = {
          ...formFields,
          [type]: type === 'occupation' ? value?.value : value.name,
        };
        /** resetting all fields related to occupation when occupation is changed */
        if (type === 'occupation') {
          values = {
            ...values,
            employerName: null,
            netMonthlyIncome: null,
            grossAnnualIncome: null,
            companyType: null,
            annualProfit: null,
            sales: null,
            residenceType: null,
            professionName: null,
            primaryBank: null,
            salaryBankAccount: null,
            companyName: null,
            natureOfBusiness: null,
            industryType: null,
            mainBankerOfCompany: null,
            tenureYears: null,
            tenureMonths: null,
            yearsInBusiness: null,
            monthInBusiness: null,
            workExperienceYears: null,
            workExperienceMonths: null,
            experienceYears: null,
            experienceMonths: null,
            anyOtherAsset: null,
          };
          setFormFieldsError({
            ...formFieldsError,
            employerNameError: null,
            netMonthlyIncomeError: null,
            grossAnnualIncomeError: null,
            companyTypeError: null,
            annualProfitsError: null,
            annualProfitError: null,
            salesError: null,
            residenceTypeError: null,
            professionNameError: null,
            primaryBankError: null,
            salaryBankAccountError: null,
            companyNameError: null,
            natureOfBusinessError: null,
            industryTypeError: null,
            mainBankerOfCompanyError: null,
            tenureYearsError: null,
            tenureMonthsError: null,
            yearsInBusinessError: null,
            monthInBusinessError: null,
            workExperienceYearsError: null,
            workExperienceMonthsError: null,
            experienceYearsError: null,
            experienceMonthsError: null,
            anyOtherAssetError: null,
            anyOtherAssetError: null,
          });
        }
      } else {
        let textInputValue = value;
        if (convertToInt) {
          textInputValue = Number(value);
        }
        values = {...formFields, [type]: textInputValue};
      }
      setFormFields(values);
    };
  /** when user presses save and proceed button */
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
    /* KEPT DELIBERATELY */
    /** getting required fields */
    const requiredFields = getRequiredFields(formFields.occupation);
    const requiredFieldsByPaymentType =
      applicantOverviewData?.paymentTypeOpted ===
      VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
        ? [...requiredFields, ...financialInformationFields]
        : [];
    requiredFieldsByPaymentType?.map((field) => {
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
    const transformedBody = transformApiRequest(formFields, occupationOptions);
    const {apiResponse, apiError} = await submitStep2DetailsService(
      transformedBody
    );
    if (apiResponse) {
      setLoading(false);
      dispatch(saveApplicantLoanApplicationAction(apiResponse.data?.data));
      /** payment framework is financial assistance - navigate to documents upload screen */
      if (
        applicantOverviewData &&
        applicantOverviewData.paymentTypeOpted ===
          VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
      ) {
        navigate('ApplicantCompleteApplicationDocumentsUpload');
      } else {
        navigate('ApplicantCompleteApplicationStep3');
      }
    } else if (apiError) {
      setLoading(false);
      setFormFieldsError({
        ...formFieldsError,
        apiError: apiError.localizedMessage,
      });
    }
  };

  // validates month to be less then 11
  const validateMonth = (month) => {
    return month <= 11;
  };

  /** rendering required documents */
  const renderRequiredDocuments = () => {
    if (requiredDocuments) {
      return Object.keys(requiredDocuments).map((item, index) => {
        return (
          <AppText style={styles.requiredDocumentsItemText} key={index}>
            {item}
          </AppText>
        );
      });
    }
  };

  /** calling step 2 api to submit details */
  const submitStep2DetailsService = async (body) => {
    const {access_token} = loginData;
    const response = await applicantCompleteApplicationStep2ApiCall(
      access_token,
      body
    );
    return response;
  };

  // fetches dropdown items based on field type
  const handleGetDropdownItems = (fieldType) => {
    switch (fieldType) {
      case 'professionName': {
        return masterData?.professions;
      }
      case 'primaryBank': {
        return masterData?.banks;
      }
      case 'residenceType': {
        return masterData?.residenceTypes;
      }
      case 'employerName': {
        return masterData?.employers;
      }
      case 'salaryBankAccount': {
        return masterData?.banks;
      }
      case 'companyType': {
        return masterData?.companyTypes;
      }
      case 'natureOfBusiness': {
        return masterData?.natureOfBusinesses;
      }
      case 'industryType': {
        return masterData?.industryTypes;
      }
      case 'natureOfBusiness': {
        return masterData?.natureOfBusinesses;
      }
      case 'mainBankerOfCompany': {
        return masterData?.banks;
      }
      case 'occupation': {
        return occupationOptions;
      }
      default: {
        return [];
      }
    }
  };

  // returns user selected dropdown value
  const handleGetDropdownValue = (item) => {
    return item.valueKey === 'occupation'
      ? OCCUPATION_VALUE[formFields[item.dropdownValue]]
      : formFields[item.dropdownValue];
  };

  // conditionally render form based on type of field
  const renderForm = (item) => {
    if (item.yearInputs) {
      return (
        <View>
          {item.valueKey === 'experience' ? (
            isRequired ? (
              <AppText style={styles.placeholder}>
                {t('experience') + ' *'}
              </AppText>
            ) : (
              <AppText style={styles.placeholder}>{t('experience')}</AppText>
            )
          ) : (
            <AppText style={styles.placeholder}>
              {t(item.valueKey) + ' *'}
            </AppText>
          )}
          <View style={styles.formFieldsInRowContainer}>
            {item.yearInputs.map((yearInputsItem) => {
              return (
                <TextInput
                  required={isRequired}
                  value={formFields[yearInputsItem.valueKey]}
                  placeholder={t(yearInputsItem.placeholder)}
                  style={styles.smallTextInputContainer}
                  onChangeText={handleChangeText(yearInputsItem.valueKey)}
                  validationFunction={yearInputsItem.validationFunction}
                  validationErrorMessage={yearInputsItem.validationErrorMessage}
                  errorMessage={formFieldsError[yearInputsItem.errorMessageKey]}
                  keyboardType={yearInputsItem.keyboardType}
                  maxLength={yearInputsItem.maxLength}
                />
              );
            })}
          </View>
        </View>
      );
    } else {
      return (
        <ConditionalTextInput
          item={item}
          handleChangeText={handleChangeText}
          handleGetDropdownItems={handleGetDropdownItems}
          handleGetDropdownValue={handleGetDropdownValue}
          value={formFields[item.valueKey]}
          errorMessage={formFieldsError[item.errorMessageKey]}
          placeholder={t(item.placeholder)}
          required={isRequired}
        />
      );
    }
  };

  const renderAdditionalFormFieldsForSelfImployed = () => {
    return <View>{selfEmployedFields.map((item) => renderForm(item))}</View>;
  };

  const renderAdditionalFormFieldsForSalariedPrivate = () => {
    return <View>{salariedPrivateFields.map((item) => renderForm(item))}</View>;
  };

  const renderAdditionalFormFieldsForBusinessOwner = () => {
    return <View>{businessOwnerFields.map((item) => renderForm(item))}</View>;
  };

  const renderAdditionalFormFields = () => {
    let occupation = formFields.occupation;
    switch (occupation) {
      case 'SELF_EMPLOYED': {
        return renderAdditionalFormFieldsForSelfImployed();
      }
      case 'SALARIED_PRIVATE': {
        return renderAdditionalFormFieldsForSalariedPrivate();
      }
      case 'SALARIED_PUBLIC': {
        return renderAdditionalFormFieldsForSalariedPrivate();
      }
      case 'BUSINESS_OWNER': {
        return renderAdditionalFormFieldsForBusinessOwner();
      }
      default: {
        return renderAdditionalFormFieldsForSelfImployed();
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.containerStyleView}>
      <Container style={styles.containerContainer} isBackgroundPlain>
        <View style={styles.headingContainer}>
          <Image
            source={financialInformationIcon}
            resizeMode={'contain'}
            style={styles.headingIcon}
          />
          <AppText style={styles.heading}>{t('financialInformation')}</AppText>
        </View>
        {financialInfoFieldsArray.map((item) => renderForm(item))}
      </Container>

      <Container style={styles.containerContainerSecond} isBackgroundPlain>
        <View style={styles.headingContainer}>
          <Image
            source={professionalOtherFIIcon}
            resizeMode={'contain'}
            style={styles.headingIcon}
          />
          <AppText style={styles.heading}>
            {t('professionalandotherfinancialinformation')}
          </AppText>
        </View>
        {professionalInfoFieldArray.map((item) => renderForm(item))}
        {renderAdditionalFormFields()}
      </Container>

      {requiredDocuments &&
        applicantOverviewData &&
        applicantOverviewData.paymentTypeOpted ===
          VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE && (
          <Container style={styles.containerContainer}>
            <View style={styles.headingContainer}>
              <Image
                source={documentsIcon}
                resizeMode={'contain'}
                style={styles.headingIcon}
              />
              <AppText style={styles.heading}>{t('requiredDocuments')}</AppText>
            </View>
            {renderRequiredDocuments()}
          </Container>
        )}

      <Button
        style={styles.buttonContainer}
        onPressEvent={handlePressSave}
        label={t('saveAndProceed')}
        isLoading={loading}
      />

      <View style={styles.errorContainer}>
        <AppText style={styles.apiErrorText}>
          {formFieldsError.apiError}
        </AppText>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CompleteApplicationStep2;
