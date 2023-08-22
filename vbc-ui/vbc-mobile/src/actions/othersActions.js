/**
 * This module defines all the Redux actions
 * for others stack screens
 */
import {actionTypes} from '../constants';

const {DOCUMENT_TYPES} = actionTypes;

// store DOCUMENTS TYPES API call result
export const storeDocumentTypesAction = (apiData) => {
  return {
    type: DOCUMENT_TYPES,
    payload: apiData,
  };
};
