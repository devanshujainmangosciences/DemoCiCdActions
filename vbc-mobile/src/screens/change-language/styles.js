/**
 * Change Language screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.snow,
    paddingTop: dynamicSize(40),
    paddingHorizontal: dynamicSize(20),
  },
  button: {
    height: dynamicSize(45),
    width: dynamicSize(290),
    alignItems: 'center',
    marginTop: dynamicSize(35),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regular,
    color: Theme.snow,
  },
  container: {
    height: dynamicSize(210),
    marginVertical: dynamicSize(10),
  },
  textInputContainer: {
    marginTop: dynamicSize(25),
    width: dynamicSize(291),
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: 20,
  },
  cancelButton: {
    height: dynamicSize(40),
    width: dynamicSize(140),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: dynamicSize(20),
  },
  containerItemText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.lightTextColor,
  },
  containerInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: dynamicSize(10),
    height: dynamicSize(15),
    width: dynamicSize(15),
  },
  saveButton: {
    height: dynamicSize(40),
    width: dynamicSize(140),
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
});
