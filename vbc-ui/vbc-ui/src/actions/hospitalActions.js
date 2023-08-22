import {actionTypes, endpoints} from '../constants';
const {SET_READ_HOSPITAL, REDIRECT, API, SET_SHOW_HOSPITAL} = actionTypes;

/**
 * Create a new Hospital
 * @param {Object} body
 * @param {Callback} onSuccess
 * @returns {Promise}
 */
export const createHospital = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createHospital = {
    url: endpoints.CREATE_HOSPITAL,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createHospital});
};

/**
 * Gets the Hospitals List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns {Promise}
 */
export const readHospitals =
  (pageNumber, size, filter = []) =>
  async (dispatch) => {
    const queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => ({
      type: SET_READ_HOSPITAL,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readHospitals = {
      url: endpoints.READ_HOSPITAL,
      method: 'POST',
      data: filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readHospitals});
  };

/**
 *
 * @param {Integer} id
 * @returns {Promise}
 */
/** Show the selected Hospital **/
export const showHospital = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_HOSPITAL}/${id}` : endpoints.SHOW_HOSPITAL;
  const onSuccess = (response) => ({
    type: SET_SHOW_HOSPITAL,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showHospital = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showHospital});
};

/**
 * Update the selected Hospital
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns {Promise}
 */
export const updateHospital = (id, data, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_HOSPITAL}/${id}`
    : endpoints.UPDATE_HOSPITAL;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateHospital = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateHospital});
};

/**
 * Delete the selected Hospital
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns {Promise}
 */
export const deleteHospital = (id, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_HOSPITAL}/${id}`
    : endpoints.DELETE_HOSPITAL;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteHospital = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteHospital});
};
