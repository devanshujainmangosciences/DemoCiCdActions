/**
 * Drug Schedule Expandable item component
 */
import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {ExpandableItem, AppText, Container, Button} from 'components';
import {Theme, VBCProgramPaymentFramework} from 'constants';
import {getFormattedDateInSlashFormat} from 'utils';
import styles from './styles';
import {PAYMENT_FRAMEWORK_VALUE} from '../../constants';

const DrugScheduleItem = ({toggleConfirmationModal}) => {
  const {t} = useTranslation(['drugSchedule']);
  const globalState = useSelector((state) => state.login);
  const {userPermissions} = globalState;
  const treatmentTerminated = userPermissions?.data?.flags?.treatmentTerminated;

  const {vbcProgramDrugScheduleData: drugScheduleData, vbcProgramStep1} =
    useSelector((state) => state.vbcProgram);

  // handles press on upload button
  const handleUploadPress = (id) => {
    toggleConfirmationModal(id);
  };

  // checks if user can upload drug receipt or not
  const checkIfDisabled = (index, items) => {
    if (treatmentTerminated) return true;
    if (index === 0) return false;
    const recievedItems = [...items];
    const prevItem = recievedItems[index - 1];
    if (prevItem?.drugReceiptId) return false;
    else return true;
  };

  const {content} = drugScheduleData || {};
  return drugScheduleData?.content && drugScheduleData?.content?.length > 0 ? (
    <Container style={styles.containerAddedApplicants} isBackgroundPlain>
      {content
        ?.sort((a, b) => a.id - b.id)
        .map((item, index, items) => {
          if (item) {
            return (
              <View key={index} style={styles.expandableItemContainer}>
                <ExpandableItem
                  heading={t('cycle') + ' ' + item.cycleNo}
                  headingBgColor={Theme.blueGreen}>
                  <View style={styles.expandableItemChildContainer}>
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.details}>
                        {t('paymentTypeOpted')}:
                      </AppText>
                      <AppText style={styles.detailsText}>
                        {`${
                          PAYMENT_FRAMEWORK_VALUE[item.paymentTypeOpted] || ''
                        } `}
                      </AppText>
                    </View>
                    {vbcProgramStep1 !== VBCProgramPaymentFramework.SELF_PAY &&
                      !drugScheduleData?.payGrantToLender && (
                        <View style={styles.detailsContainer}>
                          <AppText style={styles.details}>
                            {t('mangoGrant')}:
                          </AppText>
                          <AppText style={styles.detailsText}>
                            {`₹ ${item.mangoGrantAmount || ''} `}
                          </AppText>
                        </View>
                      )}
                    {vbcProgramStep1 !== VBCProgramPaymentFramework.SELF_PAY &&
                      !drugScheduleData?.payGrantToLender && (
                        <View style={styles.detailsContainer}>
                          <AppText style={styles.details}>
                            {t('grantTransferDate')}:
                          </AppText>
                          <AppText style={styles.detailsText}>
                            {`${
                              getFormattedDateInSlashFormat(
                                item.mangoGrantDate
                              ) || ''
                            } `}
                          </AppText>
                        </View>
                      )}
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.details}>
                        {t('receiptOfDrugPurchase')}:
                      </AppText>
                      {item.drugReceiptUploadDate ? (
                        <AppText style={styles.detailsText}>
                          {`${t('uploadedOn')} ${
                            getFormattedDateInSlashFormat(
                              item.drugReceiptUploadDate
                            ) || ''
                          }`}
                        </AppText>
                      ) : (
                        <AppText style={styles.detailsText}>
                          {`${t('na')}`}
                        </AppText>
                      )}
                    </View>
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.details}>
                        {t('receiptOfDrugPurchase')}:
                      </AppText>
                      {item.drugReceiptUploadDate ? (
                        <View style={styles.buttonView}>
                          <Button
                            disabled={checkIfDisabled(index, items)}
                            style={
                              checkIfDisabled(index, items)
                                ? styles.expandableChildrenButtonContainerDeleteDisabled
                                : styles.expandableChildrenButtonContainerDelete
                            }
                            onPressEvent={() => handleUploadPress(item.cycleNo)}
                            label={t('reUpload')}
                            labelStyle={styles.expandableChildrenButton}
                          />
                        </View>
                      ) : (
                        <View style={styles.buttonView}>
                          <Button
                            disabled={checkIfDisabled(index, items)}
                            style={
                              checkIfDisabled(index, items)
                                ? styles.expandableChildrenButtonContainerDeleteDisabled
                                : styles.expandableChildrenButtonContainerDelete
                            }
                            onPressEvent={() => handleUploadPress(item.cycleNo)}
                            label={t('upload')}
                            labelStyle={styles.expandableChildrenButton}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.details}>
                        {t('costIncurredByPatient')}:
                      </AppText>
                      <AppText style={styles.detailsText}>
                        {`${
                          item.costIncurredByPatient
                            ? '₹ ' + item.costIncurredByPatient
                            : t('na')
                        } `}
                      </AppText>
                    </View>
                    <View style={styles.detailsContainer}>
                      <AppText style={styles.details}>
                        {t('paidCycle')}:
                      </AppText>
                      <AppText style={styles.detailsText}>
                        {`${item.paidCycle ? t('paid') : t('free')} `}
                      </AppText>
                    </View>
                  </View>
                </ExpandableItem>
              </View>
            );
          }
        })}
    </Container>
  ) : null;
};

export default DrugScheduleItem;
