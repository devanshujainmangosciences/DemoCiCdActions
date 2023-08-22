/**
 * React native text component has been replaced with
 * our custom AppText component.
 */
import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const AppText = ({style, children, ...additionalProps}) => {
  return (
    <Text
      style={[styles.text, style]}
      allowFontScaling={false}
      {...additionalProps}>
      {children}
    </Text>
  );
};

export default AppText;
