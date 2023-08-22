/**
 * Document upload screen
 */
import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {PERMISSIONS} from 'react-native-permissions';
import {useTranslation} from 'react-i18next';
import {AuthContext} from 'src/App';
import {AppText, Container, Button, TextInput, Loader} from 'components';
import AlreadyUploadedDocuments from './AlreadyUploadedDocuments';
import {downArrorIcon} from 'assets/icons';
import {
  deleteDocumentApiCall,
  downloadDocumentApiCall,
  fetchUploadedDocumentsApiCall,
  uploadDocumentForPatientApiCall,
} from 'apis';
import {requiredFields} from './formatter';
import {requestPermissionHelperFunction} from 'utils';
import styles from './styles';

const DocumentsUpload = () => {
  const scrollViewRef = useRef(); // ref of main scroll view
  const {documentTypes} = useSelector((state) => state.documents);
  const {loginData} = useSelector((state) => state.login);
  const {params} = useRoute();
  const {toggleConfirmationModal, isConfirmed} = React.useContext(AuthContext);

  const {t} = useTranslation([
    'documents',
    'validationMessages',
    'confirmationModal',
  ]);
  const initialFormFields = {
    selectedDocument: null, // coming from previous screen
    availableUploadingDocumentTypes: null, // available options to upload for particular selectedDocument
    selectedUploadingDocumentType: null, // user selected uploading document type
    selectFile: null, // uploading document
  };
  const initialFormFieldsError = {
    selectedDocumentError: null,
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
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true);

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
   * getting what user selected in previous screen
   * and saving it in our local state
   * to show it in dropdown.
   * Also, what all could user upload i.e. availableUploadingDocumentTypes values
   * are also parsed from documentTypes object that is present in redux store.
   * We fetched documentTypes from api in previous screen i.e. Documents
   */
  useEffect(() => {
    if (params.selectedDocument) {
      setFormFields({...formFields, selectedDocument: params.selectedDocument});
      const availableDocumentTypes = Object.keys(documentTypes).filter(
        (item) => item === params.selectedDocument
      );

      if (availableDocumentTypes.length > 0) {
        const availableDocumentTypesDropdownValues = documentTypes[
          availableDocumentTypes
        ].map((item) => {
          return {
            id: item,
            name: item,
          };
        });
        setFormFields({
          ...formFields,
          selectedDocument: params.selectedDocument,
          availableUploadingDocumentTypes: availableDocumentTypesDropdownValues,
          selectedUploadingDocumentType:
            params.selectedUploadingDocumentType || null,
        });
      }
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

  /**
   * file picker callback
   */
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
          [`${field}Error`]:
            field === 'selectedUploadingDocumentType'
              ? t('validationMessages:please') +
                t('selectSelectedUploadingDocument')
              : t('validationMessages:please') + t('selectFile'),
        };
      }
    });
    // show validation errors
    if (isValidationError) {
      setFormFieldsError({...formFieldsError, ...errorObj});
      setLoading(false);
      return;
    }
    setFormFieldsError(initialFormFieldsError);
    const file = new FormData();
    file.append('file', formFields.selectFile);
    file.append('documentType', formFields.selectedUploadingDocumentType);
    const {apiResponse, apiError} = await uploadDocumentService(file);
    if (apiResponse) {
      setFormFields({
        ...formFields,
        selectedUploadingDocumentType: null,
        selectFile: null,
      });
      scrollViewRef.current.scrollToEnd();
      /** fetching uploaded documents again */
      setFullPageLoading(true);
      await fetchUploadedDocuments();
      await params.refreshData();
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
    const data = await uploadDocumentForPatientApiCall(file, access_token);
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
      if (data && data.length > 0) {
        setAlreadyUploadedDocuments(data);
      } else {
        setAlreadyUploadedDocuments(null);
      }
    }
  };

  /**
   * when user presses delete button -
   * we call delete document api
   */
  const handlePressDelete = async (documentId) => {
    setDeleteDocuentId(documentId);
    toggleConfirmationModal(t('confirmationModal:confirmDeleteDocument'));
  };

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      handleDeleteDocument();
    }
  }, [isConfirmed]);

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

  const alreadySelectedDocument =
    alreadyUploadedDocuments?.filter(
      (item) =>
        item.documentTypeName === formFields['selectedUploadingDocumentType']
    ).length > 0 &&
    formFields?.selectedDocument !== 'MEDICAL' &&
    formFields?.selectedUploadingDocumentType !== 'Cancelled Cheque';

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.view}
      style={styles.viewStyle}>
      <Container style={styles.container}>
        <TextInput
          disabled={true}
          required={true}
          inputType={'dropdown'}
          value={formFields.selectedDocument}
          dropdownValue={formFields.selectedDocument}
          rightInputIcon={downArrorIcon}
          placeholder={t('documentType')}
          style={styles.textInputContainer}
          errorMessage={formFieldsError.selectedDocumentError}
        />
        <TextInput
          required={true}
          inputType={'dropdown'}
          value={formFields.selectedUploadingDocumentType}
          dropdownValue={formFields.selectedUploadingDocumentType}
          rightInputIcon={downArrorIcon}
          dropdownItems={formFields.availableUploadingDocumentTypes}
          placeholder={t('document')}
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
    </ScrollView>
  );
};

export default DocumentsUpload;
