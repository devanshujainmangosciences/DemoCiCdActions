/**
 * This Reducer contains the global state which holds permissionList,
 * selectedPermission, status, pagination Information dedicated for
 * permission. This Module performs create, update, read and delete Permission.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_ALL_HOSPITALS_IP_CONFIG,
  SET_SINGLE_HOSPITAL_IP_CONFIG,
  CREATE_HOSPITAL_IP_CONFIG,
  UPDATE_HOSPITAL_IP_CONFIG,
  DELETE_HOSPITAL_IP_CONFIG,
} = actionTypes;

const initialState = {
  hospitalIpConfigList: null,
  selectedIpConfig: null,
  status: null,
  pagination: null,
};

export default function permission(state = initialState, {type, payload}) {
  switch (type) {
    case CREATE_HOSPITAL_IP_CONFIG:
      return {...state, status: payload};
    case SET_ALL_HOSPITALS_IP_CONFIG:
      return {
        ...state,
        hospitalIpConfigList: payload.content,
        pagination: {
          first: payload.first,
          last: payload.last,
          number: payload.number,
          numberOfElements: payload.numberOfElements,
          pageable: payload.pageable,
          size: payload.size,
          totalElements: payload.totalElements,
          totalPages: payload.totalPages,
        },
      };
    case UPDATE_HOSPITAL_IP_CONFIG:
      return {...state, status: payload};
    case DELETE_HOSPITAL_IP_CONFIG:
      return {...state, status: payload};
    case SET_SINGLE_HOSPITAL_IP_CONFIG:
      return {...state, selectedIpConfig: payload};
    default:
      return state;
  }
}
