/**
 * This Component renders a checkbox in case of payment mode opted is self pay or loan against own fd
 * or Add applicant form in case of payment mode opted is loan againt caregivers fd or financial assistance
 */
import React, {useState, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Form} from '@themesberg/react-bootstrap';
import {ALERT_MESSAGE, PAYMENT_FRAMEWORK, Symbols} from '../../../constants';
import AddApplicant from './AddApplicant';
import PropTypes from 'prop-types';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {vbcProgramSteps} from '@/actions';
import VbcSchedule from '../VbcSchedule';
import DisplaySubheader from '@/components/DisplaySubheader';
import {setToast} from '@/actions';

const Payable = ({handleClick}) => {
  const {t} = useTranslation(['loanApplication']);
  const [isVbcAccepted, setIsVbcAccepted] = useState(false);
  const [currentFixedDepositBank, setCurrentFixedDepositBank] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const [isVbScheduleVisible, setIsVbScheduleVisible] = useState(false);
  const dispatch = useAppDispatch();
  const vbcApplicationData = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );

  const {userPermissions} = useAppSelector((state) => state.app);
  const {flags} = userPermissions;
  /**
   * Fetchs the lender lists if it has no value and set it to bankList state
   */
  useEffect(() => {
    if (vbcApplicationData) {
      setCurrentFixedDepositBank(
        vbcApplicationData?.currentFixedDepositBank
          ? vbcApplicationData?.currentFixedDepositBank
          : ''
      );
      setIsVbcAccepted(
        vbcApplicationData?.step ? vbcApplicationData.step > 2 : ''
      );
    }
  }, [vbcApplicationData]);

  let isSelfPay =
    vbcApplicationData?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY;
  let isLoanAgainstOwnFd =
    vbcApplicationData?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD;
  let isSelfPaymentOrOwnFd =
    vbcApplicationData?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY ||
    vbcApplicationData?.paymentTypeOpted ===
      PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD;
  let isLoanAgainstCareGiver =
    vbcApplicationData?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD;
  let isLoanAgainstFinancialAssistance =
    vbcApplicationData?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE;

  /**
   * Take the user to next step if isSelfPaymentOrOwnFd is true
   * and isVbcAccepted is true and set fundsAcknowledged to localStorage
   */
  const handleClickNext = useCallback(
    (e) => {
      e.preventDefault();
      if (isSelfPaymentOrOwnFd) {
        if (isVbcAccepted) {
          const data = {
            fundsAcknowledged: isVbcAccepted,
            currentFixedDepositBank: currentFixedDepositBank,
          };
          dispatch(vbcProgramSteps(data, 3));
        } else dispatch(setToast(ALERT_MESSAGE.ACCEPT_TERMS, true, 'warning'));
      }
    },
    [isSelfPaymentOrOwnFd, isVbcAccepted, currentFixedDepositBank, dispatch]
  );

  return (
    <>
      {isSelfPaymentOrOwnFd ? (
        <>
          {!isVbScheduleVisible ? (
            <Form onSubmit={handleClickNext}>
              <div className="page-container loan-app mt-3">
                <DisplaySubheader
                  question={t('totalMedicationCost')}
                  response={`${Symbols.INDIAN_RUPEE}${
                    vbcApplicationData?.totalPayableAmount
                      ? vbcApplicationData?.totalPayableAmount
                      : '0'
                  }*`}
                />

                <div>
                  {isSelfPay ? (
                    <p>{t('selfPayFootNote')}</p>
                  ) : (
                    <p>{t('loanFootNote')}</p>
                  )}
                </div>

                {isLoanAgainstOwnFd && (
                  <Form.Group className="mt-3 ">
                    <Form.Label>{t('whichBankCurrentlyHoldFd')}</Form.Label>
                    <Form.Control
                      className="current-bank text-pure-black mb-2"
                      value={currentFixedDepositBank}
                      required
                      type="text"
                      onChange={(e) =>
                        setCurrentFixedDepositBank(e.target.value)
                      }
                    />
                  </Form.Group>
                )}
                {flags && flags.showSchedule && (
                  <div
                    className={`box ${
                      isLoanAgainstOwnFd ? 'mt-4' : 'mt-3'
                    } d-flex justify-content-center align-items-center`}>
                    {' '}
                    <button
                      onClick={() => setIsVbScheduleVisible(true)}
                      type="button"
                      className="bg-transparent border-0 ">
                      {t('viewVBCschedule')}
                    </button>{' '}
                  </div>
                )}
                <Form.Group className="mb-4">
                  <Form.Check
                    checked={isVbcAccepted}
                    className="terms"
                    type="checkbox"
                    onChange={() => setIsVbcAccepted(!isVbcAccepted)}
                    label={t('TermsAndConditions')}
                  />
                </Form.Group>
                <div className="note mt-3">
                  <small className="text-pure-black">
                    {isLoanAgainstOwnFd &&
                      `Note: You will need to create a FD of  ${
                        Symbols.INDIAN_RUPEE
                      } ${
                        vbcApplicationData?.totalPayableAmount
                          ? vbcApplicationData.totalPayableAmount
                          : '0'
                      } amount with our lending partner. A representative of our lending partner will reach out to you in the next 1 to 2 working days.`}
                  </small>
                </div>
              </div>
              <div className="d-flex flex-row  mt-4">
                <button
                  onClick={() => handleClick('prev')}
                  type="button"
                  className="btn-patient-theme bg-dark me-2">
                  {t('back')}
                </button>
                <button
                  // disabled={!isVbcAccepted}
                  type="submit"
                  className="btn-patient-theme w-auto px-4 fw-normal">
                  {t('saveAndProceed')}
                </button>
              </div>
            </Form>
          ) : (
            <div>
              <VbcSchedule showBreadCrumb={false} />
              <div className="d-flex flex-row mt-4">
                <button
                  onClick={() => setIsVbScheduleVisible(false)}
                  type="button"
                  className="btn-patient-theme bg-dark px-5">
                  {t('back')}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <AddApplicant
          limitReached={limitReached}
          setLimitReached={setLimitReached}
          isAddApplicant={false}
          handleClick={handleClick}
          isNote={isLoanAgainstCareGiver}
          showTable={isLoanAgainstFinancialAssistance}
          applicantsList={vbcApplicationData.applicants}
        />
      )}
    </>
  );
};
Payable.propTypes = {
  handleClick: PropTypes.func,
};
export default Payable;
