/**
 * Clinical homescreen stylesheets definition
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, dynamicSizeByOs} from 'utils/Resize';

export default StyleSheet.create({
  container: {
    padding: dynamicSize(20),
    paddingTop: dynamicSizeByOs(50),
    backgroundColor: Theme.snow,
  },
  sectionListContainer: {
    marginTop: dynamicSize(35),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionListItem: {
    width: '48%',
    marginVertical: 20,
  },
});
