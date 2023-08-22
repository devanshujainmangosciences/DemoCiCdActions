/**
 * Stylesheet definition for vbc schedule screen component
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
});
