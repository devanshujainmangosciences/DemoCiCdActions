import {setToast, getMasterData} from '../actions';
import {Routes} from '@/routes';
import {
  actionTypes,
  ALERT_MESSAGE,
  endpoints,
  MASTER_DATA_FIELDS,
  VERSION_TYPE,
} from '../constants';
import {formatEndpoint, isObjectEmpty} from '@/services/utility';

const {
  LIST_HOLIDAY_FOR_YEAR,
  REDIRECT,
  API,
  SET_TOAST,
  SET_MEDICATION_SCHEDULE,
  SET_USERS_WITH_DEVICE_TOKEN,
  SET_MOBILE_VERSION_LIST_BACKEND,
  SET_MOBILE_VERSION_BACKEND,
  SET_MOBILE_VERSION_LIST_ANDROID,
  SET_MOBILE_VERSION_ANDROID,
  SET_MOBILE_VERSION_IOS,
  SET_MOBILE_VERSION_LIST_IOS,
  SET_MOBILE_VERSION_MAPPING,
  SET_ALL_BACKEND_VERSION,
  SET_ALL_IOS_VERSION,
  SET_ALL_ANDROID_VERSION,
} = actionTypes;

/**
 * Get the holiday list for a particular
 * @param {Integer} year
 Array
 */
export const getHolidaysForYear = (year) => async (dispatch) => {
  const queryParams = {year};
  const onSuccess = (response) => ({
    type: LIST_HOLIDAY_FOR_YEAR,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const holidayList = {
    url: endpoints.LIST_HOLIDAYS_FOR_YEAR,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: holidayList});
};

/**
 * Get the Sunday for a particular year
 * @param {Integer} year
 Array
 */
export const getSundaysForYear = (year) => async (dispatch) => {
  const queryParams = {year};
  const onSuccess = () => {
    dispatch(getHolidaysForYear(year));
    dispatch(
      setToast(
        `Sundays for year ${year} populated successfully`,
        true,
        'success'
      )
    );
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const sundayList = {
    url: endpoints.POPULATE_SUNDAYS_FOR_YEAR,
    method: 'GET',
    data: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: sundayList});
};
/**
 * Create Holiday
 * @param {Object}
 String
 */
export const addHoliday = (reqData) => async (dispatch) => {
  const onSuccess = () => {
    dispatch(
      setToast(
        'Holiday added successfully',
        true,
        'success',
        Routes.HolidayList.path
      )
    );
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const addHoliday = {
    url: endpoints.ADD_HOLIDAY,
    method: 'POST',
    data: reqData,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: addHoliday});
};

/**
 * The api fetch the list of programs avaliable in the system
 *
 * @param {Number} pageNumber
 * @param {Number} size
 Array
 */
export const readProgram = (pageNumber, size, filter) => async (dispatch) => {
  let queryParams = {};
  pageNumber && (queryParams['page'] = pageNumber);
  size && (queryParams['limit'] = size);
  const onSuccess = (response) => ({
    type: actionTypes.SET_PROGRAM_LIST,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readProgramData = {
    url: endpoints.READ_PROGRAM,
    method: 'POST',
    data: filter,
    params: queryParams,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readProgramData});
};
/**
 * Create Program
 * @param {Object}
 String
 */
export const createProgram = (reqData) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch(readProgram(0, 10));
    dispatch(
      setToast(response.message, true, 'success', Routes.VbcProgramList.path)
    );
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const addHoliday = {
    url: endpoints.CREATE_PROGRAM,
    method: 'POST',
    data: reqData,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: addHoliday});
};
/**
 *  This action will update the program, apart from the data it has program id that needs to be updated
 * @param {*} reqData
 Response Object
 */
