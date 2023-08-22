/**
 * Stylesheet definition of PBP program step 2
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
  containerContainer: {
    height: dynamicSize(480),
    marginVertical: dynamicSize(10),
  },
  containerContainer2: {
    height: dynamicSize(1120),
    marginVertical: dynamicSize(10),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(40),
    borderRadius: dynamicSize(5),
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fullPageLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},

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
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dynamicSize(8),
  },
  heading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
    flexShrink: 1,
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(285),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  uploadNote: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  note: {
    marginTop: dynamicSize(20),
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  headingIcon: {marginRight: 10},
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
