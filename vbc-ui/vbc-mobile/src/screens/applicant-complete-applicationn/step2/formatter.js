/**
 * Transformation module to handle
 * Applicant's Complete Application Step2
 * data
 */
export const initialFormFieldsState = {
  bankAccountNumber: null,
  bankName: null,
  bankBranch: null,
  bankIfscCode: null,
  employerName: null,
  netMonthlyIncome: null,
  grossAnnualIncome: null,
  companyType: null,
  annualProfit: null,
  sales: null,
  residenceType: null,
  professionName: null,
  primaryBank: null,
  salaryBankAccount: null,
  companyName: null,
  natureOfBusiness: null,
  industryType: null,
  mainBankerOfCompany: null,
  tenureYears: null,
  tenureMonths: null,
  yearsInBusiness: null,
  monthInBusiness: null,
  workExperienceYears: null,
  workExperienceMonths: null,
  experienceYears: null,
  experienceMonths: null,
  anyOtherAsset: null,
  occupation: null,
};

export const initialFormFieldsErrorState = {
  bankAccountNumberError: null,
  bankNameError: null,
  bankBranchError: null,
  bankIfscCodeError: null,
  employerNameError: null,
  netMonthlyIncomeError: null,
  grossAnnualIncomeError: null,
  companyTypeError: null,
  annualProfitsError: null,
  salesError: null,
  residenceTypeError: null,
  professionNameError: null,
  primaryBankError: null,
  salaryBankAccountError: null,
  companyNameError: null,
  natureOfBusinessError: null,
  industryTypeError: null,
  mainBankerOfCompanyError: null,
  tenureYearsError: null,
  tenureMonthsError: null,
  yearsInBusinessError: null,
  monthInBusinessError: null,
  workExperienceYearsError: null,
  workExperienceMonthsError: null,
  experienceYearsError: null,
  experienceMonthsError: null,
  anyOtherAssetError: null,
  occupationError: null,
  apiError: null,
};

export const financialInformationFields = [
  'bankAccountNumber',
  'bankName',
  'bankBranch',
  'bankIfscCode',
];

export const requiredFieldsForSelfImployed = [
  'occupation',
  'professionName',
  'experienceYears',
  'experienceMonths',
  'grossAnnualIncome',
  'primaryBank',
  'residenceType',
];

export const requiredFieldsForSalariedPrivate = [
  'occupation',
  'employerName',
  'netMonthlyIncome',
  'salaryBankAccount',
  'tenureYears',
  'tenureMonths',
  'workExperienceYears',
  'workExperienceMonths',
  'residenceType',
  'anyOtherAsset',
];

export const requiredFieldsForBusiness = [
  'occupation',
  'companyType',
  'companyName',
  'natureOfBusiness',
  'industryType',
  'yearsInBusiness',
  'monthInBusiness',
  'sales',
  'annualProfit',
  'mainBankerOfCompany',
  'residenceType',
];

/** get required fields array based on occupation type */
export const getRequiredFields = (occupationType) => {
  switch (occupationType) {
    case 'SELF_EMPLOYED': {
      return requiredFieldsForSelfImployed;
    }
    case 'SALARIED_PRIVATE': {
      return requiredFieldsForSalariedPrivate;
    }
    case 'SALARIED_PUBLIC': {
      return requiredFieldsForSalariedPrivate;
    }
    case 'BUSINESS_OWNER': {
      return requiredFieldsForBusiness;
    }
    default: {
      return requiredFieldsForSelfImployed;
    }
  }
};

