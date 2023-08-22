/**
 * This Reducer contains the global state which holds doctorsList, selectedDoctor,
 * status, pagination Informations dedicated for Doctors. This Module performs create, update, read and delete doctors.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_CREATE_DOCTOR,
  SET_READ_DOCTOR,
  SET_READ_DOCTOR_REMOVE_PAGINATION,
  SET_UPDATE_DOCTOR,
  SET_DELETE_DOCTOR,
  SET_SHOW_DOCTOR,
  SET_DOCTORS_PATIENTS_LIST,
} = actionTypes;

const initialState = {
  doctorsList: null,
  selectedDoctor: null,
  status: null,
  pagination: null,
  doctorsPatientsList: null,
};

export default function doctors(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_DOCTOR:
      return {...state, selectedDoctor: payload};
    case SET_READ_DOCTOR:
      return {
        ...state,
        doctorsList: payload.content,
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
    case SET_READ_DOCTOR_REMOVE_PAGINATION:
      return {
        ...state,
        doctorsList: payload.content,
      };
    case SET_DOCTORS_PATIENTS_LIST:
      return {
        ...state,
        doctorsPatientsList: payload.content,
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
    case SET_UPDATE_DOCTOR:
      return {...state, selectedDoctor: payload};
    case SET_DELETE_DOCTOR:
      return {...state, selectedDoctor: payload};
    case SET_SHOW_DOCTOR:
      return {...state, selectedDoctor: payload};
    default:
      return state;
  }
}
