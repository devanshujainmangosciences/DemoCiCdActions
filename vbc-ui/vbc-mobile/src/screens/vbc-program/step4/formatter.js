/**
 * This module particularly used for
 * vbc program step 4 screen.
 * Data to and fro from API is being
 * transformed here.
 */

export const transformAllStepsDataToSendToVbcEnrollApi = (vbcProgramData) => {
  const {
    vbcProgramTotalPayableAmount: totalPayableAmount,
    vbcProgramStep1: step1,
    vbcProgramStep2: step2,
    vbcProgramStep3: step3,
    vbcProgramStepAddApplicant: stepAddApplicants,
  } = vbcProgramData;

  // filtering data whose value is present and not null
  let step2FilledData;
  // let step3FilledData;
  Object.keys(step2).map((item) => {
    if (step2[item]) {
      step2FilledData = {...step2FilledData, [item]: step2[item]};
    }
  });

  let apiBody = {
    termsAccepted: true,
    fundsAcknowledged: true,
    paymentTypeOpted: step1,
    totalPayableAmount: Number(totalPayableAmount),
    applicants: stepAddApplicants,
    ...step2FilledData,
  };
  if (step3) {
    apiBody = {...apiBody, currentFixedDepositBank: step3};
  }
  return apiBody;
};
