import {actionTypes, endpoints} from '../constants';

const {
  SET_READ_ROUTE_LIST,
  SET_ALL_ROUTE_LIST,
  SET_SHOW_ROUTE,
  SET_UPDATE_SUB_ROUTE,
  REDIRECT,
  API,
  ON_SIDEBAR_ROUTE_CLICK,
} = actionTypes;

/**
 * Create a new Route
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createRoute = (data, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createRoute = {
    url: endpoints.CREATE_ROUTE,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createRoute});
};

/**
 * Get the Route List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readRouteList = (pageNumber, size, filter) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  let type;
  if (size === 999) {
    type = SET_ALL_ROUTE_LIST;
  } else {
    type = SET_READ_ROUTE_LIST;
  }
  const onSuccess = (response) => ({
    type: type,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readRouteList = {
    url: endpoints.READ_ROUTE_LIST,
    method: 'POST',
    data: filter,
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readRouteList});
};

/**
 * Update the selected Route
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateRoute = (id, data, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.UPDATE_ROUTE}/${id}` : endpoints.UPDATE_ROUTE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateRoute = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateRoute});
};

/**
 * Delete the selected Route
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteRoute = (id, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.DELETE_ROUTE}/${id}` : endpoints.DELETE_ROUTE;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteRoute = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteRoute});
};

/**
 * Show the selected Route
 * @param {Integer} id
 * @returns Array
 */
export const showRoute = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_ROUTE}/${id}` : endpoints.SHOW_ROUTE;
  const onSuccess = (response) => ({
    type: SET_SHOW_ROUTE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showRoute = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showRoute});
};

/**
 * Update the Sub Route
 * @param {Object} data
 * @returns Array
 */
export const updateSubRoutes = (data) => async (dispatch) => {
  // check for occurance if there is none delete this
  const onSuccess = (response) => ({
    type: SET_UPDATE_SUB_ROUTE,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateSubRoutes = {
    url: endpoints.UPDATE_SUB_ROUTE,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateSubRoutes});
};

/**
 * Capture the sidebar route click so that can be used in someplace if necessary
 * @param {Object} data
 * @returns Array
 */
export const onSideBarRouteClicked = (type) => async (dispatch) => {
  const location = window.location.pathname;
  // console.log('LOCATION=>', location);
  dispatch({type: ON_SIDEBAR_ROUTE_CLICK, payload: {type, location}});
};
