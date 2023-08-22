/**
 * Bottom stack - VBCProgram tab - stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ApplicantOverview,
  CompleteApplicationStep1,
  CompleteApplicationStep2,
  CompleteApplicationStep3,
  ApplicantDocumentsUpload,
} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';

const ApplicantOverviewStack = () => {
  const VbcProgramStack = createStackNavigator();
  return (
    <VbcProgramStack.Navigator
      initialRouteName={'ApplicantOverview'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <VbcProgramStack.Screen
        name={'ApplicantOverview'}
        component={ApplicantOverview}
        options={{
          headerShown: false,
        }}
      />
      <VbcProgramStack.Screen
        name={'ApplicantCompleteApplicationStep1'}
        component={CompleteApplicationStep1}
        options={{
          headerShown: true,
          headerTitle: 'Complete Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'ApplicantCompleteApplicationStep2'}
        component={CompleteApplicationStep2}
        options={{
          headerShown: true,
          headerTitle: 'Complete Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'ApplicantCompleteApplicationStep3'}
        component={CompleteApplicationStep3}
        options={{
          headerShown: true,
          headerTitle: 'Complete Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'ApplicantCompleteApplicationDocumentsUpload'}
        component={ApplicantDocumentsUpload}
        options={{
          headerShown: true,
          headerTitle: 'Complete Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      {/* <VbcProgramStack.Screen
        name={'VbcProgramStep3'}
        component={VbcProgramStep3}
        options={{
          headerShown: true,
          headerTitle: 'Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'VbcProgramStep4'}
        component={VbcProgramStep4}
        options={{
          headerShown: true,
          headerTitle: 'Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'VbcProgramAddApplicant'}
        component={VbcProgramAddApplicant}
        options={{
          headerShown: true,
          headerTitle: 'Application',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <VbcProgramStack.Screen
        name={'Applicants'}
        component={Applicants}
        options={{
          headerShown: true,
          headerTitle: 'Applicants',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      /> */}
    </VbcProgramStack.Navigator>
  );
};

export default ApplicantOverviewStack;
