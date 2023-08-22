/**
 * This module contains all the payment framework used in enrolling vbc application
 */
export const PAYMENT_FRAMEWORK = {
  SELF_PAY: 'SELF_PAY',
  LOAN_AGAINST_OWN_FD: 'LOAN_AGAINST_OWN_FD',
  LOAN_AGAINST_CAREGIVER_FD: 'LOAN_AGAINST_CAREGIVER_FD',
  LOAN_WITH_FINANCIAL_ASSISTANCE: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
};
export const PAYMENT_FRAMEWORK_VALUE = {
  SELF_PAY: 'Self Pay',
  LOAN_AGAINST_OWN_FD: 'Loan Against Own FD',
  LOAN_AGAINST_CAREGIVER_FD: 'Loan Against Caregivers FD',
  LOAN_WITH_FINANCIAL_ASSISTANCE: 'Loan With Financial Assistance',
};
export const OCCUPATION = {
  SELF_EMPLOYED: 'SELF_EMPLOYED',
  SALARIED_PRIVATE: 'SALARIED_PRIVATE',
  SALARIED_PUBLIC: 'SALARIED_PUBLIC',
  BUSINESS_OWNER: 'BUSINESS_OWNER',
};
export const OCCUPATION_VALUE = {
  SELF_EMPLOYED: 'Self Employed',
  SALARIED_PRIVATE: 'Salaried - Private',
  SALARIED_PUBLIC: 'Salaried - Public',
  BUSINESS_OWNER: 'Business Owner',
};
export const OCCUPATION_KEY = {
  'Self Employed': 'SELF_EMPLOYED',
  'Salaried - Public': 'SALARIED_PUBLIC',
  'Salaried - Private': 'SALARIED_PRIVATE',
  'Business Owner': 'BUSINESS_OWNER',
};
export const OCCUPATION_ID = {
  SALARIED_PUBLIC: 1,
  SALARIED_PRIVATE: 2,
  SELF_EMPLOYED: 3,
  BUSINESS_OWNER: 4,
  'Salaried - Public': 1,
  'Salaried - Private': 2,
  'Self Employed': 3,
  'Business Owner': 4,
};
