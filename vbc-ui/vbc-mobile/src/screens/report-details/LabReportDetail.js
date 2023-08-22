/**
 * Screen component for Lab Report detail
 */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Theme from 'constants/Theme';
import { ExpandableItem, AppText, Container } from 'components';
import { getFormattedDateInMonthWordFormat } from 'utils';
import styles from './styles';

const LabReportDetail = ({ reportsData }) => {
  const { t } = useTranslation(['labReports']);

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
                          <View style={{ flexDirection: 'column' }}>
                            <AppText style={styles.heading}>
                              {`${t(
                                'testCollectionDate'
                              )}: ${getFormattedDateInMonthWordFormat(
                                item?.testCollectionDate
                              )}`}
                            </AppText>
                            <AppText style={styles.heading}>
                              {`${t(
                                'testResultDate'
                              )}: ${getFormattedDateInMonthWordFormat(
                                item.testResultsDate
                              )}`}
                            </AppText>
                            <AppText
                              style={styles.heading}
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {`${t('test')}: ${item?.testName}`}
                            </AppText>
                          </View>
                        );
                      }}
                      headingBgColor={Theme.blueGreen}>
                      {item?.testParameters?.length > 0 &&
                        item.testParameters.map((testItem, index) => {
                          return (
                            <View
                              style={styles.expandableItemChildContainer}
                              key={index}>
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
                                  {t('result')}:
                                </AppText>
                                {(!testItem?.numericResult &&
                                  !testItem?.numericResultUnits &&
                                  !testItem.unstructuredResult) ||
                                  ((testItem?.numericResult === 'NULL' ||
                                    testItem?.numericResult === 'NaN' ||
                                    testItem?.numericResult === 'NULL ') &&
                                    (testItem?.numericResultUnits === 'NULL' ||
                                      testItem?.numericResultUnits === 'NaN' ||
                                      testItem?.numericResultUnits === 'NULL ') &&
                                    (testItem.unstructuredResult == 'NULL' ||
                                      testItem?.unstructuredResult === 'NaN' ||
                                      testItem?.unstructuredResult ===
                                      'NULL ')) ? (
                                  <AppText style={styles.detailsValue}>
                                    {t('informationNotAvailable')}
                                  </AppText>
                                ) : (
                                  <AppText style={styles.detailsValue}>
                                    {testItem?.numericResult === 'NULL' ||
                                      testItem?.numericResult === 'NaN' ||
                                      testItem?.numericResult ===
                                      'NULL ' ? null : (
                                      <AppText style={styles.detailsValue}>
                                        {testItem?.numericResult}
                                      </AppText>
                                    )}
                                    {testItem?.numericResultUnits === 'NULL' ||
                                      testItem?.numericResultUnits === 'NaN' ||
                                      testItem?.numericResultUnits ===
                                      'NULL ' ? null : (
                                      <AppText style={styles.detailsValue}>
                                        {testItem?.numericResultUnits}
                                      </AppText>
                                    )}
                                    {testItem?.unstructuredResult === 'NULL' ||
                                      testItem?.unstructuredResult === 'NaN' ||
                                      testItem?.unstructuredResult ===
                                      'NULL ' ? null : (
                                      <AppText style={styles.detailsValue}>
                                        {testItem?.unstructuredResult}
                                      </AppText>
                                    )}
                                  </AppText>
                                )}
                              </View>
                              {/* <View style={styles.detailsContainer}>
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
                              </View> */}
                            </View>
                          );
                        })}
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

export default LabReportDetail;
