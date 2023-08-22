/**
 * Stylesheet definition of PBP program step 3
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, dynamicSizeByOs, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  horizontalTimelineContainer: {
    marginVertical: dynamicSize(10),
    marginBottom: dynamicSize(40),
  },
  scrollContainer: {backgroundColor: Theme.snow},
  containerContainer: {
    height: dynamicSizeByOs(220),
    marginVertical: dynamicSize(10),
  },
  containerContainerLarge: {
    height: dynamicSizeByOs(350),
    marginBottom: dynamicSize(20),
  },
  options: {
    marginTop: dynamicSize(25),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  totalCostHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(10),
  },
  footNote: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginRight: dynamicSize(10),
    marginTop: dynamicSize(10),
    textAlign: 'justify',
    flex: 0.6,
  },
  totalCostDesc: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(15),
  },
  heading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    marginVertical: dynamicSize(10),
  },
  radioIcon: {
    fontSize: fontSizes.small,
    color: Theme.primary,
  },
  option: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginLeft: 10,
  },
  buttonContainer: {
    height: dynamicSize(40),
    width: dynamicSize(200),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: dynamicSize(25),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.snow,
    alignSelf: 'center',
  },
  buttonContainer1: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: dynamicSize(40),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText1: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
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
  totalAmount: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
  confirmationContainer: {
    flexDirection: 'row',
    marginTop: dynamicSize(30),
  },
  confirmText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    marginLeft: 10,
    flexShrink: 1,
  },
  checkBoxIcon: {
    marginRight: 10,
    color: Theme.lightTextColor,
  },
  textInputContainer: {
    marginTop: dynamicSize(15),
    width: dynamicSize(285),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  currentBankFdText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(10),
  },
  additionalContainer: {
    marginTop: dynamicSize(20),
  },
  apiErrorContainer: {marginBottom: dynamicSize(40)},
});
