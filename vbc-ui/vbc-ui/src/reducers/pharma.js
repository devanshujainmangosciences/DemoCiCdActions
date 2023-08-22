/**
 * This Reducer contains the global state dedicated for
 * pharma i.e patientRecruitmentAndConversion, newPatientStats, patientLongitudinality,
 * survivalAndResponse, DiscontinuationAndAdverseEvents, PatientReportedOutcomes, IndividualPatientData,
 * SalesAndFreePacks, PerPatientRevenue. Reducer takes initialState, action type
 * and payload as argument and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_PATIENT_RECRUITMENT_AND_CONVERSION,
  SET_NEW_PATIENT_STATS,
  SET_PATIENT_LONGITUDINALITY,
  SET_SURVIVAL_AND_RESPONSE,
  SET_DISCONTINUATION_AND_ADVERSE_EVENTS,
  SET_PATIENT_REPORTED_OUTCOMES,
  SET_INDIVIDUAL_PATIENT_DATA,
  SET_SALES_AND_FREE_PACKS,
  SET_PER_PATIENT_REVENUE,
} = actionTypes;

const initialState = {
  patientRecruitmentAndConversion: '',
  newPatientStats: '',
  patientLongitudinality: '',
  survivalAndResponse: '',
  DiscontinuationAndAdverseEvents: '',
  PatientReportedOutcomes: '',
  IndividualPatientData: '',
  SalesAndFreePacks: '',
  PerPatientRevenue: '',
};
export default function pharma(state = initialState, {type, payload}) {
  switch (type) {
    case SET_PATIENT_RECRUITMENT_AND_CONVERSION:
      return {...state, patientRecruitmentAndConversion: payload};
    case SET_NEW_PATIENT_STATS:
      return {...state, newPatientStats: payload};
    case SET_PATIENT_LONGITUDINALITY:
      return {...state, patientLongitudinality: payload};
    case SET_SURVIVAL_AND_RESPONSE:
      return {...state, survivalAndResponse: payload};
    case SET_DISCONTINUATION_AND_ADVERSE_EVENTS:
      return {...state, DiscontinuationAndAdverseEvents: payload};
    case SET_PATIENT_REPORTED_OUTCOMES:
      return {...state, PatientReportedOutcomes: payload};
    case SET_INDIVIDUAL_PATIENT_DATA:
      return {...state, IndividualPatientData: payload};
    case SET_SALES_AND_FREE_PACKS:
      return {...state, SalesAndFreePacks: payload};
    case SET_PER_PATIENT_REVENUE:
      return {...state, PerPatientRevenue: payload};
    default:
      return state;
  }
}
