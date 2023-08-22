/**
 * Profile Stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {EditProfile, MyProfile} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';

const ProfileStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={'MyProfile'}
        component={MyProfile}
        options={{
          headerShown: false,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
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
    </Stack.Navigator>
  );
};

export default ProfileStack;
