/**
 * Applicant listing screen component
 */
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ExpandableItem, AppText, Button, Container} from 'components';
import {applicant} from 'assets/icons';
import {Theme} from 'constants';
import {viewApplicantDetailFields} from './formFields';
import styles from './styles';

const Applicant = ({
  applicantData,
  onApplicantDeletePress,
  hideDeleteButton,
  addEditButton,
  onEditButtonPress,
  title,
  onApplicantEditPress,
  enableApplicantEdit,
}) => {
  const {t} = useTranslation(['loanApplication']);
  const [applicants, setApplicants] = useState(applicantData);

  /** gets applicants data into more structured format */
  useEffect(() => {
    setApplicants(applicantData);
  }, [applicantData]);

  /**
   * when user presses on delete button on applicant listing -
   * we send the applicantId to the parent function
   * to delete it from async storage and local state
   */
  const handlePressDelete = (item) => () => {
    onApplicantDeletePress(item.id || item.applicantId);
  };

  const handlePressApplicantEdit = (item) => () => {
    onApplicantEditPress(item);
  };

  /**
   * when user presses edit button
   */
  const handlePressEdit = () => {
    onEditButtonPress && onEditButtonPress();
  };

  return applicants && applicants.length > 0 ? (
    <Container style={styles.containerAddedApplicants} isBackgroundPlain>
      <View style={styles.containerHeadingContainer}>
        <Image
          source={applicant}
          resizeMode={'center'}
          style={styles.headingIcon}
        />
        <AppText style={styles.containerHeading}>
          {title || t('applicantAdded')}
        </AppText>
        {addEditButton && (
          <Button
            onPressEvent={handlePressEdit}
            style={styles.accountDetailsContainerEditButton}
            label={t('edit')}
            labelStyle={styles.accountDetailsContainerEditButtonText}
          />
        )}
      </View>
      {applicants.map((applicant, index) => {
        const applicantNumber = Number(index) + 1;
        if (applicant) {
          return (
            <View key={index} style={styles.expandableItemContainer}>
              <ExpandableItem
                heading={t('applicant') + ' ' + applicantNumber}
                headingBgColor={Theme.blueGreen}>
                <View style={styles.expandableItemChildContainer}>
                  {viewApplicantDetailFields.map((item) => {
                    if (applicant[item.valueKey]) {
                      return (
                        <View style={styles.detailsContainer}>
                          <AppText style={styles.details}>
                            {t(item.heading)}:
                          </AppText>
                          <AppText style={styles.detailsValue}>
                            {applicant[item.valueKey] || ''}
                          </AppText>
                        </View>
                      );
                    }
                  })}
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    {onApplicantEditPress && enableApplicantEdit && (
                      <Button
                        style={styles.expandableChildrenButtonContainer}
                        onPressEvent={handlePressApplicantEdit(applicant)}
                        label={t('edit')}
                        labelStyle={styles.expandableChildrenButton}
                      />
                    )}

                    {!hideDeleteButton ? (
                      <Button
                        style={styles.expandableChildrenButtonContainer}
                        onPressEvent={handlePressDelete(applicant)}
                        label={t('delete')}
                        labelStyle={styles.expandableChildrenButton}
                      />
                    ) : (
                      <View style={styles.seperator} />
                    )}
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

export default Applicant;
