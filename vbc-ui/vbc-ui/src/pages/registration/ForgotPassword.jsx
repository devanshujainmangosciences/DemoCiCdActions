/**
 * This Component renders a Form for the user to enter their email when they forget password
 * This Forms takes the user email to send email to their email address
 */
import React, {useEffect, useState} from 'react';
import {Form} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBackward} from '@fortawesome/free-solid-svg-icons/faBackward';
import {useAppDispatch} from '@/redux/redux-hooks';
import {forgotPassword, setCsrfToken} from '@/actions';
import RegistrationBox from './RegistrationBox';

export default function ForgotPassword() {
  const history = useNavigate();
  const {t} = useTranslation(['signUp']);
  const dispatch = useAppDispatch();
  const [emailOrMobile, setemailOrMobile] = useState('');

  /**
   * To get the CSRF token
   */
  useEffect(() => {
    dispatch(setCsrfToken());
  }, []);

  /**
   * This function handles the submission of a forgot password request by dispatching an action with the
   * provided email or mobile number and resetting the input field.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(emailOrMobile));
    setemailOrMobile('');
  };
  return (
    <RegistrationBox>
      <h6 className="mb-4 text-dark text-center">{t('forgot-password')}</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            value={emailOrMobile}
            onChange={(e) => setemailOrMobile(e.target.value)}
            className="mt-3 p-3"
            required
            type="text"
            placeholder={t('emailOrmobile')}
          />
          <p className="mx-auto mt-3 mb-0 back-to-login">
            <span
              className="text-admin"
              onClick={() => history('/')}
              data-testid="backToLogin">
              <FontAwesomeIcon icon={faBackward} size="xs" /> {t('backToLogin')}
            </span>
          </p>
        </Form.Group>
        <button className="mt-3">{t('submit')}</button>
      </Form>
    </RegistrationBox>
  );
}
