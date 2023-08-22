/**
 * This Component renders a form , user needs to compelete this form in order to complete his profile
 * onSubmitting this form user profile details are submitted to the server
 */
import React, {useState, useEffect, Suspense} from 'react';
import {Container, Image, Row, Col, Form} from '@themesberg/react-bootstrap';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {MangoCancerCareSVG} from '@/assets/images';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {
  myProfile,
  drugsList,
  hospitalsList,
  setToast,
  doctorsList,
  completeProfile,
  getCitiesFromStateId,
  getMasterData,
  getUserPermissions,
  setSelectedRole,
} from '@/actions';
import {
  aadharValidator,
  capitalizeFirstLetter,
  dobValidator,
  emailValidator,
  mobileValidator,
  panValidator,
  captalizeEveryWordOfSentence,
  setNewToken,
  forceLogout,
} from '@/services/utility';
import {
  ALERT_MESSAGE,
  MASTER_DATA_COMPLETE_PROFILE,
  ROLES,
  ROLE_ID_MAP,
  USER_SELECTED_ROLE,
  SELECTED_ROLE_NAME,
} from '../../constants';
import {CustomModal} from '@/components';
import TermsOfUse from '@/pages/terms-policy/TermsOfUse';
import NumberFormat from 'react-number-format';
import {useLocation, useNavigate} from 'react-router-dom';
import SuspenseFallbackLoader from '@/components/SuspenseFallbackLoader';
import {secureLocalStorage} from '@/services/web.storage';

