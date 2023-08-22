/**
 * Component that is shown when user does not have data to be shown-
 */
import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {Container, AppText, Button} from 'components';
import styles from './styles';

const NoData = (props) => {
  const {title, showCompleteApplicationButton} = props;
  const {navigate} = useNavigation();
  const {t} = useTranslation([
    'documents',
    'loanApplication',
    'validationMessages',
  ]);

  /** to navigate the user to ApplicantOverview screen */
  const handleCompleteApplicationPress = () => {
    navigate('Overview', {screen: 'ApplicantOverview'});
  };

  return (
    <View style={styles.container}>
      <Container style={styles.containerContainer} isBackgroundPlain={true}>
        <AppText style={styles.note}>{title}</AppText>
      </Container>
      {showCompleteApplicationButton && (
        <Button
          style={styles.buttonContainer}
          onPressEvent={handleCompleteApplicationPress}
          label={t('completeApplication')}
        />
      )}
    </View>
  );
};

export default NoData;
