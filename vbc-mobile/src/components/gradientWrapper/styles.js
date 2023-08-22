/**
 * Gradient wrapper svg styles defined
 */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: 'transparent',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  svgContainer: StyleSheet.absoluteFill,
  svg: {
    height: '100%',
    width: '100%',
  },
});
