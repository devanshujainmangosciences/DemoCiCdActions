/**
 * This Component renders a Form to Create a new VBC Drug Schedule or Update a existing schedule.
Program_ID
Hospital_ID
Manufacturer_ID
VBC_Drug_ID
Program_Name
Program_Description
Indication
Program_Start_Date
Program_End_Date
Patient_Enrollment_Goal

 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Form, Container} from '@themesberg/react-bootstrap';
import {useAppSelector, useAppDispatch} from '@/redux/redux-hooks';
import {
  allManufacturers,
  createProgram,
  drugsList,
  showProgram,
  updateProgram,
} from '../../actions';
import {readHospitals} from '@/actions/hospitalActions';
import GoBack from '../../components/GoBack';
import RoutePage from '../../components/RoutePage';
import {Routes} from '@/routes';
import {Can} from '../../components';
import {useLocation, useParams} from 'react-router-dom';
import {actionTypes} from '@/constants';
const NewAdminVbcProgram = () => {
  const location = useLocation();
  const urlParams = useParams();
  const initialState = {
    programId: '',
    drugId: '',
    hospitalId: '',
    programName: '',
    programDescription: '',
    indication: '',
    programStartDate: '',
    programEndDate: '',
    patientEnrollmentGoal: '',
    manufacturerId: '',
    rebateEmailEnabled: false,
    autoCompleteAfterLastCycle: false,
    showSchedule: false,
  };
  const [vbcProgramData, setvbcProgramData] = useState(initialState);
  const [isView, setisView] = useState(false);
  const [manufacturerListState, setmanufacturerListState] = useState([]);
  const [hospitalListState, sethospitalListState] = useState([]);
  const [drugListState, setdrugListState] = useState([]);
  const selectedHospital = useAppSelector(
    (state) => state.hospitals.selectedHospital
  );
  const selectedProgramRedux = useAppSelector(
    (state) => state.admin.selectedProgram
  );
  const hospitalList = useAppSelector((state) => state.hospitals.hospitalsList);
  const manufacturersList = useAppSelector(
    (state) => state.manufacturers.manufacturer
  );
  const drugList = useAppSelector((state) => state.template.drugList);

  const {
    drugId,
    hospitalId,
    indication,
    manufacturerId,
    patientEnrollmentGoal,
    programDescription,
    programEndDate,
    programName,
    programStartDate,
    rebateEmailEnabled,
    autoCompleteAfterLastCycle,
    showSchedule,
  } = vbcProgramData;

  const dispatch = useAppDispatch();
  const schedule_id = urlParams.id;
  const stateRecieved = location.state;
  // console.log('SELECTED HOSPITAL=>', selectedHospital, schedule_id);
  // console.log('VBC PROGRAM DATA=>', vbcProgramData);

  /**
   * This useEffect hook is used to dispatch the readHospitals, drugsList and allManufacturers functions and also to set the showHospital payload to null when the component unmounts.
   */
  useEffect(() => {
    dispatch(readHospitals(0, 99999));
    dispatch(drugsList());
    dispatch(allManufacturers());
    return () => {
      dispatch({
        type: actionTypes.SET_SHOW_HOSPITAL,
        payload: null,
      });
    };
  }, []);

  /** The above code is using the `useEffect` hook in a React component to update the `vbcProgramData`
state object when the `selectedHospital` state object changes. Specifically, if `selectedHospital`
is truthy and `schedule_id` is falsy, the `hospitalId` property of `vbcProgramData` is set to the
`id` property of `selectedHospital`. */
  useEffect(() => {
    if (selectedHospital && !schedule_id)
      setvbcProgramData({...vbcProgramData, hospitalId: selectedHospital.id});
  }, [selectedHospital]);

  /** The above code is using the `useEffect` hook in a React component to update the state of
`drugListState`, `hospitalListState`, and `manufacturerListState` based on the values of `drugList`,
`hospitalList`, and `manufacturersList`. The `useEffect` hook is triggered whenever any of these
values change. */
  useEffect(() => {
    if (drugList && hospitalList && manufacturersList) {
      setdrugListState(drugList);
      sethospitalListState(hospitalList);
      setmanufacturerListState(manufacturersList);
    }
  }, [drugList, hospitalList, manufacturersList]);
  // console.log('STORE LIST=>', hospitalList, drugList, manufacturersList);
  // console.log(
  //   ' state=>',
  //   hospitalListState,
  //   drugListState,
  //   manufacturerListState
  // );

  /**
   * To Chnage the input value by targeting the name as the state value
   * @param {*} e
   */
  const onHandleValueChange = (e) => {
    setvbcProgramData({...vbcProgramData, [e.target.name]: e.target.value});
  };

  const onHandleToggleValueChange = (fieldName, value) => {
    if (!isView) {
      setvbcProgramData({...vbcProgramData, [fieldName]: value});
    }
  };

  /**
   * This function handles the submission of a form and either updates or creates a program based on the
   * presence of a schedule ID.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schedule_id) {
      // console.log('UPDATE=>', vbcProgramData);
      dispatch(updateProgram(vbcProgramData, schedule_id));
    } else {
      // console.log('CREATE NEW=>', vbcProgramData);
      dispatch(createProgram(vbcProgramData));
    }
  };

  /** The below code is a React useEffect hook that is triggered when the `selectedProgramRedux` variable
 changes. It creates a new object `reqData` by spreading the properties of `selectedProgramRedux`
 and adding some additional properties such as `drugId`, `hospitalId`, and `manufacturerId`. It then
 sets the state of `vbcProgramData` to the new `reqData` object. */
  useEffect(() => {
    if (selectedProgramRedux) {
      const reqData = {
        ...selectedProgramRedux,
        // programId: selectedProgramRedux?.id,
        drugId: selectedProgramRedux?.vbcDrugMaster?.id,
        hospitalId: selectedProgramRedux?.hospital?.id,
        manufacturerId: selectedProgramRedux?.manufacturer?.id,
      };
      setvbcProgramData(reqData);
    }
  }, [selectedProgramRedux]);

  /** 
   * The below code is using the `useEffect` hook in a React component to perform some actions based on
  changes to the `schedule_id` and `stateRecieved` variables. 
  */
  useEffect(() => {
    if (schedule_id) dispatch(showProgram(schedule_id));
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (!schedule_id && !selectedHospital) setvbcProgramData(initialState);
  }, [schedule_id, stateRecieved]);

  /**
   * Used to create options for drugs drop-down
   * @param {Array} drugs
   * @returns List of Option UOI
   */
  const renderDrugOptions = (drugs) =>
    drugs &&
    drugs.length > 0 &&
    drugs.map((drug) => (
      <option key={drug.id} value={drug.id}>
        {`${drug.brandName}-${drug.drugGenericName}`}
      </option>
    ));
  /**
   * This is used to create option UI for manufacturer drop down
   * @param {Array} manufacturers
   *
   */
  const renderManufacturerOptions = (manufacturers) =>
    manufacturers &&
    manufacturers.length > 0 &&
    manufacturers.map((manufacturer) => (
      <option key={manufacturer.id} value={manufacturer.id}>
        {manufacturer.manufacturerName}
      </option>
    ));

  /**
   * This is used to create Option UI for hosptials dropdown
   * @param {Array} hospitals
   *
   */
  const renderHospitalOptions = (hospitals) =>
    hospitals &&
    hospitals.length > 0 &&
    hospitals.map((hospital) => (
      <option key={hospital.id} value={hospital.id}>
        {hospital.hospitalName}
      </option>
    ));

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>
          {schedule_id && isView
            ? 'PBP Program'
            : schedule_id
            ? 'Update PBP Program'
            : 'Create PBP Program'}
        </h3>
        <Form className="add-form">
          <Row>
            <Col>
              <Form.Group controlId="drugId">
                <Form.Label>Medication</Form.Label>
                <Form.Control
                  value={drugId}
                  name="drugId"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  as="select">
                  <option value="" hidden>
                    Select Medication
                  </option>
                  {renderDrugOptions(drugListState)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="hospitalId">
                <Form.Label>Hospital</Form.Label>
                <Form.Control
                  value={hospitalId}
                  name="hospitalId"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  as="select">
                  <option value="" hidden>
                    Select Hospital
                  </option>
                  {renderHospitalOptions(hospitalListState)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="manufacturerId">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  value={manufacturerId}
                  name="manufacturerId"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  as="select">
                  <option value="" hidden>
                    Select Manufacturer
                  </option>
                  {renderManufacturerOptions(manufacturerListState)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="indication">
                <Form.Label>Indication</Form.Label>
                <Form.Control
                  value={indication}
                  name="indication"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter Indication"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="programName">
                <Form.Label>Program Name</Form.Label>
                <Form.Control
                  value={programName}
                  name="programName"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter Program Name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="programDescription">
                <Form.Label>Program Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={programDescription}
                  name="programDescription"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter Program Description"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="programStartDate">
                <Form.Label>Program Start Date</Form.Label>
                <Form.Control
                  value={programStartDate}
                  name="programStartDate"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="date"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="programEndDate">
                <Form.Label>Program End Date</Form.Label>
                <Form.Control
                  value={programEndDate}
                  name="programEndDate"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="date"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="patientEnrollmentGoal">
                <Form.Label>Rebate %</Form.Label>
                <Form.Control
                  value={patientEnrollmentGoal}
                  name="patientEnrollmentGoal"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter rebate(%)"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="programStartDate">
                <Form.Label>Rebate Email</Form.Label>
                <div
                  className={`toggle-container mt-2 ms-1 ${
                    !isView ? '' : 'pe-none'
                  } ${rebateEmailEnabled ? 'bg-patient' : ''}`}
                  onClick={() =>
                    onHandleToggleValueChange(
                      'rebateEmailEnabled',
                      !rebateEmailEnabled
                    )
                  }>
                  <p className="float-end p-0 m-0 text-white left">
                    {' '}
                    {!rebateEmailEnabled && 'No'}
                  </p>
                  <div
                    className={`dialog-button ${
                      rebateEmailEnabled ? '' : 'disabled'
                    }`}></div>
                  <p className="float-start text-white p-0 m-0 right">
                    {' '}
                    {rebateEmailEnabled && 'Yes'}
                  </p>
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="programStartDate">
                <Form.Label>Auto-complete</Form.Label>

                <div
                  className={`toggle-container mt-2 ms-1 ${
                    !isView ? '' : 'pe-none'
                  } ${autoCompleteAfterLastCycle ? 'bg-patient' : ''}`}
                  onClick={() =>
                    onHandleToggleValueChange(
                      'autoCompleteAfterLastCycle',
                      !autoCompleteAfterLastCycle
                    )
                  }>
                  <p className="float-end p-0 m-0 text-white left">
                    {' '}
                    {!autoCompleteAfterLastCycle && 'No'}
                  </p>
                  <div
                    className={`dialog-button ${
                      autoCompleteAfterLastCycle ? '' : 'disabled'
                    }`}></div>
                  <p className="float-start text-white p-0 m-0 right">
                    {' '}
                    {autoCompleteAfterLastCycle && 'Yes'}
                  </p>
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="programStartDate">
                <Form.Label>Show PBP Schedule</Form.Label>
                <div
                  className={`toggle-container mt-2 ms-1 ${
                    !isView ? '' : 'pe-none'
                  } ${showSchedule ? 'bg-patient' : ''}`}
                  onClick={() =>
                    onHandleToggleValueChange('showSchedule', !showSchedule)
                  }>
                  <p className="float-end p-0 m-0 text-white left">
                    {' '}
                    {!showSchedule && 'No'}
                  </p>
                  <div
                    className={`dialog-button ${
                      showSchedule ? '' : 'disabled'
                    }`}></div>
                  <p className="float-start text-white p-0 m-0 right">
                    {' '}
                    {showSchedule && 'Yes'}
                  </p>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex gap-2 mt-2">
            <GoBack>
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="button">
                Back
              </button>
            </GoBack>

            {isView ? (
              <Can
                performingAction={{
                  component: 'program-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage url={Routes.EditVbcProgram.path} id={schedule_id}>
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
                onClick={handleSubmit}>
                {schedule_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};

export default NewAdminVbcProgram;