export const updateProgram = (reqData, id) => async (dispatch) => {
  const url = id
    ? `${endpoints.UPDATE_PROGRAM}/${id}`
    : endpoints.UPDATE_PROGRAM;
  const onSuccess = (response) => {
    dispatch(readProgram(0, 10));
    dispatch(
      setToast(response.message, true, 'success', Routes.VbcProgramList.path)
    );
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showProgramData = {
    url: url,
    method: 'POST',
    data: reqData,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showProgramData});
};

/**
 * This api returns the data of a single program
 * @param {Number} id
 Object
 */
export const showProgram = (id) => async (dispatch) => {
  const url = id ? `${endpoints.SHOW_PROGRAM}/${id}` : endpoints.SHOW_PROGRAM;
  const onSuccess = (response) => ({
    type: actionTypes.SET_PROGRAM,
    payload: response.data,
  });
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const showProgramData = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: showProgramData});
};

/**
 * API To delete program
 * @param {Number} id
 Response Object
 */
export const deleteProgram = (id) => async (dispatch) => {
  const url = id
    ? `${endpoints.DELETE_PROGRAM}/${id}`
    : endpoints.DELETE_PROGRAM;
  const onSuccess = (response) => {
    dispatch(readProgram(0, 10));
    dispatch(
      setToast(response.message, true, 'success', Routes.VbcProgramList.path)
    );
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const deleteProgramData = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: deleteProgramData});
};

/**
 * Get MEDICATION Schedule
 Array
 */
export const getMedicationScheduleByDrugId = (drugId) => async (dispatch) => {
  const url =
    drugId && endpoints.GET_MEDICATION_SCHEDULE.replace('{drugId}', drugId);
  const onSuccess = (response) => ({
    type: SET_MEDICATION_SCHEDULE,
    payload: response.data,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const getSchedule = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getSchedule});
};

/**
 * This function will update single medication schedule data , it will recieve the reqData with all the details
 * 
 *Request Data Skeleton:- {
  "cycleNo": 0,
  "drugId": 0,
  "id": 0,
  "mangoGrantAmount": 0,
  "marketPrice": 0,
  "percentageOfRebate": 0
} 
 * 
 * @param {Object} reqData 
  Response Object
 */

export const updateMedicationScheduleByCycleNo =
  (reqData, onCustomSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      onCustomSuccess && onCustomSuccess(response?.data?.drugId);
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
      });
    };
    const onFailure = (response) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'warning',
        },
      });
    };
    const updateSchedule = {
      url: endpoints.UPDATED_MEDICATION_SCHEDULE,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateSchedule});
  };

/**
 * API to get the users whoes device token is present in the database
 * @param {Boolean} active
 */
export const getUsersWithDeviceToken = () => async (dispatch) => {
  const url = `${endpoints.GET_USER_DEVICES}`;
  const onSuccess = (response) => ({
    type: SET_USERS_WITH_DEVICE_TOKEN,
    payload: response.data,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const getUsersWithDeviceToken = {
    url: url,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getUsersWithDeviceToken});
};
/**
 * This action sends push notification to users with content.
 * @param {Object} reqData {
 * content:"",
 * mangoAccountIds:["id"]
 * }

 */
export const sendPushNotification =
  (reqData, customOnSuccess) => async (dispatch) => {
    const onSuccess = () => {
      customOnSuccess && customOnSuccess();
      dispatch({
        type: SET_TOAST,
        payload: {
          message: ALERT_MESSAGE.PUSH_NOTIFICATION_SUCCESS,
          isShowToast: true,
          toastType: 'success',
        },
      });
    };
    const onFailure = (response) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'warning',
        },
      });
    };
    const pushNotification = {
      url: endpoints.SEND_PUSH_NOTIFICATION,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: pushNotification});
  };

/**
 * API to read countrues data.
 */
export const readCountries = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.COUNTRIES]));
};
/**
 * API to delete country
 */
export const deleteCountry = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.PUSH_NOTIFICATION_SUCCESS,
      isShowToast: true,
      toastType: 'success',
    },
  });
};
/**
 * API to read states data from master table.
 */
export const readStates = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.STATES]));
};
/**
 * API to delete states data from master table.
 */
