/**
 * This component renders the Drug Schedule table for the Patient.
 * On component load it checks if drugSchedlue is avaliable or not, if its avaliable it created the data in required table format
 */
import React, {useCallback, useEffect, useState} from 'react';
import {Col, Form, Row} from '@themesberg/react-bootstrap';
import {DoctorNotesIcon} from '@/assets/icons';
import TableComponent from '@/components/Tables';
import {
  tableHeadersDrugSchedule,
  tableHeadersDrugScheduleSelfPay,
} from '@/config';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  acknowledgeFirstGrant,
  getEnrollForVbc,
  getVbcDrugSchedule,
  setToast,
  uploadDocumentForPatient,
} from '@/actions';
import {CustomModal} from '../../components';
import {fileSizeValidator, fileTypeValidator} from '@/services/utility';
import {
  ALERT_MESSAGE,
  DateFormat,
  PAYMENT_FRAMEWORK,
  PAYMENT_FRAMEWORK_VALUE,
  Symbols,
} from '../../constants';
import format from 'date-fns/format';
import {isValueNull} from '../../services/utility';
const DrugSchedule = () => {
  const {t} = useTranslation(['drugSchedule', 'documents']);
  const [data, setData] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [yesOrNo, setYesorNo] = useState(false);
  const [showFirstMangoGrant, setShowFirstMangoGrant] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedDrugId, setSelectedDrugId] = useState('');
  const [documentType] = useState('Drug Receipt');
  const userPermissions = useAppSelector((state) => state.app.userPermissions);

  const [fileName, setFileName] = useState('');
  const treatmentTerminated = useAppSelector(
    (state) => state.app.userPermissions?.flags?.treatmentTerminated
  );
  const [isSelfPay, setisSelfPay] = useState(false);
  const enrolledData = useAppSelector(
    (state) => state.loanApplication?.enrollForVbc
  );

  const dispatch = useAppDispatch();

  const drugScheduleList = useAppSelector(
    (state) => state.loanApplication.drugSchedule
  );
  const payGrantToLender = useAppSelector(
    (state) => state.loanApplication.drugSchedule?.data?.payGrantToLender
  );

  /**The above code is defining a function called `handleClickUpload` using the `useCallback` hook in a
React component. This function takes an `id` parameter and toggles the value of `isShowModal` state
using `setIsShowModal` function. It also sets the `id` parameter to the `selectedDrugId` state using
`setSelectedDrugId` function. The `useCallback` hook is used to memoize the function and optimize
performance by only re-creating the function when the `isShowModal` state changes. */
  const handleClickUpload = useCallback(
    (id) => {
      setIsShowModal(!isShowModal);
      setSelectedDrugId(id);
    },
    [isShowModal]
  );

  /**The below code is a React useEffect hook that is triggered when the component mounts or when the
`drugScheduleList`, `dispatch`, or `handleClickUpload` dependencies change. It checks if
`drugScheduleList` is truthy and if not, it dispatches an action to get the VBC drug schedule. If
`drugScheduleList` is truthy, it maps the `content` array of `drugScheduleList.data` to a new array
of objects with modified properties and sets it to the `data` state variable. It also sets the
`showFirstMangoGrant` state variable */
  useEffect(() => {
    if (!drugScheduleList) {
      dispatch(getVbcDrugSchedule());
    } else {
      if (drugScheduleList.data?.content)
        setShowFirstMangoGrant(
          drugScheduleList.data?.content.find((item) => item.cycleNo === 1)
            ?.mangoGrantReceivedFlag === false
            ? true
            : false
        );
      const requiredMedicationData = drugScheduleList.data?.content?.map(
        (item, index, items) => {
          return {
            id: item.id,
            cycleNo: item.cycleNo,
            paidCycle: item.paidCycle,
            paidCycleHtml: item.paidCycle ? t('paid') : t('free'),
            mangoGrantAmount: isValueNull(item.mangoGrantAmount)
              ? 'N/A'
              : `${Symbols.INDIAN_RUPEE} ${item.mangoGrantAmount}`,
            paymentTypeOpted: PAYMENT_FRAMEWORK_VALUE[item.paymentTypeOpted],
            mangoGrantDate: format(
              new Date(item.mangoGrantDate),
              DateFormat.DD_MM_YYYY_SLASH
            ),
            drugReceiptUploadDate:
              item.drugReceiptId &&
              `Uploaded on ${format(
                new Date(item.drugReceiptUploadDate),
                DateFormat.DD_MM_YYYY_SLASH
              )}
              `,
            receiptAmount: item?.receiptAmount
              ? `${Symbols.INDIAN_RUPEE} ${item?.receiptAmount}`
              : '',
            costIncurredByPatient: item?.costIncurredByPatient,
            drugReceiptId: item?.drugReceiptId,
            cumulativeAmount: item?.cumulativeAmount,
            uploadAction: (
              <button
                onClick={() => handleClickUpload(item.cycleNo)}
                disabled={checkIfDisabled(index, items)}
                className={`btn-patient-theme-${
                  checkIfDisabled(index, items) ? 'disabled' : 'grid '
                }`}>
                {item.drugReceiptId && !treatmentTerminated
                  ? t('documents:re-upload')
                  : t('documents:upload')}
              </button>
            ),
          };
        }
      );
      setData(requiredMedicationData);
    }
  }, [dispatch, drugScheduleList, handleClickUpload]);

  /**
   * Checks if the upload button is disable
   * @param {Number} index
   * @param {Array} items
   * @returns {Boolean}
   */
  const checkIfDisabled = (index, items) => {
    if (treatmentTerminated) {
      const completedCycle = userPermissions?.user?.completedCycles;
      if (
        completedCycle &&
        completedCycle >= index + 1 &&
        !items[index]?.drugReceiptId
      )
        return false;
      else return true;
    }
    if (index === 0) return false;
    const recievedItems = [...items];
    const prevItem = recievedItems[index - 1];
    if (prevItem?.drugReceiptId) return false;
    else return true;
  };

  /**The below code is using the `useEffect` hook in a React component to check if `enrolledData` is
truthy. If it is not truthy, it dispatches an action to get enrollment data for a virtual bootcamp.
If `enrolledData` is truthy, it sets the `isSelfPay` state variable based on whether the
`paymentTypeOpted` property of `enrolledData` is equal to the `SELF_PAY` constant from the
`PAYMENT_FRAMEWORK` object. This code is likely part of a larger React application that manages
virtual bootcamp */
  useEffect(() => {
    if (!enrolledData) dispatch(getEnrollForVbc());
    else
      setisSelfPay(
        enrolledData?.paymentTypeOpted === PAYMENT_FRAMEWORK.SELF_PAY
      );
  }, [enrolledData]);

  /**
   * The function handleCloseModal sets two state variables to false and calls another function to clear
   * all inputs.
   */
  const handleCloseModal = (e) => {
    setIsInvalid(false);
    setIsShowModal(false);
    clearAll(e);
  };

  /**
   * This function handles the change event of a file input, validates the file size and type, and sets
   * the selected file and file name.
   * @returns There is no return statement in this code block. The function `handleChange` is likely
   * being used as an event handler for a file input element and is updating state variables and
   * dispatching an action to display a toast message if the file size or type is invalid.
   */
  const handleChange = (event) => {
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
    setSelectedFile(event.target.files[0]);
  };

  /**
   * This function clears the selected file and file name.
   */
  const clearAll = (e) => {
    e.preventDefault();
    setSelectedFile('');
    setFileName('');
  };

  /**
   * This function handles the upload of a selected file and sends it to the server with additional data,
   * triggering a success message and a dispatch to retrieve updated data.
   */
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const file = new FormData();
      file.append('file', selectedFile);
      file.append('cycleNo', selectedDrugId);
      file.append('documentType', documentType);

      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        handleCloseModal(e);
        dispatch(getVbcDrugSchedule());
      };
      dispatch(uploadDocumentForPatient(file, onSuccess));
    }
  };
  /**
   * This function sets the state of a boolean variable to false to close a confirmation modal.
   */
  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };
  /**
   * This function handles a click event for a yes or no button, dispatches an action to acknowledge a
   * grant, sets a value, dispatches another action to get a drug schedule, and closes a confirmation
   * modal.
   */
  const handleClickYesorNo = (value) => {
    const onSuccess = () => {
      setYesorNo(value);
      dispatch(getVbcDrugSchedule());
      handleConfirmModalClose();
    };
    dispatch(acknowledgeFirstGrant(onSuccess));
  };
  /**
   * This function opens a confirmation modal if a certain condition is met.
   */
  const handleClickOpenConfirmModal = () => {
    if (!yesOrNo) {
      setShowConfirmModal(true);
    }
  };

  return (
    <div>
      <CustomModal
        Show={isShowModal}
        title={'Upload Drug Receipt'}
        handleClose={handleCloseModal}>
        <div className="mt-4">
          <Form className="p-4 pt-0 document-form">
            <Row className="mb-3">
              <Col className="p-0 m-0">
                <Form.Label>{t('documents:selectFile')}</Form.Label>
                <div className="upload ">
                  <input
                    type="file"
                    id="doc"
                    className="d-none"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleChange(e)}
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
                  onClick={handleCloseModal}
                  className="btn-patient-theme bg-dark px-4">
                  {t('documents:cancel')}
                </button>
                <button
                  className=" btn-patient-theme fw-normal ms-2 px-4"
                  onClick={handleUpload}
                  disabled={!selectedFile}>
                  {t('documents:upload')}
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </CustomModal>{' '}
      <CustomModal
        cssClass="confirm-modal"
        Show={showConfirmModal}
        handleClose={handleConfirmModalClose}>
        <div className="p-4 px-6">
          <span className="close" onClick={handleConfirmModalClose} />
          <div className="d-flex justify-content-center">
            <h5>Are you Sure </h5>
          </div>
          <div className="d-flex flex-row justify-content-between mt-4">
            <button
              onClick={handleConfirmModalClose}
              className="btn-patient-theme bg-dark w-100">
              {t('cancel')}
            </button>
            <button
              onClick={handleClickYesorNo}
              className="btn-patient-theme bg-patient w-100 ms-2">
              {t('yes')}
            </button>
          </div>
        </div>
      </CustomModal>
      <div className="item p-4 mt-4 ">
        <div className="title-container ">
          <DoctorNotesIcon fill="#28252e" />
          <h4 className="page-title ps-2">{t('drugSchedule')}</h4>
        </div>
        <div className="note  mt-3 ">
          <p className="text-muted m-0">
            {t(data && data?.length > 0 ? 'note' : 'noteForEmptyData')}
          </p>
        </div>
      </div>
      {showFirstMangoGrant && !isSelfPay && !payGrantToLender && (
        <div className="item px-4 py-2 mt-4">
          <div className="my-3 d-flex gap-2 flex-wrap">
            <div className="align-self-end">
              <p className="p-0 m-0 fw-medium text-muted">
                {t('haveYouRecievedYourFirstMangoGrant')}
              </p>
            </div>
            <div
              className={`toggle-container mt-2 ${yesOrNo ? 'bg-patient' : ''}`}
              onClick={() => handleClickOpenConfirmModal(true)}>
              <p className="float-end p-0 m-0 text-white left">
                {' '}
                {!yesOrNo && 'No'}
              </p>
              <div
                className={`dialog-button ${yesOrNo ? '' : 'disabled'}`}></div>
              <p className="float-start text-white p-0 m-0 right">
                {' '}
                {yesOrNo && 'Yes'}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="item p-4 mt-4 ">
        <div className="cost-incured">
          <div>
            <h5>{t('totalCostIncured')}:</h5>
          </div>
          <div>
            <h5 className="text-patient">
              {Symbols.INDIAN_RUPEE} {drugScheduleList?.data?.cumulativeAmount}
            </h5>
          </div>
        </div>
      </div>
      {data && data.length > 0 && (
        <div className="item p-4 mt-4 py-3">
          <TableComponent
            component={'drug-schedule-listing'}
            tableHeadersData={
              !isSelfPay && !payGrantToLender
                ? tableHeadersDrugSchedule
                : tableHeadersDrugScheduleSelfPay
            }
            tableData={data}
            classes={`${
              !isSelfPay && !payGrantToLender
                ? 'drug-schedule-table'
                : 'drug-schedule-patient-table-self-pay'
            } align-items-center`}
            noCheck
            headerClasses=""
          />
        </div>
      )}
    </div>
  );
};

export default DrugSchedule;
