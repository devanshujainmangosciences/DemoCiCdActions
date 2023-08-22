/**
 * Stylesheet definition for ConfirmationModal component
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontSizes, fontFamily, dynamicSize} from 'utils';

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: dynamicSize(330),
    height: dynamicSize(190),
    alignSelf: 'center',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dynamicSize(24),
    height: dynamicSize(24),
    borderRadius: dynamicSize(14),
    backgroundColor: Theme.snow,
    position: 'absolute',
    right: dynamicSize(20),
  },
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
  contentContainer: {
    paddingVertical: dynamicSize(40),
    paddingHorizontal: dynamicSize(25),
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(110),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: dynamicSize(35),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    marginHorizontal: dynamicSize(8),
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressView: {
    marginTop: dynamicSize(27),
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dynamicSize(6),
  },
  progressText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.xsmall,
    color: Theme.dark,
  },
  accountText: {
    fontFamily: fontFamily.light,
    fontSize: fontSizes.medium,
    color: Theme.dark,
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.large,
    color: Theme.snow,
    alignSelf: 'center',
  },
  closeCircle: {
    height: dynamicSize(35),
    width: dynamicSize(35),
    borderRadius: dynamicSize(18),
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'absolute',
    right: -5,
    top: -10,
  },
  closeCircleText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.large,
    color: 'white',
  },
});
