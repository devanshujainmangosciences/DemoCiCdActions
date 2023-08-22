/**
 * Stylesheet definition for PBP program terms screen
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, dynamicSizeByOs, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    paddingTop: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  containerContainer: {
    height: dynamicSizeByOs(145),
    marginVertical: dynamicSize(10),
  },
  terms: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    color: Theme.primary,
    textDecorationLine: 'underline',
  },
  confirmationContainer: {
    flexDirection: 'row',
    marginTop: dynamicSize(20),
  },
  confirmText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.small,
    marginLeft: 10,
    flexShrink: 1,
    color: Theme.dark,
  },
  checkBoxIcon: {
    fontSize: fontSizes.large,
    marginTop: 2,
    marginRight: 10,
    color: Theme.lightTextColor,
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(240),
    alignItems: 'center',
    marginTop: dynamicSize(40),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  apiErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.error,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
