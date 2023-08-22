/**
 * This Reducer contains the global state which holds hospitalList,drugList,
 * doctorList, rolesList, routesList, permissionsList Information dedicated for
 * Routes. This Module performs retrieve Drugs, Hospitals, Doctors
 * Roles, Routes, and Permissions List. Reducer takes initialState, action
 * type and payload as argument and returns the payload to state
 * corresponding to action type
 * IMPORTANT:
 * Should return state as default in case of no action is produced
 */

import {updateObject} from '@/services/utility';
import {actionTypes} from '../constants';

const {
  SET_DRUG_LIST,
  SET_HOSPITAL_LIST,
  SET_HOSPITAL_GROUP,
  SET_DOCTOR_LIST,
  SET_ROLE_LIST,
  SET_ROUTE_LIST,
  SET_MODULE_LIST,
  SET_PERMISSION_LIST,
  SET_MASTER_DATA,
  SET_CITIES,
  SET_SAME_CITIES,
} = actionTypes;

const initialState = {
  hospitalList: null,
  drugList: null,
  doctorList: null,
  rolesList: null,
  routesList: null,
  modulesList: null,
  permissionsList: null,
  masterData: null,
};
const saveMasterData = (state, payload) => {
  // const prevMasterData = {...state.masterData};
  // console.log('PREV MASTER DATA=>', prevMasterData);
  const requiredPayload = {...payload};
  Object.keys(payload).map((item) => {
    if (
      payload[item] &&
      payload[item].length > 0 &&
      payload[item].length < 15
    ) {
      const sortedData = payload[item].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      requiredPayload[item] = sortedData;
    }
  });
  const updatedState = {
    masterData: requiredPayload,
  };
  // console.log('UPDATED STATE=>', updatedState);
  return updateObject(state, updatedState);
};

export default function template(state = initialState, {type, payload}) {
  switch (type) {
    case SET_DRUG_LIST:
      return {...state, drugList: payload};
    case SET_HOSPITAL_LIST:
      return {
        ...state,
        hospitalList: payload.sort((a, b) =>
          a.hospitalName.localeCompare(b.hospitalName)
        ),
      };
    case SET_HOSPITAL_GROUP:
      return {
        ...state,
        hospitalGroupList: payload.sort((a, b) => a.localeCompare(b)),
      };
    case SET_DOCTOR_LIST:
      return {...state, doctorList: payload};
    case SET_ROLE_LIST:
      return {...state, rolesList: payload};
    case SET_ROUTE_LIST:
      return {...state, routesList: payload};
    case SET_PERMISSION_LIST:
      return {...state, permissionsList: payload};
    case SET_MASTER_DATA:
      return saveMasterData(state, payload);
    case SET_MODULE_LIST:
      return {...state, modulesList: payload};
    case SET_CITIES:
      return {
        ...state,
        masterData: {...state.masterData, [payload.type]: payload.cities},
      };
    case SET_SAME_CITIES:
      return {
        ...state,
        masterData: {
          ...state.masterData,
          permanentCities: payload.cities,
          presentCities: payload.cities,
        },
      };
    default:
      return state;
  }
}
