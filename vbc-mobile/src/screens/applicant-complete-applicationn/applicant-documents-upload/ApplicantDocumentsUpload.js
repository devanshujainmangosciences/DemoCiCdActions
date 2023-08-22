/**
 * Document upload screen
 */
import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {PERMISSIONS} from 'react-native-permissions';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'src/App';
import {AppText, Container, Button, TextInput, Loader} from 'components';
import {downArrorIcon, rightMark, pendingDocuments} from 'assets/icons';
import {
  applicantCompleteApplicationStep3ApiCall,
  deleteDocumentApiCall,
  downloadDocumentApiCall,
  fetchApplicantLoanApplicationDataApiCall,
  fetchUploadedDocumentsApiCall,
  uploadDocumentApiCall,
  fetchDocumentTypesApiCall,
} from 'apis';
import {getDropdownValueItemId, requestPermissionHelperFunction} from 'utils';
import AlreadyUploadedDocuments from 'screens/documents-upload/AlreadyUploadedDocuments';
import {
  getDocumentsForDropdown,
  getRequiredDocumentStatus,
  requiredFields,
} from './formatter';
import {occupationOptions, Theme} from 'constants';
import {
  saveApplicantLoanApplicationAction,
  storeDocumentTypesAction,
} from 'actions';
import styles from './styles';

