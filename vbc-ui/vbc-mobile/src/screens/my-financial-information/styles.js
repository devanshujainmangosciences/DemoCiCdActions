/**
 * Stylesheet definition of PBP program step 2
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingVertical: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  horizontalTimelineContainer: {
    marginVertical: dynamicSize(10),
    marginBottom: dynamicSize(40),
  },
  containerContainer: {
    height: dynamicSize(480),
    marginBottom: dynamicSize(20),
  },
  containerContainer2: {
    height: dynamicSize(1130),
    marginBottom: 20,
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginVertical: dynamicSize(40),
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
  successText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.success,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(8),
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
  note: {
    marginTop: dynamicSize(20),
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  headingIcon: {marginRight: 10},
  pageHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: dynamicSize(10),
  },
  reviewText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  reviewIcon: {
    marginRight: 10,
  },
  paymentContainer: {
    height: dynamicSize(95),
    alignItems: 'center',
    marginVertical: dynamicSize(10),
  },
  paymentContainerHeading: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  paymentContainerDesc: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(20),
    // textAlign: 'center',
  },
  accountDetailsContainer: {
    height: dynamicSize(220),
    marginVertical: dynamicSize(10),
  },
  accountDetailsContainerHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountDetailsContainerEditButton: {
    backgroundColor: Theme.primary,
    height: dynamicSize(30),
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  accountDetailsContainerHeading: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  accountDetailsContainerEditButtonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xsmall,
    color: Theme.snow,
  },
  accountDetailsContainerSubHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: dynamicSize(10),
  },
  financialInfo: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    flexShrink: 1,
  },
  valuesContainer: {
    marginVertical: dynamicSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueHeadingText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xsmall,
    color: Theme.lightTextColor,
    marginRight: dynamicSize(10),
    flex: 0.6,
  },
  valueText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xsmall,
    color: Theme.lightTextColor,
    marginRight: dynamicSize(10),
    flex: 0.4,
  },
  containerSecond: {
    height: dynamicSize(520),
    marginVertical: dynamicSize(10),
  },
});
