/**
 * Stylesheets defined for Button component.
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, fontFamily} from 'utils';

export default StyleSheet.create({
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
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
});
