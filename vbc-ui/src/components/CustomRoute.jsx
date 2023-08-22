/**
 * This module helps to wrap route to perform some action gloablly.
 * Passing any react component inside of this component -
 * will helps to render that react component.
 * For example: If You want to have a page - Add Applicant for the logged in patient 
 * then you have to pass Applicant page as a component in this route wrapper.
 * <CustomRoute
      showLoader, => boolean to show loader while having any aysncronous call
      Component, => component to render for the current Route
      userPermissions, => First API hit after login to get permission and routes accessable
      history, => history object from react router to perform navigation 
      location, => location object from react router to perform navigation 
      toast, => toast object with message and boolean and type to show toast on the page.
      keycloak => keycloak object which we get from keycloak adapter to perform some actions related to user login.
    </CustomRoute>
  * IMPORTANT:
  * userPermissions prop is required.
 */
import React, {useState, useEffect, Suspense} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
const Sidebar = React.lazy(() => import('../components/Sidebar'));
const Navbar = React.lazy(() => import('../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));
const CustomToast = React.lazy(() => import('../components/Toast'));
const Preloader = React.lazy(() => import('../components/Preloader'));
import {getNotifications, getUserPermissions} from '@/actions';
import PropTypes from 'prop-types';
// import {withRouter} from 'react-router';
import {Routes} from '@/routes';
import {USER_ID, USER_SELECTED_ROLE} from '../constants';
import CustomBreadcrumb from './Breadcrumb';
import {secureLocalStorage} from '@/services/web.storage';
import {checkIfRouteIsProtected} from '@/services/utility';
import {useNavigate, Navigate} from 'react-router-dom';
import SuspenseFallbackLoader from './SuspenseFallbackLoader';

function CustomRoute(props) {
  // console.log('CUSTOM ROUTES PROPS=>', props);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const userPermissions = useAppSelector((state) => state.app.userPermissions);
  const keycloak = useAppSelector((state) => state.app.keycloak);
  const notifications = useAppSelector((state) => state.app.notifications);
  const mangoAccountId = secureLocalStorage.getItem(USER_ID);
  const {showLoader, Component, toast, translatePage, breadcrumb, role, theme} =
    props;
  /**
   * toggle sidebar to hide/show
   */
  const handletoggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const {showToast, message, toastType} = toast;

  /**
   * get user permissions
   * by callling admin permissions api app action
   */
  useEffect(() => {
    if (keycloak && !userPermissions) {
      dispatch(getUserPermissions());
    }
  }, [keycloak, dispatch]);
  useEffect(() => {
    if (!notifications && mangoAccountId) {
      // console.log('CALL HAPPENED USEEFFECT[] in Custom Route');
      dispatch(getNotifications(mangoAccountId, 0, 5));
    }
  }, [notifications]);

  useEffect(() => {
    // console.log(
    //   '%cTHIS RENDERED=>',
    //   'background: #222; color: #bada55',
    //   userPermissions
    // );
    if (userPermissions) {
      let locationPathName = location?.pathname;
      if (locationPathName === '/') {
        /** if user just enters domain name
         * eg - localhost:3000 or
         * vbc.mangosciences.com,
         * then redirect user to its role default location
         */
        const selectedRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
        const roleDefaultRoute =
          userPermissions.roleDataMap[selectedRole].defaultRoute.url;

        history(roleDefaultRoute);
      } else {
        const isProtected = checkIfRouteIsProtected(
          userPermissions,
          location.pathname
        );

        if (!isProtected) {
          // console.log('IS PROTECTED=>', isProtected);
          history(Routes.NotPermitted.path);
        }
      }
    }
  }, [userPermissions, history, location?.pathname]);

  const mainContentcss = toggleSidebar ? 'content-close' : '';

  if (props.redirectTo) {
    return <Navigate to={props.redirectTo} />;
  }

  return (
    userPermissions && (
      <>
        <Suspense fallback={<SuspenseFallbackLoader />}>
          <Preloader show={showLoader} />
        </Suspense>
        <Suspense fallback={<SuspenseFallbackLoader />}>
          <CustomToast
            showToast={showToast}
            message={message}
            toastType={toastType}
            redirect={toast?.redirect}
          />
        </Suspense>
        <Suspense fallback={<SuspenseFallbackLoader />}>
          <Sidebar
            toggleSidebar={toggleSidebar}
            setToggleSidebar={handletoggleSidebar}
            theme={theme}
            userPermissions={userPermissions}
          />
        </Suspense>
        <main className={`content ${mainContentcss}`}>
          <Suspense fallback={<SuspenseFallbackLoader />}>
            <Navbar
              toggleSidebar={toggleSidebar}
              setToggleSidebar={handletoggleSidebar}
              theme={theme}
            />
          </Suspense>
          <div className="right-pane">
            {breadcrumb && (
              <Suspense fallback={<SuspenseFallbackLoader />}>
                <CustomBreadcrumb
                  translatePage={translatePage}
                  breadcrumb={breadcrumb}
                  role={role}
                  theme={theme}
                />
              </Suspense>
            )}
            <Component {...props} />
          </div>
        </main>
        <Footer />
      </>
    )
  );
}

const mapStateToProps = (state) => ({
  userPermissions: state.app.userPermissions,
  keycloak: state.app.keycloak,
  userSelectedRole: state.app.userSelectedRole,
});

const mapDispatchToProps = {};
CustomRoute.propTypes = {
  showLoader: PropTypes.bool,
  role: PropTypes.string,
  Component: PropTypes.elementType,
  userPermissions: PropTypes.object,
  toast: PropTypes.object,
  keycloak: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomRoute);