export const deleteState = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to delete city from master data
 */
export const deleteCity = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read banks from master data
 */
export const readBanks = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.BANKS]));
};
/**
 * API to delete banks from master data
 */
export const deleteBank = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read gross Annual Incomes from master data
 */
export const readGrossAnnualIncomes = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.GROSS_ANNUAL_INCOME]));
};
/**
 * API to delete grossAnnualIncomes from master data
 */
export const deleteGrossAnnualIncomes = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to Income Range List  from master data
 */
export const readIncomeRangeList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.INCOME_RANGE_LIST]));
};
/**
 * API to delete Income Range List from master data
 */
export const deleteIncomeRange = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Company Types from master data
 */
export const readCompanyTypes = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.COMPANY_TYPES]));
};
/**
 * API to delete Company Types from master data
 */
export const deleteCompanyType = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Employer List from master data
 */
export const readEmployerList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.EMPLOYERS]));
};
/**
 * API to delete Employer from master data
 */
export const deleteEmployer = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Industry Types from master data
 */
export const readIndustryTypes = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.INDUSTRY_TYPES]));
};
/**
 * API to delete industry from master data
 */
export const deleteIndustry = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Nature of Business from master data
 */
export const readNatureOfBusiness = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.NATURE_OF_BUSINESS]));
};
/**
 * API to delete Nature of Business from master data
 */
export const deleteNatureOfBusiness = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Occupation List from master data
 */
export const readOccupationList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.OCCUPATIONS]));
};
/**
 * API to delete Occupation from master data
 */
export const deleteOccupation = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Profession List from master data
 */
export const readProfessionList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.PROFESSIONS]));
};
/**
 * API to delete profession from master data
 */
export const deleteProfession = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Years In Business from master data
 */
export const readYearsInBusiness = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.YEARS_IN_BUSINESS]));
};
/**
 * API to delete Years In Business from master data
 */
export const deleteYearsInBusiness = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Language List from master data
 */
export const readLanguageList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.LANGUAGES]));
};
/**
 * API to delete Language from master data
 */
export const deleteLanguage = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Residence Type List from master data
 */
export const readResidenceTypeList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.RESIDENCE_TYPES]));
};
/**
 * API to delete Residence Type from master data
 */
export const deleteResidenceType = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Education Level List from master data
 */
export const readEducationLevelList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.EDUCATION_LEVEL_LIST]));
};
/**
 * API to delete Education Level from master data
 */
export const deleteEducationLevel = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Experience List from master data
 */
export const readExperienceList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.EXPERIENCES]));
};
/**
 * API to delete Experience from master data
 */
export const deleteExperience = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Relationship List from master data
 */
export const readRelationshipList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.RELATIONSHIPS]));
};
/**
 * API to delete Relationship from master data
 */
export const deleteRelationship = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Cancer Type List from master data
 */
export const readCancerTypeList = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.CANCER_TYPES]));
};
/**
 * API to delete Cancer Type from master data
 */
export const deleteCancerType = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read doctor change Reasons from master data
 */
export const readDoctorChangeReasons = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.DOCTOR_CHANGE_REASONS]));
};
/**
 * API to delete Doctor Change Reasons from master data
 */
export const deleteDoctorChangeReason = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Clinical Dropout reasons from master data
 */
export const readClinicalDropoutReasons = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.CLINICAL_DROP_OUT]));
};
/**
 * API to delete Clinical Dropout  from master data
 */
export const deleteClinicalDropout = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read non clinical dropout reasons from master data
 */
export const readNonClinicalDropoutReasons = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.NON_CLINICAL_DROP_OUT]));
};
/**
 * API to delete non clinical dropout from master data
 */
export const deleteNonClinicalDropout = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read insurance companies from master data
 */
export const readInsuranceCompanies = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.INSURANCE_COMPANIES]));
};
/**
 * API to delete insurance company from master data
 */
