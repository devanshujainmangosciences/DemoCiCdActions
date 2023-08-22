/**
 * This Reducer contains the global state which holds documentList, selectedDocument,
 * documentTypeList Informations dedicated for Documents. This Module performs upload, download, read and delete documents.
 * Reducer takes initialState, action type and payload as argument
 * and returns the payload to state corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {actionTypes} from '../constants';

const {
  SET_REQUIRED_DOCUMENT,
  SET_CREATE_DOCUMENT,
  SET_READ_DOCUMENT,
  SET_SHOW_DOCUMENT,
  SET_DOCUMENT_DATA,
  SET_DELETE_DOCUMENT,
} = actionTypes;

const initialState = {
  requiredDocument: null,
  documentList: [],
  selectedDocument: null,
  documentTypeList: null,
  value: null,
};

export default function documents(state = initialState, {type, payload}) {
  switch (type) {
    case SET_CREATE_DOCUMENT:
      return {...state, requiredDocument: payload};
    case SET_REQUIRED_DOCUMENT:
      return {...state, requiredDocument: payload};
    case SET_READ_DOCUMENT:
      return {...state, documentList: payload};
    case SET_DELETE_DOCUMENT:
      return {...state, selectedDocument: payload};
    case SET_SHOW_DOCUMENT:
      return {
        ...state,
        value: {
          data: payload.data,
          contentType: payload.contentType,
        },
      };
    case SET_DOCUMENT_DATA:
      return {...state, documentTypeList: payload.data};
    default:
      return state;
  }
}
