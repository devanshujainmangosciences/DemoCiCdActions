/**
 * Component that mimics the design of -
 * container with shadow present mainly at
 * bottom, bottom right and bottom left.
 * Acts as an container that wraps
 * the passed children.
 */
import React from 'react';
import {Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from 'constants';
import styles from './styles';

const Container = ({
  style,
  onPressEvent,
  children,
  isBackgroundPlain,
  customBackgroundColor,
}) => {
  const {height: innerContainerHeight, ...innerContainerStyle} = style;
  return (
    <LinearGradient
      colors={
        customBackgroundColor
          ? [customBackgroundColor, customBackgroundColor]
          : Theme.doubleContainerEffect
      }
      locations={[0.3, 1]}
      style={[styles.container, {...innerContainerStyle}]}>
      <Pressable
        onPress={onPressEvent || null}
        style={[
          styles.secondContainer,
          customBackgroundColor && {backgroundColor: customBackgroundColor},
          onPressEvent && {height: innerContainerHeight},
          isBackgroundPlain && {backgroundColor: Theme.snow},
        ]}>
        {children}
      </Pressable>
    </LinearGradient>
  );
};

export default Container;
