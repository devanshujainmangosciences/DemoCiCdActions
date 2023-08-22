import {formatEndpoint, isObjectEmpty} from '@/services/utility';
import {actionTypes, endpoints} from '../constants';
import {setToast} from './appActions';

const {
  API,
  SET_TOAST,
  SET_MANGO_EXECUTIVE_PATIENT_LIST,
  SET_MANGO_EXECUTIVE_PATIENT_DETAILS,
  SET_PATIENT_ID,
  SET_PATIENT_STATUS_TO_AWARE,
  SET_APPOINTMENT_DATE_TO_PATIENT,
  SET_DOCTOR_TO_PATIENT,
  SET_LENDER_TO_PATIENT,
  SET_MANGO_EXECUTIVE_ADD_PATIENT,
  SET_TREATMENT_DATE_TO_PATIENT,
  SET_EDIT_TREATMENT_FOR_PATIENT,
  SET_DOCTOR_LIST,
  SET_PENDING_PATIENTS_LIST,
  GET_ELIGIBLE_CYCLE_FOR_CONVERSION,
  REDIRECT,
  SET_APPROVAL_REG_LIST,
  RESET_PATIENT_DETAILS,
} = actionTypes;

/**
 * API to fetch the completed patients list in Mangoexecutive page.
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Object} filter
 * @returns {Promise}
 */
export const getMangoPatientList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    // queryParams = {...filterConfig};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      if (response.status) {
        return {
          type: SET_MANGO_EXECUTIVE_PATIENT_LIST,
          payload: response.data,
        };
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
    const getMangoPatientList = {
      url: endpoints.MANGO_EXECUTIVE_PATIENT_LIST,
      method: 'POST',
      data: isObjectEmpty(filter) ? [] : filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getMangoPatientList});
  };

/**
 * APT to get the doctor that are assigned to the hospital
 * @param {integer} hospitalId
 * @returns {Object}
 */
