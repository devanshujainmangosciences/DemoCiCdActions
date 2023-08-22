/**
 * Component to render the Personal Details of user
 */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  ProfilePageIcon,
  MobileVerifiedIcon,
  MobileNotVerifiedIcon,
  EmailVerifiedIcon,
  EmailNotVerifiedIcon,
} from '@/assets/icons';
import {Col, Row, Card} from '@themesberg/react-bootstrap';
import {
  capitalizeFirstLetter,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import {DateFormat} from '../../constants';
import InputForm from './children/InputForm';
import format from 'date-fns/format';

const ProfilePersonalDetails = ({
  isView = true,
  myProfileData,
  personalDetailsFormValues,
  onPersonalDetailsValueChange,
  errors,
  isPatient,
}) => {
  const {t} = useTranslation(['myProfile']);
  const {birthDate, email, firstName, gender, lastName, middleName, mobile} =
    personalDetailsFormValues;
  const {emailWarning, mobileWarning, dobWarning} = errors;
  /**
   * Capture the value and call the callback function to update the value
   * @param {*} e
   *
   */
  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onPersonalDetailsValueChange(name, value);
  };

  // console.log('myProfileData=>', myProfileData);

  return (
    <>
      <Row>
        {/* {isView && (
                <Col lg={3} className="ps-0 mb-4 mb-lg-0 p-0">
                  <div className="item">
                    <div className="d-flex justify-content-center align-items-center flex-column h-100">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        size="7x"
                        color="#f4f4f4"
                      />

                      <button className="update-profile">
                        {t('updateProfilePicture')}
                      </button>
                    </div>
                  </div>
                </Col>
              )} */}
        <Col className="item h-auto">
          <div className="d-flex align-items-center flex-row title  ">
            <ProfilePageIcon fill="#28252e" width="20" height="20" />
            <span>{t('personalDetails')}:</span>
          </div>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('firstName')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.firstName
                    )}
                    type="text"
                    placeholder="first name"
                    isView={isView}
                    ipValue={firstName}
                    name="firstName"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('middleName')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.middleName
                    )}
                    required={false}
                    type="text"
                    isView={isView}
                    ipValue={middleName}
                    name="middleName"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('lastName')}
                    lablevalue={captalizeEveryWordOfSentence(
                      myProfileData.lastName
                    )}
                    type="text"
                    isView={isView}
                    ipValue={lastName}
                    name="lastName"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('gender')}
                    lablevalue={capitalizeFirstLetter(
                      myProfileData?.gender ? myProfileData?.gender : ''
                    )}
                    type="select"
                    isView={isView}
                    ipValue={gender}
                    name="gender"
                    onChange={onValueChange}
                    options={[
                      {label: 'Male', value: 'MALE'},
                      {label: 'Female', value: 'FEMALE'},
                      // {label: "They", value: "THEY"},
                    ]}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body className={`${dobWarning && 'pb-3'}`}>
                  <InputForm
                    label={t('dateofBirth')}
                    lablevalue={format(
                      new Date(myProfileData.birthDate),
                      DateFormat.DD_MM_YYYY_DASH
                    )}
                    type="date"
                    isView={isView}
                    ipValue={birthDate}
                    isInvalid={dobWarning}
                    warningText={t('invalidDob')}
                    name="birthDate"
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            {/* {isPatient && (
                    <Col>
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('homeNumber')}
                            lablevalue={myProfileData.homeContactNumber}
                            type="number"
                            isView={isView}
                            ipValue={homeNumber}
                            onChange={(e) => setHomeNumber(e.target.value)}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  )} */}
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('userName')}
                    lablevalue={myProfileData.username}
                    type="text"
                    required
                    isView={isView}
                    ipValue={myProfileData.username}
                    readOnly={true}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('mobile')}
                    lablevalue={myProfileData.mobile}
                    type="text"
                    isView={isView}
                    ipValue={mobile}
                    required={false}
                    isInvalid={mobileWarning}
                    warningText="Please enter a valid mobile number"
                    toolTipText={
                      myProfileData?.mobileVerified
                        ? t('mobile-verified')
                        : t('mobile-not-verified')
                    }
                    name="mobile"
                    onChange={onValueChange}>
                    {myProfileData?.mobile && myProfileData?.mobileVerified ? (
                      <span className="p-0 cursor-pointer">
                        <MobileVerifiedIcon fill="#4f4d53" />
                      </span>
                    ) : (
                      <span className="p-0 cursor-pointer">
                        <MobileNotVerifiedIcon fill="#4f4d53" />
                      </span>
                    )}
                  </InputForm>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col className={isView ? 'w-auto' : ''}> */}
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('email')}
                    lablevalue={myProfileData.email}
                    type="email"
                    isView={isView}
                    required={false}
                    ipValue={email}
                    isInvalid={emailWarning}
                    toolTipText={
                      myProfileData?.emailVerified
                        ? t('email-verified')
                        : t('email-not-verified')
                    }
                    warningText="Please enter a valid email address"
                    name="email"
                    onChange={onValueChange}>
                    {myProfileData?.email && myProfileData?.emailVerified ? (
                      <span className="p-0 cursor-pointer">
                        <EmailVerifiedIcon fill="#4f4d53" />
                      </span>
                    ) : (
                      <span className="p-0 cursor-pointer">
                        <EmailNotVerifiedIcon fill="#4f4d53" />
                      </span>
                    )}
                  </InputForm>
                </Card.Body>
              </Card>
            </Col>
            {isPatient && (
              <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Card className="border-0">
                  <Card.Body>
                    <InputForm
                      label={t('patientId')}
                      lablevalue={myProfileData.uniqueId}
                      type="text"
                      placeholder="Patient Id"
                      isView={isView}
                      ipValue={myProfileData.uniqueId}
                      name="uniqueId"
                      readOnly={true}
                      // onChange={onValueChange}
                    />
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePersonalDetails;
