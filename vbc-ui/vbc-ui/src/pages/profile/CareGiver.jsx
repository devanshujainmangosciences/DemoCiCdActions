/**
 * This Component renders a Form where user can add a caregiver to his profile
 * onSubmitting this form caregiver is added to his profile
 */
import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {DoctorNotesIcon} from '@/assets/icons';
import {Col, Row, Form} from '@themesberg/react-bootstrap';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {emailValidator, mobileValidator} from '@/services/utility';
import {caregiver} from '@/data/caregiver';
import TitleContainer from '@/components/TitleContainer';

const Caregiver = () => {
  const {t} = useTranslation(['myProfile,caregiver']);
  const [isAddCaregiver, setIsAddCaregiver] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidMobile, setIsInvalidMobile] = useState(false);
  const formRef = useRef();
  const name = useRef();
  const gender = useRef();
  const age = useRef();
  const email = useRef();
  const mobile = useRef();
  const relationship = useRef();

  /**
   * Function submits the user enter data to api
   * @param {any} e
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   name: name.current.value,
    //   gender: gender.current.value,
    //   age: parseInt(age.current.value),
    //   email: email.current.value,
    //   mobile: mobile.current.value,
    //   relationship: relationship.current.value
    // };
    if (isInvalidEmail && isInvalidMobile) return;
    setIsAddCaregiver(!isAddCaregiver);
  };
  /**
   * Function clears all the form fields value
   */
  const handleClearAll = () => {
    formRef.current.reset();
  };

  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidation = (value) => {
    setIsInvalidEmail(emailValidator(value));
  };

  /**
   * Validates the Mobile Number and set warning if
   * regex test fails
   * @param {String} value
   */
  const mobileValidation = (value) => {
    setIsInvalidMobile(mobileValidator(value));
  };
  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('caregiver:Caregiver')}
      />
      {!isAddCaregiver ? (
        <>
          <button
            onClick={() => setIsAddCaregiver(!isAddCaregiver)}
            className="caregiver-btn mt-4">
            <FontAwesomeIcon className="me-2" icon={faPlus} />
            {t('caregiver:addCaregiver')}
          </button>

          <div className="caregiver-container">
            {caregiver.map(
              ({id, name, age, email, mobile, relationToPatient}) => (
                <div
                  key={id}
                  className="item align-items-start d-flex flex-column">
                  <h5 className="text-admin">
                    {name} <span>( {age} )</span>
                  </h5>
                  <div className="caregiver-details">
                    <p>{email}</p>
                    <p>{mobile}</p>
                    <p>{relationToPatient}</p>
                  </div>
                  <div className="d-flex flex-row mt-2">
                    <button className="btn-patient-theme bg-dark me-2">
                      Delete
                    </button>
                    <button className="btn-patient-theme">Edit</button>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <div className="page-container w-70 mt-4">
          <Form
            className="p-5 caregiver-form"
            onSubmit={handleSubmit}
            ref={formRef}>
            <h4>{t('caregiver:addCaregiver')}</h4>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>{t('caregiver:name')} :</Form.Label>
                  <Form.Control ref={name} required type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender">
                  <Form.Label>{t('caregiver:gender')} :</Form.Label>
                  <Form.Control ref={gender} required as="select">
                    <option value="" hidden>
                      {t('caregiver:gender')}
                    </option>
                    <option value="MALE">{t('caregiver:male')}</option>
                    <option value="FEMALE">{t('caregiver:female')}</option>
                    {/* <option value="THEY">{t('caregiver:other')}</option> */}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="age">
                  <Form.Label>{t('age')} :</Form.Label>
                  <Form.Control ref={age} required type="number" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="email">
                  <Form.Label>{t('caregiver:email')} :</Form.Label>
                  <Form.Control
                    onChange={(e) => emailValidation(e.target.value)}
                    isInvalid={isInvalidEmail}
                    ref={email}
                    required
                    type="email"
                  />
                  {isInvalidEmail && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="position-absolute">
                      {t('caregiver:inValidEmailAddress')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="mobile">
                  <Form.Label>{t('caregiver:mobile')} :</Form.Label>
                  <Form.Control
                    onChange={(e) => mobileValidation(e.target.value)}
                    isInvalid={isInvalidMobile}
                    ref={mobile}
                    required
                    type="number"
                  />
                  {isInvalidMobile && (
                    <Form.Control.Feedback
                      type="invalid"
                      className="position-absolute">
                      {t('caregiver:inValidMobileNumber')}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="relationship">
                  <Form.Label>
                    {t('caregiver:relationshipWithPatient')} :
                  </Form.Label>
                  <Form.Control ref={relationship} required type="text" />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <button
              onClick={handleClearAll}
              className="btn-patient-theme bg-dark me-2">
              {t('caregiver:clearAll')}
            </button>
            <button className="btn-patient-theme">{t('caregiver:save')}</button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Caregiver;
