/**
 * This Reducer contains the global state which holds usersList, selectedUser,
 * status, pagination Information dedicated for
 * Users. This Module performs Create, Update, Read and Delete Users.
 * Reducer takes initialState, action  type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  LIST_HOLIDAY_FOR_YEAR,
  LIST_SUNDAYS_FOR_YEAR,
  SET_PROGRAM_LIST,
  SET_PROGRAM,
  SET_MEDICATION_SCHEDULE,
  SET_USERS_WITH_DEVICE_TOKEN,
  SET_MOBILE_VERSION_LIST_BACKEND,
  SET_MOBILE_VERSION_BACKEND,
  SET_MOBILE_VERSION_LIST_ANDROID,
  SET_MOBILE_VERSION_ANDROID,
  SET_MOBILE_VERSION_IOS,
  SET_MOBILE_VERSION_LIST_IOS,
  SET_MOBILE_VERSION_MAPPING,
  SET_ALL_BACKEND_VERSION,
  SET_ALL_IOS_VERSION,
  SET_ALL_ANDROID_VERSION,
} = actionTypes;

const initialState = {
  sundayList: null,
  holidayList: null,
  programList: null,
  selectedProgram: null,
  usersWithDeviceToken: null,
  mobileVersionManagement: {
    androidVersionList: null,
    androidVersionListAll: null,
    iosVersionList: null,
    iosVersionListAll: null,
    backendVersionList: null,
    backendVersionListAll: null,
    androidVersion: null,
    iosVersion: null,
    backendVersion: null,
    versionMapping: null,
    pagination: null,
  },
};

export default function users(state = initialState, {type, payload}) {
  switch (type) {
    case LIST_HOLIDAY_FOR_YEAR:
      return {...state, holidayList: payload};
    case LIST_SUNDAYS_FOR_YEAR:
      return {...state, sundayList: payload};
    case SET_PROGRAM_LIST:
      return {...state, programList: payload};
    case SET_PROGRAM:
      return {...state, selectedProgram: payload};
    case SET_MEDICATION_SCHEDULE:
      return {...state, medicationScheduleList: payload};
    case SET_USERS_WITH_DEVICE_TOKEN:
      return {...state, usersWithDeviceToken: payload};
    case SET_MOBILE_VERSION_LIST_BACKEND:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          backendVersionList: payload.content,
          pagination: {
            first: payload.first,
            last: payload.last,
            number: payload.number,
            numberOfElements: payload.numberOfElements,
            pageable: payload.pageable,
            size: payload.pageSize,
            totalElements: payload.totalElements,
            totalPages: payload.totalPages,
            empty: payload.empty,
          },
        },
      };
    case SET_MOBILE_VERSION_BACKEND:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          backendVersion: payload,
        },
      };
    case SET_MOBILE_VERSION_LIST_ANDROID:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          androidVersionList: payload.content,
          pagination: {
            first: payload.first,
            last: payload.last,
            number: payload.number,
            numberOfElements: payload.numberOfElements,
            pageable: payload.pageable,
            size: payload.pageSize,
            totalElements: payload.totalElements,
            totalPages: payload.totalPages,
            empty: payload.empty,
          },
        },
      };
    case SET_MOBILE_VERSION_ANDROID:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          androidVersion: payload,
        },
      };
    case SET_MOBILE_VERSION_LIST_IOS:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          iosVersionList: payload.content,
          pagination: {
            first: payload.first,
            last: payload.last,
            number: payload.number,
            numberOfElements: payload.numberOfElements,
            pageable: payload.pageable,
            size: payload.pageSize,
            totalElements: payload.totalElements,
            totalPages: payload.totalPages,
            empty: payload.empty,
          },
        },
      };
    case SET_MOBILE_VERSION_IOS:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          iosVersion: payload,
        },
      };
    case SET_MOBILE_VERSION_MAPPING:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          versionMapping: payload,
        },
      };
    case SET_ALL_ANDROID_VERSION:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          androidVersionListAll: payload.content,
        },
      };
    case SET_ALL_IOS_VERSION:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          iosVersionListAll: payload.content,
        },
      };
    case SET_ALL_BACKEND_VERSION:
      return {
        ...state,
        mobileVersionManagement: {
          ...state.mobileVersionManagement,
          backendVersionListAll: payload.content,
        },
      };
    default:
      return state;
  }
}
