/**
 * Transformation module to handle
 * Applicant's Complete Application Step3
 * data
 */

export const transformApiResponseForRenderingFields = (body) => {
  let responseObj = {};
  if (body) {
    Object.keys(body).map((item) => {
      if (
        body[item] &&
        item !== 'bankName' &&
        item !== 'bankBranch' &&
        item !== 'bankAccountNumber' &&
        item !== 'bankIfscCode' &&
        item !== 'applicationSubmitFlag' &&
        item !== 'applicationSubmitDate'
      ) {
        responseObj = {...responseObj, [item]: body[item]};
      }
    });
    return responseObj;
  }
};
