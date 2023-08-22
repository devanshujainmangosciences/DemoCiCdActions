/**
 * This module contains all the utility functions
 * Always try to add new function in the end.
 */
import jwt_decode from 'jwt-decode';
import {
  TOKEN,
  REFRESH_TOKEN,
  USER_SELECTED_ROLE,
  SELECTED_ROLE_NAME,
  LAST_SELECTED_ROLE,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  USER_ID,
  LOAN_APPLICATION,
  LAST_ROUTE_VISITED,
  DIRECT_PATH,
  MOBILE_NUMBER_REGEX,
  PAN_REGEX,
  AADHAR_REGEX,
  DATA_TYPE,
  dynamicUrl,
  TREATMENT_DRUG_NAME,
  VALIDATE_DATE_TYPE,
  CURRENT_USER,
  DateFormat,
  IP_REGEX_WITH_COMMA_SEPERATED,
  GRANT_AMOUNT_TYPE,
} from '../constants';
import {useRef, useEffect} from 'react';
import {secureLocalStorage} from './web.storage';
import format from 'date-fns/format';
import differenceInYears from 'date-fns/differenceInYears';
import differenceInMonths from 'date-fns/differenceInMonths';
import compareAsc from 'date-fns/compareAsc';
import isValid from 'date-fns/isValid';
import {monthsData} from '../data/months';
import {store} from '../redux/store';
import {getReportSyncFlag} from '../actions';
import CustomOverHoverToolTip from '@/components/CustomOverHoverToolTip';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
/**
 * Takes Object as argument and form a queryParam string
 * @param {Object} queryParams
 * @returns {String}
 */
const getQueryString = (queryParams) => {
  const qs = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');
  return qs;
};

/**
 * Clear all local storage value and capturing which role was selected at last.
 */
const flushLocalStorage = () => {
  const currentRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
  secureLocalStorage.setItem(LAST_SELECTED_ROLE, currentRole);
  secureLocalStorage.removeItem(TOKEN);
  secureLocalStorage.removeItem(REFRESH_TOKEN);
  secureLocalStorage.removeItem(USER_SELECTED_ROLE);
  secureLocalStorage.removeItem(SELECTED_ROLE_NAME);
  secureLocalStorage.removeItem(TREATMENT_DRUG_NAME);
  secureLocalStorage.removeItem(USER_ID);
  secureLocalStorage.removeItem(CURRENT_USER);
  localStorage.removeItem(LOAN_APPLICATION);
  localStorage.removeItem(LAST_ROUTE_VISITED);
  localStorage.removeItem(DIRECT_PATH);
};
const forceLogout = () => {
  flushLocalStorage();
  window.keycloak && window.keycloak.logout();
  window.sse && window.sse.close();
};

/**
 * Takes Email string as argument and test that string with regex pattern provided
 * if it matches with the pattern returns true else false
 * @param {String} value
 * @returns {Boolean}
 */
const emailValidator = (value) => {
  // const emailRegex = new RegExp(EMAIL_REGEX).test(value);
  const emailRegex = value.match(EMAIL_REGEX);
  if (emailRegex || value === '') {
    return false;
  }
  return true;
};

/**
 * Takes Number as argument and test that Number with regex pattern provided
 * if it matches with the pattern returns true else false
 * @param {Number} value
 * @returns {Boolean}
 */
const mobileValidator = (value) => {
  // const mobileRegex = new RegExp(MOBILE_NUMBER_REGEX).test(value);
  const mobileRegex = value.match(MOBILE_NUMBER_REGEX);
  if (mobileRegex || value === '') {
    return false;
  }
  return true;
};

/**
 * Takes string and validate if given pan is valid or not using PAN_REGEX
 * @param {String} value
 * returns false if PAN entered is correct or else return true
 */
const panValidator = (value) => {
  const panRegex = value.match(PAN_REGEX);

  if (panRegex || value === '') {
    return false;
  }
  return true;
};

/**
 * Takes number and validates if entered number is valid format of aadhar number or not
 * @param {Number} value
 * @returns {Boolean} returns false if AADHAR entered is correct or else return true
 */
