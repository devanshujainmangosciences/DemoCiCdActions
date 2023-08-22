/**
 * Defines all -
 * Action types
 */

export default {
  // AUTH SCREENs
  LOGIN_API_SUCCESS: 'LOGIN_API_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGIN_API_ADMIN_SUCCESS: 'LOGIN_API_ADMIN_SUCCESS',

  REPORTS_SYNC_STATUS: 'REPORTS_SYNC_STATUS',

  ALERTS: 'ALERTS',
  UPDATE_ALERTS: 'UPDATE_ALERTS',

  SELECT_VALUE: 'SELECT_VALUE',

  // LOGGEDIN USER's permissions
  USER_PERMISSIONS: 'USER_PERMISSIONS',
  MASTER_DATA: 'MASTER_DATA',

  SECRETS_DATA: 'SECRETS_DATA',

  // REGISTRATION SCREENs
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  VERIFY_OTP_SUCCESS: 'VERIFY_OTP_SUCCESS',

  // PBP Program SCREENs
  VBC_PROGRAM: 'VBC_PROGRAM',
  VBC_PROGRAM_STEP_1: 'VBC_PROGRAM_STEP_1',
  VBC_PROGRAM_STEP_2: 'VBC_PROGRAM_STEP_2',
  VBC_PROGRAM_STEP_ADD_APPLICANT: 'VBC_PROGRAM_STEP_ADD_APPLICANT',
  VBC_PROGRAM_VBC_SCHEDULE: 'VBC_PROGRAM_VBC_SCHEDULE',
  VBC_PROGRAM_DRUG_SCHEDULE: 'VBC_PROGRAM_DRUG_SCHEDULE',
  VBC_PROGRAM_RESET_DATA: 'VBC_PROGRAM_RESET_DATA',

  // OTHERS SCREENs
  // EDIT_FINANCIAL_INFORMATION: 'EDIT_FINANCIAL_INFORMATION',
  DOCUMENT_TYPES: 'DOCUMENT_TYPES',

  // APPLICANTs SCREENs
  APPLICANT_OVERVIEW: 'APPLICANT_OVERVIEW',
  APPLICANT_PROGRAM: 'APPLICANT_PROGRAM',
  APPLICANT_PROGRAM_STEP_1: 'APPLICANT_PROGRAM_STEP_1',
  APPLICANT_PROGRAM_STEP_2: 'APPLICANT_PROGRAM_STEP_2',
  APPLICANT_PROGRAM_STEP_3: 'APPLICANT_PROGRAM_STEP_3',
  APPLICANT_PROGRAM_STEP_4: 'APPLICANT_PROGRAM_STEP_4',
};
