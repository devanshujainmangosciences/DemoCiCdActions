/**
 * Applicant Documents screen
 */
import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {PERMISSIONS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Loader} from 'components';
import NoData from 'components/no-data/NoData';
import {downloadDocumentApiCall, fetchUploadedDocumentsApiCall} from 'apis';
import {requestPermissionHelperFunction} from 'utils';
import AlreadyUploadedDocuments from 'screens/documents-upload/AlreadyUploadedDocuments';
import styles from './styles';

const ApplicantDocuments = () => {
  const scrollViewRef = useRef(); // ref of main scroll view
  const [fullPageLoading, setFullPageLoading] = useState(true);
  const {loginData} = useSelector((state) => state.login);
  const {applicantOverviewData} = useSelector((state) => state.applicant);
  const {applicationSubmitFlag} = applicantOverviewData || {};
  const {t} = useTranslation([
    'documents',
    'loanApplication',
    'validationMessages',
  ]);

  // list of all uploaded documents
  const [alreadyUploadedDocuments, setAlreadyUploadedDocuments] = useState(
    null
  );

  /** Fetch user's get uploaded documents. */
  useFocusEffect(
    useCallback(() => {
      if (loginData) {
        fetchUploadedDocuments();
      }
    }, [])
  );

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
    setFullPageLoading(true);
    const {apiResponse} = await fetchUploadedDocumentsService();
    if (apiResponse) {
      setAlreadyUploadedDocuments(apiResponse.data?.data);
    }
    setFullPageLoading(false);
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

  /** download document api call */
  const downloadDocumentService = async (documentId, documentFormat) => {
    const {access_token} = loginData;
    const data = await downloadDocumentApiCall(
      documentId,
      documentFormat,
      access_token
    );
    return data;
  };

  if (fullPageLoading) {
    return (
      <View style={styles.fullPageLoadingContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.view}
      style={styles.viewStyle}>
      {!applicationSubmitFlag && (
        <NoData
          showCompleteApplicationButton={true}
          title={t('documents:noLoanApplicationSubmitedNote')}
        />
      )}
      {applicationSubmitFlag &&
        alreadyUploadedDocuments &&
        alreadyUploadedDocuments.length === 0 && (
          <NoData
            showCompleteApplicationButton={false}
            title={t('documents:noDocumentsNote')}
          />
        )}
      {applicationSubmitFlag &&
        alreadyUploadedDocuments &&
        alreadyUploadedDocuments.length > 0 && (
          <AlreadyUploadedDocuments
            uploadedDocuments={alreadyUploadedDocuments}
            onDownloadPress={handleDownloadPress}
            title={t('uploadedDocuments')}
          />
        )}
    </ScrollView>
  );
};

export default ApplicantDocuments;
