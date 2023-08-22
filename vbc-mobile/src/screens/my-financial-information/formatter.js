/**
 * This module particularly used for
 * financial information compoennt.
 * Data to and fro from API is being
 * transformed here.
 */
import {AsyncStorageKeys} from 'constants';
import {storeInAsyncStorage} from 'utils';

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
  for (let i in formFields) {
    switch (i) {
      case 'panNumber': {
        storeInAsyncStorage(
          AsyncStorageKeys.PAN_NUMBER,
          JSON.stringify(formFields[i])
        );
        apiRequesObj = {
          ...apiRequesObj,
          panNumber: formFields[i],
        };
        break;
      }
      case 'educationLevel': {
        const idId = /^\d+$/.test(formFields[i]);
        if (idId) {
          apiRequesObj = {
            ...apiRequesObj,
            educationLevel: formFields[i],
            educationLevelName: getDropdownValueItemName(
              masterData.educationLevelList,
              formFields[i]
            ),
          };
        } else {
          apiRequesObj = {
            ...apiRequesObj,
            educationLevel: formFields[i],
            educationLevelName: formFields[i],
          };
        }
        break;
      }
      case 'occupation': {
        const idId = /^\d+$/.test(formFields[i]);
        if (idId) {
          apiRequesObj = {
            ...apiRequesObj,
            occupation: formFields[i],
            occupationName: getDropdownValueItemName(
              masterData.occupations,
              formFields[i]
            ),
          };
        } else {
          apiRequesObj = {
            ...apiRequesObj,
            occupation: formFields[i],
            occupationName: formFields[i],
          };
        }
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
        const idId = /^\d+$/.test(formFields[i]);
        if (idId) {
          apiRequesObj = {
            ...apiRequesObj,
            industry: formFields[i],
            industryName: getDropdownValueItemName(
              masterData.industryTypes,
              formFields[i]
            ),
          };
        } else {
          apiRequesObj = {
            ...apiRequesObj,
            industry: formFields[i],
            industryName: formFields[i],
          };
        }
        break;
      }
      case 'insuranceCompany': {
        const idId = /^\d+$/.test(formFields[i]);
        if (idId) {
          apiRequesObj = {
            ...apiRequesObj,
            insuranceCompany: formFields[i],
            insuranceCompanyName: getDropdownValueItemName(
              masterData.insuranceCompanies,
              formFields[i]
            ),
          };
        } else {
          apiRequesObj = {
            ...apiRequesObj,
            insuranceCompany: formFields[i],
            insuranceCompanyName: formFields[i],
          };
        }
        break;
      }
      case 'cancelledChequeDocument': {
        apiRequesObj = {
          ...apiRequesObj,
          cancelledCheque: formFields[i]?.documentName,
        };
        break;
      }
      default: {
        apiRequesObj = {...apiRequesObj, [i]: formFields[i]};
      }
    }
  }
  return apiRequesObj;
};
