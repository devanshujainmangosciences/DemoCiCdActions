/**
 * Screen component for PBP program Step 1
 */
import React, {useEffect, useState} from 'react';
import {View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, AppText, Button, HorizontalTimeline} from 'components';
import {saveVbcProgramDataAction} from 'actions';
import {VBCProgramPaymentFramework} from 'constants';
import {storeVbcProgramStep1ApiCall} from 'apis';
import {transformGetVbcProgramEnrollmentApiData} from '../formatter';
import {transformApiRequest} from './formatter';
import {vbcApplicationTypes} from './vbcApplicationTypes';
import styles from './styles';

const VbcProgramStep1 = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['loanApplication']);
  const {navigate} = useNavigation();
  const {vbcProgramStep1: vbcProgramStep1Data} = useSelector(
    (state) => state.vbcProgram
  );
  const {loginData} = useSelector((state) => state.login);
  const [userSelectedPaymentOption, setUserSelectedPaymentOption] = useState(
    VBCProgramPaymentFramework.SELF_PAY
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  /**
   * If user comes again after reaching Step4,
   * we fetch the details from our redux store
   * and select the apt value to show to the user.
   */
  useEffect(() => {
    if (vbcProgramStep1Data) {
      setUserSelectedPaymentOption(vbcProgramStep1Data);
    }
  }, []);

  /**
   * when user presses save & proceed
   * we store the user selection of payment framework
   * and remove previous values of add applicants
   * in/from async storage and
   * in/from redux store
   * and navigate the user to step2
   */
  const handlePressSave = async () => {
    setLoading(true);
    const {apiResponse, apiError} = await saveVBCProgramStep1DataService();
    if (apiResponse) {
      /** saving step 1 value in redux store */
      // dispatch(vbcProgramStep1Action(userSelectedPaymentOption));
      const transformedData = transformGetVbcProgramEnrollmentApiData(
        apiResponse.data?.data
      );
      /** saving the api data to redux store */
      dispatch(saveVbcProgramDataAction(transformedData));
      setLoading(false);
      navigate('VbcProgramStep2');
    } else if (apiError) {
      setApiError(apiError.localizedMessage || '');
      setLoading(false);
    }
  };

  /** calling api to save Step1 data */
  const saveVBCProgramStep1DataService = async () => {
    const {access_token} = loginData;
    const body = transformApiRequest(userSelectedPaymentOption);
    const response = await storeVbcProgramStep1ApiCall(body, access_token);
    return response;
  };

  /**
   * user selection of payment options
   */
  const handlePressPaymentOption = (selectedOption) => () => {
    setUserSelectedPaymentOption(selectedOption);
  };

  /**
   * get payment option icon name
   */
  const getUserSelectionOptionIconName = (selectionValue) => {
    if (selectionValue === userSelectedPaymentOption) {
      return 'radio-button-on';
    }
    return 'radio-button-off';
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalTimelineContainer}>
        <HorizontalTimeline totalCycleCount={4} presentCycleCount={1} />
      </View>
      <Container style={styles.containerContainer}>
        <AppText style={styles.heading}>{t('paymentmode')}</AppText>
        {vbcApplicationTypes.map((item) => (
          <Pressable
            style={styles.options}
            onPress={handlePressPaymentOption(item.value)}>
            <Icon
              as={Ionicons}
              name={getUserSelectionOptionIconName(item.value)}
              style={styles.radioIcon}
            />
            <AppText style={styles.option}>{t(item.name)}</AppText>
          </Pressable>
        ))}
      </Container>

      <Button
        style={styles.buttonContainer}
        onPressEvent={handlePressSave}
        label={t('saveAndProceed')}
        isLoading={loading}
      />
      <View>
        <AppText style={styles.apiErrorText}>{apiError}</AppText>
      </View>
    </View>
  );
};

export default VbcProgramStep1;
