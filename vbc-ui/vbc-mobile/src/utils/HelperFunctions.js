/**
 * This module helps to basically define
 * all the helper functions that are
 * used in defining logic at
 * component level.
 */
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  check as checkPermission,
  request as requestPermission,
} from 'react-native-permissions';
import EncryptedStorageKeys from 'constants/EncryptedStorageKeys';
import {authoriedRoles} from 'constants/appConstants';

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** get current date in DD-MM-YYYY format */
export const getCurrentFormattedDate = () => {
  return moment().format('DD-MM-YYYY');
};

// checks if access_token is expired by comparing its exp time with current time
export const isTokenExpired = (accessToken) => {
  if (accessToken) {
    let currentDate = new Date();
    const decodeTokenResponse = decodeToken(accessToken);
    return decodeTokenResponse?.exp < currentDate.getTime() / 1000;
  }
};

// returns years and months from total months passed as an argument
export const convertToYearsAndMonths = (
  monthsData,
  yearString,
  monthString
) => {
  if (monthsData) {
    var years = Math.floor(monthsData / 12);
    var months = monthsData % 12;
    return `${years} ${yearString} ${months} ${monthString}`;
  } else {
    return '';
  }
};

/** get date in DD-MM-YYYY format */
export const getFormattedDate = (date) => {
  return date ? moment(date).format('DD-MM-YYYY') : null;
};

/** get current date in Date object */
export const getCurrentDateInDateObject = () => {
  return new Date();
};

export const getMonthFromString = (mon) => {
  var month = months.indexOf(mon);
  return month + 1;
};

/** get date in Date object */
export const getDateInDateObject = (date) => {
  return date ? new Date(date) : null;
};

/** get date in DD MM YYYY format */
export const getFormattedDateInMonthWordFormat = (date) => {
  return date ? moment(date).format('DD MMM YYYY') : null;
};

/** get date in DD/MM/YYYY format */
export const getFormattedDateInSlashFormat = (date) => {
  return date ? moment(date).format('DD/MM/YYYY') : null;
};

/**
 * get date in YYYY-MM-DD format in string
 */
export const getDateInYMDFormat = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : null;
};

/**
 * get date in DD-MM-YYYY format in string
 */
export const getDateInDMYHyphenFormat = (date) => {
  return date ? moment(date).format('DD-MM-YYYY') : null;
};

// helps to check validity of email
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// validates mobile number. Whether it contains 10 digits or not.
export const validateMobile = (mobileNumber) => {
  const re = /^\d{10}$/;
  return re.test(mobileNumber);
};

// validates month to be less then 11
export const validateMonth = (month) => {
  return month <= 11;
};

/**
 * Takes Date string as argument and checks that date is greater than today's
 * date and returns the boolean value
 * @param {String} value
 * @returns {Boolen}
 */
export const dobValidator = (value) => {
  let myDate = moment(value);
  let today = moment();
  let recievedDate = new Date(value);
  let currentDate = new Date();
  let isInvalid = true;
  const maxAge = 100;
  const years = today.diff(myDate, 'years');
  const months = today.diff(myDate, 'months');

  if (years !== NaN && years <= maxAge && myDate !== today && months >= 6) {
    isInvalid = false;
  }
  if (recievedDate > currentDate) isInvalid = true;
  return !isInvalid;
};

/** validates both email & phone number */
export const validateEmailMobile = (emailMobile) => {
  const re = /^(?:\d{10}|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;
  return re.test(emailMobile);
};

/** validate password strongness */
export const validatePassword = (password) => {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  return re.test(password);
};

/** decode access_token */
export const decodeToken = (accessToken) => {
  return jwt_decode(accessToken);
};

// checks if user who logs in is authoried to access the application
export const isUserAuthorized = (decodeTokenResponse) => {
  const {
    realm_access: {roles},
  } = decodeTokenResponse;
  const found = roles?.some((role) => authoriedRoles?.indexOf(role) >= 0);
  return found;
};

/**
 * get dropdown item object depending upon
 * the dropdown value.
 */
export const getDropdownValueId = (dropdownItems, dropdownValue) => {
  const item = dropdownItems?.find((item) => item.value === dropdownValue);
  return item;
};

/**
 * store passed data in async storage by passed storageKey
 */
export const storeInAsyncStorage = async (storageKey, storageValueInString) => {
  await AsyncStorage.setItem(storageKey, storageValueInString);
  return;
};

/**
 * get parsed data from async storage
 */
export const getFromAsyncStorage = async (storageKey) => {
  const data = await AsyncStorage.getItem(storageKey);
  return data;
};

/**
 * clearing all keys from async storage
 */
export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
  return;
};

