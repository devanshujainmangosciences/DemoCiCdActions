/**
 * Sentry Configuration
 */

import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

//Initializes sentry to trace errors and API calls on each screen user navigates to.
export const initializeSentry = () => {
  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  Sentry.init({
    dsn: Config.SENTRY_DSN,
    integrations: [
      new Sentry.ReactNativeTracing({
        idleTimeout: 5000,
        routingInstrumentation: routingInstrumentation,
        tracingOrigins: [/^https:\/\//, /^\//],
        maxTransactionDuration: 0,
      }),
    ],
    tracesSampleRate: 1.0,
  });

  return routingInstrumentation;
};
