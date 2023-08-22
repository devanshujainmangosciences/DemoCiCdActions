/**
 * Stylesheets defined for
 * horizontal timeline
 */
import {StyleSheet} from 'react-native';
import Theme from 'constants/Theme';
import {fontFamily, fontSizes} from 'utils/CommonStyles';
import {dynamicSize} from 'utils/Resize';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cycleContainer: {
    height: 34,
    width: 34,
    borderRadius: 17,
    margin: dynamicSize(7),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Theme.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cycleText: {
    fontSize: fontSizes.xsmall,
    fontFamily: fontFamily.medium,
  },
  timelineItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  timelineTail: {
    height: 4,
    width: 15,
    backgroundColor: Theme.timelineCircleBorder,
  },
});
