/**
 * This Component controls four steps required for loan application
 * User will be allowed to enter steps only when the user accept the terms and conditions
 */
import React, {useState, useEffect} from 'react';
import Stepper from '@/components/Stepper';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {getEnrollForVbc, getMasterData} from '@/actions';
import {
  ReviewApplication,
  Payable,
  Information,
  PaymentFrameworkForm,
} from './children';
import {MASTER_DATA_FIELDS, MASTER_DATA_FINANCE_PATIENT} from '../../constants';

const LoanApplication = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [viewMode, setViewMode] = useState(false);
  const dispatch = useAppDispatch();
  const masterData = useAppSelector((state) => state.template.masterData);
  const vbcApplicationData = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );
  const jumpProgramStep = useAppSelector(
    (state) => state.loanApplication.jumpProgramStep
  );

  /**
   * Set the LoanApplication program to read only mode
   * if vbcApplicationData has value in it else dispatch
   * getEnrollForVbc action
   */
  useEffect(() => {
    const isRunMasterData =
      !masterData?.[MASTER_DATA_FIELDS.PROFESSIONS] ||
      !masterData?.[MASTER_DATA_FIELDS.EMPLOYERS] ||
      !masterData?.[MASTER_DATA_FIELDS.INSURANCE_COMPANIES] ||
      !masterData?.[MASTER_DATA_FIELDS.INDUSTRY_TYPES] ||
      !masterData?.[MASTER_DATA_FIELDS.RELATIONSHIPS] ||
      !masterData?.[MASTER_DATA_FIELDS.EDUCATION_LEVEL_LIST];
    if (!vbcApplicationData) {
      const masterDataSuccessCallback = () => {
        dispatch(getEnrollForVbc());
      };

      if (isRunMasterData)
        dispatch(
          getMasterData(
            MASTER_DATA_FINANCE_PATIENT,
            true,
            masterDataSuccessCallback
          )
        );
      else masterDataSuccessCallback();
    } else if (vbcApplicationData && isRunMasterData) {
      console.log('NOTHING LOADED AS APPLICANT DATA IS ALREADY THERE');
      dispatch(getMasterData(MASTER_DATA_FINANCE_PATIENT, true));
    }
  }, [dispatch, vbcApplicationData]);

  /**Steps Correction */
  useEffect(() => {
    if (vbcApplicationData) {
      if (vbcApplicationData.step === 4) {
        handleStepJump(vbcApplicationData.step);
        setViewMode(true);
      } else {
        setViewMode(false);
        handleStepJump(vbcApplicationData.step + 1);
      }
    }
  }, [vbcApplicationData]);

  /**
   * This function helps to jumb to particular step in UI
   *
   * IF conditions handles situation when user is coming back from Review Screen to directly Bank Account Screen, so instead of routing to
   * applicant screen it is routing to Review Screen by passing the Applicant Screen.

   *
   * @param {Number} step
   * @param {String} type
   */
  const handleStepJump = (step) => {
    if (jumpProgramStep) setCurrentStep(step + 1);
    else setCurrentStep(step);
  };

  /**
   * The function handles click events for navigating between steps in a multi-step process.
   * @returns If the `action` parameter is `'next'` and `currentStep` is equal to `stepsArray.length`,
   * then `setCurrentStep(stepsArray.length)` is being returned. Otherwise, if the `action` parameter is
   * `'prev'` and `currentStep` is equal to `1`, then `setCurrentStep(1)` is being returned.
   * @param {String} action
   */
  const handleClick = (action) => {
    if (action === 'next') {
      if (currentStep === stepsArray.length) {
        return setCurrentStep(stepsArray.length);
      }
      setCurrentStep(currentStep + 1);
    }
    if (action === 'prev') {
      if (currentStep === 1) {
        return setCurrentStep(1);
      }
      setCurrentStep(currentStep - 1);
    }
  };
  const stepsArray = [
    {
      description: 'step 1',
      component: <PaymentFrameworkForm handleClick={handleClick} />,
    },
    {
      description: 'step 2',
      component: <Information handleClick={handleClick} />,
    },
    {
      description: 'step 3',
      component: <Payable handleClick={handleClick} />,
    },
    {
      description: 'step 4',
      component: (
        <ReviewApplication
          viewMode={viewMode}
          handleStepJump={handleStepJump}
          handleClick={handleClick}
          {...props}
        />
      ),
    },
  ];

  return (
    <>
      <div className="stepper-container-horizontal">
        <Stepper
          direction="horizontal"
          currentStep={currentStep}
          steps={stepsArray}
          isShowSteps={!viewMode}
          className=""
        />
      </div>
    </>
  );
};

export default LoanApplication;
