/**
 * Module to transform api request response parameters.
 * Also manages component initial states.
 */

export const initialFormFields = {
  firstName: null,
  middleName: null,
  lastName: null,
  age: null,
  gender: null,
  mobile: null,
  email: null,
  relationToPatient: null,
};

export const initialFormFieldsError = {
  firstNameError: null,
  middleNameError: null,
  lastNameError: null,
  ageError: null,
  genderError: null,
  mobileError: null,
  emailError: null,
  relationToPatientError: null,
  apiError: null,
};

// transforms add applicant request parameter relation to patient
export const transfromAddApplicantRequest = (formFields) => {
  let requestObject = {};
  Object.keys(formFields).map((item) => {
    if (item === 'relationToPatient') {
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
