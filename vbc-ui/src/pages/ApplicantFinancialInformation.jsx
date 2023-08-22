/**
 * This Component renders a form , user needs to compelete this form in order to submit user financial information
 * onSubmitting this form user financial information are submitted to the server
 * If the user financial information is already submitted user it default mode is view mode
 * if not pages default mode is edit mode
 */
import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Card} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {useTranslation} from 'react-i18next';
import {getFinancialInformation} from '@/actions';
import {
  BankAccountDetailsIcon,
  ProfessionalFinancialIcon,
} from '@/assets/icons';
import {OCCUPATION_VALUE} from '../constants';
import NotAllowed from './profile/children/NotAllowed';
import {useNavigate} from 'react-router';
import {Routes} from '@/routes';
import InputForm from './profile/children/InputForm';
import {captalizeEveryWordOfSentence} from '@/services/utility';

const FinancialInformation = () => {
  const {t} = useTranslation(['myProfile'], ['applicantFinancialInformation']);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [applicantSubmitFlag, setApplicantSubmitFlag] = useState(false);
  const [occupation, setOccupation] = useState('');

  const [tenureYears, setTenureYears] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');

  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [monthInBusiness, setMonthInBusiness] = useState('');

  const [workExperienceYears, setWorkExperienceYears] = useState('');
  const [workExperienceMonths, setWorkExperienceMonths] = useState('');

  const [experienceYears, setExperienceYears] = useState('');
  const [experienceMonths, setExperienceMonths] = useState('');

  const financialInfo = useAppSelector(
    (state) => state.loanApplication.financialInformation
  );

  /**
   * Dispatches getFinancialInformation action if financialInfo is empty
   */
  useEffect(() => {
    if (!financialInfo) {
      dispatch(getFinancialInformation(true));
    }
  }, [dispatch, financialInfo]);

  const onCompleteApplicationButtonClick = () => {
    history(Routes.ApplicantStartLoan.path);
  };

  /**
   * sets all the corresponding financialInfo value to their states if it exists
   */
  useEffect(() => {
    if (financialInfo) {
      setApplicantSubmitFlag(financialInfo.applicationSubmitFlag);
    }
  }, [dispatch, financialInfo]);

  useEffect(() => {
    if (financialInfo) {
      setOccupation(financialInfo.occupation);
      if (financialInfo.experience) {
        setExperienceYears(parseInt(financialInfo.experience / 12));
        setExperienceMonths(financialInfo.experience % 12);
      }
      if (financialInfo.tenureAtCompany) {
        setTenureYears(parseInt(financialInfo.tenureAtCompany / 12));
        setTenureMonths(financialInfo.tenureAtCompany % 12);
      }
      if (financialInfo.totalWorkExperience) {
        setWorkExperienceYears(
          parseInt(financialInfo.totalWorkExperience / 12)
        );
        setWorkExperienceMonths(financialInfo.totalWorkExperience % 12);
      }
      if (financialInfo.yearsInBusiness) {
        setYearsInBusiness(parseInt(financialInfo.yearsInBusiness / 12));
        setMonthInBusiness(financialInfo.yearsInBusiness % 12);
      }
    }
  }, [financialInfo, dispatch]);

  /**
   * The LabelValue function returns a card with a label and value displayed in an input form, with
   * options to uppercase or capitalize the value.
   * @returns A functional component named `LabelValue` is being returned. It takes in four props:
   * `label`, `value`, `uppercase`, and `capitalize`. It renders a `Col` component from react-bootstrap
   * with some classes and a `Card` component with no border. Inside the `Card` component, it renders an
   * `InputForm` component with some props passed to it. The `label`
   */
  const LabelValue = ({label, value, uppercase, capatalize}) => {
    return (
      <>
        <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
          <Card className="border-0">
            <Card.Body>
              <InputForm
                label={label && t(`applicantFinancialInformation:${label}`)}
                lablevalue={
                  uppercase
                    ? financialInfo[value]
                      ? financialInfo[value].toUpperCase()
                      : null
                    : capatalize
                    ? captalizeEveryWordOfSentence(financialInfo[value])
                    : financialInfo[value]
                }
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
  /**The above code defines a function called `OccupationBasedForm` that takes an `occupation` parameter
and returns a JSX code block based on the value of the `occupation` parameter. The JSX code block
contains various `LabelValue` components and other HTML elements that display different types of
information based on the occupation. The function handles three different types of occupations:
`SELF_EMPLOYED`, `SALARIED_PRIVATE` or `SALARIED_PUBLIC`, and `BUSINESS_OWNER`. */
  const OccupationBasedForm = (occupation) => {
    if (occupation === 'SELF_EMPLOYED') {
      return (
        <>
          <LabelValue
            label="professionName"
            value="professionName"
            capatalize={true}
          />

          <div>
            <p className="p-0">
              {t('applicantFinancialInformation:experience')} :
            </p>
            <div className="field d-inline-flex flex-row">
              <h6 className="pe-2">
                {experienceYears ? experienceYears + ' Years' : 'Nil'}
              </h6>
              <h6>{experienceMonths ? experienceMonths + ' Months' : 'Nil'}</h6>
            </div>
          </div>

          <LabelValue label="grossAnnualIncome" value="grossAnnualIncome" />

          <LabelValue label="mainOrPrimaryBank" value="primaryBank" />

          <LabelValue label="residenceType" value="residenceType" />
        </>
      );
    }
    if (occupation === 'SALARIED_PRIVATE' || occupation === 'SALARIED_PUBLIC') {
      return (
        <>
          <LabelValue
            label="employerName"
            value="employerName"
            capatalize={true}
          />
          <LabelValue label="netMonthlyIncome" value="netMonthlyIncome" />
          <LabelValue label="salaryACwithBank" value="salaryBankAccount" />
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <div>
              <p className="p-0">
                {t('applicantFinancialInformation:tenureAtCompany')} :
              </p>
              <div className="field d-inline-flex flex-row">
                <h6 className="pe-2">
                  {tenureYears ? tenureYears + ' Years' : 'Nil'}
                </h6>
                <h6>{tenureMonths ? tenureMonths + ' Months' : 'Nil'}</h6>
              </div>
            </div>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <div>
              <p className="p-0">
                {t('applicantFinancialInformation:totalWorkExperience')} :
              </p>
              <div className="field d-inline-flex flex-row">
                <h6 className="pe-2">
                  {workExperienceYears ? workExperienceYears + ' Years' : 'Nil'}
                </h6>
                <h6>
                  {workExperienceMonths
                    ? workExperienceMonths + ' Months'
                    : 'Nil'}
                </h6>
              </div>
            </div>
          </Col>
          <LabelValue label="residenceType" value="residenceType" />
          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2  white-space-nowrap">
            <LabelValue
              label="anyOtherSelfOwnedResidenceOrLiquidAssets"
              value="anyOtherAsset"
            />
          </Col>
        </>
      );
    }
    if (occupation === 'BUSINESS_OWNER') {
      return (
        <>
          <LabelValue label="companyType" value="companyType" />

          <LabelValue
            label="companyName"
            value="companyName"
            capatalize={true}
          />

          <LabelValue
            label="natureOfBusiness"
            value="natureOfBusiness"
            capatalize={true}
          />

          <LabelValue
            label="industryType"
            value="industryType"
            capatalize={true}
          />

          <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
            <div>
              <p className="p-0">
                {t('applicantFinancialInformation:yearsInBusiness')} :
              </p>
              <div className="field d-inline-flex flex-row">
                <h6 className="pe-2">
                  {yearsInBusiness ? yearsInBusiness + ' Years' : 'Nil'}
                </h6>
                <h6>{monthInBusiness ? monthInBusiness + ' Months' : 'Nil'}</h6>
              </div>
            </div>
          </Col>

          <LabelValue label="sales" value="sales" />

          <LabelValue label="annualProfits" value="annualProfit" />

          <LabelValue label="mainBankerOfCompany" value="mainBankerOfCompany" />

          <LabelValue label="residenceType" value="residenceType" />
        </>
      );
    }
  };
  return (
    <>
      {applicantSubmitFlag ? (
        <div>
          <div className="mt-4">
            <Form>
              <div className="item p-4 mt-4 pb-1 myprofile-container">
                <div className="d-flex flex-row align-items-center title m-0 p-0">
                  <BankAccountDetailsIcon
                    fill="#28252e"
                    width="20"
                    height="20"
                  />
                  <h4 className="ms-2 mb-0">
                    {' '}
                    {t('applicantFinancialInformation:bankAccountDetails')}:
                  </h4>
                </div>
                <Row className="pt-0 profession-info-row row-cols-lg-3">
                  <LabelValue
                    label="bankAccountNumber"
                    value="bankAccountNumber"
                    uppercase={true}
                  />
                  <LabelValue
                    label="bankName"
                    value="bankName"
                    capatalize={true}
                  />
                  <LabelValue
                    label="bankBranch"
                    value="bankBranch"
                    capatalize={true}
                  />
                  <LabelValue
                    label="bankIFSCCode"
                    value="bankIfscCode"
                    uppercase={true}
                  />
                </Row>
              </div>
              <div className="item p-4 mt-4 pb-1 myprofile-container">
                <div className="d-flex flex-row align-items-center title m-0 p-0">
                  <div className="align-self-start">
                    <ProfessionalFinancialIcon
                      fill="#28252e"
                      width="20"
                      height="20"
                    />
                  </div>
                  <h4 className="ms-2 mb-0">
                    {t(
                      'applicantFinancialInformation:professionalandotherfinancialinformation'
                    )}
                  </h4>
                </div>
                <Row className="pt-0 profession-info-row row-cols-lg-3">
                  <Col className="col-sm-12 col-md-6 col-lg-4 mb-2 ">
                    <Card className="border-0">
                      <Card.Body>
                        <InputForm
                          label={t('applicantFinancialInformation:occupation')}
                          lablevalue={captalizeEveryWordOfSentence(
                            OCCUPATION_VALUE[financialInfo?.occupation]
                          )}
                          type="text"
                          required
                          isView={true}
                          readOnly={true}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  {OccupationBasedForm(occupation)}
                </Row>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <NotAllowed
          note="You are not able to see any financial information since you havent completed loan application."
          onButtonClick={onCompleteApplicationButtonClick}
        />
      )}
    </>
  );
};
export default FinancialInformation;
