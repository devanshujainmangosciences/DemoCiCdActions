/**
 * This component is rendered for ME and Doctor component when they want to see the patient details
 * On load of this component,it calls the api to fetch the patients details based on the patient ID
 */
import {Card, Col, Form, FormGroup, Row} from '@themesberg/react-bootstrap';
import React, {useState, useEffect, useCallback, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../redux/redux-hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {
  downloadDocument,
  readLenders,
  setToast,
  uploadDocumentForPatientByMe,
} from '../actions';
import {Can, CustomModal, TableComponent} from '../components';
import {actionTypes} from '../constants/actionTypes';

import {
  tableHeadersPatientDetailsApplicants,
  tableHeadersPatientDetailsDrugSchedule,
  tableHeadersLenderHistory,
  tableHeadersTreatmentBreaks,
  tableHeadersPatientDetailVbcSchedule,
  tableHeadersPatientDetailsDrugScheduleSelfPay,
  tblHeaderPatientDetailsDrugScheduleLenderPayout,
} from '../config';
import {
  approveLoanForPatient,
  assignDoctorToPatient,
  assignLenderToPatient,
  assignTreatmentInitiationDateToPatient,
  editTreatmentForPatient,
  getDoctorsByHospitalId,
  getMangoPatientDetails,
  rejectLoanForPatient,
  updatePatientInteractionNotes,
  setPatientId,
  updatePatientStatusToAware,
  addDrugReceiptAmount,
  markGrantPaid,
  updateDataConsentDate,
  markRebatePaid,
  resetPatientDetails,
  triggerGrantEmail,
} from '../actions/mangoExecutiveActions';
import {
  ALERT_MESSAGE,
  DateFormat,
  PAYMENT_FRAMEWORK,
  PAYMENT_FRAMEWORK_VALUE,
  SELECTED_ROLE_NAME,
  ROLES,
  Symbols,
  VALIDATE_DATE_TYPE,
} from '../constants';

import {
  capitalizeFirstLetter,
  dateValidator,
  downloadFile,
  dynamicMessageCreation,
  fileSizeValidator,
  fileTypeValidator,
  LabelValue,
} from '../services/utility';
import MultiLineInput from '../components/MultiLineInput';
import {secureLocalStorage} from '../services/web.storage';
import {EditIcon} from '../assets/icons';
import PatientTimeline from './clinical-details/PatientTimeline';
import SendPushNotification from './mango-executive/SendPushNotification';
import {MONTHLY, paymentFrequencyData} from '../data/staticOptionData';
import format from 'date-fns/format';
import SuspenseFallbackLoader from '../components/SuspenseFallbackLoader';
import InputForm from './profile/children/InputForm';

const PatientAddationalProfileDetails = React.lazy(() =>
  import('./PatientAddationalProfileDetails')
);
const SelfPayToFinance = React.lazy(() =>
  import('./mango-executive/SelfPayToFinance')
);

const PatientDetails = ({patientId, goBack}) => {
  // const locationPath = window.location.pathname;
  // const patientId = locationPath.split('/')[3];
  const role = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
  const {t} = useTranslation(['patientDetails']);
  const dispatch = useAppDispatch();
  const [lendersList, setLendersList] = useState([]);
  const [aware, setAware] = useState(false);
  const [showMoreInfo, setshowMoreInfo] = useState(false);
  const [isSelfPayToFinance, setisSelfPayToFinance] = useState(false);
  const [selectedTab, setselectedTab] = useState(1);
  const [dataConsent, setdataConsent] = useState(false);
  const [dataConsentDate, setdataConsentDate] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataConsentModal, setshowDataConsentModal] = useState(false);
  const [showInitiationDateModal, setshowInitiationDateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showRebatePaidModal, setShowRebatePaidModal] = useState(false);
  const [doctor, setDoctor] = useState('');
  const [lender, setLender] = useState('');
  const [initiationDate, setInitiationDate] = useState('');
  const [reasonToChange, setReasonTochange] = useState('');
  const [reason, setReason] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [dateWarning, setDateWarning] = useState(false);
  const [isPauseTreatment, setIsPauseTreatment] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);
  const [scheduleTableData, setScheduleTableData] = useState([]);
  // const [drugScheduleData, setdrugScheduleData] = useState([]);
  const [comments, setComments] = useState('');
  const [openMarkAsPaid, setopenMarkAsPaid] = useState(false);
  const [markAsPaidCycle, setMarkAsPaidCycle] = useState(null);
  const [isRecieptUpload, setIsRecieptUpload] = useState(false);
  const [recieptUploadCycle, setRecieptUploadCycle] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [selectedFileToUpload, setSelectedFileToUpload] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const lenders = useAppSelector((state) => state.lenders.usersList);
  // const doctors = useAppSelector((state) => state.doctors.doctorsList);
  // console.log('DOCTORS=>', doctors);
  const {SET_SHOW_DOCUMENT} = actionTypes;

  const clinicalDropReasons = useAppSelector(
    (state) => state.template.masterData?.clinicalDropReasons
  );
  const nonClinicalDropReasons = useAppSelector(
    (state) => state.template.masterData?.nonClinicalDropReasons
  );
  const doctorChangeReasons = useAppSelector(
    (state) => state.template.masterData?.doctorChangeReasons
  );
  const [terminateReasons, setTerminateReasons] = useState([]);
  const [isClinicalTermination, setIsClinicalTermination] = useState(true);
  const [lenderHistoryTableData, setlenderHistoryTableData] = useState([]);
  const [treatmentBreakTableData, settreatmentBreakTableData] = useState([]);
  let errorMessage = 'Error Occured';
  const [assignLenderName, setAssignLenderName] = useState('');
  const [showLenderModal, setShowLenderModal] = useState(false);

  // console.log('lenderHistoryTableData=>', lenderHistoryTableData);
  const {
    currentLenderId,
    generalInformation,
    profileDTO,
    bankDetailDTO,
    financeDetailDTO,
    patientUploadedDocuments,
    grantPaymentDate,
    grantPaymentDay,
    grantPaymentWeek,
    paymentFrequency,
    deviceTokenActive,
    mangoAccountId,
    id,
    lenderHistory,
    presentDoctorId,
    treatment,
    vbcProgram,
    vbcSchedule,
    presentHospitalId: hospitalId,
    treatmentBreakHistory,
    treatmentPaused,
    treatmentTerminated,
    treatmentFinished,
    treatmentStarted,
    applicationApproved,
    applicationSubmitted,
    interactionText,
    paySubventionTo,
    payRebateTo,
    paymentSwitchButtonEnable,
    paymentSwitchButtonState,
    showSchedule,
    markTreatmentCompleteButton,
  } = useAppSelector((state) => state.mangoExecutive.patientDetails);

  const doctorsByHospitalIdList = useAppSelector(
    (state) => state.template.doctorList
  );

  const [medicationPriceEdit, setmedicationPriceEdit] = useState({
    1: false,
  });
  const [drugPurchaseDateEdit, setDrugPurchaseDatePriceEdit] = useState({
    1: false,
  });
  const [priceEditModal, setPriceEditModal] = useState(false);

  const [priceEntered, setpriceEntered] = useState('');
  const [drugPurchaseDate, setDrugPurchaseDate] = useState('');
  const pricePaidByPatientInitialState = {
    receiptAmount: '',
    actualPurchaseDate: '',
  };
  const [pricePaidByPatient, setpricePaidByPatient] = useState(
    pricePaidByPatientInitialState
  );
  const {actualPurchaseDate, receiptAmount} = pricePaidByPatient;
  const [selectedCyclePriceEdit, setselectedCyclePriceEdit] = useState(null);

  const cannotChangeTreatmentDate = treatmentFinished || treatmentTerminated;
  const nonFinancialPatient =
    vbcProgram?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY ||
    vbcProgram?.paymentTypeOpted === PAYMENT_FRAMEWORK.LOAN_AGAINST_OWN_FD ||
    vbcProgram?.convertedToFinance;

  const isConvertButtonAvaliable =
    vbcProgram?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY &&
    !treatmentTerminated &&
    treatmentStarted &&
    !treatmentFinished;

  const isShowLender =
    (vbcProgram?.paymentTypeOpted &&
      vbcProgram?.paymentTypeOpted !== PAYMENT_FRAMEWORK.SELF_PAY) ||
    paymentSwitchButtonState;

  const isShowLenderAdd =
    (!paymentSwitchButtonState && !applicationApproved) ||
    (paymentSwitchButtonState && lenderHistoryTableData.length === 0);

  /**
   * Function to scroll to top when ever page loads
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (paymentSwitchButtonState) setisSelfPayToFinance(true);
  }, [paymentSwitchButtonState]);

  // console.log('VBC PROGRAM=>', vbcProgram);
  // console.log('TREATMENT=>', treatment);
  // vbcProgram?.paymentTypeOpted

  // console.log('PRICE ENTERED=>', priceEntered, medicationPriceEdit);

  /**
   * This runs on Component Mounting, getting the values of the Patient details by triggering the API
   */
  useEffect(() => {
    if (patientId) {
      const onSuccess = () => {
        dispatch(setPatientId(patientId));
      };
      dispatch(getMangoPatientDetails(patientId, onSuccess));
      // dispatch(onSideBarRouteClicked('Patient Details'));
    }
    return () => {
      dispatch(resetPatientDetails());
    };
  }, []);

  /**
   * UseEffect to get all the doctors details whenever hospitalId State changes
   */
  useEffect(() => {
    if (hospitalId) {
      dispatch(getDoctorsByHospitalId(hospitalId));
    }
  }, [dispatch, hospitalId]);

  /**
   *  Set the doctor List based on values recievied form API
   */
  useEffect(() => {
    if (doctorsByHospitalIdList?.length > 0) {
      setDoctorsList(
        doctorsByHospitalIdList.map((doctor) => ({
          id: doctor.id,
          label: doctor.name,
          value: doctor.id,
        }))
      );
    }
  }, [doctorsByHospitalIdList]);

  // console.log('DOCTOR LIST=>', doctorsList);

  /**
   * This function triggers when presentDoctorId or currentLenderId states have value. They help set the respective states
   */
  useEffect(() => {
    if (presentDoctorId) {
      setDoctor(presentDoctorId);
    } else setDoctor('');
    if (currentLenderId) {
      setLender(currentLenderId);
    } else setLender('');
  }, [currentLenderId, presentDoctorId]);

  /**
   * treatment, priceEntered, medicationPriceEdit state that trigger the function, inital render is happened by the treatment data.
   */
  // useEffect(() => {
  //   if (treatment && treatment?.drugSchedule.length > 0) {
  //     const drugScheduleTableData = treatment?.drugSchedule.map(
  //       (item, index) => ({
  //         ...item,
  //         cycleDate: item.cycleDate
  //           ? format(new Date(item.cycleDate), DateFormat.DD_MM_YYYY_SLASH)
  //           : 'N/A',
  //         lenderGrantDate: item.lenderGrantDate
  //           ? format(
  //               new Date(item.lenderGrantDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )
  //           : 'N/A',
  //         grantInitiationDate: item.grantInitiationDate
  //           ? format(
  //               new Date(item.grantInitiationDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )
  //           : 'N/A',
  //         treatmentDate: item.treatmentDate
  //           ? format(new Date(item.treatmentDate), DateFormat.DD_MM_YYYY_SLASH)
  //           : 'N/A',
  //         receiptAmountDate: item.receiptAmountDate
  //           ? format(
  //               new Date(item.receiptAmountDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )
  //           : 'N/A',
  //         drugReceiptUploadDate: item.drugReceiptUploadDate
  //           ? `Uploaded on ${format(
  //               new Date(item.drugReceiptUploadDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )}`
  //           : 'N/A',
  //         mangoGrantPaidFlag:
  //           // index === 0
  //           //   ?
  //           item?.mangoGrantPaidFlag && item?.grantPaidDate ? (
  //             `Paid on ${format(
  //               new Date(item.grantPaidDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )}`
  //           ) : (
  //             <Can
  //               performingAction={{
  //                 component: 'admin-medication-schedule-list',
  //                 action: 'can view markPaidStatus',
  //               }}
  //               removeDiv={true}
  //               dataToShowWhenComponentNotRendered="N/A">
  //               {item?.grantInitiationDate ? (
  //                 <button
  //                   onClick={() => onMarkAsPaidClick(item)}
  //                   disabled={treatmentTerminated}
  //                   className={`btn-patient-theme ${
  //                     treatmentTerminated && 'disabled-button'
  //                   }`}>
  //                   {t('markAsPaid')}
  //                 </button>
  //               ) : (
  //                 'N/A'
  //               )}
  //             </Can>
  //           ),
  //         // : 'N/A',
  //         mangoGrantReceivedFlag:
  //           index === 0
  //             ? item?.mangoGrantReceivedFlag && item.grantReceivedDate
  //               ? `Received on ${format(
  //                   new Date(item.grantReceivedDate),
  //                   DateFormat.DD_MM_YYYY_SLASH
  //                 )}`
  //               : 'Pending'
  //             : 'N/A',
  //         download: item.drugReceiptId && (
  //           <Can
  //             performingAction={{
  //               component: 'admin-medication-schedule-list',
  //               action: 'can download drugReciept',
  //             }}
  //             dataToShowWhenComponentNotRendered="N/A">
  //             <button
  //               onClick={() => downloadDrugReceipt(item)}
  //               className="btn-patient-theme">
  //               {t('download')}
  //             </button>
  //           </Can>
  //         ),
  //         grantPaidDate: item.grantPaidDate
  //           ? `${format(
  //               new Date(item.grantPaidDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )}`
  //           : 'N/A',
  //         grantReceivedDate: item.grantReceivedDate
  //           ? `${format(
  //               new Date(item.grantReceivedDate),
  //               DateFormat.DD_MM_YYYY_SLASH
  //             )}`
  //           : 'N/A',
  //         cumulativeAmount: item?.cumulativeAmount ? (
  //           <div>
  //             {Symbols.INDIAN_RUPEE}
  //             {item?.cumulativeAmount.toFixed(2)}
  //           </div>
  //         ) : (
  //           'N/A'
  //         ),
  //         drugReceiptAmount: medicationPriceEdit[item?.cycleNo] ? (
  //           <>
  //             <div className="price-edit">
  //               <form onSubmit={(e) => onPriceSave(e, item)}>
  //                 <input
  //                   value={priceEntered}
  //                   type="text"
  //                   key="abc"
  //                   required
  //                   disabled={checkIfInputDisabled(item)}
  //                   onChange={(e) => onPriceEntered(e)}
  //                 />

  //                 <span onClick={() => onPriceEditCancel(item?.cycleNo)}>
  //                   <CancelIcon />
  //                 </span>
  //                 <span onClick={(e) => onPriceSave(e, item)}>
  //                   <SaveIcon />
  //                 </span>
  //               </form>
  //             </div>
  //           </>
  //         ) : item.drugReceiptId && item?.drugReceiptAmount ? (
  //           <>
  //             <div className="price-edit">
  //               <div>
  //                 {Symbols.INDIAN_RUPEE}
  //                 {item?.drugReceiptAmount ? item?.drugReceiptAmount : '0'}
  //               </div>
  //               <div>
  //                 <Can
  //                   performingAction={{
  //                     component: 'admin-medication-schedule-list',
  //                     action: 'can view editDetails',
  //                   }}>
  //                   <span
  //                     onClick={() =>
  //                       onPriceEdit(item?.cycleNo, item?.drugReceiptAmount)
  //                     }
  //                     className="editIcon">
  //                     <EditIcon />
  //                   </span>
  //                 </Can>
  //               </div>
  //             </div>
  //           </>
  //         ) : (
  //           item.drugReceiptId && (
  //             <Can
  //               performingAction={{
  //                 component: 'admin-medication-schedule-list',
  //                 action: 'can add pricePaidByPatient',
  //               }}
  //               dataToShowWhenComponentNotRendered="N/A">
  //               <button
  //                 onClick={() => onPriceAdd(item?.cycleNo)}
  //                 className="btn-patient-theme">
  //                 {t('Add')}
  //               </button>
  //             </Can>
  //           )
  //         ),
  //       })
  //     );

  //     setdrugScheduleData(drugScheduleTableData);
  //   }
  // }, [treatment, priceEntered, medicationPriceEdit]);

  /**
   * This function checks if the trigger grant is disabled based on the index, medication items, and
   * payment frequency.
   * @returns The function `isTriggerGrantDisabled` returns a boolean value (`true` or `false`).
   */
  const isTriggerGrantDisabled = (index, medicationItems, paymentFrequency) => {
    // Check this
    // if (!medicationItems[index]?.receiptAmountDate) return true;
    if (medicationItems[index]?.grantInitiationDate) return true;
    if (paySubventionTo === 'LENDER' && paymentFrequency !== 'PER_CYCLE')
      return true;

    if (index > 0) {
      const previousMedication = medicationItems[index - 1];
      const currentMedication = medicationItems[index];
      const isPrevPaymentTypeSelfPay =
        previousMedication?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY;
      if (isPrevPaymentTypeSelfPay && !currentMedication?.grantInitiationDate)
        return false;
      if (previousMedication?.grantInitiationDate) return false;
      else return true;
    }
    return false;
  };
  /**
   * The function checks if an upload button should be disabled based on the presence of a drug receipt
   * upload date in a medication item and the index of the item in an array.
   * @returns The function `isUploadButtonDisabled` returns a boolean value (`true` or `false`).
   */
  const isUploadButtonDisabled = (index, medicationItems) => {
    if (treatmentTerminated) return true;
    if (medicationItems[index]?.drugReceiptUploadDate) return true;
    if (index > 0) {
      const previousMedication = medicationItems[index - 1];
      if (previousMedication?.drugReceiptUploadDate) return false;
      else return true;
    }
    return false;
  };

  /**
   * The function triggers an email to grant access to a patient's details and updates the patient's
   * details upon successful email sending.
   * @returns The function `onSendGrantClick` is not returning anything explicitly. It is dispatching an
   * action `triggerGrantEmail` with `patientId`, `item.cycleNo`, and a callback function `onSuccess`.
   * When the action is successfully completed, it dispatches another action `getMangoPatientDetails`
   * with `patientId`.
   */
  const onSendGrantClick = (item) => {
    if (!patientId || !item.cycleNo) return;
    const onSuccess = () => {
      dispatch(getMangoPatientDetails(patientId));
    };
    dispatch(triggerGrantEmail(patientId, item.cycleNo, onSuccess));
  };

  /**
   * This function sets the state variables for receipt upload and the current cycle.
   */
  const handleClickUploadButton = (item) => {
    setIsRecieptUpload(true);
    setRecieptUploadCycle(item);
  };

  /**
   * The function `getGrantRecievedStatusValue` returns the status of a grant received based on certain
   * conditions.
   * @returns The function `getGrantRecievedStatusValue` returns a string value. The possible return
   * values are:
   * - If the condition `index === 0` and `item?.paymentTypeOpted ===
   * PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE` is true, then it checks if
   * `item?.mangoGrantReceivedFlag` is truthy and `item.grantReceived
   */
  const getGrantRecievedStatusValue = (item, index) => {
    if (
      index === 0 &&
      item?.paymentTypeOpted ===
        PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
    ) {
      if (item?.mangoGrantReceivedFlag && item.grantReceivedDate) {
        return `Received on ${format(
          new Date(item.grantReceivedDate),
          DateFormat.DD_MM_YYYY_SLASH
        )}`;
      } else return 'Pending';
    } else return 'N/A';
  };
  /**
   * Function to get the table data based on treatment, priceEntered, medicationPriceEdit state that trigger the function, inital render is happened by the treatment data.
   */
  const drugScheduleDataCallback = useCallback(() => {
    if (treatment && treatment?.drugSchedule.length > 0) {
      const drugScheduleTableData = treatment?.drugSchedule.map(
        (item, index, items) => ({
          ...item,
          cycleDate:
            item.cycleDate &&
            item?.paymentTypeOpted ===
              PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
              ? format(new Date(item.cycleDate), DateFormat.DD_MM_YYYY_SLASH)
              : 'N/A',
          paymentTypeOpted: PAYMENT_FRAMEWORK_VALUE[item?.paymentTypeOpted],
          lenderGrantDate:
            item.lenderGrantDate &&
            item?.paymentTypeOpted ===
              PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
              ? format(
                  new Date(item.lenderGrantDate),
                  DateFormat.DD_MM_YYYY_SLASH
                )
              : 'N/A',
          grantInitiationDate:
            item.grantInitiationDate &&
            item?.paymentTypeOpted ===
              PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE
              ? format(
                  new Date(item.grantInitiationDate),
                  DateFormat.DD_MM_YYYY_SLASH
                )
              : 'N/A',
          treatmentDate: item.treatmentDate
            ? format(new Date(item.treatmentDate), DateFormat.DD_MM_YYYY_SLASH)
            : 'N/A',
          receiptAmountDate: item.receiptAmountDate
            ? format(
                new Date(item.receiptAmountDate),
                DateFormat.DD_MM_YYYY_SLASH
              )
            : 'N/A',
          paidCycle: item.paidCycle ? t('paid') : t('free'),
          drugReceiptUploadDate: item.drugReceiptUploadDate ? (
            `Uploaded on ${format(
              new Date(item.drugReceiptUploadDate),
              DateFormat.DD_MM_YYYY_SLASH
            )}`
          ) : (
            <button
              type="button"
              onClick={() => handleClickUploadButton(item)}
              disabled={isUploadButtonDisabled(index, items)}
              className={`bg-admin btn-patient-theme-${
                item.drugReceiptUploadDate ? 'disabled' : 'grid '
              }`}>
              {t('documents:upload')}
            </button>
          ),
          mangoGrantPaidFlag:
            // index === 0
            //   ?
            item?.mangoGrantPaidFlag && item?.grantPaidDate ? (
              `Paid on ${format(
                new Date(item.grantPaidDate),
                DateFormat.DD_MM_YYYY_SLASH
              )}`
            ) : (
              <Can
                performingAction={{
                  component: 'admin-medication-schedule-list',
                  action: 'can view markPaidStatus',
                }}
                removeDiv={true}
                dataToShowWhenComponentNotRendered="N/A">
                {item?.grantInitiationDate ? (
                  <button
                    onClick={() => onMarkAsPaidClick(item)}
                    disabled={treatmentTerminated}
                    className={`btn-patient-theme ${
                      treatmentTerminated && 'disabled-button'
                    }`}>
                    {t('markAsPaid')}
                  </button>
                ) : (
                  'N/A'
                )}
              </Can>
            ),
          // : 'N/A',
          mangoGrantReceivedFlag: getGrantRecievedStatusValue(item, index),
          download: item.drugReceiptId && (
            <Can
              performingAction={{
                component: 'admin-medication-schedule-list',
                action: 'can download drugReciept',
              }}
              dataToShowWhenComponentNotRendered="N/A">
              <button
                onClick={() => downloadDrugReceipt(item)}
                className="btn-patient-theme bg-admin">
                {t('download')}
              </button>
            </Can>
          ),
          actualPurchaseDate: drugPurchaseDateEdit[item?.cycleNo] ? (
            <>
              <div className="price-edit">
                <form
                  onSubmit={(e) => onPriceSave(e, item, 'actualPurchaseDate')}
                  className="d-flex">
                  <input
                    value={drugPurchaseDate}
                    type="date"
                    key="abc"
                    max={item.receiptAmountDate}
                    required
                    disabled={checkIfInputDisabled(item)}
                    onChange={(e) => setDrugPurchaseDate(e.target.value)}
                  />
                  <div
                    className="save-button"
                    onClick={(e) => onPriceSave(e, item, 'actualPurchaseDate')}>
                    {/* <SaveIcon /> */}
                    <div className="tick-mark"></div>
                  </div>
                  <div
                    className="cancel-button"
                    onClick={() => onPriceEditCancel(item?.cycleNo)}>
                    {/* <CancelIcon /> */}
                    <div className="cross-mark"></div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            item.drugReceiptId && (
              <>
                <div className="price-edit">
                  <div>
                    {item.actualPurchaseDate
                      ? `${format(
                          new Date(item.actualPurchaseDate),
                          DateFormat.DD_MM_YYYY_SLASH
                        )}`
                      : 'N/A'}
                  </div>

                  {/* {item.actualPurchaseDate && ( */}
                  <div>
                    <Can
                      performingAction={{
                        component: 'admin-medication-schedule-list',
                        action: 'can view editDetails',
                      }}>
                      <span
                        onClick={() =>
                          onDateEdit(item?.cycleNo, item?.actualPurchaseDate)
                        }
                        className="editIcon">
                        <EditIcon />
                      </span>
                    </Can>
                  </div>
                  {/* )} */}
                </div>
              </>
            )
          ),
          grantPaidDate: item.grantPaidDate
            ? `${format(
                new Date(item.grantPaidDate),
                DateFormat.DD_MM_YYYY_SLASH
              )}`
            : 'N/A',
          grantReceivedDate: item.grantReceivedDate
            ? `${format(
                new Date(item.grantReceivedDate),
                DateFormat.DD_MM_YYYY_SLASH
              )}`
            : 'N/A',
          cumulativeAmount: item?.cumulativeAmount ? (
            <div>
              {Symbols.INDIAN_RUPEE}
              {item?.cumulativeAmount.toFixed(2)}
            </div>
          ) : (
            'N/A'
          ),
          triggerGrantEmail:
            item.paidCycle &&
            item.paymentTypeOpted ===
              PAYMENT_FRAMEWORK.LOAN_WITH_FINANCIAL_ASSISTANCE ? (
              <Can
                performingAction={{
                  component: 'admin-medication-schedule-list',
                  action: 'can download drugReciept',
                }}
                dataToShowWhenComponentNotRendered="N/A">
                <button
                  disabled={isTriggerGrantDisabled(
                    index,
                    items,
                    paymentFrequency
                  )}
                  onClick={() => onSendGrantClick(item)}
                  className="btn-patient-theme bg-admin">
                  {t('Send Grant')}
                </button>
              </Can>
            ) : (
              'N/A'
            ),
          // uploadAction: (
          //   <button
          //     type="button"
          //     onClick={() => handleClickUploadButton(item)}
          //     disabled={item.drugReceiptUploadDate}
          //     className={`bg-admin btn-patient-theme-${
          //       item.drugReceiptUploadDate ? 'disabled' : 'grid '
          //     }`}>
          //     {t('documents:upload')}
          //   </button>
          // ),
          drugReceiptAmount: medicationPriceEdit[item?.cycleNo] ? (
            <>
              <div className="price-edit">
                <form
                  onSubmit={(e) => onPriceSave(e, item, 'priceEntered')}
                  className="d-flex">
                  <input
                    value={priceEntered}
                    type="text"
                    key="abc"
                    required
                    disabled={checkIfInputDisabled(item)}
                    onChange={(e) => onPriceEntered(e)}
                  />
                  <div
                    className="save-button"
                    onClick={(e) => onPriceSave(e, item, 'priceEntered')}>
                    {/* <SaveIcon /> */}
                    <div className="tick-mark"></div>
                  </div>
                  <div
                    className="cancel-button"
                    onClick={() => onPriceEditCancel(item?.cycleNo)}>
                    {/* <CancelIcon /> */}
                    <div className="cross-mark"></div>
                  </div>
                </form>
              </div>
            </>
          ) : item.drugReceiptId &&
            (item?.drugReceiptAmount || item?.drugReceiptAmount === 0) ? (
            <>
              <div className="price-edit">
                <div>
                  {Symbols.INDIAN_RUPEE}
                  {item?.drugReceiptAmount ? item?.drugReceiptAmount : '0'}
                </div>
                <div>
                  <Can
                    performingAction={{
                      component: 'admin-medication-schedule-list',
                      action: 'can view editDetails',
                    }}>
                    <span
                      onClick={() =>
                        onPriceEdit(item?.cycleNo, item?.drugReceiptAmount)
                      }
                      className="editIcon">
                      <EditIcon />
                    </span>
                  </Can>
                </div>
              </div>
            </>
          ) : (
            item.drugReceiptId && (
              <Can
                performingAction={{
                  component: 'admin-medication-schedule-list',
                  action: 'can add pricePaidByPatient',
                }}
                dataToShowWhenComponentNotRendered="N/A">
                <button
                  onClick={() => onPriceAdd(item)}
                  className="btn-patient-theme bg-admin">
                  {t('Add')}
                </button>
              </Can>
            )
          ),
        })
      );
      return drugScheduleTableData;
      // setdrugScheduleData(drugScheduleTableData);
    }
  }, [
    treatment,
    priceEntered,
    drugPurchaseDate,
    medicationPriceEdit,
    paymentFrequency,
    drugPurchaseDateEdit,
  ]);

  // console.log('DRUG SCHEDULE DATE=>', drugScheduleData);

  /**
   * Checking if edit is enabled or not for ME to enter pricePaidByThePatient
   * @param {Object} item
   */
  const checkIfInputDisabled = (item) => {
    if (treatmentTerminated) {
      if (item?.drugReceiptUploadDate && !item?.drugReceiptAmount) return false;
      else return true;
    } else return false;
  };

  const onPriceEntered = (e) => {
    const value = e.target.value;
    const integerValue = parseFloat(value);
    if (!isNaN(integerValue)) setpriceEntered(integerValue);
    if (value === '') setpriceEntered(value);
  };

  /**
   * This triggers when we click on the cancel button when editing the pricePaid by patient
   * @param {Number} cycleNumber
   */
  const onPriceEditCancel = (cycleNumber) => {
    setpriceEntered('');
    setmedicationPriceEdit({
      ...medicationPriceEdit,
      [cycleNumber]: false,
    });
    setDrugPurchaseDatePriceEdit({
      ...medicationPriceEdit,
      [cycleNumber]: false,
    });
  };

  // console.log('MEDICATION PRICE EDIT=>', medicationPriceEdit);
  // console.log('DRUG PURCHASE DATE=>', drugPurchaseDate);
  /**
   * When the price is saved by the Mangoexecutive for the particular patient
   * API is triggered to save the Price Entered.
   * @param {*} e
   * @param {Object} drug
   */
  const onPriceSave = (e, drug, type) => {
    e.preventDefault();
    const customOnSuccess = () => {
      setmedicationPriceEdit({[drug?.cycleNo]: false});
      setDrugPurchaseDatePriceEdit({[drug?.cycleNo]: false});
    };
    if (type === 'priceEntered' && !priceEntered && drug.paidCycle)
      dispatch(
        setToast(ALERT_MESSAGE.RECIEPT_AMOUNT_NOT_ZERO, true, 'warning')
      );
    else if (type === 'actualPurchaseDate' && !drugPurchaseDate)
      dispatch(setToast(ALERT_MESSAGE.PURCHASE_DATE_NOT_NULL, true, 'warning'));
    else
      dispatch(
        addDrugReceiptAmount(
          drug?.drugReceiptId,
          patientId,
          type === 'priceEntered'
            ? parseInt(priceEntered)
            : drug?.drugReceiptAmount,
          type === 'actualPurchaseDate'
            ? drugPurchaseDate
            : drug?.actualPurchaseDate,
          customOnSuccess
        )
      );
    // onPriceEditCancel(item?.cycleNo);
  };

  const onPricePaidByPatientEdit = (e) => {
    setpricePaidByPatient({
      ...pricePaidByPatient,
      [e.target.name]: e.target.value,
    });
  };
  const onPricePaidByPatientSave = (e, cycleDetails) => {
    e.preventDefault();
    if (!parseInt(receiptAmount) && cycleDetails.paidCycle) {
      dispatch(
        setToast(ALERT_MESSAGE.RECIEPT_AMOUNT_NOT_ZERO, true, 'warning')
      );
      return;
    }

    const customOnSuccess = () => {
      // setmedicationPriceEdit({[drug?.cycleNo]: false});
      setPriceEditModal(false);
    };
    if (
      cycleDetails &&
      cycleDetails?.drugReceiptId &&
      actualPurchaseDate &&
      receiptAmount
    )
      dispatch(
        addDrugReceiptAmount(
          cycleDetails?.drugReceiptId,
          patientId,
          parseInt(receiptAmount),
          actualPurchaseDate,
          customOnSuccess
        )
      );
  };

  /**
   * Function is called when the price edit button is clicked for editing Patient Medication price
   * cycleNumber helps in deciding which input to be opened to edit
   * @param {Number} cycleNumber
   * @param {Number} prevPrice
   */
  const onPriceEdit = (cycleNumber, prevPrice) => {
    // console.log('PRICE EDIT=>', cycleNumber);
    setmedicationPriceEdit({[cycleNumber]: true});
    setpriceEntered(prevPrice);
  };
  const onDateEdit = (cycleNumber, prevDate) => {
    // console.log('PRICE EDIT=>', cycleNumber);
    setDrugPurchaseDatePriceEdit({[cycleNumber]: true});
    setDrugPurchaseDate(prevDate);
  };

  /**
   * Function triggred when the price added for the first time
   * @param {Number} cycleNumber
   */

  const onPriceAdd = (cycleDetails) => {
    setPriceEditModal(true);
    setselectedCyclePriceEdit(cycleDetails);
    setpricePaidByPatient(pricePaidByPatientInitialState);
    // setmedicationPriceEdit({[cycleNumber]: true});
  };

  /**
   * Function to load schedule data on component load
   */
  useEffect(() => {
    if (vbcSchedule.length) {
      setScheduleTableData(
        vbcSchedule.map((item) => ({
          ...item,
          marketPrice: `${Symbols.INDIAN_RUPEE} ${item.marketPrice}`,
          cumulativeAmount: `${Symbols.INDIAN_RUPEE} ${item.cumulativeAmount}`,
          payout: `${Symbols.INDIAN_RUPEE} ${item.payout}`,
        }))
      );
    }
  }, [vbcSchedule]);

  /**
   * FUnction to load lenders
   */
  useEffect(() => {
    if (!lenders) {
      dispatch(readLenders(0, 1000));
    } else {
      setLendersList(
        lenders.map((lender) => ({
          id: lender.lenderId,
          label: lender.lenderName,
          value: lender.lenderId,
        }))
      );
    }
  }, [dispatch, lenders]);
  /**
   * Function to load list of doctors
   */
  // useEffect(() => {
  //   if (!doctors) {
  //     dispatch(readDoctors(0, 1000));
  //   } else {
  //     setDoctorsList(
  //       doctors.map((doctor) => ({
  //         id: doctor.id,
  //         label: `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`,
  //         value: doctor.mangoAccountId,
  //       }))
  //     );
  //   }
  // }, [dispatch, doctors]);

  /**
   * Function to load general information of user
   */
  useEffect(() => {
    if (generalInformation) {
      setAware(generalInformation.aware);
      setIsDisabled(generalInformation.aware);
      setComments(generalInformation?.interactionText);
      setInitiationDate(
        generalInformation.treatmentStartDate
          ? generalInformation.treatmentStartDate
          : ''
      );
      setdataConsent(generalInformation?.dataConsentDate ? true : false);
      setdataConsentDate(generalInformation?.dataConsentDate);
    }
    if (interactionText) setComments(interactionText);
    else setComments('');
  }, [generalInformation, interactionText]);

  /**
   * Function to load lender history
   */
  useEffect(() => {
    if (lenderHistory && lenderHistory.length > 0) {
      const data = lenderHistory.map((item) => {
        const {lenderLoanApplicationId, status} = item;
        const patientId = id;
        return {
          ...item,
          applicationSubmitDate: format(
            new Date(item?.applicationSubmitDate),
            DateFormat.DD_MM_YYYY_DASH
          ),
          actionButton:
            status === 'In progress' ? (
              <>
                <button
                  onClick={() =>
                    dispatch(
                      approveLoanForPatient({
                        lenderLoanApplicationId,
                        patientId,
                      })
                    )
                  }
                  className="btn-patient-theme bg-admin">
                  {t('approve')}
                </button>{' '}
                {!paymentSwitchButtonState && (
                  <button
                    onClick={() =>
                      dispatch(
                        rejectLoanForPatient({
                          lenderLoanApplicationId,
                          patientId,
                        })
                      )
                    }
                    className="btn-patient-theme bg-admin">
                    {t('reject')}
                  </button>
                )}
              </>
            ) : (
              'N/A'
            ),
        };
      });
      setlenderHistoryTableData(data);
    } else setlenderHistoryTableData([]);
  }, [lenderHistory, paymentSwitchButtonState]);

  /**
   * Function to load treatment break history state
   */
  useEffect(() => {
    if (treatmentBreakHistory && treatmentBreakHistory.length > 0) {
      const data = treatmentBreakHistory.map((item) => {
        let restartDate;
        if (item.eventType === 'Paused') restartDate = 'N/A';
        else
          restartDate = format(
            new Date(item?.restartDate),
            DateFormat.DD_MM_YYYY_SLASH
          );
        return {
          ...item,
          dateCreated: format(
            new Date(item?.dateCreated),
            DateFormat.DD_MM_YYYY_SLASH
          ),
          restartDate: restartDate,
        };
      });
      settreatmentBreakTableData(data);
    } else if (treatmentBreakHistory && treatmentBreakHistory.length === 0)
      settreatmentBreakTableData([]);
  }, [treatmentBreakHistory]);

  // console.log('TREATMENT BREAK=>', treatmentBreakTableData);

  /**
   *Function to download the drug reciept
   * @param {Object} item
   */
  const downloadDrugReceipt = (item) => {
    // console.log("DRUG item=>", item);
    // console.log("ITEM=>", item);
    // const fileData = documentList.find((e) => e.id === cycleNo);
    const fileData = item?.drugReceiptName
      ? item.drugReceiptName
      : 'drugReceipt';
    const onSuccess = (response) => {
      // console.log('RESPONSE=>',response)
      downloadFile(response, fileData);
      return {
        type: SET_SHOW_DOCUMENT,
        payload: response,
      };
    };
    dispatch(downloadDocument(item.drugReceiptId, onSuccess));
  };

  /**
   * Function to make the cycle paid status by Finance team
   * @param {Object} item
   */
  const onMarkAsPaidClick = (item) => {
    setMarkAsPaidCycle(item);
    setopenMarkAsPaid(true);
  };

  /**
   * This function marks a grant as paid for a specific patient and cycle number, and updates the patient
   * details.
   */
  const onConfirmMarkAsPaid = () => {
    // console.log('ON CONFIRM CLICK=>', markAsPaidCycle);
    if (markAsPaidCycle) {
      const reqData = {
        patientId,
        cycleNo: markAsPaidCycle?.cycleNo,
      };
      const customOnSuccess = () => {
        dispatch(getMangoPatientDetails(patientId));
      };
      dispatch(markGrantPaid(reqData, customOnSuccess));
    }
  };

  /**
   * The function marks a rebate as paid for a specific patient and updates their details.
   */
  const onConfirmRebatePaid = () => {
    if (patientId) {
      const customOnSuccess = () => {
        dispatch(getMangoPatientDetails(patientId));
      };
      dispatch(markRebatePaid(patientId, customOnSuccess));
    }
  };

  /**
   * Set Terminate Reason state to null everytime component loads
   */
  useEffect(() => {
    setTerminateReasons(clinicalDropReasons);
  }, []);

  /**
   * Function trigerred when
   */
  const handleChangePatientAware = () => {
    if (!isDisabled) {
      setShowConfirmModal(true);
    }
  };
  /**
   * Function triggred when Aware state is confirmed
   */
  const handleClickAwareYes = () => {
    const data = {
      aware: true,
      patientId: id,
    };
    const onSuccess = () => {
      dispatch(getMangoPatientDetails(patientId));
      handleConfirmModalClose();
    };
    dispatch(updatePatientStatusToAware(data, onSuccess));
  };
  /**
   * Function to open lender confirm modal
   * @param {String} lenderName
   */
  const assignLenderConfirmModal = (lenderName) => {
    if (lender && lenderName) {
      setShowLenderModal(true);
      setAssignLenderName(lenderName);
    } else if (!applicationSubmitted)
      dispatch(
        setToast(
          ALERT_MESSAGE.PATIENT_NOT_SUBMITTED_APPLICATION,
          true,
          'warning'
        )
      );
    else dispatch(setToast(ALERT_MESSAGE.SELECT_LENDER, true, 'warning'));
  };
  /**
   * Function called when lender is assigm=nme
   * @param {Number} lenderId
   */
  const handleClickAssignLender = (lenderId) => {
    const data = {
      lenderId: parseInt(lenderId),
      patientId: id,
    };
    const onSuccess = () => {
      dispatch(getMangoPatientDetails(patientId));
    };
    if (applicationSubmitted) dispatch(assignLenderToPatient(data, onSuccess));
    else
      dispatch(
        setToast(
          ALERT_MESSAGE.PATIENT_NOT_SUBMITTED_APPLICATION,
          true,
          'warning'
        )
      );
  };
  /**
   * Function called when doctor is assigned
   * @param {Number} doctorId
   *
   */

  const handleClickAssignDoctor = (doctorId) => {
    if (doctorId.toString() === presentDoctorId.toString()) {
      dispatch(setToast(ALERT_MESSAGE.SAME_DOCTOR, true, 'warning'));
      return;
    }
    if (!reasonToChange) {
      dispatch(setToast(ALERT_MESSAGE.SELECT_REASON, true, 'warning'));
      return;
    }
    if (!doctorId) {
      dispatch(setToast(ALERT_MESSAGE.SELECT_DOCTOR, true, 'warning'));
      return;
    }
    const data = {
      remarks: reasonToChange,
      doctorId: parseInt(doctorId),
      patientId: id,
    };
    const onSuccess = () => {
      /**
       * Checking if role is doctor then we will not trigger getMangoPatientDetails API, instead routing to patient list page
       */
      if (role === ROLES.DOCTOR) goBack && goBack();
      else dispatch(getMangoPatientDetails(patientId));
    };
    dispatch(assignDoctorToPatient(data, onSuccess));
  };

  /** Function to restart the treatment */
  const handleClickAppointmentDate = (e) => {
    e.preventDefault();
    if (dateWarning) return;
    const data = {
      treatmentRestartDate: appointmentDate,
      patientId: id,
    };
    const onSuccess = () => {
      handleModalClose();
      dispatch(getMangoPatientDetails(id));
      setAppointmentDate('');
    };
    if (checkTreatmentStatus('RESTART'))
      dispatch(editTreatmentForPatient('RESTART', data, onSuccess));
  };
  /**
   * Function called when terminate treatment modal box is subimitted
   * @param {*} e
   */
  const handleSubmitTreatment = (e) => {
    e.preventDefault();
    const action = isPauseTreatment ? 'PAUSE' : 'TERMINATE';
    const data = isPauseTreatment
      ? {
          patientId: patientId,
          remarks: reason,
        }
      : {
          patientId,
          reasonId: reason,
          reasonType: isClinicalTermination ? 'CLINICAL' : 'NON_CLINICAL',
        };
    const onSuccess = () => {
      handleTreatmentModalClose();
      dispatch(getMangoPatientDetails(id));
      setReason('');
    };
    if (checkTreatmentStatus(action)) {
      if (action === 'TERMINATE' && !data.reasonId)
        dispatch(setToast(ALERT_MESSAGE.PLEASE_SELECT_REASON, true, 'warning'));
      else dispatch(editTreatmentForPatient(action, data, onSuccess));
    }
  };
  /**
   * Function called when the initiation date is submitted, api call is performed
   * @param {*} e
   */

  /**
   * Function called when complete treatment modal box is Completed
   * @param {*} e
   */
  const handleCompleteTreatment = (e) => {
    e.preventDefault();
    const action = 'COMPLETE';
    const data = {
      patientId: patientId,
    };
    const onSuccess = () => {
      handleCompleteModalClose();
      dispatch(getMangoPatientDetails(id));
    };

    dispatch(editTreatmentForPatient(action, data, onSuccess));
  };
  const handleSubmitInitiationDate = () => {
    const data = {
      treatmentStartDate: initiationDate,
      patientId: patientId,
    };
    const onSuccess = () => {
      dispatch(getMangoPatientDetails(patientId));
    };
    if (applicationSubmitted)
      dispatch(assignTreatmentInitiationDateToPatient(data, onSuccess));
    else
      dispatch(
        setToast(
          ALERT_MESSAGE.PATIENT_NOT_SUBMITTED_APPLICATION,
          true,
          'warning'
        )
      );
  };
  /**
   * This function will be triggred when content date is saved
   * @param {*} e
   */
  const handledataConsentDate = () => {
    const data = {
      dataConsentDate: dataConsentDate,
      patientId: patientId,
    };
    // console.log('REQ DATA=>', data);
    const onSuccess = () => {
      dispatch(getMangoPatientDetails(patientId));
    };
    if (dataConsentDate) {
      dispatch(updateDataConsentDate(data, onSuccess));
    }
  };
  /**
   * Function to open the Modal on click of save button on treatment Inititation
   * @param {*} e
   */
  const onSaveInitiationDate = (e) => {
    e.preventDefault();
    setshowInitiationDateModal(true);
  };
  /**
   * Function to open the Modal on click of save button on Data Consent Date
   * @param {*} e
   */
  const onSaveDataConsent = (e) => {
    e.preventDefault();
    setshowDataConsentModal(true);
  };

  const handlePriceEditModalClose = () => {
    setPriceEditModal(false);
    setpricePaidByPatient(pricePaidByPatientInitialState);
  };

  /**
   * It closes the modal which opened to restart treatment
   */
  const handleModalClose = () => {
    setShowModal(false);
  };
  /**
   * It closes the modla which opened to mark the aware status
   */
  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };
  /**
   * Close the modal which opened to pause/terminate the treatement
   */
  const handleTreatmentModalClose = () => {
    setShowTreatmentModal(false);
  };
  /**
   * Close the modal which opened to mark the cycle as Paid
   */
  const handleMarkAsPaidModal = () => {
    setopenMarkAsPaid(false);
  };
  /**
   * Close the modal which opened to save data consent date confirmation
   */
  const closeDataConsentModal = () => {
    setshowDataConsentModal(false);
  };
  /**
   * Close the modal which opened to save the intiation date confirmation
   */
  const closeInitiationDateModal = () => {
    setshowInitiationDateModal(false);
  };
  /**
   * Close the modal which opened to assign lender
   */

  /**
   * Close the modal which opened to complete the treatement
   */
  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
  };
  const handleAssignLenderClose = () => {
    setShowLenderModal(false);
    setAssignLenderName('');
    setLender('');
  };
  const handleRebatePaidModalClose = () => {
    setShowRebatePaidModal(false);
  };
  const handleDrugRecieptCloseModal = () => {
    setIsRecieptUpload(false);
    setRecieptUploadCycle(null);
    setIsInvalid(false);
    setFileName('');
    setSelectedFileToUpload(null);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFileToUpload) {
      const file = new FormData();
      file.append('file', selectedFileToUpload);
      file.append('cycleNo', recieptUploadCycle.cycleNo);
      file.append('patientMangoAccountId', mangoAccountId);
      file.append('documentType', 'Drug Receipt');

      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        handleDrugRecieptCloseModal();
        dispatch(getMangoPatientDetails(patientId));
      };
      dispatch(uploadDocumentForPatientByMe(file, onSuccess));
    }
  };
  const handleDocumentChange = (event) => {
    const file = event.target.files[0];
    const sizeValidation = fileSizeValidator(15, file.size);
    const fileValidation = fileTypeValidator(file.type);
    if (sizeValidation || fileValidation) {
      dispatch(setToast(ALERT_MESSAGE.FILE_UPLOAD_ERROR, true, 'warning'));
      return setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    setFileName(event.target.files[0].name);
    setSelectedFileToUpload(event.target.files[0]);
  };
  /**
   * Validates the date
   * @param {String} value
   * @returns {Boolean}
   */
  const onAppointmentDateChange = (value) => {
    setAppointmentDate(value);

    setDateWarning(
      dateValidator(
        value,
        VALIDATE_DATE_TYPE.RESTRICT_PAST_DATE_EXCLUDING_CURRENT
      )
    );
  };

  // console.log('IS ASSURED=>', isAssured);

  /**
   * This function take the different type and  returns true/false based on the condition of the treatment status
   * @param {String} type
   * @returns {Boolean}
   */
  const checkTreatmentStatus = (type) => {
    if (type === 'PAUSE' && treatmentPaused) {
      errorMessage = ALERT_MESSAGE.TREATEMENT_ALREADY_PAUSED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'PAUSE' && !treatmentStarted) {
      errorMessage = ALERT_MESSAGE.TREATMENT_NOT_STARTED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'PAUSE' && treatmentFinished) {
      errorMessage = ALERT_MESSAGE.TREATMENT_COMPLETED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'PAUSE' && treatmentTerminated) {
      errorMessage = ALERT_MESSAGE.TREATMENT_TERMINATED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'RESTART' && !treatmentPaused) {
      errorMessage = ALERT_MESSAGE.TREATMENT_NOT_PAUSED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'TERMINATE' && !treatmentStarted) {
      errorMessage = ALERT_MESSAGE.TREATMENT_NOT_STARTED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (type === 'TERMINATE' && treatmentTerminated) {
      errorMessage = ALERT_MESSAGE.TREATMENT_TERMINATED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else if (
      (type === 'PAUSE' || type === 'RESTART') &&
      (treatmentTerminated || treatmentFinished)
    ) {
      errorMessage = ALERT_MESSAGE.TREATMENT_COMPLETED_TERMINATED;
      dispatch(setToast(errorMessage, true, 'warning'));
      return false;
    } else return true;
  };

  /**
   * Function triggred when the comment is saved, api is called to save the comment
   */
  const onCommentSubmit = () => {
    if (comments) {
      dispatch(
        updatePatientInteractionNotes({interactionText: comments, patientId})
      );
    }
  };

  // console.log('PATIENT ID=>', patientId);
  /**
   * On Data consent date change
   * @param {*} e
   */
  const onDataConsentDateChange = (e) => {
    const value = e.target.value;
    setdataConsentDate(value);
    if (dateValidator(value, VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE)) {
      dispatch(
        setToast(ALERT_MESSAGE.DATE_CANNOT_BE_IN_FUTURE, true, 'warning')
      );
      setDateWarning(true);
    } else setDateWarning(false);
  };

  /**
   * Function to open the addational information in ME
   */
  const onShowMoreInfoClick = () => {
    setshowMoreInfo(!showMoreInfo);
    setselectedTab(1);
  };

  /**
   * The function toggles the value of a boolean state variable.
   */
  const onSelfPayToFinanceConvert = () => {
    setisSelfPayToFinance(!isSelfPayToFinance);
  };

  return (
    <React.Fragment>
      <CustomModal
        Show={isRecieptUpload}
        title={'Upload Drug Receipt'}
        handleClose={handleDrugRecieptCloseModal}>
        <div className="mt-4">
          <Form className="p-4 pt-0 document-form" onSubmit={handleUpload}>
            <Row className="mb-3">
              <Col className="p-0 m-0">
                <Form.Label>{t('documents:selectFile')}</Form.Label>
                <div className="upload ">
                  <input
                    type="file"
                    id="doc"
                    className="d-none"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleDocumentChange(e)}
                  />
                  <div className="input-box p-1 ps-2">
                    {fileName
                      ? `Chosen File : ${fileName}`
                      : 'Please Select a File'}
                  </div>
                  <label htmlFor="doc" className="browse">
                    {t('documents:browse')}
                  </label>
                </div>
              </Col>
              {isInvalid && (
                <p className="text-danger p-0 m-0 mt-2">
                  File size exceed&apos;s the limit
                </p>
              )}
            </Row>
            <Row className="border-bottom mb-3">
              <p>{t('documents:note')}</p>
            </Row>
            <Row>
              <Col className="d-flex flex-row m-0 p-0 mt-2 justify-content-center">
                <button
                  onClick={handleDrugRecieptCloseModal}
                  type="button"
                  className="btn-patient-theme bg-dark px-4">
                  {t('documents:cancel')}
                </button>
                <button
                  className=" btn-patient-theme fw-normal ms-2 px-4 bg-admin"
                  type="submit"
                  disabled={!selectedFileToUpload}>
                  {t('documents:upload')}
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </CustomModal>
      <CustomModal
        Show={showRebatePaidModal}
        title={''}
        handleClose={handleRebatePaidModalClose}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={t('confirmRebatePaid')}
        onConfirmDelete={onConfirmRebatePaid}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={priceEditModal}
        title="Enter drug purchase amount & date"
        handleClose={handlePriceEditModalClose}
        cssClass="treatment-modal confirm-modal"
        closeButton={true}>
        <form
          className="p-5"
          onSubmit={(e) => onPricePaidByPatientSave(e, selectedCyclePriceEdit)}>
          <div className="d-flex flex-column">
            <div className="title text-center mb-3">
              Enter drug purchase amount & date
            </div>

            <Card className="border-0">
              <Card.Body className="p-0">
                <InputForm
                  label={t('Amount')}
                  type="text"
                  isView={false}
                  ipValue={receiptAmount}
                  required={true}
                  name="receiptAmount"
                  onChange={onPricePaidByPatientEdit}
                />
              </Card.Body>
            </Card>
            <Card className="border-0">
              <Card.Body className="p-0">
                <InputForm
                  label={t('Date')}
                  type="date"
                  isView={false}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  required={true}
                  ipValue={actualPurchaseDate}
                  name="actualPurchaseDate"
                  onChange={onPricePaidByPatientEdit}
                />
              </Card.Body>
            </Card>
            <div className="d-flex flex-row justify-content-between mt-4">
              <button
                onClick={handlePriceEditModalClose}
                type="button"
                className="btn-patient-theme bg-dark w-100">
                {t('cancel')}
              </button>
              <button
                className="btn-patient-theme bg-admin w-100 ms-2"
                type="submit">
                {t('save')}
              </button>
            </div>
          </div>
        </form>
      </CustomModal>
      <CustomModal
        Show={openMarkAsPaid}
        title={''}
        handleClose={handleMarkAsPaidModal}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          openMarkAsPaid &&
          markAsPaidCycle &&
          dynamicMessageCreation(t('markAsPaidConfirmMessage'), [
            markAsPaidCycle?.cycleNo,
          ])
        }
        onConfirmDelete={onConfirmMarkAsPaid}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={showLenderModal}
        title={''}
        handleClose={handleAssignLenderClose}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          assignLenderName &&
          assignLenderName &&
          dynamicMessageCreation(t('assignLenderConfirm'), [assignLenderName])
        }
        onConfirmDelete={() => handleClickAssignLender(lender)}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={showDataConsentModal}
        title={''}
        handleClose={closeDataConsentModal}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          dataConsentDate &&
          dynamicMessageCreation(t('pleaseConfirmDataConfirmDate'), [
            format(new Date(dataConsentDate), DateFormat.DD_MM_YYYY_DASH),
          ])
        }
        onConfirmDelete={handledataConsentDate}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={showInitiationDateModal}
        title={''}
        handleClose={closeInitiationDateModal}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          initiationDate &&
          dynamicMessageCreation(t('pleaseConfirmInitiationDate'), [
            format(new Date(initiationDate), DateFormat.DD_MM_YYYY_DASH),
          ])
        }
        onConfirmDelete={handleSubmitInitiationDate}>
        <div></div>
      </CustomModal>
      <CustomModal
        cssClass="treatment-modal confirm-modal"
        Show={showModal}
        handleClose={handleModalClose}>
        <h6 className="text-muted text-center p-0 m-0 mt-4 mb-4">
          Select date of restart
        </h6>
        <Form onSubmit={handleClickAppointmentDate} className="p-4 pt-2 px-6">
          <span className="close" onClick={handleModalClose} />
          <Form.Group>
            <Form.Control
              required
              isInvalid={dateWarning}
              value={appointmentDate}
              onChange={(e) => onAppointmentDateChange(e.target.value)}
              type="date"
            />

            {dateWarning && (
              <Form.Control.Feedback type="invalid">
                {t('appointmentDateWarning')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Can
            performingAction={{
              component: 'treatment-list',
              action: 'can view pauseRestartWarningNote',
            }}
            removeDiv={true}>
            <div className="mt-2">Note:-{t('previousCycleRecieptPaid')}</div>
          </Can>
          {/* <FormGroup className="mt-4 mb-4 termination-form">
            <Form.Check
              type="radio"
              name="assure"
              selected={!isAssured}
              onChange={() => {
                setisAssured(true);
              }}
              label={t('previousCycleRecieptPaid')}
            />
          </FormGroup> */}
          <div className="d-flex flex-row justify-content-between mt-4">
            <button
              onClick={handleModalClose}
              className="btn-patient-theme bg-dark w-100">
              {t('cancel')}
            </button>
            <button className="btn-patient-theme bg-admin w-100 ms-2">
              {t('save')}
            </button>
          </div>
        </Form>
      </CustomModal>
      <CustomModal
        cssClass="treatment-modal confirm-modal"
        Show={showTreatmentModal}
        handleClose={handleTreatmentModalClose}>
        <div className="">
          <h6 className="text-muted text-center p-0 m-0 mt-4 mb-4">
            {isPauseTreatment
              ? t('selectPauseDateAndReason')
              : t('selectReasonForTerminateTheTreatment')}
          </h6>
          <Form
            onSubmit={handleSubmitTreatment}
            className="p-lg-4 pt-lg-0 px-lg-6">
            <span className="close" onClick={handleTreatmentModalClose} />
            {isPauseTreatment ? (
              <>
                <Form.Group>
                  <Form.Control
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="input-primary mt-3"
                    placeholder="Enter Reason"
                  />
                </Form.Group>
                <Can
                  performingAction={{
                    component: 'treatment-list',
                    action: 'can view pauseRestartWarningNote',
                  }}
                  removeDiv={true}>
                  <div className="mt-2">
                    Note:-{t('previousCycleRecieptPaid')}
                  </div>
                </Can>
                {/* <FormGroup className="mt-4 mb-4 termination-form">
                  <Form.Check
                    type="radio"
                    name="assure"
                    selected={!isAssured}
                    onChange={() => {
                      setisAssured(true);
                    }}
                    label={t('previousCycleRecieptPaid')}
                  />
                </FormGroup> */}
              </>
            ) : (
              <>
                <FormGroup className="mt-4 mb-4 termination-form">
                  <Form.Check
                    type="radio"
                    name="clinical-dropdown"
                    selected={isClinicalTermination}
                    onChange={() => {
                      setTerminateReasons(clinicalDropReasons);
                      setIsClinicalTermination(true);
                      setReason('1');
                    }}
                    label="Clinical Dropout"
                  />
                </FormGroup>
                <FormGroup className="mt-4 mb-4 termination-form">
                  <Form.Check
                    type="radio"
                    name="clinical-dropdown"
                    selected={!isClinicalTermination}
                    onChange={() => {
                      setTerminateReasons(nonClinicalDropReasons);
                      setIsClinicalTermination(false);
                      setReason('5');
                    }}
                    label="Non-Clinical Dropout"
                  />
                </FormGroup>
                <FormGroup className="mt-4 mb-4">
                  <Form.Select
                    required
                    value={reason}
                    type="select"
                    onChange={(e) => setReason(e.target.value)}
                    className="correct-form"
                    placeholder="Enter Reason">
                    {terminateReasons.map((reason) => (
                      <option value={reason.id} key={reason.id}>
                        {reason.name}
                      </option>
                    ))}
                  </Form.Select>
                </FormGroup>
              </>
            )}

            <div className="d-flex flex-row justify-content-between mt-4">
              <button
                onClick={handleTreatmentModalClose}
                type="button"
                className="btn-patient-theme bg-dark w-100">
                {t('cancel')}
              </button>
              <button
                className="btn-patient-theme bg-admin w-100 ms-2"
                type="submit">
                {t('save')}
              </button>
            </div>
          </Form>
        </div>
      </CustomModal>
      <CustomModal
        cssClass="treatment-modal confirm-modal"
        Show={showCompleteModal}
        handleClose={handleCompleteModalClose}>
        <div className="">
          <h6 className="text-muted text-center p-0 m-0 mt-4 mb-4">
            {t('selectCompleteTreatment')}
          </h6>
          <Form
            onSubmit={handleCompleteTreatment}
            className="p-lg-4 pt-lg-0 px-lg-6">
            <span className="close" onClick={handleCompleteModalClose} />

            <div className="d-flex flex-row justify-content-between mt-4">
              <button
                onClick={handleCompleteModalClose}
                type="button"
                className="btn-patient-theme bg-dark w-100">
                {t('no')}
              </button>
              <button
                className="btn-patient-theme bg-admin w-100 ms-2"
                type="submit">
                {t('yes')}
              </button>
            </div>
          </Form>
        </div>
      </CustomModal>
      <CustomModal
        cssClass="confirm-modal"
        Show={showConfirmModal}
        handleClose={handleConfirmModalClose}>
        <div className="p-4 px-5">
          <span className="close" onClick={handleConfirmModalClose} />
          <div className="d-flex justify-content-center">
            <h6>{t('areYouSure-aware')}</h6>
          </div>
          <div className="d-flex flex-row justify-content-between mt-4">
            <button
              onClick={handleConfirmModalClose}
              className="btn-patient-theme bg-dark w-100">
              {t('cancel')}
            </button>
            <button
              onClick={handleClickAwareYes}
              className="btn-patient-theme bg-admin w-100 ms-2">
              {t('confirm')}
            </button>
          </div>
        </div>
      </CustomModal>
      <div className="patient-details-container">
        <Can
          performingAction={{
            component: 'patient-general-information',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item p-4 pb-2 mt-4">
            <div className="d-flex align-items-center flex-row title">
              <span className="m-0">{t('generalInformation')}</span>
            </div>
            <div>
              <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
                {generalInformation && (
                  <>
                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view patientId',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <LabelValue
                          label={t('patientId')}
                          value={generalInformation?.uniqueId}
                        />
                      </Col>
                    </Can>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('patientName')}
                        value={
                          generalInformation?.fullName?.includes(' ') &&
                          generalInformation?.fullName?.split(' ')[0] +
                            ' ' +
                            generalInformation?.fullName
                              ?.split(' ')
                              ?.reverse()[0]
                        }
                      />
                    </Col>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('hospitalGroup')}
                        value={generalInformation.hospitalGroupName}
                      />
                    </Col>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('hospitalUnit')}
                        value={generalInformation.hospitalUnitName}
                      />
                    </Col>

                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('condition')}
                        value={generalInformation.diagnosis}
                      />
                    </Col>

                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('drug')}
                        value={generalInformation.drugName}
                      />
                    </Col>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('doctorName')}
                        value={generalInformation.doctorName}
                      />
                    </Col>
                    <Can
                      performingAction={{
                        component: 'treatment-initiation',
                        action: 'can view details',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <Form
                          onSubmit={onSaveInitiationDate}
                          className="d-flex flex-row">
                          <Form.Group>
                            <Form.Label className="p-0 m-0 text-pure-black">
                              Treatment Initiation :
                            </Form.Label>
                            <div className="d-flex flex-row input-small">
                              <Form.Control
                                required
                                type="date"
                                className="h-100 p-2"
                                disabled={cannotChangeTreatmentDate}
                                value={initiationDate}
                                onChange={(e) =>
                                  setInitiationDate(e.target.value)
                                }
                              />
                              <Can
                                performingAction={{
                                  component: 'treatment-initiation',
                                  action: 'can change treatmentInitiation',
                                }}
                                removeDiv={true}>
                                {!cannotChangeTreatmentDate && (
                                  <button
                                    className="btn-patient-theme h-100 bg-admin w-auto ms-2 px-4"
                                    disabled={cannotChangeTreatmentDate}>
                                    {t('save')}
                                  </button>
                                )}
                              </Can>
                            </div>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Can>

                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view awareButton',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <p className="p-0 m-0 text-pure-black">Aware</p>
                        <div
                          className={`toggle-container ${
                            aware ? 'bg-admin' : ''
                          }`}
                          onClick={handleChangePatientAware}>
                          <p className="float-end p-0 m-0 text-white left">
                            {' '}
                            {!aware && 'No'}
                          </p>
                          <div
                            className={`dialog-button ${
                              aware ? '' : 'disabled'
                            }`}></div>
                          <p className="float-start text-white p-0 m-0 right">
                            {' '}
                            {aware && 'Yes'}
                          </p>
                        </div>
                      </Col>
                    </Can>

                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view patient mrn',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <LabelValue
                          label={t('mrn')}
                          value={generalInformation?.mrn}
                        />
                      </Col>
                    </Can>
                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view patient mobile&email',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <LabelValue
                          label={t('mobile')}
                          value={profileDTO?.mobile}
                        />
                      </Col>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <LabelValue
                          label={t('email')}
                          value={profileDTO?.email}
                        />
                      </Col>
                    </Can>
                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view awareButton',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <p className="p-0 m-0 text-pure-black">Data Consent</p>
                        <div
                          className={`toggle-container ${
                            dataConsent ? 'bg-admin' : ''
                          }`}
                          onClick={() => setdataConsent(true)}>
                          <p className="float-end p-0 m-0 text-white left">
                            {' '}
                            {!dataConsent && 'No'}
                          </p>
                          <div
                            className={`dialog-button ${
                              dataConsent ? '' : 'disabled'
                            }`}></div>
                          <p className="float-start text-white p-0 m-0 right">
                            {' '}
                            {dataConsent && 'Yes'}
                          </p>
                        </div>
                      </Col>
                      {dataConsent && (
                        <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                          <Form
                            onSubmit={onSaveDataConsent}
                            className="d-flex flex-row">
                            <Form.Group>
                              <Form.Label className="p-0 m-0 text-pure-black">
                                Data consent date :
                              </Form.Label>
                              <div className="d-flex flex-row input-small">
                                <Form.Control
                                  required
                                  type="date"
                                  className="h-100 p-2"
                                  value={dataConsentDate}
                                  disabled={generalInformation?.dataConsentDate}
                                  onChange={onDataConsentDateChange}
                                />

                                <Can
                                  performingAction={{
                                    component: 'treatment-initiation',
                                    action: 'can change treatmentInitiation',
                                  }}
                                  removeDiv={true}>
                                  {!generalInformation?.dataConsentDate && (
                                    <button
                                      className="btn-patient-theme h-100 bg-admin w-auto ms-2 px-4"
                                      disabled={dateWarning}>
                                      {t('save')}
                                    </button>
                                  )}
                                </Can>
                              </div>
                            </Form.Group>
                          </Form>
                        </Col>
                      )}
                    </Can>
                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view addationalPatientInformation',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <p className="p-0 m-0 text-pure-black">
                          Show More Information
                        </p>
                        <div
                          className={`toggle-container-2 ${
                            showMoreInfo ? 'bg-admin' : ''
                          }`}
                          onClick={onShowMoreInfoClick}>
                          <p className="float-end p-0 m-0 text-white left">
                            {!showMoreInfo && 'Show'}
                          </p>
                          <div
                            className={`dialog-button-2 ${
                              showMoreInfo ? '' : 'disabled'
                            }`}></div>
                          <p className="float-start text-white p-0 m-0 right">
                            {showMoreInfo && 'Hide'}
                          </p>
                        </div>
                      </Col>
                    </Can>
                  </>
                )}
              </Row>
            </div>
          </div>
        </Can>
        <Can
          performingAction={{
            component: 'patient-general-information',
            action: 'can view addationalPatientInformation',
          }}
          removeDiv={true}>
          {showMoreInfo && (
            <>
              <div className="addational-patient-details-mobibile-view">
                <div
                  className={`detail-tab ${selectedTab === 1 ? 'active' : ''}`}
                  onClick={() => setselectedTab(1)}>
                  Patient Profile Details
                </div>
                <div
                  className={`detail-tab ${selectedTab === 2 ? 'active' : ''}`}
                  onClick={() => setselectedTab(2)}>
                  Bank Account Details
                </div>
                <div
                  className={`detail-tab ${selectedTab === 3 ? 'active' : ''}`}
                  onClick={() => setselectedTab(3)}>
                  Financial Information
                </div>
                {patientUploadedDocuments &&
                  patientUploadedDocuments.length > 0 && (
                    <div
                      className={`detail-tab ${
                        selectedTab === 4 ? 'active' : ''
                      }`}
                      onClick={() => setselectedTab(4)}>
                      Uploaded Documents
                    </div>
                  )}
              </div>

              <div className=" item-tab-wrapper">
                <div className="tab-wrapper">
                  <div
                    className={`detail-tab ${
                      selectedTab === 1 ? 'active' : ''
                    }`}
                    onClick={() => setselectedTab(1)}>
                    Patient Profile Details
                  </div>
                  <div
                    className={`detail-tab ${
                      selectedTab === 2 ? 'active' : ''
                    }`}
                    onClick={() => setselectedTab(2)}>
                    Bank Account Details
                  </div>
                  <div
                    className={`detail-tab ${
                      selectedTab === 3 ? 'active' : ''
                    }`}
                    onClick={() => setselectedTab(3)}>
                    Financial Information
                  </div>
                  {patientUploadedDocuments &&
                    patientUploadedDocuments.length > 0 && (
                      <div
                        className={`detail-tab ${
                          selectedTab === 4 ? 'active' : ''
                        }`}
                        onClick={() => setselectedTab(4)}>
                        Uploaded Documents
                      </div>
                    )}
                </div>
                <Suspense fallback={<SuspenseFallbackLoader />}>
                  <PatientAddationalProfileDetails
                    selectedTab={selectedTab}
                    profileInfo={profileDTO}
                    bankingDetails={bankDetailDTO}
                    financialDetails={financeDetailDTO}
                    patientUploadedDocuments={patientUploadedDocuments}
                  />
                </Suspense>
              </div>
            </>
          )}
        </Can>

        <Can
          performingAction={{
            component: 'patient-pbp-program',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item p-4 pb-2 mt-4">
            <div className="d-flex align-items-center flex-row title  ">
              <span className="m-0">{t('vbcProgramme')}</span>
            </div>
            {vbcProgram && (
              <>
                <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('identified')}
                      toolTipText={t('identifiedMeaning')}
                      value={
                        vbcProgram.identifiedDate &&
                        format(
                          new Date(vbcProgram.identifiedDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('aware')}
                      toolTipText={t('awareMeaning')}
                      value={
                        vbcProgram.awareDate &&
                        format(
                          new Date(vbcProgram.awareDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('engaged')}
                      toolTipText={t('engagedMeaning')}
                      value={
                        vbcProgram.engagedDate &&
                        format(
                          new Date(vbcProgram.engagedDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('enrolled')}
                      toolTipText={t('enrolledMeaning')}
                      value={
                        vbcProgram.enrolledDate &&
                        format(
                          new Date(vbcProgram.enrolledDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('completed')}
                      toolTipText={t('completedMeaning')}
                      value={
                        vbcProgram.completedDate &&
                        format(
                          new Date(vbcProgram.completedDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Can
                    performingAction={{
                      component: 'patient-pbp-program',
                      action: 'can view rebate initiation date',
                    }}
                    removeDiv={true}>
                    {vbcProgram.clinicalDropDate && (
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                        <LabelValue
                          label={t('rebateInitiationDate')}
                          toolTipText={t('rebateInitiationDateMeaning')}
                          value={
                            vbcProgram.rebateInitiationDate &&
                            format(
                              new Date(vbcProgram.rebateInitiationDate),
                              DateFormat.DD_MM_YYYY_DASH
                            )
                          }
                          info={true}
                        />
                      </Col>
                    )}
                  </Can>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('droppedOutClinicalrRasons')}
                      toolTipText={t('clinicalDropOutMeaning')}
                      value={
                        vbcProgram.clinicalDropDate &&
                        format(
                          new Date(vbcProgram.clinicalDropDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                    <LabelValue
                      label={t('droppedOutNonClinicalReasons')}
                      toolTipText={t('nonClinicalDropOut')}
                      value={
                        vbcProgram.nonClinicalDropDate &&
                        format(
                          new Date(vbcProgram.nonClinicalDropDate),
                          DateFormat.DD_MM_YYYY_DASH
                        )
                      }
                      info={true}
                    />
                  </Col>
                </Row>
                <hr />
                <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 py-1 px-3">
                  {' '}
                  <Col xxl={3} xl={4} lg={4} md={6} className="mb-2 p-0">
                    <LabelValue
                      label={t('modeSelected')}
                      toolTipText={t('modeOfPaymentMeaning')}
                      value={
                        vbcProgram?.convertedToFinance
                          ? `${
                              PAYMENT_FRAMEWORK_VALUE[
                                vbcProgram.paymentTypeOpted
                              ]
                            }(cycle-${vbcProgram?.conversionCycle})`
                          : paymentSwitchButtonState
                          ? `${
                              PAYMENT_FRAMEWORK_VALUE[
                                vbcProgram.paymentTypeOpted
                              ]
                            }(Conversion In-Progress)`
                          : PAYMENT_FRAMEWORK_VALUE[vbcProgram.paymentTypeOpted]
                      }
                      info={true}
                    />
                  </Col>
                  {isConvertButtonAvaliable && (
                    <Can
                      performingAction={{
                        component: 'patient-general-information',
                        action: 'can view addationalPatientInformation',
                      }}
                      removeDiv={true}>
                      <Col xxl={3} xl={4} lg={4} md={6} className="mb-2 p-0">
                        <p className="p-0 m-0 text-pure-black">
                          Convert Self Pay to Finance
                        </p>
                        <div
                          className={`toggle-container-3 ${
                            isSelfPayToFinance ? 'bg-admin' : ''
                          } ${
                            !paymentSwitchButtonEnable
                              ? 'switch-payment-disabled'
                              : ''
                          }`}
                          onClick={onSelfPayToFinanceConvert}>
                          <p className="float-end p-0 m-0 text-white left">
                            {!isSelfPayToFinance && 'Convert'}
                          </p>
                          <div
                            className={`dialog-button-3 ${
                              isSelfPayToFinance ? '' : 'disabled'
                            }`}></div>
                          <p className="float-start text-white p-0 m-0 right">
                            {isSelfPayToFinance && 'Cancel'}
                          </p>
                        </div>
                      </Col>
                    </Can>
                  )}
                </Row>
                <hr className="mb-4" />
              </>
            )}

            {vbcProgram?.applicants.length > 0 &&
              role === ROLES.MANGO_EXECUTIVE &&
              !nonFinancialPatient && (
                <Can
                  performingAction={{
                    component: 'patient-applicant-list',
                    action: 'can view details',
                  }}
                  removeDiv={true}>
                  <React.Fragment>
                    <div className="d-flex align-items-center flex-row title">
                      <span className="m-0">{t('applicants')}</span>
                    </div>
                    <div className="mt-3">
                      <TableComponent
                        component={'applicant-listing'}
                        tableHeadersData={tableHeadersPatientDetailsApplicants}
                        tableData={vbcProgram.applicants}
                        classes={'applicant-overview align-items-center'}
                        noCheck
                        headerClasses="border-0"
                      />
                    </div>
                  </React.Fragment>
                </Can>
              )}
          </div>
        </Can>
        {isSelfPayToFinance && paymentSwitchButtonEnable && (
          <Can
            performingAction={{
              component: 'patient-applicant-list',
              action: 'can view details',
            }}
            removeDiv={true}>
            <Suspense fallback={<SuspenseFallbackLoader />}>
              <SelfPayToFinance
                patientId={patientId}
                patientMangoAccountId={mangoAccountId}
                // paymentSwitchButtonState={paymentSwitchButtonState}
              />
            </Suspense>
          </Can>
        )}

        <Can
          performingAction={{
            component: 'payout-details',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item mt-4 p-4">
            <div className="d-flex align-items-center flex-row title mb-2 ">
              <h4>{t('payoutDetails')}</h4>
            </div>
            <div>
              <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
                <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                  <LabelValue
                    label={t('grantPayout')}
                    value={
                      paySubventionTo
                        ? capitalizeFirstLetter(paySubventionTo)
                        : 'N/A'
                    }
                  />
                </Col>
                <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                  <LabelValue
                    label={t('rebatePayout')}
                    value={
                      payRebateTo ? capitalizeFirstLetter(payRebateTo) : 'N/A'
                    }
                  />
                </Col>
              </Row>
              {paySubventionTo && paySubventionTo === 'LENDER' && (
                <>
                  <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('Payment Frequency')}
                        value={
                          paymentFrequency
                            ? paymentFrequencyData.find(
                                (item) => item.value === paymentFrequency
                              ).label
                            : 'N/A'
                        }
                      />
                    </Col>

                    {paymentFrequency === MONTHLY && (
                      <>
                        {/* <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                          <LabelValue
                            label={t('Day/Last Weekday For Grant')}
                            value={'N/A'}
                          />
                        </Col> */}
                        {grantPaymentDay && (
                          <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                            <LabelValue
                              label={t('Grant Day')}
                              value={
                                grantPaymentDay
                                  ? grantPaymentWeek === 5 &&
                                    capitalizeFirstLetter(
                                      `LAST ${grantPaymentDay}`
                                    )
                                  : 'N/A'
                              }
                            />
                          </Col>
                        )}
                        {grantPaymentDate && (
                          <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                            <LabelValue
                              label={t('Grant Date')}
                              value={grantPaymentDate}
                            />
                          </Col>
                        )}
                      </>
                    )}
                  </Row>
                </>
              )}
            </div>
          </div>
        </Can>

        {showSchedule && vbcSchedule.length > 0 && (
          <Can
            performingAction={{
              component: 'admin-pbp-schedule-list',
              action: 'can view details',
            }}
            removeDiv={true}>
            <div className="item mt-4 p-4">
              <div className="d-flex align-items-center flex-row title mb-2 ">
                <h4>{t('vbcSchedule')}</h4>
              </div>
              <TableComponent
                component={'vbc-schedule-listing'}
                tableHeadersData={tableHeadersPatientDetailVbcSchedule}
                tableData={scheduleTableData}
                classes={'vbc-schedule-table align-items-center'}
                noCheck
                headerClasses=""
              />
            </div>
          </Can>
        )}
        {isShowLender && (
          <Can
            performingAction={{
              component: 'lender-assignment',
              action: 'can view details',
            }}
            removeDiv={true}>
            <div className="item p-4  mt-4">
              {isShowLenderAdd && (
                <>
                  {' '}
                  <div className="d-flex align-items-center flex-row title">
                    <span className="m-0">{t('lenderInformation')}</span>
                  </div>
                  <Can
                    performingAction={{
                      component: 'lender-assignment',
                      action: 'can assign lender',
                    }}
                    removeDiv={true}>
                    <div className="d-flex flex-row align-items-baseline select-lender mt-4 flex-wrap-wrap gap-2">
                      <label className="text-primary text-muted">
                        Lender :
                      </label>
                      <select
                        value={lender}
                        onChange={(e) => {
                          const value = e.target.value;
                          const name = e.target.selectedOptions[0].label;
                          setLender(value);
                          setAssignLenderName(name);
                        }}
                        className="input-primary  mt-3 mt-lg-0">
                        <option value="" hidden>
                          Select Lender
                        </option>
                        {lendersList.length > 0 &&
                          lendersList.map(({id, label, value}) => (
                            <option key={id} value={value} name={label}>
                              {label}
                            </option>
                          ))}
                      </select>
                      <button
                        onClick={() =>
                          assignLenderConfirmModal(assignLenderName)
                        }
                        className="btn-patient-theme bg-admin  px-4 mt-3 mt-lg-0">
                        {t('assign')}
                      </button>
                    </div>
                  </Can>
                </>
              )}
              {lenderHistoryTableData &&
                lenderHistoryTableData.length > 0 &&
                !applicationApproved && <hr />}
              {lenderHistoryTableData && lenderHistoryTableData.length > 0 && (
                <>
                  <div className="d-flex align-items-center flex-row title  ">
                    <h4>{t('lenderHistory')}</h4>
                  </div>
                  <div className="mt-3">
                    <TableComponent
                      component={'lender-history-listing'}
                      tableHeadersData={tableHeadersLenderHistory}
                      tableData={lenderHistoryTableData}
                      classes={'applicant-overview align-items-center'}
                      noCheck
                      headerClasses="border-0"
                    />
                  </div>
                </>
              )}
            </div>
          </Can>
        )}
        <Can
          performingAction={{
            component: 'treatment-list',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item p-4 mt-4">
            <div className="d-flex align-items-center flex-row title">
              <span className="m-0">{t('treatment')}</span>
            </div>
            {treatment && (
              <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 py-4">
                <Col className="mb-2">
                  <LabelValue
                    label={t('cyclesCompleted')}
                    value={treatment.completedCycles}
                  />
                </Col>
                <Col className="mb-2">
                  <LabelValue
                    label={t('nextAppointment')}
                    value={treatment.nextAppointment}
                  />
                </Col>
              </Row>
            )}
            <hr />
            <div className="d-flex align-items-center flex-row title  ">
              <h4>{t('treatmentBreaks')}</h4>
            </div>
            <div className="mt-3">
              <TableComponent
                component={'lender-history-listing'}
                tableHeadersData={tableHeadersTreatmentBreaks}
                tableData={treatmentBreakTableData}
                classes={'applicant-overview align-items-center'}
                noCheck
                headerClasses="border-0"
              />
            </div>
            <div className="d-flex flex-row">
              {!treatmentPaused ? (
                <Can
                  performingAction={{
                    component: 'treatment-list',
                    action: 'can pause treatment',
                  }}
                  removeDiv={true}>
                  <button
                    onClick={() => {
                      setShowTreatmentModal(true);
                      setReason('');
                      setIsPauseTreatment(true);
                    }}
                    className="btn-patient-theme-grid bg-admin px-4">
                    Pause
                  </button>
                </Can>
              ) : (
                <Can
                  performingAction={{
                    component: 'treatment-list',
                    action: 'can resume treatment',
                  }}
                  removeDiv={true}>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn-patient-theme-grid bg-admin px-4 ms-2">
                    Restart
                  </button>
                </Can>
              )}
              <Can
                performingAction={{
                  component: 'treatment-list',
                  action: 'can terminate treatment',
                }}
                removeDiv={true}>
                <button
                  onClick={() => {
                    setShowTreatmentModal(true);
                    setIsPauseTreatment(false);
                  }}
                  className="btn-patient-theme-grid bg-admin px-4 ms-2">
                  Terminate
                </button>
              </Can>

              {markTreatmentCompleteButton && (
                <button
                  onClick={() => {
                    setShowCompleteModal(true);
                  }}
                  className="btn-patient-theme-grid bg-admin px-4 ms-2">
                  Complete
                </button>
              )}
            </div>
            <Can
              performingAction={{
                component: 'payout-details',
                action: 'can view markRebatePaid',
              }}
              removeDiv={true}>
              {treatmentTerminated && vbcProgram.clinicalDropDate && (
                <>
                  <div className="d-flex align-items-center flex-row title mb-2">
                    <h4>{t('rebate-payout')}</h4>
                  </div>
                  <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 py-2">
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('rebateAmount')}
                        value={
                          vbcProgram?.rebateAmount
                            ? Symbols.INDIAN_RUPEE + vbcProgram?.rebateAmount
                            : 'N/A'
                        }
                      />
                    </Col>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('rebateInitiationDate')}
                        value={
                          vbcProgram.rebateInitiationDate &&
                          format(
                            new Date(vbcProgram.rebateInitiationDate),
                            DateFormat.DD_MM_YYYY_DASH
                          )
                        }
                      />
                    </Col>
                    <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
                      <LabelValue
                        label={t('rebatePaidDate')}
                        value={
                          vbcProgram.rebateDate &&
                          format(
                            new Date(vbcProgram.rebateDate),
                            DateFormat.DD_MM_YYYY_DASH
                          )
                        }
                      />
                    </Col>
                  </Row>

                  {!vbcProgram?.rebateDate &&
                    vbcProgram?.rebateInitiationDate && (
                      <div>
                        <button
                          onClick={() => setShowRebatePaidModal(true)}
                          className="btn-patient-theme-grid bg-admin px-4">
                          {t('rebatePaidButton')}
                        </button>
                      </div>
                    )}
                </>
              )}
            </Can>

            {treatment?.drugSchedule && treatment?.drugSchedule.length > 0 && (
              <>
                <Can
                  performingAction={{
                    component: 'admin-medication-schedule-list',
                    action: 'can view details',
                  }}
                  removeDiv={true}>
                  {treatment?.cumulativeAmount && (
                    <div className="d-flex align-items-center flex-row title mt-3 cost-incured">
                      <div>
                        <h5 className="mb-0">{t('totalCostIncured')}:</h5>
                      </div>
                      <h4 className="mb-0 text-admin">
                        {Symbols.INDIAN_RUPEE} {treatment?.cumulativeAmount}
                      </h4>
                    </div>
                  )}
                  <React.Fragment>
                    <hr />
                    <div className="d-flex align-items-center flex-row title  ">
                      <h4>{t('drugSchedule')}</h4>
                    </div>
                    <div className="mt-3">
                      <TableComponent
                        component={'drug-schedule-listing'}
                        tableHeadersData={
                          vbcProgram?.paymentTypeOpted ===
                          PAYMENT_FRAMEWORK.SELF_PAY
                            ? tableHeadersPatientDetailsDrugScheduleSelfPay
                            : paySubventionTo && paySubventionTo === 'LENDER'
                            ? tblHeaderPatientDetailsDrugScheduleLenderPayout
                            : tableHeadersPatientDetailsDrugSchedule
                        }
                        tableData={drugScheduleDataCallback()}
                        classes={'applicant-overview align-items-center'}
                        noCheck
                        headerClasses="border-0"
                      />
                      {vbcProgram?.paymentTypeOpted !==
                        PAYMENT_FRAMEWORK.SELF_PAY &&
                        paySubventionTo === 'PATIENT' && (
                          <div>
                            <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                            <span className="ms-2 text-center">
                              {' '}
                              Only First Grant details are being captured{' '}
                            </span>
                          </div>
                        )}
                    </div>
                  </React.Fragment>
                </Can>
              </>
            )}
          </div>
        </Can>
        {/* Commented by Anand Gautam -Check  23rd sept Asana Comment*/}
        {/* <div className="item p-4 pb-2 mt-4">
             {patientReportedOutcomes && (
               <React.Fragment>
                 <div className="d-flex align-items-center flex-row title  ">
                   <span>{t("prom")}</span>
                 </div>
                 <div className="mt-3">
                   <TableComponent
                     component={"prom-listing"}
                     tableHeadersData={tableHeadersProm}
                     tableData={patientReportedOutcomes}
                     classes={"applicant-overview align-items-center"}
                     noCheck
                     headerClasses="border-0"
                   />
                 </div>
               </React.Fragment>
             )}
           </div> */}
        <Can
          performingAction={{
            component: 'assign-doctor',
            action: 'can assign doctor',
          }}
          removeDiv={true}>
          <div className="item p-4  mt-4">
            <div className="d-flex align-items-center flex-row title">
              <span className="m-0">{t('otherActions')}</span>
            </div>
            <div className="d-flex align-items-center flex-row title mt-4">
              <h4>{t('assignNewDoctor')}</h4>
            </div>
            <Row className="d-flex flex-row align-items-center mt-4 assign-new-doc">
              <div className="m-0 p-0 w-auto mb-3 mb-lg-0">
                {' '}
                <div className="d-flex flex-column">
                  <label className="text-primary text-muted ms-3 mb-3">
                    <span className="text-patient">*</span>{' '}
                    {t('reasonForChange')} :
                  </label>
                  <select
                    value={reasonToChange}
                    onChange={(e) => setReasonTochange(e.target.value)}
                    className="input-primary ps-2 ms-3 w-100">
                    {' '}
                    <option value="" hidden>
                      Select Reason
                    </option>
                    {doctorChangeReasons.map(({id, name}) => (
                      <option
                        key={id}
                        value={name}
                        disabled={treatmentTerminated}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="m-0 p-0 select-lender w-auto">
                {' '}
                <div className="d-flex flex-column ms-lg-2">
                  <label className="text-primary text-muted ms-3 mb-3">
                    <span className="text-patient">*</span> {t('newDoctor')} :
                  </label>
                  <div className="d-flex flex-row">
                    <select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="input-primary ps-2 ms-3">
                      <option value="" hidden>
                        Select Doctor
                      </option>
                      {doctorsList.length > 0 &&
                        doctorsList.map(({id, label, value}) => (
                          <option
                            key={id}
                            value={value}
                            disabled={treatmentTerminated}>
                            {label}
                          </option>
                        ))}
                    </select>
                    {!treatmentTerminated && (
                      <button
                        onClick={() => handleClickAssignDoctor(doctor)}
                        className="btn-patient-theme bg-admin ms-3 px-4">
                        {t('assign')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Can>
        <Can
          performingAction={{
            component: 'patient-timeline',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item p-4 pb-2 mt-4">
            <div className="d-flex align-items-center flex-row title mb-4">
              <span className="m-0">{t('timeline')}</span>
            </div>
            <PatientTimeline patientId={patientId} />
          </div>
        </Can>
        {deviceTokenActive && (
          <Can
            performingAction={{
              component: 'send-push-notification',
              action: 'can view details',
            }}
            removeDiv={true}>
            <SendPushNotification mangoAccountId={mangoAccountId} />
          </Can>
        )}

        <Can
          performingAction={{
            component: 'patient-interaction-notes',
            action: 'can view details',
          }}
          removeDiv={true}>
          <div className="item p-4 mt-4">
            <div className="d-flex align-items-center flex-row title mb-3">
              <span className="m-0">{t('comments')}</span>
            </div>
            <MultiLineInput
              label=""
              value={comments}
              setValue={(value) => setComments(value)}
              rows={10}
            />
            <Can
              performingAction={{
                component: 'patient-interaction-notes',
                action: 'can view editDetails',
              }}
              removeDiv={true}>
              <button
                onClick={onCommentSubmit}
                className="btn-patient-theme bg-admin px-4 mt-2">
                {t('submit')}
              </button>
            </Can>
          </div>
        </Can>
      </div>
    </React.Fragment>
  );
};

export default PatientDetails;
