/**
 * Settings screen
 */
import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {AppText, Container} from 'components';
import {changeLanguage, changePassword} from 'assets/icons';
import styles from './styles';

const Settings = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation(['settings']);

  /**
   * When a container item is pressed
   */
  const handlePress = (type) => () => {
    switch (type) {
      case 'changePassword': {
        navigate('ChangePassword');
        return;
      }
      case 'changeLanguage': {
        navigate('ChangeLanguage');
        return;
      }
      case 'verify': {
        navigate('Verify');
        return;
      }
      default: {
        return;
      }
    }
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}>
      <Container
        style={styles.container}
        onPressEvent={handlePress('changePassword')}>
        <View style={styles.containerInner}>
          <Image
            source={changePassword}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>
            {t('changePassword')}
          </AppText>
        </View>
      </Container>
      {/* <Container
        style={styles.container}
        onPressEvent={handlePress('changeLanguage')}>
        <View style={styles.containerInner}>
          <Image
            source={changeLanguage}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>
            {t('changeLanguage')}
          </AppText>
        </View>
      </Container> */}

      <Container style={styles.container} onPressEvent={handlePress('verify')}>
        <View style={styles.containerInner}>
          <Image
            source={changeLanguage}
            style={styles.image}
            resizeMode={'contain'}
          />
          <AppText style={styles.containerItemText}>{t('verify')}</AppText>
        </View>
      </Container>
    </ScrollView>
  );
};

export default Settings;
