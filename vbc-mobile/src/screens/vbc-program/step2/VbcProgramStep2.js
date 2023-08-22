/**
 * Screen component for PBP program step 2
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {
  Container,
  AppText,
  Button,
  TextInput,
  HorizontalTimeline,
  Loader,
} from 'components';
import {financialInformationIcon, professionalOtherFIIcon} from 'assets/icons';
import {saveVbcProgramDataAction, vbcProgramStep2Action} from 'actions';
import {
  AsyncStorageKeys,
  insuranceOptions,
  VBCProgramPaymentFramework,
} from 'constants';
import {
  downloadDocumentApiCall,
  editFinancialInformationApiCall,
  getMasterDataApiCall,
  storeVbcProgramStep2ApiCall,
  uploadDocumentForPatientApiCall,
} from 'apis';
import {getFromAsyncStorage, requestPermissionHelperFunction} from 'utils';
import {transformGetVbcProgramEnrollmentApiData} from '../formatter';
import {
  initialFormFields,
  initialFormFieldsError,
  requiredFields,
} from './formatter';
import {
  financialInfoFieldsArray,
  professionalInfoFieldArray,
} from './formFields';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import styles from './styles';
import {UploadDocument} from 'components/uploadDocument';
import {AuthContext} from 'src/App';
import {PERMISSIONS} from 'react-native-permissions';
import {MASTER_DATA_FINANCE_PATIENT} from 'constants/appConstants';

const VbcProgramStep2 = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const scrollViewRef = useRef();
  const {loginData, masterData} = useSelector((state) => state.login);
  const {
    vbcProgramStep1,
    vbcProgramStep2: vbcProgramStep2StoreData,
    vbcProgramUserCurrentStep,
  } = useSelector((state) => state.vbcProgram);
  const {t} = useTranslation([
    'loanApplication',
    'validationMessages',
    'confirmationModal',
  ]);

  const [formFields, setFormFields] = useState(initialFormFields);
  const [cancelledChequeDocument, setCancelledChequeDocument] = useState(null);
  const [cancelledCheque, setCancelledCheque] = useState(null);
  const [cancelledChequeError, setCancelledChequeError] = useState(null);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);
  const [downloadFileLoading, setDownloadFileLoading] = useState(false);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [loading, setLoading] = useState(false);

  const {
    toggleConfirmationModal,
    isConfirmed,
    resetConfirmationValue,
    confirmationModalTitle,
  } = React.useContext(AuthContext);

  /**
   * If user comes again after reaching Step4,
   * we fetch the details from our redux store
   * and select the apt value to show to the user.
   */
  useEffect(() => {
    if (vbcProgramStep2StoreData) {
      const formFieldsData = {
        ...vbcProgramStep2StoreData,
        ['insurance']: vbcProgramStep2StoreData.insurance ? 'YES' : 'NO',
        ['panNumber']: vbcProgramStep2StoreData.panNumber,
      };
      setCancelledChequeDocument(
        vbcProgramStep2StoreData.cancelledChequeDocument
      );
      setCancelledCheque({
        name: vbcProgramStep2StoreData.cancelledChequeDocument?.documentName,
      });
      getPanNumberFromAsyncStorage(formFieldsData);
    } else {
      getPanNumberFromAsyncStorage();
    }
  }, [vbcProgramStep2StoreData]);

  // fetch master data for patient
  useEffect(() => {
    fetchMasterDataService();
  }, []);

  // fetch master data based on required master data fields for patient
  const fetchMasterDataService = async () => {
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_FINANCE_PATIENT
    );
    return masterDataApiResponse;
  };

  /** getting PAN number from async storage */
  const getPanNumberFromAsyncStorage = async (formFieldsData) => {
    const panNumber = await getFromAsyncStorage(AsyncStorageKeys.PAN_NUMBER);
    const parsedPanNumber = JSON.parse(panNumber);
    if (formFieldsData) {
      if (!formFieldsData['panNumber']) {
        setFormFields({
          ...formFieldsData,
          ['panNumber']: parsedPanNumber,
        });
      } else {
        setFormFields({
          ...formFieldsData,
        });
      }
    } else {
      setFormFields({
        ...formFields,
        ['panNumber']: parsedPanNumber,
      });
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
        if (type === 'insurance' && value && value.name === 'NO') {
          values = {
            ...formFields,
            ['insuranceCompany']: null,
            [type]: value?.name,
          };
        } else {
          values = {
            ...formFields,
            [type]: value?.name,
          };
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

  /** call vbc program step 2 api to save the data to server */
  const storeVbcProgramStep2Service = async (body) => {
    const {access_token} = loginData;
    const response = await storeVbcProgramStep2ApiCall(body, access_token);
    return response;
  };

  /** when user presses on submit button */
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
    /**
     * if PBP program is already started -
     * then this is the case -
     * when from Step4 user came to edit
     * details of Step2.
     * In this case, we call editFinancialInformationApiCall
     * to update financial information
     * and once done successfully
     */
    if (isVbcProgramCompleted) {
      const {access_token} = loginData;
      const updatedFormFields = {
        ...formFields,
        ['insurance']: formFields['insurance'] === 'YES' ? true : false,
      };
      const {apiResponse, apiError} = await editFinancialInformationApiCall(
        updatedFormFields,
        access_token
      );
      if (apiResponse) {
        dispatch(vbcProgramStep2Action(updatedFormFields));
        // store user filled form data in async storage
        // await storeInAsyncStorage(
        //   AsyncStorageKeys.VBC_PROGRAM_STEP_2,
        //   JSON.stringify(formFields),
        // );
        setLoading(false);
        navigate('VbcProgramStep4');
      } else if (apiError) {
        setFormFieldsError({
          ...initialFormFieldsError,
          apiError:
            apiError.message || t('validationMessages:somethingWentWrong'),
        });
        setLoading(false);
      }
      return;
    }
    const {apiResponse, apiError} = await storeVbcProgramStep2Service({
      ...formFields,
      ['insurance']: formFields['insurance'] === 'YES' ? true : false,
    });
    if (apiResponse) {
      /** store user filled step 2 data in redux store */
      // dispatch(vbcProgramStep2Action(formFields));
      const transformedData = transformGetVbcProgramEnrollmentApiData(
        apiResponse.data?.data,
        masterData
      );
      /** saving the api data to redux store */
      dispatch(saveVbcProgramDataAction(transformedData));
      if (
        vbcProgramStep1 ===
          VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD ||
        vbcProgramStep1 ===
          VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
      ) {
        setLoading(false);
        navigate('VbcProgramAddApplicant');
        return;
      }
      setLoading(false);
      navigate('VbcProgramStep3');
    } else if (apiError) {
      setLoading(false);
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

  // returns selected dropdown value
  const handleGetDropdownValue = (item) => {
    return formFields[item.dropdownValue];
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
        setCancelledChequeError(apiError?.message);
        setUploadFileLoading(false);
      }
      resetConfirmationValue();
    } else {
      setCancelledChequeError(t('uploadChequeError'));
      resetConfirmationValue();
    }
  };

  /**
   * callback function -
   * that is invoked
   * when user presses download button
   */
  const handleDownloadPress = async () => {
    if (vbcProgramStep2StoreData?.cancelledChequeDocument !== null) {
      const {documentName, id} =
        vbcProgramStep2StoreData?.cancelledChequeDocument;
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

  const isVbcProgramCompleted = vbcProgramUserCurrentStep === 4;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}>
      <View style={styles.container}>
        <View style={styles.horizontalTimelineContainer}>
          <HorizontalTimeline
            totalCycleCount={4}
            presentCycleCount={isVbcProgramCompleted ? 4 : 2}
          />
        </View>
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
          {professionalInfoFieldArray.map((item) => renderForm(item))}
        </Container>

        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressNext}
          label={t('saveAndProceed')}
          isLoading={loading}
        />
        <View>
          <AppText style={styles.apiErrorText}>{null}</AppText>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VbcProgramStep2;
