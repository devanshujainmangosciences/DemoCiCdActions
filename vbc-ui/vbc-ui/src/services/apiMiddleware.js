/**
 * This module contains API middleware which handle error handling from API globally.
 * recieves action with payload contaning information regarding the API
 * 
 * This is a middleware function for handling API requests in a Redux application. It intercepts
 * actions with a specific type (`API`) and sends the corresponding API request using the `axios`
 * library. It also handles error responses and dispatches appropriate actions to update the Redux
 * store. The middleware function also sets default configurations for `axios`, such as the base URL
 * and headers, and can handle different types of request data (JSON, form data, etc.).
 *    url: URL Endpoint
      method: GET/POST/PUT
      data:requestBody
      authorization -: If authorization is true Auth header will be added, needs to send false if API is not protected
      onSuccess:- Function callback in case of API success
      onFailure:-Function callback in case of API faliure
      showLoader:- if true shows the loader in screen
      headers:- Headers what we want to pass in API call
      responseType:- Type of expected response
      applicationMultiPartHeader:- If true the header sent will be multipart
      applicationJSONHeader :- if true the heaer sent will be JSON(By default its true)
      applicationPlainText = if true, the header sent will be plain text(By default its false)
      formUrlHeader :- if true, the header sent will be of form type
      sentryReport determins if report needs to be dispached in case of default error.
 */

import axios from 'axios';
import {actionTypes, TOKEN, XSRF_TOKEN, XSRF_TOKEN_HEADER} from '../constants';
import {
  accessDenied,
  apiError,
  apiStart,
  apiEnd,
  apiErrorReport,
} from '../actions';
import {Routes} from '@/routes';
import {trimmer} from '@/services/utility';
import {secureLocalStorage} from './web.storage';

const {API} = actionTypes;

const apiMiddleware =
  ({dispatch}) =>
  (next) =>
  (action) => {
    if (action) {
      next(action);
    }
    if (!action || action.type !== API) return;

    const {
      url,
      method,
      data,
      authorization = true,
      onSuccess,
      onFailure,
      showLoader,
      headers,
      responseType,
      params,
      applicationMultiPartHeader = false,
      applicationJSONHeader = true,
      applicationPlainText = false,
      formUrlHeader = false,
      sentryReport = true,
      handleError = true,
    } = action.payload;

    const trimmedData =
      data && !applicationMultiPartHeader ? trimmer(data) : data;

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

    // axios default configs
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
    const SHOW_CONSOLE_LOGS = import.meta.env.VITE_SHOW_CONSOLE_LOGS;

    if (authorization) {
      const access_token = secureLocalStorage.getItem(TOKEN);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    }
    if (applicationJSONHeader) {
      axios.defaults.headers.common['Content-Type'] = 'application/json';
    }
    if (applicationMultiPartHeader) {
      axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
      if (process.env.NODE_ENV !== 'development')
        axios.defaults.headers.common['type'] = 'formData';
    }

    if (formUrlHeader) {
      axios.defaults.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded';
    }
    if (showLoader) {
      dispatch(apiStart(true));
    }
    let requestConfig = {
      url,
      method,
      headers: applicationPlainText
        ? {...headers, 'Content-Type': 'text/plain'}
        : headers,
      [dataOrParams]: applicationPlainText ? data : trimmedData,
      responseType: responseType,
    };
    if (params) requestConfig['params'] = params;

    const xsfrToken1 = secureLocalStorage.getItem(XSRF_TOKEN);
    // const xsfrToken2 = getCookie(XSRF_TOKEN);
    // console.log('CSRF TOKEN1=>', xsfrToken1);
    // console.log('CSRF TOKEN2=>', xsfrToken1);
    const newHeaders = {
      ...requestConfig.headers,
      [XSRF_TOKEN_HEADER]: xsfrToken1,
    };
    requestConfig['headers'] = newHeaders;
    axios
      .request(requestConfig)
      .then(({data}) => {
        dispatch(onSuccess(data));
      })
      .catch((error) => {
        const status = error?.response?.status || null;

        if (SHOW_CONSOLE_LOGS) {
          console.error(error.response);
        }
        if (handleError)
          switch (status) {
            case 401:
            case 403: {
              // console.log('force logout');
              dispatch(accessDenied(window.location.pathname));
              apiErrorReport(error, false);
              break;
            }
            case 400: {
              if (
                error.response.data.status === 'BAD_REQUEST' &&
                error.response.data.parameters?.fieldErrors
              ) {
                dispatch(
                  apiError(
                    error.response.data.parameters?.fieldErrors,
                    'BAD_REQUEST'
                  )
                );
              } else {
                dispatch(apiError(error.response.data.message));
              }
              break;
            }
            case 404: {
              dispatch(onFailure(Routes.NotFound.path));
              dispatch(apiError(error.response.data.detail));
              apiErrorReport(error);
              break;
            }
            default: {
              if (sentryReport) apiErrorReport(error);
              dispatch(onFailure(Routes.ServerError.path));
              dispatch(apiError(error.response.data.detail));
              break;
            }
          }
        else dispatch(onFailure());
      })
      .finally(() => {
        if (showLoader) {
          dispatch(apiEnd(false));
        }
      });
  };

export default apiMiddleware;
