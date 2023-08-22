/**
 * Redux login reducer that manages multiple global states
 * related to login flow.
 */
import {actionTypes} from '../constants';
import EncryptedStorageKeys from '../constants/EncryptedStorageKeys';
import {storeInEncryptedStorage} from '../utils';

const {
  LOGIN_API_SUCCESS,
  LOGOUT,
  LOGIN_API_ADMIN_SUCCESS,
  USER_PERMISSIONS,
  REGISTER_SUCCESS,
  VERIFY_OTP_SUCCESS,
  MASTER_DATA,
  SECRETS_DATA,
} = actionTypes;

const initialState = {
  loginData: null, // login api data
  logout: false,
  apiAdminLoginData: null,
  userPermissions: null,
  registerData: null, // to store register api response
  verifyOtpData: null, // to store verify-otp api response
  masterData: null, // to store all master data used for dropdown values,
  secretsData: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_API_SUCCESS: {
      storeInEncryptedStorage(
        EncryptedStorageKeys.LOGGED_IN_USER_DATA,
        JSON.stringify(payload)
      );
      return {
        ...state,
        logout: false,
        loginData: payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        logout: payload,
      };
    }
    case USER_PERMISSIONS: {
      const {permissionsData, loginData} = payload;
      return {
        ...state,
        userPermissions: permissionsData,
        loginData: loginData || state.loginData,
      };
    }
    case MASTER_DATA: {
      return {...state, masterData: payload};
    }
    case SECRETS_DATA: {
      return {...state, secretsData: payload};
    }
    case LOGIN_API_ADMIN_SUCCESS: {
      return {...state, apiAdminLoginData: payload};
    }
    case REGISTER_SUCCESS: {
      return {...state, registerData: payload};
    }
    case VERIFY_OTP_SUCCESS: {
      return {...state, verifyOtpData: payload};
    }
    default:
      return state;
  }
};
