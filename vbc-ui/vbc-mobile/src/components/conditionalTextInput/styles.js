/**
 * Stylesheets defined for conditional text input component
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontSizes, dynamicSize, fontFamily} from 'utils';

export default StyleSheet.create({
  textInputContainer: {
    marginTop: dynamicSize(20),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  samePresentAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  samePresentAddress: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.lightTextColor,
  },
});
