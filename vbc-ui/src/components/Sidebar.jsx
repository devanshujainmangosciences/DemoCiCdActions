/**
 * This module contains a Sidebar component.
 * <Sidebar
      setToggleSidebar , => (callback) to toggle Sidebar
      toggleSidebar, => (boolean to show toggle on Sidebar)
      theme, => theme or module with which sidebar needs to be rendered 
    </Sidebar>
 */
import React, {useState, useEffect} from 'react';
import SimpleBar from 'simplebar-react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {useTranslation} from 'react-i18next';
import {useLocation, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import SIDEBAR_DATA, {colorMap} from '../config/sidebar';
import {
  Nav,
  Image,
  Button,
  Accordion,
  Navbar,
} from '@themesberg/react-bootstrap';
import {MangoCancerCareSVG} from '../assets/images';
import {
  USER_SELECTED_ROLE,
  PAYMENT_FRAMEWORK,
  ROLES,
  USER_THEME,
  ROLE_ID_MAP,
} from '../constants';
import {captalizeEveryWordOfSentence, forceLogout} from '@/services/utility';
import {onSideBarRouteClicked} from '../actions';
import {secureLocalStorage} from '@/services/web.storage';
import NotificationAlert from './NotificationAlert';
import {
  MenuCollapse,
  MenuExpand,
  MobileProfileAvatar,
  SignoutMobileIcon,
} from '../assets/icons';
export default function Sidebar({toggleSidebar, theme, setToggleSidebar}) {
  const globalState = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(['sidebar']);
  const {userPermissions, myProfile, userSelectedRole} = globalState;
  const selectedRoleName = userSelectedRole?.roleName;
  const selectedRoleId = userSelectedRole?.roleId;

  const selectedRole = localStorage.getItem(USER_THEME);
  const isPatient = selectedRole.toUpperCase() === ROLES.PATIENT.toUpperCase();
  // const isApplicant =
  //   selectedRole.toUpperCase() === ROLES.APPLICANT.toUpperCase();
  const isMangoExecutive = selectedRoleName === ROLES.MANGO_EXECUTIVE;
  const isFinance = selectedRoleName === ROLES.FINANCE;
  const isDoctor = selectedRoleName === ROLES.DOCTOR;
  const isCollapseAllowed = isFinance || isMangoExecutive || isDoctor;
  const location = useLocation();
  const {pathname} = location;
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState(
    SIDEBAR_DATA.find((item) => pathname.indexOf(item.eventKey) !== -1)
      ?.eventKey
  );
  const applicantOverview = useAppSelector(
    (state) => state.applicants.applicantOverview
  );
  const showClass = show ? 'show' : '';
  const path = pathname.split('/')[2];
  const sandwichButtoncss = toggleSidebar ? 'sidebar-close' : '';
  const onCollapse = () => setShow(!show);
  const CollapsableNavItem = (props) => {
    const {eventKey, title, Icon, active, children = null} = props;
    useEffect(() => {
      if (pathname.indexOf(eventKey) !== -1) {
        setEvent(eventKey);
      }
    }, [eventKey]);

    return (
      <>
        <Accordion.Item
          eventKey={eventKey}
          className={`${toggleSidebar && 'shrink-nav-item'}`}>
          <Accordion.Button
            as={Nav.Link}
            className={`${
              active ? `text-${theme}` : ''
            }  d-flex justify-content-between align-items-center`}>
            <span>
              <span className="sidebar-icon">
                <Icon fill={active ? colorMap[theme] : '#4f4d53'} />
              </span>
              <span
                className={`sidebar-text ${active ? `text-${theme}` : ''} `}>
                {title}
              </span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      className,
      target,
      Icon,
      badgeText,
      // badgeBg = 'secondary',
      // badgeColor = 'primary'
    } = props;
    const classNames = badgeText
      ? 'd-flex justify-content-start align-items-center justify-content-between'
      : '';
    const navItemClassName = link === pathname ? 'active' : '';
    const linkProps = external ? {href: link} : {as: Link, to: link};
    return (
      <Nav.Item
        className={`${navItemClassName} ${toggleSidebar && 'shrink-nav-item'}`}
        onClick={() => {
          dispatch(onSideBarRouteClicked(title));
          setShow(false);
        }}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {Icon ? (
              <span className="sidebar-icon nav-item-icon">
                <Icon
                  fill={
                    navItemClassName === 'active' ? colorMap[theme] : '#4f4d53'
                  }
                />
              </span>
            ) : null}
            <span
              className={`nav-title ${
                navItemClassName ? `text-${theme}` : ''
              }  ${className}`}>
              {title}
            </span>
          </span>
        </Nav.Link>
      </Nav.Item>
    );
  };
  /**
   * @param  {Object} item
   */
  const checkRoute = (item) => {
    if (item.isLoanAgainstFD) {
      if (
        applicantOverview?.paymentTypeOpted ===
        PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
      )
        return;
    }
    let toShow =
      userPermissions?.roleDataMap[selectedRoleId].routes[item.uniqueKey];

    if (
      userPermissions?.roles[selectedRoleId].roleName === 'patient' &&
      !userPermissions?.flags.showSchedule &&
      item.uniqueKey === 'vbc-schedule'
    ) {
      toShow = false;
    }

    return toShow;
  };

  const renderSidebar = () => {
    let data = [];
    let item;
    SIDEBAR_DATA.map((navGroup, index) => {
      let toPush = false;
      if (!navGroup.isAccordion) {
        const whetherToShowSubRoute = checkRoute(navGroup);
        if (whetherToShowSubRoute) {
          toPush = true;
          item = (
            <NavItem
              key={navGroup.title + index}
              title={t(navGroup.uniqueKey)}
              className="sidebar-link"
              Icon={navGroup.icon}
              link={navGroup.pathName}
            />
          );
        }
      } else {
        item = (
          <CollapsableNavItem
            eventKey={navGroup.eventKey}
            key={index}
            active={navGroup.eventKey === path ? 'selected' : ''}
            title={t(navGroup.uniqueKey)}
            Icon={navGroup.icon}>
            {
              <>
                {navGroup.listItem &&
                  navGroup.listItem.map((item, index) => {
                    const whetherToShowSubRoute = checkRoute(item);
                    // console.log("NAV GROUP=>", item, whetherToShowSubRoute);
                    if (whetherToShowSubRoute) {
                      toPush = true;
                      return (
                        <NavItem
                          title={t(item.uniqueKey)}
                          key={item.title + index}
                          link={item.pathName}
                        />
                      );
                    }
                    return null;
                  })}
              </>
            }
          </CollapsableNavItem>
        );
      }
      data = toPush ? [...data, item] : [...data];
      return null;
    });
    return data;
  };

  const brandLink = {as: Link, to: ''};

  // console.log('TOGGLE SIDEBAR=>', toggleSidebar);
  // console.log('TOGGLE SIDEBAR FUNCTION=>', setToggleSidebar);

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-white  px-2 d-md-none navbar-theme-mobile">
        <Navbar.Brand className="me-lg-5" {...brandLink}>
          <Image src={MangoCancerCareSVG} className="navbar-brand-light" />
        </Navbar.Brand>
        <div className="ms-auto" style={{marginRight: '21px'}}>
          <NotificationAlert insensitiveTheme={theme} userTheme={theme} />
        </div>

        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
          className={`bg-${theme} font-small`}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} ${sandwichButtoncss} sidebar d-md-block sidebar-bg text-white`}>
          <div className="d-md-flex d-none flex-row align-items-center justify-content-around">
            <img
              alt="mangocancercare"
              src={MangoCancerCareSVG}
              className="mango-logo d-none d-sm-block"
            />
            <div className="side-sw"></div>
            {/* sidebar toggler */}

            {!toggleSidebar && isCollapseAllowed ? (
              // <SandwichButton
              //   css="side-sw"
              //   sidebar
              //   setToggleSidebar={setToggleSidebar}
              // />
              <div
                onClick={setToggleSidebar}
                className="d-flex justify-content-between align-items-center flex-row  side-bar-collapse-buttons">
                <MenuCollapse />
              </div>
            ) : (
              toggleSidebar && (
                <div
                  className="side-bar-collapse-buttons"
                  onClick={setToggleSidebar}>
                  <MenuExpand />
                </div>
              )
            )}
            {/* sidebar toggler */}
          </div>
          <div className="sidebar-inner">
            <div className="d-block d-md-none">
              <Navbar
                expand={false}
                collapseOnSelect
                variant="dark"
                className="navbar-theme-white  px-2 d-md-none navbar-theme-mobile">
                <Navbar.Brand className="me-lg-5" {...brandLink}>
                  <Image
                    src={MangoCancerCareSVG}
                    className="navbar-brand-light"
                  />
                </Navbar.Brand>

                <div className="ms-auto mx-2" style={{height: '42px'}}>
                  <NotificationAlert
                    insensitiveTheme={theme}
                    userTheme={theme}
                  />
                </div>

                <Navbar.Toggle
                  as={Button}
                  aria-controls="main-navbar"
                  onClick={onCollapse}
                  className={`bg-${theme} font-small`}>
                  <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
              </Navbar>
              <div className="user-card px-4 mt-3 align-items-center justify-content-between justify-content-md-center pb-2">
                <div className="d-flex align-items-start gap-2">
                  {/* <div className="user-avatar lg-avatar me-3 text-gray">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size="4x"
                      className="card-img-top rounded-circle border-gray"
                    />
                  </div> */}
                  <div
                    className={`${
                      isPatient && userPermissions?.user?.totalCycles
                        ? 'image-avatar-treatment-start'
                        : 'image-avatar'
                    } `}>
                    <MobileProfileAvatar />
                  </div>
                  <div className="d-block">
                    <div>
                      <span className="welcome-text">Welcome,</span>
                      <span className="text-patient">
                        {' '}
                        {captalizeEveryWordOfSentence(
                          userPermissions?.user?.name
                        )}
                      </span>
                      <span className="ms-2 age-gender">
                        {userPermissions?.user?.age} Y,{' '}
                        {userPermissions?.user?.gender}
                      </span>
                    </div>
                    <div>
                      {isPatient && userPermissions?.user?.totalCycles && (
                        <>
                          <div className=" cycle-details">
                            {`Treatment on
                  ${myProfile?.drug?.brandName}-
                  ${myProfile?.drug?.drugGenericName},`}
                          </div>
                          <div className=" cycle-details">{`Cycle Details ${userPermissions?.user?.completedCycles}/${userPermissions?.user?.totalCycles}`}</div>
                        </>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className={`btn-${theme}-color hover-none signout-button mt-2`}
                      onClick={() => forceLogout()}>
                      {/* <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{' '} */}
                      <SignoutMobileIcon />
                      <span className="ms-2">Sign Out</span>
                    </Button>
                  </div>
                  {/* <Nav.Link
                    className="collapse-close d-md-none text-black"
                    onClick={onCollapse}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Nav.Link> */}
                </div>
              </div>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <Accordion as={Nav.Item} defaultActiveKey={event}>
                <div
                  className="accordation-side-bar custom-side-bar"
                  id={`custom-side-bar-${theme}`}>
                  {renderSidebar()}

                  {/* <NavItem
                    key={uniqueId}
                    title={'Signout'}
                    className="sidebar-link d-block d-md-none "
                    onClick={() => forceLogout()}
                    // Icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                  /> */}
                </div>
              </Accordion>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
}
Sidebar.propTypes = {
  setToggleSidebar: PropTypes.func,
  toggleSidebar: PropTypes.bool,
  role: PropTypes.string,
};
