import {
  actionTypes,
  endpoints,
  USER_ID,
  REGISTERED_DISPLAY_NAME,
  REGISTERED_USERNAME,
  TREATMENT_DRUG_NAME,
  XSRF_TOKEN,
  ALERT_MESSAGE,
} from '../constants';
import {Routes} from '@/routes';
import {secureLocalStorage} from '@/services/web.storage';
import {setCookie} from '@/services/utility';

// import Keycloak from 'keycloak-js';

const {
  SET_USER_DATA,
  SET_LOADER,
  SET_KEYCLOAK,
  SET_PERMISSIONS,
  SET_MY_PROFILE,
  FORCE_LOGOUT,
  SET_REGISTERED_PATIENT,
  VERIFY_REGISTERED_PATIENT,
  SET_TOAST,
  API,
  REDIRECT,
  SAVE_NOTIFICATION_IN_STORE,
  LOAD_NOTIFICATIONS,
  PASSWORD_CHANGED,
  TOKEN_REFRESHED,
  SET_SELECTED_ROLE,
} = actionTypes;

/**
 * Function used to trigger the toast
 * @param {String} message
 * @param {Boolean} isShow
 * @param {String} toastType
 */
export const setToast = (message, isShow, toastType, redirect) => ({
  type: SET_TOAST,
  payload: {message, isShowToast: isShow, toastType, redirect},
});

/**
 * Changes the state of the Loader
 * @param {Boolean} payload
 */
export const setLoader = (payload) => ({type: SET_LOADER, payload});

/**
 * Used to set user data
 * @param {Object} payload
 */
export const setUserData = (payload) => ({type: SET_USER_DATA, payload});

/**
 * Used to set KeycloakData
 * @param {Keycloak.KeycloakInstance} payload
 */
export const setKeycloakData = (payload) => ({type: SET_KEYCLOAK, payload});

/**
 * Force logout the current user
 */
export const setForceLogout = () => ({type: FORCE_LOGOUT, payload: ''});

/**
 * get user permissions based upon rbac
 * @param {Function}
 * @returns {Object}
 */
export const getUserPermissions = (customOnSuccess) => async (dispatch) => {
  const onSuccess = (response) => {
    customOnSuccess && customOnSuccess();
    return {type: SET_PERMISSIONS, payload: response.data};
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getUserPermissions = {
    url: endpoints.PERMISSIONS,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getUserPermissions});
};
/**
 * register patient initialization request
 * @param {Object} data
 * @param {any} history
 */
export const registerPatient = (data, history) => async (dispatch) => {
  const onSuccess = (response) => async (dispatch) => {
    if (response.data) {
      dispatch({
        type: SET_REGISTERED_PATIENT,
        payload: {
          id: response.data,
          name: data.name,
          mobile: data.phone,
          email: data.email,
        },
      });
      localStorage.setItem(REGISTERED_DISPLAY_NAME, data.name);
      localStorage.setItem(REGISTERED_USERNAME, data.phone || data.email);

      history(Routes.Otp.path);

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
      // return <Navigate to={Routes.Otp.path} />;
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const registerMyself = {
    url: endpoints.PATIENT_REGISTER,
    method: 'POST',
    data: data,
    authorization: false,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: registerMyself});
};

/**
 * verify the newly register patient request
 * @param {Object} data
 * @param {*} history
 */
export const verifyPatient = (data, history) => async (dispatch) => {
  const onSuccess = (response) => async (dispatch) => {
    if (response.data) {
      dispatch({
        type: VERIFY_REGISTERED_PATIENT,
        payload: {token: response.data},
      });
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
      history(Routes.CreatePassword.path);
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const verifyUser = {
    url: endpoints.VERIFY_PATIENT,
    method: 'POST',
    data: data,
    authorization: false,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: verifyUser});
};

/**
 * reset the default password created  for newly register patient
 * @param {Object} data
 * @param {*} history
 * @returns {Array}
 */
export const resetPassword = (data, history) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      const userName = localStorage.getItem(REGISTERED_USERNAME);
      const reqData = {...data};
      reqData.userName = userName;
      localStorage.removeItem(REGISTERED_DISPLAY_NAME);
      localStorage.removeItem(REGISTERED_USERNAME);
      // dispatch(autoLogin(data.password, history));
      // dispatch(autoLoginTest(reqData, history));
      // console.log('RESPONSE=>', response);
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
      history(Routes.LandingPage.path);
    }
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const resetMyPassword = {
    url: endpoints.RESET_PASSWORD,
    method: 'POST',
    data,
    authorization: false,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: resetMyPassword});
};

/**
 * register patient initialization request
 * @param {Object} data
 * @param {Object} history
 * @param {Boolean} isApplicant
 * @returns {Array}
 */
