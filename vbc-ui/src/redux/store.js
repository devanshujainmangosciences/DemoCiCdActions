/**
 * Store function is the global redux store
 * It enables logging and redux dev tool when used in developnment
 * Redux Thunk middleware is used, it basically allows us to write action creators that return a function instead of an action
 */
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import apiMiddleware from '../services/apiMiddleware';
import * as Sentry from '@sentry/react';
import {sentryTransformedAction, sentryTransformedState} from './sentryConfig';

/**
 * Sentry Configuration for Redux to manage sensitive data that is passed to the sentry
 */
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options
  actionTransformer: (action) => sentryTransformedAction(action),
  stateTransformer: (state) => sentryTransformedState(state),
});

/**
 * This function is explicitly used for testing
 * @param {Object} preloadedState
 * @returns {Object}
 */
export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiMiddleware),
    preloadedState,
  });
};

const isDev = process.env.NODE_ENV === 'development';
/**
 * Creation of store using reduxtoolkit library
 */
export const store = configureStore({
  reducer: rootReducer,
  enhancers: [sentryReduxEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddleware),
  devTools: isDev ? true : false,
});
