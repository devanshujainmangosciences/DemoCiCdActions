/**
 * This Module Wrap the whole Application this is the first component which start the application
 * it renders all protected and non pretected routes from here from a routeConfig.
 * IMPORTANT:
 * showLoader, toast, redirectTo, userPermissions are required
 */
import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {NotFound} from './errors';

import RouteComponent from '../routing/RouteComponent';
import PrivateRoute from '../routing/PrivateRoute';
import SuspenseFallbackLoader from '../components/SuspenseFallbackLoader';
import {routeConfig} from '../config/routeConfig';

const AppContainer = () => {
  return (
    <Routes>
      {routeConfig.map((routeItem) => {
        const Component = routeItem.component;
        if (routeItem.isProtected) {
          return (
            <Route
              key={routeItem.id}
              path={routeItem.path}
              element={
                <Suspense fallback={<SuspenseFallbackLoader />}>
                  <PrivateRoute routeItem={routeItem}>
                    <Component />
                  </PrivateRoute>
                </Suspense>
              }
            />
          );
        } else {
          return (
            <Route
              key={routeItem.id}
              path={routeItem.path}
              element={
                <Suspense fallback={<SuspenseFallbackLoader />}>
                  <RouteComponent routeItem={routeItem}>
                    <Component />
                  </RouteComponent>
                </Suspense>
              }
            />
          );
        }
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppContainer;
