import {secureLocalStorage} from '@/services/web.storage';
import {actionTypes, endpoints, USER_ID} from '../constants';
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
  REDIRECT,
  API,
} = actionTypes;

/**
 * Get Patient Reported Outcomes Data
 * @returns Array
 */
export const getPatientReportedOutcomes = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_PATIENT_REPORTED_OUTCOMES,
    payload: response,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getPatientReportedOutcomes = {
    url: endpoints.PATIENT_REPORTED_OUTCOMES,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getPatientReportedOutcomes});
};

/**
 * get Patient Recruitment And Conversion Data
 * @returns Array
 */
export const getPatientRecruitmentAndConversion = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_PATIENT_RECRUITMENT_AND_CONVERSION,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getPatientRecruitmentAndConversion = {
    url: endpoints.PATIENT_RECRUITMENT_AND_CONVERSION,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getPatientRecruitmentAndConversion});
};

/**
 * get New Patient Stats Data
 * @returns Array
 */
export const getNewPatientStats = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_NEW_PATIENT_STATS,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getNewPatientStats = {
    url: endpoints.NEW_PATIENT_STATS,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getNewPatientStats});
};

/**
 * get Patient Longitudinality Data
 * @returns Array
 */
export const getPatientLongitudinality = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_PATIENT_LONGITUDINALITY,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getPatientLongitudinality = {
    url: endpoints.PATIENT_LONGITUDINALITY,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getPatientLongitudinality});
};

/**
 * get Survival And Response Data
 * @returns Array
 */
export const getSurvivalAndResponse = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_SURVIVAL_AND_RESPONSE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getSurvivalAndResponse = {
    url: endpoints.SURVIVAL_AND_RESPONSE,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getSurvivalAndResponse});
};

/**
 * get Discontinuation And Adverse Events Data
 * @returns Array
 */
export const getDiscontinuationAndAdverseEvents = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_DISCONTINUATION_AND_ADVERSE_EVENTS,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getDiscontinuationAndAdverseEvents = {
    url: endpoints.DISCONTINUATION_AND_ADVERSE_EVENTS,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getDiscontinuationAndAdverseEvents});
};

/**
 * get Individual Patient Data
 * @returns Array
 */
export const getIndividualPatientData = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_INDIVIDUAL_PATIENT_DATA,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getIndividualPatientData = {
    url: endpoints.INDIVIDUAL_PATIENT_DATA,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getIndividualPatientData});
};

/**
 * get Sales And Free Packs Data
 * @returns Array
 */
export const getSalesAndFreePacks = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_SALES_AND_FREE_PACKS,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getSalesAndFreePacks = {
    url: endpoints.SALES_AND_FREE_PACKS,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getSalesAndFreePacks});
};

/**
 * get Per Patient Revenue Data
 * @returns Array
 */
export const getPerPatientRevenue = () => async (dispatch) => {
  const userId = secureLocalStorage.getItem(USER_ID);
  const queryParams = {};
  userId && (queryParams['userid'] = userId);
  const onSuccess = (response) => ({
    type: SET_PER_PATIENT_REVENUE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getPerPatientRevenue = {
    url: endpoints.PER_PATIENT_REVENUE,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getPerPatientRevenue});
};
