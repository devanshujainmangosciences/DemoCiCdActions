import {actionTypes, endpoints} from '../constants';

const {API, SET_TOAST, SET_READ_APPLICANTS_LIST, SET_APPLICANT_OVERVIEW} =
  actionTypes;

/**
 * Gets the Applicants List
 * @returns Array of Applicants
 */
export const readApplicantsList = () => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_READ_APPLICANTS_LIST,
    payload: response,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const readApplicantsList = {
    url: endpoints.READ_APPLICANTS_LIST,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readApplicantsList});
};

/**
 * Takes Body Object as argument and Create a new Applicant
 * @param {Object} body
 * @param {Function} onSuccess
 *
 */
export const createApplicant = (body, onSuccess) => async (dispatch) => {
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const createApplicant = {
    url: endpoints.CREATE_APPLICANT,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createApplicant});
};

/**
 * Takes the updated applicant object and update the applicant using id
 * @param {Integer} id
 * @param {Object} data
 * @param {Function} onSuccess
 *
 */
export const updateApplicant = (id, data, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_APPLICANT}/${id}`
    : endpoints.UPDATE_APPLICANT;
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const updateApplicant = {
    url: url,
    method: 'POST',
    data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateApplicant});
};

/**
 * Deletes the applicants using id
 * @param {Integer} id
 * @param {Function} onSuccess
 *
 */
export const deleteApplicant = (id, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELELTE_APPLICANT}/${id}`
    : endpoints.DELELTE_APPLICANT;
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const readApplicantsList = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readApplicantsList});
};

/**
 * Gets the applicant overview details
 * @returns {Object}
 */
export const getApplicantOverview = () => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_APPLICANT_OVERVIEW,
    payload: response.data,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const getApplicantOverview = {
    url: endpoints.GET_APPLICANT_OVERVIEW,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getApplicantOverview});
};
