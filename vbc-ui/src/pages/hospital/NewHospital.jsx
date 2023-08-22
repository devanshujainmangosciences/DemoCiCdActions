/**
 * This Component renders a Form to Create a new hospital or Update a existing hospital.
 * This Component gets showHospital, hospital from Redux store as props and match, history, is mapped to props
 * which is used to navigate and get url details.
 * This component reads the hospital id if it is present in url and retrieve the hospital
 * details with hospital id and allow the user to edit
 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Form, Button, Card} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {Routes} from '@/routes';
import PropTypes from 'prop-types';
import {
  createHospital,
  showHospital,
  updateHospital,
  readHospitals,
} from '@/actions/hospitalActions';
import {useTranslation} from 'react-i18next';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import InputForm from '@/pages/profile/children/InputForm';
import {getCitiesFromStateId, getMasterData} from '@/actions';
import GoBack from '@/components/GoBack';
import {Can} from '@/components';
import RoutePage from '@/components/RoutePage';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {actionType, MASTER_DATA_STATE_COUNTRY} from '../../constants';
import {tableHeadersHospitalsHandsOnTable} from '@/config';
import {
  validateCommaSeperatedIP,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import {CustomModal} from '@/components';
const {SET_CREATE_HOSPITAL, SET_UPDATE_HOSPITAL} = actionTypes;

const NewHospital = (props) => {
  const {showHospital, hospital} = props;
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const {t} = useTranslation(['hospitals']);
  const dispatch = useAppDispatch();
  const masterData = useAppSelector((state) => state.template.masterData);
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalLegalName, setHospitalLegalName] = useState('');
  const [hospitalCity, setHospitalCity] = useState('');
  const [hospitalState, setHospitalState] = useState('');
  const [hospitalCountry, setHospitalCountry] = useState('');
  const [hospitalGroupName, setHospitalGroupName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalPincode, setHospitalPincode] = useState(0);
  const [partOfGroup, setPartofGroup] = useState(false);
  const [gstNumber, setGstNumber] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState('');
  const [noOfBeds, setNoOfBeds] = useState(0);
  const [noOfOncologyBeds, setNoOfOncologyBeds] = useState(0);
  // const [allowedIps, setAllowedIps] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [isView, setisView] = useState(false);
  const [isHandsonCreateTable, setIsHandsonCreateTable] = useState(false);
  // const [ipError, setipError] = useState(false);

  const hospital_id = urlParams.id;
  const stateRecieved = location.state;

  /**
   * Lifecycle to get the master data if not avaliable in the complete profile page
   */
  useEffect(() => {
    if (!masterData?.countries)
      dispatch(getMasterData(MASTER_DATA_STATE_COUNTRY));
  }, [masterData]);
  /**
   * This Callback will set hospital details to corresponding
   * states if hospital and hospital id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === actionType.VIEW) setisView(true);
    else if (stateRecieved && stateRecieved === actionType.MULTIPLE_CREATE)
      setIsHandsonCreateTable(true);
    if (hospital && hospital_id && masterData?.states) {
      if (hospital?.hospitalState) {
        const relatedState = masterData.states.find(
          (state) => state.name === hospital.hospitalState
        );

        if (relatedState)
          dispatch(getCitiesFromStateId(relatedState?.id, 'cities'));
      }
      setHospitalName(hospital.hospitalName);
      setHospitalCity(hospital.hospitalCity);
      setHospitalState(hospital.hospitalState);
      setHospitalCountry(hospital.hospitalCountry);
      setHospitalGroupName(hospital.hospitalGroupName);
      setHospitalAddress(hospital.hospitalAddress1);
      setHospitalLegalName(hospital.hospitalLegalName);
      setHospitalPincode(hospital.pincode);
      setPartofGroup(hospital.partOfGroup);
      setGstNumber(hospital.gstNumber);
      setInvoiceDetails(hospital.invoiceDetails);
      setNoOfBeds(hospital.noOfBeds);
      setNoOfOncologyBeds(hospital.noOfOncologyBeds);
      // setAllowedIps(hospital.allowedIps.join(','));
    } else {
      setHospitalName('');
      setHospitalCity('');
      setHospitalState('');
      setHospitalCountry('');
      setHospitalGroupName('');
      setHospitalLegalName('');
      setHospitalPincode('');
      setPartofGroup('');
      setGstNumber('');
      setInvoiceDetails('');
      setNoOfBeds('');
      setNoOfOncologyBeds('');
      setHospitalAddress('');
      // setAllowedIps('');
    }
  }, [hospital, hospital_id, stateRecieved]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * showhospital Action if hospital_id is present
   */
  useEffect(() => {
    if (hospital_id) {
      showHospital(hospital_id);
    }
  }, [hospital_id, showHospital]);

  /**
   * Submits the user entered details to the api,
   * if hospital id is null it will create hospital or this will update
   * the existing hospital with hospital id
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hospitalName: captalizeEveryWordOfSentence(hospitalName),
      hospitalLegalName: captalizeEveryWordOfSentence(hospitalLegalName),
      hospitalCity: hospitalCity,
      hospitalState: hospitalState,
      hospitalCountry: hospitalCountry,
      hospitalGroupName: captalizeEveryWordOfSentence(hospitalGroupName),
      hospitalAddress1: captalizeEveryWordOfSentence(hospitalAddress),
      hospitalAddress2: hospitalState,
      hospitalAddress3: hospitalCountry,
      partOfGroup: partOfGroup,
      noOfOncologyBeds: parseInt(noOfOncologyBeds),
      noOfBeds: parseInt(noOfBeds),
      invoiceDetails: invoiceDetails,
      pincode: hospitalPincode,
      gstNumber: gstNumber,
      // allowedIps: allowedIps.split(','),
    };
    if (hospital_id) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        history(Routes.Hospitals.path);
        readHospitals();
        return {
          type: SET_UPDATE_HOSPITAL,
          payload: response.data,
        };
      };
      props.updateHospital(hospital_id, data, onSuccess);
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          // dispatch(setToast(response.message, true, 'success'));
          setshowModal(true);
        }
        // history(Routes.Hospitals.path);
        readHospitals();
        return {
          type: SET_CREATE_HOSPITAL,
          payload: response.data,
        };
      };
      // console.log('DATA=>', data);
      props.createHospital(data, onSuccess);
    }
  };

  /**
   * This function returns an array of objects with specific properties based on the input array, or a
   * default object if the input is empty.
   * @returns The function `returnMasterDataSelectValues` returns an array of objects with `id`, `label`,
   * and `value` properties. If `masterValue` is truthy, it maps over the array and returns an object for
   * each element with the `id` property set to the element's `id`, the `label` property set to the
   * element's `name`, and the `value`
   * @param {Array} masterValue
   */
  const returnMasterDataSelectValues = (masterValue) => {
    if (masterValue) {
      const requiredValues = masterValue.map((data) => {
        return {
          id: data?.id,
          label: data?.name,
          value: data?.name,
        };
      });
      return requiredValues;
    } else
      return [
        {
          id: 1,
          label: 'No Data!',
          value: '',
        },
      ];
  };
  /**
   * To save the data changeds
   * @param {Array} data
   */
  // const onSaveChanges = (data) => {
  //   console.log('DATA=>', data);
  // };

  // const ipValidator = (e) => {
  //   const value = e.target.value;
  //   setipError(validateCommaSeperatedIP(value));
  //   setAllowedIps(value);
  // };

  /**
   * The function redirects the user to a new VBC program page when the confirm button is clicked.
   */
  const onConfirmClick = () => {
    history(Routes.NewVbcProgram.path);
  };

  /**
   * This function sets the state of showModal to false and redirects to the Hospitals page.
   */
  const onModalClose = () => {
    setshowModal(false);
    history(Routes.Hospitals.path);
  };

  return (
    <div className="page-container p-4 mt-4 myprofile-container">
      <CustomModal
        Show={showModal}
        title={t('hospitalCreateSuccess')}
        handleClose={onModalClose}>
        <p>{t('createPbpProgram')}</p>
        <Button
          variant="success"
          type="button"
          onClick={onConfirmClick}
          className="mt-3">
          {t('confirm')}
        </Button>
      </CustomModal>
      <h3>
        {hospital_id && isView
          ? 'View Hospital'
          : hospital_id
          ? 'Update Hospital'
          : isHandsonCreateTable
          ? 'Create Hospitals'
          : 'Create Hospital'}
      </h3>
      {isHandsonCreateTable ? (
        <div className="mt-3">
          <div>
            Paste the data of excel sheet below and click on save button(make
            sure to copy the rows in same order)
          </div>
          <div className="mt-3">
            {/* <HandsOnTable
              tableHeadersData={tableHeadersHospitalsHandsOnTable}
              tableData={[]}
              isDiscardButton={false}
              onSaveChanges={onSaveChanges}
              height="auto"
            /> */}
          </div>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalName')}
                    type="text"
                    isView={false}
                    placeholder="Enter Hospital Name"
                    ipValue={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalAddress')}
                    placeholder="Enter Hospital Group Name"
                    type="text"
                    isView={false}
                    ipValue={hospitalAddress}
                    onChange={(e) => setHospitalAddress(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalCountry')}
                    placeholder="Enter Hospital Country"
                    type="select"
                    isView={false}
                    ipValue={hospitalCountry}
                    onChange={(e) => setHospitalCountry(e.target.value)}
                    options={returnMasterDataSelectValues(
                      masterData?.countries
                    )}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalState')}
                    placeholder="Enter Hospital State"
                    type="select"
                    isView={false}
                    ipValue={hospitalState}
                    onChange={(e) => {
                      const value = e.target.value;
                      setHospitalState(value);
                      const relatedState = masterData.states.find(
                        (state) => state.name === value
                      );

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
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalCity')}
                    placeholder="Enter Hospital City"
                    type="select"
                    isView={false}
                    ipValue={hospitalCity}
                    onChange={(e) => setHospitalCity(e.target.value)}
                    options={returnMasterDataSelectValues(masterData?.cities)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalPincode')}
                    placeholder="Enter Hospital Pincode"
                    type="text"
                    isView={false}
                    ipValue={hospitalPincode}
                    onChange={(e) => setHospitalPincode(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalGroupName')}
                    placeholder="Enter Hospital Group Name"
                    type="text"
                    isView={false}
                    ipValue={hospitalGroupName}
                    onChange={(e) => setHospitalGroupName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('hospitalLegalName')}
                    placeholder="Enter Hospital Legal Name"
                    type="text"
                    isView={false}
                    ipValue={hospitalLegalName}
                    onChange={(e) => setHospitalLegalName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('gstNumber')}
                    placeholder="Enter Hospital GST Number"
                    type="text"
                    isView={false}
                    ipValue={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('invoiceDetails')}
                    placeholder="Enter Hospital Invoice Details"
                    type="text"
                    isView={false}
                    ipValue={invoiceDetails}
                    onChange={(e) => setInvoiceDetails(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('noofBeds')}
                    placeholder="Enter Number of Beds"
                    type="number"
                    isView={false}
                    ipValue={noOfBeds}
                    onChange={(e) => setNoOfBeds(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('noofonCologyBeds')}
                    placeholder="Enter Number of On-Cology Beds"
                    type="number"
                    isView={false}
                    ipValue={noOfOncologyBeds}
                    onChange={(e) => setNoOfOncologyBeds(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            {/* <Col>
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    readOnly={isView}
                    label={t('Allowed IPs')}
                    placeholder="Enter Allowed IPs"
                    type="text"
                    isView={false}
                    ipValue={allowedIps}
                    warningText="Please enter correct IP seperated by comma"
                    isInvalid={ipError}
                    onChange={(e) => ipValidator(e)}
                  />
                </Card.Body>
              </Card>
            </Col> */}

            <Col className="ms-4 align-self-center">
              <Card className="border-0">
                <Card.Body>
                  <Form.Check
                    disabled={isView}
                    type="checkbox"
                    className="p-0"
                    value={partOfGroup}
                    checked={partOfGroup}
                    onChange={() => setPartofGroup(!partOfGroup)}
                    label={t('partofGroup')}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="d-flex gap-2 mt-2">
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
                  component: 'hospital-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage url={Routes.UpdateHospital.path} id={hospital_id}>
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
                // disabled={ipError}
                onSubmit={handleSubmit}>
                {hospital_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  hospitalsList: state.hospitals.hospitalsList,
  hospital: state.hospitals.selectedHospital,
});

const mapDispatchToProps = {
  createHospital,
  showHospital,
  updateHospital,
};

NewHospital.propTypes = {
  hospitalsList: PropTypes.array,
  createHospital: PropTypes.func,
  showHospital: PropTypes.func,
  updateHospital: PropTypes.func,
  hospital: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewHospital);
