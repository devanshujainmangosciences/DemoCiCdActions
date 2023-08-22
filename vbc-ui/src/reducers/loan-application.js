/**
 * This Reducer contains the global state which holds amount, enrollForVbc,
 * financialInformation Information dedicated for loanApplication.
 * This Module perform get amount, get enroll for vbc, get financial inforamtion
 * informations and update the financial informations.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_AMOUNT,
  SET_LOAN_DETAIL,
  SET_ENROLL_FOR_VBC,
  SET_FINANCIAL_INFORMATION,
  SET_REQUIRED_DOCUMENT,
  SET_VBC_SCHEDULE,
  SET_VBC_DRUG_SCHEDULE,
  SET_ACKNOWLEDGE_FIRST_GRANT,
  SET_CANCEL_APPLICANT,
  SET_REAPPLY_APPLICANT,
  SET_SUBMIT_TO_MANGO_EXECUTIVE,
  SET_JUMP_PBP_STEP,
} = actionTypes;

const initialState = {
  amount: null,
  loanDetail: null,
  enrollForVbc: null,
  financialInformation: null,
  requiredDocuments: null,
  schedule: null,
  drugSchedule: null,
  acknowledgeFirstGrant: null,
  cancelApplication: null,
  reapplyApplication: null,
  submitToMangoExecutive: null,
  jumpProgramStep: false,
};

export default function loanApplication(state = initialState, {type, payload}) {
  switch (type) {
    case SET_AMOUNT:
      return {...state, amount: payload.data};
    case SET_LOAN_DETAIL:
      return {...state, loanDetail: payload};
    case SET_ENROLL_FOR_VBC:
      return {...state, enrollForVbc: payload};
    case SET_FINANCIAL_INFORMATION:
      return {...state, financialInformation: payload};
    case SET_REQUIRED_DOCUMENT:
      return {...state, requiredDocuments: payload};
    case SET_VBC_SCHEDULE:
      return {...state, schedule: payload};
    case SET_VBC_DRUG_SCHEDULE:
      return {...state, drugSchedule: payload};
    case SET_ACKNOWLEDGE_FIRST_GRANT:
      return {...state, acknowledgeFirstGrant: payload};
    case SET_CANCEL_APPLICANT:
      return {...state, cancelApplication: payload};
    case SET_REAPPLY_APPLICANT:
      return {...state, reapplyApplication: payload};
    case SET_SUBMIT_TO_MANGO_EXECUTIVE:
      return {...state, submitToMangoExecutive: payload};
    case SET_JUMP_PBP_STEP:
      return {...state, jumpProgramStep: payload};
    default:
      return state;
  }
}
