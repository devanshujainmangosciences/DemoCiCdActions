/**
 * Screen component for PBP program step 3
 */
import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  AppText,
  Button,
  HorizontalTimeline,
  TextInput,
} from 'components';
import {saveVbcProgramDataAction} from 'actions';
import {VBCProgramPaymentFramework} from 'constants';
import {storeVbcProgramStep3ApiCall} from 'apis';
import {transformGetVbcProgramEnrollmentApiData} from '../formatter';
import {transformApiRequest} from './formatter';
import styles from './styles';
import {Theme} from '../../../constants';

const VbcProgramStep3 = () => {
  const dispatch = useDispatch();
  const {loginData} = useSelector((state) => state.login);
  const {userPermissions} = loginData;
  const {vbcProgramStep1, vbcProgramTotalPayableAmount} = useSelector(
    (state) => state.vbcProgram
  );
  const {navigate} = useNavigation();
  const {t} = useTranslation(['loanApplication', 'validationMessages']);
  const [bankBranch, setBankBranch] = useState(null);
  const [bankBranchError, setBankBranchError] = useState(null);
  const [isReviewed, setIsReviewed] = useState(false);
  const [saveDataLoading, setSaveDataLoading] = useState(false);

  /**
   * user presses checkbox for querent program review
   */
  const handlePressReview = () => {
    setIsReviewed(!isReviewed);
  };

  const handlePersistStep3ValuesAndNavigateToStep4 = (apiResponse) => {
    if (apiResponse) {
      const transformedData = transformGetVbcProgramEnrollmentApiData(
        apiResponse.data?.data
      );
      /** saving the api data to redux store */
      dispatch(saveVbcProgramDataAction(transformedData));
    }
    setSaveDataLoading(false);
    navigate('VbcProgramStep4');
  };

  const handlePressSave = async () => {
    if (isReviewed) {
      /**
       * if we are showing additional fields -
       * we need to make sure they are filled
       */
      if (showAdditionalFields && !bankBranch) {
        setBankBranchError(
          t('validationMessages:pleaseEnter') + t('bankBranch')
        );
        return;
      }
      if (vbcProgramStep1 !== VBCProgramPaymentFramework.SELF_PAY) {
        setSaveDataLoading(true);
        const {apiResponse, apiError} = await saveVBCProgramStep3DataService();
        if (apiResponse) {
          handlePersistStep3ValuesAndNavigateToStep4(apiResponse);
        } else if (apiError) {
          setSaveDataLoading(false);
        }
      } else {
        handlePersistStep3ValuesAndNavigateToStep4();
      }
    }
  };

  /** calling api to save Step3 data */
  const saveVBCProgramStep3DataService = async () => {
    const {access_token} = loginData;
    const body = transformApiRequest(bankBranch);
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
  const handleChangeText = () => (value) => {
    setBankBranch(value);
    setBankBranchError(null);
  };

  // navigates user to PBP Schedule
  const handleNavigateToVbcSchedule = () => {
    navigate('VbcSchedule');
  };

  const userConfirmationIcon = isReviewed ? 'check-square' : 'square';
  /**
   * if payment framework is loan agains own FD
   * we show additional fields for bank details.
   */
  const showAdditionalFields =
    vbcProgramStep1 === VBCProgramPaymentFramework.LOAN_AGAINST_OWN_FD;

  return (
    <KeyboardAwareScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.horizontalTimelineContainer}>
          <HorizontalTimeline totalCycleCount={4} presentCycleCount={3} />
        </View>
        <Container style={styles.containerContainer}>
          <View style={{alignItems: 'center'}}>
            <AppText style={styles.totalCostHeading}>
              {t('totalMedicationCost')}
            </AppText>
            <AppText style={styles.totalCostDesc}>
              {`₹ ${vbcProgramTotalPayableAmount || '-'} *`}
            </AppText>
            {vbcProgramStep1 === VBCProgramPaymentFramework.SELF_PAY ? (
              <AppText style={styles.footNote}>{t('selfPayFootNote')}</AppText>
            ) : (
              <AppText style={styles.footNote}>{t('loanFootNote')}</AppText>
            )}
            {showAdditionalFields && (
              <View style={styles.additionalContainer}>
                <AppText style={styles.currentBankFdText}>
                  {t('currentBankFd')}
                </AppText>
                <TextInput
                  required={true}
                  value={bankBranch}
                  placeholder={t('bankBranch')}
                  style={styles.textInputContainer}
                  onChangeText={handleChangeText('bankBranch')}
                  errorMessage={bankBranchError}
                />
              </View>
            )}
            {userPermissions?.data?.flags?.showSchedule && (
              <Button
                style={styles.buttonContainer}
                onPressEvent={handleNavigateToVbcSchedule}
                label={t('viewVBCschedule')}
              />
            )}
          </View>
          <Pressable
            style={styles.confirmationContainer}
            onPress={handlePressReview}>
            <Icon
              name={userConfirmationIcon}
              as={FontAwesome5}
              color={Theme.lightTextColor}
              style={styles.checkBoxIcon}
            />
            <AppText style={styles.confirmText}>{t('terms')}</AppText>
          </Pressable>
        </Container>

        <Button
          style={styles.buttonContainer1}
          onPressEvent={handlePressSave}
          label={t('saveAndProceed')}
          isLoading={saveDataLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default VbcProgramStep3;
