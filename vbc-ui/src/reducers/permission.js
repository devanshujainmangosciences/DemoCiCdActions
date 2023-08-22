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
  SET_CREATE_PERMISSION,
  SET_READ_PERMISSION_LIST,
  SET_UPDATE_PERMISSION,
  SET_DELETE_PERMISSION,
  SET_SHOW_PERMISSION,
} = actionTypes;

const initialState = {
  permissionList: null,
  selectedPermission: null,
  status: null,
  pagination: null,
};

export default function permission(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_PERMISSION:
      return {...state, status: payload};
    case SET_READ_PERMISSION_LIST:
      return {
        ...state,
        permissionList: payload.content,
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
    case SET_UPDATE_PERMISSION:
      return {...state, selectedPermission: payload};
    case SET_DELETE_PERMISSION:
      return {...state, permissionList: payload};
    case SET_SHOW_PERMISSION:
      return {...state, selectedPermission: payload};
    default:
      return state;
  }
}
