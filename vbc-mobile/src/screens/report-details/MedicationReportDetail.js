/**
 * Screen component for Medication Reports detail
 */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Theme} from 'constants';
import {ExpandableItem, AppText, Loader} from 'components';
import {getReportsApiCall} from 'apis';
import {
  getFormattedDateInMonthWordFormat,
  getMonthFromString,
  renderForNoData,
} from 'utils';
import {REPORT_TYPES} from 'constants/appConstants';
import styles from './styles';

const MedicationReportDetail = ({month, year, category}) => {
  const {t} = useTranslation(['medications']);
  const [loading, setLoading] = useState(false);
  const {loginData} = useSelector((state) => state.login);
  const [labReportsData, setLabReportsData] = useState([]);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [lastLoadCount, setLastLoadCount] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  /** calling api to fetch Medication report detail */
  const fetchMedicationReportsDetailService = async () => {
    if (pageNo === 0) {
      setLoading(true);
    }
    setPaginationLoading(true);
    const {access_token} = loginData;

    const {apiResponse, apiError} = await getReportsApiCall(
      REPORT_TYPES.MEDICATION,
      access_token,
      getMonthFromString(month),
      year,
      category,
      pageNo
    );
    if (apiResponse) {
      // is current page is 0 then just sets the reports in state
      if (apiResponse?.data?.additionalData?.currentPage === 0) {
        setLabReportsData(apiResponse.data?.reports);
        setLoading(false);
      } else {
        // if current page is more than 0 then append data with old reports data
        setLabReportsData([...labReportsData, ...apiResponse?.data?.reports]);
      }
      setLastLoadCount(apiResponse?.data?.reports?.length);
      setOnEndReachedCalledDuringMomentum(
        apiResponse?.data?.reports?.length >= 20 ? true : false
      );
      setPageNo(apiResponse?.data?.additionalData?.currentPage);
    } else if (apiError) {
      setLoading(false);
    }
    setLoading(false);
    setPaginationLoading(false);
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>{paginationLoading ? <Loader /> : null}</View>
    );
  };

  /** call api service to fetch lab report detail */
  useEffect(() => {
    fetchMedicationReportsDetailService();
  }, []);

  // handle on end reached of flat list for pagination
  const loadMoreData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  // increases page number to 1 only if we got some data in last api hit
  useEffect(() => {
    if (onEndReachedCalledDuringMomentum) {
      if (lastLoadCount >= 20) {
        setPageNo(pageNo + 1);
      }
    }
  }, [onEndReachedCalledDuringMomentum]);

  // fetch alerts data if we got some reports data in last page hit
  useEffect(() => {
    if (lastLoadCount >= 20) {
      fetchMedicationReportsDetailService();
    }
  }, [pageNo, loginData]);

  if (loading) {
    return (
      <View style={styles.fullPageLoadingContainer}>
        <Loader />
      </View>
    );
  }

  // Check if list has started scrolling
  const _onMomentumScrollBegin = () =>
    setOnEndReachedCalledDuringMomentum(false);

  const renderReportItem = ({item, index}) => {
    return (
      <View key={index} style={styles.detailItemContainer}>
        <ExpandableItem
          heading={() => {
            return (
              <View style={{flexDirection: 'column'}}>
                <AppText style={styles.heading}>
                  {`${t('Date')}: ${getFormattedDateInMonthWordFormat(
                    item?.issueDate
                  )}`}
                </AppText>
                <AppText style={styles.heading}>
                  {`${t('brandName')}: ${renderForNoData(item?.brandName)}`}
                </AppText>
                <AppText style={styles.heading}>
                  {`${t('genericName')}: ${renderForNoData(item?.genericName)}`}
                </AppText>
                <AppText style={styles.heading}>
                  {`${t('strength')}: ${renderForNoData(item?.strength)}`}
                </AppText>
              </View>
            );
          }}
          headingBgColor={Theme.blueGreen}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {labReportsData?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          data={labReportsData}
          renderItem={renderReportItem}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.01}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={_onMomentumScrollBegin}
        />
      ) : null}
    </View>
  );
};

export default MedicationReportDetail;
