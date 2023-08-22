/**
 * This Reducer contains the global state which holds usersList, selectedUser,
 * status, pagination Information  dedicated for Lenders.
 *  This Module performs create, update, read and delete Lenders.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_READ_LENDER,
  SET_DELETE_LENDER,
  SET_SHOW_LENDER,
  RESET_SELECTED_LENDER,
} = actionTypes;

const initialState = {
  usersList: null,
  selectedUser: null,
  status: null,
  pagination: null,
};

export default function lenders(state = initialState, {type, payload}) {
  switch (type) {
    case SET_READ_LENDER:
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
    case SET_DELETE_LENDER:
      return {...state, usersList: null};
    case SET_SHOW_LENDER:
      return {...state, selectedUser: payload};
    case RESET_SELECTED_LENDER:
      return {...state, selectedUser: null};
    default:
      return state;
  }
}