const aadharValidator = (value) => {
  const aadharValidator = value.match(AADHAR_REGEX);
  const condition = aadharValidator && validateVerhoeffAlgo(value);
  if (condition || value === '') {
    return false;
  }
  return true;
};
/**
 * Takes Date string as argument and checks that date is greater than today's
 * date and returns the boolean value
 * @param {String} value
 * @returns {Boolean}
 */
const dobValidator = (value) => {
  let recievedDate = new Date(value);
  let currentDate = new Date();
  const year = differenceInYears(currentDate, recievedDate);
  const months = differenceInMonths(currentDate, recievedDate);
  // console.log('Years, months=>', year, months);
  if (year > 100 || months < 6) return true;
  else return false;
};

/**
 * Validates the date
 * @param {String} value
 * @param {String} type
 * @returns {Boolean}
 */
const dateValidator = (value, type) => {
  let myDate = new Date(value);
  let today = new Date();
  const checkDate = compareAsc(today, myDate);
  const dateRecieved = format(myDate, 'dd-MM-yyyy');
  const todayDate = format(today, 'dd-MM-yyyy');
  const isToday = dateRecieved === todayDate;
  switch (type) {
    case VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE: {
      if (checkDate === -1) return true;
      break;
    }
    case VALIDATE_DATE_TYPE.RESTRICT_PAST_DATE: {
      if (checkDate === 1) return true;
      break;
    }
    case VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE_EXCLUDING_CURRENT: {
      if (isToday) return false;
      else if (checkDate === -1) return true;
      break;
    }
    case VALIDATE_DATE_TYPE.RESTRICT_PAST_DATE_EXCLUDING_CURRENT: {
      if (isToday) return false;
      else if (checkDate === 1) return true;
      break;
    }
    case VALIDATE_DATE_TYPE.ONLY_CURRENT_DATE:
      if (!isToday) return true;
      break;
    default:
      return false;
  }
  return false;
};

export const negativeNumberValidator = (value) => {
  if (value !== isNaN && value >= 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * Takes a string as argument and test that string with regex pattern provided
 * if it matches with the pattern returns true else false
 * @param {String} value
 * @returns {Boolean}
 */
const checkStrongPassword = (value) => {
  // const result = new RegExp(PASSWORD_REGEX).test(value);
  const result = value.match(PASSWORD_REGEX);

  return result;
};
/**
 * Validates if the file size in limits
 * @param {Number} limit
 * @param {Number} size
 * @returns {Boolean}
 */
const fileSizeValidator = (limit, size) => {
  const maxLimit = limit * 1024 * 1024;
  if (size > maxLimit) {
    return true;
  }
  return false;
};
/**
 *Checks the file type and validates, if validation success returns false else true
 *
 * @param {String} type
 * @returns {Boolean}
 */
const fileTypeValidator = (type) => {
  if (type) {
    const ext = type.split('/')[1];
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'pdf':
        return false;
      default:
        return true;
    }
  }
  return true;
};
/**
 * Takes in a Object as argument and trims all the string inside that object
 * @param {Object} body
 * @returns {Object}
 */
const trimmer = (body) => {
  if (body.length || body.length === 0) {
    return body;
  }
  return Object.keys(body).reduce((newBody, item) => {
    newBody[item] =
      typeof body[item] == 'string' ? body[item].trim() : body[item];
    return newBody;
  }, {});
};

const queryStringStringify = (object) => {
  let requiredData = '';
  const entries = Object.entries(object);
  for (let i = 0; i < entries.length; i++) {
    const element = entries[i];
    const key = element[0];
    const value = element[1];
    requiredData = requiredData + `${key}=${value}`;
    if (i !== entries.length - 1) requiredData = requiredData + '&';
  }
  return requiredData;
};

/**
 * Decodes the token
 * @param {Object} accessToken
 * @returns {Object}
 */
const decodeToken = (accessToken) => {
  return jwt_decode(accessToken);
};

const objectsEqual = (obj1, obj2) => {
  for (var propName1 in obj1) {
    if (obj1[propName1] === null || obj1[propName1] === undefined) {
      delete obj1[propName1];
    }
  }
  for (var propName2 in obj2) {
    if (obj2[propName2] === null || obj2[propName2] === undefined) {
      delete obj2[propName2];
    }
  }
  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((item) => obj1[item] === obj2[item])
  );
};

