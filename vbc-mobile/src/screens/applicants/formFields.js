/**
 * Module defining type of form fields for add applicant
 */

import i18n from '../../../../i18n';
import {downArrorIcon} from 'assets/icons';
import {validateEmail, validateMobile} from 'utils';

export const applicantInfoFieldsArray = [
  {
    valueKey: 'firstName',
    inputType: 'textInput',
    placeholder: 'firstName',
    errorMessageKey: 'firstNameError',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    valueKey: 'middleName',
    inputType: 'textInput',
    placeholder: 'middleName',
    errorMessageKey: 'middleNameError',
    required: false,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    valueKey: 'lastName',
    inputType: 'textInput',
    placeholder: 'lastName',
    errorMessageKey: 'lastNameError',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'default',
  },
  {
    valueKey: 'age',
    inputType: 'textInput',
    placeholder: 'age',
    errorMessageKey: 'ageError',
    required: true,
    validationFunction: null,
    validationErrorMessage: '',
    keyboardType: 'numeric',
  },
  {
    required: true,
    inputType: 'dropdown',
    valueKey: 'gender',
    dropdownValue: 'gender',
    rightInputIcon: downArrorIcon,
    placeholder: 'gender',
    errorMessageKey: 'genderError',
    isOtherOptionAvailable: false,
  },
  {
    valueKey: 'mobile',
    inputType: 'textInput',
    placeholder: 'mobile',
    errorMessageKey: 'mobileError',
    required: true,
    validationFunction: validateMobile,
    validationErrorMessage:
      i18n.t('validationMessages:pleaseEnterValid') +
      i18n.t('loanApplication:mobile'),
    keyboardType: 'number-pad',
    maxLength: 10,
  },
  {
    valueKey: 'email',
    inputType: 'textInput',
    placeholder: 'email',
    errorMessageKey: 'emailError',
    required: true,
    validationFunction: validateEmail,
    validationErrorMessage:
      i18n.t('validationMessages:pleaseEnterValid') +
      i18n.t('loanApplication:email'),
    keyboardType: 'email-address',
  },
  {
    required: true,
    inputType: 'dropdown',
    valueKey: 'relationToPatient',
    dropdownValue: 'relationToPatient',
    rightInputIcon: downArrorIcon,
    placeholder: 'relationshipWithPatient',
    errorMessageKey: 'relationToPatientError',
    isOtherOptionAvailable: false,
  },
];
