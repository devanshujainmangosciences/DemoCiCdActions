/**
 * This Component renders a Form for user to enter his/her financial information required for
 * loan application
 * <FinancialInformation
 *  handleClick(Func) => This function is used to take the user to next or prev step of loan application process
 * />
 */
import React, {useState, useEffect} from 'react';
import {Form, Col, Row} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {OCCUPATION_ID, OCCUPATION_KEY, OCCUPATION} from '../../../constants';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  BankAccountDetailsIcon,
  ProfessionalFinancialIcon,
  RequriedDocumentIcon,
} from '@/assets/icons';
import PropTypes from 'prop-types';
import {
  getLoanApplicationDetails,
  requiredDocuments,
  startLoanApplicationSteps,
} from '@/actions';
import {durationMonthsOptions} from '@/config';
import {
  checkMasterValue,
  captalizeEveryWordOfSentence,
} from '@/services/utility';

const FinancialInformation = ({
  handleClick,
  requiredDocument,
  occupation,
  setOccupation,
  isFinancialAssistance,
  handleStepJump,
}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation(['completeLoan']);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [netMonthlyIncome, setNetMonthlyIncome] = useState('');
  const [grossAnnualIncome, setGrossAnnualIncome] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [annualProfits, setAnnualProfits] = useState('');
  const [sales, setSales] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [professionName, setProfessionName] = useState('');
  const [mainOrPrimaryBank, setMainOrPrimaryBank] = useState('');
  const [salaryBankAccount, setSalaryBankAccount] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [natureOfBusiness, setNatureOfBusiness] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [mainBankerOfCompany, setMainBankerOfCompany] = useState('');

  const [tenureYears, setTenureYears] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');

  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [monthInBusiness, setMonthInBusiness] = useState('');

  const [workExperienceYears, setWorkExperienceYears] = useState('');
  const [workExperienceMonths, setWorkExperienceMonths] = useState('');

  const [experienceYears, setExperienceYears] = useState('');
  const [experienceMonths, setExperienceMonths] = useState('');
  const [otherData, setOtherData] = useState(null);
  const [isOtherSelected, setisOtherSelected] = useState(null);

  const [
    anyOtherSelfOwnedResidenceOrLiquidAsset,
    setAnyOtherSelfOwnedResidenceOrLiquidAsset,
  ] = useState('');

  // const selectedOccupation = localStorage.getItem('occupationType');

  const financialInfo = useAppSelector(
    (state) => state.loanApplication.loanDetail
  );
  const masterData = useAppSelector((state) => state.template.masterData);

  /**
   * Dispatch getFinancialInformation action with true as param if financial info has no value
   */
  useEffect(() => {
    if (!financialInfo) {
      dispatch(getLoanApplicationDetails());
    }
  }, [dispatch, financialInfo]);

  /**
   * This callback is used to set corresponding financial detail to its state if it is present
   * in the localStorage
   */
  useEffect(() => {
    if (financialInfo?.financeDetails) {
      setBankAccountNumber(financialInfo.financeDetails.bankAccountNumber);
      setBankBranch(financialInfo.financeDetails.bankBranch);
      setBankIFSCCode(financialInfo.financeDetails.bankIfscCode);
      setBankName(financialInfo.financeDetails.bankName);
      if (occupation) {
        if (occupation === financialInfo.financeDetails.occupation) {
          setOccupation(financialInfo.financeDetails.occupation);
        } else {
          setOccupation(occupation);
        }
      } else {
        setOccupation(financialInfo.occupation);
      }
      setProfessionName(financialInfo.financeDetails.professionName);
      if (financialInfo.financeDetails.experience) {
        setExperienceYears(
          parseInt(financialInfo.financeDetails.experience / 12)
        );
        setExperienceMonths(financialInfo.financeDetails.experience % 12);
      }
      setGrossAnnualIncome(financialInfo.financeDetails.grossAnnualIncome);
      setMainOrPrimaryBank(financialInfo.financeDetails.primaryBank);
      setResidenceType(financialInfo.financeDetails.residenceType);
      setEmployerName(financialInfo.financeDetails.employerName);
      setNetMonthlyIncome(financialInfo.financeDetails.netMonthlyIncome);
      setSalaryBankAccount(financialInfo.financeDetails.salaryBankAccount);
      if (financialInfo.financeDetails.tenureAtCompany) {
        setTenureYears(
          parseInt(financialInfo.financeDetails.tenureAtCompany / 12)
        );
        setTenureMonths(financialInfo.financeDetails.tenureAtCompany % 12);
      }
      if (financialInfo.financeDetails.totalWorkExperience) {
        setWorkExperienceYears(
          parseInt(financialInfo.financeDetails.totalWorkExperience / 12)
        );
        setWorkExperienceMonths(
          financialInfo.financeDetails.totalWorkExperience % 12
        );
      }
      setAnyOtherSelfOwnedResidenceOrLiquidAsset(
        financialInfo.financeDetails.anyOtherAsset
      );
      setCompanyType(financialInfo.financeDetails.companyType);
      setCompanyName(financialInfo.financeDetails.companyName);
      setNatureOfBusiness(financialInfo.financeDetails.natureOfBusiness);
      setIndustryType(financialInfo.financeDetails.industryType);
      if (financialInfo.financeDetails.yearsInBusiness) {
        setYearsInBusiness(
          parseInt(financialInfo.financeDetails.yearsInBusiness / 12)
        );
        setMonthInBusiness(financialInfo.financeDetails.yearsInBusiness % 12);
      }
      setSales(financialInfo.financeDetails.sales);
      setAnnualProfits(financialInfo.financeDetails.annualProfit);
      setMainBankerOfCompany(financialInfo.financeDetails.mainBankerOfCompany);
    }
  }, [financialInfo, dispatch]);

  /**
   * The function "clearAll" resets specific state variables based on the input "occupation".
   */
  const clearAll = (occupation) => {
    if (occupation === OCCUPATION.SELF_EMPLOYED) {
      setWorkExperienceYears('');
      setWorkExperienceMonths('');
      setTenureYears('');
      setTenureMonths('');
      setEmployerName('');
      setNetMonthlyIncome('');
      setSalaryBankAccount('');
      setAnyOtherSelfOwnedResidenceOrLiquidAsset('');
      setCompanyType('');
      setCompanyName('');
      setNatureOfBusiness('');
      setIndustryType('');
      setSales('');
      setAnnualProfits('');
      setMainBankerOfCompany('');
      setYearsInBusiness('');
      setMonthInBusiness('');
    }
    if (
      occupation === OCCUPATION.SALARIED_PRIVATE ||
      occupation === OCCUPATION.SALARIED_PUBLIC
    ) {
      setProfessionName('');
      setExperienceYears('');
      setExperienceMonths('');
      setGrossAnnualIncome('');
      setMainOrPrimaryBank('');
      setCompanyType('');
      setCompanyName('');
      setNatureOfBusiness('');
      setIndustryType('');
      setSales('');
      setAnnualProfits('');
      setMainBankerOfCompany('');
      setYearsInBusiness('');
      setMonthInBusiness('');
    }
    if (occupation === OCCUPATION.BUSINESS_OWNER) {
      setWorkExperienceYears('');
      setWorkExperienceMonths('');
      setTenureYears('');
      setTenureMonths('');
      setEmployerName('');
      setNetMonthlyIncome('');
      setSalaryBankAccount('');
      setAnyOtherSelfOwnedResidenceOrLiquidAsset('');
      setProfessionName('');
      setExperienceYears('');
      setExperienceMonths('');
      setGrossAnnualIncome('');
      setMainOrPrimaryBank('');
    }
  };
  /**
   * This function updates the occupation state, dispatches required documents based on the selected
   * occupation, and clears financial information related to the previous occupation.
   */
  const handleChangeOccupation = (occupation) => {
    setOccupation(occupation);
    dispatch(requiredDocuments(OCCUPATION_ID[occupation]));
    clearAll(financialInfo?.financeDetails?.occupation);
  };
  /**
   * This Function is used to store data in localStorage the data
   * based on occupationType which has selected in the first step
   * and takes the user to next step
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      bankAccountNumber: bankAccountNumber
        ? bankAccountNumber.toUpperCase()
        : '',
      bankName: captalizeEveryWordOfSentence(bankName),
      bankBranch: captalizeEveryWordOfSentence(bankBranch),
      bankIfscCode: bankIFSCCode ? bankIFSCCode.toUpperCase() : '',
      residenceType: residenceType,
      occupation: occupation,
    };
    if (occupation === OCCUPATION.SELF_EMPLOYED) {
      data['professionName'] = isOtherSelected?.professionName
        ? captalizeEveryWordOfSentence(otherData?.professionName)
        : professionName;
      data['experience'] =
        parseInt(experienceYears) * 12 + parseInt(experienceMonths);
      data['grossAnnualIncome'] = parseInt(grossAnnualIncome);
      data['primaryBank'] = mainOrPrimaryBank;
    }
    if (
      occupation === OCCUPATION.SALARIED_PRIVATE ||
      occupation === OCCUPATION.SALARIED_PUBLIC
    ) {
      data['employerName'] = isOtherSelected?.employerName
        ? captalizeEveryWordOfSentence(otherData?.employerName)
        : employerName;
      data['netMonthlyIncome'] = parseFloat(netMonthlyIncome);
      data['salaryBankAccount'] = salaryBankAccount;
      data['tenureAtCompany'] =
        parseInt(tenureYears) * 12 + parseInt(tenureMonths);
      data['totalWorkExperience'] =
        parseInt(workExperienceYears) * 12 + parseInt(workExperienceMonths);
      data['anyOtherAsset'] = anyOtherSelfOwnedResidenceOrLiquidAsset;
    }
    if (occupation === OCCUPATION.BUSINESS_OWNER) {
      data['companyType'] = companyType;
      data['companyName'] = companyName;
      data['natureOfBusiness'] = natureOfBusiness;
      data['industryType'] = isOtherSelected?.industryType
        ? captalizeEveryWordOfSentence(otherData?.industryType)
        : industryType;
      data['yearsInBusiness'] =
        parseInt(yearsInBusiness) * 12 + parseInt(monthInBusiness);
      data['sales'] = parseInt(sales);
      data['annualProfit'] = parseFloat(annualProfits);
      data['mainBankerOfCompany'] = mainBankerOfCompany;
    }
    dispatch(startLoanApplicationSteps(data, 2));
  };
  /**
   * This function handles the click event for a "back" button, either going to the previous step or
   * jumping to step 1 depending on a condition.
   */
  const handleClickBack = () => {
    // console.log('isFinancialAssistance=>', isFinancialAssistance);
    if (isFinancialAssistance) {
      handleClick('prev');
    } else {
      handleStepJump(1);
    }
  };

  /** The below code is a React useEffect hook that runs when the `financialInfo` state changes. It checks
if `financialInfo.financeDetails` exists and then extracts some data from it. It uses the
`checkMasterValue` function to check if the extracted data matches any values in the `masterData`
object. If it does not match, it sets the corresponding state variable to 'Other'. It also sets some
other state variables based on whether the extracted data is 'Other' or not. Finally, it sets the
`isOtherSelected` and `otherData` state variables. */
  useEffect(() => {
    if (financialInfo?.financeDetails) {
      const financialData = financialInfo?.financeDetails;
      // console.log('FINANCIAL DATA=>', financialData);
      // console.log('masterData=>', masterData);

      const employerName = checkMasterValue(
        financialData?.employerName,
        masterData?.employers
      );
      const professionName = checkMasterValue(
        financialData?.professionName,
        masterData?.professions
      );
      const industryType = checkMasterValue(
        financialData?.industryType,
        masterData?.industryTypes
      );

      const isEmployerOtherData = employerName
        ? masterData?.employers.find(({name}) => name === employerName)
        : true;
      const isOccupationOtherData = professionName
        ? masterData?.professions.find(({name}) => name === professionName)
        : true;
      const isIndustryOtherData = industryType
        ? masterData?.industryTypes.find(({name}) => name === industryType)
        : true;

      const isotherDataSelected = {
        employerName: isEmployerOtherData ? false : true,
        professionName: isOccupationOtherData ? false : true,
        industryType: isIndustryOtherData ? false : true,
      };

      const otherData = {
        employerName: isotherDataSelected.employerName ? employerName : '',
        professionName: isotherDataSelected.professionName
          ? professionName
          : '',
        industryType: isotherDataSelected.industryType ? industryType : '',
      };

      if (!isEmployerOtherData) setEmployerName('Other');
      if (!isOccupationOtherData) setProfessionName('Other');
      if (!isIndustryOtherData) setIndustryType('Other');

      setisOtherSelected(isotherDataSelected);
      setOtherData(otherData);
    }
  }, [financialInfo]);

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
   * This function updates the state of "otherData" with the new value of the input field that triggered
   * the onChange event.
   */
  const onOtherDataChange = (e) => {
    setOtherData({...otherData, [e.target.name]: e.target.value});
  };

  // console.log('OTHER DATA=>', otherData);
  // console.log('isOtherSelected=>', isOtherSelected);

  /**
   * Renders the form fields based the occupation type string passed
   * @param {String} occupation
   *
   */
  const OccupationBasedForm = (occupation) => {
    if (occupation === 'SELF_EMPLOYED') {
      return (
        <React.Fragment>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('professionName')}:
              </Form.Label>
              <Form.Control
                value={professionName}
                name="professionName"
                onChange={(e) => {
                  setProfessionName(e.target.value);
                  handleOtherChange(e);
                }}
                required={isFinancialAssistance}
                as="select">
                <option value="">Select One</option>
                {masterData?.professions.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {isOtherSelected?.professionName && (
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Group>
                <Form.Label>
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}
                  {t('enterProfession')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.professionName}
                  name="professionName"
                  onChange={onOtherDataChange}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
            </Col>
          )}
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Row className="p-0">
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('experience')}:
              </Form.Label>
            </Row>
            <Row className="row-cols-lg-2 profession-info-row p-0">
              <>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      type="text"
                      placeholder="Years"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={experienceMonths}
                      onChange={(e) => setExperienceMonths(e.target.value)}
                      as="select"
                      required={isFinancialAssistance}>
                      <option value="">Select Months</option>
                      {durationMonthsOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            </Row>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('grossAnnualIncome')} :
              </Form.Label>
              <Form.Control
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(e.target.value)}
                required={isFinancialAssistance}
                type="number"
              />
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('mainOrPrimaryBank')}:
              </Form.Label>
              <Form.Control
                value={mainOrPrimaryBank}
                onChange={(e) => setMainOrPrimaryBank(e.target.value)}
                required={isFinancialAssistance}
                as="select">
                <option value="">Select One</option>
                {masterData?.banks.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </React.Fragment>
      );
    }
    if (occupation === 'SALARIED_PRIVATE' || occupation === 'SALARIED_PUBLIC') {
      return (
        <React.Fragment>
          {' '}
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('employerName')} :
              </Form.Label>
              <Form.Control
                value={employerName}
                name="employerName"
                required={isFinancialAssistance}
                onChange={(e) => {
                  setEmployerName(e.target.value);
                  handleOtherChange(e);
                }}
                as="select">
                <option hidden value="">
                  {t('selectOne')}
                </option>{' '}
                {masterData?.employers.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {isOtherSelected?.employerName && (
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Group>
                <Form.Label>
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}
                  {t('enterEmployerName')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.employerName}
                  name="employerName"
                  onChange={onOtherDataChange}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
            </Col>
          )}
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('netMonthlyIncome')} :
              </Form.Label>
              <Form.Control
                value={netMonthlyIncome}
                required={isFinancialAssistance}
                onChange={(e) => setNetMonthlyIncome(e.target.value)}
                type="number"
              />
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('salaryACwithBank')} :
              </Form.Label>
              <Form.Control
                value={salaryBankAccount}
                required={isFinancialAssistance}
                onChange={(e) => setSalaryBankAccount(e.target.value)}
                as="select">
                <option hidden value="">
                  {t('selectOne')}
                </option>{' '}
                {masterData?.banks.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Row className="p-0">
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('tenureAtCompany')}:
              </Form.Label>
            </Row>
            <Row className="row-cols-lg-2 profession-info-row p-0">
              <>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={tenureYears}
                      onChange={(e) => setTenureYears(e.target.value)}
                      type="text"
                      placeholder="Years"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(e.target.value)}
                      as="select"
                      required={isFinancialAssistance}>
                      <option value="">Select Months</option>
                      {durationMonthsOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            </Row>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Row className="p-0">
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('totalWorkExperience')} :
              </Form.Label>
            </Row>
            <Row className="row-cols-lg-2 profession-info-row p-0">
              <>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={workExperienceYears}
                      onChange={(e) => setWorkExperienceYears(e.target.value)}
                      type="text"
                      placeholder="Years"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={workExperienceMonths}
                      onChange={(e) => setWorkExperienceMonths(e.target.value)}
                      as="select"
                      required={isFinancialAssistance}>
                      <option value="">Select Months</option>
                      {durationMonthsOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            </Row>
          </Col>
          <Col className="col-sm-12 col-md-12 col-lg-7 col-xl-5 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('anyOtherSelfOwnedResidenceOrLiquidAssets')} :
              </Form.Label>
              <Form.Control
                value={anyOtherSelfOwnedResidenceOrLiquidAsset}
                required={isFinancialAssistance}
                onChange={(e) =>
                  setAnyOtherSelfOwnedResidenceOrLiquidAsset(e.target.value)
                }
                type="text"
              />
            </Form.Group>
          </Col>
        </React.Fragment>
      );
    }
    if (occupation === 'BUSINESS_OWNER') {
      return (
        <React.Fragment>
          {' '}
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('companyType')} :
              </Form.Label>
              <Form.Control
                value={companyType}
                required={isFinancialAssistance}
                onChange={(e) => setCompanyType(e.target.value)}
                as="select">
                <option hidden value="">
                  {t('selectOne')}
                </option>{' '}
                {masterData?.companyTypes.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('companyName')} :
              </Form.Label>
              <Form.Control
                value={companyName}
                required={isFinancialAssistance}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
              />
            </Form.Group>
          </Col>
          <Form.Group as={Col} className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Label>
              {' '}
              {isFinancialAssistance && (
                <span className="patient-color">*</span>
              )}{' '}
              {t('natureOfBusiness')} :
            </Form.Label>
            <Form.Control
              value={natureOfBusiness}
              required={isFinancialAssistance}
              onChange={(e) => setNatureOfBusiness(e.target.value)}
              as="select">
              <option hidden value="">
                {t('selectOne')}
              </option>{' '}
              {masterData?.natureOfBusinesses.map(({id, name}) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('industryType')} :
              </Form.Label>
              <Form.Control
                value={industryType}
                name="industryType"
                required={isFinancialAssistance}
                onChange={(e) => {
                  setIndustryType(e.target.value);
                  handleOtherChange(e);
                }}
                as="select">
                <option hidden value="">
                  {t('selectOne')}
                </option>{' '}
                {masterData?.industryTypes.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {isOtherSelected?.industryType && (
            <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
              <Form.Group>
                <Form.Label>
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}
                  {t('enterIndustryType')} :
                </Form.Label>
                <Form.Control
                  value={otherData?.industryType}
                  name="industryType"
                  onChange={onOtherDataChange}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
            </Col>
          )}
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Row className="p-0">
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('applicantFinancialInformation:yearsInBusiness')}:
              </Form.Label>
            </Row>
            <Row className="row-cols-lg-2 profession-info-row p-0">
              <>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value)}
                      type="text"
                      placeholder="Years"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      value={monthInBusiness}
                      onChange={(e) => setMonthInBusiness(e.target.value)}
                      as="select"
                      required={isFinancialAssistance}>
                      <option value="">Select Months</option>
                      {durationMonthsOptions.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </>
            </Row>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('sales')} :
              </Form.Label>
              <Form.Control
                value={sales}
                required={isFinancialAssistance}
                onChange={(e) => setSales(e.target.value)}
                type="number"
              />
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}{' '}
                {t('annualProfits')} :
              </Form.Label>
              <Form.Control
                value={annualProfits}
                required={isFinancialAssistance}
                onChange={(e) => setAnnualProfits(e.target.value)}
                type="number"
              />
            </Form.Group>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <Form.Group>
              <Form.Label>
                {' '}
                {isFinancialAssistance && (
                  <span className="patient-color">*</span>
                )}
                {t('mainBankerOfCompany')} :
              </Form.Label>
              <Form.Control
                value={mainBankerOfCompany}
                onChange={(e) => setMainBankerOfCompany(e.target.value)}
                as="select"
                required={isFinancialAssistance}>
                <option value="">Select One</option>
                {masterData?.banks.map(({id, name}) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <div className=" start-financial-loan pb-5 ">
        <Form onSubmit={handleSubmit}>
          <div className="item  p-4">
            <div className="d-flex flex-row align-items-center title mb-2">
              <BankAccountDetailsIcon fill="#28252e" width="20" height="20" />
              <h4 className="ms-2 mb-0">{t('bankAccountDetails')}</h4>
            </div>
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}
                  {t('bankAccountNumber')} :
                </Form.Label>
                <Form.Control
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}{' '}
                  {t('bankName')} :
                </Form.Label>
                <Form.Control
                  required={isFinancialAssistance}
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}{' '}
                  {t('bankBranch')} :
                </Form.Label>
                <Form.Control
                  value={bankBranch}
                  onChange={(e) => setBankBranch(e.target.value)}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}{' '}
                  {t('bankIFSCCode')} :
                </Form.Label>
                <Form.Control
                  value={bankIFSCCode}
                  onChange={(e) => setBankIFSCCode(e.target.value)}
                  required={isFinancialAssistance}
                  type="text"
                />
              </Form.Group>
            </Row>
          </div>
          <div className="item mt-4 p-4">
            <div className="d-flex flex-row align-items-center title mb-2">
              <ProfessionalFinancialIcon
                fill="#28252e"
                width="20"
                height="20"
              />
              <h4 className="ms-2 mb-0">
                {t('professionalandotherfinancialinformation')}
              </h4>
            </div>
            <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                <Form.Label>
                  {' '}
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}{' '}
                  {t('occupation')} :
                </Form.Label>
                <Form.Control
                  value={occupation}
                  onChange={(e) => handleChangeOccupation(e.target.value)}
                  required={isFinancialAssistance}
                  as="select">
                  <option hidden value="">
                    {t('selectOne')}
                  </option>{' '}
                  {masterData?.occupations.map(({id, name}) => (
                    <option key={id} value={OCCUPATION_KEY[name]}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {OccupationBasedForm(occupation)}
              <Form.Group
                as={Col}
                className="col-sm-12 col-md-12 col-lg-4 mb-2 ">
                <Form.Label>
                  {isFinancialAssistance && (
                    <span className="patient-color">*</span>
                  )}
                  {t('residenceType')}:
                </Form.Label>
                <Form.Control
                  value={residenceType}
                  onChange={(e) => setResidenceType(e.target.value)}
                  required={isFinancialAssistance}
                  as="select">
                  <option value="">Select One</option>
                  {masterData?.residenceTypes.map(({id, name}) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>
          </div>
          {isFinancialAssistance && (
            <div className="item mt-4 p-4">
              <div className="d-flex flex-row align-items-center title mb-2">
                <RequriedDocumentIcon fill="#28252e" width="20" height="20" />
                <h4 className="ms-2 mb-0">{t('requiredDocuments')}</h4>
              </div>
              <Row>
                {requiredDocument &&
                  Object.keys(requiredDocument).map((doc, i) => (
                    <div key={i}>
                      <p>{doc}</p>
                    </div>
                  ))}
              </Row>
            </div>
          )}
          <div className="d-flex flex-row mt-4">
            <button
              onClick={() => handleClickBack()}
              type="button"
              className="btn-patient-theme bg-dark me-2">
              {t('back')}
            </button>
            <button type="submit" className="btn-patient-theme w-auto px-4">
              {t('saveAndProceed')}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
FinancialInformation.propTypes = {
  handleClick: PropTypes.func,
  requiredDocument: PropTypes.object,
};
export default FinancialInformation;
