/**
 * Stylesheet definition for drug schedule screen component
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
  containerContainer: {
    height: dynamicSize(930),
    marginVertical: dynamicSize(10),
  },
  confirmationContainer: {
    flexDirection: 'row',
  },
  confirmText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.medium,
  },
  checkBoxIcon: {
    fontSize: fontSizes.large,
    marginRight: dynamicSize(10),
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
  switchCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dynamicSize(18),
    height: dynamicSize(18),
  },
  containerHeading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  switchContainer: {
    marginTop: dynamicSize(10),
  },
  totalCost: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.primary,
    marginTop: dynamicSize(10),
  },
  note: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
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
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  details: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 0.6,
  },
  detailsText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 0.5,
    textAlign: 'right',
  },
  expandableContainer: {
    marginVertical: dynamicSize(30),
  },
  buttonView: {
    flex: 0.4,
    alignItems: 'flex-end',
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
  headingIcon: {
    marginRight: 10,
  },
  applicantContainer: {
    marginVertical: dynamicSize(30),
    width: '100%',
  },
  view: {
    paddingTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(20),
    alignItems: 'center',
  },
  viewStyle: {
    backgroundColor: Theme.snow,
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  documentListContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: dynamicSize(30),
  },
  expandableChildrenButtonContainerDelete: {
    height: dynamicSize(35),
    width: dynamicSize(80),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  expandableChildrenButtonContainerDeleteDisabled: {
    height: dynamicSize(35),
    width: dynamicSize(80),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.grey,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentContainer: {
    paddingVertical: 35,
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },

  buttonCancel: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: dynamicSize(20),
  },
  accountText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.dark,
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.large,
    color: Theme.snow,
    alignSelf: 'center',
  },
  closeCircle: {
    height: dynamicSize(35),
    width: dynamicSize(35),
    borderRadius: dynamicSize(18),
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    right: -5,
    top: -20,
  },
  closeCircleText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.large,
    color: 'white',
  },
});
