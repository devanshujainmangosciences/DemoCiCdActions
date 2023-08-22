/**
 * Modal stack navigator.
 * Basically used for showing -
 * dropdowns/date-time pickers.
 */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DateTimePicker, SingleSelectDropdown} from 'screens';
import {Theme} from 'constants';
import {fontSizes} from 'utils';

const headerTitleStyle = {
  headerStyle: {
    backgroundColor: Theme.snow,
  },
  headerTintColor: Theme.dark,
  headerTitleStyle: {
    fontSize: fontSizes.small,
  },
};

const ModalStackNavigator = () => {
  const ModalStack = createStackNavigator();
  return (
    <ModalStack.Navigator
      screenOptions={({route}) => ({
        title: route.params.headerTitle,
        presentation: 'modal',
        headerBackTitleVisible: false,
        ...headerTitleStyle,
      })}>
      <ModalStack.Screen
        name={'SingleSelectDropdown'}
        component={SingleSelectDropdown}
      />
      <ModalStack.Screen name={'DateTimePicker'} component={DateTimePicker} />
    </ModalStack.Navigator>
  );
};

export default ModalStackNavigator;
