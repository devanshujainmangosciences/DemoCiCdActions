/**
 * This Component renders a Form to Create a new VBC Drug Schedule or Update a existing schedule.
 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Form, Container} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import GoBack from '@/components/GoBack';
import {drugsList, updateMedicationScheduleByCycleNo} from '@/actions';
import {Routes} from '@/routes';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const NewVbcDrugSchedule = () => {
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const initialState = {
    cycleNo: '',
    drugId: '',
    id: '',
    mangoGrantAmount: '',
    marketPrice: '',
    percentageOfRebate: '',
    paidCycle: false,
    paidCycleHtml: '',
  };
  const [isView, setisView] = useState(false);
  const [scheduleState, setscheduleState] = useState(initialState);
  const {
    cycleNo,
    drugId,
    marketPrice,
    percentageOfRebate,
    mangoGrantAmount,
    paidCycle,
  } = scheduleState;
  const dispatch = useAppDispatch();
  const drugListRedux = useAppSelector((state) => state.template.drugList);

  const schedule_id = urlParams.id;
  const stateRecieved = location.state;

  /**
   * The function updates the state of a schedule object with the new value of a specific input field.
   */
  const onHandleValueChange = (e) => {
    setscheduleState({...scheduleState, [e.target.name]: e.target.value});
  };
  const onHandleToggleValueChange = (name, value) => {
    setscheduleState({...scheduleState, [name]: value});
  };
  /**
   * This function handles form submission and updates medication schedule by cycle number if schedule_id
   * exists, otherwise it logs a message.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schedule_id) {
      const reqData = {...scheduleState};
      delete reqData.cumulativeAmount;
      delete reqData.payout;
      const onCustomSuccess = (drugId) => {
        if (drugId)
          history(Routes.VbcDrugSchedule.path, {state: {drugId: drugId}});
      };
      // delete reqData.mangoGrantAmount;
      dispatch(updateMedicationScheduleByCycleNo(reqData, onCustomSuccess));
    } else {
      // console.log('CREATE NEW=>', vbcScheduleData);
    }
  };

  /* This is a `useEffect` hook that runs when the component mounts and whenever the value of
`drugListRedux` changes. It checks if `drugListRedux` is falsy (i.e. not yet loaded) and if so, it
dispatches the `drugsList` action to fetch the list of drugs. This ensures that the drugs list is
loaded before the component renders and prevents any errors that may occur if the list is not yet
available. */
  useEffect(() => {
    if (!drugListRedux) dispatch(drugsList());
  }, [drugListRedux]);

  /* This is a useEffect hook that runs when the component mounts and whenever the values of
`schedule_id` or `stateRecieved` change. */
  useEffect(() => {
    if (schedule_id && stateRecieved?.item) {
      setscheduleState(stateRecieved?.item);
    }
    if (stateRecieved?.type && stateRecieved?.type === 'View Details') {
      setisView(true);
    }
  }, [schedule_id, stateRecieved]);

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>{schedule_id ? 'Update PBP Schedule' : 'Create PBP Schedule'}</h3>
        <Form className="add-form">
          <Row>
            <Col>
              <Form.Group controlId="drugId">
                <Form.Label>Selected Drug</Form.Label>
                <Form.Control
                  value={drugId}
                  name="drugId"
                  onChange={onHandleValueChange}
                  required
                  disabled={true}
                  as="select">
                  <option value="" hidden>
                    Select Drug
                  </option>

                  {drugListRedux &&
                    drugListRedux.map((drug) => (
                      <option value={drug?.id} key={drug?.id}>
                        {drug?.brandName}-{drug?.drugGenericName}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cycleNumber">
                <Form.Label>Cycle Number</Form.Label>
                <Form.Control
                  value={cycleNo}
                  name="cycleNo"
                  onChange={onHandleValueChange}
                  required
                  disabled={true}
                  type="text"
                  placeholder="Enter Cycle Number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mrp">
                <Form.Label>MRP</Form.Label>
                <Form.Control
                  value={marketPrice}
                  name="marketPrice"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter MRP"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="rebate">
                <Form.Label>Rebate%</Form.Label>
                <Form.Control
                  value={percentageOfRebate}
                  name="percentageOfRebate"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter rebate(%)"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mangogrant">
                <Form.Label>Mango Grant Amount</Form.Label>
                <Form.Control
                  value={mangoGrantAmount}
                  name="mangoGrantAmount"
                  onChange={onHandleValueChange}
                  required
                  disabled={isView}
                  type="text"
                  placeholder="Enter Mango Grant Amount"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mangogrant">
                <Form.Label>Paid Cycle</Form.Label>

                <div
                  className={`toggle-container mt-2 ${
                    paidCycle ? 'bg-patient' : ''
                  }`}
                  onClick={() =>
                    onHandleToggleValueChange('paidCycle', !paidCycle)
                  }>
                  <p className="float-end p-0 m-0 text-white left">
                    {' '}
                    {!paidCycle && 'No'}
                  </p>
                  <div
                    className={`dialog-button ${
                      paidCycle ? '' : 'disabled'
                    }`}></div>
                  <p className="float-start text-white p-0 m-0 right">
                    {' '}
                    {paidCycle && 'Yes'}
                  </p>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex gap-2">
            <GoBack>
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="button">
                Back
              </button>
            </GoBack>
            <button
              className="btn-patient-theme-small bg-dark px-4"
              type="submit"
              onClick={handleSubmit}>
              {schedule_id ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default NewVbcDrugSchedule;
