/**
 * Stylesheet for section navigator component
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontFamily, fontSizes} from 'utils/CommonStyles';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  mainContainer: {
    borderWidth: 0.5,
    borderColor: Theme.clinicalHomescreenBorder,
    borderRadius: 24,
    height: dynamicSize(120),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 13,
  },
  title: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.medium,
    marginTop: 10,
  },
  desc: {
    fontSize: fontSizes.mini,
    fontFamily: fontFamily.regular,
    marginTop: 8,
    textAlign: 'center',
  },
  iconContainer: {
    height: dynamicSize(50),
    width: dynamicSize(50),
    borderRadius: dynamicSize(25),
    backgroundColor: Theme.snow,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    zIndex: 100,
    shadowColor: Theme.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    fontSize: fontSizes.large,
  },
});
