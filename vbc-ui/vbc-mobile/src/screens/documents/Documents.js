/**
 * Documents screen
 */
import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {PERMISSIONS} from 'react-native-permissions';
import {Container, Button, TextInput, Loader} from 'components';
import {downArrorIcon} from 'assets/icons';
import {
  fetchDocumentTypesApiCall,
  deleteDocumentApiCall,
  fetchUploadedDocumentsApiCall,
  downloadDocumentApiCall,
} from 'apis/apis';
import {storeDocumentTypesAction} from 'actions';
import {requiredFields} from './formatter';
import {AuthContext} from 'src/App';
import {requestPermissionHelperFunction} from 'utils';
import AlreadyUploadedDocuments from 'screens/documents-upload/AlreadyUploadedDocuments';
import styles from './styles';

const Documents = () => {
  const scrollViewRef = useRef(); // ref of main scroll view
  const {loginData} = useSelector((state) => state.login);
  const {documentTypes} = useSelector((state) => state.documents);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation(['documents', 'validationMessages']);
  const {toggleConfirmationModal, isConfirmed} = React.useContext(AuthContext);
  const initialFormFields = {
    selectedDocument: null,
    selectedDocumentName: null,
  };
  const initialFormFieldsError = {
    selectedDocumentError: null,
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  // stores document type values that needs to be shown in dropdown
  const [dropdownDocumentTypes, setDropdownDocumentTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  // list of all uploaded documents
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] = useState(
    null
  );
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const [deleteDocumentId, setDeleteDocuentId] = useState('');

  /** get document types
   * by calling api
   */
  useEffect(() => {
    loginData && getDocumentTypes();
  }, []);

  /** fetching documents from api */
  const fetchUploadedDocumentsService = async () => {
    const {access_token} = loginData;
    const response = await fetchUploadedDocumentsApiCall(access_token);
    return response;
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
   * get uploaded documents from api
   */
  useEffect(() => {
    loginData && fetchUploadedDocuments();
  }, []);

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

  // format document types values
  useEffect(() => {
    if (documentTypes) {
      const data = Object.keys(documentTypes)
        .map((item) => {
          return {label: item, value: item, id: item, name: item};
        })
        .filter((document) => document.label !== 'RECEIPT');
      setDropdownDocumentTypes(data);
    }
  }, [documentTypes]);

  /**
   * to get user input text/dropdown-items values
   * We are taking second parameter of first functions
   * as whether the fields is dropdown or not.
   * If yes, we have to arrange the selected value as 'id' & 'value'
   * to showcase the value in input field &
   * to send id to apis.
   */
  const handleChangeText = () => (value) => {
    setFormFieldsError(initialFormFieldsError);
    setFormFields({
      ...formFields,
      selectedDocument: value.id,
      selectedDocumentName: value.name,
    });
  };

  const handleAddNewDocument = () => {
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

    requiredFields.map((field) => {
      const fieldValue = formFields[field];
      if (!fieldValue) {
        isValidationError = true;
        errorObj = {
          ...errorObj,
          [`${field}Error`]:
            t('validationMessages:pleaseSelect') + t('documentType'),
        };
      }
    });
    // show validation errors
    if (isValidationError) {
      setFormFieldsError({...formFieldsError, ...errorObj});
      return;
    }
    navigate('DocumentsUpload', {
      selectedDocument: formFields.selectedDocument,
      refreshData: fetchUploadedDocuments,
    });
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
      setLoading(false);
    } else if (apiError) {
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError: t('validationMessages:somethingWentWrong'),
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      contentContainerStyle={styles.view}
      style={styles.viewStyle}>
      <Container style={styles.container}>
        <TextInput
          required={true}
          inputType={'dropdown'}
          value={formFields.selectedDocument}
          dropdownValue={formFields.selectedDocumentName}
          rightInputIcon={downArrorIcon}
          dropdownItems={dropdownDocumentTypes}
          placeholder={t('documentType')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('gender', 'dropdown')}
          errorMessage={formFieldsError.selectedDocumentError}
        />
        <Button
          style={styles.button}
          onPressEvent={handleAddNewDocument}
          label={t('addNewDocument')}
          isLoading={loading}
        />
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
            fetchUploadedDocuments={fetchUploadedDocuments}
          />
        )}
    </ScrollView>
  );
};

export default Documents;
