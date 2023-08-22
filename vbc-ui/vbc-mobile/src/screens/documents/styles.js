/**
 * Documents styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  view: {
    paddingTop: dynamicSize(40),
    paddingHorizontal: dynamicSize(20),
  },
  viewStyle: {
    backgroundColor: Theme.snow,
  },
  fullPageLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(35),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.snow,
  },
  container: {
    height: dynamicSize(210),
    marginVertical: dynamicSize(10),
  },
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
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
});
