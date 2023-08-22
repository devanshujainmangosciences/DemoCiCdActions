/**
 * Dropdown modal screen.
 */
import React, {useEffect, useState} from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText, TextInput} from 'components';
import {setDropdownSelectedValue} from 'actions';
import {dynamicSize} from 'utils';
import styles from './styles';

const SingleSelectDropdown = ({navigation: {goBack}, route: {params}}) => {
  const {dropdownItems, selectedValue, textInputName, isOtherOptionAvailable} =
    params;
  const dispatch = useDispatch();
  /** text input value if user wants to put out new value in place of dropdown items*/
  const [otherOptionsValue, setOtherOptionsValue] = useState();
  /** whether to show selected icon besides dropdown items */
  const [
    disableDropdownItemSelectionIcon,
    setDisableDropdownItemSelectionIcon,
  ] = useState(false);

  /** if value is coming from parent component -
   * we find that value in dropdown items -
   * if that value is not present in dropdown items,
   * that means this value is of other options text input.
   */
  useEffect(() => {
    if (selectedValue) {
      const isOtherOption =
        dropdownItems.filter((item) => item.name === selectedValue).length ===
        0;
      if (isOtherOption) {
        setOtherOptionsValue(selectedValue);
      }
    }
  }, [selectedValue]);

  /** dropdown row render item*/
  const renderItem = ({item, index}) => {
    const {name, id, value} = item;

    /**
     * when user selects any item -
     * send selected item to its parent
     * and close the dropdown modal
     */
    const handlePressItem = () => {
      // to store user's selected value in redux state
      dispatch(setDropdownSelectedValue({name, id, value, textInputName}));
      // params?.getUserSelectedDropdownValue({name, id, value});
      goBack();
    };

    const icon =
      !disableDropdownItemSelectionIcon &&
      (selectedValue == name || selectedValue == id)
        ? 'radiobox-marked'
        : 'radiobox-blank';
    return (
      <Pressable
        key={index}
        style={styles.itemRowContainer}
        onPress={handlePressItem}>
        <AppText style={styles.itemText}>{name}</AppText>
        <Icon
          as={MaterialCommunityIcons}
          name={icon}
          size={30}
          style={styles.icon}
        />
      </Pressable>
    );
  };

  /** dropdown other items text input callback */
  const handleChangeText = (text) => {
    setDisableDropdownItemSelectionIcon(true);
    /** storing the text in local state */
    setOtherOptionsValue(text);
    // to store user's selected value in redux state
    dispatch(
      setDropdownSelectedValue({
        name: text,
        id: text,
        value: text,
        textInputName,
      })
    );
  };

  /** footer component
   * Other options text input
   */
  const renderFooterComponent = () => {
    return (
      <View style={styles.otherOptionsContainer}>
        <TextInput
          value={otherOptionsValue}
          onChangeText={(text) => handleChangeText(text)}
          style={[styles.textInput]}
          placeholder={'Other option'}
        />
      </View>
    );
  };

  /**
   * dropdown item seperator
   */
  const itemSeperatorComponent = () => {
    return <View style={styles.itemSeperator} />;
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={dynamicSize(150)}
      style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index}
        data={dropdownItems}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeperatorComponent}
        ListFooterComponent={
          isOtherOptionAvailable ? renderFooterComponent() : null
        }
      />
    </KeyboardAwareScrollView>
  );
};

export default SingleSelectDropdown;
