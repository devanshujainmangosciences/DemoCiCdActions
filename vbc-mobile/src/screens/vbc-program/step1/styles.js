/**
 * Stylesheet definition of PBP program step 1
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, dynamicSizeByOs, fontFamily, fontSizes} from 'utils';

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
    height: dynamicSizeByOs(290),
    marginVertical: dynamicSize(10),
  },
  options: {
    marginTop: dynamicSize(25),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: dynamicSize(20),
  },
  heading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    marginVertical: dynamicSize(5),
  },
  radioIcon: {
    fontSize: fontSizes.small,
    color: Theme.primary,
  },
  option: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginLeft: dynamicSize(10),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(40),
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
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: dynamicSize(5),
    fontStyle: 'italic',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dynamicSize(24),
    width: dynamicSize(24),
    borderRadius: dynamicSize(14),
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: dynamicSize(20),
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
});
