/**
 * Change Language screen
 */
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AppText, Container, Button, TextInput} from 'components';
import {downArrorIcon, changeLanguage} from 'assets/icons';
import {i18nLanguages} from '../../../../i18n/resources';
import {getFromAsyncStorage, storeInAsyncStorage} from 'utils';
import {AsyncStorageKeys} from 'constants';
import styles from './styles';

const ChangeLanguage = () => {
  const {navigate} = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLanguageName, setSelectedLanguageName] = useState('English');
  const {t} = useTranslation(['settings']);
  const {i18n} = useTranslation(['settings']);

  // formatting data according to dropdown format
  const languages = i18nLanguages.map((item) => {
    return {
      id: item.value,
      value: item.value,
      name: item.name,
    };
  });

  // get app language from aasync storage which we saved after changing the language
  const fetchAppLanguage = async () => {
    const appLanguage = await getFromAsyncStorage(
      AsyncStorageKeys.APP_LANGUAGE
    );
    setSelectedLanguage(appLanguage);
    setSelectedLanguageName(
      appLanguage === 'en' ? 'English' : appLanguage === 'fr' ? 'French' : ''
    );
  };

  useEffect(() => {
    fetchAppLanguage();
  }, []);

  /**
   * to get user input text/dropdown-items values
   */
  const handleChangeText = () => (value) => {
    setSelectedLanguage(value?.id);
    setSelectedLanguageName(value.name);
  };

  // handle user selection on language change, navigate to settings after that
  const handleCancelChangeLanguage = () => {
    navigate('Settings');
  };

  // save new selected language to Async storage and also call i18 with that
  const handleSaveNewLanguage = async () => {
    await storeInAsyncStorage(AsyncStorageKeys.APP_LANGUAGE, selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    navigate('Settings');
  };

  return (
    <View style={styles.view}>
      <Container style={styles.container}>
        <View style={styles.containerInner}>
          <Image
            source={changeLanguage}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>
            {t('accountLanguage')}
          </AppText>
        </View>
        <TextInput
          required={true}
          inputType={'dropdown'}
          value={selectedLanguage}
          dropdownValue={selectedLanguageName}
          rightInputIcon={downArrorIcon}
          dropdownItems={languages}
          placeholder={t('language')}
          style={styles.textInputContainer}
          onChangeText={handleChangeText('language', 'dropdown')}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPressEvent={handleCancelChangeLanguage}
            style={styles.cancelButton}
            label={t('cancel')}
          />

          <Button
            onPressEvent={handleSaveNewLanguage}
            style={styles.saveButton}
            label={t('save')}
          />
        </View>
      </Container>
    </View>
  );
};

export default ChangeLanguage;