//Used for downloading the file
const downloadFile = (file, fileName) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
};

/* Function to create option data for select items for master dropdowns*/
const getOptionData = (recievedData) => {
  let optionData = [];
  if (recievedData?.length > 0) {
    recievedData.map((data, index) => {
      optionData.push({
        id: data?.id,
        label: data?.name,
        value: data?.name,
      });
      if (index === recievedData.length - 1) {
        const otherData = {
          id: recievedData.length + 1,
          label: 'Other',
          value: 'Other',
        };
        optionData.push(otherData);
      }
    });
  }
  // console.log('option Data=>', optionData);
  return optionData;
};

/**
 * Function to update redux store without mutating the state
 * @param {object} oldObject Previous State
 * @param {Object} updatedProperties  Updated State
 * @returns {Object}
 */
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
/**
 * Function to captalize first letter of an String
 * @param {String} string
 * @returns {String}
 */
const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Function to check master data and convert to appropriate values
 * @param {String} value  Recieved option value
 * @param {Array} masterDataList Array of master data which is used in dropdowns
 * @returns {String}
 */

const checkMasterValue = (value, masterDataList, displayValue) => {
  const recievedValue = parseInt(value);
  const isRecievedValueInteger = Number.isInteger(recievedValue);
  if (isRecievedValueInteger) {
    const requiredValue = masterDataList.find(({id}) => id === recievedValue);
    // console.log('REQUIRED VALUE=>', requiredValue);
    return displayValue
      ? captalizeEveryWordOfSentence(requiredValue?.name)
      : requiredValue?.name;
  } else {
    return displayValue ? captalizeEveryWordOfSentence(value) : value;
  }
};

/**
 * Function to check master data and convert to appropriate values
 * @param {*} value
 * @returns {*}
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * Multi Select checkbox for onSelectItem and onRemoveItem
 *
 *@param {array} value Latest selected values in the multi select input
 *@param {array} availableResourcePermission available values to be selected
 *@param {setResourcePermission} setResourcePermission Function to trigger state change
 */

const addationSelect = [
  {
    value: 'all',
    label: 'Select All',
  },
];

const onSelectItem = (
  value,
  availableResourcePermission,
  setResourcePermission
) => {
  const length = value.length;
  const lastAddedValue = value[length - 1];

  if (lastAddedValue?.value === 'all') {
    setResourcePermission(availableResourcePermission);
  } else setResourcePermission(value);
};

const onRemoveItem = (
  value,
  availableResourcePermission,
  setResourcePermission
) => {
  const length = value.length;
  const resourcesLength = availableResourcePermission.length;
  const ifSelectAllisPresent = value.find((v) => v.value === 'all');
  if (resourcesLength - length === 1 && !ifSelectAllisPresent) {
    setResourcePermission([]);
  } else setResourcePermission(value);
};

/**
 * This function is used to convert UTC Time to Local time.
 * @param {Date} time
 * @param {String} displayFormat
 * @returns {Date}
 */

const convertTimeToLocal = (time, displayFormat) => {
  if (!time) return '';
  let dt = new Date(time + 'Z');
  const result = format(new Date(dt), displayFormat);
  return result;
};

const convertDateToUTC = (date, displayFormat) => {
  if (!date) return;
  const requiredDate = new Date(Date.parse(date));
  const year = requiredDate.getUTCFullYear();
  const month = requiredDate.getUTCMonth();
  const dateValue = requiredDate.getUTCDate();
  return format(new Date(year, month, dateValue), displayFormat);
};

/**
 * To add the - value when entering aadhar number
 *
 * @param {String} value
 * @param {String} id
 * @returns {String}
 */
const insertDashInAadharNumber = (value, id) => {
  const element = document.getElementById(id);

  if (value.length === 4 || value.length === 9) {
    element.value = value + '-';
    return value + '-';
  } else return value;
};

/**
 * Remove any dash present in the aadhar number
 * @param {String} value
 * @returns {String}
 */
