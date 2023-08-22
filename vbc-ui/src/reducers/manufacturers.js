/**
 * This Reducer contains the global state which holds manufacturersList,
 * selectedManufacturer, status, pagination Information dedicated for
 * manufacturers. This Module performs create, update, read and delete Manufacturers.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_CREATE_MANUFACTURER,
  SET_READ_MANUFACTURER,
  SET_UPDATE_MANUFACTURER,
  SET_ALL_MANUFACTURER,
  SET_DELETE_MANUFACTURER,
  SET_SHOW_MANUFACTURER,
} = actionTypes;

const initialState = {
  manufacturer: null,
  manufacturersList: null,
  selectedManufacturer: null,
  status: null,
  pagination: null,
};

export default function manufacturers(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_MANUFACTURER:
      return {...state, selectedManufacturer: payload};
    case SET_ALL_MANUFACTURER:
      return {...state, manufacturer: payload};
    case SET_READ_MANUFACTURER:
      return {
        ...state,
        manufacturersList: payload.content,
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
    case SET_UPDATE_MANUFACTURER:
      return {...state, selectedManufacturer: payload};
    case SET_DELETE_MANUFACTURER:
      return {...state, selectedManufacturer: payload};
    case SET_SHOW_MANUFACTURER:
      return {...state, selectedManufacturer: payload};
    default:
      return state;
  }
}
