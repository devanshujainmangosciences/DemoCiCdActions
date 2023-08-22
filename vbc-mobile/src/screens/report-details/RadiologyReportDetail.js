/**
 * Screen component for Radiology Reports Detail
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import Theme from 'constants/Theme';
import {ExpandableItem, AppText, Container} from 'components';
import {getFormattedDateInMonthWordFormat} from 'utils';
import styles from './styles';

const RadiologyReportDetail = ({reportsData}) => {
  const {t} = useTranslation(['labReports']);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {reportsData?.reports?.length > 0 ? (
          <Container style={styles.containerContainer}>
            {reportsData &&
              Object.keys(reportsData).length > 0 &&
              reportsData.reports?.length > 0 &&
              reportsData.reports.map((item, index) => {
                return (
                  <View style={styles.detailItemContainer} key={index}>
                    <ExpandableItem
                      heading={() => {
                        return (
                          <View style={{flexDirection: 'column'}}>
                            <AppText style={styles.heading}>
                              {`${t(
                                'Date'
                              )}: ${getFormattedDateInMonthWordFormat(
                                item?.orderDate
                              )}`}
                            </AppText>
                            <AppText style={styles.heading}>
                              {`${t('Procedure')}: ${item?.radiologyProcedure}`}
                            </AppText>
                          </View>
                        );
                      }}
                      headingBgColor={Theme.blueGreen}>
                      <View style={styles.expandableItemChildContainer}>
                        <View style={styles.detailsContainer}>
                          <AppText style={styles.detailsValue}>
                            {item.radiologyReportNote &&
                            item.radiologyReportNote !== 'NULL'
                              ? item.radiologyReportNote
                              : t('informationNotAvailable')}
                          </AppText>
                        </View>
                      </View>
                    </ExpandableItem>
                  </View>
                );
              })}
          </Container>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default RadiologyReportDetail;
