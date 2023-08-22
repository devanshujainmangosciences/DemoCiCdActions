import {readApplicantsList, setToast} from '../actions';
import {actionTypes, endpoints, LOAN_APPLICATION} from '../constants';

const {
  SET_AMOUNT,
  SET_LOAN_DETAIL,
  API,
  SET_TOAST,
  SET_JUMP_PBP_STEP,
  SET_ENROLL_FOR_VBC,
  SET_FINANCIAL_INFORMATION,
  SET_VBC_SCHEDULE,
  SET_VBC_DRUG_SCHEDULE,
  SET_ACKNOWLEDGE_FIRST_GRANT,
  SET_CANCEL_APPLICANT,
  SET_REAPPLY_APPLICANT,
  SET_SUBMIT_TO_MANGO_EXECUTIVE,
} = actionTypes;

/**
 * Get the Loan Detail for applicant
 * @returns {Object} body
 */

export const getLoanApplicationDetails = () => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_LOAN_DETAIL,
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
  const getDetail = {
    url: endpoints.GET_LOAN_DETAIL,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getDetail});
};

/**
 * API to get the loan amount
 * @param {Boolean} isApplicant
 * @returns {Promise}
 */
export const getLoanAmount = (isApplicant) => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_AMOUNT,
    payload: response,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const getAmount = {
    url: isApplicant ? endpoints.GET_APPLICANT_AMOUNT : endpoints.GET_AMOUNT,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getAmount});
};

/**
 * get enrollment data of VBC
 * @returns {Promise}
 */
export const getEnrollForVbc = () => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      return {type: SET_ENROLL_FOR_VBC, payload: response.data};
    }
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const enrollForVbc = {
    url: endpoints.GET_ENROLL_FOR_VBC,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: enrollForVbc});
};

/**
 * Enroll for VBC
 * @param {Object} body
 * @returns {Promise}
 */
export const enrollForVbc = (body) => async (dispatch) => {
  const onSuccess = (response) => {
    localStorage.removeItem(LOAN_APPLICATION);
    return {type: SET_ENROLL_FOR_VBC, payload: response.data};
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const enrollForVbc = {
    url: endpoints.ENROLL_FOR_VBC,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: enrollForVbc});
};

/**
 * This action will start the loan application by taking required user data as object
 * @param {Object} body
 *
 */
export const submitLoanApplication = (body, successCb) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({type: SET_LOAN_DETAIL, payload: response.data});
    successCb();
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const enrollForVbc = {
    url: endpoints.START_LOAN_APPLICATION,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: enrollForVbc});
};

/**
 * Get Financial Information
 * @returns {Promise}
 */
export const getFinancialInformation = (isApplicant) => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_FINANCIAL_INFORMATION,
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
  const getFinancialInformation = {
    url: isApplicant
      ? endpoints.GET_APPLICANT_FINANCIAL_INFORMATION
      : endpoints.GET_FINANCIAL_INFORMATION,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getFinancialInformation});
};

/**
 * Update Financial Information
 * @param {Object} body
 * @returns {Promise}
 */
export const updateFinancialInformation =
  (body, isApplicant, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch({
          type: SET_TOAST,
          payload: {
            message: response.message,
            isShowToast: true,
            toastType: 'success',
          },
        });
      }
      customOnSuccess && customOnSuccess();
      return {
        type: SET_FINANCIAL_INFORMATION,
        payload: response.data,
      };
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    const updateFinancialInformation = {
      url: isApplicant
        ? endpoints.UPDATE_APPLICANT_FINANCIAL_INFORMATION
        : endpoints.UPDATE_FINANCIAL_INFORMATION,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateFinancialInformation});
  };

/**
 * Steps for PBP Program for Patients
 * @param {Object} body
 * @param {Number} step
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const vbcProgramSteps =
  (body, step, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
      return {type: SET_ENROLL_FOR_VBC, payload: response.data};
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    let url = endpoints.VBC_PROGRAM_STEP_ONE;
    switch (step) {
      case 2:
        url = endpoints.VBC_PROGRAM_STEP_TWO;
        break;
      case 3:
        url = endpoints.VBC_PROGRAM_STEP_THREE;
        break;
      case 4:
        url = endpoints.VBC_PROGRAM_STEP_FOUR;
        break;
      default:
        url = endpoints.VBC_PROGRAM_STEP_ONE;
    }
    const stepWise = {
      url: url,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: stepWise});
  };
/**
 * Get VBC Schedule
 * @param {String} drugId
 * @returns {Promise}
 */
