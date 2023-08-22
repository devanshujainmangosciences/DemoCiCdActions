import {combineReducers} from 'redux';
import login from './login';
import vbcProgram from './vbcProgram';
import documents from './documents';
import applicant from './applicant';
import reports from './reports';
import alerts from './alerts';
import dropdown from './dropdown';
import actionTypes from '../constants/actionTypes';

const {LOGOUT} = actionTypes;

const appReducer = combineReducers({
  login,
  vbcProgram,
  documents,
  applicant,
  alerts,
  dropdown,
  reports,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
