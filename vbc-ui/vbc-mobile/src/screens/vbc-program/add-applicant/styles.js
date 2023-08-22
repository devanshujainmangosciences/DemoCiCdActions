/**
 * Stylesheet definition for add-applicants screen component
 */
import {StyleSheet} from 'react-native';
import {Theme} from '../../../constants';
import {dynamicSize, fontFamily, fontSizes} from '../../../utils';

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
  containerContainer: {
    height: dynamicSize(930),
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
    marginVertical: dynamicSize(10),
    borderColor: Theme.clinicalHomescreenBorder,
    borderWidth: 0.5,
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
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  detailsContainer: {
    marginVertical: dynamicSize(12),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  details: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 1,
  },
  detailsValue: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 1,
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
    marginEnd: dynamicSize(8),
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
    marginBottom: dynamicSize(10),
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
    marginTop: dynamicSize(3),
    marginBottom: dynamicSize(20),
    fontStyle: 'italic',
  },
  seperator: {
    marginBottom: dynamicSize(15),
  },
});