export const getVbcSchedule = (drugId) => async (dispatch) => {
  const url = drugId
    ? `${endpoints.GET_SCHEDULE}/${drugId}`
    : endpoints.GET_SCHEDULE;
  const onSuccess = (response) => ({
    type: SET_VBC_SCHEDULE,
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
 *  Steps for PBP program for Applicant
 * @param {Object} body
 * @param {Number} step
 * @param {Function} onSuccessCallback
 * @returns {Promise}
 */
export const startLoanApplicationSteps =
  (body, step, onSuccessCallback) => async (dispatch) => {
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback();
      return {
        type: SET_LOAN_DETAIL,
        payload: response.data,
      };
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    let url = endpoints.APPLICANT_LOAN_APPLICATION_STEP_ONE;
    switch (step) {
      case 2:
        url = endpoints.APPLICANT_LOAN_APPLICATION_STEP_TWO;
        break;
      case 3:
        url = endpoints.APPLICANT_LOAN_APPLICATION_STEP_THREE;
        break;
      case 4:
        url = endpoints.APPLICANT_LOAN_APPLICATION_STEP_FOUR;
        break;
      default:
        url = endpoints.APPLICANT_LOAN_APPLICATION_STEP_ONE;
    }
    const stepWise = {
      url: url,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: stepWise});
  };

/**
 * API to get the VBC Drug schedule
 * @returns {Promise}
 */
export const getVbcDrugSchedule = () => async (dispatch) => {
  const onSuccess = (response) => ({
    type: SET_VBC_DRUG_SCHEDULE,
    payload: response,
  });
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const getVbcDrugSchedule = {
    url: endpoints.GET_VBC_DRUG_SCHEDULE,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getVbcDrugSchedule});
};

/**
 * acknowledge First Grant for drug schedule by patient
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const acknowledgeFirstGrant = (customOnSuccess) => async (dispatch) => {
  const onSuccess = (response) => {
    customOnSuccess && customOnSuccess();
    return {type: SET_ACKNOWLEDGE_FIRST_GRANT, payload: response.data};
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const acknowledgeFirstGrant = {
    url: endpoints.ACKNOWLEDGE_FIRST_GRANT,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: acknowledgeFirstGrant});
};

/**
 * API to cancel the PBP Application of Patient
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const cancelApplication = (customOnSuccess) => async (dispatch) => {
  const onSuccess = (response) => {
    customOnSuccess && customOnSuccess();
    if (response.message) {
      dispatch(getEnrollForVbc());
      dispatch(readApplicantsList());
      dispatch(setToast(response.message, true, 'success'));
    }
    return {type: SET_CANCEL_APPLICANT, payload: response};
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const cancelApplication = {
    url: endpoints.CANCLE_APPLICATION,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: cancelApplication});
};

/**
 * API to reapply the PBP Application
 * @param {Function} customOnSuccess
 * @returns {Array}
 */
export const reapplyApplication = (customOnSuccess) => async (dispatch) => {
  const onSuccess = (response) => {
    customOnSuccess && customOnSuccess();
    if (response.message) {
      dispatch(getEnrollForVbc());
      dispatch(setToast(response.message, true, 'success'));
    }
    return {type: SET_REAPPLY_APPLICANT, payload: response};
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const reapplyApplication = {
    url: endpoints.REAPPLY_APPLICATION,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: reapplyApplication});
};

/**
 * API to submit the the PBP application to Mango Executive
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const submitToMangoExecutive = (customOnSuccess) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({type: SET_SUBMIT_TO_MANGO_EXECUTIVE, payload: response});
    dispatch({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'success',
      },
    });
    customOnSuccess && customOnSuccess();
  };
  const onFailure = (response) => ({
    type: SET_TOAST,
    payload: {
      message: response.message,
      isShowToast: true,
      toastType: 'warning',
    },
  });
  const submitToMangoExecutive = {
    url: endpoints.SUBMIT_TO_MANGO_EXECUTIVE,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: submitToMangoExecutive});
};

/**
 * This action is used to set the value of the jumpStep so we can know if we need to jump to last step directly
 * @param {Boolean} value
 *
 */
export const jumpProgramStep = (value) => (dispatch) => {
  dispatch({type: SET_JUMP_PBP_STEP, payload: value});
};
