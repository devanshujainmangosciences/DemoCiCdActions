/**
 * Stylesheet definition for PBP program screen
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontSizes, fontFamily, dynamicSize, dynamicSizeByOs} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSizeByOs(60),
    backgroundColor: Theme.snow,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainerInner: {
    flex: 0.85,
  },
  iconContainerInner: {
    flex: 0.15,
  },
  iconContainer: {
    height: dynamicSize(50),
    width: dynamicSize(50),
    borderRadius: dynamicSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.shadow,
    // shadowColor: Theme.shadow,
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  icon: {
    height: dynamicSize(20),
    width: dynamicSize(20),
  },
  heading: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.medium,
    color: Theme.darkTextColor,
  },
  desc: {
    fontSize: fontSizes.xsmall,
    fontFamily: fontFamily.regular,
    color: Theme.darkTextColor,
    marginTop: dynamicSize(10),
  },
  containerContainer: {
    height: dynamicSize(90),
    marginVertical: dynamicSize(10),
  },
});
