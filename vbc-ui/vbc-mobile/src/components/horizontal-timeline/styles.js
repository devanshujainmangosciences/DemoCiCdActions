/**
 * stylesheet defined for
 * horizontal timeline
 */
import {StyleSheet} from 'react-native';
import {Theme} from 'constants';
import {dynamicSize, fontFamily, fontSizes} from 'utils';

export default StyleSheet.create({
  horizontalTimelineContainer: {
    height: dynamicSize(50),
  },
  container: {
    flexDirection: 'row',
  },
  timelineItemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineCircle: {
    height: dynamicSize(35),
    width: dynamicSize(35),
    borderRadius: dynamicSize(18),
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineCircleText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.mini,
  },
  timelineTail: {
    height: dynamicSize(4),
    width: dynamicSize(50),
    backgroundColor: Theme.timelineCircleBorder,
  },
});
