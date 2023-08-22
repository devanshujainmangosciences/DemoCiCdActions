/**
 * This component is responsible to display the notification icon and the content, it also calls the notofication SSE endpoint to recieve the notification
 */
import {WarningIcon} from '@/assets/icons';
import {USER_ID, URL_REGEX_2, DateFormat} from '../constants';
import React, {Fragment, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {secureLocalStorage} from '@/services/web.storage';
import {Col, Image, Nav, Row, Dropdown} from '@themesberg/react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  faCheck,
  faExclamation,
  faClock,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import {
  saveNotificationInStore,
  getNotifications,
  readNotification,
} from '../actions';
import {connect} from 'react-redux';

import {convertTimeToLocal, validateURL} from '@/services/utility';
import CustomOverHoverToolTip from './CustomOverHoverToolTip';
import {useNavigate} from 'react-router-dom';

const NotificationAlert = ({
  insensitiveTheme,
  userTheme,
  readNotification,
  getNotifications,
  notificationsRedux,
}) => {
  // const {unreadElements, totalElements, currentPage, totalPages, content} =
  //   notificationsRedux;
  const {t} = useTranslation(['header']);
  const [warningNotifications, setWarningNotifications] = useState([]);
  const mangoAccountId = secureLocalStorage.getItem(USER_ID);
  const [notificationLoader, setnotificationLoader] = useState(null);
  const history = useNavigate();

  const [count, setcount] = useState({
    start: 0,
    end: 4,
    currPage: 0,
    totalItems: 0,
    size: 5,
    pages: 0,
  });
  const {currPage, totalItems, pages, size} = count;

  // console.log('COUNT=>', count);
  // console.log('notificationsRedux=>', notificationsRedux);

  // /**
  //  * Calling Notification SSE endpoint
  //  */
  // useEffect(() => {
  //   const access_token = secureLocalStorage.getItem(TOKEN);
  //   const sse = new EventSource(
  //     'https://vbcdev.mangosciences.com/vbc-notification/events',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     }
  //   );

  //   sse.addEventListener(mangoAccountId, (e) => {
  //     const recievedNotification = JSON.parse(e.data);
  //     const data = {
  //       id: recievedNotification?.id,
  //       readDate: null,
  //       link: '#',
  //       content: recievedNotification?.content,
  //     };
  //     saveNotificationInStore(data);
  //   });
  //   sse.onopen = (e) => console.log('CONNECTED');
  //   sse.onerror = (event) => {
  //     switch (event.target.readyState) {
  //       case EventSource.CONNECTING:
  //         break;
  //       case EventSource.CLOSED:
  //         setserverSideEvent(serverSideEvent + 1);
  //         break;
  //     }
  //   };
  //   return (error) => {
  //     // console.log('ERROR=>', error);
  //     sse.close();
  //   };
  // }, [serverSideEvent]);

  useEffect(() => {
    if (notificationsRedux) {
      //   getNotifications(mangoAccountId, currPage, size);
      //   console.log('CALL HAPPENED USEEFFECT[]=>', notificationsRedux);
      // } else {
      setWarningNotifications(notificationsRedux?.content);
      setcount({
        ...count,
        totalItems: notificationsRedux?.totalElements,
        pages: notificationsRedux?.totalPages,
        currPage: notificationsRedux?.currentPage,
      });
    }
  }, [notificationsRedux]);

  // console.log('WARNING NOTIFIACTION=>', warningNotifications);
  // console.log('PREVIOUS  WARNING NOTIFIACTION=>', prevWarningNotification);

  // useEffect(() => {
  //   if (warningNotifications && prevWarningNotification) {
  //     if (warningNotifications.length !== prevWarningNotification.length) {
  //       getNotifications(mangoAccountId, currPage, size);
  //       console.log(
  //         'CALL HAPPENED USEEFFECT[warningNotifications]=>',
  //         notificationsRedux
  //       );
  //     }
  //   }
  // }, [warningNotifications]);

  /**
   * To read single notification on click
   * @param {Func} setNotifications
   * @param {Array} notification
   * @param {Array} warningNotifications
   */
  const markSingleNotificationsAsRead = (notification) => {
    const onCustomSuccess = (notificationId) => {
      getNotifications(mangoAccountId, currPage, size);
      setnotificationLoader({...notificationLoader, [notificationId]: false});
    };

    const isNotificationNotLoading = notificationLoader
      ? notificationLoader[notification.id]
      : false;

    if (!notification.readDate && !isNotificationNotLoading) {
      // console.log('NOTIFICATION TOGGLED');
      setnotificationLoader({...notificationLoader, [notification.id]: true});
      readNotification(notification.id, onCustomSuccess);
    }
  };

  // console.log('NOTIFIACTION=>', notificationLoader);

  /**
   * Function to load more notification
   */
  const onLoadMoreClick = () => {
    // setcount({...count, start: 0, end: end + 5});
    const newCurrentPageCount = currPage + 1;
    setcount({...count, currPage: newCurrentPageCount});
    getNotifications(mangoAccountId, newCurrentPageCount, size);
  };
  const onPreviousClick = () => {
    // setcount({...count, start: 0, end: end + 5});
    const newCurrentPageCount = currPage - 1;
    setcount({...count, currPage: newCurrentPageCount});
    getNotifications(mangoAccountId, newCurrentPageCount, size);
  };

  const routeNotificationURL = (url) => {
    if (url) {
      const location = window.location;
      const origin = location.origin;
      if (url.includes(origin)) {
        const requiredPath = url.split(origin)[1];
        history(requiredPath);
      } else location.href = url;
    }
  };
  const NotificationComponent = (props) => {
    const {sender, image, content, readDate, isWarning = false} = props;
    const readClassName = readDate ? '' : 'text-danger';

    const renderNotificationContent = (content) => {
      const isUrlPresent = content.includes('https');

      if (isUrlPresent) {
        const url = content.match(URL_REGEX_2)[1];
        const newContent = content.replace(url, '');
        const requiredURL = validateURL(url);

        return (
          <>
            <p className="font-small notification-content-text mt-1 mb-0 px-2">
              {newContent}
            </p>
            <p className="notification-link px-2 m-0">
              <span
                className="mb-3 notification-link-target"
                target="blank"
                onClick={() => routeNotificationURL(requiredURL)}>
                {requiredURL}
              </span>
            </p>
          </>
        );
      } else
        return (
          <p className="font-small notification-content-text mt-1 mb-0 px-2">
            {content}
          </p>
        );
    };
    return (
      <div
        className={` ${
          !isWarning ? 'border-bottom border-light' : 'border-0'
        }  `}>
        {!isWarning ? (
          <Row className="align-items-center">
            <Col className="col-auto">
              <Image
                src={image}
                className="user-avatar lg-avatar rounded-circle"
              />
            </Col>
            <Col className="ps-0 ms--2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="h6 mb-0 text-small">{sender} </h4>
                </div>
                <div className="text-end">
                  {readDate && (
                    <div className="d-flex flex-row align-items-center">
                      <div className="">
                        <FontAwesomeIcon
                          className="patient-color time-icon p-0"
                          icon={faClock}
                        />
                      </div>
                      <div>
                        <small
                          className={`${readClassName} text-pure-black p-1`}>
                          {convertTimeToLocal(
                            readDate,
                            DateFormat.MMM_DD_YYYY_HH_SS
                          )}
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="font-small mt-1 mb-0">{content}</p>
            </Col>
          </Row>
        ) : (
          <div
            className={`align-items-center m-0 cursor-pointer notification-item-${userTheme} d-flex`}
            onClick={() =>
              markSingleNotificationsAsRead(props, warningNotifications)
            }>
            <div className="m-2">
              {notificationLoader && notificationLoader[props.id] ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className={`icon-color-${userTheme}  p-0`}
                />
              ) : !readDate ? (
                <FontAwesomeIcon
                  icon={faExclamation}
                  className={`icon-color-${userTheme}  p-0`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`icon-color-${userTheme}  p-0`}
                />
              )}
            </div>

            <div className="ps-0">
              {renderNotificationContent(content)}

              {readDate && (
                <div className="d-flex flex-row align-items-center px-2 mb-1">
                  <div className="">
                    <FontAwesomeIcon
                      className={`icon-color-${userTheme} time-icon  p-0`}
                      icon={faClock}
                    />
                  </div>
                  <div>
                    <small
                      className={`${readClassName} notification-content-text p-1`}>
                      {convertTimeToLocal(
                        readDate,
                        DateFormat.MMM_DD_YYYY_HH_SS
                      )}
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dropdown as={Nav.Item} className="mt-2">
      {/* <div className="notification-traingle"></div> */}
      <Dropdown.Toggle
        as={Nav.Link}
        aria-label="Notification"
        className="text-dark icon-notifications ms-lg-2">
        <span className="icon icon-sm">
          <CustomOverHoverToolTip
            placement="bottom"
            show={100}
            hide={200}
            toolTipText="Notification">
            <WarningIcon fill="#a3a1a5" />
          </CustomOverHoverToolTip>
          {notificationsRedux?.unreadElements === 0 ? null : (
            <span
              className={`icon-badge rounded-circle unread-notifications three-digit bg-${insensitiveTheme}`}>
              {/* {notificationCount(warningNotifications)} */}
              {notificationsRedux?.unreadElements === 0
                ? ''
                : notificationsRedux?.unreadElements}
            </span>
          )}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu className=" dashboard-dropdown notifications-dropdown rounded-0 dropdown-menu-lg dropdown-menu-left mt-4 py-0 border-0 notification-list ">
        <div
          className={`${
            warningNotifications &&
            warningNotifications.length === 0 &&
            totalItems === 0
              ? ''
              : 'notification-items'
          } custom-notification-scroll`}
          id={`custom-notification-scroll-${userTheme}`}>
          {warningNotifications.map((n) => {
            // if (i >= start && i <= end) {

            return (
              <Fragment key={`notification-${n.id}`}>
                <NotificationComponent
                  warningNotifications={warningNotifications}
                  userTheme={userTheme}
                  isWarning={true}
                  {...n}
                />
              </Fragment>
            );
            // }
          })}
          {warningNotifications &&
            warningNotifications.length === 0 &&
            totalItems === 0 && (
              <Dropdown.Item className="text-center fw-medium text-admin pt-2 py-3 no-notification">
                {t('you-dont-have-any-notification')}
              </Dropdown.Item>
            )}

          <Row>
            {currPage !== 0 && (
              <Col>
                <div
                  className={`text-center fw-medium text-${userTheme} p-2 cursor-pointer`}
                  onClick={onPreviousClick}>
                  {t('Previous')}
                </div>
              </Col>
            )}
            {currPage !== pages - 1 && warningNotifications.length >= 5 && (
              <Col>
                <div
                  className={`text-center fw-medium text-${userTheme} p-2 cursor-pointer`}
                  onClick={onLoadMoreClick}>
                  {t('Next')}
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  userPermissions: state.app.userPermissions,
  myProfile: state.app.myProfile,
  notificationsRedux: state.app.notifications,
});

export default connect(mapStateToProps, {
  saveNotificationInStore,
  getNotifications,
  readNotification,
})(NotificationAlert);