const WaitingForApproval = React.lazy(() => import('./WaitingForApproval'));
const CompleteProfile = () => {
  const {t} = useTranslation(['completeProfile']);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const drugList = useAppSelector((state) => state.template.drugList);
  const doctorList = useAppSelector((state) => state.template.doctorList);
  const hospitalList = useAppSelector((state) => state.template.hospitalList);
  const [drugListState, setdrugListState] = useState([]);
  const [selectedDrugListState, setSelectedDrugListState] = useState([]);
  const [gender, setGender] = useState('');
  const [drugId, setDrugId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [diagnosisId, setDiagnosisId] = useState('');
  const [mrn, setMrn] = useState('');
  const [isAccepted, setIsAccepted] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const initialErrorState = {
    emailWarning: false,
    mobileWarning: false,
    aadharError: false,
    panError: false,
    dobWarning: false,
  };
  const [errors, seterrors] = useState(initialErrorState);
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentCity, setPermanentCity] = useState('');
  const [permanentState, setPermanentState] = useState('');
  const [permanentCountry, setPermanentCountry] = useState('');
  const [permanentPinCode, setPermanentPinCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [presentAddress, setPresentAddress] = useState('');
  const [presentCity, setPresentCity] = useState('');
  const [presentState, setPresentState] = useState('');
  const [presentCountry, setPresentCountry] = useState('');
  const [presentPinCode, setPresentPinCode] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [isApproved, setisApproved] = useState(false);
  const [termsModal, settermsModal] = useState(false);
  const myProfileData = useAppSelector((state) => state.app.myProfile);
  const userSelectedRole = location?.state?.selectedRole;
  const [userinfoState, setUserInfoState] = useState(null);
  const isApplicant = parseInt(userSelectedRole) === ROLE_ID_MAP.applicant;
  const isPatient = parseInt(userSelectedRole) === ROLE_ID_MAP.patient;
  const masterData = useAppSelector((state) => state.template.masterData);
  const userInfo = useAppSelector((state) => state.app?.keycloak?.userInfo);
  const userDetails = useAppSelector(
    (state) => state.app?.userPermissions?.user
  );
  const flags = useAppSelector((state) => state.app?.userPermissions?.flags);
  const {aadharError, dobWarning, emailWarning, mobileWarning, panError} =
    errors;
  const history = useNavigate();
  // console.log('IS PATIENT=>', isPatient);
  // console.log('IS APPLICANT=>', isApplicant);
  // console.log('USER SELECTED ROLE=>', userSelectedRole);

  /**
   * This Callback will set Manufacturer details to corresponding
   * states if Manufacturer and Manufacturer id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (isChecked) {
      onStateChange(permanentState, 'presentState');
      setPresentAddress(permanentAddress);
      setPresentCity(permanentCity);
      setPresentState(permanentState);
      setPresentCountry(permanentCountry);
      setPresentPinCode(permanentPinCode);
    } else {
      setPresentAddress('');
      setPresentCity('');
      setPresentState('');
      setPresentCountry('');
      setPresentPinCode('');
    }
  }, [
    isChecked,
    permanentAddress,
    permanentCity,
    permanentPinCode,
    permanentCountry,
    permanentState,
  ]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * showManufacturer Action if Manufacturer id is present to get
   * Manufacturers array
   */
  useEffect(() => {
    if (isApplicant) {
      if (!myProfileData) {
        dispatch(myProfile(isApplicant));
      }
    }
  }, [dispatch, myProfileData, isApplicant]);

  /**
   * UseEffect to set profileData when avaliable
   */
  useEffect(() => {
    if (myProfileData) {
      setGender(myProfileData.gender);
      setEmail(myProfileData.email);
      setMobile(myProfileData.mobile);
      setFirstName(myProfileData.firstName);
      setMiddleName(myProfileData.middleName);
      setLastName(myProfileData.lastName);
      setDob(myProfileData.birthDate);
      setPermanentAddress(myProfileData.permanentAddress);
      setPermanentCity(myProfileData.permanentCity);
      setPermanentState(myProfileData.permanentState);
      setPermanentCountry(myProfileData.permanentCountry);
      setPermanentPinCode(myProfileData.permanentPinCode);
      setPresentAddress(myProfileData.presentAddress);
      setPresentCity(myProfileData.presentCity);
      setPresentState(myProfileData.presentState);
      setPresentCountry(myProfileData.presentCountry);
      setPresentPinCode(myProfileData.presentPinCode);
      setPanNumber(myProfileData.panNumber);
      setAadharNumber(myProfileData.aadharNumber);
    }
  }, [myProfileData]);

  /**
   * UseEffect to set the isApproved flag
   */
  useEffect(() => {
    if (flags) setisApproved(flags.accepted);
  }, [flags]);

  /**
   * Dispatch drugsList action when druglist or isPatient is empty or false
   */
  useEffect(() => {
    if (!drugList && isPatient && isApproved) {
      dispatch(drugsList());
    } else if (drugList) {
      const requiredDrugsList = drugList.filter((drug) => drug.visible);
      setdrugListState(requiredDrugsList);
    }
  }, [dispatch, drugList, isPatient, isApproved]);

  /**
   * Lifecycle to get the master data if not avaliable in the complete profile page
   */
  useEffect(() => {
    if (!masterData?.countries && (isApproved || isApplicant))
      dispatch(getMasterData(MASTER_DATA_COMPLETE_PROFILE));
  }, [masterData, isApproved]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * doctorsList Action if Manufacturer id is present to get
   * doctorsList array
   */
  useEffect(() => {
    if (hospitalId && isApproved) {
      dispatch(doctorsList(hospitalId));
    }
  }, [dispatch, hospitalId, isApproved]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * hospitalsList Action if Manufacturer id is present to get
   * hospitalsList array
   */
  useEffect(() => {
    if (!hospitalList && isPatient && isApproved) {
      dispatch(hospitalsList());
    }
  }, [dispatch, hospitalList, isPatient, isApproved]);

  /**
   * Checks for the user info and updated the state
   */
  useEffect(() => {
    if (userInfo && isApproved) {
      const data = {...userInfo};
      const userName = data?.preferred_username;
      if (userName) {
        const isEmail = data?.email?.includes('@');
        const isMobile = !userName.includes('@');
        data.isEmail = isEmail;
        data.isMobile = isMobile;
      }
      if (data?.isEmail) setEmail(data?.email);
      if (data?.isMobile) setMobile(userName);
      setUserInfoState(data);
      // console.log('DATA=>', data);
    }
  }, [userInfo, isApproved]);

  /* The below code is a React useEffect hook that runs when the dependencies `userDetails` and
`isApproved` change. It checks if the `userDetails` object exists and if the user is a patient and
is approved. If these conditions are met, it splits the user's name into first, middle, and last
name using the `split()` method. It then sets the state variables `firstName`, `middleName`,
`lastName`, and `gender` based on the values extracted from the `userDetails` object. If the last
name is empty, it sets the `lastName` state variable */
  useEffect(() => {
    if (userDetails && isPatient && isApproved) {
      const splitedName = userDetails.name.split(' ');

      const FName = splitedName[0];
      const MName = splitedName[1];
      const LName = splitedName[2];

      if (LName === '') setLastName(MName);
      else {
        setMiddleName(MName);
        setLastName(LName);
      }
      setFirstName(FName);

      setGender(userDetails.gender);
    }
  }, [userDetails, isApproved]);

  /**
   * Submits the user entered data to completeProfile action only if the user accept the terms and conditions
   * @param {any} e
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: captalizeEveryWordOfSentence(firstName),
      middleName: captalizeEveryWordOfSentence(middleName),
      lastName: captalizeEveryWordOfSentence(lastName),
      gender,
      birthDate: dob,
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
      email: email,
    };
    if (isPatient) {
      data['doctorId'] = parseInt(doctorId);
      data['drugId'] = parseInt(drugId);
      data['hospitalId'] = parseInt(hospitalId);
      data['diagnosis'] = diagnosis;
      data['mrn'] = mrn;
      data['mobileNumber'] = mobile;
    }
    if (isApplicant) {
      data['mobile'] = mobile;
    }
    if (dobWarning) return;
    if (isAccepted) {
      const onSuccess = () => {
        dispatch(myProfile(isApplicant));
        dispatch(getUserPermissions());
      };
      dispatch(completeProfile(data, history, isApplicant, onSuccess));
    } else {
      dispatch(setToast(t('acceptTerms&conditions'), true, 'warning'));
    }
  };
  /**
   * Validates the Date of Birth and set warning if
   * regex test fails
   * @param {String} value
   */
  const handleDob = (value) => {
    seterrors({...errors, dobWarning: dobValidator(value)});
    setDob(value);
  };
  /**
   * This function validates an email input and updates the errors state accordingly.
   *  @param {String} value
   */
  const emailValidatorFunction = (value) => {
    setEmail(value);

    if (!emailValidator(value)) {
      seterrors({...errors, emailWarning: false});
    } else {
      seterrors({...errors, emailWarning: true});
    }
  };
  /**
   * This function sets the mobile value and checks if it passes a mobile validation function, updating
   * the errors state accordingly.
   *  @param {String} value
   */
  const mobileValidatorFunction = (value) => {
    setMobile(value);
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
  const validatePanNumber = (e) => {
    const value = e.target.value;
    setPanNumber(value);
    seterrors({...errors, panError: panValidator(value)});
  };

  /**
   * Validating Aadhar card
   * @param {Event} e
   */
  const validateAadharCardNumber = (data) => {
    const value = data.value;
    setAadharNumber(value);
    seterrors({
      ...errors,
      aadharError: aadharValidator(value),
    });
  };

  /**
   * The function sets the state of a termsModal variable to false, effectively closing a modal.
   */
  const handleModalClose = () => {
    settermsModal(false);
  };

  /**
   * The function updates the state and dispatches an action to get cities based on the selected state.
   */
  const onStateChange = (value, name) => {
    let cityType = 'cities';
    if (name === 'permanentState') {
      setPermanentState(value);
      cityType = 'permanentCities';
    } else {
      setPresentState(value);
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
   * The function sets various items in local storage and dispatches actions upon registration approval,
   * including setting a new token and getting user permissions after a delay.
   */
  const onRegistrationApproved = () => {
    dispatch(setToast(ALERT_MESSAGE.REGISTRATION_APPROVED, true, 'success'));
    secureLocalStorage.setItem(USER_SELECTED_ROLE, ROLE_ID_MAP.patient);
    secureLocalStorage.setItem(SELECTED_ROLE_NAME, ROLES.PATIENT);
    dispatch(setSelectedRole(ROLE_ID_MAP.patient, ROLES.PATIENT));
    setNewToken(window.keycloak);
    setTimeout(() => {
      dispatch(getUserPermissions());
    }, 5000);
  };
  /**
   * This function dispatches a warning toast message for a rejected registration and optionally logs the
   * user out after a delay.
   */
  const onRegistrationRejected = () => {
    dispatch(setToast(ALERT_MESSAGE.REGISTRATION_REJECTED, true, 'warning'));
    // setTimeout(() => {
    //   forceLogout();
    // }, 5000);
  };

  /**
   * This function used for filter drug list based on cancerTypeId
   * user out after a delay.
   */
  const handleChangeDiagnosis = (id) => {
    const list = drugListState.filter((a) => a.cancerTypeId == id);
    setSelectedDrugListState(list);
    let drugName = '';
    masterData?.cancerTypes.map((a) => {
      if (a.id == id) {
        drugName = a.name;
      }
    });
    setDiagnosis(drugName);
    setDiagnosisId(id);
    setDrugId('');
  };
  return (
    <main
      className={`login-main ${
        !isApproved && !isApplicant ? '' : 'complete-profile'
      }`}>
      <CustomModal
        Show={termsModal}
        title={''}
        handleClose={handleModalClose}
        cssClass={'privacy-modal'}
        closeButton={true}>
        <div>
          <TermsOfUse removeIcon={true} />
        </div>
      </CustomModal>

      {!isApproved && !isApplicant ? (
        <></>
      ) : (
        <div className="logo-container">
          <Image
            src={MangoCancerCareSVG}
            className="mango-logo d-none d-sm-block"
          />
        </div>
      )}
      <div>
        {!isApproved && !isApplicant ? (
          <Suspense fallback={<SuspenseFallbackLoader />}>
            <WaitingForApproval
              onRegistrationApproved={onRegistrationApproved}
              onRegistrationRejected={onRegistrationRejected}
            />
          </Suspense>
        ) : (
          <Container className="reg-container self d-flex justify-content-center align-items-center ">
            <div className="reg-box d-flex flex-column">
              <p className="text-patient head">{t('fillAllFields')}</p>
              <Form onSubmit={handleSubmit}>
                <fieldset className={`${dobWarning && 'pb-3'}`}>
                  <legend>{t('personalDetails')}:</legend>
                  <Row>
                    <Col>
                      <Form.Group controlId="First-Name">
                        <Form.Control
                          required
                          type="text"
                          value={capitalizeFirstLetter(firstName)}
                          placeholder={t('firstName')}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Middle-Name">
                        <Form.Control
                          type="text"
                          value={capitalizeFirstLetter(middleName)}
                          placeholder={t('middleName')}
                          onChange={(e) => setMiddleName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Last-Name">
                        <Form.Control
                          required
                          type="text"
                          value={capitalizeFirstLetter(lastName)}
                          placeholder={t('lastName')}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          value={gender}
                          required
                          as={'select'}
                          onChange={(e) => setGender(e.target.value)}>
                          <option value="" hidden>
                            {t('gender')}
                          </option>
                          <option value="MALE">{t('male')}</option>
                          <option value="FEMALE">{t('female')}</option>
                          {/* <option value="THEY">{t('they')}</option> */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="Dob">
                        <Form.Control
                          required
                          isInvalid={dobWarning}
                          type="date"
                          value={dob}
                          onChange={(e) => handleDob(e.target.value)}
                        />
                        {dobWarning && (
                          <Form.Control.Feedback type="invalid">
                            {t('invalidDob')}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="mobile">
                        <Form.Control
                          isInvalid={mobileWarning}
                          value={mobile}
                          readOnly={userinfoState?.isMobile}
                          onChange={(e) =>
                            mobileValidatorFunction(e.target.value)
                          }
                          type="text"
                          placeholder={t('mobile')}
                        />
                        {mobileWarning && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid mobile number
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg="4" className="mb-lg-0 mb-3">
                      <Form.Group controlId="email">
                        <Form.Control
                          isInvalid={emailWarning}
                          value={email}
                          type="email"
                          readOnly={userinfoState?.isEmail}
                          onChange={(e) =>
                            emailValidatorFunction(e.target.value)
                          }
                          placeholder={t('email')}
                        />
                        {emailWarning && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email address
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset>
                  <legend>{t('addressInformation')} :</legend>
                  <Row>
                    <Col>
                      <Form.Group controlId="Address">
                        <Form.Control
                          value={permanentAddress}
                          type="text"
                          required
                          placeholder={t('permanentAddress')}
                          onChange={(e) => setPermanentAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          value={permanentCountry}
                          required
                          as={'select'}
                          onChange={(e) => setPermanentCountry(e.target.value)}
                          placeholder={t('country')}>
                          <option value="" hidden>
                            {t('select-country')}
                          </option>
                          {masterData?.countries.map(({id, name}) => (
                            <option key={id}>{name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          value={permanentState}
                          required
                          name="permanentState"
                          as={'select'}
                          onChange={(e) =>
                            onStateChange(e.target.value, e.target.name)
                          }
                          placeholder={t('state')}>
                          <option value="" hidden>
                            {t('select-state')}
                          </option>
                          {masterData?.states.map(({id, name}) => (
                            <option key={id}>{name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <div className="col-lg-4 col">
                      <Form.Group controlId="city">
                        <Form.Control
                          value={permanentCity}
                          required
                          placeholder={t('city')}
                          as={'select'}
                          onChange={(e) => setPermanentCity(e.target.value)}>
                          <option value="" hidden>
                            {t('select-city')}
                          </option>
                          {masterData?.permanentCities ? (
                            masterData?.permanentCities.map(({id, name}) => (
                              <option key={id} value={name}>
                                {name}
                              </option>
                            ))
                          ) : (
                            <option key={1} value={''}>
                              {'No cities avaliable!'}
                            </option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={permanentPinCode}
                          required
                          onChange={(e) => setPermanentPinCode(e.target.value)}
                          placeholder={t('pinCode')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Check
                      value={isChecked}
                      isChecked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                      className="m-0"
                      type="checkbox"
                      label={t('clickToCopy')}
                    />
                  </Form.Group>
                  <Row className="mt-2">
                    <Col>
                      <Form.Group controlId="Address">
                        <Form.Control
                          value={presentAddress}
                          type="text"
                          required
                          placeholder="Present Address"
                          onChange={(e) => setPresentAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          value={presentCountry}
                          required
                          as={'select'}
                          onChange={(e) => setPresentCountry(e.target.value)}
                          placeholder={t('country')}>
                          <option value="" hidden>
                            {t('select-country')}
                          </option>
                          {masterData?.countries.map(({id, name}) => (
                            <option key={id}>{name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          value={presentState}
                          required
                          as={'select'}
                          name="presentState"
                          onChange={(e) =>
                            onStateChange(e.target.value, e.target.name)
                          }
                          placeholder={t('state')}>
                          <option value="" hidden>
                            {t('select-state')}
                          </option>
                          {masterData?.states.map(({id, name}) => (
                            <option key={id}>{name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <div className="col-lg-4 col">
                      <Form.Group controlId="city">
                        <Form.Control
                          value={presentCity}
                          required
                          as={'select'}
                          placeholder={t('city')}
                          onChange={(e) => setPresentCity(e.target.value)}>
                          <option value="" hidden>
                            {t('select-city')}
                          </option>
                          {masterData?.presentCities ? (
                            masterData?.presentCities.map(({id, name}) => (
                              <option key={id} value={name}>
                                {name}
                              </option>
                            ))
                          ) : (
                            <option key={1} value={''}>
                              {'No cities avaliable!'}
                            </option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          value={presentPinCode}
                          required
                          onChange={(e) => setPresentPinCode(e.target.value)}
                          placeholder={t('pinCode')}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </fieldset>
                {isPatient && (
                  <fieldset>
                    <legend>{t('hospitalDetails')}:</legend>
                    <Row>
                      <Col>
                        <Form.Group controlId="diagnosis">
                          <Form.Control
                            value={diagnosisId}
                            required
                            as={'select'}
                            onChange={(e) =>
                              handleChangeDiagnosis(e.target.value)
                            }>
                            <option value="" hidden>
                              {t('select-diagnosis')}
                            </option>
                            {masterData?.cancerTypes.map(({id, name}) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="Drug-Name">
                          <Form.Control
                            required
                            value={drugId}
                            as={'select'}
                            onChange={(e) => setDrugId(e.target.value)}
                            placeholder={t('drugName')}>
                            <option value="" hidden>
                              {t('drugName')}
                            </option>
                            {selectedDrugListState &&
                              selectedDrugListState.map((drug) => (
                                <option value={drug.id} key={drug.id}>
                                  {drug.brandName}
                                  {'-'}
                                  {drug.drugGenericName}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="Hospital-Name">
                          <Form.Control
                            required
                            as={'select'}
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            placeholder={t('hospitalName')}>
                            <option value="" hidden>
                              {t('selectHospital')}
                            </option>
                            {hospitalList &&
                              hospitalList.map((hospital) => (
                                <option value={hospital.id} key={hospital.id}>
                                  {' '}
                                  {hospital.hospitalName}{' '}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <div className="col-lg-4 col">
                        <Form.Group controlId="Doctor-Name">
                          <Form.Control
                            required
                            value={doctorId}
                            as={'select'}
                            onChange={(e) => setDoctorId(e.target.value)}
                            placeholder={t('doctorName')}>
                            <option value="" hidden>
                              {t('selectDoctor')}
                            </option>
                            {doctorList &&
                              doctorList.map((doctor) => (
                                <option value={doctor.id} key={doctor.id}>
                                  {' '}
                                  {doctor.name}{' '}
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </div>
                      <div className="col-lg-4 col">
                        <Form.Group controlId="medical-record-name">
                          <Form.Control
                            required
                            value={mrn}
                            type="text"
                            placeholder={t('medicalRecordName')}
                            onChange={(e) => setMrn(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    </Row>
                  </fieldset>
                )}
                <fieldset>
                  <legend>{t('financialInformation')} :</legend>
                  <Row>
                    <div className="col-lg-4 col">
                      <Form.Group controlId="pan-number">
                        <Form.Control
                          isInvalid={panError}
                          value={panNumber}
                          type="text"
                          required={isPatient ? false : true}
                          onChange={validatePanNumber}
                          placeholder={t('panNumber')}
                        />
                        {panError && (
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid PAN
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </div>
                    <div className="col-lg-4 col">
                      <>
                        <div
                          className={`${
                            aadharError
                              ? 'input-normal-custom-error-completeprofile'
                              : 'input-normal-custom-completeprofile'
                          }`}>
                          <NumberFormat
                            label={t('aadharNumber')}
                            required={false}
                            name="aadharNumber"
                            className="input-sm"
                            id="aadharNumber"
                            placeholder="0000-0000-0000"
                            value={aadharNumber}
                            onValueChange={validateAadharCardNumber}
                            format="####-####-####"
                          />
                        </div>
                        {errors.aadharError && (
                          <div className="invalid-feedback-custom-completeprofile">
                            Please enter valid AADHAAR Number
                          </div>
                        )}
                      </>
                      {/* <Form.Group controlId="aadhar-number">
                       <Form.Control
                         value={aadharNumber}
                         isInvalid={aadharError}
                         name="aadharNumber"
                         id="aadharNumber"
                         type="text"
                         maxLength={14}
                         placeholder="0000 0000 0000"
                         onChange={validateAadharCardNumber}
                       />
                       {aadharError && (
                         <Form.Control.Feedback type="invalid">
                           Please enter a valid AADHAAR Number
                         </Form.Control.Feedback>
                       )}
                     </Form.Group> */}
                    </div>
                  </Row>
                </fieldset>
                <p
                  className="mt-4 text-admin text-decoration-underline read-terms"
                  onClick={() => settermsModal(true)}>
                  {t('terms&Conditions')}
                </p>
                <div className="d-flex flex-row align-items-center">
                  <div className="me-3">
                    {' '}
                    <Form.Group controlId="isAccepted">
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          value={isAccepted}
                          checked={isAccepted}
                          onChange={() => setIsAccepted(!isAccepted)}
                        />
                      </Form.Group>
                    </Form.Group>
                  </div>
                  <div>
                    <span className="confirm-text text-dark">
                      {t('confirmText')}
                    </span>
                  </div>
                </div>
                <Row>
                  <Col>
                    <button
                      className="mt-4"
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
                      {t('next')}
                    </button>
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </div>
          </Container>
        )}
      </div>
    </main>
  );
};
CompleteProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default CompleteProfile;
