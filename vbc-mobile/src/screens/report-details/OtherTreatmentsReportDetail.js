/**
 * Screen component for Other Treatment detail
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Theme} from 'constants';

import {ExpandableItem, AppText, Container} from 'components';
import {getFormattedDateInMonthWordFormat} from 'utils';
import styles from './styles';

const OtherTreatmentsReportDetail = ({reportsData}) => {
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
                                item?.procedureDate
                              )}`}
                            </AppText>
                            <AppText style={styles.heading}>
                              {`${t('Procedure')}: ${item?.vbcProcedureName}`}
                            </AppText>
                          </View>
                        );
                      }}
                      headingBgColor={Theme.blueGreen}>
                      {/* <View style={styles.expandableItemChildContainer}>
                      <View style={styles.detailsContainer}>
                        <AppText style={styles.detailsValue}>
                          {item?.procedureNoteContent || t('noOtherTreatmentReportFound'}
                        </AppText>
                      </View>
                    </View> */}
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

export default OtherTreatmentsReportDetail;
