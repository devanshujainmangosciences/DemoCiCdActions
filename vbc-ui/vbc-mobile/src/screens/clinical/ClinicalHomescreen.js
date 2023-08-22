/**
 * Clinical homescreen screen component
 */
import React, {useState, useCallback, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CurrentStatus, SectionNavigator} from 'components';
import {clinicalHomescreenListItems} from 'constants';
import {
  getDrugScheduleOverviewApiCall,
  getReportsSyncStatusApiCall,
} from 'apis';
import styles from './styles';
import {reportsSyncStatusAction} from 'actions';
import {getFromAsyncStorage} from 'utils';
import {AsyncStorageKeys} from 'constants';

const ClinicalHomescreen = () => {
  const dispatch = useDispatch();

  const {loginData} = useSelector((state) => state.login);
  const [drugScheduleOverviewData, setDrugScheduleOverviewData] = useState(
    null
  );

  const {t} = useTranslation(['clinicalHomescreen']);

  // render section list to show reports options
  const renderSectionList = () => {
    return clinicalHomescreenListItems.map((item, index) => {
      const {localizedSectionListTitleKey, localizedSectionListDescKey} = item;
      return (
        <View style={styles.sectionListItem} key={index}>
          <SectionNavigator
            localizedSectionListTitle={t(localizedSectionListTitleKey)}
            localizedSectionListDesc={t(localizedSectionListDescKey)}
            {...item}
          />
        </View>
      );
    });
  };

  /** calling api to fetch drug schedule overview */
  const fetchDrugScheduleOverviewService = async () => {
    const {access_token} = loginData;

    const {apiResponse} = await getDrugScheduleOverviewApiCall(access_token);
    if (apiResponse) {
      setDrugScheduleOverviewData(apiResponse.data?.data);
    }
  };

  /** calling api to fetch drug schedule overview */
  const fetchReportsSyncStatusService = async () => {
    const {access_token} = loginData;
    const reportsSyncStatus = await getFromAsyncStorage(
      AsyncStorageKeys.REPORTS_SYNC_STATUS
    );
    const parsedReportsSyncStatus = JSON.parse(reportsSyncStatus);
    if (parsedReportsSyncStatus === null || parsedReportsSyncStatus === false) {
      const {apiResponse} = await getReportsSyncStatusApiCall(access_token);
      if (apiResponse) {
        dispatch(reportsSyncStatusAction(apiResponse?.data?.dataSynchronized));
      }
    }
  };

  /** Fetch drug schedule data whenever home screen is focussed */
  useFocusEffect(
    useCallback(() => {
      if (loginData) {
        fetchDrugScheduleOverviewService();
      }
    }, [loginData])
  );

  useEffect(() => {
    if (loginData) {
      fetchReportsSyncStatusService();
    }
  }, [loginData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CurrentStatus drugScheduleOverviewData={drugScheduleOverviewData} />
      <View style={styles.sectionListContainer}>{renderSectionList()}</View>
    </ScrollView>
  );
};

export default ClinicalHomescreen;
