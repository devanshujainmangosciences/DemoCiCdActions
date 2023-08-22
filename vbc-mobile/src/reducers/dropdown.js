/**
 * Redux document reducer that manages multiple global states
 * related to dropdown.
 */
import {actionTypes} from '../constants';

const initialState = {
  selectedValue: null,
};

const {SELECT_VALUE} = actionTypes;

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_VALUE: {
      return {
        ...state,
        selectedValue: payload,
      };
    }
    default:
      return state;
  }
};
