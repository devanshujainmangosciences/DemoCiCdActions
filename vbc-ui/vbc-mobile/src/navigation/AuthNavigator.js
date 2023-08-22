/**
 * Navigator for unauthenticated screens.
 */
import React from 'react';
import {Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {
  Login,
  Registeration,
  Otp,
  NewPassword,
  EditProfile,
  ForgotPassword,
  TermsOfUse,
} from '../screens';
import {backIcon} from '../assets/icons';
import styles from './AppNavigator/styles';

const AuthStack = createStackNavigator();
const CardStack = createStackNavigator();

/**
 * Root Navigator
 * Contains:
 * - Card Navigator stack
 */
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={'AuthStackNavigator'}
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <AuthStack.Screen
        name={'AuthStackNavigator'}
        component={CardStackNavigator}
      />
    </AuthStack.Navigator>
  );
};

/**
 * Card stack navigator
 */
const CardStackNavigator = () => {
  return (
    <CardStack.Navigator
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
      initialRouteName={'Login'}
      screenOptions={{
        presentation: 'card',
        headerShown: false,
      }}>
      <CardStack.Screen name="Login" component={Login} />
      <CardStack.Screen name="Registeration" component={Registeration} />
      <CardStack.Screen name="Otp" component={Otp} />
      <CardStack.Screen name="NewPassword" component={NewPassword} />
      <CardStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <CardStack.Screen name="EditProfile" component={EditProfile} />
      <CardStack.Screen
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
    </CardStack.Navigator>
  );
};

export default AuthNavigator;
