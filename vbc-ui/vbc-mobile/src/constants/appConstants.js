/**
 * Constants defined
 * across the application.
 */

export const errorTypes = {
  accountNotSetUp: 'Account is not fully set up',
};

export const authoriedRoles = ['patient', 'applicant', 'new_patient'];

export const MINIMUM_INTERNET_SPEED_REQUIRED = 1.0; // IN MBps

export const MASTER_DATA_FIELDS = {
  BANKS: 'banks',
  CANCER_TYPES: 'cancerTypes',
  COMPANY_TYPES: 'companyTypes',
  COUNTRIES: 'countries',
  EMPLOYERS: 'employers',
  EXPERIENCES: 'experiences',
  GROSS_ANNUAL_INCOME: 'grossAnnualIncomes',
  INDUSTRY_TYPES: 'industryTypes',
  INSURANCE_COMPANIES: 'insuranceCompanies',
  LANGUAGES: 'languanges',
  NATURE_OF_BUSINESS: 'natureOfBusinesses',
  OCCUPATIONS: 'occupations',
  PROFESSIONS: 'professions',
  RESIDENCE_TYPES: 'residenceTypes',
  STATES: 'states',
  YEARS_IN_BUSINESS: 'yearsInBusiness',
  INCOME_RANGE_LIST: 'incomeRangeList',
  EDUCATION_LEVEL_LIST: 'educationLevelList',
  RELATIONSHIPS: 'relationships',
  DOCTOR_CHANGE_REASONS: 'doctorChangeReasons',
  CLINICAL_DROP_OUT: 'clinicalDropReasons',
  NON_CLINICAL_DROP_OUT: 'nonClinicalDropReasons',
  PATIENT_STATUSES: 'patientStatuses',
};

export const MASTER_DATA_STATE_COUNTRY = [
  MASTER_DATA_FIELDS.STATES,
  MASTER_DATA_FIELDS.COUNTRIES,
];
export const MASTER_DATA_COMPLETE_PROFILE = [
  MASTER_DATA_FIELDS.STATES,
  MASTER_DATA_FIELDS.COUNTRIES,
  MASTER_DATA_FIELDS.CANCER_TYPES,
  MASTER_DATA_FIELDS.RELATIONSHIPS,
];
export const MASTER_DATA_ME = [
  MASTER_DATA_FIELDS.PATIENT_STATUSES,
  MASTER_DATA_FIELDS.CLINICAL_DROP_OUT,
  MASTER_DATA_FIELDS.NON_CLINICAL_DROP_OUT,
  MASTER_DATA_FIELDS.DOCTOR_CHANGE_REASONS,
];

export const MASTER_DATA_FINANCE_PATIENT = [
  MASTER_DATA_FIELDS.EDUCATION_LEVEL_LIST,
  MASTER_DATA_FIELDS.PROFESSIONS,
  MASTER_DATA_FIELDS.EMPLOYERS,
  MASTER_DATA_FIELDS.INDUSTRY_TYPES,
  MASTER_DATA_FIELDS.INSURANCE_COMPANIES,
  MASTER_DATA_FIELDS.RELATIONSHIPS,
];

export const MASTER_DATA_FINANCE_APPLICANT = [
  MASTER_DATA_FIELDS.PROFESSIONS,
  MASTER_DATA_FIELDS.BANKS,
  MASTER_DATA_FIELDS.RESIDENCE_TYPES,
  MASTER_DATA_FIELDS.EMPLOYERS,
  MASTER_DATA_FIELDS.COMPANY_TYPES,
  MASTER_DATA_FIELDS.NATURE_OF_BUSINESS,
  MASTER_DATA_FIELDS.EMPLOYERS,
  MASTER_DATA_FIELDS.EDUCATION_LEVEL_LIST,
  MASTER_DATA_FIELDS.OCCUPATIONS,
  MASTER_DATA_FIELDS.INSURANCE_COMPANIES,
  MASTER_DATA_FIELDS.INDUSTRY_TYPES,
];

export const REPORT_TYPES = {
  LAB: 'lab',
  RADIOLOGIES: 'radiologies',
  SURGERY: 'surgery',
  MEDICATION: 'medication',
  OTHER_TESTS: 'other-tests',
  RADIATION_THERAPY: 'radiation-therapy',
  OTHER_TREATMENT: 'other-treatment',
  CLINICAL_NOTES: 'notes',
};

export const STORE_URL = {
  ANDROID: 'market://details?id=com.mangosciences.vbc',
  IOS: 'https://apps.apple.com/us/app/mango-cancer-care/id1585768635',
};
