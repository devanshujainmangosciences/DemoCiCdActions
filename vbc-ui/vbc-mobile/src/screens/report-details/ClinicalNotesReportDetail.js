/**
 * Screen component for Clinical Report detail
 */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Theme} from 'constants';
import {ExpandableItem, AppText, Container} from 'components';
import {getFormattedDateInMonthWordFormat, renderForNoData} from 'utils';
import styles from './styles';

const ClinicalNotesReportDetail = ({reportsData}) => {
  const {t} = useTranslation(['clinicalNotes']);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContentContainer}
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {reportsData &&
          Object.keys(reportsData).length > 0 &&
          reportsData.reports?.length > 0 && (
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
                                  item?.noteDate
                                )}`}
                              </AppText>
                              <AppText
                                style={styles.heading}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {`${t('noteType')}: ${item?.noteType}`}
                              </AppText>
                            </View>
                          );
                        }}
                        headingBgColor={Theme.blueGreen}>
                        <View style={styles.expandableItemChildContainer}>
                          <AppText style={styles.detailsValue}>
                            {renderForNoData(item?.noteContent) ||
                              t('noClinicalNoteFound')}
                          </AppText>
                        </View>
                      </ExpandableItem>
                    </View>
                  );
                })}
            </Container>
          )}
      </View>
    </ScrollView>
  );
};

export default ClinicalNotesReportDetail;
