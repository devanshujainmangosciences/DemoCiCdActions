/**
 * Bottom stack - VBCProgram tab - stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  VbcProgram,
  VbcProgramTerms,
  VbcProgramStep1,
  VbcProgramStep2,
  VbcProgramStep3,
  VbcProgramStep4,
  VbcProgramAddApplicant,
  Applicants,
  VbcSchedule,
  DrugSchedule,
  TermsOfUse,
} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';

const BottomTabVbcProgramStack = () => {
  const VbcProgramStack = createStackNavigator();
  return (
    <VbcProgramStack.Navigator
      initialRouteName={'VbcProgram'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <VbcProgramStack.Screen
        name={'VbcProgram'}
        component={VbcProgram}
        options={{
          headerShown: false,
          headerTitle: 'PBP Querent Program',
        }}
      />
      <VbcProgramStack.Screen
        name={'VbcProgramTerms'}
        component={VbcProgramTerms}
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
        name={'VbcProgramStep1'}
        component={VbcProgramStep1}
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
        name={'VbcProgramStep2'}
        component={VbcProgramStep2}
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
      />
      <VbcProgramStack.Screen
        name={'VbcSchedule'}
        component={VbcSchedule}
        options={{
          headerShown: true,
          headerTitle: 'PBP Schedule',
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
        name={'DrugSchedule'}
        component={DrugSchedule}
        options={{
          headerShown: true,
          headerTitle: 'Medication Schedule',
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
        name={'TermsOfUse'}
        component={TermsOfUse}
        options={{
          headerShown: true,
          headerTitle: 'Terms of Use',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
    </VbcProgramStack.Navigator>
  );
};

export default BottomTabVbcProgramStack;