export const completeProfile =
  (data, history, isApplicant, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.status) {
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
        if (isApplicant) {
          history(Routes.ProfileDetails.path);
        } else {
          history(Routes.MyProfile.path);
        }
      }
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const completeMyProfile = {
      url: isApplicant
        ? endpoints.APPLICANT_COMPLETE_PROFILE
        : endpoints.COMPLETE_PROFILE,
      method: 'POST',
      data: data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: completeMyProfile});
  };

/**
 * Get the Current user Profile
 * @param {Boolean} isApplicant
 * @returns {Array}
 */
export const myProfile = (isApplicant) => async (dispatch) => {
  const onSuccess = (response) => {
    dispatch({
      type: SET_MY_PROFILE,
      payload: response.data,
    });
    const drugDetails = response.data.drug;
    const treatmentDrugName = `${
      drugDetails?.brandName
    } (${drugDetails?.drugGenericName.toLowerCase()})`;
    secureLocalStorage.setItem(TREATMENT_DRUG_NAME, treatmentDrugName);
  };
  const onFailure = (value) => ({
    type: REDIRECT,
    payload: value,
  });
  const getMyProfile = {
    url: isApplicant ? endpoints.APPLICANT_PROFILE : endpoints.PATIENT_PROFILE,
    method: 'GET',
    data: null,
    authorization: true,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: getMyProfile});
};

/**
 * Update the current user Profile
 * @param {Object} data
 * @param {Boolean} isApplicant
 * @returns {Array}
 */
