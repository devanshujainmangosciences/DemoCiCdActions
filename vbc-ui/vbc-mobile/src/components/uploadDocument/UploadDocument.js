/**
 * Upload Document Component
 */
import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Container, AppText, Button, TextInput} from 'components';
import styles from './styles';

const UploadDocument = ({
  selectFile,
  handleChangeText,
  selectFileError,
  handleUploadFile,
  uploadLoading,
  downloadLoading,
  placeholder,
  allowDownload,
  handleDownloadPress,
  handlePressReupload,
  reuploadDisabled,
  required,
}) => {
  const {t} = useTranslation(['loanApplication']);

  return (
    <View>
      <TextInput
        required={required}
        inputType={'filePicker'}
        value={selectFile?.name}
        placeholder={placeholder}
        style={styles.textInputContainer}
        onChangeText={handleChangeText('selectFile', 'filePicker')}
        errorMessage={selectFileError}
      />
      <AppText style={styles.uploadNote}>{t('uploadNote')}</AppText>
      {!allowDownload && (
        <View style={{alignItems: 'center'}}>
          <Button
            style={styles.buttonContainer}
            onPressEvent={handleUploadFile}
            label={t('upload')}
            isLoading={uploadLoading}
          />
        </View>
      )}

      {allowDownload && (
        <>
          {/* <AppText style={styles.fileNameTitle}>{'*Blank Cheque'}</AppText>
          <AppText style={styles.fileNameText}>
            {'ICICICHEQUE42252.jpg'}
          </AppText> */}
          <View style={styles.horizontalButtonContainer}>
            <Button
              style={styles.buttonReupload}
              onPressEvent={handlePressReupload}
              label={t('reupload')}
              isLoading={uploadLoading}
              disabled={reuploadDisabled}
            />
            <Button
              style={styles.buttonDownload}
              onPressEvent={handleDownloadPress}
              label={t('download')}
              isLoading={downloadLoading}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default UploadDocument;
