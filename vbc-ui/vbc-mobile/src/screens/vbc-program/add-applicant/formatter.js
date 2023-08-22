/**
 * Transformation module for component
 * AddApplicant screen
 * Also, manages initial form fields.
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

/** required fields */
export const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'gender',
  'mobile',
  'relationToPatient',
  'age',
];

export const transformApiRequest = (vbcProgramStepAddApplicant) => {
  return {
    applicants: vbcProgramStepAddApplicant,
  };
};

/** gets dropdown value name from dropdown id  */
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

/** transforms applicant's relationToPatient
 * and adds new key relationToPatientName with its respective name value
 */
export const transformApplicantData = (applicants, masterData) => {
  if (applicants && applicants.length > 0) {
    const data = applicants.map((item) => {
      if (item.relationToPatient) {
        const idId = /^\d+$/.test(item.relationToPatient);
        if (idId) {
          return {
            ...item,
            relationToPatientName: getDropdownValueItemName(
              masterData.relationships,
              item.relationToPatient
            ),
          };
        } else {
          return {
            ...item,
            relationToPatientName: item.relationToPatient,
          };
        }
      }
    });
    return data;
  }
};
