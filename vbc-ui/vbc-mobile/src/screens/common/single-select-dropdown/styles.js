/**
 * Dropdown screens style definition
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, dynamicSize, dynamicSizeByOs} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: dynamicSizeByOs(30),
    backgroundColor: Theme.snow,
  },
  itemRowContainer: {
    height: dynamicSize(60),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
  },
  itemText: {flex: 1},
  icon: {alignSelf: 'center', fontSize: fontSizes.large, color: Theme.primary},
  itemSeperator: {borderWidth: 0.7, borderColor: Theme.lightBorderColor},
  textInputContainer: {
    width: '100%',
    height: dynamicSize(40),
    borderWidth: 0.7,
    borderColor: Theme.lightBorderColor,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    borderColor: Theme.primary,
    backgroundColor: Theme.snow,
  },
  otherOptionsContainer: {
    marginVertical: dynamicSize(10),
    paddingVertical: 0,
    marginBottom: dynamicSize(50),
  },
});