export const getDoctorsByHospitalId = (hospitalId) => async (dispatch) => {
  const url = `${endpoints.GET_DOCTOR_BY_HOSPITAL_ID}/${hospitalId}`;
  const onSuccess = (response) => {
    return {
      type: SET_DOCTOR_LIST,
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
  const getDoctorsByHospitalId = {
    url: url,
    method: 'POST',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getDoctorsByHospitalId});
};

/**
 * Get patient details for mango executive
 * @param {Integer} id
 * @param {Function } customOnSuccess
 * @returns {Object}
 */
export const getMangoPatientDetails =
  (id, customOnSuccess) => async (dispatch) => {
    const url = id
      ? `${endpoints.GET_MANGO_EXECUTIVE_PATIENT_DETAILS}/${id}`
      : endpoints.GET_MANGO_EXECUTIVE_PATIENT_DETAILS;
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
      return {
        type: SET_MANGO_EXECUTIVE_PATIENT_DETAILS,
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
    const getMangoPatientDetails = {
      url: url,
      method: 'GET',
      data: null,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getMangoPatientDetails});
  };

/**
 * Sets the patients id to redux state
 * @param {Integer} id
 *
 */
export const setPatientId = (id) => ({
  type: SET_PATIENT_ID,
  payload: id,
});

/**
 * update the patient status aware to yes
 * @param {Object} body
 * @param {Function} customOnSuccess
 *
 */
export const updatePatientStatusToAware =
  (body, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
      return {type: SET_PATIENT_STATUS_TO_AWARE, payload: response};
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
      url: endpoints.UPDATE_PATIENT_STATUS_TO_AWARE,
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
 * update the appointment date to patient
 * @param {Object} body
 * @param {Function} customOnSuccess
 *
 */
export const updateAppointmentDateToPatient =
  (body, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
      return {
        type: SET_APPOINTMENT_DATE_TO_PATIENT,
        payload: response,
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
    const enrollForVbc = {
      url: endpoints.ASSIGN_APPOINTMENT_DATE_TO_PATIENT,
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
 * Assign a doctor to patient
 * @param {Object} body
 *
 */
export const assignDoctorToPatient =
  (body, onSuccessCallback) => async (dispatch) => {
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback();
      dispatch({
        type: SET_DOCTOR_TO_PATIENT,
        payload: response,
      });
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
      });
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
      url: endpoints.ASSIGN_DOCTOR_TO_PATIENT,
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
 * Assign a lender to patient
 * @param {Object} body
 * @param {Function} onSuccessCallback
 *
 */
export const assignLenderToPatient =
  (body, onSuccessCallback) => async (dispatch) => {
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback();
      return {
        type: SET_LENDER_TO_PATIENT,
        payload: response,
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
    const enrollForVbc = {
      url: endpoints.ASSIGN_LENDER_TO_PATIENT,
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
 * create a patient with object passed
 * @param {Object} body
 * @param {Function} customOnSuccess
 *
 */
export const mangoExecutiveAddPatient =
  (body, customOnSuccess) => async (dispatch) => {
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
      return {type: SET_MANGO_EXECUTIVE_ADD_PATIENT, payload: response};
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    const mangoExecutiveAddPatient = {
      url: endpoints.MANGO_EXECUTIVE_ADD_PATIENT,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: mangoExecutiveAddPatient});
  };

/**
 *
 * @param {any} body
 * @param {Function} customOnSuccess callback on success
 *
 */
export const assignTreatmentInitiationDateToPatient =
  (body, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      customOnSuccess && customOnSuccess();
      return {type: SET_TREATMENT_DATE_TO_PATIENT, payload: response};
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    const assignTreatmentInitiationDateToPatient = {
      url: endpoints.ASSIGN_TREATMENT_DATE_TO_PATIENT,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: assignTreatmentInitiationDateToPatient});
  };
/**
 *
 * @param {String} action RESTART,PAUSE,TERMINATE
 * @param {Object} body {treatmentRestartDate,patientId}
 * @param {Function} customOnSuccess
 *
 */
export const editTreatmentForPatient =
  (action, body, customOnSuccess) => async (dispatch) => {
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
      return {type: SET_EDIT_TREATMENT_FOR_PATIENT, payload: response};
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    let url;
    switch (action) {
      case 'PAUSE':
        url = endpoints.PAUSE_TREATMENT_FOR_PATIENT;
        break;
      case 'RESTART':
        url = endpoints.RESTART_TREATMENT_FOR_PATIENT;
        break;
      case 'TERMINATE':
        url = endpoints.TERMINATE_TREATMENT_FOR_PATIENT;
        break;
      case 'COMPLETE':
        url = endpoints.COMPLETE_TREATMENT_FOR_PATIENT;
        break;
      default:
        url = endpoints.PAUSE_TREATMENT_FOR_PATIENT;
    }
    const editTreatmentForPatient = {
      url: url,
      method: 'POST',
      data: body,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: editTreatmentForPatient});
  };

/**
 * Approve loan for patient in lender section
 * @param {Object} body
 * {
  "lenderLoanApplicationId": 0,
  "patientId": 0
  }
 *
 */
export const approveLoanForPatient = (body) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch(getMangoPatientDetails(body.patientId));
    return {
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'success',
      },
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
  const approveLoan = {
    url: endpoints.APPROVE_LOAN,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: approveLoan});
};
/**
 * Reject Loan for patient in lender section
 * @param {Object} body
 *  * {
  "lenderLoanApplicationId": 0,
  "patientId": 0
  }
 * 
 */
export const rejectLoanForPatient = (body) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch(getMangoPatientDetails(body.patientId));
    return {
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'success',
      },
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
  const rejectLoan = {
    url: endpoints.REJECT_LOAN,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: rejectLoan});
};

/**
 * API to update the notes entered by Mango executive for a particular patient
 * @param {Object} body => {
  "interactionText": "string",
  "patientId": 0
}
 * 
 */
export const updatePatientInteractionNotes = (body) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch(getMangoPatientDetails(body.patientId));
    return {
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'success',
      },
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
  const patientNotes = {
    url: endpoints.UPDATE_PATIENT_INTERACTION,
    method: 'POST',
    data: body,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: patientNotes});
};
/**
 * This action adds the receipt amount for a particular patient
 * @param {Number} drugReceiptId
 * @param {Number} patientId
 * @param {Number} receiptAmount
 *
 */
