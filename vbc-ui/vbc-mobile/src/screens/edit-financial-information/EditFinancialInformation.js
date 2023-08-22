/**
 * Screen component for Editing Financial inforation
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {Container, AppText, Button, Loader} from 'components';
import {financialInformationIcon, professionalOtherFIIcon} from 'assets/icons';
import {insuranceOptions, AsyncStorageKeys} from 'constants';
import {
  fetchFinancialInformationApiCall,
  editFinancialInformationApiCall,
  uploadDocumentForPatientApiCall,
  downloadDocumentApiCall,
} from 'apis';
import {vbcProgramStep2Action} from 'actions';
import {requestPermissionHelperFunction, storeInAsyncStorage} from 'utils';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import {
  financialInfoFieldsArray,
  professionalInfoFieldsArray,
} from './formFields';
import {requiredFields, formatterForGetCompleteProfile} from './formatter';
import styles from './styles';
import {UploadDocument} from 'components/uploadDocument';
import {AuthContext} from 'src/App';
import {PERMISSIONS} from 'react-native-permissions';

const EditFinancialInformation = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const scrollViewRef = useRef();
  const {loginData, masterData} = useSelector((state) => state.login);
  const {t} = useTranslation([
    'loanApplication',
    'validationMessages',
    'confirmationModal',
  ]);
  const initialFormFields = {
    accountNumber: null,
    bankName: null,
    bankIfscCode: null,
    bankBranch: null,
    blankCheque: null,
    panNumber: null,
    educationLevel: null,
    employerName: null,
    industry: null,
    insurance: null,
    insuranceCompany: null,
    maturityAmount: null,
    familyAnnualIncome: null,
    designation: null,
    selfAnnualIncome: null,
    otherIncomeSource: null,
    occupation: null,
  };
  const initialFormFieldsError = {
    accountNumberError: null,
    bankNameError: null,
    bankIfscCodeError: null,
    bankBranchError: null,
    blankChequeError: null,
    panNumberError: null,
    educationLevelError: null,
    employerNameError: null,
    industryError: null,
    insuranceError: null,
    insuranceCompanyError: null,
    maturityAmountError: null,
    familyAnnualIncomeError: null,
    designationError: null,
    selfAnnualIncomeError: null,
    otherIncomeSourceError: null,
    occupationError: null,
    apiError: null,
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page
  const [cancelledChequeDocument, setCancelledChequeDocument] = useState(null);
  const [cancelledCheque, setCancelledCheque] = useState(null);
  const [cancelledChequeError, setCancelledChequeError] = useState(null);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [downloadFileLoading, setDownloadFileLoading] = useState(false);

  const {
    toggleConfirmationModal,
    isConfirmed,
    resetConfirmationValue,
    confirmationModalTitle,
  } = React.useContext(AuthContext);

  /** Fetch user's financial information */
  useEffect(() => {
    loginData && fetchFinancialInformationData();
  }, []);

  /** fetching financial info using api call */
  const fetchFinancialInformationData = async () => {
    const {access_token} = loginData;
    const {apiResponse} = await fetchFinancialInformationApiCall(access_token);
    if (apiResponse) {
      const formattedData = formatterForGetCompleteProfile(
        apiResponse.data?.data,
        masterData
      );
      setFormFields(formattedData);
      if (formattedData) {
        setCancelledChequeDocument(formattedData.cancelledChequeDocument);
        setCancelledCheque({
          name: formattedData.cancelledChequeDocument?.documentName,
        });
      }
    }
    setFullPageLoading(false);
  };

  /**
   * to get user input text/dropdown-items values
   * We are taking second parameter of first functions
   * as whether the fields is dropdown or not.
   * If yes, we have to arrange the selected value as 'id' & 'value'
   * to showcase the value in input field &
   * to send id to apis.
   */
  const handleChangeText =
    (type, inputType) => (value, textInputErrorMessage) => {
      if (inputType === 'filePicker') {
        handleFilePicker();
        return;
      }
      // if there is any error on the current input field, make it null in the input error state key
      const inputError = {
        ...formFieldsError,
        [`${type}Error`]: type === 'panNumber' ? textInputErrorMessage : null,
      };
      setFormFieldsError(inputError);
      let values;
      if (inputType === 'dropdown') {
        values = {
          ...formFields,
          [type]: value?.name,
        };
        if (type === 'insurance' && value && value.name === 'NO') {
          values = {...values, ['insuranceCompany']: null};
        }
      } else {
        values = {...formFields, [type]: value};
      }
      setFormFields(values);
    };

  /**
   * file picker callback
   */
  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setCancelledCheque(res);
      setCancelledChequeError(null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  /**
   * calling financial information
   * edit api
   */
  const callEditFinancialInformationService = async () => {
    const {access_token} = loginData;
    const data = await editFinancialInformationApiCall(
      {
        ...formFields,
        ['insurance']: formFields['insurance'] === 'YES' ? true : false,
        ['insuranceCompany']:
          formFields['insurance'] === 'YES'
            ? formFields['insuranceCompany']
            : null,
      },
      access_token
    );
    return data;
  };

  /** when user presses on submit button
   * check validations
   * and call api
   */
  const handlePressNext = async () => {
    setLoading(true);
    setFormFieldsError({...formFieldsError, apiError: null});
    let errorObj = {};
    let isValidationError = false;

    Object.keys(formFieldsError).map((item) => {
      if (item !== 'apiError' && formFieldsError[item]) {
        isValidationError = true;
      }
    });

    // user has confirmed with terms & conditions
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
      // scroll to top when error occurs
      scrollViewRef.current.scrollToPosition(0, 0);
      return;
    }
    // calling edit financial information api
    const {apiResponse, apiError} = await callEditFinancialInformationService();
    if (apiError) {
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError:
          apiError.message || t('validationMessages:somethingWentWrong'),
      });
      setLoading(false);
      return;
    } else if (apiResponse) {
      setSuccessMessage(apiResponse.data?.message);
      dispatch(vbcProgramStep2Action(formFields));
      // store user filled form data in async storage
      await storeInAsyncStorage(
        AsyncStorageKeys.VBC_PROGRAM_STEP_2,
        JSON.stringify(formFields)
      );
      setLoading(false);
      setTimeout(() => {
        navigate('OthersScreen');
      }, 2000);
      return;
    }
  };

  // make fields disable based on certain conditions and field type
  const handleGetDisabledFields = (fieldType) => {
    switch (fieldType) {
      case 'insuranceCompany': {
        return !formFields.insurance || formFields.insurance === 'NO';
      }
      default: {
        return false;
      }
    }
  };

  // fetches dropdown items based on field type
  const handleGetDropdownItems = (fieldType) => {
    switch (fieldType) {
      case 'educationLevel': {
        return masterData?.educationLevelList;
      }
      case 'occupation': {
        return masterData?.professions;
      }
      case 'employerName': {
        return masterData?.employers;
      }
      case 'industry': {
        return masterData?.industryTypes;
      }
      case 'insurance': {
        return insuranceOptions;
      }
      case 'insuranceCompany': {
        return masterData?.insuranceCompanies;
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
        handleGetDisabledFields={handleGetDisabledFields}
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

  /** calling api function to upload document */
  const uploadDocumentService = async (file) => {
    const {access_token} = loginData;
    const data = await uploadDocumentForPatientApiCall(file, access_token);
    return data;
  };

  const handleUploadFile = async () => {
    if (cancelledCheque && cancelledCheque?.name) {
      const file = new FormData();
      file.append('file', cancelledCheque);
      file.append('documentType', 'Cancelled Cheque');
      setUploadFileLoading(true);
      const {apiResponse, apiError} = await uploadDocumentService(file);
      if (apiResponse) {
        setUploadFileLoading(false);
        setCancelledChequeDocument(apiResponse?.data?.data);
        setCancelledCheque({
          name: apiResponse?.data?.data?.documentName,
        });
      } else if (apiError) {
        setUploadFileLoading(false);
        setCancelledChequeError(apiError?.message);
      }
      resetConfirmationValue();
    } else {
      setCancelledChequeError(t('uploadChequeError'));
      resetConfirmationValue();
    }
  };

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (
      isConfirmed &&
      confirmationModalTitle === t('confirmationModal:reuploadCheque')
    ) {
      handleUploadFile();
    }
  }, [isConfirmed]);

  /**
   * callback function -
   * that is invoked
   * when user presses download button
   */
  const handleDownloadPress = async () => {
    const {documentName, id} = cancelledChequeDocument;
    const documentFormat = documentName?.substring(
      documentName.lastIndexOf('.') + 1,
      documentName.length
    );
    const permissionReq = await requestPermissionHelperFunction(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    );
    if (permissionReq === 'granted' || permissionReq === 'unavailable') {
      await downloadDocumentService(id, documentFormat);
    }
  };

  /**
   * download document api call
   */
  const downloadDocumentService = async (documentId, documentFormat) => {
    setDownloadFileLoading(true);
    const {access_token} = loginData;
    const {apiResponse, apiError} = await downloadDocumentApiCall(
      documentId,
      documentFormat,
      access_token
    );
    if (apiResponse) {
      setDownloadFileLoading(false);
    } else if (apiError) {
      setDownloadFileLoading(false);
    }
  };

  const handlePressReupload = () => {
    toggleConfirmationModal(t('confirmationModal:reuploadCheque'));
  };

  if (fullPageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Container style={styles.containerContainer} isBackgroundPlain={true}>
          <View style={styles.headingContainer}>
            <Image
              source={financialInformationIcon}
              resizeMode={'contain'}
              style={styles.headingIcon}
            />
            <AppText style={styles.heading}>
              {t('financialInformation')}
            </AppText>
          </View>
          {financialInfoFieldsArray.map((item) => renderForm(item))}
          <UploadDocument
            selectFile={cancelledCheque}
            handleChangeText={handleChangeText}
            selectFileError={cancelledChequeError}
            handleUploadFile={handleUploadFile}
            uploadLoading={uploadFileLoading}
            downloadLoading={downloadFileLoading}
            placeholder={t('cancelledCheque')}
            allowDownload={
              cancelledChequeDocument &&
              Object.keys(cancelledChequeDocument).length > 0
            }
            handleDownloadPress={handleDownloadPress}
            handlePressReupload={handlePressReupload}
            reuploadDisabled={!cancelledCheque?.uri}
            required={false}
          />
          <AppText style={styles.note}>{t('note')}</AppText>
        </Container>

        <Container style={styles.containerContainer2} isBackgroundPlain={true}>
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
          {professionalInfoFieldsArray.map((item) => renderForm(item))}
        </Container>

        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressNext}
          label={t('save')}
          isLoading={loading}
        />

        <View>
          {successMessage ? (
            <AppText style={styles.successText}>{successMessage}</AppText>
          ) : (
            <AppText style={styles.apiErrorText}>
              {formFieldsError.apiError}
            </AppText>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditFinancialInformation;
