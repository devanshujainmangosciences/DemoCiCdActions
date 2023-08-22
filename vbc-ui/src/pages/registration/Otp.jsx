/**
 * This Component renders a Form for the user to enter the otp they have received in mail
 */

import React, {useState, useEffect} from 'react';
import {Form} from '@themesberg/react-bootstrap';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {verifyPatient, resendOtpForRegister} from '@/actions';
import {Routes} from '@/routes';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import RegistrationBox from './RegistrationBox';
import {useNavigate} from 'react-router-dom';

const OTP = () => {
  const {t} = useTranslation(['otp']);
  const [otp, setOtp] = useState('');
  const history = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null); // for tracking resend otp
  const dispatch = useAppDispatch();
  const registeredPatient = useAppSelector(
    (state) => state.app.registeredPatient
  );

  /**
   * If registerpatient id is not null, user is pushed to
   * signup route
   */
  useEffect(() => {
    if (registeredPatient.id === null) {
      history(Routes.Signup.path);
    }
  }, [registeredPatient, history]);

  /**
   * start resend otp timer
   */
  useEffect(() => {
    resendOtpTimer();
  }, []);

  /**
   * Count from 60 to 0 on calling this function
   */
  const resendOtpTimer = () => {
    let timeLeft = 60;
    const timerId = setInterval(() => {
      if (timeLeft === -1) {
        clearTimeout(timerId);
      } else {
        setRemainingTime(timeLeft);
        timeLeft--;
      }
    }, 1000);
  };
  /*
   * Onsubmitting the form verifyPatient is dispatched and data object
   * is passed as param to it
   * @param {any} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      otp: otp.trim(),
      token: registeredPatient.id,
    };
    if (otp) {
      setIsInvalid(false);
      dispatch(verifyPatient(data, history));
    } else {
      setIsInvalid(true);
    }
  };
  /**
   * onClicking resend otp ctx data object is created with name and email or phone property
   * and registerPatient will dispatch with data as param
   * @param {any} e
   */
  const resendOtp = (e) => {
    e.preventDefault();
    const data = {
      token: registeredPatient.id,
    };
    if (registeredPatient.email) {
      data.username = registeredPatient.email;
    } else {
      data.username = registeredPatient.mobile;
    }
    if (data) {
      setIsInvalid(false);
      dispatch(resendOtpForRegister(data));
      resendOtpTimer(); // start timer
    }
  };
  return (
    <RegistrationBox>
      {registeredPatient && (
        <div>
          <h6 className="mx-auto d-flex justify-content-center">
            <div> {t('hello')} </div>
            <div className="text-patient white-space-nowrap ps-2">
              {' '}
              {registeredPatient.name}
            </div>
          </h6>
        </div>
      )}
      <p className="mt-4 text-center">{t('enterOtp')}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="otp">
          <Form.Control
            value={otp}
            className="p-3"
            onChange={(e) => setOtp(e.target.value)}
            required
            type="text"
            placeholder={t('placeholderEnterOtp')}
          />
        </Form.Group>
        {isInvalid && (
          <small className="text-danger ms-2">{t('validOtp')}</small>
        )}
        <button className="mt-3">{t('submit')}</button>
      </Form>

      <button
        className="mx-auto mt-3 mb-0 text-center link-info otp"
        type="button"
        disabled={remainingTime}
        onClick={resendOtp}>
        {remainingTime ? (
          <span>{t('resendOtpIn') + remainingTime + ' secs'}</span>
        ) : (
          <span> {t('resendOtp')}</span>
        )}
      </button>
    </RegistrationBox>
  );
};

OTP.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};
export default OTP;
