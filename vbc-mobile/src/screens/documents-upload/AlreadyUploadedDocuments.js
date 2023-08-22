/**
 * Already uploaded document component
 */
import React from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppText, Button, ExpandableItem, Container} from 'components';
import {financialInformationIcon} from 'assets/icons';
import {Theme} from 'constants';
import {getFormattedDate} from 'utils';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const AlreadyUploadedDocuments = ({
  uploadedDocuments,
  onDeletePress,
  onDownloadPress,
  title,
  fetchUploadedDocuments,
}) => {
  const {t} = useTranslation(['documents', 'validationMessages']);
  const {navigate} = useNavigation();

  /**
   * when user presses delete button -
   * we call parent function to delete
   */
  const handlePressDelete = (documentId) => () => {
    onDeletePress(documentId);
  };

  /**
   * when user presses download button -
   * we call parent functiont to let
   * download document
   */
  const handlePressDownload = (documentId, documentFormat) => () => {
    onDownloadPress(documentId, documentFormat);
  };

  const handlePressReupload = () => {
    navigate('DocumentsUpload', {
      selectedDocument: 'FINANCIAL',
      refreshData: fetchUploadedDocuments,
      selectedUploadingDocumentType: 'Cancelled Cheque',
    });
  };

  return (
    <Container style={styles.viewStyle}>
      <View style={styles.heading}>
        <Image source={financialInformationIcon} resizeMode={'contain'} />
        <AppText style={styles.financialDocumentText}>
          {title || t('uploadedDocuments')}
        </AppText>
      </View>

      {uploadedDocuments &&
        uploadedDocuments.map((item) => {
          const documentName = item.documentName || '-';
          const documentTypeName = item.documentTypeName || '-';
          const documentFormat = documentName
            .substring(documentName.lastIndexOf('.') + 1, documentName.length)
            .toUpperCase();
          const dateOfUpload = getFormattedDate(item?.uploadDate) || '-';
          return (
            <View style={styles.expandableItemContainer} key={item.id}>
              <ExpandableItem
                heading={
                  documentTypeName ? documentTypeName : t('documentType')
                }
                headingBgColor={Theme.blueGreen}>
                <View style={styles.expandableItemChildContainer}>
                  <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>{t('fileName')}:</AppText>
                    <AppText style={styles.details}>{documentName}</AppText>
                  </View>
                  <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>{t('fileType')}:</AppText>
                    <AppText style={styles.details}>{documentTypeName}</AppText>
                  </View>
                  <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>{t('format')}:</AppText>
                    <AppText style={styles.details}>{documentFormat}</AppText>
                  </View>
                  <View style={styles.detailsContainer}>
                    <AppText style={styles.details}>
                      {t('dateOfUpload')}:
                    </AppText>
                    <AppText style={styles.details}>{dateOfUpload}</AppText>
                  </View>

                  <View style={styles.documentListContainer}>
                    {onDeletePress &&
                      documentTypeName !== 'Cancelled Cheque' && (
                        <Button
                          style={styles.expandableChildrenButtonContainer}
                          onPressEvent={handlePressDelete(item.id)}
                          label={t('delete')}
                          labelStyle={styles.expandableChildrenButton}
                        />
                      )}

                    {documentTypeName === 'Cancelled Cheque' && (
                      <Button
                        style={styles.expandableChildrenButtonContainer}
                        onPressEvent={handlePressReupload}
                        label={t('reupload')}
                        labelStyle={styles.expandableChildrenButton}
                      />
                    )}
                    <Button
                      style={styles.expandableChildrenButtonContainerDelete}
                      onPressEvent={handlePressDownload(
                        item.id,
                        documentFormat
                      )}
                      label={t('download')}
                      labelStyle={styles.expandableChildrenButton}
                    />
                  </View>
                </View>
              </ExpandableItem>
            </View>
          );
        })}
    </Container>
  );
};

export default AlreadyUploadedDocuments;
