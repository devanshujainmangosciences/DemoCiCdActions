/**
 * Edit profile screen component.
 * Handles both new profile & edit profile.
 */
import React, {useEffect, useState} from 'react';
import {View, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {
  registrationCompleteProfileApiCall,
  fetchHospitalsApiCall,
  fetchDrugsApiCall,
  fetchDoctorsApiCall,
  getRegistrationCompleteProfileApiCall,
  getUserInfoApiCall,
  fetchCityListApiCall,
  getMasterDataApiCall,
} from 'apis';
import {Button, AppText, Loader, Container} from 'components';
import {
  personalDetailsIcon,
  hospitalDetailsIcon,
  addressDetailsIcon,
  financialInformationIcon,
} from 'assets/icons';
import {genderTypes, AsyncStorageKeys} from 'constants';
import {
  decodeToken,
  getDateInDMYHyphenFormat,
  getDateInYMDFormat,
  getFromAsyncStorage,
  getUserRole,
  storeInAsyncStorage,
} from 'utils';
import ConditionalTextInput from 'components/conditionalTextInput/ConditionalTextInput';
import {
  addressFields,
  formatterForCompleteProfile,
  formatterForGetCompleteProfile,
  getRequiredFields,
  initialFormFieldsErrorState,
  initialFormFieldsState,
} from './formatter';
import {
  addressInfoFieldsArray,
  financialInfoFieldsArray,
  medicationInfoFieldsArray,
  personalInfoFieldsArray,
} from './formFields';
import styles from './styles';
import {MASTER_DATA_COMPLETE_PROFILE} from 'constants';
import {Theme} from '../../constants';
import {getPermissionsApiCall} from '../../apis';

const EditProfile = ({
  navigation: {navigate, reset},
  route: {
    params: {fromScreen},
  },
}) => {
  const globalState = useSelector((state) => state.login);
  const {loginData, masterData, userPermissions} = globalState;
  const [formFields, setFormFields] = useState(initialFormFieldsState);
  const [formFieldsError, setFormFieldsError] = useState(
    initialFormFieldsErrorState
  );
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullPageLoading, setFullPageLoading] = useState(true); // to show loader at full page
  const [isEditMode, setIsEditMode] = useState(false);
  const [userRegisteredFrom, setUserRegisteredFrom] = useState(null); // to store from which field i.e. mobile/email - user has registered from
  const [samePresentAddress, setSamePresentAddress] = useState(false);
  const [hospitals, setHospitals] = useState(null);
  const [drugs, setDrugs] = useState(null);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [doctors, setDoctors] = useState(null);
  const [permanentCities, setPermanentCities] = useState(null);
  const [presentCities, setPresentCities] = useState(null);
  const [confirmation, setConfirmation] = useState(false); // storing user's confirmation

  const {t} = useTranslation(['completeProfile', 'validationMessages']);

  /**
   * fetch user profile details
   */
  useEffect(() => {
    if (loginData && masterData) {
      // fetching user data
      fetchRegistrationCompleteProfileUserData();
    }
  }, [loginData, masterData]);

  useEffect(() => {
    fetchMasterDataService();
  }, []);

  // called when user ckecks on same permanent address
  useEffect(() => {
    if (samePresentAddress) {
      copyPresentAddressToPermanentAddress();
    }
  }, [samePresentAddress]);

  /**
   * once user selects hospital -
   * then we call api to fetch doctors -
   * based upon selected hospitals.
   */
  useEffect(() => {
    fetchDoctorsOnHospitalSelect();
  }, [formFields.hospitalId, loginData]);

  /**
   * once user selects present state -
   * then we call api to fetch cities -
   * based upon selected present state.
   */
  useEffect(() => {
    if (loginData) {
      fetchPresentCityService();
    }
  }, [formFields.presentState]);

  /**
   * once user selects permanent state -
   * then we call api to fetch cities -
   * based upon selected permanent state.
   */
  useEffect(() => {
    if (loginData) {
      fetchPermanentCityService();
    }
  }, [formFields.permanentState]);

  /**
   * Once EditProfile screen is mounted -
   * we call apis to fetch
   * hospitals/drugs & typeOfCancer
   */
  useEffect(() => {
    if (loginData) {
      const {access_token} = loginData;
      fetchHospitals(access_token);
      fetchDrugName(access_token);
    }
  }, [loginData]);

  /**
   * call api to fetch doctors -
   * based upon selected hospitals.
   */
  const fetchDoctorsOnHospitalSelect = async () => {
    if (loginData) {
      const {access_token} = loginData;

      if (formFields.hospitalId) {
        const {apiResponse} = await fetchDoctorsApiCall(
          formFields.hospitalId,
          access_token
        );
        if (apiResponse) {
          const doctors = apiResponse.data?.data.map((item) => {
            return {name: item.name, id: item.id};
          });
          setDoctors(doctors);
        }
      }
    }
  };

  const fetchUserInfo = async () => {
    const {access_token} = loginData;
    const {sub: userId} = decodeToken(access_token);
    const {apiResponse} = await getUserInfoApiCall(userId, access_token);
    if (apiResponse) {
      const {email, mobile} = apiResponse?.data?.data;
      if (email && mobile) {
        //user registered from both email and mobile
      } else if (email) {
        setUserRegisteredFrom('email');
      } else if (mobile) {
        setUserRegisteredFrom('mobile');
      }
      return {email, mobile};
    }
  };

  //  calls when user clicks on same address checkbox and in the start when component mounts
  const copyPresentAddressToPermanentAddress = () => {
    const {
      presentAddress,
      presentCity,
      presentCountry,
      presentPinCode,
      presentState,
      presentStateName,
    } = formFields;
    const newFormFields = {
      ...formFields,
      permanentAddress: presentAddress,
      permanentCity: presentCity,
      permanentPinCode: presentPinCode,
      permanentState: presentState,
      permanentStateName: presentStateName,
      permanentCountry: presentCountry,
    };
    const inputErrorObj = {...formFieldsError};
    addressFields.map((item) => {
      if (newFormFields[item] != null || newFormFields[item] != '') {
        inputErrorObj[`${item}Error`] = null;
      }
    });
    setFormFieldsError(inputErrorObj);
    setFormFields(newFormFields);
  };

  /* To copy values from present address to permanentaddress when user is in edit mode,
  edit any present valuesand same values check box is true */
  useEffect(() => {
    if (samePresentAddress) {
      copyPresentAddressToPermanentAddress();
    }
  }, [
    samePresentAddress,
    formFields.presentAddress,
    formFields.presentCity,
    formFields.presentCountry,
    formFields.presentState,
    formFields.presentPinCode,
  ]);

  // fetch master data based on if we jave states in master data as My Profile has dependency on states
  const fetchMasterDataService = async () => {
    const {apiResponse: masterDataApiResponse} = await getMasterDataApiCall(
      MASTER_DATA_COMPLETE_PROFILE
    );
    return masterDataApiResponse;
  };

  useEffect(() => {
    if (masterData?.states) {
      fetchRegistrationCompleteProfileUserData();
    }
  }, [masterData?.states]);

  /**
   * fetching user profile details by calling api
   * and then formatting the response of the api
   * with the component states
   */
  const fetchRegistrationCompleteProfileUserData = async () => {
    const {access_token} = loginData;
    const {apiResponse} = await getRegistrationCompleteProfileApiCall(
      access_token,
      isApplicant
    );
    const {email, mobile} = await fetchUserInfo();
    let values = formFields;
    if (apiResponse) {
      // fetching email/mobile
      const formattedData = formatterForGetCompleteProfile(
        apiResponse.data?.data,
        masterData
      );
      setIsEditMode(true);
      if (email && mobile) {
        values = {...formattedData, email, mobile};
      } else if (email) {
        values = {...formattedData, email};
      } else if (mobile) {
        values = {...formattedData, mobile};
      }
    } else {
      if (email && mobile) {
        values = {...formFields, email, mobile};
      } else if (email) {
        values = {...formFields, email};
      } else if (mobile) {
        values = {...formFields, mobile};
      }
    }
    /** fetching firstname from async storage -
     * and storing that in our local state -
     * if firstname is already not present
     */
    if (!values.firstName) {
      const firstName = await getFromAsyncStorage(AsyncStorageKeys.NAME);
      const parsedFirstName = JSON.parse(firstName);
      values = {...values, firstName: parsedFirstName};
    }
    setFormFields(values);
    setFullPageLoading(false);
  };

  /**
   * fetch hospitals
   */
  const fetchHospitals = async (access_token) => {
    const {apiResponse} = await fetchHospitalsApiCall(access_token);
    if (apiResponse) {
      const hospitals = apiResponse.data?.data.map((item) => {
        return {name: item.hospitalName, id: item.id};
      });
      setHospitals(hospitals);
    }
  };

  /**
   * fetch drugs
   */
  const fetchDrugName = async (access_token) => {
    const {apiResponse} = await fetchDrugsApiCall(access_token);
    if (apiResponse) {
      const drugs = apiResponse.data?.data
        ?.filter((drug) => drug.visible === true)
        ?.map((item) => {
          return {
            name: `${item.brandName}-${item.drugGenericName}`,
            id: item.id,
            cancerTypeId: item.cancerTypeId,
          };
        });
      setDrugs(drugs);
      setFilteredDrugs(drugs);
    }
  };

  const fetchPresentCityService = async () => {
    if (loginData) {
      const {access_token} = loginData;
      if (formFields.presentState) {
        const {apiResponse} = await fetchCityListApiCall(
          formFields.presentState,
          access_token
        );
        if (apiResponse) {
          const cities = apiResponse.data?.data.map((item) => {
            return {name: item.name, id: item.id};
          });
          setPresentCities(cities);
        }
      }
    }
  };

  const fetchPermanentCityService = async () => {
    if (loginData) {
      const {access_token} = loginData;
      if (formFields.permanentState) {
        const {apiResponse} = await fetchCityListApiCall(
          formFields.permanentState,
          access_token
        );
        if (apiResponse) {
          const cities = apiResponse.data?.data.map((item) => {
            return {name: item.name, id: item.id};
          });
          setPermanentCities(cities);
        }
      }
    }
  };

  /**
   * toggle when user presses confirmation checkbox
   */
  const handlePressTerms = () => {
    setConfirmation(!confirmation);
  };

  /** navigating to terms of use */
  const handlePressTermsAndConditions = () => {
    navigate('TermsOfUse');
  };

  const filterMedicationData = (cancerValue) => {
    if (drugs?.length > 0) {
      const filteredDrugsOnCancerType = drugs?.filter(
        (item) => {
          if(!item.cancerTypeId || (item.cancerTypeId && (item.cancerTypeId === cancerValue.id))) {
            return true
          } else return false
        }
      );
      setFilteredDrugs(filteredDrugsOnCancerType);
    }
  };

  useEffect(() => {
    if (formFields && formFields['typeOfCancerId']) {
      const alreadySavedCancerId = masterData?.cancerTypes?.filter(
        (item) => item.name === formFields['typeOfCancerId']
      );
      if (alreadySavedCancerId?.length > 0) {
        filterMedicationData(alreadySavedCancerId[0]);
      }
    }
  }, [formFields['typeOfCancerId']]);

  /**
   * to get user input text/dropdown-items values
   * We are taking second parameter of first functions
   * as whether the fields is dropdown or not.
   * If yes, we have to arrange the selected value as 'id' & 'value'
   * to showcase the value in input field &
   * to send id to apis.
   */
  const handleChangeText =
    (type, inputType) => (value, textInputErrorMessage) => {
      // if there is any error on the current input field, make it null in the input error state key
      const inputError = {
        ...formFieldsError,
        [`${type}Error`]: textInputErrorMessage,
      };
      setFormFieldsError(inputError);
      let values = {...formFields};
      /**
       * whenever hospital is changed,
       * making sure to reset doctors field as well.
       */
      if (type === 'hospitalId') {
        values = {...values, doctorId: null, doctorIdName: null};
        if (formFields['hospitalId'] !== value.id) {
          setDoctors(null);
        }
      } else if (type === 'typeOfCancerId') {
        if (!isTreatmentStarted) {
          values = {
            ...values,
            drugIdName: null,
            drugId: null,
          };
        }

        filterMedicationData(value);
      } else if (type === 'presentState') {
        values = {...values, presentCity: null};

        if (formFields['presentState'] !== value.id) {
          setPresentCities(null);
        }
      } else if (type === 'permanentState') {
        values = {
          ...values,
          permanentCity: null,
        };
        if (formFields['permanentState'] !== value.id) {
          setPermanentCities(null);
        }
      }

      if (inputType === 'dropdown') {
        if (
          type === 'drugId' ||
          type === 'hospitalId' ||
          type === 'doctorId' ||
          type === 'presentState' ||
          type === 'permanentState'
        ) {
          values = {
            ...values,
            [type]: value?.id,
            [type + 'Name']: value?.name,
          };
        } else {
          values = {
            ...values,
            [type]: value?.name,
          };
        }
      } else if (inputType === 'calendar') {
        values = {
          ...values,
          [type]: value,
          [type + 'Name']: getDateInYMDFormat(value),
        };
      } else {
        values = {...values, [type]: value};
        if (type === 'panNumber') {
          storeInAsyncStorage(
            AsyncStorageKeys.PAN_NUMBER,
            JSON.stringify(value)
          );
        }
      }
      setFormFields(values);
    };

  /**
   * handling user press -
   * when user clicks on present address same as permanent address
   */
  const handlePressSamePresentAddress = () => {
    setSamePresentAddress(!samePresentAddress);
  };

  /** registration edit profile api call */
  const callRegistrationEditProfileService = async (formFields) => {
    const {access_token} = loginData;
    const formattedData = formatterForCompleteProfile(formFields);
    const data = await registrationCompleteProfileApiCall(
      formattedData,
      access_token,
      isEditMode, // this is to know whether this is for edit profile
      isApplicant
    );
    return data;
  };

  /** when user presses on submit button */
  const handlePressNext = async () => {
    setLoading(true);
    let updatedFormFieldsError = {...formFieldsError};
    if (formFields['permanentStateName'] && formFields['presentStateName']) {
      updatedFormFieldsError = {
        ...formFieldsError,
        ['permanentStateNameError']: null,
        ['presentStateNameError']: null,
      };
    }
    setFormFieldsError({...updatedFormFieldsError, ['apiError']: null});
    let errorObj = {};
    if (
      (fromScreen === 'Registration' && confirmation) ||
      fromScreen === 'MyProfile'
    ) {
      let isValidationError = false;

      /**
       * Check if there is already an error
       * present due to text input items
       */
      Object.keys(updatedFormFieldsError).map((item) => {
        if (item !== 'apiError' && updatedFormFieldsError[item]) {
          isValidationError = true;
        }
      });

      if (updatedFormFieldsError['emailError'] && !formFields['mobile']) {
        isValidationError = true;
      }

      if (updatedFormFieldsError['mobileError'] && !formFields['email']) {
        isValidationError = true;
      }

      /** getting required fields */
      const requiredFields = getRequiredFields(isApplicant);
      // user has confirmed with terms & conditions
      requiredFields.map((field) => {
        const fieldValue = formFields[field];
        if (!fieldValue) {
          isValidationError = true;
          errorObj = {
            ...errorObj,
            [`${field}Error`]: t('validationMessages:pleaseEnter') + t(field),
          };
        }
      });
      // show validation errors
      if (isValidationError) {
        setFormFieldsError({...updatedFormFieldsError, ...errorObj});
        setLoading(false);
        return;
      }
      if (formFields.email || formFields.mobile) {
        // if no validation error - call api
        const {apiResponse, apiError} =
          await callRegistrationEditProfileService(formFields);
        if (apiResponse) {
          setSuccessMessage(
            apiResponse.localizedMessage || t('succesfullyUpdated')
          );
          setLoading(false);
          setTimeout(() => {
            /**
             * clearing all previous screens from the stack
             * once user successfully start the
             * PBP program
             * in case of vbc program screen
             * otherwise navigating to Others screen
             */
            try {
              isEditMode && !isApplicant
                ? // ? navigate('OthersScreen')
                  navigate('Others', {screen: 'OthersScreen'})
                : reset({
                    index: 1,
                    routes: [
                      {
                        name: isApplicant
                          ? 'ApplicantBottomTabNavigator'
                          : 'BottomTabNavigator',
                      },
                    ],
                  });
            } catch (err) {
              //catch the error here
            }
          }, 2000);
          const {access_token} = loginData;
          const {
            apiResponse: getPermissionsApiResponse,
            apiError: getPermissionsApiError,
          } = await getPermissionsApiCall(access_token);
        } else {
          setFormFieldsError({
            ...initialFormFieldsErrorState,
            apiError: apiError?.localizedMessage || t('failed'),
          });
          setLoading(false);
        }
      } else {
        setFormFieldsError({
          ...updatedFormFieldsError,
          apiError: t('validationMessages:emailOrMobile'),
        });
        setLoading(false);
      }
    } else {
      // user has not confirmed with terms & conditions, show error to user
      setFormFieldsError({
        ...updatedFormFieldsError,
        apiError: t('validationMessages:confirmation'),
      });
      setLoading(false);
    }
  };

  const loggedInUserRole = getUserRole(userPermissions?.data);
  const isApplicant = loggedInUserRole === 'applicant';
  const samePresentAddressIcon = samePresentAddress ? 'check-square' : 'square';
  const userConfirmationIcon = confirmation ? 'check-square' : 'square';
  const isTreatmentStarted = userPermissions?.data?.user?.totalCycles
    ? true
    : false;

  // fetches dropdown items based on field type
  const handleGetDropdownItems = (fieldType) => {
    switch (fieldType) {
      case 'gender': {
        return genderTypes;
      }
      case 'presentCountry':
      case 'permanentCountry': {
        return masterData?.countries;
      }
      case 'presentStateName':
      case 'permanentStateName': {
        return masterData?.states;
      }
      case 'presentCity': {
        return presentCities;
      }
      case 'permanentCity': {
        return permanentCities;
      }
      case 'typeOfCancerId': {
        return masterData?.cancerTypes;
      }
      case 'drugIdName': {
        return filteredDrugs;
      }
      case 'hospitalIdName': {
        return hospitals;
      }
      case 'doctorIdName': {
        return doctors;
      }
      default: {
        return [];
      }
    }
  };

  // handles filling dropdownValue prop for text input with type dropdown
  const handleGetDropdownValue = (item) => {
    if (item.valueKey === 'birthDate') {
      return formFields.birthDateName
        ? getDateInDMYHyphenFormat(formFields.birthDateName)
        : null;
    } else {
      return formFields[item.dropdownValue];
    }
  };

  // make fields disable based on certain conditions and field type
  const handleGetDisabledFields = (fieldType) => {
    switch (fieldType) {
      case 'username': {
        return true;
      }
      case 'mobile': {
        return fromScreen === 'Registration' && userRegisteredFrom === 'mobile';
      }
      case 'email': {
        return fromScreen === 'Registration' && userRegisteredFrom === 'email';
      }
      case 'presentCity': {
        return !formFields.presentState || !presentCities;
      }
      case 'permanentCity': {
        return !formFields.permanentState || !permanentCities;
      }
      case 'drugIdName': {
        return isTreatmentStarted || formFields.typeOfCancerId === null;
      }
      case 'hospitalIdName': {
        return isTreatmentStarted;
      }
      case 'doctorIdName': {
        return isTreatmentStarted || !formFields.hospitalId;
      }
      default: {
        return false;
      }
    }
  };

  // handles show loader on a input field when api hits to populate data
  const handleShowLoaderInInput = (fieldType) => {
    switch (fieldType) {
      case 'presentCity': {
        return formFields.presentState && !presentCities;
      }
      case 'permanentCity': {
        return formFields.permanentState && !permanentCities;
      }
      case 'typeOfCancerId': {
        return !drugs;
      }
      case 'drugIdName': {
        return !drugs;
      }
      case 'hospitalIdName': {
        return !hospitals;
      }
      case 'doctorIdName': {
        return !doctors;
      }
      default: {
        return false;
      }
    }
  };

  // conditionally render form based on type of field
  const renderForm = (item) => {
    if (
      isApplicant &&
      (item.valueKey === 'typeOfCancerId' ||
        item.valueKey === 'drugIdName' ||
        item.valueKey === 'hospitalIdName' ||
        item.valueKey === 'doctorIdName' ||
        item.valueKey === 'mrn')
    ) {
      return null;
    } else if (
      samePresentAddress &&
      (item.valueKey === 'permanentAddress' ||
        item.valueKey === 'permanentCountry' ||
        item.valueKey === 'permanentStateName' ||
        item.valueKey === 'permanentCity' ||
        item.valueKey === 'permanentPinCode')
    ) {
      return null;
    } else if (item.valueKey === 'username' && fromScreen === 'Registration') {
      return null;
    } else if (item.inputType === 'radio') {
      return (
        <Pressable
          style={styles.samePresentAddressContainer}
          onPress={handlePressSamePresentAddress}>
          <Icon
            name={samePresentAddressIcon}
            as={FontAwesome5}
            color={Theme.lightTextColor}
          />
          <AppText style={styles.samePresentAddress}>
            {t('samePresentAddress')}
          </AppText>
        </Pressable>
      );
    } else {
      return (
        <ConditionalTextInput
          item={item}
          handleGetDisabledFields={handleGetDisabledFields}
          handleChangeText={handleChangeText}
          handleShowLoaderInInput={handleShowLoaderInInput}
          handleGetDropdownItems={handleGetDropdownItems}
          handleGetDropdownValue={handleGetDropdownValue}
          value={formFields[item.valueKey]}
          errorMessage={formFieldsError[item.errorMessageKey]}
          placeholder={t(item.placeholder)}
          required={
            item.valueKey === 'panNumber' && !isApplicant
              ? false
              : item.required
          }
        />
      );
    }
  };

  return fullPageLoading ? (
    <View style={styles.loaderContainer}>
      <Loader />
    </View>
  ) : (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={false}
      style={styles.scrollContainer}>
      <View style={styles.container}>
        {!isEditMode && (
          <AppText style={styles.registerText}>
            {t('pleaseCompleteYourProfile')}
          </AppText>
        )}
        <Container isBackgroundPlain style={styles.sectionContainer}>
          <View style={styles.sectionIconContainer}>
            <Image
              source={personalDetailsIcon}
              style={styles.sectionIcon}
              resizeMode={'contain'}
            />
            <AppText style={styles.sectionHeading}>
              {t('personalDetails')}
            </AppText>
          </View>
          {personalInfoFieldsArray.map((item) => renderForm(item))}
        </Container>
        <Container
          isBackgroundPlain
          style={
            samePresentAddress
              ? styles.addressSectionContainerSmall
              : styles.addressSectionContainer
          }>
          <View style={styles.sectionIconContainer}>
            <Image
              source={addressDetailsIcon}
              style={styles.sectionIcon}
              resizeMode={'contain'}
            />
            <AppText style={styles.sectionHeading}>
              {t('addressInformation')}
            </AppText>
          </View>
          {addressInfoFieldsArray.map((item) => renderForm(item))}
        </Container>
        {!isApplicant && (
          <Container
            isBackgroundPlain
            style={styles.medicationSectionContainer}>
            <View style={styles.medicationDetailContainer}>
              <Image
                source={hospitalDetailsIcon}
                style={styles.sectionIcon}
                resizeMode={'contain'}
              />
              <AppText style={styles.sectionHeading}>
                {t('medicationDetails')}
              </AppText>
            </View>
            {medicationInfoFieldsArray.map((item) => renderForm(item))}
          </Container>
        )}
        <Container isBackgroundPlain style={styles.financialContainer}>
          <View style={styles.sectionIconContainer}>
            <Image
              source={financialInformationIcon}
              style={styles.sectionIcon}
              resizeMode={'contain'}
            />
            <AppText style={styles.sectionHeading}>
              {t('financialInformation')}
            </AppText>
          </View>
          {financialInfoFieldsArray.map((item) => renderForm(item))}
        </Container>
        {fromScreen === 'Registration' && (
          <View style={styles.bottomInfoContainer}>
            <AppText
              onPress={handlePressTermsAndConditions}
              style={styles.termsText}>
              {t('terms&Conditions')}
            </AppText>
            <Pressable
              style={styles.confirmationContainer}
              onPress={handlePressTerms}>
              <Icon
                name={userConfirmationIcon}
                as={FontAwesome5}
                style={styles.checkBoxIcon}
              />
              <AppText style={styles.confirmText}>{t('confirmText')}</AppText>
            </Pressable>
          </View>
        )}
        <Button
          style={styles.buttonContainer}
          onPressEvent={handlePressNext}
          isLoading={loading}
          label={t(fromScreen === 'Registration' ? 'continue' : 'Save')}
        />
        <View>
          {successMessage ? (
            <AppText style={styles.successText}>{successMessage}</AppText>
          ) : (
            <AppText style={styles.apiErrorText}>
              {formFieldsError.apiError}
            </AppText>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;
