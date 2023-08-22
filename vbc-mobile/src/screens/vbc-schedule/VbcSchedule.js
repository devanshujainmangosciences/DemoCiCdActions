/**
 * PBP Schedule screen
 */
import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Container, AppText, Loader} from 'components';
import {getVbcProgramVbcScheduleAction} from 'actions';
import {schedules} from 'assets/icons';
import {getVbcScheduleApiCall} from 'apis';
import VbcScheduleItem from './VbcScheduleItem';
import styles from './styles';

const VbcSchedule = () => {
  const dispatch = useDispatch();
  const {loginData} = useSelector((state) => state.login);
  const vbcProgramState = useSelector((state) => state.vbcProgram);
  const {vbcProgramVbcScheduleData: vbcScheduleData} = vbcProgramState;

  const {t} = useTranslation(['vbcSchedule']);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVbcScheduleService();
  }, []);

  /** calling api to fetch vbc schedule */
  const fetchVbcScheduleService = async () => {
    setLoading(true);
    const {access_token} = loginData;
    const {apiResponse, apiError} = await getVbcScheduleApiCall(
      vbcProgramState.vbcProgramDrugId,
      access_token
    );
    if (apiResponse) {
      /** saving the api data to redux store */
      dispatch(
        getVbcProgramVbcScheduleAction(
          apiResponse.data?.data.sort((a, b) => a.id - b.id)
        )
      );
      setLoading(false);
    } else if (apiError) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.view}
      style={styles.viewStyle}>
      <Container isBackgroundPlain={true} style={styles.containerContainer}>
        <View style={styles.containerHeadingContainer}>
          <Image
            source={schedules}
            resizeMode={'contain'}
            style={styles.headingIcon}
          />
          <AppText style={styles.containerHeading}>{t('vbcSchedule')}</AppText>
        </View>
        <AppText style={styles.note}>
          {vbcScheduleData?.length > 0 ? t('note') : t('noteForEmptyData')}
        </AppText>
      </Container>
      <VbcScheduleItem />
    </ScrollView>
  );
};

export default VbcSchedule;
