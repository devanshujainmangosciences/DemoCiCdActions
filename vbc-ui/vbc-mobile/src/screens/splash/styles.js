import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.snow,
  },
  logo: {
    height: dynamicSize(150),
    width: dynamicSize(150),
  },
});
