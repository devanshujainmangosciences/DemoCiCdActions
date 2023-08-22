/**
 * Bottom bar component
 */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alerts} from 'screens';
import OthersStack from './BottomTab-OthersStack';
import VbcProgramStack from './BottomTab-VbcProgramStack';
import ClinicalStack from './BottomTab-ClinicalStack';
import {
  clinicalIcon,
  clinicalWhiteIcon,
  alertIcon,
  alertWhiteIcon,
  otherIcon,
  otherWhiteIcon,
  vbcIcon,
  vbcWhiteIcon,
  proIcon,
  proWhiteIcon,
} from 'assets/icons';
import {Theme} from 'constants';
import {AppText} from 'components';
import styles from './styles';
import ProfileStack from './ProfileStack';
import {useSelector} from 'react-redux';

const BottomBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const {totalCount} = useSelector((state) => state.alerts);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.bottomBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const icon = options.icon;
        const focussedIcon = options.focussedIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={[styles.bottomBarItemContainer]}>
            <Pressable
              onPress={onPress}
              style={[
                styles.bottomBar,
                isFocused
                  ? {backgroundColor: Theme.primary}
                  : {backgroundColor: Theme.snow},
              ]}>
              <View style={styles.bottomBarItemView}>
                {label === 'Alerts' && totalCount ? (
                  <View style={styles.alertCount}>
                    <AppText style={styles.alertCountText}>
                      {totalCount}
                    </AppText>
                  </View>
                ) : null}
                <Image
                  resizeMode={'contain'}
                  source={isFocused ? focussedIcon : icon}
                  style={{height: 20}}
                />
                <AppText
                  style={[
                    styles.bottomBarItemText,
                    isFocused
                      ? {color: Theme.snow}
                      : {color: Theme.lightTextColor},
                  ]}>
                  {label}
                </AppText>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

/**
 * Bottom bar navigator
 */
const BottomNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      initialRouteName={'Clinical'}
      screenOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={(props) => <BottomBar {...props} />}>
      <BottomTab.Screen
        name="Clinical"
        component={ClinicalStack}
        options={{
          title: 'Clinical',
          headerShown: false,
          icon: clinicalIcon,
          focussedIcon: clinicalWhiteIcon,
        }}
      />
      <BottomTab.Screen
        name="VbcProgram"
        component={VbcProgramStack}
        options={({navigation}) => {
          const {routes, index} = navigation.getState();
          const {state: exploreState} = routes[index];
          let tabBarVisible = false;
          if (exploreState) {
            const {routes: exploreRoutes, index: exploreIndex} = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (exploreActiveRoute && exploreActiveRoute.name === 'VbcProgram')
              tabBarVisible = true;
          } else {
            tabBarVisible = true;
          }
          return {
            title: 'PBP',
            headerShown: false,
            icon: vbcIcon,
            focussedIcon: vbcWhiteIcon,
            tabBarVisible,
          };
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          headerShown: false,
          icon: proIcon,
          focussedIcon: proWhiteIcon,
        }}
      />
      <BottomTab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          title: 'Alerts',
          headerShown: false,
          icon: alertIcon,
          focussedIcon: alertWhiteIcon,
        }}
      />
      <BottomTab.Screen
        name="Others"
        component={OthersStack}
        options={({navigation}) => {
          const {routes, index} = navigation.getState();
          const {state: exploreState} = routes[index];
          let tabBarVisible = false;
          if (exploreState) {
            const {routes: exploreRoutes, index: exploreIndex} = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (
              exploreActiveRoute &&
              exploreActiveRoute.name === 'OthersScreen'
            )
              tabBarVisible = true;
          } else {
            tabBarVisible = true;
          }
          return {
            title: 'Others',
            icon: otherIcon,
            headerShown: false,
            focussedIcon: otherWhiteIcon,
            tabBarVisible,
          };
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
