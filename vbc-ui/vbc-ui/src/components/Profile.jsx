/**
 * Component renders Doctor Profile for doctor login
 */
import React, {useEffect, useState} from 'react';
import {Card, Col, Form, Row} from '@themesberg/react-bootstrap';
import {ProfilePageIcon} from '@/assets/icons';
import InputForm from '@/pages/profile/children/InputForm';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {getUserDetails} from '@/actions';
import {
  dobValidator,
  emailValidator,
  mobileValidator,
} from '@/services/utility';
import {DateFormat} from '@/constants';
import format from 'date-fns/format';

const Profile = () => {
  const {t} = useTranslation(['myProfile']);
  const dispatch = useAppDispatch();
  const mangoId = useAppSelector((state) => state.app?.keycloak?.subject);
  const userDetailsRedux = useAppSelector((state) => state.users.userDetails);
  const initialDetails = {
    age: 0,
    birthDate: '',
    email: '',
    firstName: '',
    fullName: '',
    gender: '',
    id: null,
    lastLogin: null,
    lastName: '',
    middleName: '',
    mobile: '',
    roles: null,
    userStatus: '',
  };
  const [isView, setisView] = useState(true);
  const [userDetails, setuserDetails] = useState(initialDetails);
  const {birthDate, email, firstName, gender, lastName, middleName, mobile} =
    userDetails;
  const [errors, seterrors] = useState({
    dobWarning: false,
    mobileWarning: false,
    emailWarning: false,
  });

  const {dobWarning, emailWarning, mobileWarning} = errors;

  useEffect(() => {
    if (mangoId) dispatch(getUserDetails(mangoId));
  }, [mangoId]);

  useEffect(() => {
    if (userDetailsRedux) {
      setuserDetails(userDetailsRedux);
    }
  }, [userDetailsRedux]);

  //   console.log("USER DETAILS=>", userDetails);
  const handleEditProfile = () => {
    setisView(false);
  };

  const cancelUpdate = () => {
    setisView(true);
    setuserDetails(userDetailsRedux);
  };

  const onvalueChange = (e) => {
    setuserDetails({...userDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('USER DETAILS=>', userDetails);
  };

  /**
   * Validates the Date of birth and set warning if
   * regex test fails
   * @param {String} value
   */
  const handleChangeBirthDate = (e) => {
    const value = e.target.value;
    setuserDetails({...userDetails, birthDate: value});
    if (dobValidator(value)) {
      seterrors({...errors, dobWarning: true});
    } else {
      seterrors({...errors, dobWarning: false});
    }
  };
  const emailValidatorFunction = (e) => {
    const value = e.target.value;
    setuserDetails({...userDetails, email: value});

    if (!emailValidator(value)) {
      seterrors({...errors, emailWarning: false});
    } else {
      seterrors({...errors, emailWarning: true});
    }
  };
  const mobileValidatorFunction = (e) => {
    const value = e.target.value;
    setuserDetails({...userDetails, mobile: value});

    if (!mobileValidator(value)) {
      seterrors({...errors, mobileWarning: false});
    } else {
      seterrors({...errors, mobileWarning: true});
    }
  };

  return (
    <div className="myprofile-container">
      <Form onSubmit={handleSubmit}>
        <div className="mt-2-rem profile-page-buttons">
          <Row>
            {/* <Col lg={3} className=" col-lg-3 p-0 px-lg-3 mb-3 mb-lg-0">
          <div className="item">
            <div className="d-flex justify-content-center align-items-center flex-column h-100">
              <FontAwesomeIcon icon={faUserCircle} size="7x" color="#f4f4f4" />

              <button className="update-profile">
                        {t('updateProfilePicture')}
                      </button>
            </div>
          </div>
        </Col> */}

            <Col className="item h-auto">
              <div className="d-flex align-items-center flex-row title  ">
                <ProfilePageIcon fill="#28252e" width="20" height="20" />
                <span>{t('personalDetails')}:</span>
              </div>
              <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('firstName')}
                        lablevalue={firstName}
                        type="text"
                        placeholder="first name"
                        name="firstName"
                        isView={isView}
                        ipValue={firstName}
                        onChange={onvalueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('middleName')}
                        lablevalue={middleName}
                        required={false}
                        type="text"
                        isView={isView}
                        ipValue={middleName}
                        name="middleName"
                        onChange={onvalueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('lastName')}
                        lablevalue={lastName}
                        type="text"
                        isView={isView}
                        ipValue={lastName}
                        name="lastName"
                        onChange={onvalueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('gender')}
                        lablevalue={gender}
                        type="select"
                        isView={isView}
                        ipValue={gender}
                        name="gender"
                        onChange={onvalueChange}
                        options={[
                          {label: 'Male', value: 'MALE'},
                          {label: 'Female', value: 'FEMALE'},
                          // {label: "They", value: "THEY"},
                        ]}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('dateofBirth')}
                        lablevalue={
                          birthDate &&
                          format(
                            new Date(birthDate),
                            DateFormat.DD_MM_YYYY_DASH
                          )
                        }
                        type="date"
                        isView={isView}
                        ipValue={birthDate}
                        isInvalid={dobWarning}
                        warningText="DOB should not exceed the current date and year should not below 1800."
                        name="birthDate"
                        onChange={handleChangeBirthDate}
                      />
                    </Card.Body>
                  </Card>
                </Col>

                {/* <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t("homeNumber")}
                    // lablevalue={homeContactNumber}
                    type="number"
                    isView={isView}
                    // ipValue={homeNumber}
                    // onChange={(e) => setHomeNumber(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col> */}

                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('userName')}
                        //   lablevalue={username}
                        type="text"
                        required
                        isView={isView}
                        //   onChange={(e) => emailValidator(e.target.value)}
                        readOnly={true}
                      />
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('mobile')}
                        lablevalue={mobile}
                        type="text"
                        isView={isView}
                        ipValue={mobile}
                        isInvalid={mobileWarning}
                        warningText="Please enter a valid mobile number"
                        name="mobile"
                        onChange={mobileValidatorFunction}></InputForm>
                    </Card.Body>
                  </Card>
                </Col>

                <Col>
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('email')}
                        lablevalue={email}
                        type="email"
                        required
                        isView={isView}
                        ipValue={email}
                        isInvalid={emailWarning}
                        warningText="Please enter a valid email address"
                        name="email"
                        onChange={emailValidatorFunction}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          {isView ? (
            <>
              <button
                className="btn-patient-theme bg-admin me-3 mt-3"
                onClick={handleEditProfile}
                type="button">
                {t('editProfile')}
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-patient-theme bg-dark me-3 mt-3"
                onClick={cancelUpdate}
                type="button">
                {t('cancel')}
              </button>
              <button
                className="btn-patient-theme bg-admin"
                type="submit"
                title={
                  mobileWarning || emailWarning || dobWarning
                    ? 'Please submit correct information'
                    : ''
                }
                disabled={mobileWarning || emailWarning || dobWarning}>
                {t('save')}
              </button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Profile;
