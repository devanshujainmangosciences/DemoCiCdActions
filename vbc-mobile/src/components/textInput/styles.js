/**
 * Stylesheet defined for
 * custom textInput component
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {dynamicSize} from 'utils';
import {fontFamily, fontSizes} from 'utils/CommonStyles';

export default StyleSheet.create({
  inputContainer: {
    height: dynamicSize(48),
    borderColor: Theme.registrationInputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: dynamicSize(18),
  },
  browseButton: {
    backgroundColor: Theme.primary,
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  browseText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.snow,
  },
  placeholder: {
    position: 'absolute',
    left: dynamicSize(18),
  },
  errorMessage: {
    fontSize: fontSizes.mini,
    fontFamily: fontFamily.regular,
    fontStyle: 'italic',
    color: Theme.error,
  },
  errorContainer: {
    marginLeft: 20,
    marginTop: 5,
  },
  errorIcon: {
    fontSize: fontSizes.small,
    color: Theme.error,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    paddingHorizontal: 2,
    justifyContent: 'center',
  },
  filePickerInput: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownSelectedText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  icon: {position: 'absolute', right: 10},
  textInput: {
    flex: 1,
    color: Theme.lightTextColor,
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
  },
  rightInputIcon: {
    height: dynamicSize(13),
    width: dynamicSize(13),
  },
});
