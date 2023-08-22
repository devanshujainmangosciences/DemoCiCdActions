/**
 * This module contains master data for professional data in financial section.
 * Always try to add new option at the end.
 */
const educationLevelOptions = [
  {id: 1, label: 'SSLC', value: 'sslc'},
  {id: 2, label: 'HSC', value: 'HSC'},
  {id: 3, label: 'UG', value: 'UG'},
  {id: 4, label: 'PG', value: 'PG'},
];
const professionOptions = [
  {id: 1, label: 'Labour', value: 'labour'},
  {id: 2, label: 'Entrepreneur', value: 'entrepreneur'},
  {id: 3, label: 'Artist', value: 'artist'},
];
const EmployerCompanyNameOptions = [
  {id: 1, label: 'HLC', value: 'hlc'},
  {id: 2, label: 'Wipro', value: 'wipro'},
  {id: 3, label: 'BMW', value: 'bmw'},
];
const IndustryOptions = [
  {id: 1, label: 'IT Industry', value: 'it'},
  {id: 2, label: 'New Industry', value: 'new'},
  {id: 3, label: 'Old Industry', value: 'old'},
];
const insuranceOptions = [
  {id: 1, label: 'Yes', value: true},
  {id: 2, label: 'No', value: false},
];
const insuranceCompanyOptions = [
  {id: 1, label: 'HDFC LIFE', value: 'HDFCLIFE'},
  {id: 2, label: 'LIC', value: 'LIC'},
  {id: 3, label: 'AIG', value: 'AIG'},
];
const occupationOptions = [
  {id: 1, label: 'Self Employed', value: 'SELF_EMPLOYED'},
  {id: 2, label: 'Salaried - Private', value: 'SALARIED_PRIVATE'},
  {id: 3, label: 'Salaried - Public', value: 'SALARIED_PUBLIC'},
  {id: 4, label: 'Business Owner', value: 'BUSINESS_OWNER'},
];
const professionNameOptions = [
  {id: 1, label: 'Doctor', value: 'doctor'},
  {id: 2, label: 'Chef', value: 'chef'},
  {id: 3, label: 'Developer', value: 'developer'},
  {id: 4, label: 'Artist', value: 'artist'},
];
const experienceOptions = [
  {id: 1, label: 'One year', value: 'one_year'},
  {id: 2, label: 'Two years', value: 'two_years'},
  {id: 3, label: 'Three years', value: 'three_years'},
  {id: 4, label: 'Four years', value: 'four_years'},
];
const grossAnnualIncomeOptions = [
  {id: 1, label: 'Ten Lakhs', value: 'ten_lakhs'},
  {id: 2, label: 'Twenty Lakhs', value: 'twenty_lakhs'},
  {id: 3, label: 'Thirty Lakhs', value: 'thirty_lakhs'},
  {id: 4, label: 'Fourty Lakhs', value: 'fourty_lakhs'},
];
const mainOrPrimaryBankOptions = [
  {id: 1, label: 'SBI Bank', value: 'sbi'},
  {id: 2, label: 'Indian Bank', value: 'indian'},
  {id: 3, label: 'Canara Bank', value: 'canara'},
  {id: 4, label: 'National Punjab Bank', value: 'pnb'},
];
const residenceTypeOptions = [
  {id: 1, label: 'Own', value: 'own'},
  {id: 2, label: 'Rental', value: 'rental'},
];
const salaryACwithBankOptions = [
  {id: 1, label: 'SBI Bank', value: 'sbi'},
  {id: 2, label: 'Indian Bank', value: 'indian'},
  {id: 3, label: 'Canara Bank', value: 'canara'},
  {id: 4, label: 'National Punjab Bank', value: 'pnb'},
];
const totalWorkExperienceOptions = [
  {id: 1, label: '1 Year', value: 'one_year'},
  {id: 2, label: '2 Year', value: 'two_years'},
  {id: 3, label: '3 Year', value: 'three_years'},
];

