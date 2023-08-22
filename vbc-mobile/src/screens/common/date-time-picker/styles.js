/**
 * Datetime picker stylesheets definition
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, dynamicSize, dynamicSizeByOs, fontFamily} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: dynamicSizeByOs(30),
    justifyContent: 'center',
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
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(25),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.large,
    color: Theme.snow,
    alignSelf: 'center',
  },
});
