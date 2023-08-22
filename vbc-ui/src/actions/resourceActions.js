import {actionTypes, endpoints} from '../constants';

const {
  SET_RESOURCE_UPDATE_PERMISSIONS,
  SET_READ_RESOURCE_LIST,
  SET_SHOW_RESOURCE,
  REDIRECT,
  API,
  SET_UPDATE_MULTI_RESOURCE_PERMISSIONS,
  SET_TOAST,
} = actionTypes;

/**
 * Update Resource Permissions
 * @param {Object} data
 * @returns Array
 */
export const updateResourcePermissions = (data) => async (dispatch) => {
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
      type: SET_RESOURCE_UPDATE_PERMISSIONS,
      payload: response.data,
    };
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateResourcePermissions = {
    url: endpoints.UPDATE_RESOURCE_PERMISSIONS,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateResourcePermissions});
};

/**
 * Create a new Resource
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createResource = (data, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createResource = {
    url: endpoints.CREATE_RESOURCE,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createResource});
};

/**
 * Delete the selected Resource
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteResource = (id, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_RESOURCE}/${id}`
    : endpoints.DELETE_RESOURCE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteResource = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteResource});
};

/**
 * Get the Resources List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readResourceList =
  (pageNumber, size, filter) => async (dispatch) => {
    const queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => ({
      type: SET_READ_RESOURCE_LIST,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readResourceList = {
      url: endpoints.READ_RESOURCE,
      method: 'POST',
      data: filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readResourceList});
  };

/**
 * Show the selected Resource
 * @param {Integer} id
 * @returns Array
 */
export const showResource = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_RESOURCE}/${id}` : endpoints.SHOW_RESOURCE;
  const onSuccess = (response) => ({
    type: SET_SHOW_RESOURCE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showResource = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showResource});
};

/**
 * Update the selected Resource
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateResource = (id, data, onSuccess) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_RESOURCE}/${id}`
    : endpoints.UPDATE_RESOURCE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateResource = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateResource});
};

/**
 * Update Multiple Resource Permission
 * @param {Object} data
 * @returns Array
 */
export const updateMultipleResourcePermission = (data) => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_UPDATE_MULTI_RESOURCE_PERMISSIONS,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateMultipleResourcePermission = {
    url: endpoints.UPDATE_MULTI_RESOURCE_PERMISSIONS,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateMultipleResourcePermission});
};
