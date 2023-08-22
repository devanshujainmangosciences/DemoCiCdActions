/**
 * Waiting for approval styles definition
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {
  fontSizes,
  dynamicSize,
  dynamicSizeByOs,
  dynamicFontSize,
  fontFamily,
} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(10),
    paddingTop: dynamicSizeByOs(120),
    backgroundColor: Theme.authScreensBackground,
  },
  infoView: {
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: 20,
  },
  logo: {
    height: dynamicSize(60),
  },
  registerContainer: {
    backgroundColor: Theme.snow,
    paddingHorizontal: dynamicSize(20),
    paddingVertical: dynamicSize(40),
    marginTop: dynamicSize(100),
    borderRadius: 24,
    alignItems: 'center',
    borderColor: Theme.lightBorderColor,
    borderWidth: 1,
  },
  registerText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xlarge,
    color: Theme.lightTextColor,
  },
  nameText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xlarge,
    color: Theme.darkOrange,
  },
  infoText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xsmall,
    color: Theme.lightTextColor,
  },
});
