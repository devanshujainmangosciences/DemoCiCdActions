/**
 * Alert screen styles definition.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes} from 'utils';
import {dynamicSize, dynamicSizeByOs} from 'utils/Resize';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: dynamicSizeByOs(60),
    paddingHorizontal: dynamicSize(20),
    backgroundColor: Theme.snow,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: dynamicSize(10),
    marginBottom: dynamicSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerInner: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  containerItemText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    letterSpacing: 0.5,
    // textAlign: 'justify',
  },
  textContainer: {
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: dynamicSize(10),
  },
  timeText: {
    fontFamily: fontFamily.small,
    fontSize: fontSizes.xsmall,
    color: Theme.lightTextColor,
    marginTop: dynamicSize(5),
  },
  image: {
    marginRight: dynamicSize(8),
    height: dynamicSize(15),
    width: dynamicSize(15),
    marginTop: dynamicSize(10),
  },
});
