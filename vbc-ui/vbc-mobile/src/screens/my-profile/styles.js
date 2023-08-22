/**
 * Stylesheet definition of my profile
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
    paddingTop: dynamicSize(30),
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
  profilePhotoContainer: {
    height: dynamicSize(205),
    alignItems: 'center',
    marginVertical: dynamicSize(10),
  },
  profilePhotoSubContainer: {
    alignItems: 'center',
  },
  profileButton: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(25),
    marginBottom: dynamicSize(30),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: dynamicSize(270),
    marginVertical: dynamicSize(10),
  },
  addressDetailsContainer: {
    height: dynamicSize(410),
    marginVertical: dynamicSize(10),
    overflow: 'hidden',
  },
  hospitalDetailsContainer: {
    height: dynamicSize(240),
    marginVertical: dynamicSize(10),
  },
  patientDetailsContainer: {
    height: dynamicSize(210),
    marginVertical: dynamicSize(10),
  },
  financialDetailsContainer: {
    height: dynamicSize(130),
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
    flex: 1,
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
  programCostContainer: {
    height: dynamicSize(170),
    marginVertical: dynamicSize(10),
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
    marginTop: dynamicSize(30),
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
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  profilePhotoView: {
    height: dynamicSize(94),
    width: dynamicSize(94),
    borderRadius: dynamicSize(87),
    borderWidth: 1,
    borderColor: Theme.lightBorderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    height: dynamicSize(50),
    width: dynamicSize(50),
  },
});
