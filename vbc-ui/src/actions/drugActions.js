import {actionTypes, endpoints} from '../constants';
import {setToast} from './appActions';

const {SET_READ_DRUG, REDIRECT, API, SET_SHOW_DRUG} = actionTypes;

/**
 * Create a new Drug
 * @param {Object} body
 * @param {Callback} onSuccess
 * @returns {Array}
 */
/**  **/
export const createDrug = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createDrug = {
    url: endpoints.CREATE_DRUG,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createDrug});
};

/**
 * Reads the Drugs List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns {Array}
 */
export const readDrugs = (pageNumber, size, filter) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  const onSuccess = (response) => ({
    type: SET_READ_DRUG,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readDrugs = {
    url: endpoints.READ_DRUG,
    method: 'POST',
    data: filter,
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readDrugs});
};

/**
 * Show the selected Drug
 * @param {Integer} id
 * @returns {Array}
 */
/** Show the selected Drug **/
export const showDrug = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_DRUG}/${id}` : endpoints.SHOW_DRUG;
  const onSuccess = (response) => ({
    type: SET_SHOW_DRUG,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showDrug = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showDrug});
};

/**
 *
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns {Array}
 */
/** Update the selected Drug **/
export const updateDrug = (id, data, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.UPDATE_DRUG}/${id}` : endpoints.UPDATE_DRUG;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateDrug = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateDrug});
};

/**
 *
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns {Array}
 */
/** Delete the selected Drug **/
export const deleteDrug = (id, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.DELETE_DRUG}/${id}` : endpoints.DELETE_DRUG;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteDrug = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteDrug});
};

/**
 * This apis sets the drugs visible status.
 * @param {Number} drugId
 * @param {Boolean} visible
 *
 */
export const toggelDrugVisibility =
  (drugId, visible, customOnSuccess) => async (dispatch) => {
    const reqData = {
      drugId,
      visible,
    };

    const onSuccess = (response) => {
      // console.log('SUCCESS RESPONES=>', response);
      customOnSuccess && customOnSuccess();
      dispatch(setToast(response.message, true, 'success'));
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const toggelDrug = {
      url: endpoints.TOGGLE_DRUG_VISIBILITY,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: toggelDrug});
  };
