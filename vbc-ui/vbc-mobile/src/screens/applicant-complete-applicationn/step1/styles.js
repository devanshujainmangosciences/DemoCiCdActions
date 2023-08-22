/**
 * Applicant complete application step 1 screen styles definition.
 */

import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontSizes, fontFamily} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.snow,
    paddingTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(20),
    alignItems: 'center',
  },
  containerView: {
    height: dynamicSize(410),
  },
  containerViewLarge: {
    height: dynamicSize(370),
  },
  selectedPaymentHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  selectedPayment: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.primary,
    marginTop: dynamicSize(16),
  },
  amountPayableText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(15),
  },
  bankFdText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(22),
  },
  textInputContainer: {
    marginTop: dynamicSize(15),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  note: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(30),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(40),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  radioButtonContainer: {
    marginVertical: dynamicSize(10),
  },
  occupationHeading: {
    marginTop: dynamicSize(10),
    marginBottom: dynamicSize(10),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 10,
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
    marginVertical: 10,
    fontStyle: 'italic',
  },
});
