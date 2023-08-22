import {isObjectEmpty} from '@/services/utility';
import {actionTypes, ALERT_MESSAGE, endpoints} from '../constants';
import {setToast} from './appActions';

const {
  SET_READ_DOCTOR,
  REDIRECT,
  API,
  SET_SHOW_DOCTOR,
  SET_READ_DOCTOR_REMOVE_PAGINATION,
} = actionTypes;

/**
 * Create a new Doctor
 * @param {Object} body
 * @param {Function} onSuccess
 * @returns {Promise}
 */
export const createDoctor = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createDoctor = {
    url: endpoints.CREATE_DOCTOR,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createDoctor});
};
/**
 * API to Create bulk doctors
 * @param {Object} body
 * @param {Function} callback
 * @returns {Promise}
 */
export const createBulkDoctor = (body, callback) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.data && response.data.length > 0) {
      const errorData = response.data.filter((item) => !item.success);
      if (errorData.length === 0) {
        dispatch(setToast(ALERT_MESSAGE.ADD_DOCTOR_SUCCESS, true, 'success'));
        callback && callback(errorData);
      } else {
        dispatch(
          setToast(ALERT_MESSAGE.ERROR_WHILE_CREATING_DOCTOR, true, 'warning')
        );
        callback && callback(errorData);
      }
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const createDoctorBulk = {
    url: endpoints.CREATE_BULK_DOCTOR,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: createDoctorBulk});
};

/**
 * Gets Doctors List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const readDoctors =
  (pageNumber, size, filter = [], type) =>
  async (dispatch) => {
    const queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      if (type === 'removePaginationData') {
        return {
          type: SET_READ_DOCTOR_REMOVE_PAGINATION,
          payload: response.data,
        };
      } else {
        return {
          type: SET_READ_DOCTOR,
          payload: response.data,
        };
      }
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const readDoctors = {
      url: endpoints.READ_DOCTOR,
      method: 'POST',
      data: isObjectEmpty(filter) ? [] : filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readDoctors});
  };

/**
 * Gets the selected Doctor
 * @param {Integer} id
 * @returns Array
 */
export const showDoctor = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_DOCTOR}/${id}` : endpoints.SHOW_DOCTOR;
  const onSuccess = (response) => ({
    type: SET_SHOW_DOCTOR,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showDoctor = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showDoctor});
};

/**
 * Update the selected Doctor
 * @param {Integer} id
 * @param {Object} data
 * @param {Callback} onSuccess
 * @returns Array
 */
export const updateDoctor = (id, data, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.UPDATE_DOCTOR}/${id}` : endpoints.UPDATE_DOCTOR;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const updateDoctor = {
    url: url,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: updateDoctor});
};

/**
 * Delete the selected Doctor
 * @param {Integer} id
 * @param {Callback} onSuccess
 * @returns Array
 */
export const deleteDoctor = (id, onSuccess) => async (dispatch) => {
  const url = id ? `${endpoints.DELETE_DOCTOR}/${id}` : endpoints.DELETE_DOCTOR;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteDoctor = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteDoctor});
};

/**
 * Gets Doctor's Patient's List
 * @param {Integer} pageNumber
 * @param {Integer} size
 * @returns Array
 */
export const getDoctorPatientsList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    // queryParams = {...filterConfig};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => ({
      type: actionTypes.SET_DOCTORS_PATIENTS_LIST,
      payload: response.data,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });

    console.log('FILTER=>', filter);
    const readDoctorsPatients = {
      url: endpoints.MANGO_EXECUTIVE_PATIENT_LIST,
      method: 'POST',
      data: isObjectEmpty(filter) ? [] : filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readDoctorsPatients});
  };
