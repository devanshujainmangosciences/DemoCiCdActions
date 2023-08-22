/**
 * This Component renders a Question with Radio input Form, User can select the
 * Occuption in the radio box, user selected occupation will stored in localStorage
 * for later use
 * <SelectOccupation
 *  handleClick(Func) => This function is used to take the user to next or prev step of loan application process
 * />
 */
import React from 'react';
import {Form, Col} from '@themesberg/react-bootstrap';
import {OCCUPATION, OCCUPATION_ID, PAYMENT_FRAMEWORK} from '../../../constants';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@/redux/redux-hooks';
import {requiredDocuments, startLoanApplicationSteps} from '@/actions';

const SelectOccupation = ({
  occupation,
  setOccupation,
  isFinancialAssistance,
}) => {
  const {t} = useTranslation(['completeLoan']);
  const dispatch = useAppDispatch();
  /**
   * Used to set the user selected occupation to localStorage if selected option
   * is already in localStorage and it is not equal to current value it will remove all
   * Professional detail and takes the user to next step
   */
  const handleSaveAndProceed = () => {
    if (occupation) {
      const data = {
        paymentTypeOpted: PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE,
        occupationType: occupation,
      };
      dispatch(startLoanApplicationSteps(data, 1));
      dispatch(requiredDocuments(OCCUPATION_ID[occupation]));
    }
  };
  return (
    <div>
      <div className="page-container loan-app py-4 pb-1 px-4 mt-3">
        {isFinancialAssistance && (
          <React.Fragment>
            <p>{t('patientHastoSelectFollowingPayment')}</p>
            <h6 className="patient-color fw-medium py-2">
              Loan With Financial Assistance
            </h6>
          </React.Fragment>
        )}
        <Form.Group as={Col}>
          <Form.Label as="legend" className="question" column>
            {t('pleaseSelectYourOccupation')}
          </Form.Label>
          <Col sm={10}>
            <div className="pretty-radio">
              <input
                type="radio"
                className="radio"
                checked={occupation === OCCUPATION.SELF_EMPLOYED}
                value={OCCUPATION.SELF_EMPLOYED}
                onChange={(e) => setOccupation(e.target.value)}
                name="radio"
              />
              <span className="radio-look" />
              <span className="choice">{t('selfEmployed')}</span>
            </div>
            <div className="pretty-radio">
              <input
                type="radio"
                className="radio"
                checked={occupation === OCCUPATION.SALARIED_PRIVATE}
                value={OCCUPATION.SALARIED_PRIVATE}
                onChange={(e) => setOccupation(e.target.value)}
                name="radio"
              />
              <span className="radio-look" />
              <span className="choice">{t('salariedPrivate')}</span>
            </div>
            <div className="pretty-radio">
              <input
                type="radio"
                className="radio"
                checked={occupation === OCCUPATION.SALARIED_PUBLIC}
                value={OCCUPATION.SALARIED_PUBLIC}
                onChange={(e) => setOccupation(e.target.value)}
                name="radio"
              />
              <span className="radio-look" />
              <span className="choice">{t('salariedPublic')}</span>
            </div>
            <div className="pretty-radio">
              <input
                type="radio"
                className="radio"
                checked={occupation === OCCUPATION.BUSINESS_OWNER}
                value={OCCUPATION.BUSINESS_OWNER}
                onChange={(e) => setOccupation(e.target.value)}
                name="radio"
              />
              <span className="radio-look" />
              <span className="choice">{t('businessOwner')}</span>
            </div>
          </Col>
        </Form.Group>
      </div>
      <div className="btn-group mt-3">
        <button
          disabled={!occupation}
          onClick={handleSaveAndProceed}
          className="btn-patient-theme w-auto px-4 fw-normal">
          {t('proceed')}
        </button>
      </div>
    </div>
  );
};
SelectOccupation.propTypes = {
  handleClick: PropTypes.func,
  occupation: PropTypes.string,
  setOccupation: PropTypes.func,
  isFinancialAssistance: PropTypes.bool,
};
export default SelectOccupation;
