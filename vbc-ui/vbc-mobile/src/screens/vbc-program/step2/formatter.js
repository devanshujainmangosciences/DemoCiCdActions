/**
 * This module particularly used for
 * vbc program step 2 screen.
 * Data to and fro from API is being
 * transformed here.
 * Also handles initial states values
 */

export const initialFormFields = {
  accountNumber: null,
  bankName: null,
  bankIfscCode: null,
  bankBranch: null,
  panNumber: null,
  educationLevel: null,
  employerName: null,
  industry: null,
  insurance: null,
  insuranceCompany: null,
  maturityAmount: null,
  familyAnnualIncome: null,
  designation: null,
  selfAnnualIncome: null,
  otherIncomeSource: null,
  occupation: null,
};

export const initialFormFieldsError = {
  accountNumberError: null,
  bankNameError: null,
  bankIfscCodeError: null,
  bankBranchError: null,
  panNumberError: null,
  educationLevelError: null,
  employerNameError: null,
  industryError: null,
  insuranceError: null,
  insuranceCompanyError: null,
  maturityAmountError: null,
  familyAnnualIncomeError: null,
  designationError: null,
  selfAnnualIncomeError: null,
  otherIncomeSourceError: null,
  occupationError: null,
  apiError: null,
};

/**
 * required fields
 */
//KEPT COMMENTS DELIBERATELY
export const requiredFields = [
  // 'accountNumber',
  // 'bankName',
  // 'bankIfscCode',
  // 'bankBranch',
  // 'designation',
  // 'panNumber',
  // 'educationLevel',
  // 'occupation',
  // 'employerName',
  // 'industry',
  'selfAnnualIncome',
  // 'otherIncomeSource',
  // 'insurance',
  'familyAnnualIncome',
];
