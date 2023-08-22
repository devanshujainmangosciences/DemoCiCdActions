/**
 * Alerts screen
 */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {decodeToken} from 'utils';
import styles from './styles';
import AlertItem from './AlertItem';
import {fetchAlertsApiCall, readAlertApiCall} from 'apis';
import {Loader} from 'components';
import NoData from 'components/no-data/NoData';
import {storeAlertsAction} from 'actions';

const Alerts = () => {
  const {t} = useTranslation(['header']);
  const [loading, setLoading] = useState(false);
  const {loginData} = useSelector((state) => state.login);
  const {alerts, totalCount} = useSelector((state) => state.alerts);

  const [pageNo, setPageNo] = useState(0);
  const dispatch = useDispatch();

  const [readNotificationLoading, setReadNotifictionLoading] = useState(false);
  const [lastLoadCount, setLastLoadCount] = useState(0);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  // fetching alert data from api call
  const fetchAlertsService = async () => {
    if (pageNo === 0) {
      setReadNotifictionLoading(true);
    }
    setLoading(true);
    const {access_token} = loginData;
    const {sub: userId} = decodeToken(access_token);
    const {apiResponse} = await fetchAlertsApiCall(access_token, pageNo);
    if (apiResponse) {
      // is current page is 0 then just sets the alerts in redux state
      if (apiResponse?.data?.data?.currentPage === 0) {
        dispatch(
          storeAlertsAction(
            apiResponse?.data?.data?.content,
            apiResponse?.data?.data?.unreadElements
          )
        );
      } else {
        // if current page is more than 0 then append data with old alerts data
        dispatch(
          storeAlertsAction(
            [...alerts, ...apiResponse?.data?.data?.content],
            apiResponse?.data?.data?.unreadElements
          )
        );
      }
      setLastLoadCount(apiResponse?.data?.data?.content.length);
      setOnEndReachedCalledDuringMomentum(
        apiResponse?.data?.data?.content.length >= 10 ? true : false
      );
      setPageNo(apiResponse?.data?.data?.currentPage);
    }
    setLoading(false);
    setReadNotifictionLoading(false);
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>{loading ? <Loader /> : null}</View>
    );
  };

  /** calling api function to get alert data */
  useEffect(() => {
    if (loginData) {
      fetchAlertsService();
    }
  }, [loginData]);

  // Read alert api call
  const readAlertService = async (alertId) => {
    const {access_token} = loginData;
    const {apiResponse} = await readAlertApiCall(
      {
        id: alertId,
      },
      access_token
    );
    if (apiResponse) {
      const elementsIndex = alerts.findIndex(
        (element) => element.id == alertId
      );
      let updatedAlerts = [...alerts];
      updatedAlerts[elementsIndex] = {
        ...updatedAlerts[elementsIndex],
        readDate: new Date(),
      };
      dispatch(
        storeAlertsAction(updatedAlerts, totalCount ? totalCount - 1 : 0)
      );
    }
  };

  // handle alert item on press event
  const onHandlePressItem = async (readAlertId) => {
    readAlertService(readAlertId);
  };

  // handle on end reached of flat list for pagination
  const loadMoreData = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  // increases page number to 1 only if we got some data in last api hit
  useEffect(() => {
    if (onEndReachedCalledDuringMomentum) {
      if (lastLoadCount >= 10) {
        setPageNo(pageNo + 1);
      }
    }
  }, [onEndReachedCalledDuringMomentum]);

  // fetch alerts data if we got some alerts dasta in last page hit
  useEffect(() => {
    if (lastLoadCount >= 10) {
      fetchAlertsService();
    }
  }, [pageNo, loginData]);

  // render loader
  if (readNotificationLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  // Check if list has started scrolling
  const _onMomentumScrollBegin = () =>
    setOnEndReachedCalledDuringMomentum(false);

  return (
    <View style={styles.mainContainer}>
      {alerts?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          data={alerts}
          renderItem={({item}) => (
            <AlertItem item={item} handlePressItem={onHandlePressItem} />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.01}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={_onMomentumScrollBegin}
        />
      ) : (
        <NoData title={t('you-dont-have-any-notification-mobile')} />
      )}
    </View>
  );
};

export default Alerts;
