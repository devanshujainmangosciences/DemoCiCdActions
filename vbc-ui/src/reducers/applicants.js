/**
 * This Reducer contains the global state which holds applicantsList, applicant
 * Informations dedicated for applicants. This Module performs create, update, read and delete applicants.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_READ_APPLICANTS_LIST,
  SET_CREATE_APPLICANT,
  SET_UPDATE_APPLICANT,
  SET_DELETE_APPLICANT,
  SET_APPLICANT_OVERVIEW,
} = actionTypes;

const initialState = {
  applicantsList: null,
  applicant: null,
  applicantOverview: null,
};

export default function applicants(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_APPLICANT:
      return {...state, applicant: payload};
    case SET_UPDATE_APPLICANT:
      return {...state, applicant: payload};
    case SET_DELETE_APPLICANT:
      return {...state, applicant: payload};
    case SET_READ_APPLICANTS_LIST:
      return {...state, applicantsList: payload};
    case SET_APPLICANT_OVERVIEW:
      return {...state, applicantOverview: payload};
    default:
      return state;
  }
}
