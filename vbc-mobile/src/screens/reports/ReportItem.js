/**
 * Screen component for Reports Item
 */
import React from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Container, AppText} from 'components';
import {schedules} from 'assets/icons';
import styles from './styles';

const ReportItem = ({item, onPressReportItem, reportType}) => {
  const {t} = useTranslation(['labReports']);

  // convert medication category typeds to correct convention since API is returning wrong formatright now
  const convertMedicationName = (name) => {
    if (name === 'Non Cancer medication') return `Non-Cancer Medication`;
    else if (name === 'Cancer medication') return `Cancer Medication`;
    else {
      let reqName;
      const names = name.split(' ');
      names.map((item) => {
        if (reqName)
          reqName =
            reqName +
            item.charAt(0).toUpperCase() +
            item.slice(1).toLowerCase() +
            ' ';
        else
          reqName =
            item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() + ' ';
      });
      return reqName;
    }
  };

  return (
    <Container
      style={styles.labReportItemContainer}
      onPressEvent={() => onPressReportItem(item?.title)}>
      <View style={styles.containerInner}>
        <View style={styles.textContainerInner}>
          <AppText style={styles.headingItem}>
            {reportType === 'medication'
              ? convertMedicationName(item?.title)
              : item?.title || ''}
          </AppText>
          <AppText style={styles.desc}>{`${t('totalReport')}: ${
            item?.totalReports || ''
          }`}</AppText>
        </View>
        <View style={styles.iconContainerInner}>
          <View style={styles.iconContainer}>
            <Image
              source={schedules}
              resizeMode={'contain'}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ReportItem;
