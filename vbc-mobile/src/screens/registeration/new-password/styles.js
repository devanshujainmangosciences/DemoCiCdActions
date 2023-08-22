/**
 * New password styles definition
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
    paddingHorizontal: dynamicSize(30),
    paddingTop: dynamicSizeByOs(50),
    backgroundColor: Theme.authScreensBackground,
  },
  logo: {
    height: dynamicSize(50),
  },
  registerContainer: {
    backgroundColor: Theme.snow,
    padding: dynamicSize(20),
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
    marginBottom: dynamicSize(10),
  },
  pleaseEnterText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.large,
    color: Theme.dark,
    textAlign: 'center',
    marginTop: dynamicSize(20),
  },
  nameText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xlarge,
    color: Theme.darkOrange,
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(311),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  textInputSeparator: {
    marginTop: dynamicFontSize(24),
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.large,
    color: Theme.snow,
    alignSelf: 'center',
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(25),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueButton: {
    alignSelf: 'center',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 20,
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