const removeDashInAadharNumber = (value) => {
  if (!value) return value;
  const splitdata = value.split('-');
  let reqValue = '';
  if (splitdata && splitdata.length > 0) {
    splitdata.map((data) => {
      if (data.length === 4) reqValue = reqValue + data;
    });
  }
  if (reqValue) return reqValue;
  else return value;
};

/**
 * The Verhoeff algorithm’s most common usage is in the UIDAI-Aadhaar number generation program
 *
 * returns false:- Input is not a valid aadhar number
 * returns true:- Input is a valid aadhar number or Input is Null
 *
 * @param {Number} number
 * @returns  {Boolean}
 */
const validateVerhoeffAlgo = (number) => {
  // multiplication table
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  // permutation table
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  // generates checksum
  let c = 0;
  let invertedArray = number.split('').map(Number).reverse();

  invertedArray.forEach((val, i) => {
    c = d[c][p[i % 8][val]];
  });

  return c === 0;
};
/**
 * This function recieved value and dataType and converts the value to particular data type.
 * @param {*} value
 * @param {String} dataType
 * @returns {*}
 */
const convertToCorrectDataType = (value, dataType) => {
  if (dataType === DATA_TYPE.NUMBER) return parseInt(value);
  else if (dataType === DATA_TYPE.STRING) return value.toString().trim();
  else return value;
};

/**
 * This function helps in creating option value for various master value
 * @param {Array} masterValue
 */
const returnMasterDataSelectValues = (masterValue) => {
  if (masterValue && masterValue.length > 0) {
    const requiredValues = masterValue.map((data) => {
      return {
        id: data?.id,
        label: data?.name,
        value: data?.name,
      };
    });
    return requiredValues;
  } else
    return [
      {
        id: 1,
        label: 'No Data!',
        value: '',
      },
    ];
};

/**
 * @param  {Object} userPermissions
 * @param  {string} url
 */
const checkIfRouteIsProtected = (userPermissions, url) => {
  /**
     * if the url entered by user is already permitted to all types of users?
    if (GenericRoutes.includes(url)) {
      return true;
    }
    */
  const selectedRole = secureLocalStorage.getItem(USER_SELECTED_ROLE);
  let toShow = false;
  const defaultRoute =
    userPermissions.roleDataMap[selectedRole].defaultRoute.url;
  if (url === defaultRoute) {
    toShow = true;
    return toShow;
  }
  // console.log('DEFAULT ROUTE (checkIfRouteIsProtected)=>', defaultRoute);
  // console.log('URL=>(checkIfRouteIsProtected)', url);
  const routes = userPermissions.roleDataMap[selectedRole].routes;
  // console.log('ROUTES PRESENT IN USER PERMISSION FOR A ROLE=>', routes);
  const modifiedUrl = shorternUrl(url, dynamicUrl);
  for (let i in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, i)) {
      // if (url.includes(routes[i].url)) { ,  Commented this out as this was old logic which was only partially comparing the routes
      if (routes[i].url.includes(modifiedUrl)) {
        // console.log(
        //   'URL Where TRUE Is HIT(checkIfRouteIsProtected)=>',
        //   routes[i],
        //   routes[i].url
        // );
        toShow = true;
        return true;
      }
    }
  }
  // console.log('TO SHOW=>', toShow);
  return toShow;
};

/**
 * This function checks if the url is part of dynamic url if yes it returns dynamic url instead of actual url
 * URL trying to accessm and dynamicUrl and the urls which can have any character after defined string
 * @param {String} url
 * @param {Array} dynamicUrl
 * @returns {String}
 */
const shorternUrl = (url, dynamicUrl) => {
  for (let i in dynamicUrl) {
    if (url.includes(dynamicUrl[i])) {
      return dynamicUrl[i];
    }
  }
  return url;
};
/**
 *This function check if the given URL contains https, if HTTPS then it returns the actual URL else ''
 * @param {String} url
 * @returns {String}
 */
const validateURL = (url) => {
  const parsed = new URL(url);
  return ['https:', 'http:'].includes(parsed.protocol) ? url : '';
};

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @param {Number} value
 * @returns {Boolean}
 */
