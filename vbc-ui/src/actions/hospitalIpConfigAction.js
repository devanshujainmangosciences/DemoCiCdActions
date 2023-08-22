import {formatEndpoint} from '@/services/utility';
import {actionTypes, endpoints} from '../constants';

const {
  SET_ALL_HOSPITALS_IP_CONFIG,
  SET_SINGLE_HOSPITAL_IP_CONFIG,
  CREATE_HOSPITAL_IP_CONFIG,
  UPDATE_HOSPITAL_IP_CONFIG,
  DELETE_HOSPITAL_IP_CONFIG,
  REDIRECT,
  API,
} = actionTypes;

/**
 * Create new Hospital IP Config
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createHospitalIpConfig =
  (data, onSuccessCallback) => async (dispatch) => {
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback(response);
      dispatch({
        type: CREATE_HOSPITAL_IP_CONFIG,
        payload: response.data,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const createHospitalIp = {
      url: endpoints.CREATE_HOSPITAL_IP_CONFIG,
      method: 'POST',
      data: data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: createHospitalIp});
  };

/**
 *  Delete Selected Hospital IP Config
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteHospitalIpConfig =
  (id, onSuccessCallback) => async (dispatch) => {
    const url = formatEndpoint(endpoints.DELETE_HOSPITAL_IP_CONFIG, [id]);
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback(response);
      dispatch({
        type: DELETE_HOSPITAL_IP_CONFIG,
        payload: response.data,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const deleteHospitalIpConfig = {
      url: url,
      method: 'POST',
      data: null,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: deleteHospitalIpConfig});
  };

/**
 * Read Permissions List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readHospitalIpConfigList =
  (pageNumber, size) => async (dispatch) => {
    let queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    queryParams['sort'] = 'id';
    const onSuccess = (response) => ({
      type: SET_ALL_HOSPITALS_IP_CONFIG,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readHospitalIps = {
      url: endpoints.GET_ALL_HOSPITALS_IP_CONFIG,
      method: 'GET',
      data: null,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readHospitalIps});
  };

/**
 * Show Selected Hospital Config
 * @param {Integer} id
 * @returns Array
 */
export const showHospitalIpConfig = (id) => async (dispatch) => {
  const url = formatEndpoint(endpoints.GET_SINGLE_HOSPITAL_IP_CONFIG, [id]);
  const onSuccess = (response) => ({
    type: SET_SINGLE_HOSPITAL_IP_CONFIG,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showConfig = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showConfig});
};

/**
 * Update Selected Hospital Config
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateHospitalIpConfig =
  (id, data, onSuccessCallback) => async (dispatch) => {
    const url = formatEndpoint(endpoints.UPDATE_HOSPITAL_IP_CONFIG, [id]);
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback(response);
      dispatch({
        type: UPDATE_HOSPITAL_IP_CONFIG,
        payload: response.data,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const updateHospitalConfig = {
      url: url,
      method: 'POST',
      data: data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateHospitalConfig});
  };
