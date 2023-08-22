/**
 * Datetime picker screen
 */
import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {default as RnDateTimePicker} from '@react-native-community/datetimepicker';
import {AppText, Button} from 'components';
import {setDropdownSelectedValue} from 'actions';
import styles from './styles';

const DateTimePicker = ({navigation: {goBack}, route: {params}}) => {
  const {t} = useTranslation(['login']);
  const dispatch = useDispatch();

  const {selectedValue, textInputName} = params;
  const [showDateModal, setShowDateModal] = useState(true);

  /** to store user selected date */
  const [date, setDate] = useState(null);

  /**
   * If show date modal is false,
   * navigate the user to the back screen.
   */
  useEffect(() => {
    !showDateModal && goBack();
  }, [showDateModal]);

  /**
   * if date is changed,
   * callback function from parent is called
   * to get user selected date.
   * Also we save user selected date in local state userSelectedDate
   */
  const handleOnChange = (event, date) => {
    if (date) {
      setDate(date);
      dispatch(setDropdownSelectedValue({date, textInputName}));
    }
    if (event.type === 'set' || event.type === 'dismissed') {
      setShowDateModal(false);
    }
  };

  /**
   * for ios platform -
   * we are showing continue button explicitly
   * so once user presses that button -
   * we closes the date time picker modal
   */
  const handlePressContinue = () => {
    if (date || selectedValue) {
      setShowDateModal(false);
      return;
    }
    dispatch(setDropdownSelectedValue({date: new Date(), textInputName}));
    setShowDateModal(false);
  };

  return (
    showDateModal && (
      <View style={styles.container}>
        <RnDateTimePicker
          value={date || selectedValue || new Date()}
          maximumDate={new Date()}
          mode={'date'}
          display="spinner"
          onChange={handleOnChange}
        />
        {Platform.OS === 'ios' && (
          <Button
            style={styles.buttonContainer}
            onPressEvent={handlePressContinue}
            label={t('continue')}
          />
        )}
      </View>
    )
  );
};

export default DateTimePicker;
