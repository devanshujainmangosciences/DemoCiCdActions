/**
 * Module that helps to define component for
 * drug document modal box.
 * It helps the user for
 * uploading a file.
 */
import React from 'react';
import {Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, AppText, TextInput} from 'components';
import styles from './styles';

const DrugDocumentUploadModal = ({
  isVisible,
  toggleConfirmationModal,
  fileUploadLoading,
  onPressConfirmDocumentUpload,
  handleFilePicker,
  selectFile,
}) => {
  const {t} = useTranslation(['drugSchedule']);

  // handle on change text for select file input
  const handleChangeText = (type, inputType) => () => {
    if (inputType === 'filePicker') {
      handleFilePicker();
      return;
    }
  };

  return (
    <View>
      <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.content}>
          <Pressable
            style={[styles.closeCircle]}
            onPress={toggleConfirmationModal}>
            <Icon name="close" as={AntDesign} color="white" />
          </Pressable>
          <View style={styles.contentContainer}>
            <AppText style={styles.accountText}>{t('uploadReceipt')}</AppText>
            <View>
              <TextInput
                required={true}
                inputType={'filePicker'}
                value={selectFile?.name}
                placeholder={t('selectFile')}
                style={styles.textInputContainer}
                onChangeText={handleChangeText('selectFile', 'filePicker')}
              />
              <AppText style={styles.note}>{t('uploadNote')}</AppText>
              <View style={styles.buttonContainer}>
                <Button
                  disabled={fileUploadLoading}
                  style={styles.buttonCancel}
                  onPressEvent={toggleConfirmationModal}
                  label={t('cancel')}
                />
                <Button
                  disabled={!selectFile || fileUploadLoading}
                  style={styles.button}
                  onPressEvent={onPressConfirmDocumentUpload}
                  label={t('upload')}
                  isLoading={fileUploadLoading}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DrugDocumentUploadModal;
