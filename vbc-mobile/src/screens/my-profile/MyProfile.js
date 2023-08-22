/**
 * Screen component for Profile
 */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  financialInformationIcon,
  myProfileIcon,
  addressDetailsIcon,
  hospitalDetailsIcon,
} from 'assets/icons';
import {useTranslation} from 'react-i18next';
import {AppText, Button, Container, Loader} from 'components';
import {
  getMasterDataApiCall,
  getRegistrationCompleteProfileApiCall,
} from 'apis';
import {formatterForGetCompleteProfile} from 'screens/edit-profile/formatter';
import {useNavigation} from '@react-navigation/native';
import {getDateInDMYHyphenFormat, getUserRole} from 'utils';
import {
  addressDetailFields,
  financialDetailFields,
  hospitalDetailFields,
  patientDetailFields,
  personalDetailFields,
} from './formFields';
import styles from './styles';
import {MASTER_DATA_COMPLETE_PROFILE} from 'constants/appConstants';

const MyProfile = () => {
  const {t} = useTranslation(['myProfile']);
  const {navigate} = useNavigation();
  const {loginData, masterData} = useSelector((state) => state.login);
  const initialFormFieldsState = {
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    gender: null,
    genderName: null,
    birthDate: null,
    birthDateName: null,
    panNumber: null,
    aadharNumber: null,
    homeNumber: null,
    permanentAddress: null,
    permanentCity: null,
    permanentState: null,
    permanentCountry: null,
    permanentPinCode: null,
    presentAddress: null,
    presentCity: null,
    presentState: null,
    presentCountry: null,
    presentPinCode: null,
    typeOfCancerId: null,
    drugId: null,
    drugIdName: null,
    hospitalId: null,
    hospitalIdName: null,
    doctorId: null,
    doctorIdName: null,
    mrn: null,
    patientDiagnosis: null,
    patientDrugName: null,
    patientHospitalName: null,
    relationToPatient: null,
  };

  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page
  const {userPermissions} = useSelector((state) => state.login);
  /**
   * fetch user profile details
   */
  useEffect(() => {
    loginData && fetchRegistrationCompleteProfileUserData();
  }, []);

  // fetch master data based on if we jave states in master data as My Profile has dependency on states
  const fetchMasterDataService = async () => {
    if (!masterData?.states) {
      const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
        MASTER_DATA_COMPLETE_PROFILE
      );
      return masterDataApiResponse;
    }
  };

  /**
   * fetching user profile details by calling api
   * and then formatting the response of the api
   * with the component states
   */
  const fetchRegistrationCompleteProfileUserData = async () => {
    const loggedInUserRole = getUserRole(userPermissions?.data);
    const isApplicant = loggedInUserRole === 'applicant';
    const {access_token} = loginData;
    const masterDataApiResponse = fetchMasterDataService();
    if (masterDataApiResponse && masterData?.states) {
      const {apiResponse} = await getRegistrationCompleteProfileApiCall(
        access_token,
        isApplicant
      );
      if (apiResponse) {
        const formattedData = formatterForGetCompleteProfile(
          apiResponse.data?.data,
          masterData
        );
        setFormFields(formattedData);
      }
      setFullPageLoading(false);
    }
  };

  useEffect(() => {
    if (masterData?.states) {
      fetchRegistrationCompleteProfileUserData();
    }
  }, [masterData?.states]);

  // When user clicks on Edit profile button
  const handlePressEdit = () => {
    navigate('EditProfile', {
      fromScreen: 'MyProfile',
    });
  };

  if (fullPageLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  // renders form based on different sections dynamically
  const renderForm = (item) => {
    if (item.valueKey === 'uniqueId' && isApplicant) {
      return null;
    } else {
      return (
        <View style={styles.valuesContainer}>
          <AppText style={styles.valueHeadingText}>{t(item.heading)}:</AppText>
          <AppText style={styles.valueText}>
            {item.valueKey === 'birthDateName'
              ? getDateInDMYHyphenFormat(formFields[item.valueKey])
              : formFields[item.valueKey] || '-'}
          </AppText>
        </View>
      );
    }
  };
  const loggedInUserRole = getUserRole(userPermissions?.data);
  const isApplicant = loggedInUserRole === 'applicant';

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* KEPT DELIBERATELY. Required for profile image functionality in future */}

        {/* <Container style={styles.profilePhotoContainer}>
          <View style={styles.profilePhotoSubContainer}>
            <View style={styles.profilePhotoView}>
              <Image
                source={profileIcon}
                resizeMode={'contain'}
                style={styles.profileIcon}
              />
            </View> */}
        {/* KEPT DELIBERATELY. Required for update profile functionality in future */}
        {/* <Button style={styles.profileButton}>
              <AppText style={styles.buttonText}>
                {t('updateProfilePicture')}
              </AppText>
            </Button> */}
        {/* </View>
        </Container> */}

        <Container style={styles.accountDetailsContainer}>
          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={myProfileIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('personalDetails')}
            </AppText>
          </View>
          {personalDetailFields.map((item) => renderForm(item))}
        </Container>

        <Container style={styles.addressDetailsContainer}>
          <View style={styles.accountDetailsContainerSubHeadingContainer}>
            <Image
              source={addressDetailsIcon}
              resizeMode={'contain'}
              style={styles.reviewIcon}
            />
            <AppText style={styles.financialInfo}>
              {t('addressDetails')}
            </AppText>
          </View>
          {addressDetailFields.map((item) => renderForm(item))}
        </Container>

        {!isApplicant && (
          <Container style={styles.hospitalDetailsContainer}>
            <View style={styles.accountDetailsContainerSubHeadingContainer}>
              <Image
                source={hospitalDetailsIcon}
                resizeMode={'contain'}
                style={styles.reviewIcon}
              />
              <AppText style={styles.financialInfo}>
                {t('hospitalDetails')}
              </AppText>
            </View>
            {hospitalDetailFields.map((item) => renderForm(item))}
          </Container>
        )}

        {isApplicant && (
          <Container style={styles.patientDetailsContainer}>
            <View style={styles.accountDetailsContainerSubHeadingContainer}>
              <Image
                source={hospitalDetailsIcon}
                resizeMode={'contain'}
                style={styles.reviewIcon}
              />
              <AppText style={styles.financialInfo}>
                {t('patientDetails')}
              </AppText>
            </View>
            {patientDetailFields.map((item) => renderForm(item))}
          </Container>
        )}

        <Container style={styles.financialDetailsContainer}>
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
          {financialDetailFields.map((item) => renderForm(item))}
        </Container>

        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressEdit}
          label={t('editProfile')}
        />
      </View>
    </ScrollView>
  );
};

export default MyProfile;