export const deleteInsuranceCompany = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};
/**
 * API to read Patient Statues from master data
 */
export const readPatientStatuses = () => (dispatch) => {
  dispatch(getMasterData([MASTER_DATA_FIELDS.PATIENT_STATUSES]));
};
/**
 * API to delete Patient Status from master data
 */
export const deletePatientStatus = () => (dispatch) => {
  dispatch({
    type: SET_TOAST,
    payload: {
      message: ALERT_MESSAGE.FUNCTIONALITY_NOT_IMPLEMENTED,
      isShowToast: true,
      toastType: 'warning',
    },
  });
};

/**
 * Action to fetch the mobile version list
 *
 * @param {Number} pageNumber
 * @param {Number} size
 *
 */
export const readMobileVersionsList =
  (pageNumber, size, versionType, isAll = false, filter) =>
  async (dispatch) => {
    let queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    if (isAll) queryParams['limit'] = 999999;
    const actionType =
      VERSION_TYPE.ANDROID === versionType
        ? isAll
          ? SET_ALL_ANDROID_VERSION
          : SET_MOBILE_VERSION_LIST_ANDROID
        : VERSION_TYPE.IOS === versionType
        ? isAll
          ? SET_ALL_IOS_VERSION
          : SET_MOBILE_VERSION_LIST_IOS
        : isAll
        ? SET_ALL_BACKEND_VERSION
        : SET_MOBILE_VERSION_LIST_BACKEND;

    const urlRequired =
      VERSION_TYPE.ANDROID === versionType
        ? endpoints.MOBILE_VERSION_LIST_ANDROID
        : VERSION_TYPE.IOS === versionType
        ? endpoints.MOBILE_VERSION_LIST_IOS
        : endpoints.MOBILE_VERSION_LIST_BACKEND;

    const onSuccess = (response) => {
      dispatch({
        type: actionType,
        payload: response,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });

    const readMobileVersions = {
      url: urlRequired,
      method: VERSION_TYPE.BACKEND === versionType ? 'GET' : 'POST',
      params: queryParams,
      data: isObjectEmpty(filter) ? [] : filter,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readMobileVersions});
  };

/**
 * Reading the IOS Mobile version
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Array} filter

 */
export const readIosMobileVersionsList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);

    const onSuccess = (response) => {
      dispatch({
        type: SET_MOBILE_VERSION_LIST_IOS,
        payload: response,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });

    const readMobileVersions = {
      url: endpoints.MOBILE_VERSION_LIST_IOS,
      method: 'POST',
      params: queryParams,
      data: isObjectEmpty(filter) ? [] : filter,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readMobileVersions});
  };

/**
 * Reading the IOS Mobile version
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Array} filter

 */

export const readAndroidMobileVersionsList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);

    const onSuccess = (response) => {
      dispatch({
        type: SET_MOBILE_VERSION_LIST_ANDROID,
        payload: response,
      });
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });

    const readMobileVersions = {
      url: endpoints.MOBILE_VERSION_LIST_ANDROID,
      method: 'POST',
      params: queryParams,
      data: isObjectEmpty(filter) ? [] : filter,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: readMobileVersions});
  };

export const getMobileVersion = (id, versionType) => async (dispatch) => {
  const actionType =
    VERSION_TYPE.ANDROID === versionType
      ? SET_MOBILE_VERSION_ANDROID
      : VERSION_TYPE.IOS === versionType
      ? SET_MOBILE_VERSION_IOS
      : SET_MOBILE_VERSION_BACKEND;
  const url =
    VERSION_TYPE.ANDROID === versionType
      ? endpoints.GET_MOBILE_VERSION_ANDROID
      : VERSION_TYPE.IOS === versionType
      ? endpoints.GET_MOBILE_VERSION_IOS
      : endpoints.GET_MOBILE_VERSION_BACKEND;
  const urlRequired = formatEndpoint(url, [id]);
  const onSuccess = (response) => {
    dispatch({
      type: actionType,
      payload: response,
    });
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const readMobileVersions = {
    url: urlRequired,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: readMobileVersions});
};

