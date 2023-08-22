/**
 * This module defines all the Redux actions
 */
import {actionTypes} from '../constants';

const {
  LOGIN_API_SUCCESS,
  LOGOUT,
  LOGIN_API_ADMIN_SUCCESS,
  USER_PERMISSIONS,
  REGISTER_SUCCESS,
  VERIFY_OTP_SUCCESS,
  MASTER_DATA,
  REPORTS_SYNC_STATUS,
  SECRETS_DATA,
} = actionTypes;

// LOGIN API
export const loginApiSuccessAction = (loginApiData) => {
  return {
    type: LOGIN_API_SUCCESS,
    payload: loginApiData,
  };
};

// SECRETS API
export const getSecretsDataSuccessAction = (secretsData) => {
  return {
    type: SECRETS_DATA,
    payload: secretsData,
  };
};

// LOGOUT
export const logoutAction = (type) => {
  return {
    type: LOGOUT,
    payload: type,
  };
};

// LOGIN APIADMIN
export const loginApiAdminSuccessAction = (loginApiAdminData) => {
  return {
    type: LOGIN_API_ADMIN_SUCCESS,
    payload: loginApiAdminData,
  };
};

/**
 * save user permissions
 * If user is already logged in -
 * we also send loginData as a second parameter -
 * to store asyncstorage data in redux state
 */
export const getUserPermissionsAction = (permissionsData, loginData) => {
  return {
    type: USER_PERMISSIONS,
    payload: {permissionsData, loginData},
  };
};

/**
 * save master data to be used
 * for all dropdown values
 */
export const getMasterDataAction = (masterData) => {
  return {
    type: MASTER_DATA,
    payload: masterData,
  };
};

// save register api response
export const registerDataAction = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

// save verify otp response
export const verifyOtpDataAction = (data) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: data,
  };
};

/** to clear redux store */
export const logout = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};

export const reportsSyncStatusAction = (syncStatus) => {
  return {
    type: REPORTS_SYNC_STATUS,
    payload: syncStatus,
  };
};
