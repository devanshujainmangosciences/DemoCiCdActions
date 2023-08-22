/**
 * Module defining type of form fields for add applicant
 */
import i18n from '../../../../../i18n';
import {downArrorIcon} from 'assets/icons';
import {validateEmail, validateMobile} from 'utils';

export const applicantInfoFieldArray = [
  {
    inputType: 'textInput',
    placeholder: 'firstName',
    valueKey: 'firstName',
    errorMessageKey: 'firstNameError',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    inputType: 'textInput',
    placeholder: 'middleName',
    valueKey: 'middleName',
    errorMessageKey: 'middleNameError',
    required: false,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    inputType: 'textInput',
    placeholder: 'lastName',
    valueKey: 'lastName',
    errorMessageKey: 'lastNameError',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    inputType: 'textInput',
    placeholder: 'age',
    valueKey: 'age',
    errorMessageKey: 'ageError',
    keyboardType: 'numeric',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
  },
  {
    inputType: 'dropdown',
    valueKey: 'gender',
    dropdownValue: 'gender',
    rightInputIcon: downArrorIcon,
    placeholder: 'gender',
    errorMessageKey: 'genderError',
    required: true,
  },
  {
    inputType: 'textInput',
    placeholder: 'mobile',
    valueKey: 'mobile',
    errorMessageKey: 'mobileError',
    keyboardType: 'number-pad',
    maxLength: 10,
    validationFunction: validateMobile,
    validationErrorMessage:
      i18n.t('validationMessages:pleaseEnterValid') +
      i18n.t('loanApplication: mobile'),
    required: true,
  },
  {
    inputType: 'textInput',
    placeholder: 'email',
    valueKey: 'email',
    errorMessageKey: 'emailError',
    validationFunction: validateEmail,
    validationErrorMessage:
      i18n.t('validationMessages:pleaseEnterValid') +
      i18n.t('loanApplication: email'),
    required: true,
    keyboardType: 'default',
  },
  {
    inputType: 'dropdown',
    valueKey: 'relationToPatient',
    dropdownValue: 'relationToPatient',
    rightInputIcon: downArrorIcon,
    placeholder: 'relationshipWithPatient',
    errorMessageKey: 'relationToPatientError',
    required: true,
  },
];

export const viewApplicantDetailFields = [
  {
    heading: 'firstName',
    valueKey: 'firstName',
  },
  {
    heading: 'lastName',
    valueKey: 'lastName',
  },
  {
    heading: 'age',
    valueKey: 'age',
  },
  {
    heading: 'Gender',
    valueKey: 'gender',
  },
  {
    heading: 'mobile',
    valueKey: 'mobile',
  },
  {
    heading: 'email',
    valueKey: 'email',
  },
  {
    heading: 'relationshipWithPatient',
    valueKey: 'relationToPatient',
  },
  {
    heading: 'registrationStatus',
    valueKey: 'status',
  },
  {
    heading: 'documentStatus',
    valueKey: 'documentStatus',
  },
];
