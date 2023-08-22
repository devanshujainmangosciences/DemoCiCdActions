/**
 * Module that helps to define component for
 * Confirmation box.
 * It helps to confirm the user for
 * an action.
 */
import React from 'react';
import {BackHandler, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import RNExitApp from 'react-native-exit-app';
import * as Progress from 'react-native-progress';
import {Button, AppText} from 'components';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Theme from 'constants/Theme';
import styles from './styles';

const ConfirmationModal = ({
  isVisible,
  onConfirmedConfirmationModal,
  onCancelConfirmationModal,
  title,
  hideCloseButton,
  loader,
  showProgress,
  progress,
  progressPercent,
  sizeText,
  enableQuitButton,
}) => {
  const {t} = useTranslation(['confirmationModal']);

  /** handle press of Confirm button.
   * Toggling the confirmation modal
   * by context method.
   */
  const handlePressConfirm = () => {
    onConfirmedConfirmationModal();
  };

  // quits app
  const handlePressQuitApp = () => {
    RNExitApp.exitApp();
  };

  /** handle press of Close button. */
  const handlePressClose = () => {
    onCancelConfirmationModal();
  };

  return (
    <View>
      <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.content}>
          {!hideCloseButton && (
            <Pressable style={[styles.closeCircle]} onPress={handlePressClose}>
              <Icon as={AntDesign} name="close" color="white" />
            </Pressable>
          )}

          <View style={styles.contentContainer}>
            <AppText style={styles.accountText}>{title}</AppText>
            {showProgress ? (
              <View style={styles.progressView}>
                <Progress.Bar
                  progress={progress}
                  width={300}
                  color={Theme.primary}
                />
                <View style={styles.progressContent}>
                  <AppText style={styles.progressText}>
                    {progressPercent + '%'}
                  </AppText>
                  <AppText style={styles.progressText}>{sizeText}</AppText>
                </View>
              </View>
            ) : (
              <View style={styles.buttonsView}>
                {enableQuitButton && (
                  <Button
                    style={styles.buttonContainer}
                    onPressEvent={handlePressQuitApp}
                    label={t('quit')}
                  />
                )}
                <Button
                  style={styles.buttonContainer}
                  onPressEvent={handlePressConfirm}
                  label={t('confirm')}
                  isLoading={loader}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationModal;
