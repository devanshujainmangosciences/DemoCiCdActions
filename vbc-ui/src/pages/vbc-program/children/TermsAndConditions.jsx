/**
 * This component renders Terms And Conditions for the user to read
 * Only user can to proceed when user accepts the terms and conditions
 */
import React, {useState} from 'react';
import {Form} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {CustomModal} from '@/components';
import TermsOfUse from '@/pages/terms-policy/TermsOfUse';

const TermsAndConditions = ({handleClick}) => {
  const {t} = useTranslation(['loanApplication']);
  const [accepted, setAccepted] = useState(false);
  const [termsModal, settermsModal] = useState(false);
  const handleModalClose = () => {
    settermsModal(false);
  };
  return (
    <div>
      <div className="page-container loan-app mt-3">
        <CustomModal
          Show={termsModal}
          title={''}
          handleClose={handleModalClose}
          cssClass={'privacy-modal'}
          closeButton={true}>
          <div>
            <TermsOfUse removeIcon={true} />
          </div>
        </CustomModal>
        <div>
          <Form>
            <Form.Group controlId="isActive">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={accepted}
                  className="terms"
                  type="checkbox"
                  onChange={() => setAccepted(!accepted)}
                  label={t('TermsAndConditions')}
                />
              </Form.Group>
            </Form.Group>
          </Form>
          <p
            // target="blank"
            // href={import.meta.env.VITE_VBC_PROGRAM_TERMS}
            onClick={() => settermsModal(true)}
            className="text-admin text-decoration-underline mt-3 read-terms">
            {t('ReadTermsAndConditions')}
          </p>
        </div>
      </div>
      <button
        // disabled={!accepted}
        onClick={() => handleClick(accepted, 'terms-check')}
        className="btn-patient-theme mt-3 ">
        {t('confirm')}
      </button>
    </div>
  );
};
export default TermsAndConditions;
