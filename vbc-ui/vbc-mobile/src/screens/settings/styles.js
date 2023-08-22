/**
 * Settings screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  scrollViewContainer: {
    paddingTop: dynamicSize(20),
    paddingHorizontal: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  contentContainer: {
    paddingBottom: dynamicSize(40),
  },
  container: {
    height: dynamicSize(65),
    marginVertical: dynamicSize(10),
  },
  containerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    height: dynamicSize(80),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {height: dynamicSize(50)},
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Theme.lightBorderColor,
    height: dynamicSize(50),
    paddingHorizontal: dynamicSize(20),
    marginVertical: dynamicSize(5),
  },
  sectionIcon: {
    position: 'absolute',
    right: 10,
    fontSize: fontSizes.small,
    color: Theme.primary,
  },
  sectionText: {
    fontFamily: fontFamily.regular,
    color: Theme.darkTextColor,
    marginLeft: dynamicSize(15),
  },
  buttonText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: Theme.snow,
    alignSelf: 'center',
  },
  buttonContainer: {
    height: dynamicSize(45),
    width: dynamicSize(250),
    alignItems: 'center',
    marginTop: dynamicSize(25),
    borderRadius: 5,
    backgroundColor: Theme.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
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
  buttonIcon: {
    fontSize: fontSizes.small,
    color: Theme.currentStatusColor,
  },
  containerItemText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  image: {
    marginRight: dynamicSize(10),
    height: dynamicSize(15),
    width: dynamicSize(15),
  },
});
