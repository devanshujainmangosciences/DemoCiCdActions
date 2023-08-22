/**
 * This Reducer contains the global state which resourceList, selectedResource,
 * status, pagination Information dedicated for
 * Resources. This Module performs create, update, read and delete Resources,
 * update resource permissions and multiple resource permissions.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_RESOURCE_UPDATE_PERMISSIONS,
  SET_CREATE_RESOURCE,
  SET_DELETE_RESOURCE,
  SET_READ_RESOURCE_LIST,
  SET_SHOW_RESOURCE,
  SET_UPDATE_RESOURCE,
  SET_UPDATE_MULTI_RESOURCE_PERMISSIONS,
} = actionTypes;

const initialState = {
  resourceList: null,
  selectedResource: null,
  status: null,
  pagination: null,
};
export default function resource(state = initialState, {type, payload}) {
  switch (type) {
    case SET_RESOURCE_UPDATE_PERMISSIONS:
      return {...state, selectedResource: payload};
    case SET_CREATE_RESOURCE:
      return {...state, status: payload};
    case SET_DELETE_RESOURCE:
      return {...state, selectedResource: payload};
    case SET_READ_RESOURCE_LIST:
      return {
        ...state,
        resourceList: payload.content,
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
    case SET_SHOW_RESOURCE:
      return {...state, selectedResource: payload};
    case SET_UPDATE_RESOURCE:
      return {...state, selectedResource: payload};
    case SET_UPDATE_MULTI_RESOURCE_PERMISSIONS:
      return {...state, resourceList: payload};
    default:
      return state;
  }
}
