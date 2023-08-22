/**
 * Stylesheet definition for add-applicants screen component
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, dynamicSizeByOs, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: Theme.snow,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingVertical: dynamicSizeByOs(40),
    backgroundColor: Theme.snow,
  },
  horizontalTimelineContainer: {
    marginVertical: dynamicSize(20),
    marginBottom: dynamicSize(40),
  },
  containerContainer: {
    height: dynamicSize(940),
    marginVertical: dynamicSize(10),
  },
  containerContainerSmall: {
    height: dynamicSize(850),
    marginBottom: dynamicSize(20),
  },
  containerHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(20),
  },
  containerHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: dynamicSize(30),
  },
  saveButton: {
    height: dynamicSize(35),
    width: dynamicSize(100),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    height: dynamicSize(35),
    width: dynamicSize(100),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
  },
  containerAddedApplicants: {
    marginBottom: dynamicSize(20),
    borderColor: Theme.clinicalHomescreenBorder,
    borderWidth: 0.5,
    padding: dynamicSize(20),
    borderRadius: dynamicSize(24),
  },
  expandableItemContainer: {
    marginVertical: dynamicSize(10),
  },
  expandableItemChildContainer: {
    backgroundColor: Theme.lightBlueGreen,
    borderWidth: 1,
    borderColor: Theme.blueGreen,
    paddingHorizontal: dynamicSize(10),
  },
  detailsContainer: {
    marginVertical: dynamicSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  expandableContainer: {
    marginVertical: dynamicSize(30),
  },
  expandableChildrenButtonContainer: {
    height: dynamicSize(35),
    width: dynamicSize(80),
    alignItems: 'center',
    marginVertical: dynamicSize(25),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  expandableChildrenButton: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.snow,
  },
  saveAndProceedButtonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(210),
    alignItems: 'center',
    marginTop: dynamicSize(35),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: dynamicSize(40),
  },
  headingIcon: {
    marginRight: 10,
  },
  applicantContainer: {
    marginVertical: dynamicSize(30),
    width: '100%',
  },
  accountDetailsContainerEditButton: {
    backgroundColor: Theme.primary,
    height: dynamicSize(30),
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
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
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    alignSelf: 'center',
  },
  buttonIcon: {
    fontSize: fontSizes.xsmall,
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
  noApplicantContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noApplicantText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    fontStyle: 'italic',
  },
  programNotStarted: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
