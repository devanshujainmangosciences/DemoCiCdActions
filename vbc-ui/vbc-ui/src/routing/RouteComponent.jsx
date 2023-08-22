/**
 * This is a React component that renders a custom route with a toast and preloader based on the app
 * state and user theme.
 * @returns The code exports a React component called `RouteComponent`.
 */

import {USER_THEME} from '../constants';
import React from 'react';
import {useAppSelector} from '@/redux/redux-hooks';
import {CustomRoute, CustomToast, Preloader} from '../components';
import isEqual from 'lodash/isEqual';

/**
 * This function avoids rerender of RouteWrapper Component
 * return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
 * @param {Object} prevProps 
 * @param {Object} nextProps 
 * @returns {Boolean}
 */
function areEqual(prevProps, nextProps) {
  return isEqual(prevProps, nextProps);
}

const RouteComponent = React.memo(function RouteComponent({
  routeItem,
  children,
}) {
  const appData = useAppSelector((state) => state.app);
  const toast = useAppSelector((state) => state.app.toast);
  const userTheme = localStorage.getItem(USER_THEME);
  if (routeItem.isSidebar) {
    return (
      <CustomRoute
        Component={routeItem.component}
        toast={toast}
        showLoader={appData?.loader}
        redirectTo={appData?.redirectTo}
        theme={userTheme}
        translatePage={routeItem.translatePage}
        breadcrumb={routeItem.breadcrumb}
        role={routeItem.role}
      />
    );
  } else {
    return (
      <>
        <CustomToast
          showToast={toast.showToast}
          message={toast.message}
          toastType={toast.toastType}
          redirect={toast?.redirect}
          translatePage={routeItem.translatePage}
          breadcrumb={routeItem.breadcrumb}
          role={routeItem.role}
        />
        <Preloader show={appData?.loader} />
        {children}
      </>
    );
  }
},
areEqual);

export default RouteComponent;
