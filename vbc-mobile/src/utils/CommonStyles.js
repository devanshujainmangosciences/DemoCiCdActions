/**
 * Common styles
 * used in entire application
 */
import {dynamicFontSize} from './Resize';

export const fontFamily = {
  regular: 'Roboto-Regular',
  light: 'Roboto-Light',
  medium: 'Roboto-Medium',
};

export const fontSizes = {
  mini: dynamicFontSize(12),
  xsmall: dynamicFontSize(13),
  small: dynamicFontSize(15),
  medium: dynamicFontSize(17),
  large: dynamicFontSize(20),
  xlarge: dynamicFontSize(24),
};
