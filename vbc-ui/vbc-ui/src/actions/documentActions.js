import {actionTypes, endpoints} from '../constants';

const {
  REDIRECT,
  API,
  SET_READ_DOCUMENT,
  SET_DOCUMENT_DATA,
  SET_REQUIRED_DOCUMENT,
} = actionTypes;

/**
 *
 * @param {FormData} body
 * @param {Object} onSuccess
 * @returns Array
 */
export const uploadDocument = (body, onSuccess) => async (dispatch) => {
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const uploadDocument = {
    url: endpoints.UPLOAD_DOCUMENT,
    method: 'POST',
    data: body,
    authorization: true,
    applicationJSONHeader: false,
    applicationMultiPartHeader: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: uploadDocument});
};

/**
 *
 * @param {FormData} body
 * @param {Object} onSuccess
 * @returns Array
 */
export const uploadDocumentForPatient =
  (body, onSuccess) => async (dispatch) => {
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const uploadDocument = {
      url: endpoints.UPLOAD_DOCUMENT_PATIENT,
      method: 'POST',
      data: body,
      authorization: true,
      applicationJSONHeader: false,
      applicationMultiPartHeader: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: uploadDocument});
  };
export const uploadDocumentForPatientByMe =
  (body, onSuccess) => async (dispatch) => {
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const uploadDocument = {
      url: endpoints.ME_UPLOAD_DOCUMENT_PATIENT,
      method: 'POST',
      data: body,
      authorization: true,
      applicationJSONHeader: false,
      applicationMultiPartHeader: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: uploadDocument});
  };

/**
 *
 * @returns Map of document type
 */
export const documentData = () => (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_DOCUMENT_DATA,
    payload: response,
  });
  const onFailure = (response) => ({
    type: REDIRECT,
    payload: response,
  });
  const documentData = {
    url: endpoints.DOCUMENT_DATA,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: documentData});
};

/**
 *
 * @returns List of required documents with name as well as with
 * the boolean to indicate that if it is uploaded or not.
 */

export const requiredDocuments = (id) => (dispatch) => {
  const url = `${endpoints.REQUIRED_DOCUMENT}/${id}`;
  const onSuccess = (response) => ({
    type: SET_REQUIRED_DOCUMENT,
    payload: response,
  });
  const onFailure = (response) => ({
    type: REDIRECT,
    payload: response.data,
  });
  const documentData = {
    url: url,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: documentData});
};

/**
 *
 * @returns Array of documents
 */

export const readDocuments = () => (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_READ_DOCUMENT,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readDocuments = {
    url: endpoints.READ_DOCUMENT,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readDocuments});
};

/**
 *
 * @param {Long} id
 * @returns Array
 */
export const downloadDocument = (id, onSuccess) => (dispatch) => {
  const url = `${endpoints.DOWNLOAD_DOCUMENT}/${id}`;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const downloadDocument = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    responseType: 'arraybuffer',
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: downloadDocument});
};

/**
 *
 * @param {Long} id
 * @returns Array
 */
export const deleteDocument = (id, onSuccess) => (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_DOCUMENT}/${id}`
    : endpoints.DELETE_DOCUMENT;
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteDocument = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteDocument});
};
