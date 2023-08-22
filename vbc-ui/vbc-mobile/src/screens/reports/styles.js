/**
 * Stylesheet definition for reports
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, fontFamily, dynamicSize} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(40),
    backgroundColor: Theme.snow,
  },
  detailItemContainer: {
    flex: 1,
    backgroundColor: Theme.snow,
    marginTop: dynamicSize(8),
  },
  scrollContentContainer: {
    backgroundColor: Theme.snow,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Theme.snow,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainerInner: {
    flex: 0.83,
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  iconContainerInner: {
    flex: 0.15,
  },
  iconContainer: {
    height: dynamicSize(50),
    width: dynamicSize(50),
    borderRadius: dynamicSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.shadow,
  },
  icon: {
    height: dynamicSize(20),
    width: dynamicSize(20),
  },
  heading: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
    margin: dynamicSize(6),
  },
  headingItem: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.medium,
    color: Theme.lightTextColor,
  },
  desc: {
    fontSize: fontSizes.xsmall,
    fontFamily: fontFamily.regular,
    color: Theme.darkTextColor,
    marginTop: dynamicSize(10),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(170),
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: dynamicSize(25),
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
  containerContainer: {
    height: dynamicSize(220),
    marginVertical: dynamicSize(10),
  },
  labReportItemContainer: {
    height: dynamicSize(90),
    marginVertical: dynamicSize(10),
  },
  expandableItemContainer: {
    marginVertical: dynamicSize(10),
  },
  expandableItemChildContainer: {
    backgroundColor: Theme.lightBlueGreen,
    borderWidth: 0.5,
    borderColor: Theme.blueGreen,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  detailsContainer: {
    marginVertical: dynamicSize(12),
    flexDirection: 'row',
    paddingHorizontal: dynamicSize(10),
  },
  itemSeperator: {borderWidth: 0.4, borderColor: Theme.blueGreen},

  details: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 0.6,
  },
  detailsValue: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  noteContainer: {
    marginVertical: dynamicSize(8),
    paddingHorizontal: dynamicSize(10),
  },
  note: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  noteValue: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    textAlign: 'justify',
    marginTop: dynamicSize(10),
  },
  fullPageLoadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
