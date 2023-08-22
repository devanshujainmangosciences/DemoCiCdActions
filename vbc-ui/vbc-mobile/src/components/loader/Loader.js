/**
 * CustomLoader component to show
 * loader.
 * MangoLogo rotating 360 degress.
 */
import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';
import {logoSymbol} from 'assets/icons';
import styles from './styles';

const Loader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  /** adding looping animation to
   * continously rotate loader
   */
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const logoRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logoSymbol}
        style={[styles.image, {transform: [{rotate: logoRotation}]}]}
      />
    </View>
  );
};

export default Loader;
