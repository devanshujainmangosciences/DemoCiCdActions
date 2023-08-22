import {formatEndpoint} from '@/services/utility';
import {setToast} from '../actions';
import {actionTypes, endpoints} from '../constants';
const {
  SET_READ_USER,
  SET_SHOW_USER,
  API,
  REDIRECT,
  SET_TOAST,
  GET_USER_DETAILS,
} = actionTypes;

/**
 * Create a new User
 * @param {Object} body
 * @param {Callback} onSuccess
 * @returns Array
 */
export const createUser = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createUser = {
    url: endpoints.CREATE_USER,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createUser});
};

/**
 * Get the Users List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readUsers = (pageNumber, size, filter) => async (dispatch) => {
  const queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);

  const onSuccess = (response) => ({
    type: SET_READ_USER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });

  const getUsersList = {
    url: endpoints.READ_USER,
    method: 'POST',
    data: filter,
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };

  dispatch({type: API, payload: getUsersList});
};

/**
 * Get the Selected user
 * @param {Integer} id
 * @returns Array
 */
export const showUser = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_USER}/${id}` : endpoints.SHOW_USER;
  const onSuccess = (response) => ({
    type: SET_SHOW_USER,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getUser = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getUser});
};

/**
 * Update the Selected user
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateUser = (id, data, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.UPDATE_USER}/${id}` : endpoints.UPDATE_USER;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateUser = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateUser});
};

/**
 * Send email to support team in help section
 * @param {string} body
 * @param {string} subject
 * @returns Object
 */
export const contactSupport = (body, subject) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
      });
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const contactSupport = {
    url: endpoints.CONTACT_SUPPORT,
    method: 'POST',
    data: {body, subject},
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: contactSupport});
};
/**
 * Forgot Password
 * @param {string} username
 * @returns Object
 */
export const forgotPassword = (username) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      dispatch(setToast(response.message, true, 'success', '/'));
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const forgotPassword = {
    url: endpoints.FORGOT_PASSWORD,
    method: 'POST',
    data: {username},
    authorization: false,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: forgotPassword});
};
/**
 * GET USER DATA using mangouserID
 * @param {string} uuid
 * @returns Object
 */
export const getUserDetails = (userId) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      dispatch({
        type: GET_USER_DETAILS,
        payload: response.data,
      });
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const userdetails = {
    url: endpoints.GET_USER,
    method: 'POST',
    data: userId,
    authorization: true,
    applicationJSONHeader: false,
    applicationPlainText: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: userdetails});
};

/**
 * Disables the user and removes the user login
 * @param {Number} userId
 * @param {Function} onSuccessCallback
 * @returns {Function}
 */
// export const disableUser = (userId, onSuccessCallback) => async (dispatch) => {
//   const endpoint = formatEndpoint(endpoints.DISABLE_USER, [userId]);
//   const onSuccess = (response) => {
//     if (response.status) {
//       onSuccessCallback && onSuccessCallback(response);
//     }
//   };
//   const onFailure = (value) => {
//     dispatch({
//       type: REDIRECT,
//       payload: value,
//     });
//   };
//   const disableUser = {
//     url: endpoint,
//     method: 'POST',
//     data: userId,
//     applicationPlainText: true,
//     authorization: true,
//     onSuccess,
//     onFailure,
//     showLoader: true,
//   };
//   dispatch({type: API, payload: disableUser});
// };
