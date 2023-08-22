/**
 * Stylesheets defined for
 * current status component
 */
import {StyleSheet} from 'react-native';
import {dynamicSize} from 'utils/Resize';
import Theme from 'constants/Theme';
import {fontFamily, fontSizes} from 'utils/CommonStyles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: dynamicSize(25),
    paddingHorizontal: dynamicSize(20),
    borderWidth: 0.5,
    borderColor: Theme.clinicalHomescreenBorder,
  },
  currentStatusText: {
    color: Theme.currentStatusColor,
    fontSize: fontSizes.large,
    fontFamily: fontFamily.medium,
    textDecorationLine: 'underline',
  },
  drugNameValue: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
  },
  drugName: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.medium,
    marginTop: 3,
  },
  cycle: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.medium,
    marginHorizontal: 10,
  },
  cycleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: dynamicSize(15),
  },
  doctorName: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.medium,
    marginTop: dynamicSize(20),
  },
  learnMore: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    marginTop: dynamicSize(25),
    color: Theme.primary,
  },
  cycleTitle: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
  },
  cycleDate: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    marginTop: dynamicSize(6),
  },
  noCycleDate: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.small,
    textAlign: 'center',
    color: Theme.lightTextColor,
  },
  cycleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: dynamicSize(25),
    alignItems: 'center',
  },
  cycleDateBox: {
    flex: 0.5,
    height: dynamicSize(80),
    borderRadius: 20,
    backgroundColor: Theme.lightWhiteGrey,
    marginHorizontal: dynamicSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContainer: {
    marginTop: dynamicSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleBorder: {height: 3, backgroundColor: Theme.snow, flex: 0.5},
});
