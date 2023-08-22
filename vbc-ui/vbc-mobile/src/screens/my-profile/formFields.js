/**
 * Module defining type of form fields for my profile
 */

export const personalDetailFields = [
  {
    heading: 'firstName',
    valueKey: 'firstName',
  },
  {
    heading: 'middleName',
    valueKey: 'middleName',
  },
  {
    heading: 'lastName',
    valueKey: 'lastName',
  },
  {
    heading: 'Gender',
    valueKey: 'gender',
  },
  {
    heading: 'dateofBirth',
    valueKey: 'birthDateName',
  },
  {
    heading: 'userName',
    valueKey: 'username',
  },
  {
    heading: 'email',
    valueKey: 'email',
  },
  {
    heading: 'mobile',
    valueKey: 'mobile',
  },
  {
    heading: 'patientId',
    valueKey: 'uniqueId',
  },
];

export const addressDetailFields = [
  {
    heading: 'permanentAddress',
    valueKey: 'permanentAddress',
  },
  {
    heading: 'city',
    valueKey: 'permanentCity',
  },
  {
    heading: 'state',
    valueKey: 'permanentStateName',
  },
  {
    heading: 'country',
    valueKey: 'permanentCountry',
  },
  {
    heading: 'pinCode',
    valueKey: 'permanentPinCode',
  },
  {
    heading: 'presentAddress',
    valueKey: 'presentAddress',
  },
  {
    heading: 'city',
    valueKey: 'presentCity',
  },
  {
    heading: 'state',
    valueKey: 'presentStateName',
  },
  {
    heading: 'country',
    valueKey: 'presentCountry',
  },
  {
    heading: 'pinCode',
    valueKey: 'presentPinCode',
  },
];

export const hospitalDetailFields = [
  {
    heading: 'typeofCancer',
    valueKey: 'typeOfCancerId',
  },
  {
    heading: 'drugName',
    valueKey: 'drugIdName',
  },
  {
    heading: 'hospitalName',
    valueKey: 'hospitalIdName',
  },
  {
    heading: 'doctorName',
    valueKey: 'doctorIdName',
  },
  {
    heading: 'medicalRecordNumber',
    valueKey: 'mrn',
  },
];

export const patientDetailFields = [
  {
    heading: 'diagnosis',
    valueKey: 'patientDiagnosis',
  },
  {
    heading: 'drugName',
    valueKey: 'patientDrugName',
  },
  {
    heading: 'hospitalName',
    valueKey: 'patientHospitalName',
  },
  {
    heading: 'doctorName',
    valueKey: 'doctorName',
  },
  {
    heading: 'relationship',
    valueKey: 'relationToPatient',
  },
];

export const financialDetailFields = [
  {
    heading: 'panNumber',
    valueKey: 'panNumber',
  },
  {
    heading: 'aadharNumber',
    valueKey: 'aadharNumber',
  },
];
