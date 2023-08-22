/**
 * Privacy Policy screen styles definition.
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
  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dynamicSize(50),
    position: 'absolute',
    bottom: dynamicSize(10),
    right: dynamicSize(20),
    height: dynamicSize(50),
    backgroundColor: Theme.snow,
    borderRadius: dynamicSize(100),
    elevation: 5,
  },
  fabIcon: {
    color: Theme.primary,
  },
  contentContainer: {
    paddingBottom: dynamicSize(40),
  },
  container: {
    height: dynamicSize(65),
    marginVertical: dynamicSize(20),
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
    textAlign: 'justify',
  },
  containerItemTextItalics: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  containerItemTextBold: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  containerItemSubText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginLeft: dynamicSize(5),
  },
  containerItemSubTextBold: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    marginLeft: dynamicSize(5),
    fontWeight: 'bold',
  },
  marginFromLeft: {
    marginLeft: dynamicSize(15),
    paddingEnd: dynamicSize(20),
  },
  containerItemTextUnderline: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    textDecorationLine: 'underline',
  },
  containerHeaderText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.medium,
    color: Theme.darkTextColor,
    marginVertical: dynamicSize(15),
  },
  containerItemTitle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.darkTextColor,
    marginVertical: dynamicSize(15),
  },
  containerItemSubHeader: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.darkTextColor,
  },
  containerItemSubData: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
  },
  nameStyle: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.darkTextColor,
  },
  nameDataStyle: {
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