const checkMinMaxValue = (min, max, value) => {
  const providedValue = parseFloat(value);
  if (providedValue >= min && providedValue <= max) return false;
  else return true;
};
/**
 *This function is used for setting the request data for API while creating/Editing the drug or Lender
 * @param {Array} drugLenderData
 * @param {String} selectedModuleName
 * @param {Number} requiredModuleId
 * @param {String} requiredModuleName
 * @returns {Object}
 */
const getDrugLenderReqData = (
  drugLenderData,
  selectedModuleName,
  requiredModuleId,
  requiredModuleName
) => {
  if (drugLenderData && drugLenderData.length > 0) {
    const reqData = drugLenderData.map((data) => {
      const item = {
        id: data?.id,
        [selectedModuleName]: data?.selectValue,
        grantType: data?.grantType,
        [data?.grantType === GRANT_AMOUNT_TYPE.FIXED
          ? 'grantAmount'
          : 'grantPercent']:
          data?.grantType === GRANT_AMOUNT_TYPE.FIXED
            ? parseInt(data?.grantPercentage)
            : parseFloat(data?.grantPercentage),
      };
      if (requiredModuleId) item[requiredModuleName] = requiredModuleId;
      return item;
    });
    return reqData;
  } else return drugLenderData;
};
/**
 * This function check if lenght of reqData is equal to Compare Data
 * @param {Array} reqData
 * @param {Array} compareData
 * @returns {Boolean}
 */
const isArrayLengthEqual = (reqData, compareData) => {
  if (reqData && compareData) {
    if (reqData?.length === compareData?.length) return true;
    else return false;
  } else return false;
};

/**
 * It takes the string and modifies it according to array of values passed
 *
 * @param {String} message
 * @param {Array} values
 * @returns {String}
 */
const dynamicMessageCreation = (message, values) => {
  let modifiedMessage = message;
  // console.log('VALUES=>', values);
  if (values && values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      const element = values[i];

      const searchItem = `{${i}}`.toString();
      modifiedMessage = modifiedMessage.replace(searchItem, element);
    }
  }
  // console.log('MODIFIED MESSAGE=>', modifiedMessage);
  return modifiedMessage;
};
/**
 * Returns true is value is present
 * @param {Array} field
 * @returns {Boolean}
 */
const checkifValueExists = (field) => {
  if (field && field.length) return true;
  else if (field && field.length === 0) return true;
  else return false;
};

/**
 * To format the URL and place the correct value in the placeholder.
 * @params {String} url
 * @params {Array} items
 * @returns {String}
 */
const formatEndpoint = (url, items) => {
  if (items && items.length > 0) {
    let requiredUrl = url;
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      const stringToReplace = `{${i}}`;
      const reqString = requiredUrl.replace(stringToReplace, element);
      requiredUrl = reqString;
    }
    return requiredUrl;
  } else return url;
};

/**
 * To get the cookie name and fetch the cookies from application cookies
 * @param {String} cookie_name
 * @returns {Boolean}
 */
const getCookie = (cookie_name) => {
  // Construct a RegExp object as to include the variable name
  const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
  try {
    return document.cookie.match(re)[0]; // Will raise TypeError if cookie is not found
  } catch {
    return false;
  }
};
/**
 * To set the cookies in Application cookies
 * @param {String} name
 * @param {*} value
 * @param {String} path
 * @param {Date} days
 */
const setCookie = (name, value, path, days) => {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + `; path=${path}`;
};

const isObjectEmpty = (obj) => {
  if (typeof obj === 'object' && obj !== null)
    return Object.keys(obj).length === 0;
  else if (!obj) return true;
};

/**
 *
 * @param {Array} dataList
 * @param {Number} activePage
 * @param {Function} setPaginationCallback
 * @param {Function} setDataCallback
 */
