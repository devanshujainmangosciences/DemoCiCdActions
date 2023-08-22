/**
 * Drug Schedule screen
 */
import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import DocumentPicker from 'react-native-document-picker';
import {Switch} from 'react-native-switch';

import {Container, AppText, Loader} from 'components';
import {getVbcProgramDrugScheduleAction} from 'actions';
import {schedules} from 'assets/icons';
import DrugScheduleItem from './DrugScheduleItem';

import {
  acknowledgeFirstGrantApiCall,
  getDrugScheduleApiCall,
  uploadDocumentApiCall,
  uploadDocumentForPatientApiCall,
} from 'apis';
import DrugDocumentUploadModal from './DrugDocumentUploadModal';
import {Theme, VBCProgramPaymentFramework} from 'constants';
import {AuthContext} from 'src/App';
import {dynamicSize} from 'utils';
import styles from './styles';

const DrugSchedule = () => {
  const dispatch = useDispatch();
  const {loginData} = useSelector((state) => state.login);
  const {toggleConfirmationModal: showAcknowledgeConfirmModal, isConfirmed} =
    React.useContext(AuthContext);

  const [mangoGrantConfirmation, setMangoGrantConfirmation] = useState(true);

  const {vbcProgramStep1, vbcProgramDrugScheduleData: drugScheduleData} =
    useSelector((state) => state.vbcProgram);

  const payGrantToLender = useSelector(
    (state) => state.vbcProgram.vbcProgramDrugScheduleData?.payGrantToLender
  );

  const {t} = useTranslation(['drugSchedule']);
  const [showFirstMangoGrant, setShowFirstMangoGrant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCycleId, setSelectedCycleId] = useState(null);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  // sets first mango grant value based on mangoGrantReceivedFlag inside drugschedule data
  useEffect(() => {
    if (drugScheduleData && drugScheduleData.content) {
      setShowFirstMangoGrant(
        drugScheduleData?.content.find((item) => item.cycleNo === 1)
          ?.mangoGrantReceivedFlag === false
          ? true
          : false
      );
    }
  }, [drugScheduleData]);

  // To be called when user clicked on the confirm button of the confirmation modal
  useEffect(() => {
    if (isConfirmed) {
      acknowledgeFirstGrantService();
    }
  }, [isConfirmed]);

  /** calling api to fetch drug schedule */
  const fetchDrugScheduleService = async () => {
    setLoading(true);
    const {access_token} = loginData;

    const {apiResponse, apiError} = await getDrugScheduleApiCall(access_token);
    if (apiResponse) {
      /** saving the api data to redux store */
      dispatch(getVbcProgramDrugScheduleAction(apiResponse.data?.data));
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  /** calling api to acknowledge mango grant received or not*/
  const acknowledgeFirstGrantService = async () => {
    setLoading(true);
    const {access_token} = loginData;

    const {apiResponse, apiError} = await acknowledgeFirstGrantApiCall(
      access_token
    );
    if (apiResponse) {
      /** saving the api data to redux store */
      fetchDrugScheduleService();
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  // show and hide document upload modal
  const toggleConfirmationModal = (id) => {
    setFileUploadLoading(false);
    setSelectedFile(null);
    setShowModal(!showModal);
    if (id) {
      setSelectedCycleId(id);
    }
  };

  /**  file picker callback */
  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  /** calling api function to upload document */
  const uploadDocumentService = async (file) => {
    const {access_token} = loginData;
    const data = await uploadDocumentForPatientApiCall(file, access_token);
    return data;
  };

  // called when user clicks on upload button of document upload modal
  const onPressConfirmDocumentUpload = async () => {
    setFileUploadLoading(true);
    const file = new FormData();
    file.append('file', selectedFile);
    file.append('id', selectedCycleId);
    file.append('cycleNo', selectedCycleId);
    file.append('documentType', 'Drug Receipt');
    const {apiResponse, apiError} = await uploadDocumentService(file);
    if (apiResponse) {
      setFileUploadLoading(false);
      setLoading(true);
      /** fetching uploaded documents again */
      await fetchDrugScheduleService();
      setShowModal(false);
    } else if (apiError) {
      setFileUploadLoading(false);
    }
  };

  /**
   * toggle when user presses confirmation checkbox
   */
  const handlePressAcknowledgeGrant = (val) => {
    if (val) {
      showAcknowledgeConfirmModal(t('areYouSure'));
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const {content, cumulativeAmount} = drugScheduleData || {};

  return (
    <ScrollView
      contentContainerStyle={styles.view}
      style={styles.viewStyle}
      showsVerticalScrollIndicator={false}>
      <Container isBackgroundPlain={true} style={styles.containerContainer}>
        <View style={styles.containerHeadingContainer}>
          <Image
            source={schedules}
            resizeMode={'contain'}
            style={styles.headingIcon}
          />
          <AppText style={styles.containerHeading}>{t('drugSchedule')}</AppText>
        </View>
        <AppText style={styles.note}>
          {content?.length > 0 ? t('note') : t('noteForEmptyData')}
        </AppText>
      </Container>
      {showFirstMangoGrant &&
        vbcProgramStep1 !== VBCProgramPaymentFramework.SELF_PAY &&
        !payGrantToLender && (
          <Container isBackgroundPlain={true} style={styles.containerContainer}>
            <AppText style={styles.containerHeading}>
              {t('haveYouRecievedYourFirstMangoGrant')}
            </AppText>
            <View style={styles.switchContainer}>
              <Switch
                value={!mangoGrantConfirmation}
                onValueChange={handlePressAcknowledgeGrant}
                disabled={false}
                activeText={t('yes')}
                inActiveText={t('no')}
                backgroundActive={Theme.primary}
                backgroundInactive={Theme.grey}
                circleActiveColor={Theme.snow}
                circleInActiveColor={Theme.snow}
                innerCircleStyle={styles.switchCircle}
                circleSize={dynamicSize(28)}
                switchLeftPx={dynamicSize(10)}
                switchRightPx={dynamicSize(8)}
                barHeight={dynamicSize(24)}
              />
            </View>
          </Container>
        )}

      <Container isBackgroundPlain={true} style={styles.containerContainer}>
        <AppText style={styles.containerHeading}>
          {`${t('totalCostIncured')}:`}
        </AppText>
        <AppText style={styles.totalCost}>
          {`₹ ${cumulativeAmount || t('na')}`}
        </AppText>
      </Container>
      <DrugScheduleItem toggleConfirmationModal={toggleConfirmationModal} />
      {showModal && (
        <DrugDocumentUploadModal
          isVisible={showModal}
          toggleConfirmationModal={toggleConfirmationModal}
          fileUploadLoading={fileUploadLoading}
          onPressConfirmDocumentUpload={onPressConfirmDocumentUpload}
          handleFilePicker={handleFilePicker}
          selectFile={selectedFile}
        />
      )}
    </ScrollView>
  );
};

export default DrugSchedule;
