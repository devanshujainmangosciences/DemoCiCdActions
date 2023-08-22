/**
 * This Components renders all the details so far filled in start loan
 * application steps so that the user can review it and submit the details to
 * server
 * <ReviewApplication
 * history(Func) => History is function from withRouter helps us to work on routes
 * handleStepJump(Func) => This function is used to push the user to specific step
 * handleClick(Func) => This function is used to take the user to next or prev step
 * viewMode(Bool) => Boolean tells us whether this component in viewmode or not
 * />
 */
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReviewApplicationIcon} from '@/assets/icons';
import {
  ALERT_MESSAGE,
  OCCUPATION,
  OCCUPATION_VALUE,
  Symbols,
} from '../../../constants';
import {Row, Col, Card} from '@themesberg/react-bootstrap';
import PropTypes from 'prop-types';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {Routes} from '@/routes';
import {CustomModal} from '@/components';
import {
  getFinancialInformation,
  setToast,
  startLoanApplicationSteps,
} from '@/actions';
import DisplaySubheader from '@/components/DisplaySubheader';
import InputForm from '../../profile/children/InputForm';
import {useNavigate} from 'react-router-dom';
import {isApplicantDocumentsUploaded} from '@/services/utility';

const ReviewApplication = (props) => {
  const {t} = useTranslation(['completeLoan']);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const requiredDocumentsData = useAppSelector(
    (state) => state.loanApplication.requiredDocuments
  );
  const history = useNavigate();
  const {
    handleStepJump,
    handleClick,
    isFinancialAssistance,
    viewMode,
    requiredDocument,
  } = props;
  let loanDetail = useAppSelector((state) => state.loanApplication.loanDetail);
  let localvalue = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );
  if (!localvalue) {
    localvalue = loanDetail.financeDetails;
  }

  // console.log('LOCAL VALUE=>', localvalue);

  /**
   * If localValue is empty localStorage startLoan data is set to localValue
   */

  let selectedOccupation = loanDetail.financeDetails.occupation;

  let isSelfEmployed = selectedOccupation === OCCUPATION.SELF_EMPLOYED;
  let isBusinessOwner = selectedOccupation === OCCUPATION.BUSINESS_OWNER;
  let isSalaried =
    selectedOccupation === OCCUPATION.SALARIED_PRIVATE ||
    selectedOccupation === OCCUPATION.SALARIED_PUBLIC;

  /**
   * Based on viewMode push the user to url which is coming from param
   * or takes the user to step which is also coming from param
   * @param {Number} step
   * @param {String} url
   */
  const navigateToDetails = (step, url) => {
    if (viewMode) {
      history(url);
    } else {
      handleStepJump(step);
    }
  };
  /**
   * The function toggles the value of a boolean variable called showModal.
   */
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  /**
   * This function handles the submission of a loan application and dispatches actions based on whether
   * required documents have been uploaded or not.
   */
  const handleApplicationSubmit = () => {
    const onSuccess = () => {
      dispatch(getFinancialInformation(true));
    };
    if (isApplicantDocumentsUploaded(requiredDocumentsData.data))
      dispatch(startLoanApplicationSteps(loanDetail, 4, onSuccess));
    else {
      dispatch(setToast(ALERT_MESSAGE.REQUIRED_DOCUMENTS, true, 'warning'));
      handleClickBack();
    }
    toggleModal();
  };
  /**
   * The function handles clicking the back button and either goes to the previous step or jumps to step
   * 3 depending on the value of a boolean variable.
   */
  const handleClickBack = () => {
    if (isFinancialAssistance) {
      handleClick('prev');
    } else {
      handleStepJump(3);
    }
  };
  // console.log('localvalue=>', localvalue);
  /**
   * This is a React component that renders a label and a value in a card format, with the value being
   * displayed as a read-only input field.
   * @returns A functional component named `LabelValue` is being returned. It takes two props, `label`
   * and `value`, and returns a `Col` component from Bootstrap with a `Card` component inside it. The
   * `Card` component contains an `InputForm` component with some props passed to it. The `InputForm`
   * component displays a label and a value, both of which are passed as
   */
  const LabelValue = ({label, value}) => {
    return (
      <>
        <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
          <Card className="border-0">
            <Card.Body>
              <InputForm
                label={t(`${label}`)}
                lablevalue={localvalue[value]}
                type="text"
                required
                isView={true}
                readOnly={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <>
      {/* <CustomModal
        cssClass='confirm-modal'
        Show={showModal}
        handleClose={toggleModal}
      >
        <div className='d-flex justify-content-center align-items-center flex-column py-4'>
          <span className='close' onClick={toggleModal} />
          <p className='text-pure-black'>
            Please confirm to submit application
          </p>
          <div className='d-flex flex-row mt-3'>
            <button
              className='btn-patient-theme bg-dark px-5'
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className='btn-patient-theme ms-3 px-5'
              onClick={handleApplicationSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </CustomModal> */}
      <CustomModal
        Show={showModal}
        title={''}
        handleClose={toggleModal}
        // cssClass={'privacy-modal'}
        closeButton={true}
        deleteModalText={t('submitApplication')}
        onConfirmDelete={() => handleApplicationSubmit()}>
        <div></div>
      </CustomModal>
      {/* {isFinancialAssistance ? ( */}
      <>
        <div className="page-container review-app p-4 mt-3">
          {!viewMode && (
            <div className="d-flex flex-row align-items-center title mb-2">
              <ReviewApplicationIcon fill="#28252e" width="20" height="20" />

              <h4 className="ms-2 mb-0 ">{t('reviewApplicationandConfirm')}</h4>
            </div>
          )}
          <div className="review-container p-0">
            {isFinancialAssistance ? (
              <>
                <DisplaySubheader
                  question={t('occupationType')}
                  response={OCCUPATION_VALUE[selectedOccupation]}>
                  {!viewMode && (
                    <button
                      className="btn-edit ms-2"
                      onClick={() => handleStepJump(2)}>
                      {t('edit')}
                    </button>
                  )}
                </DisplaySubheader>
              </>
            ) : (
              <>
                <h4 className=" mb-1 title">{t('applicationDetails')}</h4>
                <DisplaySubheader
                  question={t('paymentFramework')}
                  response={`Loan against caregiver's FD`}
                />
                <DisplaySubheader
                  question={t('amountPayable')}
                  response={`${Symbols.INDIAN_RUPEE}
                    ${
                      loanDetail && loanDetail.totalAmountPayable
                        ? loanDetail.totalAmountPayable
                        : '0'
                    }`}
                />

                <div className="d-flex flex-column">
                  <div className=" d-flex flex-row">
                    <p className="text-pure-black mb-1">
                      {t('bankYouCurrentlyHoldFd')}
                    </p>
                    {!viewMode && (
                      <button
                        className="ms-3 btn-edit"
                        onClick={() => handleStepJump(1)}>
                        {t('edit')}
                      </button>
                    )}
                  </div>
                  <p className="text-muted fw-medium p-0 m-0">
                    {' '}
                    {loanDetail && loanDetail.currentFixedDepositBank}{' '}
                  </p>{' '}
                </div>
                <div className="">
                  <small className="note text-muted">
                    {t('loanAgainstCaregiversFdNote')}
                  </small>
                </div>
              </>
            )}
            {localvalue?.bankAccountNumber && (
              <>
                {' '}
                <div className="d-flex flex-row justify-content-start sub-text-light">
                  <p className="d-flex flex-row align-items-center  m-0 mb-2 p-0">
                    {t('financialInformation')}:
                  </p>
                  {!viewMode && (
                    <button
                      onClick={navigateToDetails.bind(
                        null,
                        3,
                        Routes.ApplicantFinancialInformation.path
                      )}
                      className="ms-3 btn-edit">
                      {t('edit')}
                    </button>
                  )}
                </div>
                <div className="myprofile-container">
                  <div className="d-flex flex-row align-items-center sub-text-medium m-0 mb-2 p-0">
                    <p>{t('bankAccountDetails')}</p>
                  </div>
                  <Row className="pt-0 profession-info-row row-cols-lg-3 mt-0">
                    <LabelValue
                      label="bankAccountNumber"
                      value="bankAccountNumber"
                    />
                    <LabelValue label="bankName" value="bankName" />
                    <LabelValue label="bankBranch" value="bankBranch" />

                    <LabelValue label="bankIFSCCode" value="bankIfscCode" />
                  </Row>
                </div>
                {localvalue?.occupation && (
                  <div className="myprofile-container">
                    <div className="d-flex flex-row align-items-center sub-text-medium m-0 mb-2 p-0">
                      <p className="mb-0">
                        {t('professionalandotherfinancialinformation')}
                      </p>
                    </div>
                    <Row className="pt-0 profession-info-row row-cols-lg-3 mt-0">
                      <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('occupation')}
                              lablevalue={
                                OCCUPATION_VALUE[localvalue?.occupation]
                              }
                              type="text"
                              required
                              isView={true}
                              readOnly={true}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                      {isSalaried && (
                        <>
                          <LabelValue
                            label="employerName"
                            value="employerName"
                          />

                          <LabelValue
                            label="netMonthlyIncome"
                            value="netMonthlyIncome"
                          />
                          <LabelValue
                            label="salaryACwithBank"
                            value="salaryBankAccount"
                          />
                          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                            <Card className="border-0">
                              <Card.Body>
                                <InputForm
                                  label={t('tenureAtCompany')}
                                  lablevalue={
                                    localvalue.tenureAtCompany
                                      ? parseInt(
                                          localvalue.tenureAtCompany / 12
                                        ) +
                                        ' Years ' +
                                        (localvalue.tenureAtCompany % 12) +
                                        ' Months'
                                      : 'NA'
                                  }
                                  type="text"
                                  required
                                  isView={true}
                                  readOnly={true}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                            <Card className="border-0">
                              <Card.Body>
                                <InputForm
                                  label={t('totalWorkExperience')}
                                  lablevalue={
                                    localvalue.totalWorkExperience
                                      ? parseInt(
                                          localvalue.totalWorkExperience / 12
                                        ) +
                                        ' Years ' +
                                        (localvalue.totalWorkExperience % 12) +
                                        ' Months'
                                      : 'NA'
                                  }
                                  type="text"
                                  required
                                  isView={true}
                                  readOnly={true}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                          <LabelValue
                            label="anyOtherSelfOwnedResidenceOrliquidAsset"
                            value="anyOtherAsset"
                          />
                        </>
                      )}
                      {isBusinessOwner && (
                        <>
                          <LabelValue label="companyType" value="companyType" />
                          <LabelValue
                            label="natureOfBusiness"
                            value="natureOfBusiness"
                          />
                          <LabelValue
                            label="industryType"
                            value="industryType"
                          />
                          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                            <Card className="border-0">
                              <Card.Body>
                                <InputForm
                                  label={t('yearsInBusiness')}
                                  lablevalue={
                                    localvalue.yearsInBusiness
                                      ? parseInt(
                                          localvalue.yearsInBusiness / 12
                                        ) +
                                        ' Years ' +
                                        (localvalue.yearsInBusiness % 12) +
                                        ' Months'
                                      : 'Information not available'
                                  }
                                  type="text"
                                  required
                                  isView={true}
                                  readOnly={true}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                          <LabelValue label="sales" value="sales" />
                          <LabelValue
                            label="annualProfit"
                            value="annualProfit"
                          />
                        </>
                      )}
                      {isSelfEmployed && (
                        <>
                          <LabelValue
                            label="professionName"
                            value="professionName"
                          />
                          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                            <Card className="border-0">
                              <Card.Body>
                                <InputForm
                                  label={t('experience')}
                                  lablevalue={
                                    localvalue.experience
                                      ? parseInt(localvalue.experience / 12) +
                                        ' Years ' +
                                        (localvalue.experience % 12) +
                                        ' Months'
                                      : 'Information not available'
                                  }
                                  type="text"
                                  required
                                  isView={true}
                                  readOnly={true}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                          <LabelValue
                            label="grossAnnualIncome"
                            value="grossAnnualIncome"
                          />
                        </>
                      )}
                      <LabelValue label="residenceType" value="residenceType" />
                    </Row>
                  </div>
                )}
              </>
            )}
            {isFinancialAssistance && requiredDocument && (
              <>
                <div className="d-flex flex-row justify-content-start">
                  <div className="d-flex flex-row align-items-center sub-text-medium m-0 p-0">
                    <p className="mb-0">{t('requiredDocuments')}:</p>
                  </div>
                  {!viewMode && (
                    <button
                      onClick={navigateToDetails.bind(
                        null,
                        4,
                        Routes.ApplicantDocuments.path
                      )}
                      className="ms-3 btn-edit">
                      {t('edit')}
                    </button>
                  )}
                </div>
                <div>
                  <Row className="required-docs">
                    {requiredDocument.map((doc, i) => (
                      <div key={i}>
                        <div className="d-flex flex-row">
                          <p className="m-0 mb-2">{Object.keys(doc)[0]}</p>
                          {doc[Object.keys(doc)[0]] ? (
                            <div className="uploaded">
                              {doc.status && (
                                <span className="ms-0 border-0 bg-transparent">
                                  {doc.status}
                                </span>
                              )}
                              {t('documents:uploaded')}
                            </div>
                          ) : (
                            <div className="pending">
                              {doc.status && (
                                <span className="ms-0 border-0 bg-transparent">
                                  {doc.status}
                                </span>
                              )}
                              {t('documents:pending')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </Row>
                </div>
              </>
            )}
          </div>
        </div>
      </>
      {!viewMode && (
        <div className="d-flex flex-row  mt-2-rem">
          <button
            onClick={() => handleClickBack()}
            className="btn-patient-theme bg-dark me-2">
            {t('back')}
          </button>

          <button
            onClick={toggleModal}
            className="btn-patient-theme w-auto px-4">
            {t('submit')}
          </button>
        </div>
      )}
    </>
  );
};
ReviewApplication.propTypes = {
  handleStepJump: PropTypes.func,
  handleClick: PropTypes.func,
  isFinancialAssistance: PropTypes.bool,
  viewMode: PropTypes.bool,
  requiredDocument: PropTypes.array,
};
export default ReviewApplication;
