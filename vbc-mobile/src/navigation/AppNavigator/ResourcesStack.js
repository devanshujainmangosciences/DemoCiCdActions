/**
 * Bottom stack - VBCProgram tab - stack navigator
 */
import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Resources, ResourceSubTypes, ResourceDetail} from 'screens';
import {backIcon} from 'assets/icons';
import styles from './styles';

const ResourcesStack = () => {
  const ResourcesStack = createStackNavigator();
  return (
    <ResourcesStack.Navigator
      initialRouteName={'Resources'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitleStyle,
        headerBackTitleVisible: false,
      }}>
      <ResourcesStack.Screen
        name={'Resources'}
        component={Resources}
        options={({route}) => ({
          headerShown: true,
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

      <ResourcesStack.Screen
        name={'ResourceSubTypes'}
        component={ResourceSubTypes}
        options={({route}) => ({
          headerShown: true,
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
      <ResourcesStack.Screen
        name={'ResourceDetail'}
        component={ResourceDetail}
        options={({route}) => ({
          headerShown: true,
          headerTitle: route?.params?.item?.sideDesc,
          headerTitleContainerStyle: styles.longHeaderStyle,
          headerBackImage: () => (
            <Image
              resizeMode={'contain'}
              source={backIcon}
              style={styles.headerLeftIcon}
            />
          ),
        })}
      />
    </ResourcesStack.Navigator>
  );
};

export default ResourcesStack;
