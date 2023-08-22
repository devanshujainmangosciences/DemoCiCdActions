import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  container: {},
  optionsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dynamicSize(10),
  },
  iconContainer: {
    flex: 0.1,
  },
  icon: {
    color: Theme.primary,
  },
  optionTextContainer: {
    flex: 0.9,
  },
  optionText: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
  errorMessage: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    marginVertical: dynamicSize(5),
    fontStyle: 'italic',
  },
});
