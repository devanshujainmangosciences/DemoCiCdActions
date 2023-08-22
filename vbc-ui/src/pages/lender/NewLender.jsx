/**
 * This Component renders a Form to Create a new Lender or Update a existing Lender.
 * This Component gets showLender, Lender, manufacturersList, readManufacturers
 * from Redux as props and  match, history is mapped to props
 * which is used to navigate and get url details.
 * This component reads the Lender id if it is present in url and retrieve the Lender
 * details with Lender id and allow the user to edit
 */
import React, {useState, useEffect} from 'react';
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  Card,
} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  createLender,
  drugsList,
  getCitiesFromStateId,
  getMasterData,
  setToast,
  showLender,
  updateLender,
  readRoleList,
  resetSelectedLender,
} from '@/actions';
import {Routes} from '@/routes';
import GoBack from '@/components/GoBack';
import InputForm from '@/pages/profile/children/InputForm';
import {
  getDrugLenderReqData,
  isArrayLengthEqual,
  returnMasterDataSelectValues,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import {
  dateData,
  dateOrDayOption,
  dayData,
  lastWeekData,
  paymentFrequencyData,
  paymentFrequencyType,
  rebateAmountPaidOption,
  subventionAmountPaidOption,
  weekData,
} from '@/data/staticOptionData';
import RoutePage from '@/components/RoutePage';
import {Can} from '@/components';
import LenderDrugMapping from '@/components/LenderDrugMapping';
import {
  tableLenderDrugConfig,
  tableLenderDrugConfigView,
} from '@/config/lenderDrugMapping';
import {ALERT_MESSAGE, MASTER_DATA_STATE_COUNTRY} from '../../constants';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const NewLender = (props) => {
  const {t} = useTranslation(['newLender', 'loanApplication', 'viewLender']);
  const {showLender, user, readRoleList, roleList} = props;
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [paySubventionTo, setpaySubventionTo] = useState('PATIENT');
  const [grantPaymentDate, setgrantPaymentDate] = useState(0);
  const [grantPaymentDay, setgrantPaymentDay] = useState('MONDAY');
  const [grantPaymentWeek, setgrantPaymentWeek] = useState(5);
  const [paymentFrequency, setpaymentFrequency] = useState('PER_CYCLE');
  const [dayDate, setDayDate] = useState('DATE');
  const [payRebateTo, setpayRebateTo] = useState('PATIENT');
  const [isView, setisView] = useState(false);
  const masterData = useAppSelector((state) => state.template.masterData);
  const drugs = useAppSelector((state) => state.template.drugList);
  const [drugList, setDrugList] = useState([]);
  const [drugLenderData, setdrugLenderData] = useState([]);

  const [grantPayoutBankDetails, setgrantPayoutBankDetails] = useState({
    accountNumber: '',
    bankIfscCode: '',
    bankBranch: '',
    bankName: '',
    accountType: 'GRANT',
  });
  const [rebatePayoutBankDetails, setrebatePayoutBankDetails] = useState({
    accountNumber: '',
    bankIfscCode: '',
    bankBranch: '',
    bankName: '',
    accountType: 'REBATE',
  });
  const dispatch = useAppDispatch();
  const user_id = urlParams.id;
  const stateRecieved = location.state;

  /* This `useEffect` hook in a React component to set up a cleanup function that
will be called when the component unmounts. The cleanup function dispatches an action to reset the
selected lender using the `resetSelectedLender` function. The empty dependency array `[]` passed as
the second argument to `useEffect` ensures that the cleanup function is only called once, when the
component mounts. */
  useEffect(() => {
    return () => {
      dispatch(resetSelectedLender());
    };
  }, []);

  /** The below code is using the `useEffect` hook in a React component to update the `drugList` state
variable based on the `drugs` prop. If `drugs` is falsy, it dispatches a `drugsList` action with a
`false` argument. If `drugs` is truthy, it maps over the `drugs` array to create a new array of
objects with `id`, `label`, and `value` properties, and sets the `drugList` state variable to this
new array. The `useEffect` hook is triggered whenever */
  useEffect(() => {
    if (!drugs) {
      dispatch(drugsList(false));
    } else {
      setDrugList(
        drugs
          .map((drug) => ({
            id: drug.id,
            label: `${drug.brandName}-${drug.drugGenericName}`,
            value: drug.id,
            visible: drug.visible,
          }))
          .filter((drug) => drug.visible)
      );
    }
  }, [drugs]);
  // console.log('DRUGS=>', drugs);
  /**
   * Lifecycle to get the master data if not avaliable in the complete profile page
   */
  useEffect(() => {
    if (!masterData?.countries)
      dispatch(getMasterData(MASTER_DATA_STATE_COUNTRY));
  }, [masterData]);
  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * readRoleList Action if roleList is null
   */
  useEffect(() => {
    if (!roleList) {
      readRoleList();
    }
  }, [readRoleList, roleList]);

  /**
   * This Callback will set Lender details to corresponding
   * states if Lender and Lender id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (user && user_id) {
      setName(user.lenderName);
      setAddress(user.lenderAddress);
      const relatedState = masterData.states.find(
        (state) => state.name === user.lenderState
      );
      const customSuccessCallback = () => {
        setCity(user?.lenderCity);
      };
      if (relatedState)
        dispatch(
          getCitiesFromStateId(
            relatedState?.id,
            'cities',
            customSuccessCallback
          )
        );

      setState(user.lenderState);
      setCountry(user.lenderCountry);
      setpaySubventionTo(
        user?.paySubventionTo ? user?.paySubventionTo : 'PATIENT'
      );
      setpayRebateTo(user?.payRebateTo ? user?.payRebateTo : 'PATIENT');
      setpaymentFrequency(user?.paymentFrequency);
      setgrantPayoutBankDetails(getBankDetails(user?.bankDetails, 'GRANT'));
      setrebatePayoutBankDetails(getBankDetails(user?.bankDetails, 'REBATE'));
      if (user?.grantPaymentDate) {
        setDayDate('DATE');
        setgrantPaymentDate(user?.grantPaymentDate);
      } else {
        setDayDate(5);
        setgrantPaymentDay(user?.grantPaymentDay);
        setgrantPaymentWeek(user?.grantPaymentWeek);
      }
    } else {
      setName('');
      setAddress('');
      setCity('');
      setState('');
      setCountry('');
    }
  }, [user, user_id, stateRecieved]);

  /**
   * Bank Details are the array of bank details saved.
   * Fetching the correct bankDetails according to the type and sending the bankDetails
   *
   * @param {Array} bankDetails
   * @param {String} type
   * @returns {Object}
   */
  const getBankDetails = (bankDetails, type) => {
    if (bankDetails && bankDetails.length > 0) {
      const requiredBankDetails = bankDetails.find(
        (bank) => bank.accountType === type
      );
      if (requiredBankDetails) return requiredBankDetails;
      else
        return {
          accountNumber: '',
          bankIfscCode: '',
          bankBranch: '',
          bankName: '',
          accountType: type,
        };
    } else
      return {
        accountNumber: '',
        bankIfscCode: '',
        bankBranch: '',
        bankName: '',
        accountType: type,
      };
  };

  /** The below code is using the `useEffect` hook in a React component. It is watching for changes in
  the `user_id` and `showLender` variables and running the `showLender` function with the `user_id`
  as an argument if `user_id` is truthy. This is likely used to update the component's state or
  render based on changes to the `user_id`. */
  useEffect(() => {
    if (user_id) {
      showLender(user_id);
    }
  }, [user_id, showLender]);

  /**
   * The function takes an array of bank details and returns a new array with capitalized account
   * numbers, IFSC codes, and capitalized every word of bank branch and bank name.
   * @returns The function `getCaptalizedBankDetails` returns an array of bank details objects with the
   * account number and bank IFSC code capitalized and the bank branch and bank name with every word
   * capitalized.
   * @param {Array} bankDetails
   */
  const getCaptalizedBankDetails = (bankDetails) => {
    const reqBankDetails = bankDetails.map((bank) => {
      return {
        ...bank,
        accountNumber: bank?.accountNumber
          ? bank?.accountNumber.toUpperCase()
          : null,
        bankIfscCode: bank?.bankIfscCode
          ? bank.bankIfscCode.toUpperCase()
          : null,
        bankBranch: captalizeEveryWordOfSentence(bank.bankBranch),
        bankName: captalizeEveryWordOfSentence(bank.bankName),
      };
    });
    return reqBankDetails;
  };

  /**
   * Submits the user entered details to the api,
   * if Lender id is null it will create Lender or this will update
   * the existing Lender with Lender id
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lenderName: captalizeEveryWordOfSentence(name),
      lenderAddress: captalizeEveryWordOfSentence(address),
      lenderCity: city,
      lenderState: state,
      lenderCountry: country,
      paySubventionTo,
      payRebateTo,
    };
    if (paySubventionTo === 'LENDER' && payRebateTo === 'LENDER') {
      data['bankDetails'] = [grantPayoutBankDetails, rebatePayoutBankDetails];
      data['paymentFrequency'] = paymentFrequency;
      if (paymentFrequency === 'MONTHLY') {
        if (dayDate === 'DATE') data['grantPaymentDate'] = grantPaymentDate;
        else {
          data['grantPaymentDay'] = grantPaymentDay;
          data['grantPaymentWeek'] = grantPaymentWeek ? grantPaymentWeek : 5;
        }
      }
    } else if (paySubventionTo === 'LENDER' && payRebateTo === 'PATIENT') {
      data['bankDetails'] = [grantPayoutBankDetails];
      data['paymentFrequency'] = paymentFrequency;
      if (paymentFrequency === 'MONTHLY') {
        if (dayDate === 'DATE') data['grantPaymentDate'] = grantPaymentDate;
        else {
          data['grantPaymentDay'] = grantPaymentDay;
          data['grantPaymentWeek'] = grantPaymentWeek ? grantPaymentWeek : 5;
        }
      }
    } else if (paySubventionTo === 'PATIENT' && payRebateTo === 'LENDER') {
      data['bankDetails'] = [rebatePayoutBankDetails];
    }

    if (paySubventionTo === 'LENDER' || payRebateTo === 'LENDER') {
      data['bankDetails'] = getCaptalizedBankDetails(data.bankDetails);
    }

    /**
     * This function redirects the user to the Lenders page upon successful completion of a task.
     */
    const customSuccessCallback = () => {
      history(Routes.Lenders.path);
    };

    // console.log('DATA=>', data);

    // console.log('DRUG LENDER DATA=>', drugLenderData);
    const reqData = getDrugLenderReqData(
      drugLenderData,
      'drugId',
      user_id,
      'lenderId'
    );
    // console.log('REQ DATA=>', reqData);
    data['lenderDrugGrantSet'] = reqData;
    if (!isArrayLengthEqual(reqData, drugList)) {
      dispatch(
        setToast(
          ALERT_MESSAGE.ALL_GRANT_LENDER_DATA_NOT_PRESENT,
          true,
          'warning'
        )
      );
      return;
    }

    if (user_id) {
      props.updateLender(user_id, data, customSuccessCallback);
    } else {
      props.createLender(data, customSuccessCallback);
    }
  };

  /**
   *
   * This function helps setting the value of the bank details for rebate and grant payout bank details
   * @param {String} value
   * @param {String} name
   * @param {String} state
   * @param {Function} setBankDetailsState
   */
  const onBankDetailsChange = (value, name, state, setBankDetailsState) => {
    setBankDetailsState({...state, [name]: value});
  };

  /**
   * This component render bank details for Grant/Subvention bank details and also for Rebate Bank Details,
   * title is the H6 element that we want to display
   * State is the state which we are perfoming change
   * setState is the callback function to change the state
   *
   * @param {Srting} title
   * @param {String} state
   * @param {Function} setState
   *
   */
  const renderBankDetails = (title, state, setState) => {
    return (
      <>
        <h6>{title ? title : 'Bank Account Details'}</h6>
        <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <Card className="border-0">
              <Card.Body>
                <InputForm
                  isView={false}
                  readOnly={isView}
                  label={t('loanApplication:bankAccountNumber')}
                  ipValue={state?.accountNumber}
                  lablevalue={state?.accountNumber}
                  name="accountNumber"
                  onChange={(e) =>
                    onBankDetailsChange(
                      e.target.value,
                      e.target.name,
                      state,
                      setState
                    )
                  }
                  required
                  warningText={t('loanApplication:requiredField')}
                  type="text"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <Card className="border-0">
              <Card.Body>
                <InputForm
                  isView={false}
                  readOnly={isView}
                  label={t('loanApplication:bankName')}
                  ipValue={state?.bankName}
                  lablevalue={state?.bankName}
                  name="bankName"
                  onChange={(e) =>
                    onBankDetailsChange(
                      e.target.value,
                      e.target.name,
                      state,
                      setState
                    )
                  }
                  required
                  type="text"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <Card className="border-0">
              <Card.Body>
                <InputForm
                  isView={false}
                  readOnly={isView}
                  label={t('loanApplication:bankBranch')}
                  ipValue={state?.bankBranch}
                  name="bankBranch"
                  lablevalue={state?.bankBranch}
                  onChange={(e) =>
                    onBankDetailsChange(
                      e.target.value,
                      e.target.name,
                      state,
                      setState
                    )
                  }
                  required
                  type="text"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <Card className="border-0">
              <Card.Body>
                <InputForm
                  isView={false}
                  readOnly={isView}
                  label={t('loanApplication:bankIFSCCode')}
                  ipValue={state?.bankIfscCode}
                  lablevalue={state?.bankIfscCode}
                  onChange={(e) =>
                    onBankDetailsChange(
                      e.target.value,
                      e.target.name,
                      state,
                      setState
                    )
                  }
                  name="bankIfscCode"
                  required
                  type="text"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  /**
   * This function adds new data to an array and updates the state, then calls a callback function.
   * @param {Object} data
   * @param {Function} callback
   */
  const onAddDrugLender = (data, callback) => {
    // console.log('DATA=>', data);
    const newData = [...drugLenderData];
    newData.push(data);
    setdrugLenderData(newData);
    callback();
  };

  // console.log('DRUG LENDER DATA=>', drugLenderData);

  return (
    <>
      <Form className="lender-container " onSubmit={handleSubmit}>
        <h3>
          {user_id && isView
            ? t('View Lender')
            : user_id
            ? t('updateLender')
            : t('createLender')}
        </h3>

        <Container className="bg-white px-4 py-4 rounded mt-4">
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('name')}
                    type="text"
                    placeholder={t('enterName')}
                    isView={false}
                    readOnly={isView}
                    ipValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('address')}
                    type="text"
                    placeholder={t('enterAddress')}
                    isView={false}
                    readOnly={isView}
                    ipValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('country')}
                    type="select"
                    isView={false}
                    readOnly={isView}
                    ipValue={country}
                    onChange={(e) => setCountry(e.target.value)}
                    options={returnMasterDataSelectValues(
                      masterData?.countries
                    )}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('state')}
                    type="select"
                    isView={false}
                    readOnly={isView}
                    ipValue={state}
                    onChange={(e) => {
                      const value = e.target.value;
                      setState(value);
                      const relatedState =
                        masterData?.states &&
                        masterData.states.find((state) => state.name === value);

                      if (relatedState)
                        dispatch(
                          getCitiesFromStateId(relatedState?.id, 'cities')
                        );
                    }}
                    options={returnMasterDataSelectValues(masterData?.states)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('city')}
                    type="select"
                    isView={false}
                    readOnly={isView}
                    ipValue={city}
                    onChange={(e) => setCity(e.target.value)}
                    options={returnMasterDataSelectValues(masterData?.cities)}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="bg-white px-4 py-4 rounded mt-4">
          <h5 className="mb-3">Subvention/Grant Payout Details</h5>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t(
                      'Choose subvention / grant to be paid to patient or lender'
                    )}
                    type="radio"
                    isView={false}
                    readOnly={isView}
                    ipValue={paySubventionTo}
                    onChange={(e) => setpaySubventionTo(e.target.value)}
                    radioData={subventionAmountPaidOption}
                  />
                </Card.Body>
              </Card>
            </Col>
            {paySubventionTo === 'LENDER' && (
              <>
                <Col className="col-sm-12 col-md-6 col-lg-4">
                  <Card className="border-0">
                    <Card.Body>
                      <InputForm
                        label={t('Payment Frequency')}
                        type="select"
                        isView={false}
                        readOnly={isView}
                        ipValue={paymentFrequency}
                        onChange={(e) => setpaymentFrequency(e.target.value)}
                        options={paymentFrequencyData}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                {paymentFrequency === 'MONTHLY' && (
                  <>
                    <Col className="col-sm-12 col-md-6 col-lg-4">
                      <Card className="border-0">
                        <Card.Body>
                          <InputForm
                            label={t('Day/Last Weekday For Grant')}
                            type="select"
                            isView={false}
                            readOnly={isView}
                            ipValue={dayDate}
                            onChange={(e) => setDayDate(e.target.value)}
                            options={dateOrDayOption}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                    {dayDate === 'DATE' ? (
                      <Col className="col-sm-12 col-md-6 col-lg-4">
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('Date')}
                              type="select"
                              isView={false}
                              readOnly={isView}
                              ipValue={grantPaymentDate}
                              onChange={(e) =>
                                setgrantPaymentDate(e.target.value)
                              }
                              options={dateData}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    ) : (
                      <>
                        {' '}
                        <Col className="col-sm-12 col-md-6 col-lg-4">
                          <Card className="border-0">
                            <Card.Body>
                              <InputForm
                                label={t('Last Weekday')}
                                type="select"
                                isView={false}
                                readOnly={isView}
                                ipValue={grantPaymentDay}
                                onChange={(e) =>
                                  setgrantPaymentDay(e.target.value)
                                }
                                options={lastWeekData}
                              />
                            </Card.Body>
                          </Card>
                        </Col>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Row>

          {paySubventionTo === 'LENDER' &&
            renderBankDetails(
              'Grant Payout Bank Account Details',
              grantPayoutBankDetails,
              setgrantPayoutBankDetails
            )}
        </Container>

        <LenderDrugMapping
          apiData={user_id ? user : null}
          isView={isView}
          selectLabel={'Medication'}
          tableSelectValue="drugId"
          selectOptions={drugList}
          onAddDataClick={onAddDrugLender}
          setTableData={setdrugLenderData}
          tableConfig={
            isView ? tableLenderDrugConfigView : tableLenderDrugConfig
          }
          tableData={drugLenderData}
          containerClasses="bg-white px-4 py-4 rounded mt-4"
          addButtonClasses="mt-2"
        />

        <Container className="bg-white px-4 py-4 rounded mt-4">
          <h5 className="mb-3">Rebate Payout Details</h5>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label={t('Choose rebate to be paid to patient or lender')}
                    type="radio"
                    isView={false}
                    readOnly={isView}
                    ipValue={payRebateTo}
                    onChange={(e) => setpayRebateTo(e.target.value)}
                    radioData={rebateAmountPaidOption}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {payRebateTo === 'LENDER' &&
            renderBankDetails(
              'Rebate Payout Bank Account Details',
              rebatePayoutBankDetails,
              setrebatePayoutBankDetails
            )}
        </Container>
        <div className="d-flex gap-2 mt-3 ms-2">
          <GoBack>
            <button
              className="btn-patient-theme-small bg-dark px-4"
              type="button">
              {t('Back')}
            </button>
          </GoBack>
          {isView ? (
            <Can
              performingAction={{
                component: 'lender-listing',
                action: 'can view editDetails',
              }}>
              <RoutePage url={Routes.UpdateLender.path} id={user_id}>
                <button
                  className="btn-patient-theme-small bg-dark px-4"
                  type="button"
                  onClick={() => setisView(false)}>
                  Edit
                </button>
              </RoutePage>
            </Can>
          ) : (
            <button
              className="btn-patient-theme-small bg-dark px-4"
              type="submit"
              onSubmit={handleSubmit}>
              {user_id ? t('update') : t('add')}
            </button>
          )}
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.lenders.usersList,
  roleList: state.role.roleList,
  user: state.lenders.selectedUser,
});

const mapDispatchToProps = {
  createLender,
  showLender,
  updateLender,
  readRoleList,
};
NewLender.propTypes = {
  usersList: PropTypes.array,
  createLender: PropTypes.func,
  showLender: PropTypes.func,
  updateLender: PropTypes.func,
  readRoleList: PropTypes.func,
  roleList: PropTypes.array,
  user: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewLender);
