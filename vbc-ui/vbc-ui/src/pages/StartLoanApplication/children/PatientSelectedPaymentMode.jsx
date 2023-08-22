/**
 * This component is loaded in the first step of the VBC program
 * Bacially it records the data of the type of payment mode selected by the Patient when applying for VBC programme
 */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Form, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {startLoanApplicationSteps} from '@/actions';
import {PAYMENT_FRAMEWORK, Symbols} from '../../../constants';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const PatientSelectedPaymentMode = ({loanAmount}) => {
  const {t} = useTranslation(['completeLoan']);
  const [currentFDBank, setCurrentFDBank] = useState('');
  const dispatch = useAppDispatch();
  const loanDetail = useAppSelector(
    (state) => state.loanApplication.loanDetail
  );

  /**
   * This callback will set the currentFdbank state coming from api
   */
  useEffect(() => {
    if (loanDetail?.currentFixedDepositBank) {
      setCurrentFDBank(loanDetail.currentFixedDepositBank);
    }
  }, [loanDetail]);

  /**
   * This function will dispatch the first step in vbc program with
   * required data
   */
  const completeLoan = (e) => {
    e.preventDefault();
    if (currentFDBank) {
      const data = {
        currentFixedDepositBank: currentFDBank,
        paymentTypeOpted: PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD,
      };
      dispatch(startLoanApplicationSteps(data, 1));
    }
  };

  return (
    <React.Fragment>
      <div className="page-container start-loan p-5 px-6">
        <p> {t('patientHastoSelectFollowingPayment')}</p>
        <h6 className="patient-color fw-medium py-2">
          Loan Against Fixed Deposit
        </h6>
        <p className="py-2">
          {t('amountPayable')} &nbsp; {Symbols.INDIAN_RUPEE} {loanAmount}
        </p>
        <Form onSubmit={completeLoan}>
          <Row>
            <Form.Group className="mb-3 col-sm-8">
              <Form.Label>{t('whichBankCurrentlyHoldFd')}</Form.Label>
              <Form.Control
                className="current-bank"
                value={currentFDBank}
                required
                type="text"
                onChange={(e) => setCurrentFDBank(e.target.value)}
              />
            </Form.Group>
          </Row>
          <div className="note mt-4">
            <p>Note: {t('note')}</p>
          </div>
        </Form>
      </div>
      <div className="btn-group m-4 ms-6">
        <button
          onClick={completeLoan}
          className="btn-patient-theme w-auto px-5 ms-3">
          {t('saveAndProceed')}
        </button>
      </div>
    </React.Fragment>
  );
};
PatientSelectedPaymentMode.propTypes = {
  handleClick: PropTypes.func,
};
export default PatientSelectedPaymentMode;
