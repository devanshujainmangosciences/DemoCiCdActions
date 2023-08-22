/**
 * This module defines all the Redux actions
 * for dropdown component
 */
import {actionTypes} from '../constants';

const {SELECT_VALUE} = actionTypes;

// set dropdown selected value action
export const setDropdownSelectedValue = (apiData) => {
  return {
    type: SELECT_VALUE,
    payload: apiData,
  };
};
