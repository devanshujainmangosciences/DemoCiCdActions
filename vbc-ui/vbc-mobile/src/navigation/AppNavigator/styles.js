/**
 * App navigator stylesheets definition.
 */
import {Platform, StyleSheet} from 'react-native';
import {dynamicSize, dynamicFontSize, fontSizes, fontFamily} from 'utils';
import Theme from 'constants/Theme';

export default StyleSheet.create({
  bottomBarContainer: {
    flexDirection: 'row',
    height: dynamicSize(80),
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
  bottomBarItemContainer: {
    flex: 1,
  },
  bottomBarItemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarItemText: {
    fontSize: dynamicFontSize(12),
    color: Theme.snow,
    marginTop: 5,
  },
  alertCount: {
    height: dynamicSize(16),
    width: dynamicSize(16),
    borderRadius: dynamicSize(8),
    backgroundColor: Theme.darkOrange,
    position: 'absolute',
    top: dynamicSize(5),
    right: dynamicSize(18),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  alertCountText: {
    fontSize: 10,
    color: Theme.snow,
    fontFamily: 'Roboto-Medium',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.snow,
  },
  bottomBar: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  headerLeftIcon: {
    marginLeft: Platform.OS === 'ios' ? dynamicSize(20) : dynamicSize(10),
    width: 25,
    height: 25,
  },
  headerTitleStyle: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
  headerContainer: {
    height: Platform.OS === 'android' ? dynamicSize(50) : dynamicSize(70),
    backgroundColor: Theme.snow,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.4,
    borderColor: Theme.lightBorderColor,
  },
  longHeaderStyle: {
    paddingHorizontal: 20,
  },
});
