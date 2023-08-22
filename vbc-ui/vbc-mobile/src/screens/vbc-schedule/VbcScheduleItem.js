/**
 * PBP Schedule Expandable item component
 */
import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {ExpandableItem, AppText, Container} from 'components';
import {Theme} from 'constants';
import styles from './styles';

const VbcScheduleItem = () => {
  const {t} = useTranslation(['vbcSchedule']);
  const {vbcProgramVbcScheduleData: vbcScheduleData} = useSelector(
    (state) => state.vbcProgram
  );

  return vbcScheduleData && vbcScheduleData.length > 0 ? (
    <Container style={styles.containerAddedApplicants} isBackgroundPlain>
      {vbcScheduleData.map((item, index) => {
        if (item) {
          return (
            <View key={index} style={styles.expandableItemContainer}>
              <ExpandableItem
                heading={t('cycle') + ' ' + item.cycleNo}
                headingBgColor={Theme.blueGreen}>
                <View style={styles.expandableItemChildContainer}>
                  {/* <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>
                      {t('marketPrice')}:
                    </AppText>
                    <AppText style={styles.details}>
                      {`₹ ${item.marketPrice || ''} `}
                    </AppText>
                  </View> */}
                  {/* <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>{t('rebate')}:</AppText>
                    <AppText style={styles.details}>
                      {`₹ ${item.payout || ''}`}
                    </AppText>
                  </View> */}
                  {/* <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>
                      {t('cumulativeAmount')}:
                    </AppText>
                    <AppText style={styles.details}>
                      {`₹ ${item.cumulativeAmount}`}
                    </AppText>
                  </View> */}
                  <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>
                      {`% ${t('rebate')}`}:
                    </AppText>
                    <AppText style={styles.details}>
                      {item.percentageOfRebate}
                    </AppText>
                  </View>
                </View>
              </ExpandableItem>
            </View>
          );
        }
      })}
    </Container>
  ) : null;
};

export default VbcScheduleItem;
