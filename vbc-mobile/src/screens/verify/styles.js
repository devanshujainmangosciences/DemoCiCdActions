/**
 * Verify screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize, dynamicSizeByOs} from 'utils/Resize';

export default StyleSheet.create({
  scrollViewContainer: {
    paddingTop: dynamicSizeByOs(20),
    paddingHorizontal: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  contentContainer: {
    paddingBottom: dynamicSize(40),
  },
  container: {
    height: dynamicSize(65),
    marginVertical: dynamicSize(10),
  },
  containerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: dynamicSize(5),
    fontStyle: 'italic',
  },
  logoContainer: {
    height: dynamicSize(80),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {height: dynamicSize(50)},
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Theme.lightBorderColor,
    height: dynamicSize(50),
    paddingHorizontal: dynamicSize(20),
    marginVertical: dynamicSize(5),
  },
  sectionIcon: {
    position: 'absolute',
    right: 10,
    fontSize: fontSizes.small,
    color: Theme.primary,
  },
  sectionText: {
    fontFamily: fontFamily.regular,
    color: Theme.darkTextColor,
    marginLeft: dynamicSize(15),
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(20),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  infoView: {
    alignItems: 'flex-start',
    marginTop: dynamicSize(-15),
    flexDirection: 'row',
    marginLeft: dynamicSize(8),
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
  fullPageLoadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItemText: {
    fontFamily: fontFamily.xsmall,
    fontSize: fontSizes.xsmall,
    color: Theme.success,
    marginLeft: dynamicSize(5),
  },
  containerItemTextError: {
    fontFamily: fontFamily.xsmall,
    fontSize: fontSizes.xsmall,
    color: Theme.error,
    marginLeft: dynamicSize(5),
  },
  dotView: {
    width: 5,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: Theme.success,
  },
  dotViewError: {
    width: 5,
    height: 5,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: Theme.error,
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
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(300),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  image: {
    marginRight: dynamicSize(10),
    height: dynamicSize(15),
    width: dynamicSize(15),
  },
});
