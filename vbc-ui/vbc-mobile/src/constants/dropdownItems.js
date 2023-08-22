/**
 * This module contains
 * all the static dropdown items that
 * are present in our application forms.
 */
export const genderTypes = [
  {value: 'MALE', id: 'MALE', label: 'MALE', name: 'MALE'},
  {value: 'FEMALE', id: 'FEMALE', label: 'FEMALE', name: 'FEMALE'},
];

export const insuranceOptions = [
  {id: 1, label: 'YES', value: 'YES', name: 'YES'},
  {id: 2, label: 'NO', value: 'NO', name: 'NO'},
];

export const countries = [
  {value: 'India', id: 1, label: 'India'},
  {
    value: 'United States',
    id: 2,
    label: 'United States',
  },
];

export const typeOfCancers = [
  {value: 'Lung Cancer', id: 1, label: 'Lung Cancer'},
  {value: 'Breast Cancer', id: 3, label: 'Breast Cancer'},
];

export const educationLevelOptions = [
  {id: 1, label: 'SSLC', value: 'SSLS'},
  {id: 2, label: 'HSC', value: 'HSC'},
  {id: 3, label: 'UG', value: 'UG'},
  {id: 4, label: 'PG', value: 'PG'},
];

export const professionOptions = [
  {id: 1, label: 'LABOUR', value: 'LABOUR'},
  {id: 2, label: 'PROFESSIONAL', value: 'PROFESSIONAL'},
  {id: 3, label: 'ARTIST', value: 'ARTIST'},
];

export const employerCompanyNameOptions = [
  {id: 1, label: 'TCS', value: 'TCS'},
  {id: 2, label: 'WIPRO', value: 'WIPRO'},
  {id: 3, label: 'BMW', value: 'BMW'},
];

export const industryOptions = [
  {id: 1, label: 'IT', value: 'IT'},
  {id: 2, label: 'AUTOMOBILE', value: 'AUTOMOBILE'},
  {id: 3, label: 'FINANCE', value: 'FINANCE'},
];

export const insuranceCompanyOptions = [
  {id: 1, label: 'HDFC LIFE', value: 'HDFC LIFE'},
  {id: 2, label: 'LIC', value: 'LIC'},
  {id: 3, label: 'AIG', value: 'AIG'},
];

//TODO: will make it dynamic later
export const occupationOptions = [
  {
    id: 3,
    label: 'Self Employed',
    value: 'SELF_EMPLOYED',
    name: 'Self Employed',
  },
  {
    id: 2,
    label: 'Salaried - Private',
    value: 'SALARIED_PRIVATE',
    name: 'Salaried - Private',
  },
  {
    id: 1,
    label: 'Salaried - Public',
    value: 'SALARIED_PUBLIC',
    name: 'Salaried - Public',
  },
  {
    id: 4,
    label: 'Business Owner',
    value: 'BUSINESS_OWNER',
    name: 'Business Owner',
  },
];

export const OCCUPATION_VALUE = {
  SELF_EMPLOYED: 'Self Employed',
  SALARIED_PRIVATE: 'Salaried - Private',
  SALARIED_PUBLIC: 'Salaried - Public',
  BUSINESS_OWNER: 'Business Owner',
};

export const PAYMENT_FRAMEWORK_VALUE = {
  SELF_PAY: 'Self Pay',
  LOAN_AGAINST_OWN_FD: 'Loan Against Own FD',
  LOAN_AGAINST_CAREGIVER_FD: 'Loan Against Caregivers FD',
  LOAN_WITH_FINANCIAL_ASSISTANCE: 'Loan With Financial Assistance',
};