export const addDrugReceiptAmount =
  (
    drugReceiptId,
    patientId,
    receiptAmount,
    actualPurchaseDate,
    customOnSuccess
  ) =>
  async (dispatch) => {
    const reqBody = {
      drugReceiptId,
      patientId,
      receiptAmount,
    };
    if (actualPurchaseDate) reqBody['actualPurchaseDate'] = actualPurchaseDate;
    const onSuccess = (response) => {
      dispatch(getMangoPatientDetails(patientId));
      customOnSuccess && customOnSuccess();
      return {
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
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
    const patientNotes = {
      url: endpoints.ADD_DRUR_RECEIPT_AMOUNT,
      method: 'POST',
      data: reqBody,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: patientNotes});
  };

/**
 * Data recieved is Object of PatinetId and Cycle Number to updated the paid Status of that particular cycle
 * @param {Object} data
 * @param {Function} customOnSuccess
 * @returns {Promise}
 */
export const markGrantPaid = (data, customOnSuccess) => async (dispatch) => {
  // console.log('DATA=>', data);

  // console.log('URL=>', url);
  const onSuccess = (response) => {
    customOnSuccess && customOnSuccess();
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
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const markGrantPaid = {
    url: endpoints.MARK_DRUG_SCHEDULE_GRANT,
    method: 'POST',
    data: data,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: markGrantPaid});
};
/**
 * Action to update the consent date by Mango Executive
 * @param {Object} data
 * @param {Function} customOnSuccess
 * @returns {Object}
 */
export const updateDataConsentDate =
  (data, customOnSuccess) => async (dispatch) => {
    // console.log('DATA=>', data);
    const url = endpoints.UPDATE_DATA_CONSENT.replace('{id}', data?.patientId);
    // console.log('URL=>', url);
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
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
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const updateDataConsentDate = {
      url: url,
      method: 'POST',
      data: data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateDataConsentDate});
  };

/**
 * Action to mark the rebate paid when the patient is clinically dropped out
 * @param {Number} patientId
 * @param {Function} customOnSuccess
 * @returns {Object}
 */
export const markRebatePaid =
  (patientId, customOnSuccess) => async (dispatch) => {
    const url = formatEndpoint(endpoints.REBATE_PAID, [patientId]);
    console.log('URL=>', url);
    const onSuccess = (response) => {
      customOnSuccess && customOnSuccess();
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
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const rebatePaid = {
      url: url,
      method: 'GET',
      data: patientId,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: rebatePaid});
  };

/**
 * API to fetch the pending patient who have not completed the profile yet.
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Object} filter
 * @returns {Promise}
 */
export const getPendingPatientList =
  (pageNumber, size, filter) => async (dispatch) => {
    let queryParams = {};
    // queryParams = {...filterConfig};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      if (response.status) {
        return {
          type: SET_PENDING_PATIENTS_LIST,
          payload: response.data,
        };
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
    const getMangoPatientList = {
      url: endpoints.PENDING_PATIENT_LIST,
      method: 'POST',
      data: isObjectEmpty(filter) ? [] : filter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getMangoPatientList});
  };
/**
 * Action to fetch all the patients whoes approval request is pending
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Object} filter
 */
export const getApprovalRegPatients =
  (pageNumber, size, filter) => async (dispatch) => {
    const removeApprovedPatients = {
      arguments: ['No'],
      key: 'accepted',
      orOperation: false,
      searchOperation: 'IS_NULL',
      value: 'accepted',
    };
    let requiredFilter = [];
    requiredFilter = [...filter, removeApprovedPatients];

    let queryParams = {};
    // queryParams = {...filterConfig};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      if (response.status) {
        return {
          type: SET_APPROVAL_REG_LIST,
          payload: response.data,
        };
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
    const getPendingApprovalPatients = {
      url: endpoints.APPROVAL_REG_REQ_LIST,
      method: 'POST',
      data: isObjectEmpty(requiredFilter) ? [] : requiredFilter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getPendingApprovalPatients});
  };
/**
 * Action to fetch all the patients whoes approval request is pending
 * @param {Number} pageNumber
 * @param {Number} size
 * @param {Object} filter
 */
export const getAllApprovalRegPatients =
  (pageNumber, size, filter) => async (dispatch) => {
    const reqFilter = filter.filter((item) => item.key !== 'accepted');
    let queryParams = {};
    // queryParams = {...filterConfig};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      if (response.status) {
        return {
          type: SET_APPROVAL_REG_LIST,
          payload: response.data,
        };
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
    const getPendingApprovalPatients = {
      url: endpoints.APPROVAL_REG_REQ_LIST,
      method: 'POST',
      data: isObjectEmpty(reqFilter) ? [] : reqFilter,
      params: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: getPendingApprovalPatients});
  };
/**
 * API to accept or delete the registration request
 * @param {Object} reqData
 * @param {Function} customOnSuccess
 */
export const handleRegRequest =
  (reqData, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.status) customOnSuccess && customOnSuccess(response);
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    const handleRequest = {
      url: endpoints.HANDLE_REG_REQUEST,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: handleRequest});
  };

