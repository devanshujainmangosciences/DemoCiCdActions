import {actionTypes, endpoints} from '../constants';

const {
  SET_READ_LENDER,
  SET_UPDATE_LENDER,
  SET_DELETE_LENDER,
  SET_SHOW_LENDER,
  RESET_SELECTED_LENDER,
  REDIRECT,
  API,
  SET_TOAST,
} = actionTypes;

/**
 * Create a new Lender
 * @param {*} body
 * @returns {Promise}
 */
export const createLender =
  (body, customSuccessCallback) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.message) {
        customSuccessCallback && customSuccessCallback();
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
        type: SET_READ_LENDER,
        payload: {content: null},
      };
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const createLender = {
      url: endpoints.CREATE_LENDER,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: createLender});
  };

/**
 * Reads the Lenders List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns {Promise}
 */
export const readLenders = (pageNumber, size) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  const onSuccess = (response) => ({
    type: SET_READ_LENDER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readLenders = {
    url: endpoints.READ_LENDER,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readLenders});
};

/**
 * Show the selected Lender
 * @param {Integer} id
 * @returns {Promise}
 */
export const showLender = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_LENDER}/${id}` : endpoints.SHOW_LENDER;
  const onSuccess = (response) => ({
    type: SET_SHOW_LENDER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readLenders = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readLenders});
};

/**
 * Update the selected Lender
 * @param {Integer} id
 * @param {Object} data
 * @returns {Promise}
 */
export const updateLender =
  (id, data, customSuccessCallback) => async (dispatch) => {
    const url = id
      ? `${endpoints.UPDATE_LENDER}/${id}`
      : endpoints.UPDATE_LENDER;
    const onSuccess = (response) => {
      customSuccessCallback && customSuccessCallback();
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
        type: SET_UPDATE_LENDER,
        payload: response,
      };
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const updateLender = {
      url: url,
      method: 'POST',
      data: data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateLender});
  };

/**
 * Delete the selected Lender
 * @param {Integer} id
 * @returns {Promise}
 */
export const deleteLender = (id) => async (dispatch) => {
  const url = id ? `${endpoints.DELETE_LENDER}/${id}` : endpoints.DELETE_LENDER;
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
      type: SET_DELETE_LENDER,
      payload: response,
    };
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteLender = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteLender});
};

export const resetSelectedLender = () => (dispatch) => {
  dispatch({
    type: RESET_SELECTED_LENDER,
    payload: null,
  });
};
