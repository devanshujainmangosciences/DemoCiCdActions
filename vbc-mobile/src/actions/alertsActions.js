/**
 * This module defines all the Redux actions
 * for alert screen
 */
import {actionTypes} from '../constants';

const {ALERTS, UPDATE_ALERTS} = actionTypes;

// store ALERTS API call result
export const storeAlertsAction = (alerts, totalElements) => {
  return {
    type: ALERTS,
    payload: {
      alerts: alerts,
      totalElements: totalElements,
    },
  };
};

// update ALERTS action
export const updateAlertsAction = (apiData) => {
  return {
    type: UPDATE_ALERTS,
    payload: apiData,
  };
};
