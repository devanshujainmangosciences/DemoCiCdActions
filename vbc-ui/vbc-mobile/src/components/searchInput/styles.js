/**
 * Stylesheet definition for add-applicants screen component
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.snow,
    borderWidth: dynamicSize(0.5),
    borderColor: Theme.lightBorderColor,
    height: dynamicSize(47),
    borderRadius: dynamicSize(5),
    marginVertical: dynamicSize(10),
  },
  textInputStyle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    flex: 1,
    color: Theme.lightTextColor,
    paddingHorizontal: dynamicSize(10),
  },
  iconView: {
    backgroundColor: Theme.blueGreen,
    borderColor: Theme.blueGreen,
    height: dynamicSize(47),
    width: dynamicSize(50),
    borderTopEndRadius: dynamicSize(5),
    borderBottomRightRadius: dynamicSize(5),
    borderWidth: dynamicSize(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: dynamicSize(20),
    width: dynamicSize(20),
    resizeMode: 'contain',
  },
});
