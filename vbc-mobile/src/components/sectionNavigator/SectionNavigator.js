/**
 * Component to render
 * different sections for users to navigate
 * to different screens.
 * Present at clinical homescreen.
 */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {
  labReportsIcon,
  radiologyIcon,
  radiationTherapyIcon,
  surgeryIcon,
  medicationsIcon,
  otherTestsIcon,
  otherTreatmentsIcon,
  clinicalNotesIcon,
} from 'assets/icons';
import {AppText} from '../appText';
import styles from './styles';
import {Theme} from 'constants';
import {REPORT_TYPES} from 'constants/appConstants';

const SectionNavigator = ({
  localizedSectionListTitle,
  localizedSectionListDesc,
}) => {
  const {navigate} = useNavigation();
  /** handling navigation */
  const handleNavigation = (sectionListTitle) => {
    let reportType;
    switch (sectionListTitle) {
      case 'Lab Reports': {
        reportType = REPORT_TYPES.LAB;
        break;
      }
      case 'Radiology': {
        reportType = REPORT_TYPES.RADIOLOGIES;
        break;
      }
      case 'Surgery': {
        reportType = REPORT_TYPES.SURGERY;
        break;
      }
      case 'Medications': {
        reportType = REPORT_TYPES.MEDICATION;
        break;
      }
      case 'Other Tests': {
        reportType = REPORT_TYPES.OTHER_TESTS;
        break;
      }
      case 'Radiation Therapy': {
        reportType = REPORT_TYPES.RADIATION_THERAPY;
        break;
      }
      case 'Other Treatments': {
        reportType = REPORT_TYPES.OTHER_TREATMENT;
        break;
      }
      case 'Clinical Notes': {
        reportType = REPORT_TYPES.CLINICAL_NOTES;
        break;
      }
      default: {
        reportType = REPORT_TYPES.LAB;
        break;
      }
    }
    navigate('Reports', {
      reportType,
    });
  };

  const getIcon = (sectionListTitle) => {
    let iconName;
    switch (sectionListTitle) {
      case 'Lab Reports': {
        iconName = labReportsIcon;
        break;
      }
      case 'Radiology': {
        iconName = radiologyIcon;
        break;
      }
      case 'Surgery': {
        iconName = surgeryIcon;
        break;
      }
      case 'Medications': {
        iconName = medicationsIcon;
        break;
      }
      case 'Other Tests': {
        iconName = otherTestsIcon;
        break;
      }
      case 'Radiation Therapy': {
        iconName = radiationTherapyIcon;
        break;
      }
      case 'Other Treatments': {
        iconName = otherTreatmentsIcon;
        break;
      }
      case 'Clinical Notes': {
        iconName = clinicalNotesIcon;
        break;
      }
      default: {
        iconName = labReportsIcon;
        break;
      }
    }
    return iconName;
  };

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => handleNavigation(localizedSectionListTitle)}>
      <View style={styles.iconContainer}>
        <Image
          source={getIcon(localizedSectionListTitle)}
          resizeMode={'contain'}
        />
      </View>
      <LinearGradient
        colors={Theme.clinicalHomescreenSectionGradient}
        style={styles.container}>
        <AppText style={styles.title}>{localizedSectionListTitle}</AppText>
        <AppText style={styles.desc}>{localizedSectionListDesc}</AppText>
      </LinearGradient>
    </Pressable>
  );
};

export default SectionNavigator;
