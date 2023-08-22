/**
 * This Component renders Financial information which is included in step 2 of loan Application
 * user can add or edit financial information  here
 */

import React, {useState, useEffect} from 'react';
import {Form, Row, Col} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {insuranceOptions} from '@/config';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {ProfessionalFinancialIcon} from '@/assets/icons';
import {
  downloadDocument,
  getFinancialInformation,
  setToast,
  uploadDocumentForPatient,
  vbcProgramSteps,
} from '@/actions';

import PropTypes from 'prop-types';
import {
  captalizeEveryWordOfSentence,
  checkMasterValue,
  downloadFile,
  fileSizeValidator,
  fileTypeValidator,
  getOptionData,
  negativeNumberValidator,
  panValidator,
} from '@/services/utility';
import {
  actionTypes,
  ALERT_MESSAGE,
  MASTER_DATA_FIELDS,
} from '../../../constants';
import {consoleSandbox} from '@sentry/utils';

const Information = ({handleClick}) => {
  const {t} = useTranslation(['loanApplication']);
  const {SET_SHOW_DOCUMENT} = actionTypes;
  const dispatch = useAppDispatch();
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [familyAnnualIncome, setFamilyAnnualIncome] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [profession, setProfession] = useState('');
  const [employerOrCompanyName, setEmployerOrCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [designation, setDesignation] = useState('');
  const [averageAnnualEarnings, setAverageAnnualEarnings] = useState('');
  const [anyotherSourcesofIncome, setAnyotherSourcesofIncome] = useState('');
  const [insurance, setInsurance] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [maturityAmount, setMaturityAmount] = useState('');
  const [isOtherSelected, setisOtherSelected] = useState(null);
  const [otherData, setOtherData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [cancelledChequeDocument, setCancelledChequeDocument] = useState(null);
  const [error, seterror] = useState({
    averageAnnualEarningsError: false,
    anyotherSourcesofIncomeError: false,
    maturityAmountError: false,
    familyAnnualIncomeError: false,
    panError: false,
  });
  const {
    anyotherSourcesofIncomeError,
    averageAnnualEarningsError,
    familyAnnualIncomeError,
    maturityAmountError,
    panError,
  } = error;
  const financialInfo = useAppSelector(
    (state) => state.loanApplication.enrollForVbc
  );
  const finInfo = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );
  const panNumberFromMyProfile = useAppSelector(
    (state) => state.app.myProfile?.panNumber
  );
  const masterData = useAppSelector((state) => state.template.masterData);
  const isRunMasterData =
    !masterData?.[MASTER_DATA_FIELDS.PROFESSIONS] ||
    !masterData?.[MASTER_DATA_FIELDS.EMPLOYERS] ||
    !masterData?.[MASTER_DATA_FIELDS.INSURANCE_COMPANIES] ||
    !masterData?.[MASTER_DATA_FIELDS.INDUSTRY_TYPES] ||
    !masterData?.[MASTER_DATA_FIELDS.RELATIONSHIPS] ||
    !masterData?.[MASTER_DATA_FIELDS.EDUCATION_LEVEL_LIST];

  // console.log('IS OTHER SELECTED =>', isOtherSelected);
  // console.log('IS OTHER DATA  =>', otherData);
  // console.log('financialInfo  =>', financialInfo);

  /**
   * Dispatch getFinancialInformation when financialInfo is null
   */
  useEffect(() => {
    if (!finInfo) {
      dispatch(getFinancialInformation());
    }
  }, [dispatch, finInfo]);

  /**
   * This Function submits the data to second step of vbc program
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    data.accountNumber = bankAccountNumber
      ? bankAccountNumber.toUpperCase()
      : '';
    data.bankName = captalizeEveryWordOfSentence(bankName);
    data.bankBranch = captalizeEveryWordOfSentence(bankBranch);
    data.bankIfscCode = bankIFSCCode ? bankIFSCCode.toUpperCase() : '';
    data.panNumber = panNumber;
    // data.educationLevel = educationLevel;
    // data.occupation = profession;
    // data.employerName = employerOrCompanyName;
    data.educationLevel = isOtherSelected?.educationLevel
      ? captalizeEveryWordOfSentence(otherData?.educationLevel)
      : educationLevel;
    data.occupation = isOtherSelected?.profession
      ? captalizeEveryWordOfSentence(otherData?.profession)
      : profession;
    data.employerName = isOtherSelected?.employerOrCompanyName
      ? captalizeEveryWordOfSentence(otherData?.employerOrCompanyName)
      : employerOrCompanyName;
    data.industry = isOtherSelected?.industry
      ? captalizeEveryWordOfSentence(otherData?.industry)
      : industry;
    // data.industry = industry;
    data.designation = captalizeEveryWordOfSentence(designation);
    data.selfAnnualIncome = averageAnnualEarnings;
    data.otherIncomeSource = anyotherSourcesofIncome;
    data.insurance = insurance;
    data.insuranceCompany = isOtherSelected?.insuranceCompany
      ? captalizeEveryWordOfSentence(otherData?.insuranceCompany)
      : insuranceCompany;
    // data.insuranceCompany = insuranceCompany;
    data.maturityAmount = maturityAmount;
    data.familyAnnualIncome = familyAnnualIncome;
    // if (cancelledChequeDocument)
    dispatch(vbcProgramSteps(data, 2));
    // else
    //   dispatch(
    //     setToast(ALERT_MESSAGE.UPLOAD_CANCELLED_CHEQUE, true, 'warning')
    //   );
  };

  /**
   * gets localvalue and set its properties to corresponding states if it has value else set empty
   */
  useEffect(() => {
    if (financialInfo && !isRunMasterData) {
      setBankAccountNumber(
        financialInfo.accountNumber ? financialInfo.accountNumber : ''
      );
      if (financialInfo?.cancelledChequeDocument) {
        setCancelledChequeDocument(financialInfo?.cancelledChequeDocument);
        setFileName(financialInfo?.cancelledChequeDocument?.documentName);
      }
      setBankName(financialInfo?.bankName ? financialInfo.bankName : '');
      setBankBranch(financialInfo?.bankBranch ? financialInfo.bankBranch : '');
      setBankIFSCCode(
        financialInfo?.bankIfscCode ? financialInfo.bankIfscCode : ''
      );
      setPanNumber(
        financialInfo?.panNumber
          ? financialInfo.panNumber
          : panNumberFromMyProfile
          ? panNumberFromMyProfile
          : ''
      );
      setEducationLevel(
        checkMasterValue(
          financialInfo?.educationLevel,
          masterData?.educationLevelList
        )
      );
      setProfession(
        checkMasterValue(financialInfo?.occupation, masterData?.professions)
      );
      setEmployerOrCompanyName(
        checkMasterValue(
          financialInfo?.employerName,
          masterData?.EmployerCompanyName
        )
      );
      setIndustry(
        checkMasterValue(financialInfo?.industry, masterData?.industryTypes)
      );
      setDesignation(
        financialInfo?.designation ? financialInfo.designation : ''
      );
      setAverageAnnualEarnings(
        financialInfo?.selfAnnualIncome ? financialInfo.selfAnnualIncome : ''
      );
      setAnyotherSourcesofIncome(
        financialInfo?.otherIncomeSource ? financialInfo.otherIncomeSource : ''
      );
      setInsurance(financialInfo?.insurance ? true : false);
      setInsuranceCompany(
        checkMasterValue(
          financialInfo?.insuranceCompany,
          masterData?.insuranceCompanies
        )
      );
      setMaturityAmount(
        financialInfo?.maturityAmount ? financialInfo.maturityAmount : ''
      );
      setFamilyAnnualIncome(
        financialInfo?.familyAnnualIncome
          ? financialInfo.familyAnnualIncome
          : ''
      );
      setDataForCustomEntryData();
    }
  }, [financialInfo, isRunMasterData]);

  /**
   * LIFE CYCLE TO LISTEN TO THE CHANGE IN CANCELLED CHEQUE DOCUMENT AFTER UPLOAD
   */
  useEffect(() => {
    if (finInfo && finInfo?.cancelledChequeDocument) {
      setCancelledChequeDocument(finInfo?.cancelledChequeDocument);
      setFileName(finInfo?.cancelledChequeDocument.documentName);
    }
  }, [finInfo?.cancelledChequeDocument]);

  const setDataForCustomEntryData = () => {
    const educationLevel = checkMasterValue(
      financialInfo?.educationLevel,
      masterData?.educationLevelList
    );
    const employerOrCompanyName = checkMasterValue(
      financialInfo?.employerName,
      masterData?.employers
    );
    const profession = checkMasterValue(
      financialInfo?.occupation,
      masterData?.professions
    );
    const industry = checkMasterValue(
      financialInfo?.industry,
      masterData?.industryTypes
    );
    const insuranceCompany = checkMasterValue(
      financialInfo?.insuranceCompany,
      masterData?.insuranceCompanies
    );

    const isEducationOtherData = educationLevel
      ? masterData?.educationLevelList.find(({name}) => name === educationLevel)
      : true;
    const isEmployerOtherData = employerOrCompanyName
      ? masterData?.employers.find(({name}) => name === employerOrCompanyName)
      : true;
    const isOccupationOtherData = profession
      ? masterData?.professions.find(({name}) => name === profession)
      : true;
    const isIndustryOtherData = industry
      ? masterData?.industryTypes.find(({name}) => name === industry)
      : true;
    const isInsuranceCompanyOtherData = insuranceCompany
      ? masterData?.insuranceCompanies.find(
          ({name}) => name === insuranceCompany
        )
      : true;

    // console.log('IS EDUCATIN DAAT=>', isEducationOtherData);
    // console.log('IS isOccupationOtherData DAAT=>', isOccupationOtherData);

    const isotherDataSelected = {
      educationLevel: isEducationOtherData ? false : true,
      employerOrCompanyName: isEmployerOtherData ? false : true,
      profession: isOccupationOtherData ? false : true,
      industry: isIndustryOtherData ? false : true,
      insuranceCompany: isInsuranceCompanyOtherData ? false : true,
    };
    const otherData = {
      educationLevel: isotherDataSelected.educationLevel ? educationLevel : '',
      employerOrCompanyName: isotherDataSelected.employerOrCompanyName
        ? employerOrCompanyName
        : '',
      profession: isotherDataSelected.profession ? profession : '',
      industry: isotherDataSelected.industry ? industry : '',
      insuranceCompany: isotherDataSelected.insuranceCompany
        ? insuranceCompany
        : '',
    };
    if (!isEducationOtherData) setEducationLevel('Other');
    if (!isEmployerOtherData) setEmployerOrCompanyName('Other');
    if (!isOccupationOtherData) setProfession('Other');
    if (!isIndustryOtherData) setIndustry('Other');
    if (!isInsuranceCompanyOtherData) setInsuranceCompany('Other');
    // console.log("OTHER DATA=>",otherData)

    setisOtherSelected(isotherDataSelected);
    setOtherData(otherData);
  };

  /**
   * This function updates the state of a boolean value based on whether a specific option is selected in
   * a dropdown menu.
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
   * Validating pan card
   * @param {Event} e
   */
  const validatePanNumber = (e) => {
    const value = e.target.value;
    setPanNumber(value);
    seterror({...error, panError: panValidator(value)});
  };

  /**
   * This function updates the state of "otherData" with the new value of the input field that triggered
   * the onChange event.
   */
  const onOtherDataChange = (e) => {
    setOtherData({...otherData, [e.target.name]: e.target.value});
  };
  /**
   * This function updates the state of a boolean variable and clears related state variables based on a
   * user's selection.
   */
  const onInsuranceSelect = (e) => {
    const value = e.target.value;
    // console.log('VALUE=>', value);
    setInsurance(value === 'true' ? true : false);
    if (value === 'false') {
      setInsuranceCompany('');
      setOtherData({...otherData, insuranceCompany: ''});
    }
  };

  // console.log('CANCELLED CHEQUE DOC=>', cancelledChequeDocument);
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
      file.append('documentType', 'Cancelled Cheque');
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
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

  /**
   * The function handles the change event of a file input, validates the file size and type, and sets
   * the selected file and its name.
   * @returns There is no explicit return statement in the code snippet provided, so the function is
   * returning `undefined` by default. However, the function is performing some conditional checks and
   * setting the state values `fileName` and `selectedFile` based on the result of those checks. It also
   * dispatches a `setToast` action with an error message if the file size or type is invalid.
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

  return (
    <div>
      <div className="page-container financial-loan p-4 mt-3">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-row align-items-center title mb-2 ps-0 pt-0">
            <div className="align-self-start">
              <ProfessionalFinancialIcon
                fill="#28252e"
                width="20"
                height="20"
              />
            </div>
            <h4 className="ms-2 mb-0">{t('financialInformation')}</h4>
          </div>
          <Row className="px-0 pb-3 financial-loan pt-0 ">
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span> */}
                {t('bankAccountNumber')} :
              </Form.Label>
              <Form.Control
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                required={false}
                type="text"
              />
            </Form.Group>
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('bankName')} :
              </Form.Label>
              <Form.Control
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required={false}
                type="text"
              />
            </Form.Group>
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('bankBranch')} :
              </Form.Label>
              <Form.Control
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                required={false}
                type="text"
              />
            </Form.Group>
            <Form.Group className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('bankIFSCCode')} :
              </Form.Label>
              <Form.Control
                value={bankIFSCCode}
                onChange={(e) => setBankIFSCCode(e.target.value)}
                required={false}
                type="text"
              />
            </Form.Group>

            <div className="col-sm-12 col-md-12 col-lg-12  col-xl-8 mb-2 ">
              <>
                <Form.Label>
                  {/* <span className="patient-color">*</span>{' '} */}
                  {t('uploadCancelledCheque')}
                </Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  <div className="upload ">
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
                      {fileName ? `${fileName}` : 'Please Select a File'}
                    </div>
                    <label htmlFor="doc" className="browse">
                      {t('documents:browse')}
                    </label>
                  </div>
                  <div className="d-flex aling-self-end">
                    <button
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

            <p className="ps-3 m-0">{t('note')}</p>
          </Row>
          <div className="d-flex flex-row align-items-center title mb-2 ps-0 pt-0">
            <div className="align-self-start">
              <ProfessionalFinancialIcon
                fill="#28252e"
                width="20"
                height="20"
              />
            </div>
            <h4 className="ms-2 mb-0">
              {t('professionalandotherfinancialinformation')}
            </h4>
          </div>
          <Row className="px-0 pb-0 financial-loan pt-0 ">
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('panNumber')} :
              </Form.Label>
              <Form.Control
                value={panNumber}
                isInvalid={panError}
                required={false}
                onChange={validatePanNumber}
                type="text"
              />
              {panError && (
                <Form.Control.Feedback type="invalid">
                  Please enter a valid PAN
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('educationLevel')} :
              </Form.Label>
              <Form.Control
                value={educationLevel}
                onChange={(e) => {
                  setEducationLevel(e.target.value);
                  handleOtherChange(e);
                }}
                required={false}
                name="educationLevel"
                as="select">
                <option hidden value="">
                  {t('select-educationLevel')}
                </option>
                {getOptionData(masterData?.educationLevelList).map(
                  ({id, value}) => {
                    return (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    );
                  }
                )}
              </Form.Control>
            </Form.Group>
            {isOtherSelected?.educationLevel && (
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {/* <span className="patient-color">*</span>{' '} */}
                  {t('enter-educationLevel')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.educationLevel}
                  onChange={onOtherDataChange}
                  name="educationLevel"
                  required={false}
                  type="text"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('profession')} :
              </Form.Label>{' '}
              <Form.Control
                value={profession}
                onChange={(e) => {
                  setProfession(e.target.value);
                  handleOtherChange(e);
                }}
                required={false}
                name="profession"
                as="select">
                <option hidden value="">
                  {t('select-profession')}
                </option>
                {getOptionData(masterData?.professions).map(({id, value}) => (
                  <option key={id} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {isOtherSelected?.profession && (
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {/* <span className="patient-color">*</span>{' '} */}
                  {t('enter-profession')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.profession}
                  name="profession"
                  required={false}
                  onChange={onOtherDataChange}
                  type="text"
                />
              </Form.Group>
            )}

            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {/* {' '}
                <span className="patient-color">*</span>{' '} */}
                {t('loanApplication:EmployerCompanyName')} :
              </Form.Label>
              <Form.Control
                value={employerOrCompanyName}
                required={false}
                onChange={(e) => {
                  setEmployerOrCompanyName(e.target.value);
                  handleOtherChange(e);
                }}
                name="employerOrCompanyName"
                as="select">
                <option hidden value="">
                  {t('select-EmployerCompanyName')}
                </option>
                {getOptionData(masterData?.employers).map(({id, value}) => (
                  <option key={id} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {isOtherSelected?.employerOrCompanyName && (
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {/* <span className="patient-color">*</span>{' '} */}
                  {t('enter-EmployerCompanyName')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.employerOrCompanyName}
                  required={false}
                  name="employerOrCompanyName"
                  onChange={onOtherDataChange}
                  type="text"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span> {t('Industry')} : */}
              </Form.Label>
              <Form.Control
                value={industry}
                required={false}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  handleOtherChange(e);
                }}
                name="industry"
                as="select">
                <option hidden value="">
                  {t('select-Industry')}
                </option>
                {getOptionData(masterData?.industryTypes).map(({id, value}) => (
                  <option key={id} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {isOtherSelected?.industry && (
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {/* <span className="patient-color">*</span> {t('enter-Industry')}{' '} */}
                  :
                </Form.Label>
                <Form.Control
                  value={otherData?.industry}
                  name="industry"
                  required={false}
                  onChange={onOtherDataChange}
                  type="text"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>  */}
                {t('designation')} :
              </Form.Label>
              <Form.Control
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required={false}
                type="text"
              />
            </Form.Group>

            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                <span className="patient-color">*</span>{' '}
                {t('loanApplication:averageAnnualEarnings')}
              </Form.Label>
              <Form.Control
                value={averageAnnualEarnings}
                isInvalid={averageAnnualEarningsError}
                required
                onChange={(e) => {
                  setAverageAnnualEarnings(e.target.value);
                  seterror({
                    ...error,
                    averageAnnualEarningsError: negativeNumberValidator(
                      e.target.value
                    ),
                  });
                }}
                type="number"
              />
              {averageAnnualEarningsError && (
                <Form.Control.Feedback type="invalid">
                  {t('enterNonNegativeNumber')}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                {/* <span className="patient-color">*</span>{' '} */}
                {t('loanApplication:anyotherSourcesofIncome')}
              </Form.Label>
              <Form.Control
                value={anyotherSourcesofIncome}
                isInvalid={anyotherSourcesofIncomeError}
                required={false}
                onChange={(e) => {
                  setAnyotherSourcesofIncome(e.target.value);
                  seterror({
                    ...error,
                    anyotherSourcesofIncomeError: negativeNumberValidator(
                      e.target.value
                    ),
                  });
                }}
                type="number"
              />
              {anyotherSourcesofIncomeError && (
                <Form.Control.Feedback type="invalid">
                  {t('enterNonNegativeNumber')}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>{t('insurance')}</Form.Label>
              <Form.Control
                value={insurance}
                onChange={onInsuranceSelect}
                as="select">
                <option hidden value="">
                  Select Insurance
                </option>
                {insuranceOptions.map(({id, value, label}) => (
                  <option key={id} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                <span className="patient-color">{insurance && '*'}</span>{' '}
                {t('insuranceCompany')} :
              </Form.Label>
              <Form.Control
                value={insuranceCompany}
                onChange={(e) => {
                  setInsuranceCompany(e.target.value);
                  handleOtherChange(e);
                }}
                name="insuranceCompany"
                required={insurance ? true : false}
                disabled={!insurance ? true : false}
                as="select">
                <option hidden value="">
                  {t('select-insuranceCompany')}
                </option>
                {getOptionData(masterData?.insuranceCompanies).map(
                  ({id, value}) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
            {isOtherSelected?.insuranceCompany && (
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  <span className="patient-color">{insurance && '*'}</span>{' '}
                  {t('enter-insuranceCompany')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.insuranceCompany}
                  name="insuranceCompany"
                  disabled={!insurance ? true : false}
                  onChange={onOtherDataChange}
                  type="text"
                />
              </Form.Group>
            )}
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>{t('maturityAmount')} :</Form.Label>
              <Form.Control
                value={maturityAmount}
                isInvalid={maturityAmountError}
                onChange={(e) => {
                  setMaturityAmount(e.target.value);
                  seterror({
                    ...error,
                    maturityAmountError: negativeNumberValidator(
                      e.target.value
                    ),
                  });
                }}
                type="number"
              />
              {maturityAmountError && (
                <Form.Control.Feedback type="invalid">
                  {t('enterNonNegativeNumber')}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Label>
                {' '}
                <span className="patient-color">*</span>
                {t('annualFamilyIncome')} :
              </Form.Label>
              <Form.Control
                value={familyAnnualIncome}
                isInvalid={familyAnnualIncomeError}
                required
                onChange={(e) => {
                  setFamilyAnnualIncome(e.target.value);
                  seterror({
                    ...error,
                    familyAnnualIncomeError: negativeNumberValidator(
                      e.target.value
                    ),
                  });
                }}
                type="number"
              />
              {familyAnnualIncomeError && (
                <Form.Control.Feedback type="invalid">
                  {t('enterNonNegativeNumber')}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-flex flex-row  mt-2-rem">
              <button
                onClick={() => handleClick('prev')}
                type="button"
                className="btn-patient-theme bg-dark me-2">
                {t('back')}
              </button>
              <button
                type="submit"
                className="btn-patient-theme w-auto px-4"
                title={
                  averageAnnualEarningsError ||
                  anyotherSourcesofIncomeError ||
                  maturityAmountError ||
                  averageAnnualEarningsError ||
                  panError
                    ? 'Please submit correct information'
                    : ''
                }
                disabled={
                  averageAnnualEarningsError ||
                  anyotherSourcesofIncomeError ||
                  maturityAmountError ||
                  averageAnnualEarningsError ||
                  panError
                }>
                {t('saveAndProceed')}
              </button>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
};
Information.propTypes = {
  handleClick: PropTypes.func,
};
export default Information;
