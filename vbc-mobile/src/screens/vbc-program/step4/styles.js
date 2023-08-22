/**
 * Stylesheet definition of PBP program step 4
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontFamily, fontSizes} from 'utils';

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
  },
  accountDetailsContainer: {
    height: dynamicSize(770),
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
    marginTop: dynamicSize(30),
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
  footNote: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginRight: dynamicSize(10),
    marginTop: dynamicSize(10),
    textAlign: 'justify',
    flex: 0.6,
  },
  additionalContainer: {
    marginTop: dynamicSize(20),
  },
  currentBankFdText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.regular,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(10),
  },
  valueText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xsmall,
    color: Theme.lightTextColor,
    marginRight: dynamicSize(10),
    flex: 0.4,
  },
  programCostContainer: {
    height: dynamicSize(170),
    marginVertical: dynamicSize(10),
  },
  reapplyButton: {
    flexDirection: 'row',
    backgroundColor: Theme.primary,
    height: dynamicSize(40),
    width: dynamicSize(150),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: dynamicSize(40),
    marginBottom: dynamicSize(10),
    marginHorizontal: dynamicSize(8),
  },
  reapplyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalCostHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(10),
  },
  totalCostDesc: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(15),
  },
  step3Text: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(10),
  },
  scheduleButton: {
    backgroundColor: Theme.primary,
    height: dynamicSize(40),
    width: dynamicSize(190),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: dynamicSize(30),
    alignSelf: 'center',
  },
  schedule: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.snow,
  },
  startApplicationButton: {
    flexDirection: 'row',
    backgroundColor: Theme.primary,
    height: dynamicSize(40),
    width: dynamicSize(260),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: dynamicSize(40),
    marginBottom: dynamicSize(10),
  },
  startApplication: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
  },
  applicantContainer: {
    width: '100%',
    marginVertical: dynamicSize(10),
  },
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: dynamicSize(10),
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
});
