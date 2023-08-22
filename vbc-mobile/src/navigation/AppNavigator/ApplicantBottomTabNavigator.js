/**
 * Bottom bar component
 */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ApplicantFinancialInformation,
  ApplicantDocuments,
  Alerts,
} from 'screens';
import OthersStack from './BottomTab-OthersStack';
import ApplicantOverviewStack from './ApplicantOverviewStack';
import {
  clinicalIcon,
  clinicalWhiteIcon,
  alertIcon,
  alertWhiteIcon,
  otherIcon,
  otherWhiteIcon,
  vbcIcon,
  vbcWhiteIcon,
  reportIcon,
  reportWhiteIcon,
} from 'assets/icons';
import {Theme} from 'constants';
import {AppText} from 'components';
import styles from './styles';
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
      initialRouteName={'Overview'}
      screenOptions={{
        keyboardHidesTabBar: true,
      }}
      tabBar={(props) => <BottomBar {...props} />}>
      <BottomTab.Screen
        name="Overview"
        component={ApplicantOverviewStack}
        options={{
          title: 'Overview',
          headerShown: false,
          icon: clinicalIcon,
          focussedIcon: clinicalWhiteIcon,
          unmountOnBlur: true,
        }}
      />
      <BottomTab.Screen
        name="Financial"
        component={ApplicantFinancialInformation}
        options={{
          title: 'Financial',
          headerShown: false,
          icon: vbcIcon,
          focussedIcon: vbcWhiteIcon,
        }}
      />
      <BottomTab.Screen
        name="Documents"
        component={ApplicantDocuments}
        options={{
          title: 'Documents',
          headerShown: false,
          icon: reportIcon,
          focussedIcon: reportWhiteIcon,
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
        options={{
          title: 'Others',
          headerShown: false,
          icon: otherIcon,
          focussedIcon: otherWhiteIcon,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