const employerNameOptions = [
  {id: 1, label: 'Manager', value: 'manager'},
  {id: 2, label: 'HR', value: 'hr'},
  {id: 3, label: 'Team Leader', value: 'team_leader'},
];
const durationYearsOptions = [
  {id: 1, label: '1 Year', value: 1},
  {id: 2, label: '2 Years', value: 2},
  {id: 3, label: '3 Years', value: 3},
  {id: 4, label: '4 Years', value: 4},
  {id: 5, label: '5 Years', value: 5},
  {id: 6, label: '6 Years', value: 6},
  {id: 7, label: '7 Years', value: 7},
  {id: 8, label: '8 Years', value: 8},
  {id: 9, label: '9 Years', value: 9},
  {id: 10, label: '10 Years', value: 10},
  {id: 11, label: '11 Years', value: 11},
  {id: 12, label: '12 Years', value: 12},
  {id: 13, label: '13 Years', value: 13},
  {id: 14, label: '14 Years', value: 14},
  {id: 15, label: '15 Years', value: 15},
  {id: 16, label: '16 Years', value: 16},
  {id: 17, label: '17 Years', value: 17},
  {id: 18, label: '18 Years', value: 18},
  {id: 19, label: '19 Years', value: 19},
  {id: 20, label: '20 Years', value: 20},
];
const durationMonthsOptions = [
  {id: 1, label: '1 Month', value: 1},
  {id: 2, label: '2 Months', value: 2},
  {id: 3, label: '3 Months', value: 3},
  {id: 4, label: '4 Months', value: 4},
  {id: 5, label: '5 Months', value: 5},
  {id: 6, label: '6 Months', value: 6},
  {id: 7, label: '7 Months', value: 7},
  {id: 8, label: '8 Months', value: 8},
  {id: 9, label: '9 Months', value: 9},
  {id: 10, label: '10 Months', value: 10},
  {id: 11, label: '11 Months', value: 11},
];
const companyTypeOptions = [
  {id: 1, label: 'LLP', value: 'LLP'},
  {id: 2, label: 'Partnership', value: 'partnership'},
  {id: 3, label: 'Pvt Ltd', value: 'privateLimited'},
  {id: 4, label: 'Public Ltd', value: 'publicLimited'},
  {id: 5, label: 'Proprietorship', value: 'proprietorship'},
  {id: 6, label: 'Director', value: 'director'},
];
const natureOfBusinessOptions = [
  {id: 1, label: 'Manufacturing', value: 'manufacturing'},
  {id: 2, label: 'Retailer', value: 'retailer'},
  {id: 3, label: 'Trader', value: 'trader'},
  {id: 4, label: 'Services', value: 'services'},
  {id: 5, label: 'Others', value: 'others'},
];

const industryTypeOptions = [
  {id: 1, label: 'SBI Bank', value: 'sbi'},
  {id: 2, label: 'Indian Bank', value: 'indian'},
  {id: 3, label: 'Canara Bank', value: 'canara'},
  {id: 4, label: 'National Punjab Bank', value: 'pnb'},
];
const mainBankerOfCompanyOptions = [
  {id: 1, label: 'X', value: 'x'},
  {id: 2, label: 'Y', value: 'y'},
];
export {
  educationLevelOptions,
  professionOptions,
  EmployerCompanyNameOptions,
  IndustryOptions,
  insuranceOptions,
  insuranceCompanyOptions,
  occupationOptions,
  professionNameOptions,
  experienceOptions,
  grossAnnualIncomeOptions,
  mainOrPrimaryBankOptions,
  residenceTypeOptions,
  employerNameOptions,
  totalWorkExperienceOptions,
  companyTypeOptions,
  natureOfBusinessOptions,
  industryTypeOptions,
  mainBankerOfCompanyOptions,
  salaryACwithBankOptions,
  durationMonthsOptions,
  durationYearsOptions,
};
