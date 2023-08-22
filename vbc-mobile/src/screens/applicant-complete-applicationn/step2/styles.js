/**
 * Applicant complete application step 2 screen styles definition.
 */

import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontSizes, fontFamily} from 'utils';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Theme.snow,
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(20),
  },
  containerStyleView: {
    alignItems: 'center',
  },
  containerContainer: {
    height: dynamicSize(400),
    marginVertical: dynamicSize(10),
  },
  containerContainerSecond: {
    height: dynamicSize(510),
    marginVertical: dynamicSize(10),
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(15),
  },
  heading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    flexShrink: 1,
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(285),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  smallTextInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(135),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  note: {
    marginTop: dynamicSize(20),
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  headingIcon: {marginRight: 10},
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
  errorContainer: {
    marginBottom: dynamicSize(80),
  },
  formFieldsInRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: dynamicSize(8),
  },
  placeholder: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginBottom: dynamicSize(-15),
    marginTop: dynamicSize(8),
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 8,
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
  requiredDocumentsItemText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginVertical: 10,
  },
});
