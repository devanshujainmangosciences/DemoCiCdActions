import {Container} from '@themesberg/react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@/redux/redux-hooks';
import {EventSourcePolyfill} from 'event-source-polyfill';
import {secureLocalStorage} from '@/services/web.storage';
import {SELECTED_ROLE_NAME, USER_ID, TOKEN, ROLES} from '@/constants';
import RegistrationBox from '@/pages/registration/RegistrationBox';
import {useTranslation} from 'react-i18next';

const EventSource = EventSourcePolyfill;

const WaitingForApproval = ({
  onRegistrationApproved,
  onRegistrationRejected,
}) => {
  const {t} = useTranslation(['registrationProfile']);
  const userInfo = useAppSelector((state) => state.app.userPermissions);
  const tokenRefreshed = useAppSelector((state) => state.app.tokenRefreshed);
  const mangoAccountId = secureLocalStorage.getItem(USER_ID);
  const [isRegistrationDeclined, setisRegistrationDeclined] = useState(false);

  /**
   * Calling Notification SSE endpoint only for patient and applicant
   */
  useEffect(() => {
    const selectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
    const isAdmin =
      selectedRole === ROLES.ADMIN || selectedRole === ROLES.SUBADMIN;
    const access_token = secureLocalStorage.getItem(TOKEN);
    if (!isAdmin && access_token && mangoAccountId) {
      if (window.sse) window.sse.close();

      const sse = new EventSource(import.meta.env.VITE_SSE_LINK, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      sse.addEventListener(mangoAccountId, (e) => {
        const recievedNotification = JSON.parse(e.data);

        if (
          recievedNotification?.content.includes(
            'registration request is approved'
          )
        ) {
          onRegistrationApproved();
          sse.close();
        } else if (
          recievedNotification?.content.includes(
            'registration request was declined'
          )
        ) {
          setisRegistrationDeclined(true);
          onRegistrationRejected();
          sse.close();
        }
      });
      // sse.onopen = (e) => console.log('CONNECTED');
      window.sse = sse;
      sse.onerror = (event) => {
        if (event?.status === 404) {
          sse.close();
        } else if (event?.status === 401) {
          sse.close();
          // setserverSideEvent(serverSideEvent + 1);
        }
        switch (event.target.readyState) {
          case EventSource.CONNECTING:
            break;
          case EventSource.CLOSED: {
            if (event?.status === 404) {
              sse.close();
            } else if (event?.status === 401) {
              sse.close();
              // setserverSideEvent(serverSideEvent + 1);
            }
            break;
          }
        }
      };
      return () => {
        sse.close();
      };
    }
  }, [tokenRefreshed]);
  return (
    <RegistrationBox>
      <Container className="reg-container  d-flex justify-content-center align-items-center ">
        <div className="d-flex flex-column approval-container">
          <div className="user-name">
            Hello{' '}
            <span className="patient-color">
              {userInfo && userInfo.user.name}
            </span>
          </div>
          <div className="waiting-for-approval mt-3">
            {isRegistrationDeclined
              ? t('registrationDeclined')
              : t('waitingForApprovalMsg')}
          </div>
        </div>
      </Container>
    </RegistrationBox>
  );
};

export default WaitingForApproval;
