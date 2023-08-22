/**
 * This Component renders a Form to Create Password for user
 * This form will validate the users password and allow the user to proceed only when
 * user password satisfies the certain conditions
 */
import React, {useState, useEffect} from 'react';
import {Form} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {resetPassword} from '@/actions';
import {Routes} from '@/routes';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {checkStrongPassword, decodeToken} from '@/services/utility';
import RegistrationBox from './RegistrationBox';
import {useNavigate} from 'react-router-dom';
const CreatePassword = () => {
  const {t} = useTranslation(['createPassword']);
  const history = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState(false);
  const dispatch = useAppDispatch();
  const registerPatient = useAppSelector(
    (state) => state.app.registeredPatient
  );

  /**
   * If registerpatient id is not null, user is pushed to
   * signup route
   */
  useEffect(() => {
    if (registerPatient.id === null) {
      history(Routes.Signup.path);
    }
  }, [registerPatient, history]);

  /**
   * if confirmPassword is equal to password isInvalid state is false
   * else true
   */
  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword === password) {
        setIsInvalid(false);
      } else {
        setIsInvalid(true);
      }
    }
  }, [confirmPassword, password]);

  /**
   * OnSubmitting the Form This functions checks if current time is Greater than
   * expiryTime if true this function redirect the user to otp page else this function
   * will dispatch resetPassword action with data as param
   * @param {any} e
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const {exp: expiryTimeStamp} = decodeToken(registerPatient.token);
    const currentTimeStamp = new Date().valueOf();
    const data = {
      password: password.trim(),
      token: registerPatient.token,
    };
    if (currentTimeStamp > expiryTimeStamp * 1000) {
      history(Routes.Otp.path);
    }
    if (isInvalid) return;
    if (passwordWarning) return;
    dispatch(resetPassword(data, history));
  };
  /**
   * Password string is set to password and validating the password
   * if user password satifies the CheckStrongPassword regex test
   * password warning is set to false else set to true
   * @param {String} value
   */
  const handlePassword = (value) => {
    setPassword(value);
    if (value) {
      checkStrongPassword(value)
        ? setPasswordWarning(false)
        : setPasswordWarning(true);
    } else {
      setPasswordWarning(false);
    }
  };

  return (
    <RegistrationBox>
      {registerPatient && (
        <h6 className="mx-auto d-flex  justify-content-center ">
          <div> {t('hello')} </div>
          <div className="text-patient  white-space-nowrap ps-2 ">
            {' '}
            {registerPatient.name}
          </div>
        </h6>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Control
            value={password}
            className="mt-3 p-3"
            onChange={(e) => handlePassword(e.target.value)}
            required
            isInvalid={passwordWarning}
            type="password"
            placeholder={t('newPassword')}
          />
          {passwordWarning && (
            <Form.Control.Feedback type="invalid" className="ms-2">
              {t('strongPassword')}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={confirmPassword}
            className="mt-3 p-3"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            isInvalid={isInvalid}
            type="password"
            placeholder={t('confirmPassword')}
          />
          {isInvalid && (
            <Form.Control.Feedback type="invalid" className="ms-2">
              {t('passwordShouldMatch')}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <button className="mt-3">{t('next')}</button>
      </Form>
    </RegistrationBox>
  );
};
CreatePassword.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default CreatePassword;
