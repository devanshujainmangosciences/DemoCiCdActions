/**
 * Bottom stack - VBCProgram tab - stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {ClinicalHomescreen, Reports, ReportDetail} from 'screens';
import {backIcon} from 'assets/icons';
import ResourcesStack from './ResourcesStack';
import styles from './styles';

const BottomTabClinicalStack = () => {
  const ClinicalStack = createStackNavigator();
  return (
    <ClinicalStack.Navigator
      initialRouteName={'Clinical'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <ClinicalStack.Screen
        name={'Clinical'}
        component={ClinicalHomescreen}
        options={{
          headerShown: false,
          headerTitle: 'Clinical',
        }}
      />
      <ClinicalStack.Screen
        name={'Reports'}
        component={Reports}
        options={{
          headerShown: true,
          headerTitle: 'Reports',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <ClinicalStack.Screen
        name={'ReportDetail'}
        component={ReportDetail}
        options={{
          headerShown: true,
          headerTitle: 'ReportDetail',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <ClinicalStack.Screen
        name={'Resources'}
        component={ResourcesStack}
        options={({route}) => ({
          headerShown: false,
          headerTitle: route?.params?.selectedItem?.main_title,
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        })}
      />
    </ClinicalStack.Navigator>
  );
};

export default BottomTabClinicalStack;
