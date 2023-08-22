/**
 * This Reducer contains the global state which holds surgicalDetails, labReports,
 * medications, radiologyReports, clinicalNotes, summaries Informations dedicated for
 * clinical details tab in sidebar i.e Surgical details, Medications, Rediology Reports,
 * Lab Reports, Clinical Notes, Summaries. Reducer takes initialState, action type
 * and payload as argument and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_SURGICAL_DETAILS,
  SET_LAB_REPORTS,
  SET_MEDICATION_DETAILS,
  SET_RADIOLOGY_REPORTS,
  SET_CLINICAL_NOTES,
  SET_SUMMARIES,
  SET_IFRAME_URL,
  SET_OTHER_TESTS,
  SET_RADIATION_THERAPY,
  SET_OTHER_TREATMENT,
  REPORTS_SYNC_FLAG,
} = actionTypes;

const initialState = {
  surgicalDetails: null,
  labReports: null,
  patientTimelineUrl: '',
  medications: null,
  radiologyReports: null,
  otherTests: null,
  clinicalNotes: null,
  summaries: null,
  radiationTherapy: null,
  otherTreatment: null,
  dataSynchronized: null,
};

export default function clinicalDetails(state = initialState, {type, payload}) {
  switch (type) {
    case SET_SURGICAL_DETAILS:
      return {
        ...state,
        surgicalDetails: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_LAB_REPORTS:
      return {
        ...state,
        labReports: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_MEDICATION_DETAILS:
      return {
        ...state,
        medications: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_RADIOLOGY_REPORTS:
      return {
        ...state,
        radiologyReports: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_OTHER_TESTS:
      return {
        ...state,
        otherTests: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_RADIATION_THERAPY:
      return {
        ...state,
        radiationTherapy: payload,
      };
    case SET_OTHER_TREATMENT:
      return {
        ...state,
        otherTreatment: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_CLINICAL_NOTES:
      return {
        ...state,
        clinicalNotes: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_SUMMARIES:
      return {
        ...state,
        summaries: {
          reports: payload.reports,
          years: payload.years,
          additionalData: payload.additionalData,
        },
      };
    case SET_IFRAME_URL:
      return {...state, patientTimelineUrl: payload};
    case REPORTS_SYNC_FLAG:
      return {...state, dataSynchronized: payload};
    default:
      return state;
  }
}
