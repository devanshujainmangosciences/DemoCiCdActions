/**
 * This module particularly used for
 * applicant financial information compoennt.
 * Data to and fro from API is being
 * transformed here.
 */

/**
 * required fields
 */
export const requiredFields = [
  'accountNumber',
  'bankName',
  'bankIfscCode',
  'bankBranch',
];

const getDropdownValueItemName = (dropdownItems, dropdownId) => {
  if (!dropdownItems || dropdownItems.length === 0) {
    return '';
  }
  const index = dropdownItems.findIndex((item) => item.id == dropdownId);
  let result;
  if (index >= 0) {
    result = dropdownItems[index].name;
  } else {
    result = '';
  }
  return result;
};

/**
 * formats get financial information api's
 * response object to formFields
 */
export const formatterForGetCompleteProfile = (formFields, masterData) => {
  let apiRequesObj = {};
  if (masterData) {
    for (let i in formFields) {
      switch (i) {
        case 'educationLevel': {
          apiRequesObj = {
            ...apiRequesObj,
            educationLevel: formFields[i],
            educationLevelName: getDropdownValueItemName(
              masterData.educationLevelList,
              formFields[i]
            ),
          };
          break;
        }
        case 'occupation': {
          apiRequesObj = {
            ...apiRequesObj,
            occupation: formFields[i],
            occupationName: getDropdownValueItemName(
              masterData.occupations,
              formFields[i]
            ),
          };
          break;
        }
        case 'insurance': {
          apiRequesObj = {
            ...apiRequesObj,
            insurance: formFields[i],
            insuranceName: formFields[i] ? 'YES' : 'NO',
          };
          break;
        }
        case 'industry': {
          apiRequesObj = {
            ...apiRequesObj,
            industry: formFields[i],
            industryName: getDropdownValueItemName(
              masterData.industryTypes,
              formFields[i]
            ),
          };
          break;
        }
        case 'insuranceCompany': {
          apiRequesObj = {
            ...apiRequesObj,
            insuranceCompany: formFields[i],
            insuranceCompanyName: getDropdownValueItemName(
              masterData.insuranceCompanies,
              formFields[i]
            ),
          };
          break;
        }
        default: {
          apiRequesObj = {...apiRequesObj, [i]: formFields[i]};
        }
      }
    }
  }

  return apiRequesObj;
};
