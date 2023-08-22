/*
This component is used to display Contact form in Help Page

State:- formValue this state is object is created to capture user input details.

*/
import {Form} from '@themesberg/react-bootstrap';
import {contactSupport} from '@/actions';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@/redux/redux-hooks';
import {validateURL} from '@/services/utility';

const ContactUs = () => {
  const {t} = useTranslation(['contactUs']);
  const dispatch = useAppDispatch();
  const initialValues = {
    subject: '',
    message: '',
  };
  const [formValue, setformValue] = useState(initialValues);

  const {subject, message} = formValue;

  /**
   * The function updates the state of a form value object with the new value of a specific input field.
   */
  const onFormValueChange = (e) => {
    setformValue({...formValue, [e.target.name]: e.target.value});
  };

  /**
   * This function prevents the default form submission behavior, dispatches a contact support action
   * with message and subject parameters, and resets the form values to their initial state.
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log("FORM VALUES=>", formValue);
    dispatch(contactSupport(message, subject));
    setformValue(initialValues);
  };

  const mangoCancerCareUrl = 'https://www.mangocancercare.com';

  return (
    <div>
      <div className="flex-center">
        <div>
          <div className="mb-3 flex-center">
            <strong>{t('moreInfo')}</strong>
          </div>
          <div className="mb-3 flex-center">{t('notfind')}</div>
          <div className="mb-3 flex-center">
            <strong> {t('callUs')}</strong>
          </div>
          <div className="mb-3 flex-center">
            {t('visitUs')}{' '}
            <a
              href={validateURL(mangoCancerCareUrl)}
              target="_blank"
              rel="noopener noreferrer">
              www.mangocancercare.com
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-3 flex-center">
          <strong> {t('dropMessage')}</strong>
        </div>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={t('subject')}
              required
              value={subject}
              name="subject"
              onChange={onFormValueChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              required
              placeholder={t('message')}
              value={message}
              name="message"
              onChange={onFormValueChange}
            />
          </Form.Group>
          <div className="flex-center">
            <button className="btn-confirm-patient" onSubmit={onFormSubmit}>
              {t('send')}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
