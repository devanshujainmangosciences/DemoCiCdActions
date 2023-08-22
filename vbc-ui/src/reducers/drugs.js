/**
 * This Reducer contains the global state which holds drugsList, selectedDrug,
 * status, pagination Informations dedicated for Drugs. This Module performs
 * create, update, read and delete Drug. Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_CREATE_DRUG,
  SET_READ_DRUG,
  SET_UPDATE_DRUG,
  SET_DELETE_DRUG,
  SET_SHOW_DRUG,
} = actionTypes;

const initialState = {
  drugsList: null,
  selectedDrug: null,
  status: null,
  pagination: null,
};

export default function drugs(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_DRUG:
      return {...state, selectedDrug: payload};
    case SET_READ_DRUG:
      return {
        ...state,
        drugsList: payload.content,
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
    case SET_UPDATE_DRUG:
      return {...state, selectedDrug: payload};
    case SET_DELETE_DRUG:
      return {...state, selectedDrug: payload};
    case SET_SHOW_DRUG:
      return {...state, selectedDrug: payload};
    default:
      return state;
  }
}
