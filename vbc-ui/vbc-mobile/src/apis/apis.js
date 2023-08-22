/**
 * This module helps to chalk out
 * all the api requests that are present in
 * our application.
 */
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from 'react-native-push-notification';
import Config from 'react-native-config';

import {
  apiCall as serviceUtilityCall,
  getLoggedInUserData,
  headers,
} from '../utils';
import {
  getAndroidStorageConfig,
  getIosStorageConfig,
} from '../constants/StorageConfig';
import {
  getMasterDataAction,
  getSecretsDataSuccessAction,
  loginApiSuccessAction,
  logoutAction,
} from '../actions';
import reduxStore from '../store';
import endpoints from './endpoints';
import {decodeToken, isTokenExpired} from '../utils';

export const apiCall = async (url, data, headers, method, printConsole) => {
  const userData = await getLoggedInUserData();
  /** Check if Authorization header is present or not,
   * if authorization header is present that means api other then login/registeration flow is called,
   * in this case check if the token is expired or not, if token is expired,
   * then generate new token using refresh token api call and then again call the last api,
   * else call the api directly as usual.
   * if Aurhorization is present in header, that means we are in login/registeraton flow,
   * in this case, directly call the api, instead of checking token expire.
   */

  if (headers.Authorization && userData) {
    // check if token passed is expire or not
    const isExpired = isTokenExpired(userData?.access_token);
    // if token is not expired, then call the api
    if (!isExpired) {
      const header = {
        ...headers,
        Authorization: `Bearer ${userData?.access_token}`,
      };
      const response = await serviceUtilityCall(
        url,
        data,
        header,
        method,
        printConsole
      );
      return response;
    } else {
      // cll refresh token api if token is expired to generate new token
      const {refresh_token} = userData;
      const {
        apiResponse: refreshTokenApiResponse,
        apiError: refreshTokenApiError,
      } = await getNewAccessTokenFromRefreshTokenApiCall(refresh_token);
      if (refreshTokenApiResponse) {
        await reduxStore.dispatch(
          loginApiSuccessAction(refreshTokenApiResponse.data)
        );
        let newHeaders;
        const newAccessToken = refreshTokenApiResponse?.data?.access_token;
        newHeaders = {
          ...headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        // call the last api with updated new access token
        const newResponse = await serviceUtilityCall(
          url,
          data,
          newHeaders,
          method,
          printConsole
        );
        return newResponse;
      } else if (refreshTokenApiError) {
        // if refresh token api fails, then logout the user
        await reduxStore.dispatch(logoutAction(true));
        return null;
      }
    }
  } else {
    // call api as usual, if authorization is not present in header
    const response = await serviceUtilityCall(
      url,
      data,
      headers,
      method,
      printConsole
    );
    return response;
  }
};

export const apiCallSecrets = async (
  url,
  data,
  headers,
  method,
  printConsole
) => {
  const response = await serviceUtilityCall(
    url,
    data,
    headers,
    method,
    printConsole
  );
  return response;
};

export const getSecretsDataFromState = () => {
  const state = reduxStore.getState();
  const {login} = state;
  const {secretsData} = login;
  return secretsData;
};

/** downloads the file acc to storage StorageConfig  */
export const downloadApiCall = async (
  url,
  documentFormat,
  access_token,
  printConsole
) => {
  try {
    const data = await RNFetchBlob.config(
      Platform.select({
        android: getAndroidStorageConfig(documentFormat),
        ios: getIosStorageConfig(documentFormat),
      })
    ).fetch('GET', url, {
      Authorization: `Bearer ${access_token}`,
    });
    printConsole && console.log(data);
    if (Platform.OS === 'ios') {
      RNFetchBlob.ios.openDocument(data.data);
    }
    return {apiResponse: data, apiError: null};
  } catch (err) {
    return {apiResponse: null, apiError: err};
  }
};

// get new access token using refresh token api call
export const getNewAccessTokenFromRefreshTokenApiCall = async (
  refreshToken
) => {
  const secretsData = getSecretsDataFromState();
  const formData = new URLSearchParams();
  formData.append('client_id', secretsData.CLIENT_ID);
  formData.append('grant_type', Config.REFRESH_GRANT_TYPE);
  formData.append('scope', Config.SCOPE);
  formData.append('refresh_token', refreshToken);

  const newResponse = await serviceUtilityCall(
    secretsData.LOGIN_KEYCLOAK_URL,
    formData.toString(),
    headers.formUrlHeader,
    'POST',
    false
  );

  return newResponse;
};

// login api call
export const loginApiCall = async ({userName, password}) => {
  const secretsData = getSecretsDataFromState();
  PushNotification.requestPermissions();
  const formData = new URLSearchParams();
  formData.append('client_id', secretsData.CLIENT_ID);
  formData.append('grant_type', Config.GRANT_TYPE);
  formData.append('scope', Config.SCOPE);
  formData.append('username', userName);
  formData.append('password', password);
  const response = await apiCall(
    secretsData.LOGIN_KEYCLOAK_URL,
    formData.toString(),
    headers.formUrlHeader,
    'POST',
    false
  );
  return response;
};

// get reset password token api call
export const getResetPasswordTokenApiCall = async (username) => {
  let url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
    endpoints.getTokenForResetPassword
  }?username=${username}`;
  const header = {
    ...headers.applicationJSONHeader,
    uuid: Config.RESET_PASSWORD_TOKEN,
  };
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** add device api call */
export const addDevice = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.addDevice;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** logout */
export const logoutApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url = getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.logout;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** fetch app version update required or not */
export const getVersionApiCall = async (body) => {
  let url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
    endpoints.getVersionInfo
  }`;
  const header = {
    ...headers.applicationJSONHeader,
  };
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** fetch secrets from azure key vault */
export const getSecretsApiCall = async () => {
  let azureLoginUrl = Config.KEYVAULT_AZURE_URL;
  const formData = new URLSearchParams();
  formData.append('grant_type', Config.KEYVAULT_GRANT_TYPE);
  formData.append('client_id', Config.KEYVAULT_CLIENT_ID);
  formData.append('client_secret', Config.KEYVAULT_CLIENT_SECRET);
  formData.append('scope', Config.KEYVAULT_SCOPE);
  const header = {
    ...headers.formUrlHeader,
  };
  const tokenResponse = await apiCallSecrets(
    azureLoginUrl,
    formData.toString(),
    header,
    'POST',
    false
  );
  const {apiResponse} = tokenResponse;

  let url = `${Config.KEYVAULT_GET_SECRETS_URL}?api-version=7.4`;
  const secretsHeader = {
    Authorization: `Bearer ${apiResponse?.data?.access_token}`,
  };
  const response = await apiCallSecrets(url, null, secretsHeader, 'GET', false);
  const {apiResponse: secretsApiResponse} = response;
  const {
    data: {value},
  } = secretsApiResponse;
  const secretsData = {};
  if (value.length > 0) {
    value.map((item) => {
      if (item.id.includes('keycloak-auth-url')) {
        secretsData['LOGIN_KEYCLOAK_URL'] = item.contentType;
      } else if (item.id.includes('keycloak-client-id')) {
        secretsData['CLIENT_ID'] = item.contentType;
      } else if (item.id.includes('api-base-url')) {
        secretsData['MANGO_SCIENCES_API_URL'] = `${item.contentType}/`;
      }
    });
  }
  await reduxStore.dispatch(getSecretsDataSuccessAction(secretsData));
  return response;
};

/** Forgot password api call */
export const forgotPasswordApiCall = async (body) => {
  const header = {
    ...headers.applicationJSONHeader,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.forgotPasswordNew;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** get user permissions - rbac */
export const getPermissionsApiCall = async (access_token) => {
  let url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
    endpoints.getPermissions
  }`;
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get master data for dropdown fields */
export const getMasterDataApiCall = async (requestData) => {
  const userData = await getLoggedInUserData();
  const {access_token} = userData;
  let url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
    endpoints.getMasterData
  }`;
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const response = await apiCall(url, requestData, header, 'POST', false);
  await reduxStore.dispatch(
    getMasterDataAction(response?.apiResponse?.data?.data)
  );
  return response;
};

/** register api call */
export const registerationApiCall = async (body) => {
  const header = {
    ...headers.applicationJSONHeader,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.register;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** resend otp api call */
export const resendOtpApiCall = async (body) => {
  const header = {
    ...headers.applicationJSONHeader,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.resendOtp;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** contact support api call */
export const contactSupportApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.contactSupport;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** verify otp call */
export const verifyOTPApiCall = async (body) => {
  const header = {
    ...headers.applicationJSONHeader,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.verifyOTP;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** reset password api call */
export const resetPasswordApiCall = async (body) => {
  const header = {
    ...headers.applicationJSONHeader,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.resetPassword;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** reset password api call */
export const changePasswordApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.changePassword;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** verify contact details api call */
export const verifyContactDetailsApiCall = async (
  body,
  access_token,
  isApplicant
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url = isApplicant
    ? getSecretsDataFromState().MANGO_SCIENCES_API_URL +
      endpoints.verifyContactDetailsApplicant
    : getSecretsDataFromState().MANGO_SCIENCES_API_URL +
      endpoints.verifyContactDetailsPatient;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** get otp api call */
export const getOtpApiCall = async (body, access_token, isApplicant) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url = isApplicant
    ? getSecretsDataFromState().MANGO_SCIENCES_API_URL +
      endpoints.getOtpApplicant
    : getSecretsDataFromState().MANGO_SCIENCES_API_URL +
      endpoints.getOtpPatient;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** fetch hospitals api call */
export const fetchHospitalsApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.fetchHospitals;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch drugs api call */
export const fetchDrugsApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.fetchDrugs;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch doctors api call */
export const fetchDoctorsApiCall = async (hospitalId, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.fetchDoctors;
  url = `${url}/${hospitalId}`;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch cities api call */
export const fetchCityListApiCall = async (stateId, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.fetchCities;
  url = `${url}/${stateId}`;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** registration complete profile api call */
export const registrationCompleteProfileApiCall = async (
  body,
  access_token,
  isEditProfile, // this call is regarding edit profile or complete profile
  isApplicant
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.registrationCompleteYourProfile;
  if (isEditProfile) {
    const subUrl = isApplicant
      ? endpoints.editApplicantRegistrationCompleteYourProfile
      : endpoints.editRegistrationCompleteYourProfile;
    url = getSecretsDataFromState().MANGO_SCIENCES_API_URL + subUrl;
  }
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** get registration complete profile user details */
export const getRegistrationCompleteProfileApiCall = async (
  access_token,
  isApplicant
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const subUrl = isApplicant
    ? endpoints.getApplicantProfileDetails
    : endpoints.getRegistrationCompleteYourProfile;
  let url = getSecretsDataFromState().MANGO_SCIENCES_API_URL + subUrl;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/**
 * PBP Enrollment
 * fetch vbc program details
 */
export const getVbcProgramEnrollmentApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getVbcProgramEnrollment;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get loan amount */
export const getVbcLoanAmountApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.vbcGetLoanAmount;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch user financial information */
export const fetchFinancialInformationApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchFinancialInformation;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/**
 * Editing financial information
 */
export const editFinancialInformationApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.editFinancialInformation;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/**
 * get user info
 */
export const getUserInfoApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    'Content-Type': 'text/plain',
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.userInfo;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** fetch get document types */
export const fetchDocumentTypesApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getDocumentTypes;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch applicant overview data */
export const fetchApplicantOverviewDataApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchApplicantOverviewData;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch applicant overview data */
export const fetchApplicantsDataApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchApplicantsData;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch alerts data */
export const fetchAlertsApiCall = async (access_token, page) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchAlerts +
    `?limit=10&page=${page}`;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** read alert api call */
export const readAlertApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.readAlert;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** submit to mango executive */
export const submitToMangoExecutiveApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.submitToMangoExecutive;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch applicant loan application data */
export const fetchApplicantLoanApplicationDataApiCall = async (
  access_token
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchApplicantLoanApplicationDetails;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch applicant financial information data */
export const fetchApplicantFinancialInformationDataApiCall = async (
  access_token
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.fetchApplicantFinancialInformationData;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** fetch uploaded documents */
export const fetchUploadedDocumentsApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getUploadedDocuments;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** download document */
export const downloadDocumentApiCall = async (
  documentId,
  documentFormat,
  access_token
) => {
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.downloadDocument +
    `/${documentId}`;
  const data = await downloadApiCall(url, documentFormat, access_token, false);
  return data;
};

/** upload document */
export const uploadDocumentApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.uploadDocument;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** upload document for patient */
export const uploadDocumentForPatientApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.uploadDocumentPatient;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** delete document */
export const deleteDocumentApiCall = async (documentId, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.deleteDocument +
    `/${documentId}`;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** applicant - complete application - step 1 */
export const applicantCompleteApplicationStep1ApiCall = async (
  access_token,
  body
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.submitApplicantCompleteApplicationStep1;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** applicant - complete application - step 2 */
export const applicantCompleteApplicationStep2ApiCall = async (
  access_token,
  body
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.submitApplicantCompleteApplicationStep2;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** applicant - complete application - step 3 */
export const applicantCompleteApplicationStep3ApiCall = async (
  access_token,
  body
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.submitApplicantCompleteApplicationStep3;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** applicant - complete application - step 2 */
export const applicantCompleteApplicationStep4ApiCall = async (
  access_token,
  body
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.submitApplicantCompleteApplicationStep4;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** get required documents id */
export const fetchRequiredDocumentsApiCall = async (
  access_token,
  occupationId
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getRequiredDocuments +
    `/${occupationId}`;
  const data = await apiCall(url, null, header, 'GET', false);
  return data;
};

/** save PBP Program Step 1 data */
export const storeVbcProgramStep1ApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.storeVbcProgramStep1;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** save PBP Program Step 2 data */
export const storeVbcProgramStep2ApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.storeVbcProgramStep2;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** save PBP Program Step 3 data */
export const storeVbcProgramStep3ApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.storeVbcProgramStep3;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** save PBP Program Step 4 data */
export const storeVbcProgramStep4ApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.storeVbcProgramStep4;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** reapply PBP Program */
export const reapplyVbcProgramApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.reapplyVbcProgramApiCall;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** cancel PBP Program */
export const cancelVbcProgramApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.cancelVbcProgramApiCall;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** add applicant */
export const addApplicantApiCall = async (body, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL + endpoints.addApplicant;
  const response = await apiCall(url, body, header, 'POST', false);
  return response;
};

/** delete applicant */
export const deleteApplicantApiCall = async (applicantId, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.deleteApplicant +
    applicantId;
  const response = await apiCall(url, null, header, 'POST', false);
  return response;
};

/** get PBP schedule  */
export const getVbcScheduleApiCall = async (drugId, access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getVbcSchedule +
    drugId;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get drug schedule  */
export const getDrugScheduleApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getDrugSchedule;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** acknowledge first grant  */
export const acknowledgeFirstGrantApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.acknowledgeFirstGrant;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get drug schedule overview  */
export const getDrugScheduleOverviewApiCall = async (access_token) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url =
    getSecretsDataFromState().MANGO_SCIENCES_API_URL +
    endpoints.getDrugScheduleOverview;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get reports sync status  */
export const getReportsSyncStatusApiCall = async (access_token) => {
  const {sub: userId} = decodeToken(access_token);
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  let url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
    endpoints.getReportsSyncStatus
  }?userid=${userId}`;
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};

/** get reports  */
export const getReportsApiCall = async (
  reportType,
  access_token,
  month,
  year,
  category,
  page
) => {
  const header = {
    ...headers.applicationJSONHeader,
    Authorization: `Bearer ${access_token}`,
  };
  const {sub: userId} = decodeToken(access_token);
  let url = '';
  if (month && year && category) {
    url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
      endpoints.getReports
    }${reportType}?page=${page}&userid=${userId}&month=${month}&year=${year}&category=${encodeURIComponent(
      category
    )}`;
  } else {
    url = `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
      endpoints.getReports
    }${reportType}?userid=${userId}`;
  }
  const response = await apiCall(url, null, header, 'GET', false);
  return response;
};
