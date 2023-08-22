/**
 * Stylesheet definition of Upload document component
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
    width: dynamicSize(140),
    alignItems: 'center',
    marginTop: dynamicSize(20),
    borderRadius: dynamicSize(5),
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dynamicSize(10),
  },
  buttonReupload: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDownload: {
    height: dynamicSize(45),
    width: dynamicSize(130),
    alignItems: 'center',
    marginTop: dynamicSize(10),
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
  fileNameText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.primary,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: dynamicSize(2),
  },
  fileNameTitle: {
    fontFamily: fontFamily.regular,
    fontSize: dynamicSize(12),
    color: Theme.lightTextColor,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: dynamicSize(20),
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
    marginTop: dynamicSize(5),
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