/**
 * removing passed keys from async storage
 */
export const removeKeyFromAsyncStorage = async (asyncStorageKey) => {
  await AsyncStorage.removeItem(asyncStorageKey);
  return;
};

/**
 * store passed data in encrypted storage by passed storageKey
 */
export const storeInEncryptedStorage = async (
  storageKey,
  storageValueInString
) => {
  await EncryptedStorage.setItem(storageKey, storageValueInString);
  return;
};

/**
 * get parsed data from encrypted storage
 */
export const getFromEncryptedStorage = async (storageKey) => {
  const data = await EncryptedStorage.getItem(storageKey);
  return data;
};

/**
 * clearing all keys from encrypted storage
 */
export const clearEncryptedStorage = async () => {
  await EncryptedStorage.clear();
  return;
};

/**
 * removing passed keys from encrypted storage
 */
export const removeKeyFromEncryptedStorage = async (storageKey) => {
  await EncryptedStorage.removeItem(storageKey);
  return;
};

/** calculates progress of update downloaded from code push, partial and total size in MB */
export const caculateCodePushProgress = (progress) => {
  let currProgress = parseFloat(
    progress.receivedBytes / progress.totalBytes
  ).toFixed(2);
  var partialSizeInMB = (progress.receivedBytes / (1024 * 1024)).toFixed(2);
  var totalSizeInMb = (progress.totalBytes / (1024 * 1024)).toFixed(2);
  return {currProgress, partialSizeInMB, totalSizeInMb};
};

export const fetchCodePushVersion = () => {
  return null
}

/** get logged in user data from async storage */
export const getLoggedInUserData = async () => {
  const data = await getFromEncryptedStorage(
    EncryptedStorageKeys.LOGGED_IN_USER_DATA
  );
  return data ? JSON.parse(data) : '';
};

/** to check permission */
export const checkPermissionHelperFunction = async (permission) => {
  const result = await checkPermission(permission);
  return result;
};

/** to request permission */
export const requestPermissionHelperFunction = async (permission) => {
  const permissionReq = await requestPermission(permission);
  return permissionReq;
};

// Accepts a string, and returns no information available if we are getting NULL in the value
export const renderForNoData = (value) => {
  if (value && value !== 'NULL') {
    return value;
  } else {
    return 'Information not available';
  }
};

/** get user role */
export const getUserRole = (userPermissions) => {
  if (!userPermissions) {
    return '';
  }
  const roleId = Object.keys(userPermissions.roles)[0];
  return userPermissions.roles[roleId].roleName;
};

/** get dropdown item value based on passed dropdownItem & dropdownId */
export const getDropdownValueItemValue = (dropdownItems, dropdownId) => {
  if (!dropdownItems || dropdownItems.length === 0) {
    return '';
  }
  const index = dropdownItems.findIndex((item) => item.id == dropdownId);
  let result;
  if (index >= 0) {
    result = dropdownItems[index].value || dropdownItems[index].name;
  } else {
    result = '';
  }
  return result;
};

/** get dropdown item id based on passed dropdownItem & dropdownValue */
export const getDropdownValueItemId = (dropdownItems, dropdownValue) => {
  if (!dropdownItems || dropdownItems.length === 0) {
    return '';
  }
  const index = dropdownItems.findIndex(
    (item) => item.value == dropdownValue || item.name == dropdownValue
  );
  let result;
  if (index >= 0) {
    result = dropdownItems[index].id;
  } else {
    result = '';
  }
  return result;
};

/**
 * The Verhoeff algorithm’s most common usage is in the UIDAI-Aadhaar number generation program
 *
 * returns false:- Input is not a valid aadhar number
 * returns true:- Input is a valid aadhar number or Input is Null
 */
export const validateVerhoeffAlgo = (number) => {
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
 * Takes string and validate if given pan is valid or not using PAN_REGEX
 * returns true if PAN entered is correct or else return false
 */
export const panValidator = (value) => {
  const PAN_REGEX = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  const panRegex = value.match(PAN_REGEX);
  if (panRegex || value === '') {
    return true;
  }
  return false;
};

/**
 * Takes number and validates if entered number is valid format of aadhar number or not
 * @returns returns true if AADHAR entered is correct or else return false
 */
export const aadharValidator = (value) => {
  const AADHAR_REGEX = /^[0-9]\d{11}$/g;
  const aadharValidator = value.match(AADHAR_REGEX);
  const condition = aadharValidator && validateVerhoeffAlgo(value);
  if (condition || value === '') {
    return true;
  }
  return false;
};
