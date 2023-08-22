/**
 * Module that helps to define
 * functions that helps in
 * manging different screens sizes
 * and pixels.
 */
import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: CURRENT_WIDTH} = Dimensions.get('window');

const STANDARD_WIDTH = 380;

const ratioOfMobileScreenByStandardScreen = CURRENT_WIDTH / STANDARD_WIDTH;

/**
 * Works best in case -
 * want to give padding/margins horizontally.
 * Although works for vertical spacing as well -
 * but for Android devices, spacing gets huge as compared to iOS devices.
 * So for giving vertically spacing, use below function dynamicSizeByOs.
 */
export const dynamicSize = (size) => {
  return size * ratioOfMobileScreenByStandardScreen;
};

/**
 * When giving margins/padding vertically -
 * in Android devices, it wierdly show more height/spacing compared with iOS devices.
 * To fix that, we try to give spacing by the below function -
 * that reduces incoming height for Android.
 */
export const dynamicSizeByOs = (size) => {
  const newSize = Platform.OS === 'ios' ? size : size - 20;
  return dynamicSize(newSize);
};

/**
 * Get font size based upon the screen size
 */
export const dynamicFontSize = (size) => {
  const newSize = size * ratioOfMobileScreenByStandardScreen;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
