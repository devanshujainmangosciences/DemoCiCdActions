/**
 * This module particularly used for
 * editProfile compoennt.
 * Data to and fro from API is being
 * transformed here.
 */
import {getDateInDateObject} from 'utils';

/**
 * required fields
 */
//KEPT COMMENTS DELIBERATELY
export const requiredFields = [
  'birthDate',
  'typeOfCancerId',
  'doctorId',
  'drugId',
  'firstName',
  'gender',
  // 'homeNumber',
  'hospitalId',
  'lastName',
  'mrn',
  // 'panNumber',
  'permanentAddress',
  'permanentCity',
  'permanentCountry',
  'permanentPinCode',
  'permanentStateName',
  'permanentState',
  'presentAddress',
  'presentCity',
  'presentCountry',
  'presentPinCode',
  'presentStateName',
  'presentState',
];

export const addressFields = [
  'permanentAddress',
  'permanentCity',
  'permanentCountry',
  'permanentPinCode',
  'permanentState',
  'permanentStateName',
  'presentAddress',
  'presentCity',
  'presentCountry',
  'presentPinCode',
  'presentState',
  'presentStateName',
];

/**
 * required fields for applicant
 */
//KEPT COMMENTS DELIBERATELY
export const requiredFieldsForApplicant = [
  'birthDate',
  'firstName',
  'gender',
  'lastName',
  'panNumber',
  'permanentAddress',
  'permanentCity',
  'permanentCountry',
  'permanentPinCode',
  'permanentState',
  'permanentStateName',
  'presentAddress',
  'presentCity',
  'presentCountry',
  'presentPinCode',
  'presentState',
  'presentStateName',
];

export const initialFormFieldsState = {
  firstName: null,
  middleName: null,
  lastName: null,
  email: null,
  gender: null,
  birthDate: null,
  birthDateName: null,
  panNumber: null,
  aadharNumber: null,
  // homeNumber: null,
  permanentAddress: null,
  permanentCity: null,
  permanentState: null,
  permanentStateName: null,
  permanentCountry: null,
  permanentPinCode: null,
  presentAddress: null,
  presentCity: null,
  presentState: null,
  presentStateName: null,
  presentCountry: null,
  presentPinCode: null,
  typeOfCancerId: null,
  drugId: null,
  drugIdName: null,
  hospitalId: null,
  hospitalIdName: null,
  doctorId: null,
  doctorIdName: null,
  mrn: null,
  username: null,
  mobile: null,
};
export const initialFormFieldsErrorState = {
  firstNameError: null,
  middleNameError: null,
  lastNameError: null,
  emailError: null,
  genderError: null,
  dobError: null,
  birthDateError: null,
  panNumberError: null,
  aadharNumberError: null,
  // homeNumberError: null,
  permanentAddressError: null,
  permanentCityError: null,
  permanentStateError: null,
  permanentStateNameError: null,
  permanentCountryError: null,
  permanentPinCodeError: null,
  presentAddressError: null,
  presentCityError: null,
  presentStateError: null,
  presentStateNameError: null,
  presentCountryError: null,
  presentPinCodeError: null,
  typeOfCancerIdError: null,
  drugIdError: null,
  hospitalIdError: null,
  doctorIdError: null,
  mrnError: null,
  apiError: null,
  mobileError: null,
};

/** get required fields based upon the logged-in user profile */
export const getRequiredFields = (isApplicant) => {
  if (isApplicant) {
    return requiredFieldsForApplicant;
  }
  return requiredFields;
};

/**
 * formats formFields to
 * complete-profile api's
 * request object
 */
