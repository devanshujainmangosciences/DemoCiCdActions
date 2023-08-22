/**
 * Custom button component -
 * in place of TouchableOpacity.
 */
import React, {useRef} from 'react';
import {Pressable, Animated, View} from 'react-native';
import {AppText, Loader} from 'components';
import styles from './styles';

const Button = ({
  style,
  onPressEvent,
  label,
  isLoading,
  disabled,
  labelStyle,
}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const animatedWidth = useRef(new Animated.Value(1)).current;

  const handleOnPress = () => {
    if (!disabled && !isLoading) {
      // Platform.OS === 'ios' && Vibration.vibrate(10, false);
      onPressEvent();
    }
  };

  // KEPT DELIBERATELY
  // const handleOnPressIn = () => {
  //   Animated.timing(animatedWidth, {
  //     toValue: 0,
  //     duration: 100,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const handleOnPressOut = () => {
  //   Animated.timing(animatedWidth, {
  //     toValue: 1,
  //     duration: 100,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const buttonWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });

  return (
    <AnimatedPressable
      style={[
        style,
        !disabled && {
          transform: [{scaleX: buttonWidth}, {scaleY: buttonWidth}],
        },
      ]}
      // onPressIn={handleOnPressIn}
      // onPressOut={handleOnPressOut}
      onPress={handleOnPress}>
      <AppText style={labelStyle ? labelStyle : styles.buttonText}>
        {label}
      </AppText>
      {isLoading && (
        <View style={styles.buttonIconContainer}>
          <Loader style={styles.buttonIcon} />
        </View>
      )}
    </AnimatedPressable>
  );
};

export default Button;
