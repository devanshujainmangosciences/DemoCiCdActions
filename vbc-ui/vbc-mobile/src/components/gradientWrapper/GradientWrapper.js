/**
 * Gradient wrapper for gradient background
 */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const GradientWrapper = ({children}) => {
  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}></View>
      {children}
    </View>
  );
};

export default GradientWrapper;