const setClientPaginationData = (
  dataList,
  activePage,
  pageSize,
  pagination,
  setPaginationCallback,
  setDataCallback
) => {
  if (dataList && dataList.length > 0) {
    const totalItems = dataList.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const indexOfLastData = activePage * pageSize;
    const indexOfFirstData = indexOfLastData - pageSize;
    const currentData = dataList.slice(indexOfFirstData, indexOfLastData);
    // console.log('TOTAL PAGES=>', totalPages);
    // console.log('TOTAL ITEMs=>', totalItems);
    setPaginationCallback({
      ...pagination,
      empty: false,
      first: activePage === 1 ? true : false,
      last: activePage === totalPages ? true : false,
      activePage: activePage,
      size: pageSize,
      numberOfElements: currentData.length,
      totalElements: totalItems,
      totalPages: totalPages,
    });
    setDataCallback(currentData);
  } else {
    setPaginationCallback({...pagination, empty: true});
    setDataCallback([]);
  }
};

/**
 * Added validation for IP address seperated by comma
 * @param {String} value
 * @returns {Boolean}
 */
const validateCommaSeperatedIP = (value) => {
  const ipRegex = value.match(IP_REGEX_WITH_COMMA_SEPERATED);
  if (ipRegex || value === '') {
    return false;
  }
  return true;
};
/**
 *
 * @param {String} value  Date String
 * @param {Boolean} needDateInBEformat  if need the valid date  in backend format i.e yyyy-mm-dd so that it can be processed by BE api
 * @returns {Boolean} if needDateInBEformat is false else it @returns {String}
 */
const validDateString = (value, needDateInBEformat) => {
  if (value) {
    let seperator = '';
    if (value.includes('/')) seperator = '/';
    else if (value.includes('-')) seperator = '-';
    else return false;
    const seperatedArray = value.split(seperator);
    if (
      seperatedArray &&
      seperatedArray.length &&
      seperatedArray.length === 3
    ) {
      const value1 = parseInt(seperatedArray[0]);
      const value2 = parseInt(seperatedArray[1]);
      const value3 = parseInt(seperatedArray[2]);
      if (!isNaN(value1) && !isNaN(value2) && !isNaN(value3)) {
        const dateValid = isValid(new Date(value1, value2, value3));
        if (seperatedArray[0].length === 2) {
          const day = seperatedArray[0];
          const month = seperatedArray[1];
          const year = seperatedArray[2];
          if (needDateInBEformat) return `${year}-${month}-${day}`;
          else return dateValid;
        } else if (seperatedArray[0].length === 4) {
          const day = seperatedArray[2];
          const month = seperatedArray[1];
          const year = seperatedArray[0];
          if (needDateInBEformat) return `${year}-${month}-${day}`;
          else return dateValid;
        } else return false;
      } else return false;
    } else return false;
  } else return false;
};

/**
 * Check if all the documents are uploaded or not
 * @param {Object} requiredDocuments
 * @returns {Boolean}
 */
const isApplicantDocumentsUploaded = (requiredDocuments) => {
  let allDocumentsUploaded = true;
  Object.values(requiredDocuments).map((value) => {
    Object.values(value).map((item) => {
      if (!item) allDocumentsUploaded = item;
    });
  });

  return allDocumentsUploaded;
};

/**
 * Convert camelCase word in seperate string Camel case
 * @param {String} camelCaseString
 * @returns {String}
 */
const splitCamelCaseString = (camelCaseString) => {
  try {
    let result = camelCaseString.replace(/([A-Z])/g, ' $1');
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    if (finalResult) return finalResult;
    else return camelCaseString;
  } catch (error) {
    return camelCaseString;
  }
};

/**
 * Sorts the Month data according to Month
 * @param {Object} months
 * @param {String} order
 * @returns {Array}
 */
const getMonthsDataSorted = (months, order = 'desc') => {
  if (order === 'desc') {
    const sortOrder = Object.keys(months).sort(
      (a, b) => monthsData.indexOf(b) - monthsData.indexOf(a)
    );
    return sortOrder;
  } else {
    const sortOrder = Object.keys(months).sort(
      (a, b) => monthsData.indexOf(a) - monthsData.indexOf(b)
    );
    return sortOrder;
  }
};

/**
 * Sorts month with data in desc order
 * @param {Object} months
 * @param {String} order
 * @returns {Array}
 */
