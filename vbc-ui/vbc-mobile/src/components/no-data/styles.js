/**
 * Others screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(45),
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
  expandableItemContainer: {
    marginVertical: dynamicSize(10),
  },
  note: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.light,
    color: Theme.lightTextColor,
    marginVertical: dynamicSize(10),
  },
  containerContainer: {
    height: dynamicSize(480),
    marginVertical: dynamicSize(10),
  },
});