export const updateMyProfile =
  (data, isApplicant, onSuccess) => async (dispatch) => {
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const updateMyProfile = {
      url: isApplicant
        ? endpoints.APPLICANT_PROFILE_UPDATE
        : endpoints.PATIENT_PROFILE_UPDATE,
      method: 'POST',
      data,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    dispatch({type: API, payload: updateMyProfile});
  };

/**

 * Save Notification
 * @param {Object} data
 * @returns {Array}
 */
export const saveNotificationInStore =
  (notificationData) => async (dispatch) => {
    dispatch({type: SAVE_NOTIFICATION_IN_STORE, payload: notificationData});
  };
/**

 * Load Notification from database
 * @param {Object} data
 * @returns {Array}
 */
export const getNotifications =
  (mangoAccountId, pageNumber, size) => async (dispatch) => {
    const queryParams = {};
    pageNumber && (queryParams['page'] = pageNumber);
    size && (queryParams['limit'] = size);
    const onSuccess = (response) => {
      return {
        type: LOAD_NOTIFICATIONS,
        payload: response.data,
      };
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const loadNotifications = {
      url: endpoints.GET_NOTIFICATIONS,
      method: 'GET',
      data: queryParams,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: false,
    };
    dispatch({type: API, payload: loadNotifications});
  };
/**

 * Read Notification
 * @param {number} notificationId
 * @returns {Array}
 */
export const readNotification =
  (notificationId, onCustomSuccess) => async (dispatch) => {
    const onSuccess = () => {
      // return {
      //   type: READ_NOTIFICATION,
      //   payload: response.data,
      // };
      onCustomSuccess && onCustomSuccess(notificationId);
    };
    const onFailure = (value) => ({
      type: REDIRECT,
      payload: value,
    });
    const reqdata = {
      id: notificationId,
    };
    const loadNotifications = {
      url: endpoints.MARK_NOTIFICATION_READ,
      method: 'POST',
      data: reqdata,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: false,
    };
    dispatch({type: API, payload: loadNotifications});
  };

/**  reset the default password created  for newly register patient
 * @param {Object} reqData  
 * {
  "email": "string",
  "otp": "string",
  "phone": "string"
  }
 * @param {string} isApplicant 
    isApplicant will be bool to identify patient/applicant
 * @returns {Array}
 */
export const verifyOtp =
  (reqData, isApplicant, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.status) {
        dispatch(setToast(response.message, true, 'success'));
        dispatch(myProfile(isApplicant));
        customOnSuccess && customOnSuccess();
      }
    };
    const onFailure = (value) => {
      dispatch(setToast(value, true, 'error'));
    };
    const verifyOtp = {
      url: isApplicant
        ? endpoints.VERIFY_APPLICANT_OTP
        : endpoints.VERIFY_PATIENT_OTP,
      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    // console.log('VERIFY OTP REQDATA=>', verifyOtp);
    dispatch({type: API, payload: verifyOtp});
  };

/**
 *
 * @param {Object} reqData {email or phone}
 * @param {Boolean} isApplicant
 * @param {Function} customOnSuccess
 * @returns {Object}
 */
export const sendVerificationOtp =
  (reqData, isApplicant, customOnSuccess) => async (dispatch) => {
    const onSuccess = (response) => {
      if (response.status) {
        dispatch(setToast(response.message, true, 'success'));
        dispatch(myProfile(isApplicant));
        customOnSuccess && customOnSuccess();
      }
    };
    const onFailure = (value) => {
      // console.log('VALUE=>', value);
      dispatch(setToast(value, true, 'error'));
    };
    const sendOtp = {
      url: isApplicant
        ? endpoints.SEND_APPLICANT_OTP
        : endpoints.SEND_PATIENT_OTP,

      method: 'POST',
      data: reqData,
      authorization: true,
      onSuccess,
      onFailure,
      showLoader: true,
    };
    // console.log('VERIFY OTP REQDATA=>', verifyOtp);
    dispatch({type: API, payload: sendOtp});
  };
export const resendOtpForRegister = (reqData) => async (dispatch) => {
  const onSuccess = (response) => {
    if (response.status) {
      dispatch(setToast(ALERT_MESSAGE.RESEND_OTP, true, 'success'));
    }
  };
  const onFailure = (value) => {
    // console.log('VALUE=>', value);
    dispatch(setToast(value, true, 'error'));
  };
  const resendOtp = {
    url: endpoints.RESEND_OTP,
    method: 'POST',
    data: reqData,
    authorization: false,
    onSuccess,
    onFailure,
    showLoader: true,
  };
  dispatch({type: API, payload: resendOtp});
};

/**
 *When user clicks on change password from settings page, to show the modal in the screen to logout this store value is used
 * @param {Boolean} value
 *
 */
export const updateChangePasswordStatus = (value) => async (dispatch) => {
  dispatch({type: PASSWORD_CHANGED, payload: value});
};

export const tokenRefreshed = () => (dispatch) => {
  dispatch({
    type: TOKEN_REFRESHED,
  });
};

export const setCsrfToken = () => () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  fetch(
    `${import.meta.env.VITE_API_BASE_URL}${endpoints.GET_CSRF_TOKEN}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((tokenResp) => {
      setCookie(XSRF_TOKEN, tokenResp.token, endpoints.VBC_GATEWAY);
      secureLocalStorage.setItem(XSRF_TOKEN, tokenResp.token);
    })
    .catch(() => {
      // console.log('ERROR=>',error)
    });
};
/**
 * Sets user selected role and role name
 * @param {Object} reqData
 */
export const setSelectedRole = (roleId, roleName) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_ROLE,
    payload: {roleId, roleName},
  });
};

/** This AutoLogin Function is not temporarily required  */
// TODO If Required this function will be used in the future
// export const autoLogin = (password, history) => async (dispatch) => {
//   const LOGIN_KEYCLOAK_URL = import.meta.env.VITE_LOGIN_KEYCLOAK_URL;
//   const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
//   const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
//   const GRANT_TYPE = import.meta.env.VITE_GRANT_TYPE;
//   const SCOPE = import.meta.env.VITE_SCOPE;
//   dispatch({type: SET_LOADER, payload: true});
//   try {
//     const formData = new URLSearchParams();
//     formData.append('client_id', CLIENT_ID);
//     formData.append('client_secret', CLIENT_SECRET);
//     formData.append('grant_type', GRANT_TYPE);
//     formData.append('scope', SCOPE);
//     formData.append('username', localStorage.getItem(REGISTERED_USERNAME));
//     formData.append('password', password);
//     console.log('FORM DATA=>', formData);
//     const response = await axios(LOGIN_KEYCLOAK_URL, {
//       method: 'POST',
//       authorization: false,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: formData,
//     });
//     localStorage.setItem(TOKEN, response.access_token);
//     localStorage.setItem(REFRESH_TOKEN, response.refresh_token);
//     const userRole = localStorage.getItem(USER_SELECTED_ROLE);
//     /** if role is not selected by user - navigate user to user roles path */
//     !userRole && history(Routes.UserRoles.path);
//     dispatch({type: SET_LOADER, payload: false});
//   } catch {
//     dispatch({type: SET_LOADER, payload: false});
//   }
// };

// export const autoLoginTest = (data, history) => async (dispatch) => {
//   const LOGIN_KEYCLOAK_URL = import.meta.env.VITE_LOGIN_KEYCLOAK_URL;
//   const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
//   const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
//   const REACT_AUTO_LOGIN = process.env.REACT_AUTO_LOGIN;
//   const GRANT_TYPE = import.meta.env.VITE_GRANT_TYPE;
//   const SCOPE = import.meta.env.VITE_SCOPE;

//   const postData = {
//     client_id: CLIENT_ID,
//     grant_type: 'password',
//     username: data?.userName,
//     password: data?.password,
//   };

//   const config = {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   };
//   axios
//     .post(LOGIN_KEYCLOAK_URL, qs.stringify(postData), config)
//     .then((response) => {
//       if (response.status === 200) {
//         const parsedToken = decodeToken(response.data?.access_token);
//         // console.log('PARSED TOKEN=>', parsedToken);
//         localStorage.setItem(USER_ID, parsedToken.sub);
//         localStorage.setItem(TOKEN, response.data?.access_token);
//         localStorage.setItem(REFRESH_TOKEN, response.data?.refresh_token);
//         history(Routes.LandingPage.path);
//       }
//     })
//     .catch((err) => {
//       console.log('ERROR=>', err);
//     });
// };
