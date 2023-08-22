/**
 * Style definition for
 * registration screen.
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
  logoContainer: {flex: 0.2, marginTop: dynamicSize(30)},
  logo: {
    height: dynamicSize(50),
  },
  registerContainer: {
    backgroundColor: Theme.snow,
    padding: dynamicSize(20),
    marginTop: dynamicSize(80),
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
  haveAnAccountText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.medium,
    color: Theme.dark,
    marginTop: dynamicSize(15),
  },
  loginHereText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
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
