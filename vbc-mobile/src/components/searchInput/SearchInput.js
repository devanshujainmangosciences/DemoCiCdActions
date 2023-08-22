/**
 * Component that is shown when user does not have data to be shown-
 */
import React from 'react';
import {View, Image, TextInput} from 'react-native';
import {help} from 'assets/icons';
import {Theme} from 'constants';
import styles from './styles';

const SearchInput = ({handleOnChangeText}) => {
  return (
    <View style={styles.SectionStyle}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Search"
        underlineColorAndroid="transparent"
        placeholderTextColor={Theme.lightTextColor}
        onChangeText={handleOnChangeText}
      />
      <View style={styles.iconView}>
        <Image source={help} style={styles.ImageStyle} />
      </View>
    </View>
  );
};

export default SearchInput;
