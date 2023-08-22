/**
 * Bottom stack - Others tab - stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ResourcesStack from './ResourcesStack';

import {
  EditProfile,
  MyProfile,
  Others,
  Documents,
  DocumentsUpload,
  Settings,
  ChangeLanguage,
  PrivacyPolicy,
  TermsOfUse,
  Help,
  ChangePassword,
  Verify,
} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';
import FinancialInformationStack from './FinancialInformationStack';

const BottomTabOthersStack = () => {
  const OthersStack = createStackNavigator();
  return (
    <OthersStack.Navigator
      initialRouteName="OthersScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <OthersStack.Screen
        name={'OthersScreen'}
        component={Others}
        options={{
          headerShown: false,
          headerTitle: 'Others',
        }}
      />
      <OthersStack.Screen
        name={'MyProfile'}
        component={MyProfile}
        options={{
          headerShown: true,
          headerTitle: 'My Profile',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'Resources'}
        component={ResourcesStack}
        options={{
          headerShown: false,
          headerTitle: 'Resources',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'EditProfile'}
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'MyFinancialInformation'}
        component={FinancialInformationStack}
        options={{
          headerShown: true,
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
      {/* <OthersStack.Screen
        name={'EditFinancialInformation'}
        component={EditFinancialInformation}
        options={{
          headerShown: true,
          headerTitle: 'Financial Information',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      /> */}
      <OthersStack.Screen
        name={'Documents'}
        component={Documents}
        options={{
          headerShown: true,
          headerTitle: 'Documents',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'DocumentsUpload'}
        component={DocumentsUpload}
        options={{
          headerShown: true,
          headerTitle: 'Documents',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'Settings'}
        component={Settings}
        options={{
          headerShown: true,
          headerTitle: 'Settings',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'ChangeLanguage'}
        component={ChangeLanguage}
        options={{
          headerShown: true,
          headerTitle: 'Change Language',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'PrivacyPolicy'}
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          headerTitle: 'Privacy Policy',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
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
      <OthersStack.Screen
        name={'Help'}
        component={Help}
        options={{
          headerShown: true,
          headerTitle: 'Help',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'ChangePassword'}
        component={ChangePassword}
        options={{
          headerShown: true,
          headerTitle: 'Change Password',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
      <OthersStack.Screen
        name={'Verify'}
        component={Verify}
        options={{
          headerShown: true,
          headerTitle: 'Verify',
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        }}
      />
    </OthersStack.Navigator>
  );
};

export default BottomTabOthersStack;
