/**
 * Screen component for PBP program terms & conditions page
 */
import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Icon} from 'native-base';
import {Container, AppText, Button} from 'components';
import styles from './styles';

const VbcProgramTerms = () => {
  const {navigate} = useNavigation();
  const {t} = useTranslation(['completeProfile']);
  const [isAuthorised, setIsAuthorised] = useState(false);

  const handleNavigation = () => {
    if (isAuthorised) {
      navigate('VbcProgramStep1');
    }
  };

  /**
   * when user presses terms & conditions checkbox
   */
  const handlePressTerms = () => {
    setIsAuthorised(!isAuthorised);
  };

  /** navigating to terms of use screen */
  const handlePressTermsAndConditions = () => {
    navigate('TermsOfUse');
  };

  const userConfirmationIcon = isAuthorised ? 'check-square' : 'square';
  return (
    <View style={styles.container}>
      <Container style={styles.containerContainer}>
        <AppText onPress={handlePressTermsAndConditions} style={styles.terms}>
          {t('terms&Conditions')}
        </AppText>
        <Pressable
          style={styles.confirmationContainer}
          onPress={handlePressTerms}>
          <Icon
            as={FontAwesome5}
            size="5"
            name={userConfirmationIcon}
            type="FontAwesome5"
          />
          <AppText style={styles.confirmText}>{t('vbcProgramTerms')}</AppText>
        </Pressable>
      </Container>
      <Button
        style={styles.buttonContainer}
        onPressEvent={handleNavigation}
        label={t('confirm')}
      />
      <View>
        <AppText style={styles.apiErrorText}>{null}</AppText>
      </View>
    </View>
  );
};

export default VbcProgramTerms;
