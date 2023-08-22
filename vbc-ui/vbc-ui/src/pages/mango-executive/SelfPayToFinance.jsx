import {Card, Col, Form, Row} from '@themesberg/react-bootstrap';
import InputForm from '../../pages/profile/children/InputForm';
import React, {useCallback, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  tableHeadersApplicant,
  tableHeadersPastGrantAmountAndDate,
} from '../../config';
import {CustomModal, TableComponent} from '../../components';
import {genderData} from '../../data/genericData';
import {
  dynamicMessageCreation,
  emailValidator,
  fileSizeValidator,
  formatEndpoint,
  isObjectEmpty,
  mobileValidator,
} from '../../services/utility';
import {ALERT_MESSAGE, DateFormat} from '../../constants';
import {
  getEligibleCycleForConversion,
  getMangoPatientDetails,
  readLenders,
  setToast,
  switchPaymentType,
  uploadDocumentForPatientByMe,
} from '../../actions';
import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';
import {fileTypeValidator} from '../../services/utility';

const SelfPayToFinance = ({patientId, patientMangoAccountId}) => {
  const {t} = useTranslation(['patientDetails']);
  const dispatch = useAppDispatch();
  const eligibleCycleForConversionRedux = useAppSelector(
    (state) => state.mangoExecutive.eligibleCycleForConversion
  );
  const relationships = useAppSelector(
    (state) => state.template.masterData?.relationships
  );
  const lenders = useAppSelector((state) => state.lenders.usersList);
  const [step, setStep] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState('');
  const [applicantAdded, setapplicantAdded] = useState([]);
  const [requiredCycles, setrequiredCycles] = useState([]);
  const [selectedLender, setselectedLender] = useState(null);
  const [isRecieptUpload, setIsRecieptUpload] = useState(false);
  const [recieptUploadCycle, setRecieptUploadCycle] = useState(null);
  const [lenderList, setlenderList] = useState([]);
  const [canModifiedCycles, setcanModifiedCycles] = useState([]);
  const [cycleDetails, setcycleDetails] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [selectedFileToUpload, setSelectedFileToUpload] = useState(null);
  const [fileName, setFileName] = useState('');
  const [lenderModal, setLenderModal] = useState({
    showLender: false,
    lenderDetails: '',
  });
  const {lenderDetails, showLender} = lenderModal;
  const applicantInitialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    mobile: '',
    email: '',
    relationToPatient: '',
  };
  const [applicantFormDetails, setapplicantFormDetails] = useState(
    applicantInitialValues
  );
  const {
    age,
    email,
    firstName,
    gender,
    lastName,
    middleName,
    mobile,
    relationToPatient,
  } = applicantFormDetails;
  const [mobileWarning, setMobileWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [grantAmountWarning, setgrantAmountWarning] = useState({});

  /* The above code is using the `useEffect` hook in a React component to dispatch an action
`getEligibleCycleForConversion` with a `patientId` parameter to retrieve eligible cycles for
conversion. The `useEffect` hook is called when the component mounts, indicated by the empty
dependency array `[]`. */
  useEffect(() => {
    dispatch(getEligibleCycleForConversion(patientId));
  }, []);

  // console.log('canModifiedCycles=>', canModifiedCycles);
  // console.log('CYCLE DETAILS=>', cycleDetails);

  /**
   * Function to load lenders
   */
  useEffect(() => {
    if (!lenders) {
      dispatch(readLenders(0, 1000));
    } else {
      const requiredLenders = lenders.map((lender) => ({
        ...lender,
        id: lender.lenderId,
        label: lender.lenderName,
        value: lender.lenderId,
      }));
      setlenderList(requiredLenders);
    }
  }, [lenders]);

  /* The above code is a React useEffect hook that runs when the `eligibleCycleForConversionRedux` state
or prop changes. It filters the eligible cycles based on whether they can be selected or modified,
and maps them to a new array with additional properties. It then sets the `requiredCycles` and
`canModifiedCycles` state variables to the filtered and mapped arrays respectively. It also sets the
`cycleDetails` state variable to either the existing `cycleDetails` prop or a new array of cycle
details with empty `grantAmount` and `grantDate` properties. */
  useEffect(() => {
    if (
      eligibleCycleForConversionRedux &&
      eligibleCycleForConversionRedux.length > 0
    ) {
      const requiredData = eligibleCycleForConversionRedux
        .filter((cycle) => cycle.canSelect)
        .map((cycle) => {
          return {
            ...cycle,
            label: `Cycle-${cycle.cycleNo}`,
            value: cycle.cycleNo,
          };
        });

      let requiredDataCanModifyCycles = eligibleCycleForConversionRedux.filter(
        (cycle) => cycle.canModify
      );

      // console.log('requiredDataCanModifyCycles=>', requiredDataCanModifyCycles);
      if (selectedCycle) {
        requiredDataCanModifyCycles = requiredDataCanModifyCycles
          .map((cycle) => {
            return {
              ...cycle,
              isGrantDetailsDisabled: cycle.cycleNo < selectedCycle,
            };
          })
          .filter((cycle) => !cycle.isGrantDetailsDisabled || cycle.canUpload);
      }
      // console.log('selectedCycle=>', parseInt(selectedCycle));
      const cycleDetailsData = requiredDataCanModifyCycles.map(
        (cycle, index) => {
          let grantAmount = '';
          let grantDate = '';
          if (
            cycleDetails &&
            cycleDetails.length > 0 &&
            typeof cycleDetails[index] !== 'undefined'
          ) {
            grantAmount = cycleDetails[index]?.grantAmount
              ? cycleDetails[index]?.grantAmount
              : '';
            grantDate = cycleDetails[index]?.grantDate
              ? cycleDetails[index]?.grantDate
              : '';
          }

          return {
            cycleNo: cycle.cycleNo,
            cycleId: cycle.id,
            grantAmount,
            grantDate,
            isGrantDetailsDisabled: cycle?.isGrantDetailsDisabled,
          };
        }
      );
      setrequiredCycles(requiredData);
      // console.log('cycleDetails=>', cycleDetails);
      // console.log('cycleDetailsData=>', cycleDetailsData);

      setcanModifiedCycles(requiredDataCanModifyCycles);
      // const requiredCycleDetails = cycleDetails
      //   ? cycleDetails
      //   : cycleDetailsData;
      setcycleDetails(cycleDetailsData);
    }
  }, [eligibleCycleForConversionRedux, selectedCycle]);

  // console.log('CYCLE DETAILS=>', cycleDetails);
  // console.log('REQUIRED CYCLE=>', canModifiedCycles);

  /**
   * This function updates a specific cycle detail in an array of cycle details based on user input.
   */
  const onCycleDetailsChange = (e, cycle, index) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value && name === 'grantAmount') {
      if (
        isNaN(parseInt(value)) ||
        value.length !== parseInt(value).toString().length
      )
        return;
    }

    if (name === 'grantAmount')
      setgrantAmountWarning({
        ...grantAmountWarning,
        [index]: value < 0,
      });
    const requiredData = {
      ...cycle,
      [name]: value,
    };
    const cycleDetailsCopy = [...cycleDetails];
    cycleDetailsCopy.splice(index, 1, requiredData);
    setcycleDetails(cycleDetailsCopy);
  };

  /**
   * The function sets the state variables for receipt upload and cycle.
   */
  const handleClickUploadButton = (cycle) => {
    setIsRecieptUpload(true);
    setRecieptUploadCycle(cycle);
  };

  const isUploadButtonDisabled = (cycle, cycles, index) => {
    if (!cycle.canUpload) return true;
    if (index > 0) {
      const isPrevCycleRecieptUploaded = !cycles[index - 1].canUpload;
      if (isPrevCycleRecieptUploaded) return false;
      return true;
    }
    return false;
  };

  /* The above code is defining a React functional component called `cyclesDetailsTable` using the
  `useCallback` hook. The component takes a `disabled` prop and conditionally renders a table of
  cycle details based on the values of `canModifiedCycles`, `selectedLender`, and `cycleDetails`. If
  `canModifiedCycles` is not empty and `selectedLender` is defined, the component maps over
  `canModifiedCycles` to create a new array of cycle details objects with additional properties for
  displaying grant amount, grant sent date, and an upload receipt button. The display of */
  const cyclesDetailsTable = useCallback(
    ({disabled}) => {
      if (canModifiedCycles && canModifiedCycles.length > 0 && selectedLender) {
        // const isGrantDateAndCycle =
        //   selectedLender?.paymentFrequency === 'PER_CYCLE' ||
        //   !selectedLender?.paymentFrequency;
        const requiredCyclesTable = canModifiedCycles.map(
          (cycle, index, cycles) => {
            return {
              ...cycle,
              grantAmountDisplay: !cycle?.isGrantDetailsDisabled ? (
                <div className="input-normal-custom">
                  <input
                    type="text"
                    disabled={disabled || cycle?.isGrantDetailsDisabled}
                    className={`w-100 p-2  ${
                      grantAmountWarning[index] ? 'input-error' : ''
                    }`}
                    placeholder="Enter Grant Amount"
                    value={cycleDetails[index].grantAmount}
                    name="grantAmount"
                    onChange={(e) =>
                      onCycleDetailsChange(e, cycleDetails[index], index)
                    }
                  />
                </div>
              ) : (
                'N/A'
              ),
              grantSentDateDisplay: !cycle?.isGrantDetailsDisabled ? (
                <div className="input-normal-custom">
                  <input
                    type="date"
                    disabled={disabled || cycle?.isGrantDetailsDisabled}
                    className="w-100 p-2"
                    placeholder="Enter Grant Date"
                    value={cycleDetails[index].grantDate}
                    name="grantDate"
                    onChange={(e) =>
                      onCycleDetailsChange(e, cycleDetails[index], index)
                    }
                  />
                </div>
              ) : (
                'N/A'
              ),
              uploadReceipt: (
                <button
                  type="button"
                  onClick={() => handleClickUploadButton(cycle)}
                  disabled={isUploadButtonDisabled(cycle, cycles, index)}
                  className={`bg-admin btn-patient-theme-${
                    !cycle?.canUpload ? 'disabled' : 'grid '
                  }`}>
                  {t('documents:upload')}
                </button>
              ),
            };
          }
        );
        return requiredCyclesTable;
      } else return [];
    },
    [canModifiedCycles, selectedLender, cycleDetails]
  );

  // console.log('canModifiedCycles=>', canModifiedCycles);

  /**
   * The function updates the selected cycle based on the value of a target element.
   */
  const onValueChange = (e) => {
    const value = e.target.value;
    setSelectedCycle(value);
  };

  /**
   * This function checks if a cycle is selected and sets the step to 2 if true.
   */
  const onStepOneSave = (e) => {
    e.preventDefault();
    if (selectedCycle) setStep(2);
  };
  /**
   * This function checks if a cycle is selected and sets the step to 3 if true.
   */
  const onStepTwoSave = (e) => {
    e.preventDefault();

    if (!selectedLender) {
      dispatch(setToast(ALERT_MESSAGE.PLEASE_SELECT_LENDER, true, 'warning'));
      return;
    }
    if (!isObjectEmpty(grantAmountWarning)) {
      const reqData = Object.keys(grantAmountWarning).map(
        (key) => grantAmountWarning[key]
      );
      if (reqData.includes(true)) {
        dispatch(
          setToast(
            ALERT_MESSAGE.PLEASE_ENTER_NON_NEGATIVE_VALUES,
            true,
            'warning'
          )
        );
        return;
      }
    }
    let isAllRecieptUploadedSuccess = true;
    let requiredCycle = '';
    let isGrantDetailsFilled = true;
    let grantFilledErrorMessage = '';

    const isGrantDateAndCycle =
      selectedLender?.paymentFrequency === 'PER_CYCLE' ||
      !selectedLender?.paymentFrequency;

    // canModifiedCycles.forEach((element) => {
    //   if (element.canUpload) {
    //     const currentDate = format(new Date(), DateFormat.US_DATE_DASH);
    //     const compareDate = compareAsc(
    //       new Date(element.cycleDate),
    //       new Date(currentDate)
    //     );
    //     if (compareDate <= 0) {
    //       requiredCycle = element.cycleNo;
    //       isAllRecieptUploadedSuccess = false;
    //       return;
    //     }
    //   }
    // });

    if (isGrantDateAndCycle) {
      // console.log('CYCLE DETAIL=>', cycleDetails);
      cycleDetails.forEach((element) => {
        if (!element.grantAmount && !element?.isGrantDetailsDisabled) {
          isGrantDetailsFilled = false;
          grantFilledErrorMessage = `Please add grant amount for cycle ${element.cycleNo}`;
          return;
        } else if (!element.grantDate && !element?.isGrantDetailsDisabled) {
          isGrantDetailsFilled = false;
          grantFilledErrorMessage = `Please add grant date for cycle ${element.cycleNo}`;
          return;
        }
      });
    }
    if (!isAllRecieptUploadedSuccess) {
      const reqMessage = formatEndpoint(
        ALERT_MESSAGE.UPLOAD_RECEIPT_FOR_CYCLE,
        [requiredCycle]
      );
      dispatch(setToast(reqMessage, true, 'warning'));
      return;
    }
    if (!isGrantDetailsFilled) {
      dispatch(setToast(grantFilledErrorMessage, true, 'warning'));
      return;
    }

    if (selectedCycle && selectedLender) setStep(3);
  };
  // console.log('CYCLE DETAILS=>', cycleDetails);
  /**
   * This function saves data related to switching payment type for a patient with financial assistance.
   */
  const onStepThreeSave = (e) => {
    e.preventDefault();
    if (applicantAdded.length === 0) {
      dispatch(
        setToast(ALERT_MESSAGE.ADD_ATLEAST_ONE_APPLICANT, true, 'warning')
      );
      return;
    }
    if (selectedCycle && selectedLender && applicantAdded.length > 0) {
      const reqData = {
        cycleNo: parseInt(selectedCycle),
        switchFrom: 'SELF_PAY',
        switchTo: 'LOAN_WITH_FINANCIAL_ASSISTANCE',
        patientId: patientId,
        lenderId: selectedLender.id,
        pastCycles: cycleDetails.filter(
          (cycle) => !cycle.isGrantDetailsDisabled
        ),
        applicants: applicantAdded.map((item) => {
          const obj = {...item};
          delete obj.button;
          return obj;
        }),
      };
      const customOnSuccess = () => {
        dispatch(getMangoPatientDetails(patientId));
      };
      dispatch(switchPaymentType(reqData, customOnSuccess));
    }
  };

  /**
   * This function deletes an applicant from a list of applicants based on their temporary ID.
   */
  const deleteApplicant = (id) => {
    setapplicantAdded(applicantAdded.filter((item) => item.tempId !== id));
  };

  /* The above code is defining a function called `onAddApplicant` which is triggered when a form is
submitted. It prevents the default form submission behavior, sets the form details to initial
values, generates a unique ID for the new applicant, creates an object with the applicant's details
and a delete button, and adds this object to an array of previously added applicants. This function
is likely used in a React component to handle the addition of new applicants to a list. */
  const onAddApplicant = (e) => {
    e.preventDefault();
    setapplicantFormDetails(applicantInitialValues);
    const requiredId = applicantAdded.length + 1;
    const requiredData = {
      ...applicantFormDetails,
      tempId: requiredId,
      fullName: `${applicantFormDetails.firstName} ${
        applicantFormDetails.middleName && applicantFormDetails.middleName
      } ${applicantFormDetails.lastName}`,
      button: (
        <button
          onClick={() => deleteApplicant(requiredId)}
          type="button"
          className="bg-admin btn-patient-theme ms-3 ">
          {t('Delete')}
        </button>
      ),
    };
    setapplicantAdded((prevApplicant) => [...prevApplicant, requiredData]);
  };

  // console.log('SELECTED CYCLE=>', selectedCycle);
  // console.log('SELECTED LENDER=>', selectedLender);
  // console.log('CYCLE DETAILS=>', cycleDetails);
  // console.log('APPLICANT ADDED=>', applicantAdded);

  /**
   * This function updates the state of an applicant form based on the user's input.
   */
  const onApplicantValueChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setapplicantFormDetails({...applicantFormDetails, [name]: value});
  };

  /**
   * Validates the Mobile Number and set warning if
   * regex test fails
   * @param {String} value
   */
  const mobileValidation = (e) => {
    const value = e.target.value;
    setapplicantFormDetails({...applicantFormDetails, mobile: value});
    setMobileWarning(mobileValidator(value));
  };
  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidation = (e) => {
    const value = e.target.value;
    setapplicantFormDetails({...applicantFormDetails, email: value});
    setEmailWarning(emailValidator(value));
  };

  // console.log('APPLICANT FORM DETAILS=>', applicantFormDetails);

  /**
   * This function updates the selected lender based on the value of the lender dropdown menu.
   */
  const onLenderChange = (e) => {
    const selectedLenderId = e.target.value;
    const requiredLender = lenderList.find(
      (item) => item.value === parseInt(selectedLenderId)
    );

    setLenderModal({
      ...lenderModal,
      showLender: true,
      lenderDetails: requiredLender,
    });
  };

  /**
   * The function handleCloseModal resets various state variables.
   */
  const handleCloseModal = () => {
    setIsRecieptUpload(false);
    setRecieptUploadCycle(null);
    setIsInvalid(false);
    setFileName('');
    setSelectedFileToUpload(null);
  };

  /**
   * This function handles the change event of a document input field, validates the selected file's
   * size and type, and sets the selected file to upload.
   * @returns The function `handleDocumentChange` is not returning anything explicitly. It may return
   * `undefined` implicitly if none of the conditions in the `if` statement are met and
   * `setIsInvalid(false)` is called.
   */
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
   * This function handles the upload of a selected file for a patient's drug receipt and dispatches an
   * action to upload the document.
   */
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFileToUpload) {
      const file = new FormData();
      file.append('file', selectedFileToUpload);
      file.append('cycleNo', recieptUploadCycle.cycleNo);
      file.append('patientMangoAccountId', patientMangoAccountId);
      file.append('documentType', 'Drug Receipt');

      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        handleCloseModal();
        dispatch(getEligibleCycleForConversion(patientId));
        dispatch(getMangoPatientDetails(patientId));
      };
      dispatch(uploadDocumentForPatientByMe(file, onSuccess));
    }
  };

  const handleAssignLenderClose = () => {
    setLenderModal({...lenderModal, showLender: false, lenderDetails: ''});
  };

  const handleClickAssignLender = (lenderDetails) => {
    setselectedLender(lenderDetails);
    setLenderModal({...lenderModal, showLender: false, lenderDetails: ''});
  };

  /* The above code is defining a function called `renderDetailsSection` that takes a `step` parameter
and returns a different JSX code block based on the value of `step`. The function uses a switch
statement to determine which JSX code block to return. Each JSX code block contains a form with
input fields and buttons, and some of them also include a table component. The function is likely
used to render different sections of a larger form or application. */
  const renderDetailsSection = (step) => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={onStepOneSave}>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <Card className="border-0">
                <Card.Body className="p-0">
                  <InputForm
                    label={t('Cycle')}
                    type="select"
                    isView={false}
                    ipValue={selectedCycle}
                    required={true}
                    name="selectedCycle"
                    options={requiredCycles}
                    onChange={onValueChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            <button type="submit" className="btn-patient-theme bg-admin">
              {t('Save & Proceed')}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={onStepTwoSave}>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <Card className="border-0">
                <Card.Body className="p-0">
                  <InputForm
                    label={t('Cycle (Convert from Self Pay to Finance)')}
                    lablevalue={selectedCycle}
                    type="select"
                    isView={true}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <Card className="border-0">
                <Card.Body className="p-0">
                  <InputForm
                    label={t('Lender')}
                    type="select"
                    isView={false}
                    ipValue={selectedLender?.value}
                    required={true}
                    name="selectedLender"
                    options={lenderList}
                    onChange={onLenderChange}
                  />
                </Card.Body>
              </Card>
            </Col>
            {cyclesDetailsTable({disabled: false}).length > 0 && (
              <>
                <hr className="mb-4" />
                <div className="d-flex align-items-center flex-row title mb-2 ">
                  <h4>{t('Add grant amount and date for past cycles')}</h4>
                </div>
                <TableComponent
                  component={'vbc-schedule-listing'}
                  tableHeadersData={tableHeadersPastGrantAmountAndDate}
                  tableData={cyclesDetailsTable({disabled: false})}
                  classes={'vbc-schedule-table align-items-center'}
                  noCheck
                  headerClasses=""
                />
              </>
            )}
            <button
              type="button"
              className="btn-patient-theme bg-dark"
              onClick={() => {
                setgrantAmountWarning({});
                setselectedLender(null);
                setStep(1);
              }}>
              {t('Back')}
            </button>
            <button type="submit" className="btn-patient-theme bg-admin ms-2">
              {t('Save & Proceed')}
            </button>
          </form>
        );
      case 3:
        return (
          <>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <Card className="border-0">
                <Card.Body className="p-0">
                  <InputForm
                    label={t('Cycle (Convert from Self Pay to Finance)')}
                    lablevalue={selectedCycle}
                    type="select"
                    isView={true}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
              <Card className="border-0">
                <Card.Body className="p-0">
                  <InputForm
                    label={t('Selected Lender')}
                    lablevalue={selectedLender?.label}
                    type="select"
                    isView={true}
                  />
                </Card.Body>
              </Card>
            </Col>
            {cyclesDetailsTable({disabled: true}).length > 0 && (
              <>
                {' '}
                <hr className="mb-4" />
                <div className="d-flex align-items-center flex-row title mb-2 ">
                  <h4>{t('Add grant amount and date for past cycles')}</h4>
                </div>
                <TableComponent
                  component={'vbc-schedule-listing'}
                  tableHeadersData={tableHeadersPastGrantAmountAndDate}
                  tableData={cyclesDetailsTable({disabled: true})}
                  classes={'vbc-schedule-table align-items-center'}
                  noCheck
                  headerClasses=""
                />
              </>
            )}
            <hr className="mb-4" />
            <div className="d-flex align-items-center flex-row title mb-2 ">
              <h4>{t('Add Applicant')}</h4>
            </div>
            <form onSubmit={onAddApplicant}>
              <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3">
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('First Name')}
                        type="text"
                        isView={false}
                        required={true}
                        name="firstName"
                        ipValue={firstName}
                        onChange={onApplicantValueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Middle Name')}
                        type="text"
                        isView={false}
                        required={false}
                        name="middleName"
                        ipValue={middleName}
                        onChange={onApplicantValueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Last Name')}
                        type="text"
                        isView={false}
                        required={true}
                        name="lastName"
                        ipValue={lastName}
                        onChange={onApplicantValueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Age')}
                        type="number"
                        isView={false}
                        required={true}
                        name="age"
                        min={1}
                        max={100}
                        ipValue={age}
                        onChange={onApplicantValueChange}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Gender')}
                        type="select"
                        isView={false}
                        required={true}
                        name="gender"
                        ipValue={gender}
                        onChange={onApplicantValueChange}
                        options={genderData}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Mobile')}
                        type="number"
                        isView={false}
                        required={true}
                        name="mobile"
                        ipValue={mobile}
                        onChange={mobileValidation}
                        warningText={t('inValidMobile')}
                        isInvalid={mobileWarning}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Email')}
                        type="email"
                        isView={false}
                        required={true}
                        name="email"
                        ipValue={email}
                        onChange={emailValidation}
                        warningText={t('inValidEmailAddress')}
                        isInvalid={emailWarning}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12} lg={4} md={6} className="mb-2">
                  <Card className="border-0">
                    <Card.Body className="p-0">
                      <InputForm
                        label={t('Relationship with Patient')}
                        type="select"
                        isView={false}
                        required={true}
                        name="relationToPatient"
                        ipValue={relationToPatient}
                        onChange={onApplicantValueChange}
                        options={relationships.map((item) => {
                          return {
                            id: item.id,
                            label: item.name,
                            value: item.name,
                          };
                        })}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div>
                <button
                  type="submit"
                  disabled={applicantAdded.length >= 5}
                  className="btn-patient-theme bg-admin mb-4">
                  {t('Add')}
                </button>
              </div>
            </form>
            {applicantAdded && applicantAdded.length > 0 && (
              <>
                <hr className="mb-4" />
                <TableComponent
                  component={'vbc-schedule-listing'}
                  tableHeadersData={tableHeadersApplicant}
                  tableData={applicantAdded}
                  classes={'vbc-schedule-table align-items-center'}
                  noCheck
                  headerClasses=""
                />
              </>
            )}
            <button
              type="button"
              className="btn-patient-theme bg-dark"
              onClick={() => setStep(2)}>
              {t('Back')}
            </button>
            <button
              type="button"
              onClick={onStepThreeSave}
              className="btn-patient-theme bg-admin ms-2">
              {t('Submit Application')}
            </button>
          </>
        );

      default:
        break;
    }
  };

  // console.log('SELECTED LENDER=>', selectedLender);

  return (
    <>
      <CustomModal
        Show={showLender}
        title={''}
        handleClose={handleAssignLenderClose}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          lenderDetails &&
          lenderDetails &&
          dynamicMessageCreation(t('assignLenderConfirm'), [
            lenderDetails.label,
          ])
        }
        onConfirmDelete={() => handleClickAssignLender(lenderDetails)}>
        <div></div>
      </CustomModal>
      <CustomModal
        Show={isRecieptUpload}
        title={'Upload Drug Receipt'}
        handleClose={handleCloseModal}>
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
                  onClick={handleCloseModal}
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
      <div className="item mt-4 p-4">
        <div className="d-flex align-items-center flex-row title mb-2 ">
          <h4>{t('Self Pay to Finance')}</h4>
        </div>
        <div>{renderDetailsSection(step)}</div>
      </div>
    </>
  );
};

export default SelfPayToFinance;