export const formatterForCompleteProfile = (formFields) => {
  let apiRequesObj = {};
  for (let i in formFields) {
    switch (i) {
      case 'middleName': {
        apiRequesObj = {...apiRequesObj, middleName: formFields[i]};
        break;
      }
      case 'lastName': {
        apiRequesObj = {...apiRequesObj, lastName: formFields[i]};
        break;
      }
      case 'firstName': {
        apiRequesObj = {...apiRequesObj, firstName: formFields[i]};
        break;
      }
      case 'gender': {
        apiRequesObj = {...apiRequesObj, gender: formFields['gender']};
        break;
      }
      case 'email': {
        apiRequesObj = {...apiRequesObj, email: formFields[i]};
        break;
      }
      case 'mobile': {
        apiRequesObj = {
          ...apiRequesObj,
          mobileNumber: formFields[i] || '',
          mobile: formFields[i] || '',
        };
        break;
      }
      case 'aadharNumber': {
        apiRequesObj = {...apiRequesObj, aadharNumber: formFields[i]};
        break;
      }
      case 'birthDate': {
        apiRequesObj = {
          ...apiRequesObj,
          birthDate: formFields['birthDateName'],
        };
        break;
      }
      case 'panNumber': {
        apiRequesObj = {...apiRequesObj, panNumber: formFields[i]};
        break;
      }
      // case 'homeNumber': {
      //   apiRequesObj = {
      //     ...apiRequesObj,
      //     homeContactNumber: formFields[i],
      //   };
      //   break;
      // }
      case 'permanentAddress': {
        apiRequesObj = {...apiRequesObj, permanentAddress: formFields[i]};
        break;
      }
      case 'permanentCity': {
        apiRequesObj = {
          ...apiRequesObj,
          permanentCity: formFields['permanentCity'],
        };
        break;
      }
      case 'permanentState': {
        apiRequesObj = {
          ...apiRequesObj,
          permanentState: formFields['permanentState'],
        };
        break;
      }
      case 'permanentStateName': {
        apiRequesObj = {
          ...apiRequesObj,
          permanentState: formFields['permanentStateName'],
        };
        break;
      }
      case 'permanentCountry': {
        apiRequesObj = {
          ...apiRequesObj,
          permanentCountry: formFields['permanentCountry'],
        };
        break;
      }
      case 'permanentPinCode': {
        apiRequesObj = {...apiRequesObj, permanentPinCode: formFields[i]};
        break;
      }
      case 'presentAddress': {
        apiRequesObj = {...apiRequesObj, presentAddress: formFields[i]};
        break;
      }

      case 'presentCity': {
        apiRequesObj = {
          ...apiRequesObj,
          presentCity: formFields['presentCity'],
        };
        break;
      }
      case 'presentState': {
        apiRequesObj = {
          ...apiRequesObj,
          presentState: formFields['presentState'],
        };
        break;
      }
      case 'presentStateName': {
        apiRequesObj = {
          ...apiRequesObj,
          presentState: formFields['presentStateName'],
        };
        break;
      }
      case 'presentCountry': {
        apiRequesObj = {
          ...apiRequesObj,
          presentCountry: formFields['presentCountry'],
        };
        break;
      }
      case 'presentPinCode': {
        apiRequesObj = {...apiRequesObj, presentPinCode: formFields[i]};
        break;
      }
      case 'typeOfCancerId': {
        apiRequesObj = {
          ...apiRequesObj,
          diagnosis: formFields['typeOfCancerId'],
        };
        break;
      }
      case 'drugId': {
        apiRequesObj = {...apiRequesObj, drugId: formFields[i]};
        break;
      }
      case 'hospitalId': {
        apiRequesObj = {...apiRequesObj, hospitalId: formFields[i]};
        break;
      }
      case 'doctorId': {
        apiRequesObj = {...apiRequesObj, doctorId: formFields[i]};
        break;
      }
      case 'mrn': {
        apiRequesObj = {...apiRequesObj, mrn: formFields[i]};
        break;
      }
      default: {
        apiRequesObj = {...apiRequesObj};
      }
    }
  }
  return apiRequesObj;
};

/**
 * formats get complete-profile api's
 * response object to formFields
 */
