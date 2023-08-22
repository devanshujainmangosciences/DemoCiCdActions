/**
 * Redux login reducer that manages multiple global states
 * related to login flow.
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

const initialState = {
  vbcProgramStep1: null, // vbc program step 1
  vbcProgramStep2: null, // vbc program step 2
  vbcProgramStep3: null, // vbc program step 3
  vbcProgramStep4: null, // vbc program step 4
  vbcProgramStepAddApplicant: null, // vbc program step add applicant
  vbcProgramUserCurrentStep: 0, // at which step user is currently at for PBP Program
  vbcProgramTotalPayableAmount: null,
  vbcProgramDrugId: null,
  vbcProgramAllowCancel: false,
  paymentSwitchInProgress: false,
  vbcProgramVbcScheduleData: null, // vbc schedule data
  vbcProgramDrugScheduleData: null, //drug schedule data
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case VBC_PROGRAM: {
      return {
        vbcProgramTotalPayableAmount: payload.totalPayableAmount,
        vbcProgramUserCurrentStep: payload.userCurrentStep,
        vbcProgramStep1: payload.step1,
        vbcProgramStep2: payload.step2,
        vbcProgramStep3: payload.step3,
        vbcProgramStep4: payload.step4,
        vbcProgramStepAddApplicant: payload.addApplicant,
        vbcProgramDrugId: payload.drugId,
        vbcProgramAllowCancel: payload.allowCancel,
        paymentSwitchInProgress: payload.paymentSwitchInProgress,
      };
    }
    case VBC_PROGRAM_STEP_1: {
      return {
        ...state,
        vbcProgramStep1: payload,
      };
    }
    case VBC_PROGRAM_STEP_2: {
      return {
        ...state,
        vbcProgramStep2: payload,
      };
    }
    case VBC_PROGRAM_STEP_ADD_APPLICANT: {
      return {
        ...state,
        vbcProgramStepAddApplicant: payload,
      };
    }
    case VBC_PROGRAM_VBC_SCHEDULE: {
      return {
        ...state,
        vbcProgramVbcScheduleData: payload,
      };
    }
    case VBC_PROGRAM_DRUG_SCHEDULE: {
      return {
        ...state,
        vbcProgramDrugScheduleData: payload,
      };
    }
    case VBC_PROGRAM_RESET_DATA: {
      return {
        vbcProgramStep1: null, // vbc program step 1
        vbcProgramStep2: null, // vbc program step 2
        vbcProgramStep3: null, // vbc program step 3
        vbcProgramStep4: null, // vbc program step 4
        vbcProgramStepAddApplicant: null, // vbc program step add applicant
        vbcProgramUserCurrentStep: 0, // at which step user is currently at for PBP Program
        vbcProgramTotalPayableAmount: null,
        vbcProgramDrugId: null,
        vbcProgramAllowCancel: false,
        vbcProgramVbcScheduleData: null, // vbc schedule data
        vbcProgramDrugScheduleData: null, //drug schedule data
      };
    }
    default:
      return state;
  }
};
