/**
 * This Reducer contains the global state which holds keycloakuserInfo, userPermissions,
 * iframeUrl, loader, userSelectedRole, registeredPatient, toast, myProfile,
 * redirectTo Inforamtions dedicated for Authencitations, loading Function, Pop in and Pop out Toast, Roles, Force logout,
 * permissions, redirecting, register and verifying patients. Reducer takes initialState,
 * action type and payload as argument and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';
import {forceLogout, updateObject} from '@/services/utility';

const {
  SET_USER_DATA,
  SET_LOADER,
  SET_KEYCLOAK,
  SET_PERMISSIONS,
  FORCE_LOGOUT,
  SET_TOAST,
  SET_REGISTERED_PATIENT,
  SET_MY_PROFILE,
  VERIFY_REGISTERED_PATIENT,
  REDIRECT,
  SAVE_NOTIFICATION_IN_STORE,
  LOAD_NOTIFICATIONS,
  PASSWORD_CHANGED,
  TOKEN_REFRESHED,
  SET_SELECTED_ROLE,
} = actionTypes;

const initialState = {
  keycloak: null,
  userInfo: null,
  userPermissions: null,
  loader: false,
  loaderCount: 0,
  userSelectedRole: {
    roleId: null,
    roleName: null,
  },
  registeredPatient: {id: null, name: '', mobile: '', email: '', token: ''},
  toast: {showToast: false, message: '', toastType: 'success'},
  myProfile: null,
  redirectTo: null,
  notifications: null,
  passwordChanged: null,
  tokenRefreshed: 0,
};
const saveNotificationInStore = (state, payload) => {
  const prevNotifications = {...state.notifications};
  const prevContent = [...state.notifications.content];
  prevContent.unshift(payload);
  prevNotifications.content = prevContent;
  prevNotifications.unreadElements = prevNotifications.unreadElements + 1;
  prevNotifications.totalElements = prevNotifications.totalElements + 1;
  prevNotifications.numberOfElements = prevNotifications.numberOfElements + 1;
  // prevNotifications;
  const updatedState = {
    notifications: prevNotifications,
  };
  return updateObject(state, updatedState);
};

const setLoaderValue = (state, payload) => {
  let newTrueCount = state?.loaderCount;
  let value = state?.loader;

  if (payload) newTrueCount = newTrueCount + 1;
  else newTrueCount = newTrueCount - 1;

  if (newTrueCount === 0) value = false;
  else value = true;
  // console.log('VALUE=>', value);
  const updatedState = {
    loaderCount: newTrueCount,
    loader: value,
  };
  return updateObject(state, updatedState);
};
export default function app(state = initialState, {type, payload}) {
  switch (type) {
    case SET_USER_DATA:
      return {...state, userInfo: payload};
    case SET_PERMISSIONS:
      return {...state, userPermissions: payload};
    case SET_LOADER:
      return setLoaderValue(state, payload);
    case SET_TOAST:
      return {
        ...state,
        toast: {
          showToast: payload.isShowToast,
          message: payload.message,
          toastType: payload.toastType,
          redirect: payload?.redirect ? payload.redirect : '',
        },
      };
    case SET_KEYCLOAK:
      return {...state, keycloak: payload};
    case FORCE_LOGOUT: {
      forceLogout(state.keycloak);
      return {...state, keycloak: null};
    }
    case SET_REGISTERED_PATIENT:
      return {
        ...state,
        registeredPatient: {
          id: payload.id,
          name: payload.name,
          mobile: payload.mobile,
          email: payload.email,
        },
      };
    case VERIFY_REGISTERED_PATIENT:
      return {
        ...state,
        registeredPatient: {
          ...state.registeredPatient,
          token: payload.token,
        },
      };
    case SET_MY_PROFILE:
      return {...state, myProfile: payload};
    case REDIRECT:
      return {...state, redirectTo: payload};
    case SAVE_NOTIFICATION_IN_STORE:
      return saveNotificationInStore(state, payload);
    case LOAD_NOTIFICATIONS:
      return {...state, notifications: payload};
    case PASSWORD_CHANGED:
      return {...state, passwordChanged: payload};
    case TOKEN_REFRESHED:
      return {...state, tokenRefreshed: state.tokenRefreshed + 1};
    case SET_SELECTED_ROLE:
      return {...state, userSelectedRole: payload};
    default:
      return state;
  }
}
