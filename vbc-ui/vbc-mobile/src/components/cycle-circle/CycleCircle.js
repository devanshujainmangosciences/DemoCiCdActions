/**
 * Component to render
 * horizontal timeline present in
 * clinical homescreen
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Theme} from 'constants';
import {AppText} from '../appText';
import styles from './styles';

const CycleCircle = (props) => {
  /** stores timeline items data that is rendered */
  const [timeline, setTimeline] = useState([]);
  const {totalCycleCount, presentCycleCount} = props;

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
    let filledTextColor;
    while (i < totalCycleCount) {
      filledCircleColor = {
        backgroundColor: i < presentCycleCount ? Theme.primary : Theme.snow,
      };
      filledTextColor = {
        color: i < presentCycleCount ? Theme.snow : Theme.lightTextColor,
      };
      i++;
      const timelineItem = (
        <View key={i} style={[styles.cycleContainer, filledCircleColor]}>
          <AppText style={[styles.cycleText, filledTextColor]}>{i}</AppText>
        </View>
      );
      renderTimeline = [...renderTimeline, timelineItem];
    }
    return renderTimeline;
  };

  /** get an array of timeline data and set in local state*/
  useEffect(() => {
    setTimeline(renderTimeline());
  }, [totalCycleCount, presentCycleCount]);

  return (
    <View style={styles.container}>
      {
        /** render local state timeline data */
        timeline.map((item) => item)
      }
    </View>
  );
};

export default CycleCircle;