const ApplicantDocumentsUpload = () => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(); // ref of main scroll view
  const {navigate} = useNavigation();
  const {loginData} = useSelector((state) => state.login);
  const {applicantProgramData} = useSelector((state) => state.applicant);
  const {toggleConfirmationModal, isConfirmed, resetConfirmationValue} =
    React.useContext(AuthContext);
  const {t} = useTranslation([
    'documents',
    'loanApplication',
    'validationMessages',
    'confirmationModal',
  ]);
  const initialFormFields = {
    availableUploadingDocumentTypes: null, // available options to upload for particular selectedDocument
    selectedUploadingDocumentType: null, // user selected uploading document type
    selectFile: null, // uploading document
  };
  const initialFormFieldsError = {
    availableUploadingDocumentTypesError: null,
    selectedUploadingDocumentTypeError: null,
    selectFileError: null, // uploading document error
    apiError: null, // if any api error occurs
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [deleteDocumentId, setDeleteDocuentId] = useState('');
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  // list of all uploaded documents
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] =
    useState(null);
  /** store required documents */
  const [requiredDocuments, setRequiredDocuments] = useState(null);
  const [requiredDocumentsForDropdown, setRequiredDocumentsForDropdown] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [finalLoading, setFinalLoading] = useState(false); // loader at submit button

  /**
   * get uploaded documents from api
   */
  useEffect(() => {
    loginData && fetchUploadedDocuments();
  }, []);

  /** fetching documents from api */
  const fetchUploadedDocumentsService = async () => {
    const {access_token} = loginData;
    const response = await fetchUploadedDocumentsApiCall(access_token);
    return response;
  };

  /**
   * calling function to fetch already uploaded documents
   * and saving it in our local state
   * */
  const fetchUploadedDocuments = async () => {
    const {apiResponse} = await fetchUploadedDocumentsService();
    if (apiResponse) {
      setAlreadyUploadedDocuments(apiResponse.data?.data);
    }
    setFullPageLoading(false);
  };

  /**
   * get documents type api call
   */
  const callDocumentTypesApi = async () => {
    const {access_token} = loginData;
    const data = await fetchDocumentTypesApiCall(access_token);
    return data;
  };

  /**
   * calling document types api
   * and storing api response
   * in redux store
   */
  const getDocumentTypes = async () => {
    const {apiResponse, apiError} = await callDocumentTypesApi();
    if (apiResponse) {
      dispatch(storeDocumentTypesAction(apiResponse.data?.data));
      const documentsForDropdown = getDocumentsForDropdown(
        apiResponse.data?.data
      );
      setRequiredDocumentsForDropdown(documentsForDropdown);
    } else if (apiError) {
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError: t('validationMessages:somethingWentWrong'),
      });
    }
  };

  /** get required documents object that contains -
   * dropdown format data
   * and status i.e. uploaded, pending items
   */
  useEffect(() => {
    getDocumentTypes();
    const {requiredDocuments} = applicantProgramData || {};
    if (requiredDocuments) {
      const {requiredDocumentsStatus} =
        getRequiredDocumentStatus(requiredDocuments);
      setRequiredDocuments(requiredDocumentsStatus);
      setRequiredDocumentsForDropdown([]);
    }
  }, []);

  /**
   * to get user input text/dropdown-items values
   * We are taking second parameter of first functions
   * as whether the fields is dropdown or not.
   * If yes, we have to arrange the selected value as 'id' & 'value'
   * to showcase the value in input field &
   * to send id to apis.
   */
  const handleChangeText = (type, inputType) => (value) => {
    if (inputType === 'filePicker') {
      handleFilePicker();
      return;
    }
    setFormFieldsError({...formFieldsError, [`${type}Error`]: null});
    setFormFields({
      ...formFields,
      [`${type}`]: value.name,
      // [`${type}Name`]: value.name,
    });
  };

  /**  file picker callback */
  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setFormFields({...formFields, selectFile: res});
      setFormFieldsError({...formFieldsError, selectFileError: null});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  /** get document status from api by calling loan application details api */
  const handleDocumentStatus = async () => {
    const {access_token} = loginData;
    const {apiResponse} = await fetchApplicantLoanApplicationDataApiCall(
      access_token
    );
    if (apiResponse) {
      dispatch(saveApplicantLoanApplicationAction(apiResponse.data?.data));
      const {requiredDocumentsStatus} = getRequiredDocumentStatus(
        apiResponse.data?.data.requiredDocuments
      );
      setRequiredDocuments(requiredDocumentsStatus);
    }
  };

  /**
   * When user presses upload button -
   * we check validations
   * and then upload document to the server.
   * Once document is successfully uploded -
   * we fetch all uploaded documents -
   * to refresh already uploaded documents view
   */
  const onPressAddNewDocument = async () => {
    setLoading(true);
    /**
     * Check if there is already an error
     * present due to text input items
     */
    let isValidationError = false;
    let errorObj = {};
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
      return;
    }
    const {financeDetails: {occupation} = {}} = applicantProgramData || {};
    const occupationId = getDropdownValueItemId(occupationOptions, occupation);
    setFormFieldsError(initialFormFieldsError);
    const file = new FormData();
    file.append('file', formFields.selectFile);
    file.append('occupationTypeId', occupationId);
    file.append('documentType', formFields.selectedUploadingDocumentType);
    const {apiResponse, apiError} = await uploadDocumentService(file);
    if (apiResponse) {
      setFormFields({
        ...formFields,
        selectedUploadingDocumentType: null,
        selectFile: null,
      });
      setLoading(false);
      scrollViewRef.current.scrollToEnd();
      /** fetching uploaded documents again */
      setFullPageLoading(true);
      await fetchUploadedDocuments();
      await handleDocumentStatus();
    } else if (apiError) {
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError: t('validationMessages:somethingWentWrong'),
      });
    }
    setLoading(false);
  };

  /** calling api function to upload document */
  const uploadDocumentService = async (file) => {
    const {access_token} = loginData;
    const data = await uploadDocumentApiCall(file, access_token);
    return data;
  };

  /**
   * when user clicks on cancel button -
   * we clear internal local state values
   */
  const onPressCancelNewDocument = () => {
    setFormFields({
      ...formFields,
      selectedUploadingDocumentType: null,
      selectFile: null,
    });
    setFormFieldsError(initialFormFieldsError);
  };

  /**
   * delete document api call
   */
  const deleteDocumentService = async (documentId) => {
    const {access_token} = loginData;
    const data = await deleteDocumentApiCall(documentId, access_token);
    return data;
  };

  // called when user confirms to delete the document, it delets the selected document
  const handleDeleteDocument = async () => {
    const {apiResponse} = await deleteDocumentService(deleteDocumentId);
    if (apiResponse) {
      const data = alreadyUploadedDocuments
        ? alreadyUploadedDocuments.filter(
            (item) => item.id !== deleteDocumentId
          )
        : null;
      /** calling loan application details api to fetch document status */
      handleDocumentStatus();
      if (data && data.length > 0) {
        setAlreadyUploadedDocuments(data);
      } else {
        setAlreadyUploadedDocuments(null);
      }
    }
  };

  /**
   * when user presses delete button -
   * we call delete document api.
   * And loan application details api
   * to fetch new document status
   */
  const handlePressDelete = async (documentId) => {
    setDeleteDocuentId(documentId);
    toggleConfirmationModal(t('confirmationModal:confirmDeleteDocument'));
  };

  /**
   * callback function -
   * that is invoked
   * when user presses download button
   */
  const handleDownloadPress = async (documentId, documentFormat) => {
    const permissionReq = await requestPermissionHelperFunction(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    );
    if (permissionReq === 'granted' || permissionReq === 'unavailable') {
      await downloadDocumentService(documentId, documentFormat);
    }
  };

  /**
   * download document api call
   */
  const downloadDocumentService = async (documentId, documentFormat) => {
    const {access_token} = loginData;
    const data = await downloadDocumentApiCall(
      documentId,
      documentFormat,
      access_token
    );
    return data;
  };

  /** when user presses start application button -
   * check whether total uploaded documents length is same as
   * required documents length.
   * If yes, call step 3 api
   * and navigate the user to next step.
   */
  const handlePressStartApplication = async () => {
    setFinalLoading(true);
    const alreadyUploadedDocumentsLength = alreadyUploadedDocuments.length;

    const dropdownItemsLength = requiredDocuments.length;

    if (alreadyUploadedDocumentsLength >= dropdownItemsLength) {
      const {access_token} = loginData;
      const body = {
        proceed: true,
      };
      const {apiResponse} = await applicantCompleteApplicationStep3ApiCall(
        access_token,
        body
      );
      setFinalLoading(false);
      if (apiResponse) {
        resetConfirmationValue();
        navigate('ApplicantCompleteApplicationStep3');
      }
    } else {
      setFinalLoading(false);
    }
  };

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      handleDeleteDocument();
    }
  }, [isConfirmed]);

  const alreadySelectedDocument =
    alreadyUploadedDocuments?.filter(
      (item) =>
        item.documentTypeName === formFields['selectedUploadingDocumentType']
    ).length > 0;

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.view}
      style={styles.viewStyle}>
      <Container style={styles.container}>
        <AppText style={styles.requiredDocumentsHeadingText}>
          {t('requiredDocuments')}
        </AppText>

        <View style={styles.requiredDocumentContainer}>
          {requiredDocuments &&
            requiredDocuments.map((item, index) => {
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
        <TextInput
          required={true}
          inputType={'dropdown'}
          value={formFields.selectedUploadingDocumentType}
          dropdownValue={formFields.selectedUploadingDocumentType}
          rightInputIcon={downArrorIcon}
          dropdownItems={requiredDocumentsForDropdown}
          placeholder={t('documentType')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText(
            'selectedUploadingDocumentType',
            'dropdown'
          )}
          errorMessage={formFieldsError.selectedUploadingDocumentTypeError}
        />
        <TextInput
          required={true}
          inputType={'filePicker'}
          value={formFields.selectFile?.name}
          placeholder={t('selectFile')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('selectFile', 'filePicker')}
          errorMessage={formFieldsError.selectFileError}
        />
        <AppText style={styles.note}>{t('note')}</AppText>
        {alreadySelectedDocument && (
          <AppText style={[styles.apiErrorText]}>
            {t('documentAlreadyAdded')}
          </AppText>
        )}

        <View style={styles.buttonContainer}>
          <Button
            disabled={loading}
            style={styles.buttonCancel}
            onPressEvent={onPressCancelNewDocument}
            label={t('cancel')}
          />
          <Button
            disabled={loading || alreadySelectedDocument}
            style={styles.button}
            onPressEvent={onPressAddNewDocument}
            label={t('upload')}
            isLoading={loading}
          />
        </View>
        <AppText style={styles.apiErrorText}>
          {formFieldsError.apiError}
        </AppText>
      </Container>

      {fullPageLoading && (
        <View style={styles.fullPageLoadingContainer}>
          <Loader />
        </View>
      )}

      {!fullPageLoading &&
        alreadyUploadedDocuments &&
        alreadyUploadedDocuments.length > 0 && (
          <AlreadyUploadedDocuments
            uploadedDocuments={alreadyUploadedDocuments}
            onDeletePress={handlePressDelete}
            onDownloadPress={handleDownloadPress}
          />
        )}

      <Button
        style={styles.startApplicationButton}
        onPressEvent={handlePressStartApplication}
        label={t('loanApplication:saveAndProceed')}
        isLoading={finalLoading}
      />

      <View>
        <AppText
          style={[
            styles.apiErrorText,
            {color: false ? Theme.error : Theme.success},
          ]}>
          {null}
        </AppText>
      </View>
    </ScrollView>
  );
};

export default ApplicantDocumentsUpload;
