import {actionTypes, endpoints} from '../constants';

const {
  SET_READ_ROLE_LIST,
  SET_RESOURCE_PERMISSIONS,
  SET_SHOW_ROLE,
  REDIRECT,
  API,
  SET_TOAST,
  SET_UPDATE_ROLE_ACCESS,
} = actionTypes;

/**
 * Create a new Role
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createRole = (data, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createRole = {
    url: endpoints.CREATE_ROLE,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createRole});
};

/**
 * Delete the selected Role
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteRole = (id, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.DELETE_ROLE}/${id}` : endpoints.DELETE_ROLE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteRole = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteRole});
};

/**
 * Get the Role List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readRoleList = (pageNumber, size) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  const onSuccess = (response) => ({
    type: SET_READ_ROLE_LIST,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readRoleList = {
    url: endpoints.READ_ROLE_LIST,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readRoleList});
};

/**
 * Get the Resource Permission List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readResourcePermissionList =
  (pageNumber, size) => async (dispatch) => {
    const queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => ({
      type: SET_RESOURCE_PERMISSIONS,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readResourcePermissionList = {
      url: endpoints.READ_RESOURCE_PERMISSION_LIST,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readResourcePermissionList});
  };

/**
 *  Show the selected Role
 * @param {Integer} id
 * @returns Array
 */
export const showRole = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_ROLE}/${id}` : endpoints.SHOW_ROLE;
  const onSuccess = (response) => ({
    type: SET_SHOW_ROLE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showRole = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showRole});
};

/**
 * Update the selected Role
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateRole = (id, data, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.UPDATE_ROLE}/${id}` : endpoints.UPDATE_ROLE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateRole = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateRole});
};

/**
 *  Update the Role Access
 * @param {Object} data
 * @returns Array
 */
export const updateRoleAccess = (data) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.message) {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
      });
    }
    return {
      type: SET_UPDATE_ROLE_ACCESS,
      payload: response.data,
    };
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateRoleAccess = {
    url: endpoints.UPDATE_ROLE_ACCESS,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateRoleAccess});
};
