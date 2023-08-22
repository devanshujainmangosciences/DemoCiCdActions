/**
 * This module particularly used for
 * financial information compoennt.
 * Data to and fro from API is being
 * transformed here.
 */

/**
 * required fields
 */
// KEPT COMMENTS DELIBERATELY
export const requiredFields = [
  // 'accountNumber',
  // 'bankName',
  // 'bankIfscCode',
  // 'bankBranch',
  // 'panNumber',
  // 'designation',
  // 'educationLevel',
  // 'occupation',
  // 'employerName',
  // 'industry',
  'selfAnnualIncome',
  // 'otherIncomeSource',
  // 'insurance',
  'familyAnnualIncome',
];

//KEPT DELIBERATELY
// const getDropdownValueItemName = (dropdownItems, dropdownId) => {
//   if (!dropdownItems || dropdownItems.length === 0) {
//     return '';
//   }
//   const index = dropdownItems.findIndex((item) => item.id == dropdownId);
//   let result;
//   if (index >= 0) {
//     result = dropdownItems[index].name;
//   } else {
//     result = '';
//   }
//   return result;
// };

/**
 * formats get financial information api's
 * response object to formFields
 */
export const formatterForGetCompleteProfile = (formFields) => {
  let apiRequesObj = {};
  for (let i in formFields) {
    switch (i) {
      case 'insurance': {
        apiRequesObj = {
          ...apiRequesObj,
          insurance: formFields[i] ? 'YES' : 'NO',
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
