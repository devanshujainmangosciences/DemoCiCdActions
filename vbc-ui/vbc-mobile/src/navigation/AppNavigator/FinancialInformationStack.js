/**
 * Financial Information Stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {EditFinancialInformation, MyFinancialInformation} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';

const FinancialInformationStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="MyFinancialInformation"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={'MyFinancialInformation'}
        component={MyFinancialInformation}
        options={{
          headerShown: false,
          headerTitle: 'Financial Information',
        }}
      />
      <Stack.Screen
        name={'EditFinancialInformation'}
        component={EditFinancialInformation}
        options={{
          headerShown: false,
          headerTitle: 'Financial Information',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default FinancialInformationStack;
