/**
 * Redux login reducer that manages multiple global states
 * related to login flow.
 */
import {actionTypes, AsyncStorageKeys} from '../constants';
import EncryptedStorageKeys from '../constants/EncryptedStorageKeys';
import {storeInAsyncStorage, storeInEncryptedStorage} from '../utils';

const {REPORTS_SYNC_STATUS} = actionTypes;

const initialState = {
  syncStatus: true, //reports data sync status
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REPORTS_SYNC_STATUS: {
      storeInAsyncStorage(
        AsyncStorageKeys.REPORTS_SYNC_STATUS,
        JSON.stringify(payload)
      );
      return {
        ...state,
        syncStatus: payload,
      };
    }
    default:
      return state;
  }
};
