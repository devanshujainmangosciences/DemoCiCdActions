/**
 * This module contains all the constants related to authorization and authencitation.
 * Always try to add new constant in the end.
 */
export const TOKEN = 'react-token';
export const REFRESH_TOKEN = 'react-refresh-token';
export const USER_SELECTED_ROLE = 'user-selected-role';
export const USER_THEME = 'user-theme';
export const SELECTED_ROLE_NAME = 'selected-role-name';
export const LAST_SELECTED_ROLE = 'last-selected-role';
export const REGISTERED_DISPLAY_NAME = 'registered-display-name';
export const REGISTERED_USERNAME = 'registered-username';
export const REFRESH_TOKEN_TIME = 6000;
export const TOKEN_MIN_VALIDITY = 50;
export const USER_ID = 'user-id';
export const CURRENT_USER = 'current-user';
export const LAST_ROUTE_VISITED = 'lastRouteVisited';
export const DIRECT_PATH = 'directPath';
export const TARGET = 'target';
export const SECURE_TOKEN = 'secure-token';
export const LOAN_APPLICATION = 'loan-application';
export const WEB_STORAGE_SECRET_KEY = 'vbc';
export const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g;
export const XSRF_TOKEN = 'XSRF-TOKEN';
export const XSRF_TOKEN_HEADER = 'X-XSRF-TOKEN';
export const COOKIE = 'Cookie';
export const IP_REGEX_WITH_COMMA_SEPERATED =
  /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(,\n|,?$))/g;
// export const MOBILE_NUMBER_REGEX = /^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]$/g;
// export const MOBILE_NUMBER_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/g;
export const MOBILE_NUMBER_REGEX = /^[1-9]\d{9}$/g;
// export const MOBILE_NUMBER_REGEX = '^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]$';
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
export const ROLE_NAME_REGEX = /^[a-z_]*$/;
export const PAN_REGEX = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
export const AADHAR_REGEX = /^[0-9]\d{11}$/g;
export const URL_REGEX_2 = /(https?:\/\/[^ ]*)/;
export const NAME = ['firstName', 'middleName', 'lastName'];
export const TREATMENT_DRUG_NAME = 'treatment-drug-name';
