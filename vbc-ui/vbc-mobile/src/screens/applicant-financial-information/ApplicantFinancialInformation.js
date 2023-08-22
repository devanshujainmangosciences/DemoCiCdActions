/**
 * Screen component for Applicant Financial Information
 */
import React, {useState, useRef, useCallback} from 'react';
import {View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFocusEffect} from '@react-navigation/native';
import {Container, AppText, Loader, NoData} from 'components';
import {financialInformationIcon, professionalOtherFIIcon} from 'assets/icons';
import {
  fetchApplicantFinancialInformationDataApiCall,
  getMasterDataApiCall,
} from 'apis';
import {OCCUPATION_VALUE} from 'constants';
import {convertToYearsAndMonths} from 'utils';
import {formatterForGetCompleteProfile} from './formatter';
import {
  businessOwnerFields,
  financialInfoFields,
  salariedPrivateFields,
  selfEmployedFields,
} from './formFields';
import styles from './styles';
import {MASTER_DATA_FINANCE_APPLICANT} from 'constants/appConstants';

const ApplicantFinancialInformation = () => {
  const scrollViewRef = useRef();
  const {loginData, masterData} = useSelector((state) => state.login);
  const {applicantOverviewData} = useSelector((state) => state.applicant);
  const {applicationSubmitFlag} = applicantOverviewData || {};

  const {t} = useTranslation([
    'applicantFinancialInformation',
    'validationMessages',
  ]);
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
    applicationSubmitFlag: false,
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page

  /** Fetch user's financial information */
  useFocusEffect(
    useCallback(() => {
      if (loginData && !formFields.applicationSubmitFlag) {
        fetchApplicantFinancialInformationData();
      }
    }, [])
  );

  /** fetching financial info using api call */
  const fetchApplicantFinancialInformationData = async () => {
    const {access_token} = loginData;
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_FINANCE_APPLICANT
    );
    if (masterDataApiResponse) {
      const {apiResponse} = await fetchApplicantFinancialInformationDataApiCall(
        access_token
      );
      if (apiResponse) {
        const formattedData = formatterForGetCompleteProfile(
          apiResponse.data?.data,
          masterDataApiResponse?.data?.data
        );
        setFormFields(formattedData);
      }
    }
    setFullPageLoading(false);
  };

  // render values for corresponsing field types
  const renderValueKey = (fieldType) => {
    switch (fieldType) {
      case 'occupation': {
        return formFields?.occupation
          ? OCCUPATION_VALUE[formFields?.occupation]
          : '-';
      }
      case 'yearsInBusiness':
      case 'experience':
      case 'tenureAtCompany':
      case 'totalWorkExperience': {
        return (
          convertToYearsAndMonths(
            formFields?.[fieldType],
            t('years'),
            t('months')
          ) || '-'
        );
      }
      default: {
        return formFields?.[fieldType] || '-';
      }
    }
  };

  // render financial details based on field type
  const renderForm = (item) => {
    return (
      <View style={styles.valuesContainer}>
        <AppText style={styles.valueHeadingText}>{t(item.heading)}:</AppText>
        <AppText style={styles.valueText}>
          {renderValueKey(item.valueKey)}
        </AppText>
      </View>
    );
  };

  if (fullPageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      style={styles.scrollView}>
      {!applicationSubmitFlag && (
        <View style={styles.container}>
          <NoData showCompleteApplicationButton={true} title={t('note')} />
        </View>
      )}
      {formFields?.applicationSubmitFlag && (
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
            {formFields?.occupation === 'BUSINESS_OWNER' && (
              <>{businessOwnerFields.map((item) => renderForm(item))}</>
            )}
            {formFields?.occupation === 'SELF_EMPLOYED' && (
              <>{selfEmployedFields.map((item) => renderForm(item))}</>
            )}
            {(formFields?.occupation === 'SALARIED_PRIVATE' ||
              formFields?.occupation === 'SALARIED_PUBLIC') && (
              <>{salariedPrivateFields.map((item) => renderForm(item))}</>
            )}
          </Container>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default ApplicantFinancialInformation;
