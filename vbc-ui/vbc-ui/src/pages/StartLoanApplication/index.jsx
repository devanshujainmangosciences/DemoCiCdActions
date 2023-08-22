/**
 * This Component Controls the fours involved in start loan application
 */

import React, {useState, useEffect} from 'react';
import Stepper from '@/components/Stepper';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  getLoanApplicationDetails,
  getMasterData,
  requiredDocuments,
} from '@/actions';
import {
  SelectOccupation,
  FinancialInformation,
  ReviewApplication,
  PatientSelectedPaymentMode,
  ApplicantDocuments,
} from './children';
import {
  MASTER_DATA_FINANCE_APPLICANT,
  OCCUPATION_ID,
  PAYMENT_FRAMEWORK,
} from '../../constants';
import SuspenseFallbackLoader from '@/components/SuspenseFallbackLoader';

const StartLoanApplication = (props) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requiredDocumentStatus, setRequiredDocumentStatus] = useState([]);
  const [occupation, setOccupation] = useState('');
  const [isFinancialAssistance, setIsFinancialAssistance] = useState(false);
  const loanDetail = useAppSelector(
    (state) => state.loanApplication.loanDetail
  );
  const masterData = useAppSelector((state) => state.template.masterData);
  const requiredDocument = useAppSelector(
    (state) => state.loanApplication.requiredDocuments
  );

  /**  This `useEffect` hook is responsible for dispatching the `requiredDocuments` action when the
`occupation` state changes or when the `loanDetail` state is not available or when the
`requiredDocuments` property is available in the `loanDetail` state. It ensures that the required
documents for the selected occupation are fetched and stored in the Redux store. The dependencies of
this hook are `dispatch`, `loanDetail`, and `occupation`. */
  useEffect(() => {
    if (!loanDetail || loanDetail.requiredDocuments) {
      if (occupation) {
        dispatch(requiredDocuments(OCCUPATION_ID[occupation]));
      }
    }
  }, [dispatch, loanDetail, occupation]);

  /**
   * Dispatch getLoanApplication
   */
  useEffect(() => {
    if (!loanDetail || !loanDetail.financeDetails) {
      const callbackAfterMasterData = () => {
        dispatch(getLoanApplicationDetails());
      };
      if (!masterData?.professions)
        dispatch(
          getMasterData(
            MASTER_DATA_FINANCE_APPLICANT,
            true,
            callbackAfterMasterData
          )
        );
      else callbackAfterMasterData();
    }
    if (loanDetail && !masterData?.professions) {
      dispatch(getMasterData(MASTER_DATA_FINANCE_APPLICANT, true));
    }
  }, [loanDetail, masterData, dispatch]);

  /**This `useEffect` hook is responsible for updating the `requiredDocumentStatus` state whenever the
`requiredDocument` state changes. It first checks if `requiredDocument` is truthy, then it maps
through the keys of `requiredDocument.data` to check the status of each required document. If a
required document has more than one item, it counts the number of items that are false and pushes an
object with the document name, a boolean indicating if all items are true, and a status string
showing the number of true and false items. If a required document has only one item, it pushes an
object with the document name and its status. Finally, it sets the `requiredDocumentStatus` state to
the array of objects. The dependencies of this hook are `requiredDocument` and
`setRequiredDocumentStatus`. */
  useEffect(() => {
    if (requiredDocument) {
      let documents = [];
      Object.keys(requiredDocument?.data).map((doc) => {
        if (Object.keys(requiredDocument.data[doc]).length > 1) {
          let falseCount = 0;
          let totalCount = Object.keys(requiredDocument.data[doc]).length;
          Object.keys(requiredDocument?.data[doc]).map((item) => {
            if (!requiredDocument?.data[doc][item]) {
              falseCount++;
            }
          });
          if (falseCount === 0) {
            documents.push({
              [doc]: true,
              status: totalCount + ' / ' + totalCount,
            });
          }
          if (falseCount > 0) {
            documents.push({
              [doc]: false,
              status: falseCount + ' / ' + totalCount,
            });
          }
        } else {
          documents.push({[doc]: requiredDocument.data[doc]['1']});
        }
      });
      setRequiredDocumentStatus(documents);
    }
  }, [requiredDocument, setRequiredDocumentStatus]);

  /** This `useEffect` hook is responsible for updating the component state whenever the `loanDetail`
state changes. It first checks if `loanDetail` is truthy, then it sets the `isSubmitted` state to
the value of `loanDetail.applicationSubmitFlag`, sets the `loanAmount` state to the value of
`loanDetail.totalAmountPayable`, and sets the `occupation` state to the value of
`loanDetail.financeDetails.occupation` if it exists. The hook has a dependency array of
`[loanDetail]`, which means it will only run when `loanDetail` changes. */
  useEffect(() => {
    if (loanDetail) {
      setIsSubmitted(loanDetail.applicationSubmitFlag);
      setLoanAmount(loanDetail.totalAmountPayable);
      if (loanDetail.financeDetails?.occupation) {
        setOccupation(loanDetail.financeDetails.occupation);
      }
    }
  }, [loanDetail]);

  /** This `useEffect` hook is responsible for updating the component state whenever the `loanDetail`
state changes. It first checks if `loanDetail` is truthy and if the `paymentTypeOpted` property of
`loanDetail` is equal to `PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE`. If this condition is
true, it sets the `isFinancialAssistance` state to `true`. */
  useEffect(() => {
    if (loanDetail) {
      if (
        loanDetail.paymentTypeOpted ===
        PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
      ) {
        setIsFinancialAssistance(true);
        if (loanDetail.step === 0) {
          handleStepJump(2);
          setIsSubmitted(false);
        } else if (loanDetail.step >= 4) {
          setIsSubmitted(true);
          handleStepJump(5);
        } else {
          setIsSubmitted(false);
          handleStepJump(loanDetail.step + 2);
        }
      }
    }
  }, [loanDetail]);

  /** This `useEffect` hook is responsible for updating the component state whenever the `loanDetail`
state changes. It first checks if `loanDetail` is truthy and if the `paymentTypeOpted` property of
`loanDetail` is equal to `PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD`. If this condition is true,
it sets the `isFinancialAssistance` state to `false`. */
  useEffect(() => {
    if (loanDetail) {
      if (
        loanDetail.paymentTypeOpted ===
        PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
      ) {
        setIsFinancialAssistance(false);
        if (loanDetail.step === 0) {
          setIsSubmitted(false);
          handleStepJump(1);
        } else if (loanDetail.step >= 3) {
          setIsSubmitted(true);
          handleStepJump(5);
        } else {
          setIsSubmitted(false);
          const step = 2 * loanDetail.step + 1;
          handleStepJump(step);
        }
      }
    }
  }, [loanDetail]);
  /**
   * Takes the user the step in startLoan Application based on
   * step param
   * @param {Number} step
   */
  const handleStepJump = (step) => {
    setCurrentStep(step);
  };
  /**
   * Takes the user to next or prev step based on action string param
   * @param {String} action
   *
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
  /**
   * Component array
   */
  const stepsArray = [
    {
      component: (
        <PatientSelectedPaymentMode
          handleClick={handleClick}
          loanAmount={loanAmount}
          isFinancialAssistance={isFinancialAssistance}
        />
      ),
    },
    {
      component: (
        <SelectOccupation
          handleClick={handleClick}
          financeDetails={loanDetail && loanDetail.financeDetails}
          occupation={occupation}
          setOccupation={setOccupation}
          isFinancialAssistance={isFinancialAssistance}
        />
      ),
    },
    {
      component: (
        <FinancialInformation
          handleClick={handleClick}
          requiredDocument={requiredDocument && requiredDocument.data}
          occupation={occupation}
          setOccupation={setOccupation}
          isFinancialAssistance={isFinancialAssistance}
          handleStepJump={handleStepJump}
        />
      ),
    },
    {
      component: (
        <ApplicantDocuments
          isStartLoanApplicant={true}
          handleClick={handleClick}
          requiredDocument={requiredDocumentStatus}
          occupation={occupation && occupation}
        />
      ),
    },
    {
      component: (
        <ReviewApplication
          viewMode={isSubmitted}
          isFinancialAssistance={isFinancialAssistance}
          handleStepJump={handleStepJump}
          handleClick={handleClick}
          requiredDocument={requiredDocumentStatus}
          {...props}
        />
      ),
    },
  ];

  return (
    <div className="stepper-container-horizontal p-0 m-0">
      {currentStep !== 0 ? (
        <Stepper
          direction="horizontal"
          currentStep={currentStep}
          steps={stepsArray}
          isShowSteps={false}
        />
      ) : (
        <SuspenseFallbackLoader />
      )}
    </div>
  );
};

export default StartLoanApplication;
