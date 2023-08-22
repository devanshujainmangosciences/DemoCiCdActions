/**
 * This module contains a NavbarComponent component.
 * <NavbarComponent
      setToggleSidebar, => (callback) to toggle Sidebar
      toggleSidebar, => (boolean to show toggle on Sidebar)
      theme, => with which Navbar should have to be rendered
      userPermissions, => user permissions, routes and data we get from API
    </NavbarComponent>
 */
import React, {useEffect} from 'react';
import {useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {
  Nav,
  Navbar as NavBar,
  Dropdown,
  Container,
} from '@themesberg/react-bootstrap';
import {string, bool, func, object, symbol, array} from 'prop-types';
import {useTranslation} from 'react-i18next';

import {captalizeEveryWordOfSentence, forceLogout} from '@/services/utility';
import {
  ROLES,
  SELECTED_ROLE_NAME,
  TREATMENT_DRUG_NAME,
  USER_THEME,
} from '../constants';
import {ProfileIcon, QuestionIcon} from '../assets/icons';

import {
  saveNotificationInStore,
  getNotifications,
  readNotification,
  myProfile,
} from '../actions';
import {USER_ID, TOKEN} from '../constants';

import {secureLocalStorage} from '@/services/web.storage';
import NotificationAlert from './NotificationAlert';
import {EventSourcePolyfill} from 'event-source-polyfill';
const EventSource = EventSourcePolyfill;
const NavbarComponent = (props) => {
  const {t} = useTranslation(['header']);
  const {
    toggleSidebar,
    theme: insensitiveTheme,
    userPermissions,
    myProfile,
    saveNotificationInStore,
  } = props;
  const userTheme = localStorage.getItem(USER_THEME);
  const tokenRefreshed = useAppSelector((state) => state.app.tokenRefreshed);
  const selectedRole = useAppSelector((state) => state.app.userSelectedRole);

  // const [serverSideEvent, setserverSideEvent] = useState(0);
  const mangoAccountId = secureLocalStorage.getItem(USER_ID);
  const treatmentDrugName = secureLocalStorage.getItem(TREATMENT_DRUG_NAME);

  /**
   * Calling Notification SSE endpoint only for patient and applicant
   */
  useEffect(() => {
    const selectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
    const isAdmin =
      selectedRole === ROLES.ADMIN || selectedRole === ROLES.SUBADMIN;

    if (!isAdmin) {
      const access_token = secureLocalStorage.getItem(TOKEN);
      if (window.sse) window.sse.close();

      const sse = new EventSource(import.meta.env.VITE_SSE_LINK, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      sse.addEventListener(mangoAccountId, (e) => {
        const recievedNotification = JSON.parse(e.data);
        const data = {
          id: recievedNotification?.id,
          readDate: null,
          link: '#',
          content: recievedNotification?.content,
        };
        saveNotificationInStore(data, mangoAccountId);
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

  /** if user is assigned with more then one role - show switch roles option */
  // const showSwitchRolesOption = Object.keys(userPermissions?.roles).length > 1;

  /**
   * @param  {Object} e
   */
  const logout = (e) => {
    e.preventDefault();
    forceLogout();
  };

  const getDrugName = () => {
    if (treatmentDrugName) return treatmentDrugName;
    else {
      const isApplicant = selectedRole.roleName === ROLES.APPLICANT;
      myProfile(isApplicant);
    }
  };

  const NavbarContentNew = (theme) => {
    const selectedRole = localStorage.getItem(USER_THEME);
    const isPatient =
      selectedRole.toUpperCase() === ROLES.PATIENT.toUpperCase();
    const isPharma = selectedRole.toUpperCase() === ROLES.PHARMA.toUpperCase();
    const isApplicant =
      selectedRole.toUpperCase() === ROLES.APPLICANT.toUpperCase();
    const insensitiveTheme = theme.toLowerCase();
    return (
      <div className="d-none d-md-flex">
        <div className="navbar-detail-container row justify-content-center align-items-center ">
          <div className="col white-space-nowrap">
            <span className="welcome space">{t('welcome')} </span>
            <span className={`name text-${insensitiveTheme}`}>
              {captalizeEveryWordOfSentence(userPermissions?.user?.name)}
            </span>
            {isPatient && (
              <>
                <span className="ms-2 age-gender">
                  {userPermissions?.user?.age} Y,{' '}
                  {userPermissions?.user?.gender}
                </span>
              </>
            )}
          </div>
          <div className="col white-space-nowrap">
            {isPatient && userPermissions?.user?.totalCycles && (
              <>
                <span className=" age-gender">
                  {`Treatment on ${getDrugName()}, `}
                </span>
                <span className=" age-gender">{`Cycle ${userPermissions?.user?.completedCycles}/${userPermissions?.user?.totalCycles}`}</span>
              </>
            )}
            {isApplicant && (
              <>
                <span className="fw-bold text-capitalize">
                  {userPermissions?.user?.age} Y,{' '}
                  {userPermissions?.user?.gender}
                </span>
                <span className="fw-light ms-4">{t('lastVisit')}</span>
                <span className="fw-bold ms-1">02-01-2021</span>
              </>
            )}
            {isPharma && (
              <>
                <span className="fw-light">{t('organisation')}</span>
                <span className="fw-bold ms-1">Pfizer</span>
                <span className="fw-light ms-4">{t('role')}</span>
                <span className="fw-bold ms-1">Executive</span>
                <span className="fw-light ms-4">{t('role')}</span>
                <span className="fw-bold ms-1">Executive</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <NavBar
      variant="dark"
      expanded
      className={`vbcnavbar ${toggleSidebar ? 'toggle-side-bar' : ''}`}>
      <Container fluid className="px-0">
        {/* {toggleSidebar && (
          <SandwichButton css="nav-sw" setToggleSidebar={setToggleSidebar} />
        )} */}
        <div className="d-flex justify-content-between w-100 ">
          {/* {NavbarContent(insensitiveTheme)} */}
          {NavbarContentNew(insensitiveTheme)}
          <Nav className="align-items-center d-none d-md-flex">
            {/* search */}
            {/* <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <Form.Control
                    type="text"
                    placeholder={t('search')}
                    className="search-input"
                  />
                  <button id="search-button" className="search-icon">
                    <SearchIcon fill="#fff" />
                  </button>
                  <div>
                    <Searchbox />
                  </div> 
                </InputGroup>
              </Form.Group>
            </Form> */}

            {/* Help icon */}
            {insensitiveTheme === ROLES.PHARMA && (
              <button className="btn-help-icon">
                {' '}
                <QuestionIcon fill="#fff" /> {t('help')}
              </button>
            )}
            {/* Help icon */}

            {/* notifications */}

            <div className="notification-alert">
              <NotificationAlert
                insensitiveTheme={insensitiveTheme}
                userTheme={userTheme}
              />
            </div>

            {/* logout */}
            <Dropdown>
              <div className=" px-0" onClick={(e) => logout(e)}>
                <Dropdown.Item className="fw-bold d-none d-sm-block">
                  <ProfileIcon
                    fill="#a3a1a5"
                    className="me-2 user-avatar sm-avatar"
                  />{' '}
                  <span className="fw-normal">{t('logout')}</span>
                </Dropdown.Item>
              </div>
            </Dropdown>
          </Nav>
        </div>
        {/* {showSwitchRolesOption && (
          <span onClick={() => history(Routes.UserRoles.path)}>
            Switch
          </span>
        )} */}
      </Container>
    </NavBar>
  );
};

const mapStateToProps = (state) => ({
  userPermissions: state.app.userPermissions,
  notificationsRedux: state.app.notifications?.content,
});

NavbarComponent.propTypes = {
  setToggleSidebar: func,
  toggleSidebar: bool,
  role: string,
  userPermissions: object,
  notificationsRedux: array,
  theme: string,
  saveNotificationInStore: func,
  getNotifications: func,
  readNotification: func,
  link: string,
  sender: string,
  image: string,
  time: string,
  icon: symbol,
  content: string,
  readDate: string,
  isWarning: bool,
};

export default connect(mapStateToProps, {
  saveNotificationInStore,
  getNotifications,
  readNotification,
  myProfile,
})(NavbarComponent);
