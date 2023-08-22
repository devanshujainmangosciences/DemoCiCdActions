/**
 * Text inputs rendered conditionally based on input type
 */
import React from 'react';
import {TextInput} from 'components';
import styles from './styles';

const ConditionalTextInput = ({
  item,
  handleChangeText,
  handleGetDisabledFields,
  handleGetDropdownItems,
  handleGetDropdownValue,
  handleShowLoaderInInput,
  value,
  errorMessage,
  placeholder,
  required,
}) => {
  if (item.inputType === 'textInput') {
    return (
      <TextInput
        required={required}
        value={value?.toString()}
        placeholder={placeholder}
        disabled={
          handleGetDisabledFields
            ? handleGetDisabledFields(item.valueKey)
            : null
        }
        style={styles.textInputContainer}
        onChangeText={handleChangeText(item.valueKey)}
        validationFunction={item.validationFunction}
        validationErrorMessage={item.validationErrorMessage}
        errorMessage={errorMessage}
        keyboardType={item.keyboardType}
        maxLength={item.maxLength}
      />
    );
  } else if (item.inputType === 'dropdown') {
    return (
      <TextInput
        required={required}
        inputType={'dropdown'}
        loading={
          handleShowLoaderInInput
            ? handleShowLoaderInInput(item.valueKey)
            : false
        }
        disabled={
          handleGetDisabledFields
            ? handleGetDisabledFields(item.valueKey)
            : null
        }
        value={value}
        rightInputIcon={item.rightInputIcon}
        dropdownItems={handleGetDropdownItems(item.valueKey)}
        dropdownValue={handleGetDropdownValue(item)}
        placeholder={placeholder}
        style={styles.textInputContainer}
        onChangeText={handleChangeText(
          item.onChangeTextKey ? item.onChangeTextKey : item.valueKey,
          'dropdown'
        )}
        validationFunction={item.validationFunction}
        validationErrorMessage={item.validationErrorMessage}
        errorMessage={errorMessage}
        isOtherOptionAvailable={item.isOtherOptionAvailable}
      />
    );
  } else if (item.inputType === 'calendar') {
    return (
      <TextInput
        required={required}
        inputType={'calendar'}
        value={value}
        dropdownValue={handleGetDropdownValue(item)}
        rightInputIcon={item.rightInputIcon}
        placeholder={placeholder}
        style={styles.textInputContainer}
        onChangeText={handleChangeText(
          item.onChangeTextKey ? item.onChangeTextKey : item.valueKey,
          'calendar'
        )}
        validationFunction={item.validationFunction}
        validationErrorMessage={item.validationErrorMessage}
        errorMessage={errorMessage}
      />
    );
  }
};

export default ConditionalTextInput;
