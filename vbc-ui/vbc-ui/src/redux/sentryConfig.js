import {actionTypes} from '../constants';

/**
 * This functions return the action if action payload has sensitive data
 * @param {*} action
 * @returns {*}
 */
export const sentryTransformedAction = (action) => {
  if (action.type === actionTypes.PASSWORD_CHANGED) {
    return null;
  }
  if (action.type === actionTypes.SET_MY_PROFILE) {
    return null;
  }
  if (action.type === actionTypes.SET_KEYCLOAK) {
    return null;
  }
  return action;
};

/**
 * This function makes the sensitive state data null and also transforms the state if required
 * @param {*} state
 * @returns {*} state
 */
export const sentryTransformedState = (state) => {
  if (state.app.keycloak) {
    // Returning keycloak state null as we do not want to send the state
    return null;
  }
  if (state.loanApplication) {
    // Returning loanApplication data state null as we do not want to send the state
    return null;
  }
  // Transform the state to remove sensitive information
  const transformedState = {
    ...state,
    clinicalDetails: {
      ...state.clinicalDetails,
      surgicalDetails: null,
      labReports: null,
      patientTimelineUrl: null,
      medications: null,
      radiologyReports: null,
      otherTests: null,
      clinicalNotes: null,
      summaries: null,
      radiationTherapy: null,
      otherTreatment: null,
    },
    app: {
      ...state.app.myProfile,
      birthDate: null,
      mobile: null,
      homeContactNumber: null,
      diagnosis: null,
      aadharNumber: null,
      panNumber: null,
      mrn: null,
    },
  };

  return transformedState;
};
