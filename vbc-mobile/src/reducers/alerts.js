/**
 * Redux document reducer that manages multiple global states
 * related to alerts flow.
 */
import {actionTypes} from '../constants';

const initialState = {
  alerts: [], // list of alerts
  totalCount: 0,
};

const {ALERTS, UPDATE_ALERTS} = actionTypes;

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ALERTS: {
      return {
        ...state,
        alerts: payload.alerts,
        totalCount: payload.totalElements,
      };
    }
    case UPDATE_ALERTS: {
      return {
        ...state,
        alerts: [...payload, ...state.alerts],
        totalCount: state.totalCount + 1,
      };
    }
    default:
      return state;
  }
};
