import * as Sentry from '@sentry/browser';
import {store} from '../redux/store';
import {splitCamelCaseString} from '@/services/utility';
import {actionTypes} from '../constants';
const {SET_LOADER, SET_TOAST, FORCE_LOGOUT} = actionTypes;

/**
 * Force Logout
 */
export const accessDenied = () => ({
  type: FORCE_LOGOUT,
  payload: '',
});

/**
 * Set Api Error
 * @param {String} message
 */
export const apiError = (message, type) => {
  if (type === 'BAD_REQUEST') {
    if (message && message.length > 0) {
      // console.log('FIELD ERROR=>', message);
      let errorMessage = '';
      message.map((item, index, items) => {
        errorMessage = `${errorMessage} ${splitCamelCaseString(item?.field)} ${
          item?.message
        }${index === items?.length - 1 ? '.' : ','}`;
      });
      // errorMessage = errorMessage + ' is required field !';
      return {
        type: SET_TOAST,
        payload: {
          message: errorMessage,
          isShowToast: true,
          toastType: 'warning',
        },
      };
    } else {
      return {
        type: SET_TOAST,
        payload: {
          message: 'Please fill all mandatory details',
          isShowToast: true,
          toastType: 'warning',
        },
      };
    }
  } else {
    return {
      type: SET_TOAST,
      payload: {
        message,
        isShowToast: true,
        toastType: 'warning',
      },
    };
  }
};

/**
 * Sets Api start
 * @param {Boolean} value
 */
export const apiStart = (value) => ({
  type: SET_LOADER,
  payload: value,
});

/**
 * Sets Api End
 * @param {Boolean} value
 */
export const apiEnd = (value) => ({
  type: SET_LOADER,
  payload: value,
});

/**
 *
 * @param {*} error The error can be string or object
 * @param {*} showReport This will be to show the crashreport dialog, by default it will be true
 */
export const apiErrorReport = (error, showReport = true) => {
  const reqError = error?.response?.data ? error?.response?.data : error;
  const state = store.getState();
  const email = state?.app?.keycloak?.userInfo?.email;
  Sentry.configureScope((scope) => scope.setLevel('Error').setUser({email}));
  Sentry.captureException(reqError);
  if (showReport)
    Sentry.showReportDialog({
      labelName: `Name:`,
      labelEmail: 'Email:',
    });
};
