/**
 * Stylesheets defined for AppText component
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes} from 'utils/CommonStyles';

export default StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: fontSizes.medium,
    color: Theme.dark,
  },
});
