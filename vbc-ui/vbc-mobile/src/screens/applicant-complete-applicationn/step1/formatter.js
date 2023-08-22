/**
 * Formatter module for
 * Applicant Complete Application
 * Step 1
 */

import {VBCProgramPaymentFramework} from 'constants';

export const requiredFieldsForCaregiversFd = ['bankName'];
export const requiredFieldsForFinancialAssistance = ['selectedOccupation'];

/** depending upon the passed payement framework -
 * it returns the required fields array
 */
export const checkRequiredFieldsValidation = (paymentTypeFramework) => {
  if (
    paymentTypeFramework ===
    VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE
  ) {
    return requiredFieldsForFinancialAssistance;
  }
  return requiredFieldsForCaregiversFd;
};
