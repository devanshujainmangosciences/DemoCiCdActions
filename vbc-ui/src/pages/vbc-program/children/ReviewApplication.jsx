/**
 * This component renders the Application details which is collected throughtout the three steps
 * user can navigate to any step from this screen
 */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReviewApplicationIcon} from '@/assets/icons';
import {
  PAYMENT_FRAMEWORK,
  PAYMENT_FRAMEWORK_VALUE,
  Symbols,
} from '../../../constants';
import {Row, Col} from '@themesberg/react-bootstrap';
import TableComponent from '@/components/Tables';
import {tableHeadersReview} from '@/config';
import PropTypes from 'prop-types';
import {
  cancelApplication,
  readApplicantsList,
  vbcProgramSteps,
  reapplyApplication,
  setToast,
  jumpProgramStep,
  downloadDocument,
  getFinancialInformation,
} from '@/actions';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {Routes} from '@/routes';
import {CustomModal} from '@/components';
import VbcSchedule from '../VbcSchedule';
import {
  checkMasterValue,
  downloadFile,
  capitalizeFirstLetter,
} from '@/services/utility';
import MobileTable from '@/components/MobileTable';
import DisplaySubheader from '@/components/DisplaySubheader';
import {useNavigate} from 'react-router-dom';
import {actionTypes} from '@/constants/actionTypes';