const selectMonthWithData = (months, order = 'desc') => {
  if (order === 'desc') {
    const activeMonths = Object.keys(months)
      .filter((item) => months[item].total > 0)
      .sort((a, b) => monthsData.indexOf(b) - monthsData.indexOf(a));
    if (activeMonths && activeMonths.length > 0) return activeMonths;
  } else {
    const activeMonths = Object.keys(months)
      .filter((item) => months[item].total > 0)
      .sort((a, b) => monthsData.indexOf(a) - monthsData.indexOf(b));
    if (activeMonths && activeMonths.length > 0) return activeMonths;
  }
};

/**
 * Returns data for the values which are not defined
 * @param {String} value
 * @returns {String}
 */
const checkValue = (value, isNote, isNoteEnv, noteAlternateText) => {
  if (
    value === 'NULL' ||
    !value ||
    value === 'Null' ||
    value === 'null' ||
    value === 'NA' ||
    value === 'N/A' ||
    value === 'NaN'
  )
    return (
      <>
        {isNote ? (
          <span>{isNoteEnv ? isNoteEnv : noteAlternateText}</span>
        ) : (
          <span className="na-value">
            {checkEnvVariablesText(
              import.meta.env.VITE_NULL_VALUE,
              'Information not available'
            )}
          </span>
        )}
      </>
    );
  else return value;
};

/**
 * Checks the string and compares with NULL and Null and check for empty values also
 * @param {String} value
 * @returns {Boolean}
 */
const isValueNull = (value) => {
  if (
    !value ||
    value === 'Null' ||
    value === 'NULL' ||
    value === 'NaN' ||
    value === 'null' ||
    value === 'NA' ||
    value === 'N/A'
  )
    return true;
  else return false;
};

/**
 * It take medication name in Medication report and convert it to appropriate name
 * @param {String} name
 * @param {String} value
 * @returns {String}
 */
const convertMedicationName = (name, value) => {
  if (name === 'Non Cancer medication')
    return `Non-Cancer Medication ${value ? `(${value})` : ''}`;
  else if (name === 'Cancer medication')
    return `Cancer Medication ${value ? `(${value})` : ''}`;
  else {
    let reqName;
    const names = name.split(' ');
    names.map((item) => {
      if (reqName)
        reqName =
          reqName +
          item.charAt(0).toUpperCase() +
          item.slice(1).toLowerCase() +
          ' ';
      else
        reqName =
          item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() + ' ';
    });
    return reqName;
  }
};

/**
 * Converts Object Keys and sort in Alphabetical order
 * @param {Object} categories
 * @returns {Array}
 */
const sortObjectKeysByName = (categories) => {
  const sortedCategories = Object.keys(categories).sort((a, b) =>
    a === b ? 0 : a < b ? -1 : 1
  );
  return sortedCategories;
};

/**
 * Returns extenstion from the given string
 * @param {String} name
 * @returns {String}
 */
const getDocumentType = (name) => {
  const nameArray = name.split('.');
  const reqType = nameArray[nameArray.length - 1];
  if (reqType) return reqType.toUpperCase();
  else return reqType;
};

/**
 * Returns filename from the given string
 * @param {String} name
 * @returns {String}
 */
const getDocumentName = (name) => name.substr(0, name.lastIndexOf('.')) || name;

/**
 * Checks the dataSync value if present it just returns or else it fires API to fetch the value and return
 * @param {Boolean} dataSync
 * @returns {Boolean}
 */
const checkifReportsDataInSync = (dataSync) => {
  if (dataSync !== null) return dataSync;
  const customOnSuccess = (response) => {
    return response;
  };
  const customOnFaliure = () => {
    return dataSync;
  };
  store.dispatch(getReportSyncFlag(customOnSuccess, customOnFaliure));
};

/**
 * Take a string data consists of multiple words and return sentence with all the word in CamelCase
 * @param {String} sentence
 * @returns {String}
 */
