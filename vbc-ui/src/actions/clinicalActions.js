// import {
//   clinicalNotesDummyData,
//   clinicalNotesDummyData2,
// } from '@/data/yearwiseCalendar';
import {formatEndpoint} from '@/services/utility';
import {secureLocalStorage} from '@/services/web.storage';
import {actionTypes, endpoints, MONTH, USER_ID} from '../constants';

const {
  SET_SUMMARIES,
  SET_IFRAME_URL,
  REDIRECT,
  SET_CLINICAL_NOTES,
  API,
  REPORTS_SYNC_FLAG,
} = actionTypes;
/**
 * Clear the Patient Timeline IFrameUrl
 */
export const clearPatientTimelineUrl = () => ({
  type: SET_IFRAME_URL,
  payload: '',
});

/**
 * Get Patient Timeline IFrame Url
 * @returns Array
 */
export const getPatientTimeLineUrl =
  (patientId, loader) => async (dispatch) => {
    // const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    patientId && (queryParams['userid'] = patientId);
    const onSuccess = (response) => {
      // console.log('response====>', response);
      return {
        type: SET_IFRAME_URL,
        payload: response,
      };
    };
    const onFailure = () => {
      console.log('FAILED');
      /**
       * Removeing this api call as its taking time to load
       */
    };
    // const onFailure = (value) => ({
    //   type: REDIRECT,
    //   payload: value,
    // });

    const getPatientTimeLineUrl = {
      url: endpoints.PATIENT_TIMELINE_URL,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: loader,
      sentryReport: false,
    };
    dispatch({type: API, payload: getPatientTimeLineUrl});
  };

/**
 * Get the surgical details List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getSurgicalDetails =
  (pageNumber, year, month, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);

    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getSurgicalDetails = {
      url: endpoints.SURGICAL_DETAILS,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getSurgicalDetails});
  };

/**
 * Get the Clinical Notes details List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getClinicalNotesDetails =
  (pageNumber, year, month, customOnSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    const onSuccess = (response) => {
      // console.log('RESPONSE=>', response);
      /**Commenting dummy data code */
      // const addData = {
      //   currentPage: pageNumber ? pageNumber : 0,
      //   totalItems: 40,
      //   totalPages: 2,
      // };
      // const newResponse = {
      //   ...response,
      //   additionalData: addData,
      //   reports: !pageNumber ? clinicalNotesDummyData : clinicalNotesDummyData2,
      // };
      customOnSuccess && customOnSuccess(response);
      dispatch({
        type: SET_CLINICAL_NOTES,
        payload: response,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getClinicalNotesDetails = {
      url: endpoints.CLINICAL_NOTES,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getClinicalNotesDetails});
  };

/**
 * Get the Summary Notes details List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getSummaryNotesDetails =
  (pageNumber, year, month) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    const onSuccess = (response) => ({
      type: SET_SUMMARIES,
      payload: response,
    });
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getSummaryNotesDetails = {
      url: endpoints.SUMMARY_NOTES,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getSummaryNotesDetails});
  };

/**
 * Get the Labs Reports details List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @param {String} category
 * @returns Array
 */
export const getLabsReportsDetails =
  (pageNumber, year, month, category, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    category && (queryParams['category'] = category);

    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getLabsReportsDetails = {
      url: endpoints.LABS_REPORTS,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getLabsReportsDetails});
  };

/**
 * Get Radiology Reports Details list
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @param {String} procedure
 * @returns Array
 */
export const getRadiologyReportsDetails =
  (pageNumber, year, month, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);

    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getRadiologyReportsDetails = {
      url: endpoints.RADIOLOGY_REPORTS,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getRadiologyReportsDetails});
  };
/**
 * Get Other tests list
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @param {String} procedure
 * @returns Array
 */
export const getOtherTests =
  (pageNumber, year, month, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);

    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getOtherTests = {
      url: endpoints.OTHER_TESTS,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getOtherTests});
  };

/**
 * Get the Medication details List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getMedicationDetails =
  (pageNumber, year, month, procedure, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    procedure && (queryParams['category'] = procedure);

    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getMedicationDetails = {
      url: endpoints.MEDICATION,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getMedicationDetails});
  };
/**
 * Get the Radiation Therapy List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getRadiationTherapy =
  (pageNumber, year, month, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getRadiationTherapy = {
      url: endpoints.RADIATION_THERAPY,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getRadiationTherapy});
  };
/**
 * Get the Ither Treatment List
 * @param {Integer} pageNumber
 * @param {Integer} year
 * @param {String} month
 * @returns Array
 */
export const getOtherTreatment =
  (pageNumber, year, month, onSuccess) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const queryParams = {};
    userId && (queryParams['userid'] = userId);
    pageNumber && (queryParams['page'] = pageNumber);
    year && (queryParams['year'] = year);
    month && (queryParams['month'] = MONTH[month]);
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const getOtherTreatment = {
      url: endpoints.OTHER_TREATMENT,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getOtherTreatment});
  };
/**
 * This Action get the boolean value that if the reports data are synchronized or not
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const getReportSyncFlag =
  (customOnSuccess, customOnFaliure) => async (dispatch) => {
    const userId = secureLocalStorage.getItem(USER_ID);
    const endPoint = formatEndpoint(endpoints.GET_REPORT_SYNC_FLAG, [userId]);
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess(response?.dataSynchronized);
      return {
        type: REPORTS_SYNC_FLAG,
        payload: response?.dataSynchronized,
      };
    };
    const onFailure = () => {
      customOnFaliure && customOnFaliure();
      // console.log('FAILED');
      /**
       * Removeing this api call as its taking time to load
       */
    };
    const getOtherTreatment = {
      url: endPoint,
      method: 'GET',
      data: '',
      onSuccess: onSuccess,
      onFailure: onFailure,
      authorization: true,
      showLoader: true,
    };
    dispatch({type: API, payload: getOtherTreatment});
  };
