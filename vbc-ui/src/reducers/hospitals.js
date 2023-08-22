/**
 * This Reducer contains the global state which holds hospitalsList, selectedHospital,
 * status,pagination Informations dedicated for Hospitals. This Module performs create, update, read and delete Hospitals.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_CREATE_HOSPITAL,
  SET_READ_HOSPITAL,
  SET_UPDATE_HOSPITAL,
  SET_DELETE_HOSPITAL,
  SET_SHOW_HOSPITAL,
} = actionTypes;

const initialState = {
  hospitalsList: null,
  selectedHospital: null,
  status: null,
  pagination: null,
};

export default function hospitals(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_HOSPITAL:
      return {...state, selectedHospital: payload};
    case SET_READ_HOSPITAL:
      return {
        ...state,
        hospitalsList: payload.content,
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
    case SET_UPDATE_HOSPITAL:
      return {...state, selectedHospital: payload};
    case SET_DELETE_HOSPITAL:
      return {...state, selectedHospital: payload};
    case SET_SHOW_HOSPITAL:
      return {...state, selectedHospital: payload};
    default:
      return state;
  }
}
