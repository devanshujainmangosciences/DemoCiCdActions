/**
 * React Native's TextInput component has been
 * replaced with this custom TextInput component
 * for our application.
 * Helps in managing -
 * - textinput fields
 * - dropdown fields
 * - date/time picker fields
 */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput as ReactTextInput,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {AppText} from '../appText';
import {dynamicSize} from 'utils';
import {Theme} from 'constants';
import {Loader} from '../loader';
import styles from './styles';

const TextInput = (props) => {
  const {navigate} = useNavigation();
  const {selectedValue} = useSelector((state) => state.dropdown);
  /**
   * Whether to shift placeholder to top
   */
  const [animatePlaceholder, setAnimatePlaceholder] = useState(false);
  /**
   * if the text input field is in focussed
   */
  const [isFocussed, setIsFocussed] = useState(false);
  /**
   * store user input text value
   */
  const [input, setInput] = useState(null);
  // const [selectedDropdownType, setSelectedDropdownType] = useState('');
  const {
    placeholder,
    onChangeText, // callback function - that sends user's input value
    errorMessage, // error message that needs to be shown below text-input/dropdown fields
    rightInputIcon, // icon that is shown at the righter side of input - ex: dropdown icon/calendar icon
    dropdownItems, // items to be shown at dropdown
    isOtherOptionAvailable, // whether to show other options text input inside dropdown screen
    loading, // whether the text-input/dropdown is loading
    value, // text-input/dropdown user selected value
    dropdownValue, // user selected dropdown value - id
    disabled, // whether the textinput/dropdown is disabled or not
    inputType, // input type = dropdown/calendar. Default is text-input
    validationFunction, // function to validation user's input value
    validationErrorMessage, // error message to show for wrong validation user's input value
    required, // whether the field is required or not
    keyboardType,
    style,
    ...additionalProps
  } = props;

  /**
   * if we have value for text input field -
   * move placeholder to top
   * otherwise not
   */
  useEffect(() => {
    setAnimatePlaceholder(value || value === 0 ? true : false);
  }, [value]);

  /* 
  Handling selection method when user selects
  the value from our dropdown screen. 
  Whenever user is selecting a value from dropdown items - 
  then user's selected value is being saved in redux state. 
  That selected value is used here from redux state.
  */
  useEffect(() => {
    if (selectedValue && selectedValue.textInputName === placeholder) {
      if (inputType === 'dropdown') {
        handleSelection(selectedValue);
      } else if (inputType === 'calendar') {
        const {date} = selectedValue || new Date();
        handleSelection(date);
      }
    }
  }, [selectedValue]);

  /**
   * callback function -
   * that gets called when user selects any value
   * from dropdown/or date-picker.
   * We send the selected value back to its parent.
   */
  const handleSelection = (item) => {
    setAnimatePlaceholder(true);
    if (validationFunction) {
      const inputValidity = validationFunction(item);
      if (!inputValidity) {
        onChangeText?.(item, validationErrorMessage);
        return;
      }
    }
    onChangeText?.(item);
  };

  /**
   * callback function -
   * that is called when text input is in foccused
   * or blurred.
   * Handles focus & placeholder animation
   */
  const handleAnimation = (type) => () => {
    if (type === 'focus') {
      setIsFocussed(true);
      setAnimatePlaceholder(true);
    } else {
      setIsFocussed(false);
      !input && !value && setAnimatePlaceholder(false);
    }
  };

  /**
   * when text is entered by user
   * in text-input field.
   */
  const handleChangeText = (text) => {
    /**
     * if validation function is present -
     * check with the function.
     * If it fails, send the error message to its parent
     * with the text input value
     */
    if (validationFunction) {
      const inputValidity = validationFunction(text);
      if (!inputValidity) {
        setInput(text);
        onChangeText?.(text, validationErrorMessage);
        return;
      }
    }
    setInput(text);
    onChangeText?.(text);
  };

  /**
   * in case of dropdown fields -
   * instead of opening keyboard -
   * we need to open dropdown items modal.
   */
  const handleInputPress = (placeholder) => () => {
    if (!disabled) {
      if (dropdownItems && inputType === 'dropdown') {
        navigate('ModalNavigator', {
          screen: 'SingleSelectDropdown',
          params: {
            headerTitle: placeholder,
            dropdownItems,
            selectedValue: value,
            textInputName: placeholder,
            isOtherOptionAvailable,
          },
        });
      } else if (inputType === 'calendar') {
        navigate('ModalNavigator', {
          screen: 'DateTimePicker',
          params: {
            headerTitle: placeholder,
            selectedValue: value,
            textInputName: placeholder,
          },
        });
      }
    }
  };

  return (
    <View>
      <View
        style={[
          styles.inputContainer,
          style,
          isFocussed && {
            borderColor: Theme.currentStatusColor,
          },
          errorMessage && {
            borderColor: Theme.error,
          },
          disabled && {backgroundColor: Theme.disabled},
        ]}>
        <AppText
          style={[
            styles.placeholder,
            {
              backgroundColor:
                disabled && !animatePlaceholder ? Theme.disabled : Theme.snow,
              top: animatePlaceholder ? dynamicSize(-7) : dynamicSize(13),
              fontSize: animatePlaceholder ? dynamicSize(12) : dynamicSize(15),
              color: errorMessage
                ? isFocussed
                  ? Theme.error
                  : Theme.error
                : isFocussed
                ? Theme.currentStatusColor
                : Theme.lightTextColor,
              paddingHorizontal: 2,
            },
            // disabled && {backgroundColor: Theme.disabled},
          ]}>
          {placeholder} {required && '*'}
        </AppText>

        {inputType === 'calendar' || inputType === 'dropdown' ? (
          <Pressable
            onPress={handleInputPress(placeholder)}
            style={styles.input}>
            <AppText style={styles.dropdownSelectedText}>
              {dropdownValue}
            </AppText>
          </Pressable>
        ) : inputType === 'filePicker' ? (
          <View style={styles.filePickerInput}>
            <AppText style={styles.dropdownSelectedText}>{value}</AppText>
            <Pressable style={styles.browseButton} onPress={onChangeText}>
              <AppText style={styles.browseText}>{'Browse'}</AppText>
            </Pressable>
          </View>
        ) : (
          <ReactTextInput
            editable={!disabled}
            value={value}
            onFocus={handleAnimation('focus')}
            onBlur={handleAnimation('blur')}
            onChangeText={handleChangeText}
            style={[styles.textInput]}
            keyboardType={keyboardType}
            autoCorrect={false}
            {...additionalProps}
          />
        )}
        <View style={styles.icon}>
          {loading && !errorMessage && !disabled && <Loader />}
          {rightInputIcon && (!loading || disabled) && !errorMessage && (
            <Image
              source={rightInputIcon}
              resizeMode={'contain'}
              style={styles.rightInputIcon}
            />
          )}
          {errorMessage && inputType !== 'filePicker' && (
            <Icon
              as={MaterialIcons}
              name="error-outline"
              style={styles.errorIcon}
            />
          )}
        </View>
      </View>

      <View style={styles.errorContainer}>
        <AppText style={styles.errorMessage}>{errorMessage}</AppText>
      </View>
    </View>
  );
};

export default TextInput;
