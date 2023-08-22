/**
 * Component that shows
 * progress in
 * timeline format placed horizontally.
 * Used in:
 * PBP patient flow
 */
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Icon} from 'native-base';
import {AppText} from '../appText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Theme} from 'constants';
import styles from './styles';

const HorizontalTimeline = (props) => {
  /** stores timeline items data that is rendered */
  const [timeline, setTimeline] = useState([]);
  const {totalCycleCount = 4, presentCycleCount = 3} = props;

  /**
   * Helps to
   * create an array that contains
   * timeline items i.e.
   * circle & its tail.
   * Depending upon the totalCycleCount & presentCycleCount.
   * We take this array and runs map onto this to render timeline component
   */
  const renderTimeline = () => {
    let i = 0;
    let renderTimeline = [];
    let filledCircleColor;
    let filledTailColor;
    let circleChildren;
    let circleTextColor;
    while (i < totalCycleCount) {
      filledCircleColor = {
        backgroundColor: i < presentCycleCount ? Theme.primary : Theme.snow,
        borderColor:
          i < presentCycleCount
            ? Theme.primary
            : Theme.clinicalHomescreenBorder,
      };
      filledTailColor = {
        backgroundColor:
          i < presentCycleCount - 1
            ? Theme.primary
            : Theme.clinicalHomescreenBorder,
        borderColor:
          i < presentCycleCount - 1
            ? Theme.primary
            : Theme.clinicalHomescreenBorder,
      };
      circleTextColor = {
        color: i < presentCycleCount ? Theme.snow : Theme.grey,
      };
      circleChildren =
        i < presentCycleCount - 1 ? (
          <Icon name="check" as={AntDesign} color={circleTextColor} />
        ) : (
          <AppText style={[styles.timelineCircleText, circleTextColor]}>
            {i + 1}
          </AppText>
        );
      i++;
      const timelineItem = (
        <View key={i} style={styles.timelineItemContainer}>
          <View style={[styles.timelineCircle, filledCircleColor]}>
            {circleChildren}
          </View>
          {i !== totalCycleCount && (
            <View style={[styles.timelineTail, filledTailColor]} />
          )}
        </View>
      );
      renderTimeline = [...renderTimeline, timelineItem];
    }
    return renderTimeline;
  };

  /** get an array of timeline data */
  useEffect(() => {
    setTimeline(renderTimeline());
  }, []);

  return (
    <View style={styles.horizontalTimelineContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {timeline.map((item) => item)}
      </ScrollView>
    </View>
  );
};

export default HorizontalTimeline;
