/**
 * Stylesheet defined for loader component
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize} from 'utils';

export default StyleSheet.create({
  container: {
    height: dynamicSize(30),
    width: dynamicSize(30),
    borderRadius: 15,
    backgroundColor: Theme.snow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: dynamicSize(18),
    width: dynamicSize(18),
  },
});
