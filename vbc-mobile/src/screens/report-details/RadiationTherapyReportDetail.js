/**
 * Screen component for Radiation Therapy reports
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Theme} from 'constants';
import {ExpandableItem, AppText, Container} from 'components';
import {getFormattedDateInMonthWordFormat} from 'utils';
import styles from './styles';

const RadiationTherapyReportDetail = ({reportsData}) => {
  const {t} = useTranslation(['radiationTherapy']);

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
                                item?.startDate
                              )}`}
                            </AppText>
                            <AppText style={styles.heading}>
                              {`${t('radiationTherapy')}: ${item?.technique}`}
                            </AppText>
                          </View>
                        );
                      }}
                      headingBgColor={Theme.blueGreen}>
                      {/* {item?.testParameters?.length > 0 &&
                      item.testParameters.map((testItem) => {
                        return (
                          <View style={styles.expandableItemChildContainer}>
                            <View style={styles.detailsContainer}>
                              <AppText style={styles.details}>
                                {t('metric')}:
                              </AppText>
                              <AppText style={styles.detailsValue}>
                                {testItem?.testParameter}
                              </AppText>
                            </View>
                            <View style={styles.detailsContainer}>
                              <AppText style={styles.details}>
                                {t('value')}:
                              </AppText>
                              <AppText style={styles.detailsValue}>
                                {testItem?.numericResult}
                              </AppText>
                            </View>
                            <View style={styles.detailsContainer}>
                              <AppText style={styles.details}>
                                {t('unitsofMeasure')}:
                              </AppText>
                              <AppText style={styles.detailsValue}>
                                {testItem?.numericResultUnits}
                              </AppText>
                            </View>
                            <View style={styles.itemSeperator} />
                            <View style={styles.noteContainer}>
                              <AppText style={styles.heading}>
                                {t('Note')}:
                              </AppText>
                              <AppText style={styles.noteValue}>
                                {testItem.unstructuredResult}
                              </AppText>
                            </View>
                          </View>
                        );
                      })} */}
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

export default RadiationTherapyReportDetail;
