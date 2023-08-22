/**
 * This Component renders a form , user needs to compelete this form in order to submit user financial information
 * onSubmitting this form user financial information are submitted to the server
 * If the user financial information is already submitted user it default mode is view mode
 * if not pages default mode is edit mode
 */
import React, {useState, useEffect} from 'react';
import {Form, Row, Col} from '@themesberg/react-bootstrap';
import {insuranceOptions} from '@/config';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {useTranslation} from 'react-i18next';
import {
  downloadDocument,
  getEnrollForVbc,
  getFinancialInformation,
  getMasterData,
  setToast,
  updateFinancialInformation,
  uploadDocumentForPatient,
} from '@/actions';
import {
  BankAccountDetailsIcon,
  ProfessionalFinancialIcon,
} from '@/assets/icons';
import InputForm from './children/InputForm';
import {
  checkMasterValue,
  panValidator,
  getOptionData,
  negativeNumberValidator,
  fileSizeValidator,
  fileTypeValidator,
  downloadFile,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import {useLocation} from 'react-router-dom';
import {
  actionTypes,
  ALERT_MESSAGE,
  DOCUMENT_TYPE,
  MASTER_DATA_FINANCE_PATIENT,
} from '../../constants';

const FinancialInformation = () => {
  const {SET_SHOW_DOCUMENT} = actionTypes;
  const location = useLocation();
  const {t} = useTranslation(['myProfile'], ['loanApplication']);
  const dispatch = useAppDispatch();
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [annualFamilyIncome, setAnnualFamilyIncome] = useState('');
  const [isView, setIsView] = useState(true);
  const [panNumber, setPanNumber] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [profession, setProfession] = useState('');
  const [EmployerCompanyName, setEmployerCompanyName] = useState('');
  const [Industry, setIndustry] = useState('');
  const [designation, setDesignation] = useState('');
  const [averageAnnualEarnings, setAverageAnnualEarnings] = useState('');
  const [anyotherSourcesofIncome, setAnyotherSourcesofIncome] = useState('');
  const [insurance, setInsurance] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');
  const [isOtherSelected, setisOtherSelected] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [cancelledChequeDocument, setCancelledChequeDocument] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [error, seterror] = useState({
    averageAnnualEarningsError: false,
    anyotherSourcesofIncomeError: false,
    maturityAmountError: false,
    annualFamilyIncomeError: false,
    panError: false,
    aadharError: false,
  });
  const {
    anyotherSourcesofIncomeError,
    averageAnnualEarningsError,
    annualFamilyIncomeError,
    maturityAmountError,
    panError,
  } = error;
  const financialInfo = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );
  const masterData = useAppSelector((state) => state.template.masterData);

  // console.log('IS OTHER=>', isOtherSelected);
  // console.log('otherData=>', otherData);
  // console.log('educationLevel=>', educationLevel);
  // console.log('IS VIEW=>', isView);
  // console.log('financialInfo=>', financialInfo);
  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * getFinancialInformation Action if Manufacturer id is present to get
   * financialInfo array
   */
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFinancialInformation());
  }, []);

  const isNavigatedFromReview = location?.state?.isNavigatedFromReview;
  const isNavigatedFromProfile = location?.state?.isNavigatedFromProfile;

  /*
  This will check if the screen is navigated from review page and if thats true it will make the isView State to false to make fields editable
  */
  useEffect(() => {
    if (isNavigatedFromReview || isNavigatedFromProfile) setIsView(false);
  }, [isNavigatedFromReview, isNavigatedFromProfile]);

  /**
   * This Callback will set financialInfo details to corresponding
   * states if financialInfo have value
   */
  useEffect(() => {
    if (financialInfo?.accountNumber)
      setBankAccountNumber(financialInfo.accountNumber);
    // else setIsView(false);
    if (financialInfo?.cancelledChequeDocument) {
      setCancelledChequeDocument(financialInfo?.cancelledChequeDocument);
      setFileName(financialInfo?.cancelledChequeDocument?.documentName);
    }
    if (financialInfo?.bankBranch) setBankBranch(financialInfo.bankBranch);
    if (financialInfo?.bankIfscCode)
      setBankIFSCCode(financialInfo.bankIfscCode);
    if (financialInfo?.bankName) setBankName(financialInfo.bankName);

    if (financialInfo?.designation) setDesignation(financialInfo.designation);
    if (financialInfo?.educationLevel)
      setEducationLevel(
        checkMasterValue(
          financialInfo?.educationLevel,
          masterData?.educationLevelList
        )
      );
    if (financialInfo?.employerName)
      setEmployerCompanyName(
        checkMasterValue(
          financialInfo?.employerName,
          masterData?.EmployerCompanyName
        )
      );
    if (financialInfo?.familyAnnualIncome)
      setAnnualFamilyIncome(financialInfo.familyAnnualIncome);
    if (financialInfo?.industry)
      setIndustry(
        checkMasterValue(financialInfo?.industry, masterData?.industryTypes)
      );
    setInsurance(financialInfo?.insurance ? true : false);
    if (financialInfo?.insuranceCompany)
      setInsuranceCompany(
        checkMasterValue(
          financialInfo?.insuranceCompany,
          masterData?.insuranceCompanies
        )
      );
    if (financialInfo?.maturityAmount)
      setMaturityAmount(financialInfo.maturityAmount);
    if (financialInfo?.occupation)
      setProfession(
        checkMasterValue(financialInfo?.occupation, masterData?.professions)
      );
    if (financialInfo?.panNumber) setPanNumber(financialInfo.panNumber);
    if (financialInfo?.selfAnnualIncome)
      setAverageAnnualEarnings(financialInfo.selfAnnualIncome);
    if (financialInfo?.otherIncomeSource)
      setAnyotherSourcesofIncome(financialInfo.otherIncomeSource);
  }, [financialInfo]);

  /**
   * Submits the user entered data to updateFinancialInformation and change to readonly mode
   * @param {any} e
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      accountNumber: bankAccountNumber ? bankAccountNumber.toUpperCase() : '',
      bankName: captalizeEveryWordOfSentence(bankName),
      bankBranch: captalizeEveryWordOfSentence(bankBranch),
      bankIfscCode: bankIFSCCode ? bankIFSCCode.toUpperCase() : '',
      familyAnnualIncome: annualFamilyIncome,
      panNumber: panNumber,
      educationLevel: isOtherSelected?.educationLevel
        ? captalizeEveryWordOfSentence(otherData?.educationLevel)
        : educationLevel,
      occupation: isOtherSelected?.profession
        ? captalizeEveryWordOfSentence(otherData?.profession)
        : profession,
      employerName: isOtherSelected?.EmployerCompanyName
        ? captalizeEveryWordOfSentence(otherData?.EmployerCompanyName)
        : EmployerCompanyName,
      industry: isOtherSelected?.Industry
        ? captalizeEveryWordOfSentence(otherData?.Industry)
        : Industry,
      designation: captalizeEveryWordOfSentence(designation),
      selfAnnualIncome: averageAnnualEarnings,
      otherIncomeSource: anyotherSourcesofIncome,
      insurance: insurance,
      insuranceCompany: isOtherSelected?.insuranceCompany
        ? captalizeEveryWordOfSentence(otherData?.insuranceCompany)
        : insuranceCompany,
      maturityAmount: maturityAmount,
    };
    const onSuccess = () => {
      dispatch(getEnrollForVbc());
      setIsView(!isView);
    };
    dispatch(updateFinancialInformation(data, false, onSuccess));
  };
  /**
   * This is triggred when it is openend in edit mode or financialInfo State changes
   *
   */
  useEffect(() => {
    if (financialInfo && !isView) {
      //Step-1Initially all the values are extracted by comparing with master value
      const educationLevel = checkMasterValue(
        financialInfo?.educationLevel,
        masterData?.educationLevelList
      );
      const EmployerCompanyName = checkMasterValue(
        financialInfo?.employerName,
        masterData?.employers
      );
      const profession = checkMasterValue(
        financialInfo?.occupation,
        masterData?.professions
      );
      const Industry = checkMasterValue(
        financialInfo?.industry,
        masterData?.industryTypes
      );
      const insuranceCompany = checkMasterValue(
        financialInfo?.insuranceCompany,
        masterData?.insuranceCompanies
      );
      //Step-2:- Check if the the data is others data or not
      const isEducationOtherData =
        educationLevel && masterData?.educationLevelList
          ? masterData?.educationLevelList.find(
              ({name}) => name === educationLevel
            )
          : true;

      const isEmployerOtherData =
        EmployerCompanyName && masterData?.employers
          ? masterData?.employers.find(({name}) => name === EmployerCompanyName)
          : true;
      const isOccupationOtherData =
        profession && masterData?.professions
          ? masterData?.professions.find(({name}) => name === profession)
          : true;
      const isIndustryOtherData =
        Industry && masterData?.industryTypes
          ? masterData?.industryTypes.find(({name}) => name === Industry)
          : true;
      const isInsuranceCompanyOtherData =
        insuranceCompany && masterData?.insuranceCompanies
          ? masterData?.insuranceCompanies.find(
              ({name}) => name === insuranceCompany
            )
          : true;
      //Step-3:- Construct the opject for isOtherDataSelected state which basically determines which data is Other and which are not based on which the input box is displayed
      const isotherDataSelected = {
        educationLevel: isEducationOtherData ? false : true,
        EmployerCompanyName: isEmployerOtherData ? false : true,
        profession: isOccupationOtherData ? false : true,
        Industry: isIndustryOtherData ? false : true,
        insuranceCompany: isInsuranceCompanyOtherData ? false : true,
      };

      //Step-4:- Construct Other data, if other data is selected then what is the value of that data and its saved in otherData State.
      const otherData = {
        educationLevel: isotherDataSelected.educationLevel
          ? educationLevel
          : '',
        EmployerCompanyName: isotherDataSelected.EmployerCompanyName
          ? EmployerCompanyName
          : '',
        profession: isotherDataSelected.profession ? profession : '',
        Industry: isotherDataSelected.Industry ? Industry : '',
        insuranceCompany: isotherDataSelected.insuranceCompany
          ? insuranceCompany
          : '',
      };
      if (!isEducationOtherData) setEducationLevel('Other');
      if (!isEmployerOtherData) setEmployerCompanyName('Other');
      if (!isOccupationOtherData) setProfession('Other');
      if (!isIndustryOtherData) setIndustry('Other');
      if (!isInsuranceCompanyOtherData) setInsuranceCompany('Other');

      setisOtherSelected(isotherDataSelected);
      setOtherData(otherData);
    }
  }, [financialInfo, isView]);
  // console.log('EDUCATION LEVEL=>', educationLevel);
  /**
   * If financial information have data in it
   * This callback function will set the viewmode true else false
   */
  // useEffect(() => {
  //   if (financialInfo?.accountNumber) {
  //     setIsView(true);
  //   } else {
  //     setIsView(false);
  //   }
  // }, [financialInfo]);

  /**
   * This function is triggred when the data related to others data is changed
   * @param {*} e
   */
  const handleOtherChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (value === 'Other')
      setisOtherSelected({
        ...isOtherSelected,
        [name]: true,
      });
    else
      setisOtherSelected({
        ...isOtherSelected,
        [name]: false,
      });
  };
  /**
   * Sets the lasted value provided by user in the input value
   * @param {*} e
   */
  const onOtherDataChange = (e) => {
    setOtherData({...otherData, [e.target.name]: e.target.value});
  };

  /**
   * When insurance drop down is selected  YES/ NO Based on that the insurance Company dropdwon enables
   * @param {*} e
   */
  const onInsuranceSelect = (e) => {
    const value = e.target.value;

    setInsurance(value === 'true' ? true : false);
    if (value === 'false') {
      setInsuranceCompany('');
      setOtherData({...otherData, insuranceCompany: ''});
    }
  };

  /**
   * Validating pan card
   * @param {Event} e
   */
  const validatePanNumber = (e) => {
    const value = e.target.value;
    setPanNumber(value);
    seterror({...error, panError: panValidator(value)});
  };

  /**
   * This function toggles the view mode and fetches master data if it's not already available.
   */
  const onEditClick = () => {
    const afterMasterDataSuccess = () => {
      setIsView(!isView);
    };
    if (!masterData?.professions)
      dispatch(
        getMasterData(MASTER_DATA_FINANCE_PATIENT, true, afterMasterDataSuccess)
      );
    else afterMasterDataSuccess(masterData);
  };

  /**
   * The function handles the change event of a file input, validates the file size and type, and sets
   * the selected file and its name.
   * @returns There is no explicit return statement in the code snippet provided, so the function
   * implicitly returns `undefined`.
   */
  const handleChange = (event) => {
    // console.log('EVENT=>', event);
    const file = event.target.files[0];
    const sizeValidation = fileSizeValidator(15, file.size);
    const fileValidation = fileTypeValidator(file.type);
    if (sizeValidation || fileValidation) {
      dispatch(setToast(ALERT_MESSAGE.FILE_UPLOAD_ERROR, true, 'warning'));
      return;
    }
    setFileName(file.name);
    setSelectedFile(file);
  };

  /**
   * This Function will submit the uploaded file to uploadDocument action
   * @param {Any} e
   *
   */
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const file = new FormData();
      file.append('file', selectedFile);
      file.append('documentType', DOCUMENT_TYPE.CANCELLED_CHEQUE);
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
          dispatch(getFinancialInformation());
          setCancelledChequeDocument(response.data);
        }
      };
      dispatch(uploadDocumentForPatient(file, onSuccess));
    }
  };

  /**
   * This Function will fetch the byte format of selected file
   * @param {Any} e
   * @param {Id} id
   */
  const download = (e, id) => {
    e.preventDefault();

    const onSuccess = (response) => {
      downloadFile(response, cancelledChequeDocument.documentName);
      return {
        type: SET_SHOW_DOCUMENT,
        payload: response,
      };
    };
    dispatch(downloadDocument(id, onSuccess));
  };

  return (
    <>
      <div>
        <div className="financial-info mt-4">
          {
            <Form onSubmit={handleSubmit}>
              <div className="item finance p-4">
                <div className="d-flex flex-row align-items-center title mb-2 ps-0">
                  <BankAccountDetailsIcon
                    fill="#28252e"
                    width="20"
                    height="20"
                  />
                  <h4 className="ms-2 mb-0">
                    {t('loanApplication:bankAccountDetails')}
                  </h4>
                </div>
                <Row className="px-0 pb-0 financial-loan pt-0 ">
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:bankAccountNumber')}
                      ipValue={bankAccountNumber}
                      lablevalue={
                        financialInfo?.accountNumber
                          ? financialInfo?.accountNumber.toUpperCase()
                          : null
                      }
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      required={false}
                      warningText={t('loanApplication:requiredField')}
                      type="text"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:bankName')}
                      ipValue={bankName}
                      required={false}
                      lablevalue={captalizeEveryWordOfSentence(
                        financialInfo?.bankName
                      )}
                      onChange={(e) => setBankName(e.target.value)}
                      type="text"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:bankBranch')}
                      ipValue={bankBranch}
                      required={false}
                      lablevalue={captalizeEveryWordOfSentence(
                        financialInfo?.bankBranch
                      )}
                      onChange={(e) => setBankBranch(e.target.value)}
                      type="text"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:bankIFSCCode')}
                      required={false}
                      ipValue={bankIFSCCode}
                      lablevalue={
                        financialInfo?.bankIfscCode
                          ? financialInfo?.bankIfscCode.toUpperCase()
                          : null
                      }
                      onChange={(e) => setBankIFSCCode(e.target.value)}
                      type="text"
                    />
                  </Col>
                  {isView ? (
                    <div className="col-sm-12 col-md-5 col-lg-8 mb-2 ">
                      <>
                        <p className="p-0 roboto-regular-14 mb-1">
                          {t('loanApplication:cancelledCheque')} :
                        </p>
                        <div className="d-flex gap-2 align-items-end">
                          <div
                            title={
                              cancelledChequeDocument
                                ? cancelledChequeDocument.documentName
                                : 'Information not available'
                            }>
                            <h6 className="roboto-medium-14 truncate-text-200">
                              {cancelledChequeDocument
                                ? cancelledChequeDocument.documentName
                                : 'Information not available'}
                            </h6>
                          </div>
                          {cancelledChequeDocument && (
                            <div>
                              <button
                                className=" btn-patient-theme-input-30 fw-normal "
                                onClick={(e) =>
                                  download(e, cancelledChequeDocument?.id)
                                }>
                                {t('documents:download')}
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    </div>
                  ) : (
                    <div className="col-sm-12 col-md-12 col-lg-12  col-xl-8 mb-2 ">
                      <>
                        <Form.Label>
                          {/* <span className="patient-color">*</span> */}
                          {t('loanApplication:uploadCancelledCheque')}
                        </Form.Label>
                        <div className="d-flex gap-2 flex-wrap">
                          <div className="upload">
                            <input
                              type="file"
                              id="doc"
                              className="d-none"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => handleChange(e)}
                              onClick={(event) => {
                                event.target.value = null;
                              }}
                            />
                            <div
                              className="input-box p-1 ps-2 truncate-text-200"
                              title={fileName}>
                              {fileName
                                ? `${fileName}`
                                : 'Please Select a File'}
                            </div>
                            <label htmlFor="doc" className="browse">
                              {t('documents:browse')}
                            </label>
                          </div>
                          <div className="d-flex aling-self-end">
                            <button
                              title="Upload"
                              className=" btn-patient-theme-input-30 fw-normal bg-dark "
                              onClick={handleUpload}
                              disabled={!selectedFile}>
                              {cancelledChequeDocument
                                ? t('documents:Reupload')
                                : t('documents:upload')}
                            </button>

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
                        </div>
                      </>
                    </div>
                  )}
                </Row>
              </div>
              <div className="item professional p-4 mt-4 pb-4">
                <div className="d-flex flex-row align-items-center title mb-2 ps-0">
                  <div className="align-self-start">
                    <ProfessionalFinancialIcon
                      fill="#28252e"
                      width="20"
                      height="20"
                    />
                  </div>
                  <h4 className="ms-2 mb-0">
                    {t(
                      'loanApplication:professionalandotherfinancialinformation'
                    )}
                  </h4>
                </div>
                <Row className="px-0 financial-loan pt-0">
                  <Col className="col-sm-12 col-md-6 col-lg-4  mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:panNumber')}
                      ipValue={panNumber}
                      required={false}
                      isInvalid={panError}
                      lablevalue={
                        financialInfo?.panNumber
                          ? financialInfo?.panNumber.toUpperCase()
                          : null
                      }
                      warningText="Please enter a valid PAN"
                      onChange={validatePanNumber}
                      type="text"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4  mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:educationLevel')}
                      ipValue={educationLevel}
                      required={false}
                      lablevalue={checkMasterValue(
                        financialInfo?.educationLevel,
                        masterData?.educationLevelList,
                        true
                      )}
                      name="educationLevel"
                      onChange={(e) => {
                        setEducationLevel(e.target.value);
                        handleOtherChange(e);
                      }}
                      type="select"
                      options={getOptionData(masterData?.educationLevelList)}
                    />
                  </Col>
                  {!isView && isOtherSelected?.educationLevel && (
                    <Col className="col-sm-12 col-md-6 col-lg-4  mb-2">
                      <InputForm
                        isView={isView}
                        label={t('Enter Education')}
                        ipValue={
                          otherData?.educationLevel
                            ? otherData?.educationLevel
                            : ''
                        }
                        required={false}
                        lablevalue={captalizeEveryWordOfSentence(
                          financialInfo?.educationLevel
                        )}
                        name="educationLevel"
                        onChange={onOtherDataChange}
                        type="text"
                        options={getOptionData(masterData?.educationLevelList)}
                      />
                    </Col>
                  )}

                  <Col className="col-sm-12 col-md-6 col-lg-4  mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:profession')}
                      ipValue={profession}
                      required={false}
                      lablevalue={checkMasterValue(
                        financialInfo?.occupation,
                        masterData?.professions,
                        true
                      )}
                      name="profession"
                      onChange={(e) => {
                        setProfession(e.target.value);
                        handleOtherChange(e);
                      }}
                      type="select"
                      options={getOptionData(masterData?.professions)}
                    />
                  </Col>
                  {!isView && isOtherSelected?.profession && (
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <InputForm
                        isView={isView}
                        label={t('Enter profession')}
                        ipValue={
                          otherData?.profession ? otherData?.profession : ''
                        }
                        required={false}
                        lablevalue={captalizeEveryWordOfSentence(
                          financialInfo?.occupation
                        )}
                        name="profession"
                        onChange={onOtherDataChange}
                        type="text"
                        options={getOptionData(masterData?.professions)}
                      />
                    </Col>
                  )}
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:EmployerCompanyName')}
                      ipValue={EmployerCompanyName}
                      required={false}
                      lablevalue={checkMasterValue(
                        financialInfo?.employerName,
                        masterData?.employers,
                        true
                      )}
                      name="EmployerCompanyName"
                      onChange={(e) => {
                        setEmployerCompanyName(e.target.value);
                        handleOtherChange(e);
                      }}
                      type="select"
                      options={getOptionData(masterData?.employers)}
                    />
                  </Col>
                  {!isView && isOtherSelected?.EmployerCompanyName && (
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <InputForm
                        isView={isView}
                        label={t('Enter Employer Company Name')}
                        ipValue={
                          otherData?.EmployerCompanyName
                            ? otherData?.EmployerCompanyName
                            : ''
                        }
                        required={false}
                        lablevalue={captalizeEveryWordOfSentence(
                          financialInfo?.employerName
                        )}
                        name="EmployerCompanyName"
                        onChange={onOtherDataChange}
                        type="text"
                        options={getOptionData(masterData?.employers)}
                      />
                    </Col>
                  )}
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:Industry')}
                      ipValue={Industry}
                      required={false}
                      lablevalue={checkMasterValue(
                        financialInfo?.industry,
                        masterData?.industryTypes,
                        true
                      )}
                      name="Industry"
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        handleOtherChange(e);
                      }}
                      type="select"
                      options={getOptionData(masterData?.industryTypes)}
                    />
                  </Col>
                  {!isView && isOtherSelected?.Industry && (
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <InputForm
                        isView={isView}
                        label={t('Enter industry')}
                        ipValue={otherData?.Industry ? otherData?.Industry : ''}
                        required={false}
                        lablevalue={captalizeEveryWordOfSentence(
                          financialInfo?.industry
                        )}
                        name="Industry"
                        onChange={onOtherDataChange}
                        type="text"
                        options={getOptionData(masterData?.industryTypes)}
                      />
                    </Col>
                  )}
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:designation')}
                      ipValue={designation}
                      required={false}
                      lablevalue={captalizeEveryWordOfSentence(
                        financialInfo?.designation
                      )}
                      onChange={(e) => setDesignation(e.target.value)}
                      type="text"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:averageAnnualEarnings')}
                      ipValue={averageAnnualEarnings}
                      required
                      lablevalue={financialInfo?.selfAnnualIncome}
                      onChange={(e) => {
                        setAverageAnnualEarnings(e.target.value);
                        seterror({
                          ...error,
                          averageAnnualEarningsError: negativeNumberValidator(
                            e.target.value
                          ),
                        });
                      }}
                      isInvalid={averageAnnualEarningsError}
                      warningText={t('loanApplication:enterNonNegativeNumber')}
                      type="number"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:anyotherSourcesofIncome')}
                      ipValue={anyotherSourcesofIncome}
                      required={false}
                      lablevalue={financialInfo?.otherIncomeSource}
                      onChange={(e) => {
                        setAnyotherSourcesofIncome(e.target.value);
                        seterror({
                          ...error,
                          anyotherSourcesofIncomeError: negativeNumberValidator(
                            e.target.value
                          ),
                        });
                      }}
                      isInvalid={anyotherSourcesofIncomeError}
                      warningText={t('loanApplication:enterNonNegativeNumber')}
                      type="number"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:insurance')}
                      ipValue={insurance}
                      required={false}
                      lablevalue={financialInfo?.insurance ? 'Yes' : 'No'}
                      onChange={onInsuranceSelect}
                      type="select"
                      options={insuranceOptions}
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:insuranceCompany')}
                      ipValue={insuranceCompany}
                      required={insurance ? true : false}
                      lablevalue={checkMasterValue(
                        financialInfo?.insuranceCompany,
                        masterData?.insuranceCompanies,
                        true
                      )}
                      readOnly={!insurance ? true : false}
                      name="insuranceCompany"
                      onChange={(e) => {
                        setInsuranceCompany(e.target.value);
                        handleOtherChange(e);
                      }}
                      type="select"
                      options={getOptionData(masterData?.insuranceCompanies)}
                    />
                  </Col>
                  {!isView && isOtherSelected?.insuranceCompany && (
                    <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                      <InputForm
                        isView={isView}
                        label={t('Enter insurance Company')}
                        readOnly={!insurance ? true : false}
                        ipValue={
                          otherData?.insuranceCompany
                            ? otherData?.insuranceCompany
                            : ''
                        }
                        required={false}
                        lablevalue={captalizeEveryWordOfSentence(
                          financialInfo?.insuranceCompany
                        )}
                        name="insuranceCompany"
                        onChange={onOtherDataChange}
                        type="text"
                        options={getOptionData(masterData?.insuranceCompanies)}
                      />
                    </Col>
                  )}
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:maturityAmount')}
                      ipValue={maturityAmount}
                      required={false}
                      lablevalue={financialInfo?.maturityAmount}
                      onChange={(e) => {
                        setMaturityAmount(e.target.value);
                        seterror({
                          ...error,
                          maturityAmountError: negativeNumberValidator(
                            e.target.value
                          ),
                        });
                      }}
                      isInvalid={maturityAmountError}
                      warningText={t('loanApplication:enterNonNegativeNumber')}
                      type="number"
                    />
                  </Col>
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2">
                    <InputForm
                      isView={isView}
                      label={t('loanApplication:annualFamilyIncome')}
                      ipValue={annualFamilyIncome}
                      required
                      lablevalue={financialInfo?.familyAnnualIncome}
                      onChange={(e) => {
                        setAnnualFamilyIncome(e.target.value);
                        seterror({
                          ...error,
                          annualFamilyIncomeError: negativeNumberValidator(
                            e.target.value
                          ),
                        });
                      }}
                      isInvalid={annualFamilyIncomeError}
                      warningText={t('loanApplication:enterNonNegativeNumber')}
                      type="number"
                    />
                  </Col>
                </Row>
              </div>
              {!isView ? (
                <div className="d-flex flex-row  mt-2-rem">
                  <button
                    type="button"
                    onClick={() => setIsView(!isView)}
                    className="btn-patient-theme bg-dark me-2">
                    {t('loanApplication:cancel')}
                  </button>
                  <button
                    type="submit"
                    className="btn-patient-theme w-auto px-5"
                    title={
                      panError ||
                      annualFamilyIncomeError ||
                      maturityAmountError ||
                      anyotherSourcesofIncomeError ||
                      averageAnnualEarningsError
                        ? 'Please submit correct information'
                        : ''
                    }
                    disabled={
                      annualFamilyIncomeError ||
                      maturityAmountError ||
                      anyotherSourcesofIncomeError ||
                      averageAnnualEarningsError ||
                      panError
                    }>
                    {t('loanApplication:save')}
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-row  mt-2-rem">
                  <button
                    onClick={onEditClick}
                    type="button"
                    className="btn-patient-theme w-auto px-5 d-flex justify-content-center align-items-center">
                    {t('loanApplication:Edit')}
                  </button>
                </div>
              )}
            </Form>
          }
        </div>
      </div>
    </>
  );
};

export default FinancialInformation;
