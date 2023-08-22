/**
 * EditProfile styles defintion.
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, dynamicSize, dynamicFontSize, fontFamily} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(30),
    backgroundColor: Theme.snow,
  },
  scrollContainer: {backgroundColor: Theme.snow},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.snow,
  },
  logo: {
    height: dynamicSize(100),
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
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    marginVertical: dynamicSize(10),
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  textInputSeparator: {
    marginTop: dynamicFontSize(14),
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  medicationDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(10),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(40),
    marginBottom: dynamicSize(10),
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
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  successText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.success,
    textAlign: 'center',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  sectionContainer: {
    height: dynamicSize(680),
    marginVertical: dynamicSize(10),
  },
  addressSectionContainer: {
    height: dynamicSize(970),
    marginVertical: dynamicSize(10),
  },
  addressSectionContainerSmall: {
    height: dynamicSize(550),
    marginVertical: dynamicSize(10),
  },
  medicationSectionContainer: {
    height: dynamicSize(490),
    marginVertical: dynamicSize(10),
  },
  sectionHeading: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
    marginLeft: 10,
  },
  sectionIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    height: 15,
    width: 15,
  },
  bottomInfoContainer: {
    marginHorizontal: dynamicSize(25),
  },
  termsText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.primary,
    textDecorationLine: 'underline',
  },
  confirmationContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
  },
  checkBoxIcon: {
    marginRight: 10,
  },
  samePresentAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  samePresentAddress: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
  financialContainer: {
    height: dynamicSize(230),
    marginVertical: dynamicSize(10),
  },
});