export const formatterForGetCompleteProfile = (formFields, masterData) => {
  let apiRequesObj = {};
  for (let i in formFields) {
    switch (i) {
      case 'middleName': {
        apiRequesObj = {...apiRequesObj, middleName: formFields[i]};
        break;
      }
      case 'lastName': {
        apiRequesObj = {...apiRequesObj, lastName: formFields[i]};
        break;
      }
      case 'firstName': {
        apiRequesObj = {...apiRequesObj, firstName: formFields[i]};
        break;
      }
      case 'gender': {
        apiRequesObj = {
          ...apiRequesObj,
          gender: formFields[i],
        };
        break;
      }
      case 'email': {
        apiRequesObj = {...apiRequesObj, email: formFields[i]};
        break;
      }
      case 'mobile': {
        apiRequesObj = {...apiRequesObj, mobile: formFields[i]};
        break;
      }
      case 'uniqueId': {
        apiRequesObj = {...apiRequesObj, uniqueId: formFields[i]};
        break;
      }
      case 'aadharNumber': {
        apiRequesObj = {...apiRequesObj, aadharNumber: formFields[i]};
        break;
      }
      case 'birthDate': {
        apiRequesObj = {
          ...apiRequesObj,
          birthDateName: formFields[i],
          birthDate: getDateInDateObject(formFields[i]),
        };
        break;
      }
      case 'panNumber': {
        apiRequesObj = {...apiRequesObj, panNumber: formFields[i]};
        break;
      }
      // case 'homeContactNumber': {
      //   apiRequesObj = {...apiRequesObj, homeNumber: formFields[i]};
      //   break;
      // }
      case 'username': {
        apiRequesObj = {...apiRequesObj, username: formFields[i]};
        break;
      }
      case 'permanentAddress': {
        apiRequesObj = {...apiRequesObj, permanentAddress: formFields[i]};
        break;
      }
      case 'permanentCity': {
        if (formFields[i]) {
          apiRequesObj = {
            ...apiRequesObj,
            permanentCity: formFields[i],
          };
        }
        break;
      }
      case 'permanentState': {
        if (formFields[i]) {
          const relatedState = masterData.states.find(
            (state) =>
              state.name === formFields['permanentState'] ||
              state.id === formFields['permanentState']
          );
          apiRequesObj = {
            ...apiRequesObj,
            permanentState: relatedState.id,
            permanentStateName: relatedState.name,
          };
        }
        break;
      }
      case 'permanentCountry': {
        apiRequesObj = {
          ...apiRequesObj,
          permanentCountry: formFields[i],
        };
        break;
      }
      case 'permanentPinCode': {
        apiRequesObj = {...apiRequesObj, permanentPinCode: formFields[i]};
        break;
      }
      case 'presentAddress': {
        apiRequesObj = {...apiRequesObj, presentAddress: formFields[i]};
        break;
      }

      case 'presentCity': {
        if (formFields[i]) {
          apiRequesObj = {
            ...apiRequesObj,
            presentCity: formFields[i],
          };
        }
        break;
      }
      case 'presentState': {
        if (formFields[i]) {
          const relatedState = masterData.states.find(
            (state) =>
              state.name === formFields['presentState'] ||
              state.id === formFields['presentState']
          );
          apiRequesObj = {
            ...apiRequesObj,
            presentState: relatedState.id,
            presentStateName: relatedState.name,
          };
        }
        break;
      }
      case 'presentCountry': {
        apiRequesObj = {
          ...apiRequesObj,
          presentCountry: formFields[i],
        };
        break;
      }
      case 'presentPinCode': {
        apiRequesObj = {...apiRequesObj, presentPinCode: formFields[i]};
        break;
      }
      case 'diagnosis': {
        apiRequesObj = {
          ...apiRequesObj,
          typeOfCancerId: formFields[i],
        };
        break;
      }
      case 'drug': {
        apiRequesObj = {
          ...apiRequesObj,
          drugId: formFields[i].id,
          drugIdName: `${formFields[i].brandName}-${formFields[i].drugGenericName}`,
        };
        break;
      }
      case 'hospital': {
        apiRequesObj = {
          ...apiRequesObj,
          hospitalId: formFields[i].id,
          hospitalIdName: formFields[i].hospitalName,
        };
        break;
      }
      case 'doctor': {
        apiRequesObj = {
          ...apiRequesObj,
          doctorId: formFields[i].id,
          doctorIdName: formFields[i].name,
        };
        break;
      }
      case 'mrn': {
        apiRequesObj = {...apiRequesObj, mrn: formFields[i]};
        break;
      }
      case 'patientDiagnosis': {
        apiRequesObj = {...apiRequesObj, patientDiagnosis: formFields[i]};
        break;
      }
      case 'patientDrugName': {
        apiRequesObj = {...apiRequesObj, patientDrugName: formFields[i]};
        break;
      }
      case 'patientHospitalName': {
        apiRequesObj = {...apiRequesObj, patientHospitalName: formFields[i]};
        break;
      }
      case 'relationToPatient': {
        apiRequesObj = {
          ...apiRequesObj,
          relationToPatient: formFields[i],
        };
        break;
      }
      case 'doctorName': {
        apiRequesObj = {
          ...apiRequesObj,
          doctorName: formFields[i],
        };
        break;
      }
      default: {
        apiRequesObj = apiRequesObj;
      }
    }
  }
  return apiRequesObj;
};
