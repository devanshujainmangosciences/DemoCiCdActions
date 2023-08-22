/**
 * This module defines all the Redux actions
 * for PBP Program stack screens
 */
import {actionTypes} from '../constants';

const {
  VBC_PROGRAM,
  VBC_PROGRAM_STEP_1,
  VBC_PROGRAM_STEP_2,
  VBC_PROGRAM_STEP_ADD_APPLICANT,
  VBC_PROGRAM_VBC_SCHEDULE,
  VBC_PROGRAM_DRUG_SCHEDULE,
  VBC_PROGRAM_RESET_DATA,
} = actionTypes;

/**
 * stores vbc program api response into redux store
 */
export const saveVbcProgramDataAction = (transformedData) => {
  return {
    type: VBC_PROGRAM,
    payload: transformedData,
  };
};

/**
 * vbc program step 1 data
 */
export const vbcProgramStep1Action = (step1Data) => {
  return {
    type: VBC_PROGRAM_STEP_1,
    payload: step1Data,
  };
};

/**
 * vbc program step 2 data
 */
export const vbcProgramStep2Action = (step2Data) => {
  return {
    type: VBC_PROGRAM_STEP_2,
    payload: step2Data,
  };
};

/**
 * vbc program add applicant data
 */
export const vbcProgramAddApplicantAction = (applicantData) => {
  return {
    type: VBC_PROGRAM_STEP_ADD_APPLICANT,
    payload: applicantData,
  };
};

/**
 * vbc program vbc schedule data
 */
export const getVbcProgramVbcScheduleAction = (vbcScheduleData) => {
  return {
    type: VBC_PROGRAM_VBC_SCHEDULE,
    payload: vbcScheduleData,
  };
};

/**
 * vbc program drug schedule data
 */
export const getVbcProgramDrugScheduleAction = (drugScheduleData) => {
  return {
    type: VBC_PROGRAM_DRUG_SCHEDULE,
    payload: drugScheduleData,
  };
};

/**
 * vbc program reset data
 */
export const resetVbcProgramData = () => {
  return {
    type: VBC_PROGRAM_RESET_DATA,
    payload: null,
  };
};
