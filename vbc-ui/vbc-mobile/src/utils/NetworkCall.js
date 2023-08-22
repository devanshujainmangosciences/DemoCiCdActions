/**
 * Module function that helps in -
 * network service calls.
 */
import Axios from 'axios';
import Config from 'react-native-config';
import endpoints from 'apis/endpoints';
import {getSecretsDataFromState} from '../apis';

export const headers = {
  formUrlHeader: {'Content-Type': 'application/x-www-form-urlencoded'},
  applicationJSONHeader: {'Content-Type': 'application/json'},
};

// initialize a variable to store xcsrf token
var xsrfToken = '';

/** REST API call helper.
 * We pass url with body like parameters to
 * call network related parameters.
 */
export const apiCall = async (url, data, headers, method, printConsole) => {
  printConsole &&
    console.log(
      `API Call Parameters: \n-METHOD: ${method}, \n-URL: ${url}, \n-BODY: ${JSON.stringify(
        data
      )}, \n-HEADERS: ${JSON.stringify(headers)}`
    );

  /**
   *  Set Axios interceptor on Reuest sent and response received
   *  calculating total api response time from reuest start time
   *  and response end time.
   * */

  /* Axios.interceptors.request.use(
    function (config) {
      config.metadata = {startTime: new Date()};
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    function (response) {
      response.config.metadata.endTime = new Date();
      response.duration =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    function (error) {
      error.config.metadata.endTime = new Date();
      error.duration =
        error.config.metadata.endTime - error.config.metadata.startTime;
      return Promise.reject(error);
    }
  ); */

  // create request payload consisting of url, method, headers and data
  try {
    let requestConfig = {
      url,
      method,
      headers: headers,
      data: data || undefined,
    };

    if (
      xsrfToken === '' &&
      url !== Config.KEYVAULT_AZURE_URL &&
      url !== `${Config.KEYVAULT_GET_SECRETS_URL}?api-version=7.4`
    ) {
      //fetch csrf token which will be required to be then passed in all subsequent requests
      const xsrfResponse = await Axios({
        url: `${getSecretsDataFromState().MANGO_SCIENCES_API_URL}${
          endpoints.GET_CSRF_TOKEN
        }`,
        method: 'GET',
      });
      xsrfToken = xsrfResponse?.data?.token;
    }
    // required to send cookie in axios request
    Axios.defaults.withCredentials = false;
    const newHeaders = {
      ...requestConfig.headers,
      Cookie: `XSRF-TOKEN=${xsrfToken}`,
      ['X-XSRF-TOKEN']: xsrfToken,
    };

    requestConfig['headers'] = newHeaders;

    // call the api with new headers also consisting of csrf token and cookie of csrf token
    const apiResponse = await Axios(requestConfig);
    printConsole && console.log('API Success DATA: \n', apiResponse);
    return {apiResponse, apiError: null, apiStatus: ''};
  } catch (apiError) {
    printConsole &&
      console.log('API Failed ERROR: \n', apiError, `\n`, apiError.response);
    return {
      apiError: apiError.response?.data,
      apiResponse: null,
      apiStatus: apiError.response?.status,
    };
  }
};
