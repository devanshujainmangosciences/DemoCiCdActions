/**
 * Component that is used to render -
 * current-status view in clinical homescreen.
 */
import React from 'react';
import {View, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import Theme from 'constants/Theme';
import {AppText} from '../appText';
import {CycleCircle} from '../cycle-circle';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';

const CurrentStatus = ({drugScheduleOverviewData}) => {
  const {t} = useTranslation(['clinicalHomescreen']);
  const {navigate} = useNavigation();

  const handlePressLearnMore = () => {
    navigate('Resources');
  };

  const {
    drugName,
    doctorName,
    nextCycleDate,
    lastCycleDate,
    totalCycles,
    completedCycles,
  } = drugScheduleOverviewData || {};

  const nextCycle =
    !nextCycleDate || completedCycles === totalCycles
      ? t('notAvailable')
      : nextCycleDate;

  const lastCycle = !lastCycleDate ? t('notAvailable') : lastCycleDate;

  return (
    <LinearGradient
      style={styles.container}
      colors={Theme.clinicalHomescreenSectionGradient}>
      <AppText style={styles.drugNameValue}>{drugName || ''}</AppText>
      <AppText style={styles.drugName}>({t('drugName')})</AppText>

      <AppText style={[styles.drugNameValue, {marginTop: 15}]}>
        {t('consultingDoctor')}
      </AppText>
      <AppText style={styles.drugName}>{doctorName || ''}</AppText>

      <View style={styles.timelineContainer}>
        <CycleCircle
          totalCycleCount={totalCycles}
          presentCycleCount={completedCycles}
        />
      </View>

      <View style={styles.cycleContainer}>
        <View style={styles.cycleBorder} />
        <AppText style={styles.cycle}>
          {t('cycle')} ({completedCycles}/{totalCycles})
        </AppText>
        <View style={styles.cycleBorder} />
      </View>

      <View style={styles.cycleDateContainer}>
        <>
          <View style={styles.cycleDateBox}>
            <AppText style={styles.cycleTitle}>{t('nextCycle')}</AppText>
            <AppText style={styles.cycleDate}>{nextCycle}</AppText>
          </View>
          <View style={styles.cycleDateBox}>
            <AppText style={styles.cycleTitle}>{t('lastCycle')}</AppText>
            <AppText style={styles.cycleDate}>{lastCycle}</AppText>
          </View>
        </>
        {/* <AppText style={styles.noCycleDate}>{t('noCycleDate') || ''}</AppText> */}
      </View>
      <Pressable onPress={handlePressLearnMore}>
        <AppText style={styles.learnMore}>
          {t('learnMoreAbout')} {drugName || ''}
        </AppText>
      </Pressable>
    </LinearGradient>
  );
};

export default CurrentStatus;
