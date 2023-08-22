import {actionTypes, endpoints} from '../constants';

const {SET_READ_PERMISSION_LIST, SET_SHOW_PERMISSION, REDIRECT, API} =
  actionTypes;

/**
 * Create new Permission
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createPermission = (data, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createPermission = {
    url: endpoints.CREATE_PERMISSION,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createPermission});
};

/**
 *  Delete Selected Permission
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deletePermission = (id, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_PERMISSION}/${id}`
    : endpoints.DELETE_PERMISSION;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deletePermission = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deletePermission});
};

/**
 * Read Permissions List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readPermissionList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => ({
      type: SET_READ_PERMISSION_LIST,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readPermissionList = {
      url: endpoints.READ_PERMISSION,
      method: 'POST',
      data: filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readPermissionList});
  };

/**
 * Show Selected Permission
 * @param {Integer} id
 * @returns Array
 */
export const showPermission = (id) => async (dispatch) => {
  const url = id
    ? `${endpoints.SHOW_PERMISSION}/${id}`
    : endpoints.SHOW_PERMISSION;
  const onSuccess = (response) => ({
    type: SET_SHOW_PERMISSION,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showPermission = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showPermission});
};

/**
 * Update Selected Permission
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updatePermssion = (id, data, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_PERMISSION}/${id}`
    : endpoints.UPDATE_PERMISSION;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updatePermssion = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updatePermssion});
};
