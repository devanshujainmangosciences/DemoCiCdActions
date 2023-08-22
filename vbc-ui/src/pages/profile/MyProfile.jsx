/**
 * This Component renders User profile information and user able edit the information
 */
import React, {useState, useEffect, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {SidebarPatientReportedOutcomesIcon} from '@/assets/icons';
import {Col, Row, Card, Form} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  myProfile,
  updateMyProfile,
  setToast,
  onSideBarRouteClicked,
  getCitiesFromStateId,
  getMasterData,
} from '@/actions';
import {
  aadharValidator,
  dobValidator,
  emailValidator,
  mobileValidator,
  panValidator,
  usePrevious,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import {Routes} from '@/routes';
import {
  actionTypes,
  MASTER_DATA_FINANCE_PATIENT,
  MASTER_DATA_COMPLETE_PROFILE,
  MASTER_DATA_FINANCE_APPLICANT,
  ROLES,
} from '../../constants';
import InputForm from './children/InputForm';
import SuspenseFallbackLoader from '@/components/SuspenseFallbackLoader';
import {useNavigate} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import {getUserPermissions} from '@/actions';
// import ProfileAddressDetails from './ProfileAddressDetails';
// import ProfilePersonalDetails from './ProfilePersonalDetails';
// import ProfileFinancialDetails from './ProfileFinancialDetails';
// import ProfileHospitalDetails from './ProfileHospitalDetails';
const ProfilePersonalDetails = React.lazy(() =>
  import('./ProfilePersonalDetails')
);
const ProfileAddressDetails = React.lazy(() =>
  import('./ProfileAddressDetails')
);
const ProfileHospitalDetails = React.lazy(() =>
  import('./ProfileHospitalDetails')
);
const ProfileFinancialDetails = React.lazy(() =>
  import('./ProfileFinancialDetails')
);

const MyProfile = () => {
  const history = useNavigate();
  const {t} = useTranslation(['myProfile']);
  const dispatch = useAppDispatch();
  const {SET_MY_PROFILE} = actionTypes;
  const [isView, setIsView] = useState(true);
  const [hospitalDetails, sethospitalDetails] = useState({
    drugId: '',
    doctorId: '',
    hospitalId: '',
    diagnosis: '',
    mrn: '',
  });
  const {diagnosis, doctorId, drugId, hospitalId, mrn} = hospitalDetails;
  const [homeNumber, setHomeNumber] = useState('');

  const initialErrorState = {
    emailWarning: false,
    mobileWarning: false,
    aadharError: false,
    panError: false,
    dobWarning: false,
  };
  const [errors, seterrors] = useState(initialErrorState);
  const {aadharError, emailWarning, mobileWarning, panError, dobWarning} =
    errors;
  const initialStateForPersonalDetails = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    birthDate: '',
    mobile: '',
  };
  const [personalDetailsFormValues, setpersonalDetailsFormValues] = useState(
    initialStateForPersonalDetails
  );
  const {birthDate, email, firstName, gender, lastName, middleName, mobile} =
    personalDetailsFormValues;

  const initialStateForAddress = {
    permanentAddress: '',
    permanentCity: '',
    permanentCountry: '',
    permanentPinCode: '',
    presentAddress: '',
    presentCity: '',
    presentCountry: '',
    presentPinCode: '',
    presentState: '',
    permanentState: '',
  };
  const [addressDetails, setaddressDetails] = useState(initialStateForAddress);
  const {
    permanentAddress,
    permanentCity,
    permanentCountry,
    permanentPinCode,
    presentAddress,
    presentCity,
    presentCountry,
    presentPinCode,
    presentState,
    permanentState,
  } = addressDetails;
  const [financialDetails, setfinancialDetails] = useState({
    aadharNumber: '',
    panNumber: '',
  });
  const {aadharNumber, panNumber} = financialDetails;
  const [language, setLanguage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const myProfileData = useAppSelector((state) => state.app.myProfile);
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);
  const userSelectedRole = selectedRole?.roleName;
  const userPermissions = useAppSelector((state) => state.app.userPermissions);
  const masterData = useAppSelector((state) => state.template.masterData);

  const prevMobile = usePrevious(mobile);
  const prevEmail = usePrevious(email);
  const isApplicant = userSelectedRole === ROLES.APPLICANT;
  const isPatient = userSelectedRole === ROLES.PATIENT;

  const isTreatmentStarted =
    userPermissions?.user?.totalCycles !== null ? true : false;

  // console.log('isView=>', isView);

  /** The below code is using the `useEffect` hook in a React component to dispatch a `myProfile` action
if `myProfileData` is falsy. The `myProfile` action is passed a boolean value `isApplicant` as an
argument. The `useEffect` hook has a dependency array that includes `dispatch`, `myProfileData`, and
`isApplicant`, which means that the effect will be re-run if any of these values change. */
  useEffect(() => {
    if (!myProfileData) {
      dispatch(myProfile(isApplicant));
    }
  }, [dispatch, myProfileData, isApplicant]);

  /**
   * On Component load scroll the component to top
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * if isChecked is true permanentAddress is set to presentAddress
   * else myprofile data present address is set present address
   */
  useEffect(() => {
    if (isChecked) {
      onStateChange(permanentState, 'presentState');
      setaddressDetails({
        ...addressDetails,
        presentAddress: permanentAddress,
        presentCity: permanentCity,
        presentCountry: permanentCountry,
        presentPinCode: permanentPinCode,
        presentState: permanentState,
      });
    }
  }, [isChecked]);

  /**
   * Navigates to financial information route
   * @param {any} e
   */
  const navigateToFinancialInfo = (e) => {
    e.preventDefault();

    const afterMasterDataSuccess = () => {
      if (isApplicant) history(Routes.ApplicantFinancialInformation.path);
      else
        history(Routes.FinancialInformation.path, {
          state: {isNavigatedFromProfile: true},
        });

      dispatch(onSideBarRouteClicked('Financial Information'));
    };
    if (!masterData?.professions) {
      if (isApplicant)
        dispatch(
          getMasterData(
            MASTER_DATA_FINANCE_APPLICANT,
            true,
            afterMasterDataSuccess
          )
        );
      else
        dispatch(
          getMasterData(
            MASTER_DATA_FINANCE_PATIENT,
            true,
            afterMasterDataSuccess
          )
        );
    } else afterMasterDataSuccess(masterData);
  };
  /**
   * Changes isView state and cancles the update
   * @param {any} e
   */
  const cancelUpdate = (e) => {
    e.preventDefault();
    resetWarnings();
    setIsView(!isView);
  };
  /**
   * This function resets the errors state to its initial value.
   */
  const resetWarnings = () => {
    seterrors(initialErrorState);
  };
  /**
   * This function handles the editing of a user's profile by setting various form values and fetching
   * master data if it is not already available.
   */
  const handleEditProfile = (e) => {
    e.preventDefault();
    const afterMasterDataSuccess = (masterData) => {
      // console.log('MASTER DATA=>', masterData);
      setIsView(!isView);
      const reqPersonalData = {
        firstName: myProfileData?.firstName,
        middleName: myProfileData?.middleName,
        lastName: myProfileData?.lastName,
        mobile: myProfileData?.mobile,
        email: myProfileData?.email,
        gender: myProfileData?.gender,
        birthDate: myProfileData?.birthDate,
      };
      setpersonalDetailsFormValues(reqPersonalData);

      setaddressDetails({
        ...addressDetails,
        permanentAddress: myProfileData?.permanentAddress,
        permanentCity: myProfileData?.permanentCity,
        permanentCountry: myProfileData?.permanentCountry,
        permanentPinCode: myProfileData?.permanentPinCode,
        permanentState: myProfileData?.permanentState,
        presentAddress: myProfileData?.presentAddress,
        presentCity: myProfileData?.presentCity,
        presentCountry: myProfileData?.presentCountry,
        presentPinCode: myProfileData?.presentPinCode,
        presentState: myProfileData?.presentState,
      });
      checkIfPermanentAndPresentAddressIsSame(myProfileData);
      getCitiesForStates(myProfileData, masterData.states);
      setfinancialDetails({
        ...financialDetails,
        panNumber: myProfileData?.panNumber,
        aadharNumber: myProfileData?.aadharNumber,
      });
      setLanguage(myProfileData.language);
      if (isPatient) {
        setHomeNumber(myProfileData.homeContactNumber);

        sethospitalDetails({
          ...hospitalDetails,
          diagnosis: myProfileData?.diagnosis,
          drugId: myProfileData?.drugId,
          doctorId: myProfileData?.doctorId,
          mrn: myProfileData?.mrn,
          hospitalId: myProfileData?.hospitalId,
        });
      }
    };
    if (!masterData?.states)
      dispatch(
        getMasterData(
          MASTER_DATA_COMPLETE_PROFILE,
          true,
          afterMasterDataSuccess
        )
      );
    else afterMasterDataSuccess(masterData);
  };

  // console.log('CHECKED=>', isChecked);

  /**
   * Function to check if both address are same or not
   * @param {Object} myProfileData
   */
  const checkIfPermanentAndPresentAddressIsSame = (myProfileData) => {
    const permanentAddress = {
      address: myProfileData?.permanentAddress,
      city: myProfileData?.permanentCity,
      country: myProfileData?.permanentCountry,
      pinCode: myProfileData?.permanentPinCode,
      state: myProfileData?.permanentState,
    };
    const presentAddress = {
      address: myProfileData?.presentAddress,
      city: myProfileData?.presentCity,
      country: myProfileData?.presentCountry,
      pinCode: myProfileData?.presentPinCode,
      state: myProfileData?.presentState,
    };
    if (isEqual(permanentAddress, presentAddress)) setIsChecked(true);
    else setIsChecked(false);
  };

  /**
   * This function helps to get the cities data from state if states are different or if state are same.
   * @param {Object} myProfileData
   * @param {Array} states``
   */
  const getCitiesForStates = (myProfileData, states) => {
    const relatedPermanentState = states.find(
      (state) => state.name === myProfileData?.permanentState
    );

    if (myProfileData.presentState === myProfileData.permanentState) {
      //Load same cities
      if (relatedPermanentState) {
        //dispatch action to update permanent cities and present cities as same
        dispatch(
          getCitiesFromStateId(relatedPermanentState?.id, 'same-cities')
        );
      }
    } else {
      //Load Different Cities
      if (relatedPermanentState)
        dispatch(
          getCitiesFromStateId(relatedPermanentState?.id, 'permanentCities')
        );
      const relatedPresentState = states.find(
        (state) => state.name === myProfileData?.presentState
      );
      if (relatedPresentState)
        dispatch(
          getCitiesFromStateId(relatedPresentState?.id, 'presentCities')
        );
    }
  };

  /**
   * This function handles the submission of a form and updates the user's profile data with the entered
   * information.
   * @returns The code snippet does not have a return statement. It is a function that handles form
   * submission and dispatches an action to update the user's profile data.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      gender: gender,
      firstName: captalizeEveryWordOfSentence(firstName),
      middleName: captalizeEveryWordOfSentence(middleName),
      lastName: captalizeEveryWordOfSentence(lastName),
      birthDate: birthDate,
      permanentAddress: captalizeEveryWordOfSentence(permanentAddress),
      permanentCity: permanentCity,
      permanentState: permanentState,
      permanentCountry: permanentCountry,
      permanentPinCode: permanentPinCode,
      presentAddress: captalizeEveryWordOfSentence(presentAddress),
      presentCity: presentCity,
      presentState: presentState,
      presentCountry: presentCountry,
      presentPinCode: presentPinCode,
      panNumber: panNumber ? panNumber.toUpperCase() : null,
      aadharNumber: aadharNumber,
      language: language,
    };
    if (isPatient) {
      data['doctorId'] = parseInt(doctorId);
      data['drugId'] = parseInt(drugId);
      data['hospitalId'] = parseInt(hospitalId);
      data['diagnosis'] = diagnosis;
      data['mrn'] = mrn;
      data['homeContactNumber'] = homeNumber;
    }

    if (isApplicant) data['mobile'] = mobile;
    else data['mobileNumber'] = mobile;

    data['email'] = email;

    if (dobWarning) return;
    const onSuccess = (response) => {
      const responseData = response.data;
      const mobileRecieved = responseData?.mobile;
      const emailRecieved = responseData?.email;
      if (response) {
        dispatch({
          type: SET_MY_PROFILE,
          payload: response.data,
        });
      }

      if (
        (emailRecieved && email !== prevEmail) ||
        (mobileRecieved && mobile !== prevMobile)
      )
        dispatch(
          setToast(
            'Account updated successfully, Please verify email/mobile in setting section',
            true,
            'warning'
          )
        );
      else if (response.message)
        dispatch(setToast(response.message, true, 'success'));

      setIsView(!isView);
      dispatch(getUserPermissions());
    };
    if (mobile || email)
      dispatch(updateMyProfile(data, isApplicant, onSuccess));
    // console.log("SUCCESS=>", data);
    else
      dispatch(setToast('Please enter either Email/Mobile', true, 'warning'));
  };
  /**
   * Validates the Date of birth and set warning if
   * regex test fails
   * @param {String} value
   */
  const handleChangeBirthDate = (value) => {
    // setDob(value);
    if (dobValidator(value)) {
      seterrors({...errors, dobWarning: true});
    } else {
      seterrors({...errors, dobWarning: false});
    }
  };
  /**
   * This function validates an email input and updates the errors state accordingly.
   */
  const emailValidatorFunction = (value) => {
    // setEmail(value);

    if (!emailValidator(value)) {
      seterrors({...errors, emailWarning: false});
    } else {
      seterrors({...errors, emailWarning: true});
    }
  };
  /**
   * This function validates a mobile number and updates the errors state accordingly.
   */
  const mobileValidatorFunction = (value) => {
    // setMobile(value);

    if (!mobileValidator(value)) {
      seterrors({...errors, mobileWarning: false});
    } else {
      seterrors({...errors, mobileWarning: true});
    }
  };

  /**
   * Validating pan card
   * @param {Event} e
   */
  const validatePanNumber = (value) => {
    seterrors({...errors, panError: panValidator(value)});
  };

  /**
   * Validating Aadhar card
   * @param {Event} e
   */
  const validateAadharCardNumber = (value) => {
    seterrors({
      ...errors,
      aadharError: aadharValidator(value),
    });
  };

  // console.log('ERRORS=>', errors.aadharError);

  /**
   *
   * @param {String} value  Actual value of the state
   * @param {String} name  Name of the select box:- present/Permanent
   */
  const onStateChange = (value, name) => {
    let cityType = 'cities';
    if (name === 'permanentState') {
      setaddressDetails({...addressDetails, permanentState: value});
      cityType = 'permanentCities';
    } else {
      setaddressDetails({...addressDetails, presentState: value});
      cityType = 'presentCities';
    }
    const relatedState = masterData.states.find(
      (state) => state.name === value
    );
    // console.log('RELATED STATE=>', relatedState);
    if (relatedState)
      dispatch(getCitiesFromStateId(relatedState?.id, cityType));
  };

  /**
   * Recieves the value from callback function and set the personal details value
   * @param {String} name
   * @param {String} value
   */
  const onPersonalDataValueChange = (name, value) => {
    if (name === 'birthDate') handleChangeBirthDate(value);
    else if (name === 'mobile') mobileValidatorFunction(value);
    else if (name === 'email') emailValidatorFunction(value);
    setpersonalDetailsFormValues({...personalDetailsFormValues, [name]: value});
  };

  /**
   * Recieves the value from callback function and set the financial details value
   * @param {String} name
   * @param {String} value
   */
  const onFinancialDetailsChange = (name, value) => {
    if (name === 'panNumber') validatePanNumber(value);
    else if (name === 'aadharNumber') validateAadharCardNumber(value);
    setfinancialDetails({...financialDetails, [name]: value});
  };

  /**
   * Recieves the value from callback function and set the Address details value
   * @param {String} name
   * @param {String} value
   */
  const onAddressValueChange = (name, value) => {
    setaddressDetails({...addressDetails, [name]: value});
  };

  /**
   * Recieves the value from callback function and set the Hospital details value
   * @param {String} name
   * @param {String} value
   */
  const onHospitalDetailsChange = (name, value) => {
    sethospitalDetails({...hospitalDetails, [name]: value});
  };
  return (
    <>
      {myProfileData && (
        <div className="myprofile-container">
          <Form onSubmit={handleSubmit}>
            <Suspense fallback={<SuspenseFallbackLoader />}>
              <ProfilePersonalDetails
                isView={isView}
                myProfileData={myProfileData}
                personalDetailsFormValues={personalDetailsFormValues}
                onPersonalDetailsValueChange={onPersonalDataValueChange}
                errors={errors}
                isPatient={isPatient}
              />
            </Suspense>
            <Suspense fallback={<SuspenseFallbackLoader />}>
              <ProfileAddressDetails
                isView={isView}
                myProfileData={myProfileData}
                masterData={masterData}
                addressDetails={addressDetails}
                onStateChange={onStateChange}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                onAddressValueChange={onAddressValueChange}
              />
            </Suspense>
            {isPatient && (
              <Suspense fallback={<SuspenseFallbackLoader />}>
                <ProfileHospitalDetails
                  isView={isView}
                  myProfileData={myProfileData}
                  hospitalDetails={hospitalDetails}
                  masterData={masterData}
                  isPatient={isPatient}
                  isTreatmentStarted={isTreatmentStarted}
                  onHospitalDetailsChange={onHospitalDetailsChange}
                />
              </Suspense>
            )}
            <Suspense fallback={<SuspenseFallbackLoader />}>
              <ProfileFinancialDetails
                isView={isView}
                isApplicant={isApplicant}
                myProfileData={myProfileData}
                financialDetails={financialDetails}
                errors={errors}
                onFinancialDetailsChange={onFinancialDetailsChange}
              />
            </Suspense>
            {isApplicant && isView && (
              <Row>
                <Col className="item h-auto">
                  <div className="d-flex align-items-center flex-row title  ">
                    <SidebarPatientReportedOutcomesIcon
                      fill="#28252e"
                      width="20"
                      height="20"
                    />
                    <span>{t('patientDetails')}:</span>
                  </div>
                  <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('diagnosis')}
                            lablevalue={myProfileData.patientDiagnosis}
                            type="text"
                            isView={true}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('drugName')}
                            lablevalue={myProfileData.patientDrugName}
                            type="select"
                            isView={isView}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('hospitalName')}
                            lablevalue={myProfileData.patientHospitalName}
                            type="select"
                            isView={isView}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('doctorName')}
                            lablevalue={captalizeEveryWordOfSentence(
                              myProfileData.doctorName
                            )}
                            type="text"
                            isView={isView}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('relationship')}
                            lablevalue={myProfileData.relationToPatient}
                            type="select"
                            isView={isView}
                            options={
                              masterData?.relationships
                                ? masterData?.relationships.map(
                                    ({id, name}) => ({
                                      id: id,
                                      label: name,
                                      value: name,
                                    })
                                  )
                                : []
                            }
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            <div className="mt-2-rem profile-page-buttons">
              {isView ? (
                <>
                  {' '}
                  <button
                    className="btn-patient-theme bg-dark me-3"
                    onClick={handleEditProfile}>
                    {t('editProfile')}
                  </button>
                  <button
                    className="btn-patient-theme w-auto px-4 my-2 my-sm-0"
                    onClick={navigateToFinancialInfo}>
                    {t('addFinancialInformation')}
                  </button>
                </>
              ) : (
                <>
                  {' '}
                  <button
                    className="btn-patient-theme bg-dark me-3"
                    onClick={cancelUpdate}>
                    {t('cancel')}
                  </button>
                  <button
                    className="btn-patient-theme"
                    title={
                      panError ||
                      aadharError ||
                      mobileWarning ||
                      emailWarning ||
                      dobWarning
                        ? 'Please submit correct information'
                        : ''
                    }
                    disabled={
                      panError ||
                      aadharError ||
                      mobileWarning ||
                      emailWarning ||
                      dobWarning
                    }>
                    {t('save')}
                  </button>
                </>
              )}
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default MyProfile;
