/**
 * This module defines all the Redux actions
 * for Applicant's Loan Application screens
 */
import {actionTypes} from '../constants';

const {APPLICANT_PROGRAM} = actionTypes;

/**
 * stores applicant's loan application api response into redux store
 */
export const saveApplicantLoanApplicationAction = (transformedData) => {
  return {
    type: APPLICANT_PROGRAM,
    payload: transformedData,
  };
};
