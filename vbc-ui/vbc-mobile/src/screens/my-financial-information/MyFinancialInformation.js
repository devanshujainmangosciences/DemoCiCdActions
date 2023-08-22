/**
 * Screen component for Financial information
 */
import React, {useState, useRef, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {Container, AppText, Button, Loader} from 'components';
import {financialInformationIcon, professionalOtherFIIcon} from 'assets/icons';
import {fetchFinancialInformationApiCall, getMasterDataApiCall} from 'apis';
import {formatterForGetCompleteProfile} from './formatter';
import {financialInfoFields, professionalInfoFields} from './formFields';
import styles from './styles';
import {MASTER_DATA_FINANCE_PATIENT} from 'constants/appConstants';

const MyFinancialInformation = () => {
  const {navigate} = useNavigation();
  const scrollViewRef = useRef();
  const {loginData, masterData} = useSelector((state) => state.login);
  const {t} = useTranslation(['loanApplication', 'validationMessages']);
  const initialFormFields = {
    accountNumber: null,
    bankName: null,
    bankIfscCode: null,
    bankBranch: null,
    panNumber: null,
    educationLevel: null,
    educationLevelName: null,
    employerName: null,
    industry: null,
    industryName: null,
    insurance: null,
    insuranceName: null,
    insuranceCompany: null,
    insuranceCompanyName: null,
    maturityAmount: null,
    familyAnnualIncome: null,
    designation: null,
    selfAnnualIncome: null,
    otherIncomeSource: null,
    occupation: null,
    occupationName: null,
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page

  /** Fetch user's financial information */
  useEffect(() => {
    loginData && fetchFinancialInformationData();
  }, []);

  /** fetching financial info using api call */
  const fetchFinancialInformationData = async () => {
    const {access_token} = loginData;
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_FINANCE_PATIENT
    );
    if (masterDataApiResponse) {
      const {apiResponse} = await fetchFinancialInformationApiCall(
        access_token
      );
      if (apiResponse) {
        const formattedData = formatterForGetCompleteProfile(
          apiResponse.data?.data,
          masterData
        );
        setFormFields(formattedData);
      }
    }
    setFullPageLoading(false);
  };

  /** when user presses on submit button
   * check validations
   * and call api
   */
  const handlePressEdit = async () => {
    navigate('EditFinancialInformation');
  };

  if (fullPageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const renderForm = (item) => {
    return (
      <View style={styles.valuesContainer}>
        <AppText style={styles.valueHeadingText}>{t(item.heading)}:</AppText>
        <AppText style={styles.valueText}>
          {formFields[item.valueKey] || '-'}
        </AppText>
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}>
      <View style={styles.container}>
        <Container style={styles.accountDetailsContainer}>
          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={financialInformationIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('financialInformation')}
            </AppText>
          </View>
          {financialInfoFields.map((item) => renderForm(item))}
        </Container>
        <Container style={styles.containerSecond}>
          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={professionalOtherFIIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('professionalandotherfinancialinformation')}
            </AppText>
          </View>
          {professionalInfoFields.map((item) => renderForm(item))}
        </Container>

        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressEdit}
          label={t('editFinancialInformation')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MyFinancialInformation;
