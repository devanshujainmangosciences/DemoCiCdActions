/**
 * Change password styles definition
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, dynamicSize, dynamicFontSize, fontFamily} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(30),
    paddingTop: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  logo: {
    height: dynamicSize(50),
  },
  registerContainer: {
    height: dynamicSize(210),
    marginVertical: dynamicSize(10),
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
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    width: dynamicSize(271),
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
    width: dynamicSize(271),
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
