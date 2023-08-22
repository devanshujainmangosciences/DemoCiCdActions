/**
 * This Reducer contains the global state which roleList, resourcePermissions,
 * selectedRole, pagination, createResponse Information dedicated for
 * Roles. This Module performs create, update, read and delete Roles, update role access,
 * set resource persmissions. Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_CREATE_ROLE,
  SET_UPDATE_ROLE,
  SET_READ_ROLE_LIST,
  SET_DELETE_ROLE,
  SET_SHOW_ROLE,
  SET_UPDATE_ROLE_ACCESS,
  SET_RESOURCE_PERMISSIONS,
} = actionTypes;

const initialState = {
  roleList: null,
  resourcePermissions: null,
  selectedRole: null,
  pagination: null,
  createResponse: null,
};

export default function role(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_ROLE:
      return {...state, createResponse: payload};
    case SET_READ_ROLE_LIST:
      return {
        ...state,
        roleList: payload.content,
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
    case SET_UPDATE_ROLE:
      return {...state, selectedRole: payload};
    case SET_RESOURCE_PERMISSIONS:
      return {...state, resourcePermissions: payload.content};
    case SET_DELETE_ROLE:
      return {...state, selectedRole: payload};
    case SET_SHOW_ROLE:
      return {...state, selectedRole: payload};
    case SET_UPDATE_ROLE_ACCESS:
      return {...state, selectedRole: payload};
    default:
      return state;
  }
}
