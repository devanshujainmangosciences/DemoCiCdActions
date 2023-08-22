/** This is the main entry point for a web application. It imports
necessary dependencies such as React, ReactDOMClient, Provider, BrowserRouter, and store. It also
imports stylesheets and the AppContainer component. Additionally, it sets up Sentry for error
tracking and initializes it with the appropriate configuration. Finally, it renders the AppContainer
component wrapped in Provider and BrowserRouter components, which provide access to the Redux store
and routing functionality, respectively. The rendered component is then attached to the root element
of the HTML document. */
import React from 'react';
import './i18n';
import * as ReactDOMClient from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {store} from './redux/store';
// core styles
import './scss/volt.scss';
// vendor styles
// import '@fortawesome/fontawesome-free/css/all.css';
import AppContainer from './pages/AppContainer';
import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';

/**
 * Sentry Configuration
 */
if (process.env.NODE_ENV !== 'development')
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DNS,
    beforeBreadcrumb(breadcrumb) {
      if (breadcrumb.category === 'console') {
        return null;
      }
      return breadcrumb;
    },
    integrations: [new BrowserTracing()],
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.2,
    environment: process.env.NODE_ENV,
  });

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <AppContainer />
    </BrowserRouter>
  </Provider>
);
