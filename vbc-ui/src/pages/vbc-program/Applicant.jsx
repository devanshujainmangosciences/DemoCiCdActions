/**
 * This Component controls the 4 steps involved in vbc program
 */
import React, {useState, useEffect} from 'react';
import AddApplicant from './children/AddApplicant';
import {ApplicantsIcon} from '@/assets/icons';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  getEnrollForVbc,
  readApplicantsList,
  submitToMangoExecutive,
} from '@/actions';
import {Routes} from '@/routes';
import TitleContainer from '@/components/TitleContainer';
import {PAYMENT_FRAMEWORK} from '../../constants';
import {useNavigate} from 'react-router-dom';

const Applicant = () => {
  const history = useNavigate();
  const {t} = useTranslation(['myProfile'], ['applicants']);
  const applicants = useAppSelector((state) => state.applicants.applicantsList);
  const [limitReached, setLimitReached] = useState(false);
  const [isNotEnrolled, setIsNotEnrolled] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [isSubmitToMangoDisabled, setIsSubmitToMangoDisabled] = useState(false);
  const vbcApplicationData = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );
  const dispatch = useAppDispatch();
  const isShowSubmitButton =
    !isSubmitToMangoDisabled || vbcApplicationData?.paymentSwitchInProgress;

  /**
   * Dispatches readApplicantsList action when applicant is empty
   */
  useEffect(() => {
    if (!applicants) {
      dispatch(readApplicantsList());
    }
  }, [applicants, dispatch]);

  useEffect(() => {
    if (!vbcApplicationData) {
      dispatch(getEnrollForVbc());
    } else {
      setViewMode(vbcApplicationData?.step === 4);
    }
  }, [dispatch, vbcApplicationData]);

  // console.log('VIEW MODE=>', viewMode);

  /**
   * Sets the limit to number applicant can be added by
   * user based on paymentTypeOpted
   */
  useEffect(() => {
    if (applicants) {
      if (
        applicants.enrollmentStatus ===
          'Loan application yet to be submitted' ||
        applicants.enrollmentStatus === 'Rejected'
      )
        setIsSubmitToMangoDisabled(false);

      if (
        applicants.enrollmentStatus === 'credit assessment under process' ||
        applicants.enrollmentStatus === 'Approved'
      )
        setIsSubmitToMangoDisabled(true);

      if (applicants.notEnrolled) {
        setIsNotEnrolled(true);
      } else {
        if (vbcApplicationData?.paymentSwitchInProgress) {
          setIsNotEnrolled(false);
          return;
        }
        if (
          applicants.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY ||
          applicants.paymentTypeOpted === PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD
        )
          setIsNotEnrolled(true);
        else setIsNotEnrolled(false);
      }
    }
  }, [applicants, vbcApplicationData]);

  /**
   * Set the limit reached state true or false based on paymentModeSelected
   */
  useEffect(() => {
    if (applicants) {
      switch (applicants.paymentTypeOpted) {
        case PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD: {
          if (applicants.content.length >= 1) {
            setLimitReached(true);
          } else {
            setLimitReached(false);
          }
          break;
        }
        case PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE: {
          if (applicants.content.length >= 5) {
            setLimitReached(true);
          } else {
            setLimitReached(false);
          }
          break;
        }
        default: {
          setLimitReached(false);
          break;
        }
      }
      if (applicants.notEnrolled) {
        setLimitReached(true);
      }
    }
  }, [applicants]);
  /**
   * The function handles a click event to submit data to Mango Executive and dispatches actions based on
   * the success of the submission.
   */
  const handleClickSubmit = () => {
    const onSuccess = () => {
      dispatch(readApplicantsList());
      dispatch(getEnrollForVbc());
    };
    dispatch(submitToMangoExecutive(onSuccess));
  };

  return (
    <div>
      <TitleContainer
        icon={<ApplicantsIcon fill="#fff" />}
        title={t('applicants:applicants')}
      />
      {!isNotEnrolled ? (
        <>
          <div className="applicant-buttons mt-3 mb-3">
            {!isSubmitToMangoDisabled && (
              <button disabled={limitReached} className=" caregiver-btn">
                {t('applicants:addApplicant')}
              </button>
            )}
            {isShowSubmitButton && (
              <button
                disabled={
                  vbcApplicationData?.paymentSwitchInProgress
                    ? false
                    : isSubmitToMangoDisabled
                }
                onClick={handleClickSubmit}
                className="btn-patient-theme ">
                {t('applicants:submitToMangoExcecutive')}
              </button>
            )}

            <button className="status">
              {t('applicants:status')} :{' '}
              {vbcApplicationData?.paymentSwitchInProgress
                ? 'Selfpay to Finance In Progress'
                : applicants?.enrollmentStatus}
            </button>
          </div>

          <AddApplicant
            limitReached={limitReached}
            applicants={applicants}
            setLimitReached={setLimitReached}
            isAddApplicant={true}
            isEditDisabled={isSubmitToMangoDisabled}
          />
        </>
      ) : (
        <div className="item p-4 mt-4 text-black">
          {t('applicants:notEnrolledMessage')}
          <div>
            {!viewMode && (
              <button
                onClick={() => history(Routes.LoanApplication.path)}
                className="btn-patient-theme mt-4 px-4">
                {t('applicants:startLoanApplication')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
