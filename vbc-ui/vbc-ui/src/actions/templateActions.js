import {actionTypes, endpoints} from '../constants';

const {
  SET_DRUG_LIST,
  SET_HOSPITAL_LIST,
  SET_HOSPITAL_GROUP,
  SET_ROLE_LIST,
  SET_MODULE_LIST,
  SET_ROUTE_LIST,
  SET_DOCTOR_LIST,
  SET_PERMISSION_LIST,
  SET_ALL_MANUFACTURER,
  SET_MASTER_DATA,
  SET_CITIES,
  SET_SAME_CITIES,
  REDIRECT,
  API,
} = actionTypes;

/**
 * Get the drugs List
 * @returns {Array}
 */
export const drugsList =
  (loader = true) =>
  async (dispatch) => {
    const onSuccess = (response) => ({
      type: SET_DRUG_LIST,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const drugsList = {
      url: endpoints.DRUG_LIST,
      method: 'GET',
      data: null,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: loader,
    };
    dispatch({type: API, payload: drugsList});
  };

/**
 * Get the hospitals List
 * @returns {Array}
 */
export const hospitalsList =
  (loader = true) =>
  async (dispatch) => {
    const onSuccess = (response) => ({
      type: SET_HOSPITAL_LIST,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const hospitalsList = {
      url: endpoints.HOSPITAL_LIST,
      method: 'GET',
      data: null,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: loader,
    };
    dispatch({type: API, payload: hospitalsList});
  };
/**
 * Get the hospitals group list
 * @returns Array
 */
export const hospitalsGroupList =
  (loader = true) =>
  async (dispatch) => {
    const onSuccess = (response) => ({
      type: SET_HOSPITAL_GROUP,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const hospitalsGroupList = {
      url: endpoints.HOSPITAL_GROUP_LIST,
      method: 'GET',
      data: null,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: loader,
    };
    dispatch({type: API, payload: hospitalsGroupList});
  };

/**
 * Get the doctors List
 * @param {*} hospitalId
 * @returns Array
 */
export const doctorsList = (hospitalId) => async (dispatch) => {
  const URL = endpoints.DOCTOR_LIST.replace('{hospitalId}', hospitalId);
  const onSuccess = (response) => ({
    type: SET_DOCTOR_LIST,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const doctorsList = {
    url: URL,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: doctorsList});
};

/**
 * Get the roles List
 * @returns Array
 */
export const rolesList = () => async (dispatch) => {
  const queryParams = {};
  queryParams['limit'] = 1000;
  const onSuccess = (response) => ({
    type: SET_ROLE_LIST,
    payload: response.data.content,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const rolesList = {
    url: endpoints.READ_ROLE_LIST,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: rolesList});
};

/**
 * Get the Route List
 * @returns Array
 */
export const routesList = () => async (dispatch) => {
  const queryParams = {};
  queryParams['limit'] = 1000;
  const onSuccess = (response) => ({
    type: SET_ROUTE_LIST,
    payload: response.data.content,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const routesList = {
    url: endpoints.READ_ROUTE_LIST,
    method: 'POST',
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: routesList});
};

/**
 * Get the Module List
 * @returns Array
 */
export const modulesList = () => async (dispatch) => {
  const queryParams = {};
  queryParams['limit'] = 1000;
  const onSuccess = (response) => ({
    type: SET_MODULE_LIST,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const modulesList = {
    url: endpoints.READ_MODULE_LIST,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: modulesList});
};

/**
 * Get the permissions List
 * @returns Array
 */
export const permissionsList = (filter) => async (dispatch) => {
  const queryParams = {};
  queryParams['limit'] = 1000;
  const onSuccess = (response) => ({
    type: SET_PERMISSION_LIST,
    payload: response.data.content,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const permissionsList = {
    url: endpoints.READ_PERMISSION,
    method: 'POST',
    data: filter,
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: permissionsList});
};

/**
 *
 * @returns  Array of Manufacturers
 */
export const allManufacturers = () => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_ALL_MANUFACTURER,
    payload: response,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const allManufacturers = {
    url: endpoints.ALL_MANUFACTURER,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: allManufacturers});
};
/**
 * To get all the master data values
 * @param {Array} requestData
 * @param {Boolean} loader
 * @param {Function} onCustomSuccess
 * @returns {Array}
 */
export const getMasterData =
  (requestData, loader = true, onCustomSuccess) =>
  async (dispatch) => {
    const onSuccess = (response) => {
      dispatch({
        type: SET_MASTER_DATA,
        payload: response.data,
      });
      onCustomSuccess && onCustomSuccess(response.data);
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getMasterData = {
      url: endpoints.MASTER_DATA_ADMIN,
      method: 'POST',
      data: requestData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: loader,
    };
    dispatch({type: API, payload: getMasterData});
  };

/**
 *
 * This api will bring data of the cities based on the state
 * TYPE can be anything that we want to store in the redux store like presentCities, permenantCities etc.
 *
 * @param {Number} stateId
 * @param {String} type is the value for redux state key
 * @returns {Array}
 */
export const getCitiesFromStateId =
  (stateId, type, customSuccessCallback) => async (dispatch) => {
    const URL = endpoints.GET_CITY_DATA.replace('{stateId}', stateId);
    const onSuccess = (response) => {
      customSuccessCallback && customSuccessCallback();
      dispatch({
        type: type === 'same-cities' ? SET_SAME_CITIES : SET_CITIES,
        payload: {cities: response.data, type: type},
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getMasterData = {
      url: URL,
      method: 'GET',
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getMasterData});
  };