const ReviewApplication = ({handleStepJump, handleClick, viewMode}) => {
  const {t} = useTranslation(['loanApplication']);
  const {SET_SHOW_DOCUMENT} = actionTypes;
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isVbScheduleVisible, setIsVbScheduleVisible] = useState(false);
  const [applicantsData, setapplicantsData] = useState([]);
  const [cancelledChequeDocument, setCancelledChequeDocument] = useState(null);
  const {userPermissions} = useAppSelector((state) => state.app);
  const {flags} = userPermissions;

  let localvalue = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );
  const finInfo = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );
  const masterData = useAppSelector((state) => state.template.masterData);

  let isSelfPay = localvalue?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY;
  let isLoanAgainstFinancialAssistance =
    localvalue?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE;
  let isLoanAgainstCareGiver =
    localvalue?.paymentTypeOpted ===
    PAYMENT_FRAMEWORK.LOAN_AGAINST_CAREGIVER_FD;
  let isLoanAgainstownFd =
    localvalue?.paymentTypeOpted === PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD;

  /**
   * To make the jumpProgramStep Value false everytime Review Application is rendered
   */
  useEffect(() => {
    dispatch(jumpProgramStep(false));
  }, []);
  /**
   * LIFE CYCLE TO Update Cancelled Cheque
   */
  useEffect(() => {
    if (finInfo && finInfo?.cancelledChequeDocument)
      setCancelledChequeDocument(finInfo?.cancelledChequeDocument);
    else dispatch(getFinancialInformation());
  }, [finInfo?.cancelledChequeDocument]);
  //To make applicant data
  // console.log('CANCELLED CHEQUW=>', cancelledChequeDocument);
  // console.log('finInfo=>', finInfo);
  useEffect(() => {
    if (localvalue.applicants) {
      const applicantsData = localvalue.applicants.map((applicant) => {
        const relationship = checkMasterValue(
          applicant?.relationToPatient,
          masterData?.relationships
        );
        const data = {
          ...applicant,
          gender: capitalizeFirstLetter(applicant.gender),
          relationToPatient: relationship,
        };
        return data;
      });
      setapplicantsData(applicantsData);
    }
  }, [localvalue]);

  /**
   * Dispatch enrollForVbc action and localValue to it as params
   */
  const handleSubmit = () => {
    // console.log('APPLICATION SUBMITTED');
    // toggleModal();
    const newValue = {...localvalue};
    newValue.totalPayableAmount = parseFloat(newValue?.totalPayableAmount) || 0;
    const onSuccess = () => {
      dispatch(readApplicantsList());
      dispatch(setToast('Application submitted successfully', true, 'success'));
    };
    dispatch(vbcProgramSteps(newValue, 4, onSuccess));
  };
  /**
   * Navigate to any steps or any route
   * @param {Integer} step
   * @param {String} url
   */
  const navigateToDetails = (step, url, type) => {
    if (type === 'accountDetails' && !viewMode) dispatch(jumpProgramStep(true));
    if (viewMode) {
      history(url, {
        state: {isNavigatedFromReview: true},
      });
    } else {
      handleStepJump(step);
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleClickCancel = () => {
    dispatch(cancelApplication());
  };
  const handleClickReapply = () => {
    dispatch(reapplyApplication());
  };

  // console.log('localvalue?.applicants=>', localvalue?.applicants);

  // const checkCancleCondition = () => {
  //   if (isLoanAgainstownFd) return false;
  //   else if (
  //     isSelfPay &&
  //     drugSchedule?.status &&
  //     drugSchedule?.data?.length > 0
  //   )
  //     return false;
  //   else return true;
  // };

  /**
   * This Function will fetch the byte format of selected file
   * @param {Any} e
   * @param {Id} id
   */
  const download = (e, id) => {
    e.preventDefault();

    const onSuccess = (response) => {
      downloadFile(response, cancelledChequeDocument?.documentName);
      return {
        type: SET_SHOW_DOCUMENT,
        payload: response,
      };
    };
    dispatch(downloadDocument(id, onSuccess));
  };

  return (
    <React.Fragment>
      {/* <CustomModal
        cssClass="confirm-modal"
        Show={showModal}
        handleClose={toggleModal}
      >
        <div className="d-flex justify-content-center align-items-center flex-column py-4">
          <span className="close" onClick={toggleModal} />
          <p className="text-pure-black">Please confirm to start application</p>
          <div className="d-flex flex-row mt-3">
            <button
              className="bg-patient-theme bg-dark px-5"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className="bg-patient-theme ms-3 px-5"
              onClick={handleSubmit}
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
        deleteModalText={t('startLoanApplication')}
        onConfirmDelete={handleSubmit}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={showCancelModal}
        title={''}
        handleClose={() => setShowCancelModal(!showCancelModal)}
        // cssClass={'privacy-modal'}
        closeButton={true}
        deleteModalText={t('cancelApplication')}
        onConfirmDelete={handleClickCancel}>
        <div></div>
      </CustomModal>
      {!isVbScheduleVisible ? (
        <div className="page-container review-app p-4 mt-3">
          <div className="d-flex flex-row review-header-wrapper  title mb-2">
            <div>
              <ReviewApplicationIcon fill="#28252e" width="20" height="20" />
            </div>
            <h4 className="ms-2 mb-0 review-heading">
              {viewMode
                ? t('reviewApplication')
                : t('reviewApplicationandConfirm')}
            </h4>
          </div>
          <div className="review-container">
            <DisplaySubheader
              question={t('paymentFramework')}
              response={PAYMENT_FRAMEWORK_VALUE[localvalue.paymentTypeOpted]}>
              {!viewMode && (
                <button
                  className="btn-edit ms-2"
                  onClick={() => handleStepJump(1)}>
                  {t('edit')}
                </button>
              )}
            </DisplaySubheader>

            <div className="d-flex justify-start-gap-1rem sub-text-light mt-2">
              <p className="mb-0">{t('accountDetails')}:</p>
              <button
                onClick={navigateToDetails.bind(
                  null,
                  2,
                  Routes.FinancialInformation.path,
                  'accountDetails'
                )}
                className="btn-edit">
                {t('edit')}
              </button>
            </div>
            <div>
              <Row className="sub-text-medium">
                <p className="mb-0">{t('financialInformation')}</p>
              </Row>
              <Row>
                <Col className="d-flex flex-column">
                  <p>{t('bankAccountNumber')} :</p>
                  <p className="fw-medium">
                    {localvalue?.accountNumber
                      ? localvalue?.accountNumber
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('bankName')} :</p>
                  <p className="fw-medium">
                    {localvalue?.bankName
                      ? localvalue?.bankName
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('bankBranch')} :</p>
                  <p className="fw-medium">
                    {localvalue?.bankBranch
                      ? localvalue.bankBranch
                      : 'Information not available'}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column col-4">
                  <p>{t('bankIFSCCode')} :</p>
                  <p className="fw-medium">
                    {localvalue?.bankIfscCode
                      ? localvalue.bankIfscCode
                      : 'Information not available'}
                  </p>
                </Col>
                <Col>
                  <p>{t('cancelledCheque')} :</p>
                  <div
                    className="d-flex align-items-center"
                    title={
                      cancelledChequeDocument
                        ? cancelledChequeDocument?.documentName
                        : 'Information not available'
                    }>
                    <p className="fw-medium truncate-text-200">
                      {cancelledChequeDocument
                        ? cancelledChequeDocument?.documentName
                        : 'Information not available'}
                    </p>
                    {cancelledChequeDocument && (
                      <button
                        className=" btn-patient-theme-input-30 fw-normal ms-2"
                        onClick={(e) =>
                          download(e, cancelledChequeDocument?.id)
                        }>
                        {t('documents:download')}
                      </button>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="sub-text-medium">
                <p className="mb-0">
                  {t('professionalandotherfinancialinformation')}
                </p>
              </Row>
              <Row>
                <Col className="d-flex flex-column">
                  <p>{t('panNumber')} :</p>
                  <p className="fw-medium">
                    {localvalue.panNumber
                      ? localvalue.panNumber
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('educationLevel')} :</p>
                  <p className="fw-medium">
                    {localvalue?.educationLevel
                      ? checkMasterValue(
                          localvalue?.educationLevel,
                          masterData?.educationLevelList
                        )
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('profession')} :</p>
                  <p className="fw-medium">
                    {localvalue.occupation
                      ? checkMasterValue(
                          localvalue?.occupation,
                          masterData?.professions
                        )
                      : 'Information not available'}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column">
                  <p>{t('EmployerCompanyName')} :</p>
                  <p className="fw-medium">
                    {localvalue.employerName
                      ? checkMasterValue(
                          localvalue?.employerName,
                          masterData?.EmployerCompanyName
                        )
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('Industry')} :</p>
                  <p className="fw-medium">
                    {localvalue.industry
                      ? checkMasterValue(
                          localvalue?.industry,
                          masterData?.industryTypes
                        )
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('designation')} :</p>
                  <p className="fw-medium">
                    {localvalue.designation
                      ? localvalue.designation
                      : 'Information not available'}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column">
                  <p>{t('averageAnnualEarnings')} :</p>
                  <p className="fw-medium">
                    {localvalue.selfAnnualIncome
                      ? localvalue.selfAnnualIncome
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('anyotherSourcesofIncome')} :</p>
                  <p className="fw-medium">
                    {localvalue.otherIncomeSource
                      ? localvalue.otherIncomeSource
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('insurance')} :</p>
                  <p className="fw-medium">
                    {localvalue.insurance ? 'Yes' : 'No'}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column">
                  <p>{t('insuranceCompany')} :</p>
                  <p className="fw-medium">
                    {localvalue.insuranceCompany
                      ? checkMasterValue(
                          localvalue?.insuranceCompany,
                          masterData?.insuranceCompanies
                        )
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('maturityAmount')} :</p>
                  <p className="fw-medium">
                    {localvalue.maturityAmount
                      ? localvalue.maturityAmount
                      : 'Information not available'}
                  </p>
                </Col>
                <Col className="d-flex flex-column">
                  <p>{t('annualFamilyIncome')} :</p>
                  <p className="fw-medium">
                    {localvalue.familyAnnualIncome
                      ? localvalue.familyAnnualIncome
                      : 'Information not available'}
                  </p>
                </Col>
              </Row>
            </div>
            {isLoanAgainstCareGiver && (
              <>
                <div className="d-flex justify-start-gap-1rem sub-text-light mt-3">
                  <p className="mb-0">{t('Applicant added')}:</p>
                  <button
                    onClick={navigateToDetails.bind(
                      null,
                      3,
                      Routes.PatientApplicant.path,
                      'applicant'
                    )}
                    className="btn-edit">
                    {t('edit')}
                  </button>
                </div>
                <div className="d-none d-md-block">
                  <TableComponent
                    component={'applicant-listing'}
                    tableHeadersData={tableHeadersReview}
                    tableData={applicantsData}
                    classes={'applicant w-100 mt-2'}
                    noCheck
                    headerClasses=""
                  />
                </div>
                <MobileTable
                  tableClasses="document-accordion"
                  tableData={applicantsData.map((applicant) => {
                    return {
                      ...applicant,
                      header: applicant?.fullName,
                    };
                  })}
                  tableHeader={tableHeadersReview}
                />
              </>
            )}
            {isLoanAgainstFinancialAssistance && (
              <div className="pt-0">
                <div className="d-flex justify-start-gap-1rem sub-text-light mt-3 mb-3">
                  <p className="mb-0">{t('Applicant added')}:</p>
                  <button
                    onClick={navigateToDetails.bind(
                      null,
                      3,
                      Routes.PatientApplicant.path,
                      'applicant'
                    )}
                    className="btn-edit">
                    {t('edit')}
                  </button>
                </div>
                <div className="d-none d-md-block">
                  <TableComponent
                    component={'applicant-listing'}
                    tableHeadersData={tableHeadersReview}
                    tableData={applicantsData}
                    classes={'applicant w-100 mt-2'}
                    noCheck
                    headerClasses=""
                  />
                </div>
                <MobileTable
                  tableClasses="document-accordion"
                  tableData={applicantsData.map((applicant) => {
                    return {
                      ...applicant,
                      header: applicant?.fullName,
                    };
                  })}
                  tableHeader={tableHeadersReview}
                />
              </div>
            )}
            <DisplaySubheader
              question={t('totalMedicationCost')}
              response={`${Symbols.INDIAN_RUPEE}${
                localvalue?.totalPayableAmount
                  ? localvalue?.totalPayableAmount
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

            {isLoanAgainstownFd && (
              <React.Fragment>
                {' '}
                <div className="d-flex flex-column mt-450">
                  <div className="d-flex flex-row mb-2">
                    <small className="text-pure-black">
                      {t('currentBankFd')}
                    </small>
                    {!viewMode && (
                      <button
                        className="ms-4 btn-edit"
                        onClick={() => handleStepJump(3)}>
                        {t('edit')}
                      </button>
                    )}
                  </div>
                  <p className="fw-medium text-pure-black">
                    {localvalue?.currentFixedDepositBank}
                  </p>{' '}
                </div>
              </React.Fragment>
            )}
            {flags && flags.showSchedule && (
              <div className="box-vbc-schedule mt-3 d-flex justify-content-center align-items-center">
                {' '}
                <button
                  onClick={() => setIsVbScheduleVisible(true)}
                  className="bg-transparent border-0 w-100 h-100">
                  {t('viewVBCschedule')}
                </button>{' '}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <VbcSchedule showBreadCrumb={false} />
          <div className="d-flex flex-row mt-2-rem">
            <button
              onClick={() => setIsVbScheduleVisible(false)}
              className="btn-patient-theme bg-dark px-5">
              {t('back')}
            </button>
          </div>
        </div>
      )}
      {!viewMode && !isVbScheduleVisible && (
        <div className="d-flex flex-row mt-2-rem">
          <button
            onClick={() => handleClick('prev')}
            className="btn-patient-theme bg-dark me-2">
            {t('back')}
          </button>
          <button
            onClick={toggleModal}
            className="btn-patient-theme w-auto px-4">
            {t('submitApplication')}
          </button>
        </div>
      )}
      {viewMode && localvalue.allowCancel && !isVbScheduleVisible && (
        <div className="d-flex flex-row mt-2-rem">
          <button
            onClick={() => setShowCancelModal(true)}
            className="btn-patient-theme bg-dark me-2">
            {t('cancel')}
          </button>
          <button
            onClick={handleClickReapply}
            className="btn-patient-theme w-auto px-4">
            {t('reapply')}
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
ReviewApplication.propTypes = {
  handleStepJump: PropTypes.func,
  handleClick: PropTypes.func,
  viewMode: PropTypes.bool,
};
export default ReviewApplication;
