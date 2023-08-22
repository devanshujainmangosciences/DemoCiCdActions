/**
 * Splash screen
 */
import React from 'react';
import {Image, View} from 'react-native';
import {logo} from 'assets/icons';
import styles from './styles';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} resizeMode={'contain'} style={styles.logo} />
    </View>
  );
};

export default Splash;
