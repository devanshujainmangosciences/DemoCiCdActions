/**
 * Module to transform api request response parameters
 */

export const transfromAddApplicantRequest = (formFields) => {
  let requestObject = {};
  Object.keys(formFields).map((item) => {
    if (item === 'relationshipWithPatient') {
      requestObject = {
        ...requestObject,
        relationToPatient: formFields[item],
      };
    } else {
      requestObject = {...requestObject, [item]: formFields[item]};
    }
  });
  return requestObject;
};