/**
 * Cleans up the patient detials from redux
 * @returns {*}
 */
export const resetPatientDetails = () => (dispatch) => {
  dispatch({
    type: RESET_PATIENT_DETAILS,
    payload: {},
  });
};
/**
 * API to acknowledge rebate,token is required to execute the API
 * @param {*} token
 * @param {Function} onSuccessCallback
 * @returns {Object}
 */
export const acknowledgeRebatePaid =
  (token, onSuccessCallback, onFaliurCallback) => async (dispatch) => {
    const endpoint = formatEndpoint(endpoints.ACKNOWLWDGE_REBATE_PAID, [token]);
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback(response);
    };
    const onFailure = (response) => {
      onFaliurCallback && onFaliurCallback(response);
    };
    const acknowledge = {
      url: endpoint,
      method: 'GET',
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: acknowledge});
  };
/**
 * API to acknowledge the subvention, token is required to execute the API
 * @param {*} token
 * @param {Function} onSuccessCallback
 * @returns {Object}
 */
export const acknowledgeSubventionPaid =
  (token, onSuccessCallback, onFaliurCallback) => async (dispatch) => {
    const endpoint = formatEndpoint(endpoints.ACKNOWLWDGE_SUBVENTION_PAID, [
      token,
    ]);
    const onSuccess = (response) => {
      onSuccessCallback && onSuccessCallback(response);
    };
    const onFailure = (response) => {
      onFaliurCallback && onFaliurCallback(response);
    };
    const acknowledge = {
      url: endpoint,
      method: 'GET',
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: acknowledge});
  };

/**
 * This is a JavaScript function that triggers an API call to send a grant email to a patient with a
 * specific ID and cycle number.
 * @param patientId - The ID of the patient for whom the grant email is being triggered.
 * @param cycleNo - cycleNo is a parameter that represents the cycle number for which the grant email
 * needs to be triggered. It is used in the queryParams object to pass it as a parameter in the API
 * call.
 */
export const triggerGrantEmail =
  (patientId, cycleNo, onSuccessCallback) => async (dispatch) => {
    let queryParams = {
      patientId,
      cycleNo,
    };
    const onSuccess = (response) => {
      dispatch({
        type: SET_TOAST,
        payload: {
          message: response.message,
          isShowToast: true,
          toastType: 'success',
        },
      });
      onSuccessCallback && onSuccessCallback(response);
    };
    const onFailure = (response) => ({
      type: SET_TOAST,
      payload: {
        message: response.message,
        isShowToast: true,
        toastType: 'warning',
      },
    });
    const triggerGrantEmail = {
      url: endpoints.TRIGGER_GRANT_EMAIL,
      method: 'GET',
      authorization: true,
      params: queryParams,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: triggerGrantEmail});
  };
/**
 * This is a JavaScript function that retrieves the eligible cycle for conversion for a given patient
 * ID and dispatches an API call with success and failure callbacks.
 * @param patientId - The ID of the patient for whom we want to retrieve the eligible cycle for
 * conversion.
 */
export const getEligibleCycleForConversion =
  (patientId) => async (dispatch) => {
    const endpoint = formatEndpoint(
      endpoints.GET_ELIGIBLE_CYCLE_FOR_CONVERSION,
      [patientId]
    );
    const onSuccess = (response) => {
      if (response.status) {
        return {
          type: GET_ELIGIBLE_CYCLE_FOR_CONVERSION,
          payload: response.data,
        };
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
    const eligibleCycle = {
      url: endpoint,
      method: 'GET',
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: eligibleCycle});
  };

/**
 * This is a JavaScript function that switches the payment type and triggers a custom success function
 * if the response status is true, otherwise it displays a warning toast message.
 * @param reqData - This is an object that contains the data required for the API call to switch the
 * payment type. It could include information such as the user's payment details and the new payment
 * type they want to switch to.
 * @param onCustomSuccess - onCustomSuccess is a callback function that will be executed if the API
 * call is successful and the response status is true. It is an optional parameter that can be passed
 * to the switchPaymentType function.
 */
export const switchPaymentType =
  (reqData, onCustomSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.status) {
        onCustomSuccess && onCustomSuccess();
        dispatch({
          type: SET_TOAST,
          payload: {
            message: response.message,
            isShowToast: true,
            toastType: 'success',
          },
        });
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
    const switchPaymentType = {
      url: endpoints.SWITCH_PAYMENT_TYPE,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: switchPaymentType});
  };