export const transformApiRequest = (body) => {
  let requestObj = {};
  Object.keys(body).map((item) => {
    if (body[item]) {
      if (item === 'occupation') {
        requestObj = {
          ...requestObj,
          [item]: body[item],
        };
      } else {
        if (
          // item === 'grossAnnualIncomeName' ||
          item === 'primaryBankName' ||
          item === 'salaryBankAccount' ||
          item === 'employerName' ||
          item === 'companyType' ||
          item === 'mainBankerOfCompany' ||
          item === 'natureOfBusiness' ||
          item === 'industryType'
          // ||
          // item === 'yearsInBusinessName'
        ) {
          // const newKey = item.slice(0, -4);
          requestObj = {...requestObj, [item]: body[item]};
        } else if (
          !(
            // item === 'grossAnnualIncomeName' ||
            (
              item === 'occupation' ||
              item === 'primaryBankName' ||
              item === 'salaryBankAccount' ||
              item === 'employerName' ||
              item === 'companyType' ||
              item === 'mainBankerOfCompany' ||
              item === 'natureOfBusiness' ||
              item === 'industryType'
            )
            // ||
            // item === 'yearsInBusiness'
          )
        ) {
          if (
            item === 'workExperienceYears' ||
            item === 'workExperienceMonths'
          ) {
            requestObj = {
              ...requestObj,
              totalWorkExperience:
                +body['workExperienceYears'] * 12 +
                +body['workExperienceMonths'],
            };
          } else if (
            item === 'experienceYears' ||
            item === 'experienceMonths'
          ) {
            requestObj = {
              ...requestObj,
              experience:
                +body['experienceYears'] * 12 + +body['experienceMonths'],
            };
          } else if (item === 'tenureYears' || item === 'tenureMonths') {
            requestObj = {
              ...requestObj,
              tenureAtCompany:
                +body['tenureYears'] * 12 + +body['tenureMonths'],
            };
          } else if (item === 'yearsInBusiness' || item === 'monthInBusiness') {
            requestObj = {
              ...requestObj,
              yearsInBusiness:
                +body['yearsInBusiness'] * 12 + +body['monthInBusiness'],
            };
          } else {
            requestObj = {...requestObj, [item]: body[item]};
          }
        }
      }
    }
  });
  return requestObj;
};

/** transform loan application details */
export const transformApiResponse = (body) => {
  let obj = {};
  const {financeDetails} = body;
  Object.keys(financeDetails).map((item) => {
    if (financeDetails[item]) {
      switch (item) {
        case 'occupation': {
          obj = {
            ...obj,
            occupation: financeDetails[item],
          };
          break;
        }
        case 'residenceType': {
          obj = {
            ...obj,
            residenceType: financeDetails[item],
          };
          break;
        }
        case 'professionName': {
          obj = {
            ...obj,
            professionName: financeDetails[item],
          };
          break;
        }
        case 'primaryBank': {
          obj = {
            ...obj,
            primaryBank: financeDetails[item],
          };
          break;
        }
        case 'employerName': {
          obj = {
            ...obj,
            employerName: financeDetails[item],
          };
          break;
        }
        case 'salaryBankAccount': {
          obj = {
            ...obj,
            salaryBankAccount: financeDetails[item],
          };
          break;
        }
        case 'companyType': {
          obj = {
            ...obj,
            companyType: financeDetails[item],
          };
          break;
        }
        case 'natureOfBusiness': {
          obj = {
            ...obj,
            natureOfBusiness: financeDetails[item],
          };
          break;
        }
        case 'industryType': {
          obj = {
            ...obj,
            industryType: financeDetails[item],
          };
          break;
        }
        case 'mainBankerOfCompany': {
          obj = {
            ...obj,
            mainBankerOfCompany: financeDetails[item],
          };
          break;
        }
        case 'experience': {
          obj = {
            ...obj,
            experienceYears: String(Math.floor(financeDetails[item] / 12)),
            experienceMonths: String(Math.floor(financeDetails[item] % 12)),
          };
          break;
        }
        case 'totalWorkExperience': {
          obj = {
            ...obj,
            workExperienceYears: String(Math.floor(financeDetails[item] / 12)),
            workExperienceMonths: String(Math.floor(financeDetails[item] % 12)),
          };
          break;
        }
        case 'tenureAtCompany': {
          obj = {
            ...obj,
            tenureYears: String(Math.floor(financeDetails[item] / 12)),
            tenureMonths: String(Math.floor(financeDetails[item] % 12)),
          };
          break;
        }
        case 'yearsInBusiness': {
          obj = {
            ...obj,
            yearsInBusiness: String(Math.floor(financeDetails[item] / 12)),
            monthInBusiness: String(Math.floor(financeDetails[item] % 12)),
          };
          break;
        }
        default: {
          obj = {...obj, [item]: String(financeDetails[item])};
        }
      }
    }
  });
  return obj;
};
