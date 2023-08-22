/**
 * style definition of
 * expandable item.
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {fontFamily, fontSizes, dynamicSize} from 'utils';

export default StyleSheet.create({
  container: {},
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dynamicSize(10),
    paddingVertical: dynamicSize(10),

    borderRadius: 5,
  },
  headingContainerBig: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  iconContainer: {
    flex: 0.08,
  },
  headingTextContainer: {
    flex: 0.95,
  },
  multilineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childContainerBig: {
    backgroundColor: Theme.lightBlueGreen,
    borderWidth: 1,
    borderColor: Theme.blueGreen,
    paddingHorizontal: dynamicSize(10),
  },
  heading: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.small,
    color: Theme.lightTextColor,
    flex: 0.9,
  },
  headingIcon: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.small,
    color: Theme.primary,
    flex: 0.05,
  },
});
