import {actionTypes, endpoints} from '../constants';

const {SET_READ_MANUFACTURER, SET_SHOW_MANUFACTURER, REDIRECT, API} =
  actionTypes;

/**
 * Create Manufacturer
 * @param {Object} body
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createManufacturer = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createManufacturer = {
    url: endpoints.CREATE_MANUFACTURER,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createManufacturer});
};

/**
 * Read Manufacturers List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readManufacturers = (pageNumber, size) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  const onSuccess = (response) => ({
    type: SET_READ_MANUFACTURER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readManufacturers = {
    url: endpoints.READ_MANUFACTURER,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readManufacturers});
};

/**
 * Show Selected Manufacturer
 * @param {Integer} id
 * @returns Array
 */
export const showManufacturer = (id) => async (dispatch) => {
  const url = id
    ? `${endpoints.SHOW_MANUFACTURER}/${id}`
    : endpoints.SHOW_MANUFACTURER;
  const onSuccess = (response) => ({
    type: SET_SHOW_MANUFACTURER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showManufacturer = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showManufacturer});
};

/**
 * Update Selected Manufacturer
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateManufacturer = (id, data, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_MANUFACTURER}/${id}`
    : endpoints.UPDATE_MANUFACTURER;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateManufacturer = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateManufacturer});
};

/**
 * Delete selected Manufacturer
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteManufacturer = (id, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_MANUFACTURER}/${id}`
    : endpoints.DELETE_MANUFACTURER;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteManufacturer = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteManufacturer});
};
