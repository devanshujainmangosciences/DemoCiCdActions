/**
 * This module defines all the Redux actions
 * for Applicant module
 */
import {actionTypes} from '../constants';

const {APPLICANT_OVERVIEW} = actionTypes;

// storing applicant overview api data
export const storeApplicantOverviewDataAction = (data) => {
  return {
    type: APPLICANT_OVERVIEW,
    payload: data,
  };
};
