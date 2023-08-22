/**
 * This component renders a form for user to select the payment mode which is the step 1 in
 * loan application
 */
import React, {useEffect, useState} from 'react';
import {Form, Col} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {ALERT_MESSAGE, PAYMENT_FRAMEWORK} from '../../../constants';
import TermsAndConditions from './TermsAndConditions';
import {vbcProgramSteps, setToast} from '@/actions';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import PropTypes from 'prop-types';

const PaymentFrameworkForm = () => {
  const {t} = useTranslation(['loanApplication']);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [isStepsJourney, setIsStepsJourney] = useState(false);
  const vbcApplicationData = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );

  // console.log('VBC APPLICANT=>', vbcApplicationData);
  /**This `useEffect` hook is used to set the initial value of the `value` state variable based on the
`paymentTypeOpted` value from the `vbcApplicationData` object. It runs whenever the
`vbcApplicationData` object changes. If the `paymentTypeOpted` value is present in the
`vbcApplicationData` object, it sets the `value` state variable to that value and calls the
`handleConfirm` function. */
  useEffect(() => {
    if (vbcApplicationData) {
      if (vbcApplicationData?.paymentTypeOpted) {
        handleConfirm();
        setValue(vbcApplicationData.paymentTypeOpted);
      }
    }
  }, [vbcApplicationData]);

  /**
   * The function handles saving and proceeding with a payment type option and accepted terms.
   */
  const handleSaveAndProceed = () => {
    if (value) {
      const data = {
        paymentTypeOpted: value,
        termsAccepted: true,
      };
      dispatch(vbcProgramSteps(data, 1));
    }
  };
  /**
   * The function handles user confirmation and sets a state variable or dispatches a toast message based
   * on the user's response.
   */
  const handleConfirm = (accepted, type) => {
    if (accepted) setIsStepsJourney(true);
    else if (!accepted && type === 'terms-check')
      dispatch(setToast(ALERT_MESSAGE.ACCEPT_TERMS, true, 'warning'));
  };
  return (
    <div>
      {isStepsJourney ? (
        <div className="page-container loan-app mt-3">
          <Form.Group as={Col}>
            <Form.Label as="legend" className="question" column>
              {t('paymentmode')}
            </Form.Label>
            <Col sm={10}>
              <div className="pretty-radio">
                <input
                  type="radio"
                  checked={value === PAYMENT_FRAMEWORK.SELF_PAY}
                  className="radio"
                  name="radio"
                  value={PAYMENT_FRAMEWORK.SELF_PAY}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="radio-look" />
                <span className="choice">{t('selfPay')}</span>
              </div>
              {/*
              Commented the code, not to select FD options
               */}
              {/* <div className="pretty-radio">
                <input
                  type="radio"
                  checked={value === PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD}
                  className="radio"
                  name="radio"
                  value={PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="radio-look" />
                <span className="choice">{t('LoanagainstownFD')}</span>
              </div> */}
              {/* <div className="pretty-radio">
                <input
                  type="radio"
                  checked={
                    value === PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD
                  }
                  className="radio"
                  name="radio"
                  value={PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="radio-look" />
                <span className="choice">{t('loanagainstcaregiversFD')}</span>
              </div> */}
              <div className="pretty-radio">
                <input
                  type="radio"
                  checked={
                    value === PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
                  }
                  className="radio"
                  name="radio"
                  value={PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE}
                  onChange={(e) => setValue(e.target.value)}
                />
                <span className="radio-look" />
                <span className="choice">
                  {t('loanwithFinancialAssistance')}
                </span>
              </div>
            </Col>
          </Form.Group>
          <div>
            <button
              onClick={() => setIsStepsJourney(false)}
              className="btn-patient-theme bg-dark fw-normal mt-3 ">
              {t('back')}
            </button>
            <button
              disabled={!value}
              onClick={() => handleSaveAndProceed()}
              className="btn-patient-theme mt-3 ms-2 w-auto px-4 fw-normal">
              {t('saveAndProceed')}
            </button>
          </div>
        </div>
      ) : (
        <>
          <TermsAndConditions handleClick={handleConfirm}></TermsAndConditions>
        </>
      )}
    </div>
  );
};
PaymentFrameworkForm.propTypes = {
  handleClick: PropTypes.func,
};
export default PaymentFrameworkForm;
