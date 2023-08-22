import {VBCProgramPaymentFramework} from 'constants';

export const vbcApplicationTypes = [
  {
    name: 'selfPay',
    value: VBCProgramPaymentFramework.SELF_PAY,
  },
  // {
  //   name: 'LoanagainstownFD',
  //   value: VBCProgramPaymentFramework.LOAN_AGAINST_OWN_FD,
  // },
  // {
  //   name: 'loanagainstcaregiversFD',
  //   value: VBCProgramPaymentFramework.LOAN_AGAINST_CAREGIVER_FD,
  // },
  {
    name: 'loanwithFinancialAssistance',
    value: VBCProgramPaymentFramework.LOAN_WITH_FINANCIAL_ASSISTANCE,
  },
];
