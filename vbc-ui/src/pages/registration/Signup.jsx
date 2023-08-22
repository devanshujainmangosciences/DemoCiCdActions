/**
 * This Component renders a Form for the user to sign up
 */
import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '@/redux/redux-hooks';
import RegistrationBox from './RegistrationBox';
import {Form} from '@themesberg/react-bootstrap';
import {registerPatient, setCsrfToken} from '../../actions';
import {
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
  // REGISTERED_DISPLAY_NAME,
  // REGISTERED_USERNAME,
} from '../../constants';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {captalizeEveryWordOfSentence} from '@/services/utility';

const Signup = function () {
  const {t} = useTranslation(['signUp']);
  // const localstorageName = localStorage.getItem(REGISTERED_DISPLAY_NAME);
  // const localStorageEmailOrMobile = localStorage.getItem(REGISTERED_USERNAME);
  const [name, setName] = useState('');
  const history = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const dispatch = useAppDispatch();

  /** dispatch the `setCsrfToken()` action
when the component mounts. The empty array `[]` passed as the second argument to `useEffect` ensures
that the effect is only run once, when the component mounts. */
  useEffect(() => {
    dispatch(setCsrfToken());
  }, []);

  /**
   * onClicking resend otp ctx data object is created with name and email or phone property
   * and registerPatient will dispatch with data as param
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: captalizeEveryWordOfSentence(name),
    };
    // if (isEmail) {
    //   data.email = emailOrMobile.trim();
    // } else {
    //   data.phone = emailOrMobile.trim();
    // }
    const emailRegex = emailOrMobile.match(EMAIL_REGEX);
    const mobileRegex = emailOrMobile.match(MOBILE_NUMBER_REGEX);
    if (emailRegex) data.email = emailOrMobile.trim();
    else if (mobileRegex) data.phone = emailOrMobile.trim();

    if (!isInvalid) {
      dispatch(registerPatient(data, history));
    }
  };
  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidator = (value) => {
    setEmailOrMobile(value);
    const emailRegex = value.match(EMAIL_REGEX);
    const mobileRegex = value.match(MOBILE_NUMBER_REGEX);
    if (emailRegex || value === '') {
      setIsInvalid(false);
    } else if (mobileRegex || value === '') {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };
  return (
    <>
      <RegistrationBox>
        <h6 className="mb-4 text-dark text-center">{t('register')}</h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="newUserEmail">
            <Form.Control
              value={name}
              className="mt-3 p-3"
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              placeholder={t('name')}
            />
          </Form.Group>
          <Form.Group controlId="newUserEmail">
            <Form.Control
              value={emailOrMobile}
              onChange={(e) => emailValidator(e.target.value)}
              isInvalid={isInvalid}
              className="mt-3 p-3"
              required
              type="text"
              placeholder={t('emailOrmobile')}
            />
            {isInvalid && (
              <small className="text-danger ms-2">
                {t('validEmailOrmobile')}
              </small>
            )}
          </Form.Group>
          <button className="mt-3">{t('next')}</button>
        </Form>
        <p className="mt-3 mb-0 text-center login-here">
          {t('haveAnAccount')}{' '}
          <span className="text-admin" onClick={() => history('/')}>
            {t('loginhere')}
          </span>
        </p>
      </RegistrationBox>
    </>
  );
};
Signup.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default Signup;