const captalizeEveryWordOfSentence = (sentence) => {
  // console.log('SENT=>', sentence);
  if (!sentence) return;
  const sentenceArray = sentence.split(' ');
  let reqSentence = '';
  if (sentenceArray && sentenceArray.length > 0) {
    sentenceArray.map((word) => {
      if (word)
        reqSentence = !reqSentence
          ? capitalizeFirstLetter(word)
          : `${reqSentence} ${capitalizeFirstLetter(word)}`;
    });
  }
  // console.log('REQUIRED=>', reqSentence);
  return reqSentence;
};
/*
 * Check if envirnoment variable is null or undefined return the replacement text
 * @param {String} envVar
 * @param {String} replacementText
 * @returns {String}
 */
const checkEnvVariablesText = (envVar, replacementText) => {
  if (envVar) return envVar;
  return replacementText;
};

/**
 *  Component to display the Lable details
 * @param {String} label
 * @param {String} value
 * @param {Boolean} info
 * @param {String} toolTipText
 * @returns {Element}
 */
const LabelValue = ({label, value, info, toolTipText}) => {
  return (
    <div className="d-flex flex-column">
      <p className="p-0 m-0 text-pure-black">
        {label}{' '}
        {info && (
          <CustomOverHoverToolTip
            toolTipText={toolTipText ? toolTipText : label}
            placement="bottom">
            <FontAwesomeIcon icon={faInfoCircle} size="xs" />
          </CustomOverHoverToolTip>
        )}
      </p>

      <p className="p-0 m-0 fw-medium text-pure-black">
        {value ? value : 'N/A'}
      </p>
    </div>
  );
};
/**
 * Setting new token
 * @param {*} keycloak
 */
const setNewToken = (keycloak) => {
  const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
  const realm = import.meta.env.VITE_REALM;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const refreshToken = keycloak.refreshToken;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const reqData = queryStringStringify({
    client_id: clientId,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: reqData,
    redirect: 'follow',
  };

  const tokenUrl = `${keycloakUrl}realms/${realm}/protocol/openid-connect/token`;
  fetch(tokenUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const responseData = JSON.parse(result);
      const access_token = responseData?.access_token;
      const refresh_token = responseData?.refresh_token;
      secureLocalStorage.setItem(TOKEN, access_token);
      secureLocalStorage.setItem(REFRESH_TOKEN, refresh_token);
      const parsedLatestToken = decodeToken(access_token);
      const parsedLatestRefreshToken = decodeToken(refresh_token);
      const newKeycloakInstance = {...keycloak};
      newKeycloakInstance.tokenParsed = parsedLatestToken;
      newKeycloakInstance.refreshTokenParsed = parsedLatestRefreshToken;
      delete window.keycloak;
      window.keycloak = newKeycloakInstance;
    })
    .catch(() => {
      forceLogout();
    });
};

export {
  getQueryString,
  forceLogout,
  emailValidator,
  mobileValidator,
  dobValidator,
  checkStrongPassword,
  trimmer,
  decodeToken,
  objectsEqual,
  fileSizeValidator,
  fileTypeValidator,
  downloadFile,
  getOptionData,
  updateObject,
  capitalizeFirstLetter,
  checkMasterValue,
  usePrevious,
  onSelectItem,
  onRemoveItem,
  addationSelect,
  convertTimeToLocal,
  panValidator,
  aadharValidator,
  insertDashInAadharNumber,
  removeDashInAadharNumber,
  validateVerhoeffAlgo,
  convertToCorrectDataType,
  returnMasterDataSelectValues,
  checkIfRouteIsProtected,
  validateURL,
  checkMinMaxValue,
  getDrugLenderReqData,
  isArrayLengthEqual,
  dynamicMessageCreation,
  checkifValueExists,
  dateValidator,
  queryStringStringify,
  formatEndpoint,
  getCookie,
  setCookie,
  isObjectEmpty,
  setClientPaginationData,
  validateCommaSeperatedIP,
  validDateString,
  isApplicantDocumentsUploaded,
  splitCamelCaseString,
  getMonthsDataSorted,
  checkValue,
  isValueNull,
  selectMonthWithData,
  convertMedicationName,
  sortObjectKeysByName,
  getDocumentType,
  getDocumentName,
  checkifReportsDataInSync,
  captalizeEveryWordOfSentence,
  checkEnvVariablesText,
  convertDateToUTC,
  LabelValue,
  setNewToken,
};
