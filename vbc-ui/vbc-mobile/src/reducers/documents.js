/**
 * Redux document reducer that manages multiple global states
 * related to document upload flow.
 */
import {actionTypes} from '../constants';

const {DOCUMENT_TYPES} = actionTypes;

const initialState = {
  documentTypes: null, // list of document types
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case DOCUMENT_TYPES: {
      return {
        ...state,
        documentTypes: payload,
      };
    }
    default:
      return state;
  }
};