/**
 * Action to create the mobile version entry
 * @param {Object} reqData
 * @param {Function} customOnSuccess

 */
export const createMobileVersion =
  (reqData, versionType, customOnSuccess) => async (dispatch) => {
    const urlRequired =
      VERSION_TYPE.ANDROID === versionType
        ? endpoints.CREATE_MOBILE_VERSION_ANDROID
        : VERSION_TYPE.IOS === versionType
        ? endpoints.CREATE_MOBILE_VERSION_IOS
        : endpoints.CREATE_MOBILE_VERSION_BACKEND;

    const onSuccess = (response) => {
      if (response)
        dispatch(
          setToast(ALERT_MESSAGE.MOBILE_VERSION_CREATE_SUCCESS, true, 'success')
        );
      customOnSuccess && customOnSuccess(response);
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const create = {
      url: urlRequired,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: create});
  };

/**
 * Action to update mobile version
 * @param {Object} reqData
 * @param {Function} customOnSuccess
 */
export const updateMobileVersion =
  (reqData, versionType, customOnSuccess) => async (dispatch) => {
    const urlRequired =
      VERSION_TYPE.ANDROID === versionType
        ? endpoints.UPDATE_MOBILE_VERSION_ANDROID
        : VERSION_TYPE.IOS === versionType
        ? endpoints.UPDATE_MOBILE_VERSION_IOS
        : endpoints.UPDATE_MOBILE_VERSION_BACKEND;

    const onSuccess = (response) => {
      if (response)
        dispatch(
          setToast(ALERT_MESSAGE.MOBILE_VERSION_UPDATE_SUCCESS, true, 'success')
        );
      customOnSuccess && customOnSuccess(response);
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const update = {
      url: urlRequired,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: update});
  };
/**
 * Action to soft delete mobile version
 * @param {*} id

 */
export const disableMobileVersion =
  (id, versionType, customOnSuccess, customOnFaliure) => async (dispatch) => {
    const url =
      VERSION_TYPE.ANDROID === versionType
        ? endpoints.DELETE_MOBILE_VERSION_ANDROID
        : VERSION_TYPE.IOS === versionType
        ? endpoints.DELETE_MOBILE_VERSION_IOS
        : endpoints.DELETE_MOBILE_VERSION_BACKEND;
    const urlRequired = formatEndpoint(url, [id]);
    const onSuccess = (response) => {
      dispatch(
        setToast(ALERT_MESSAGE.MOBILE_VERSION_DELETE_SUCCESS, true, 'success')
      );
      customOnSuccess && customOnSuccess(response);
    };
    const onFailure = () => {
      customOnFaliure && customOnFaliure();
      dispatch(
        setToast(ALERT_MESSAGE.MOBILE_VERSION_DELETE_ERROR, true, 'warning')
      );
    };
    const deleteData = {
      url: urlRequired,
      method: 'POST',
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
      handleError: false,
    };
    dispatch({type: API, payload: deleteData});
  };

/**
 * API to update Mapping Versions
 * @param {Object} reqData
 * @param {Function} customOnSuccess

 */
export const updateVersionMapping =
  (reqData, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response)
        dispatch(
          setToast(ALERT_MESSAGE.MOBILE_VERSION_UPDATE_SUCCESS, true, 'success')
        );
      customOnSuccess && customOnSuccess(response);
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const update = {
      url: endpoints.VERSION_MAPPING_UPDATE,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: update});
  };

export const getVersionMapping = (id) => async (dispatch) => {
  const urlRequired = formatEndpoint(endpoints.GET_VERSION_MAPPING, [id]);
  const onSuccess = (response) => {
    dispatch({
      type: SET_MOBILE_VERSION_MAPPING,
      payload: response,
    });
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const update = {
    url: urlRequired,
    method: 'GET',
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: update});
};
