/**
 * This Reducer contains the global state which holds :-
          patientsList
          pagination
          patientDetails
          patientId
          appointmentDate
          assingDoctorToPatient
          assignLenderToPatient
          patientStatus
          assignTreatmentDateToPatient
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_MANGO_EXECUTIVE_PATIENT_LIST,
  SET_MANGO_EXECUTIVE_PATIENT_DETAILS,
  SET_PATIENT_ID,
  SET_PATIENT_STATUS_TO_AWARE,
  SET_APPOINTMENT_DATE_TO_PATIENT,
  SET_DOCTOR_TO_PATIENT,
  SET_LENDER_TO_PATIENT,
  SET_TREATMENT_DATE_TO_PATIENT,
  SET_PENDING_PATIENTS_LIST,
  SET_APPROVAL_REG_LIST,
  RESET_PATIENT_DETAILS,
  ACKNOWLEDGE_REBATE_PAID,
  ACKNOWLEDGE_SUBVENTION_PAID,
  GET_ELIGIBLE_CYCLE_FOR_CONVERSION,
} = actionTypes;

const initialState = {
  patientsList: [],
  pagination: null,
  patientDetails: {
    currentLenderId: null,
    generalInformation: null,
    id: null,
    patientReportedOutcomes: null,
    presentDoctorId: null,
    treatment: null,
    vbcProgram: null,
    vbcSchedule: [],
  },
  patientId: null,
  appointmentDate: null,
  assingDoctorToPatient: null,
  assignLenderToPatient: null,
  patientStatus: null,
  assignTreatmentDateToPatient: null,
  rebatePaid: null,
  subventionPaid: null,
  pendingApprovalRequest: null,
  eligibleCycleForConversion: null,
};

export default function mangoExecutive(state = initialState, {type, payload}) {
  switch (type) {
    case SET_MANGO_EXECUTIVE_PATIENT_LIST:
      return {
        ...state,
        patientsList: payload.content,
        pagination: {
          first: payload.first,
          last: payload.last,
          number: payload.number,
          numberOfElements: payload.numberOfElements,
          pageable: payload.pageable,
          size: payload.pageSize,
          totalElements: payload.totalElements,
          totalPages: payload.totalPages,
          empty: payload.empty,
        },
      };
    case SET_PENDING_PATIENTS_LIST:
      return {
        ...state,
        pendingPatientsList: payload.content,
        pagination: {
          first: payload.first,
          last: payload.last,
          number: payload.number,
          numberOfElements: payload.numberOfElements,
          pageable: payload.pageable,
          size: payload.pageSize,
          totalElements: payload.totalElements,
          totalPages: payload.totalPages,
          empty: payload.empty,
        },
      };
    case SET_APPROVAL_REG_LIST:
      return {
        ...state,
        pendingApprovalRequest: payload.content,
        pagination: {
          first: payload.first,
          last: payload.last,
          number: payload.number,
          numberOfElements: payload.numberOfElements,
          pageable: payload.pageable,
          size: payload.pageSize,
          totalElements: payload.totalElements,
          totalPages: payload.totalPages,
          empty: payload.empty,
        },
      };
    case SET_MANGO_EXECUTIVE_PATIENT_DETAILS:
      return {...state, patientDetails: payload};
    case RESET_PATIENT_DETAILS:
      return {
        ...state,
        patientDetails: {
          currentLenderId: null,
          generalInformation: null,
          id: null,
          patientReportedOutcomes: null,
          presentDoctorId: null,
          treatment: null,
          vbcProgram: null,
          vbcSchedule: [],
        },
      };
    case SET_PATIENT_ID:
      return {...state, patientId: payload};
    case SET_PATIENT_STATUS_TO_AWARE:
      return {...state, patientStatus: payload};
    case SET_APPOINTMENT_DATE_TO_PATIENT:
      return {...state, appointmentDate: payload};
    case SET_DOCTOR_TO_PATIENT:
      return {...state, assingDoctorToPatient: payload};
    case SET_LENDER_TO_PATIENT:
      return {...state, assignLenderToPatient: payload};
    case SET_TREATMENT_DATE_TO_PATIENT:
      return {...state, assignTreatmentDateToPatient: payload};
    case ACKNOWLEDGE_REBATE_PAID:
      return {...state, rebatePaid: payload};
    case ACKNOWLEDGE_SUBVENTION_PAID:
      return {...state, subventionPaid: payload};
    case GET_ELIGIBLE_CYCLE_FOR_CONVERSION:
      return {...state, eligibleCycleForConversion: payload};
    default:
      return state;
  }
}
