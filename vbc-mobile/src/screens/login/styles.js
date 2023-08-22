/**
 * Login screen styles definition
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {
  fontSizes,
  fontFamily,
  dynamicFontSize,
  dynamicSize,
  dynamicSizeByOs,
} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(30),
    paddingTop: dynamicSizeByOs(50),
    backgroundColor: Theme.authScreensBackground,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: dynamicSize(50),
  },
  logoContainer: {flex: 0.2, marginTop: dynamicSize(30)},
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
    marginTop: dynamicSize(30),
  },
  loginHereText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.currentStatusColor,
  },
  forgotPasswordContainer: {
    marginTop: dynamicSize(5),
    marginBottom: dynamicSize(10),
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.light,
  },
  newUserContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.medium,
    color: Theme.dark,
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
