/**
 * Applicant complete application step 3 screen styles definition.
 */

import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontSizes, fontFamily} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(20),
    backgroundColor: Theme.snow,
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
    height: dynamicSize(225),
    alignItems: 'center',
    marginVertical: dynamicSize(10),
  },
  containerOneEditButton: {position: 'absolute', right: 0},
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
    alignSelf: 'center',
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
  accountDetailsContainerHeadingContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
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
  documentsIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: Theme.error,
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
  paymentFrameworkText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  paymentFrameworkValueText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  amountPayableText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginVertical: dynamicSize(25),
  },
  bankFdText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(22),
  },
  bankFdValueText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(12),
  },
  selectedPaymentHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.regular,
    color: Theme.darkTextColor,
    flex: 0.5,
  },
  currentFd: {
    flex: 0.7,
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  selectedPayment: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 0.5,
  },
  bankName: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(4),
  },
  noteContainer: {
    marginTop: dynamicSize(15),
  },
  note: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: dynamicSize(10),
  },
  topContainerBank: {
    flexDirection: 'row',
    marginTop: dynamicSize(22),
  },
  requiredDocumentItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: dynamicSize(10),
    borderColor: Theme.grey,
    borderWidth: dynamicSize(0.5),
    borderRadius: dynamicSize(5),
    paddingVertical: dynamicSize(10),
    paddingHorizontal: dynamicSize(15),
  },
  documentName: {flex: 0.7},
  requiredDocumentText: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
  headerLeftIcon: {
    width: dynamicSize(25),
    height: dynamicSize(25),
  },
  rightMarkIcon: {
    width: dynamicSize(19),
    height: dynamicSize(19),
  },
  imageView: {flex: 0.3, alignItems: 'flex-end'},
  requiredDocumentStatusText: {
    fontSize: fontSizes.mini,
    fontFamily: fontFamily.regular,
    color: Theme.snow,
  },
  requiredDocumentStatusContainer: {
    backgroundColor: Theme.pendingStatus,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  requiredDocumentStatusContainerUploaded: {
    backgroundColor: Theme.uploadedStatus,
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  requiredDocumentsHeadingText: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.medium,
    color: Theme.lightTextColor,
  },
  requiredDocumentContainer: {marginVertical: dynamicSize(10)},
  uploadDocumentsContainer: {
    height: dynamicSize(600),
    marginVertical: dynamicSize(10),
  },
});
