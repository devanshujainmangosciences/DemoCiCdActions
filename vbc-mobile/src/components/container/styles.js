/**
 * Stylesheets defined for
 * container component
 */
import {StyleSheet} from 'react-native';
import {dynamicSize} from 'utils/Resize';
import Theme from 'constants/Theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: dynamicSize(21),
    width: '100%',
    borderWidth: 0.5,
    borderColor: Theme.clinicalHomescreenBorder,
    paddingBottom: 7,
  },
  secondContainer: {
    paddingHorizontal: dynamicSize(18),
    paddingVertical: dynamicSize(18),
    borderRadius: dynamicSize(21),
    width: '97%',
    backgroundColor: 'rgba(255,255,255,.59)',
  },
});
