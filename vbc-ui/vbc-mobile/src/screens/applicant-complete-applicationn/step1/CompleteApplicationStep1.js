/**
 * Applicant Complete Application Step 1 screen
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {applicantCompleteApplicationStep1ApiCall} from 'apis';
import {
  occupationOptions,
  PAYMENT_FRAMEWORK_VALUE,
  VBCProgramPaymentFramework,
} from 'constants';
import {Container, AppText, Button, TextInput, RadioButton} from 'components';
import styles from './styles';
import {checkRequiredFieldsValidation} from './formatter';
import {saveApplicantLoanApplicationAction} from 'actions';

const CompleteApplicationStep1 = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {t} = useTranslation(['completeLoan', 'validationMessages']);
  const {applicantOverviewData, applicantProgramData} = useSelector(
    (state) => state.applicant
  );
  const {loginData} = useSelector((state) => state.login);
  const initialFormFields = {
    bankName: null,
    selectedOccupation: null,
    totalAmountPayable: null,
  };
  const initialFormFieldsError = {
    bankNameError: null,
    selectedOccupationError: null,
    apiError: null,
  };
  /** form fields */
  const [formFields, setFormFields] = useState(initialFormFields);
  /** error fields */
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsError
  );
  const [loading, setLoading] = useState(false);

  /** Check if our redux store contains data of field -
   * If yes, save it in our local state
   */
  useEffect(() => {
    if (applicantProgramData) {
      const {
        currentFixedDepositBank,
        totalAmountPayable,
      } = applicantProgramData;
      setFormFields({
        ...formFields,
        totalAmountPayable: totalAmountPayable,
      });
      if (currentFixedDepositBank) {
        setFormFields({
          ...formFields,
          bankName: currentFixedDepositBank,
        });
      }
    }
  }, []);

  /** text input callback */
  const handleChangeText = () => (value) => {
    setFormFieldsError({...formFieldsError, bankNameError: null});
    setFormFields({...formFields, bankName: value});
  };

  // Check for validation of data selected and save it to server for step1
  const handlePressSave = async () => {
    setLoading(true);
    setFormFieldsError({...formFieldsError, apiError: null});
    let errorObj = {};
    let isValidationError = false;
    /** getting required fields bases upon payment framework */
    const requiredFields = checkRequiredFieldsValidation(paymentTypeOpted);
    requiredFields.map((field) => {
      const fieldValue = formFields[field];
      if (!fieldValue) {
        isValidationError = true;
        errorObj = {
          ...errorObj,
          [`${field}Error`]: field === 'bankName' ?  t('validationMessages:pleaseEnter') : t('validationMessages:pleaseSelect') + t(field),
        };
      }
    });
    // show validation errors
    if (isValidationError) {
      setFormFieldsError({...formFieldsError, ...errorObj});
      setLoading(false);
      return;
    }

    const {apiResponse, apiError} = await submitStep1DetailsService();
    if (apiResponse) {
      dispatch(saveApplicantLoanApplicationAction(apiResponse.data?.data));
      navigate('ApplicantCompleteApplicationStep2', {
        selectedOccupation: formFields.selectedOccupation,
      });
    } else if (apiError) {
      setFormFieldsError({
        ...initialFormFieldsError,
        apiError:
          apiError.localizedMessage ||
          t('validationMessages:somethingWentWrong'),
      });
    }
    setLoading(false);
  };

  // call final api to save step1 data for applicant
  const submitStep1DetailsService = async () => {
    const {access_token} = loginData;
    let body = {
      currentFixedDepositBank: formFields.bankName,
      paymentTypeOpted: paymentTypeOpted,
    };
    if (showOccupationRadioButtons) {
      body = {
        occupationType: formFields.selectedOccupation?.value,
        paymentTypeOpted: paymentTypeOpted,
      };
    }
    const response = await applicantCompleteApplicationStep1ApiCall(
      access_token,
      body
    );
    return response;
  };

  /** callback function. Gets invoked when user selects any radio button.
   * Store it it local state
   */
  const handleOccupationSelection = (option) => {
    setFormFieldsError({...formFieldsError, selectedOccupationError: null});
    setFormFields({...formFields, selectedOccupation: option});
  };

  const {paymentTypeOpted} = applicantOverviewData || {};
  const showOccupationRadioButtons =
    paymentTypeOpted ===
    VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE;

  return (
    <View style={styles.container}>
      <Container
        style={
          showOccupationRadioButtons
            ? styles.containerViewLarge
            : styles.containerView
        }
        isBackgroundPlain>
        <AppText style={styles.selectedPaymentHeading}>
          {t('patientHastoSelectFollowingPayment')}:
        </AppText>
        <AppText style={styles.selectedPayment}>
          {PAYMENT_FRAMEWORK_VALUE[paymentTypeOpted]}
        </AppText>

        {showOccupationRadioButtons ? (
          <View style={styles.radioButtonContainer}>
            <AppText style={styles.occupationHeading}>
              {t('pleaseSelectYourOccupation')}:
            </AppText>
            <RadioButton
              options={occupationOptions}
              selectedOptionId={formFields?.selectedOccupation?.id}
              getSelectedOption={handleOccupationSelection}
              errorMessage={formFieldsError.selectedOccupationError}
            />
          </View>
        ) : (
          <>
            <AppText style={styles.amountPayableText}>
              {`${t('amountPayable')}: ₹ ${formFields.totalAmountPayable}`}
            </AppText>

            <AppText style={styles.bankFdText}>
              {t('whichBankCurrentlyHoldFd')}
            </AppText>

            <TextInput
              value={formFields.bankName}
              required={true}
              placeholder={t('bankName')}
              style={styles.textInputContainer}
              onChangeText={handleChangeText('bankName')}
              errorMessage={formFieldsError.bankNameError}
            />

            <AppText style={styles.note}>{t('note')}</AppText>
          </>
        )}
      </Container>
      <Button
        style={styles.buttonContainer}
        onPressEvent={handlePressSave}
        label={t('saveAndProceed')}
        isLoading={loading}
      />
      <View>
        <AppText style={styles.apiErrorText}>
          {formFieldsError.apiError}
        </AppText>
      </View>
    </View>
  );
};

export default CompleteApplicationStep1;
