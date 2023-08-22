/**
 * Redux login reducer that manages multiple global states
 * related to applicant flow.
 */
import {actionTypes} from '../constants';

const {APPLICANT_OVERVIEW, APPLICANT_PROGRAM} = actionTypes;

const initialState = {
  applicantOverviewData: null, // storing applicant overview data
  applicantProgramData: null, // storing applicant's loan application data
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case APPLICANT_OVERVIEW: {
      return {...state, applicantOverviewData: payload};
    }
    case APPLICANT_PROGRAM: {
      return {...state, applicantProgramData: payload};
    }
    default:
      return state;
  }
};
