import React from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AppText} from '../appText';
import styles from './styles';
import {Theme} from '../../constants';

const RadioButton = ({
  options,
  selectedOptionId,
  getSelectedOption,
  errorMessage,
}) => {
  /** when user selects any radio option
   * send the selected value to its parent
   */
  const handlePressRadioOption = (selectedRadioOption) => () => {
    getSelectedOption(selectedRadioOption);
  };

  return (
    <View>
      {options.map((item, index) => {
        const {label, id} = item;
        const isSelected = selectedOptionId === id;
        return (
          <Pressable
            key={index}
            style={styles.optionsItemContainer}
            onPress={handlePressRadioOption(item)}>
            <View style={styles.iconContainer}>
              <Icon
                name={isSelected ? 'radio-btn-active' : 'radio-btn-passive'}
                as={Fontisto}
                color={Theme.primary}
                style={styles.icon}
              />
            </View>
            <View style={{flex: 0.8}}>
              <AppText style={styles.optionText}>{label}</AppText>
            </View>
          </Pressable>
        );
      })}
      <AppText style={styles.errorMessage}>{errorMessage}</AppText>
    </View>
  );
};

export default RadioButton;
