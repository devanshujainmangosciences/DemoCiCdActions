/**
 * Formatter module for
 * VBCProgram component
 */

// KEPT DELIBERATELY
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

export const transformGetVbcProgramEnrollmentApiData = (apiResponse) => {
  let transformedData = {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    addApplicant: null,
    userCurrentStep: 1,
    totalPayableAmount: null, // at which step user is currently at for PBP Program
    drugId: null,
    allowCancel: false,
    paymentSwitchInProgress: false,
  };
  if (apiResponse) {
    transformedData.userCurrentStep = apiResponse.step;
    transformedData.totalPayableAmount = apiResponse.totalPayableAmount;
    transformedData.step1 = apiResponse.paymentTypeOpted;
    transformedData.step3 = apiResponse.currentFixedDepositBank;
    transformedData.step4 = null;
    transformedData.addApplicant = apiResponse.applicants;
    transformedData.drugId = apiResponse.drugId;
    transformedData.allowCancel = apiResponse.allowCancel;
    transformedData.paymentSwitchInProgress =
      apiResponse.paymentSwitchInProgress;
    transformedData.step2 = {
      accountNumber: apiResponse.accountNumber,
      bankName: apiResponse.bankName,
      bankIfscCode: apiResponse.bankIfscCode,
      bankBranch: apiResponse.bankBranch,
      panNumber: apiResponse.panNumber,
      educationLevel: apiResponse.educationLevel,
      occupation: apiResponse.occupation,
      employerName: apiResponse.employerName,
      industry: apiResponse.industry,
      insurance: apiResponse.insurance,
      insuranceCompany: apiResponse.insuranceCompany,
      maturityAmount: apiResponse.maturityAmount,
      familyAnnualIncome: apiResponse.familyAnnualIncome,
      designation: apiResponse.designation,
      selfAnnualIncome: apiResponse.selfAnnualIncome,
      otherIncomeSource: apiResponse.otherIncomeSource,
      cancelledChequeDocument: apiResponse.cancelledChequeDocument,
    };
  }
  return transformedData;
};
