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

const {SET_READ_USER, SET_SHOW_USER, GET_USER_DETAILS} = actionTypes;

const initialState = {
  usersList: null,
  selectedUser: null,
  status: null,
  pagination: null,
  userDetails: null,
};

export default function users(state = initialState, {type, payload}) {
  switch (type) {
    case SET_READ_USER:
      return {
        ...state,
        usersList: payload.content,
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
    case SET_SHOW_USER:
      return {...state, selectedUser: payload};
    case GET_USER_DETAILS:
      return {...state, userDetails: payload};
    default:
      return state;
  }
}
