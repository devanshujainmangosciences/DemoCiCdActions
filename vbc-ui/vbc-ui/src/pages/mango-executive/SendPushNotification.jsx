/**
 * Component used to render Send Push Notification Message to Single/Multiple users
 * Props required is mangoAccountId
 */
import {Col, Row} from '@themesberg/react-bootstrap';
import {
  getUsersWithDeviceToken,
  sendPushNotification,
  setToast,
} from '@/actions';
import CustomReactSelect from '@/components/CustomReactSelect';
import MultiLineInput from '@/components/MultiLineInput';
import {ALERT_MESSAGE} from '../../constants';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
// import uniqBy from 'lodash/uniqBy';

const SendPushNotification = ({mangoAccountId}) => {
  const {t} = useTranslation(['patientDetails']);
  const dispatch = useAppDispatch();
  const [patientList, setPatientsList] = useState([]);
  const [message, setmessage] = useState('');
  const [selectedPatients, setselectedPatients] = useState([]);
  const users = useAppSelector((state) => state.admin.usersWithDeviceToken);
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
 used to fetch the list of users with device tokens if it is not already available in the Redux
 store. Once the users data is available, it is mapped to an array of objects with `label`, `value`,
 and `userId` properties and stored in the `patientList` state variable. If a `mangoAccountId` prop
 is provided, it is set as the default selected patient in the `selectedPatients` state variable.
 The `useEffect` hook is triggered whenever the `users` or `mangoAccountId` variables change. */
  useEffect(() => {
    if (!users) dispatch(getUsersWithDeviceToken(true));
    else {
      const reqPatientList =
        users &&
        users.map((patient) => {
          return {
            label: patient?.firstName + patient?.lastName,
            value: patient?.mangoAccountId,
            userId: patient?.userId,
          };
        });
      // const uniqPatients = uniqBy(reqPatientList, 'value');
      setPatientsList(reqPatientList);
    }
    if (mangoAccountId) {
      setselectedPatients([mangoAccountId]);
    }
  }, [users, mangoAccountId]);

  /**
   * This data will change when the data in multi select input will change
   * @param {Array} data
   */
  const onMultiSelectInputChange = (data) => {
    setselectedPatients(data);
  };

  /**
   * The function clears the selected patients and message if there is no mango account ID.
   */
  const clearForm = () => {
    if (!mangoAccountId) setselectedPatients([]);
    setmessage('');
  };

  /**
   * This function sends a push notification to selected patients if there are any, and displays a
   * warning message if there are none.
   */
  const onNotificationSubmit = () => {
    // console.log('PUSH NOTIFICATION=>', selectedPatients);
    if (selectedPatients && selectedPatients.length > 0) {
      // console.log('NOTIFICATION SUBMITTED');
      const customOnSuccess = () => {
        clearForm();
      };
      const reqData = {
        mangoAccountIds: selectedPatients.map((patient) => patient?.value),
        content: message,
      };
      // console.log('REQ DATA=>', reqData);
      if (mangoAccountId) reqData['mangoAccountIds'] = selectedPatients;
      dispatch(sendPushNotification(reqData, customOnSuccess));
    } else {
      dispatch(setToast(ALERT_MESSAGE.SELECT_PATIENT_MESSAGE, true, 'warning'));
    }
  };

  return (
    <div>
      <div className="item p-4 pb-2 mt-2">
        <div className="d-flex align-items-center flex-row title">
          <span className="m-0">{t('send-push-notification')}</span>
        </div>
        {!mangoAccountId && (
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
            <Col xxl={12} xl={12} lg={12} md={12} className="mb-2">
              <div className="mb-2">
                <span className="patient-color">*</span>Select Patients
              </div>
              <CustomReactSelect
                onInputChange={onMultiSelectInputChange}
                optionData={patientList}
                defaultData={selectedPatients}
                backgroundColor="#09a6e0"
              />
            </Col>
          </Row>
        )}
        <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-2">
          <Col xxl={12} xl={12} lg={12} md={12} className="mb-2">
            <div className="mb-2">
              {' '}
              <span className="patient-color">*</span>Enter Message
            </div>
            <MultiLineInput
              label=""
              placeholder="Please type the notification message in here"
              value={message}
              setValue={(value) => setmessage(value)}
              rows={10}
            />
            {mangoAccountId && (
              <button
                onClick={onNotificationSubmit}
                disabled={!message}
                className="btn-patient-theme bg-admin px-4 mt-3">
                {t('Send')}
              </button>
            )}
          </Col>
        </Row>
      </div>
      {!mangoAccountId && (
        <button
          onClick={onNotificationSubmit}
          disabled={!message}
          className="btn-patient-theme bg-admin px-4 mt-3">
          {t('Send')}
        </button>
      )}
    </div>
  );
};

export default SendPushNotification;
