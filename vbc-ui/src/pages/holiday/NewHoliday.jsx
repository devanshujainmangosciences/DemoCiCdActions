/**
 * This Component renders a Form to Create a new VBC Drug Schedule or Update a existing schedule.


 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Form, Button, Container} from '@themesberg/react-bootstrap';
import {useAppDispatch} from '@/redux/redux-hooks';
import {addHoliday} from '@/actions';
import GoBack from '@/components/GoBack';
import {useLocation, useParams} from 'react-router-dom';

const NewHoliday = () => {
  const location = useLocation();
  const urlParams = useParams();
  const initialState = {
    data: '',
    remark: '',
    index: 0,
    month: 'JANUARY',
  };
  const [holidayData, setholidayData] = useState(initialState);

  const {data, remark} = holidayData;

  const dispatch = useAppDispatch();

  /**
   * This function updates the state of holidayData with the new value of the input field that triggered
   * the onChange event.
   */
  const onHandleValueChange = (e) => {
    setholidayData({...holidayData, [e.target.name]: e.target.value});
  };

  const schedule_id = urlParams.id;
  const stateRecieved = location.state;

  /**
   * This function handles the submission of a form to add or update a holiday.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schedule_id) {
      // console.log('UPDATE=>', holidayData);
    } else {
      const reqData = {
        date: data,
        remark: remark,
      };

      dispatch(addHoliday(reqData));
    }
  };

  /* This `useEffect` it is used to update the state of `holidayData` with the data received
 from the previous screen if the component is being used to update an existing holiday. */
  useEffect(() => {
    if (schedule_id && stateRecieved) {
      // console.log('STATE RECIEVED=>', stateRecieved);
      setholidayData(stateRecieved);
    }
  }, [schedule_id, stateRecieved]);

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>{schedule_id ? 'Update Holiday' : 'Create Holiday'}</h3>
        <Form className="add-form">
          <Row>
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  value={data}
                  name="data"
                  onChange={onHandleValueChange}
                  required
                  type="date"
                  placeholder="Enter Cummulitive Amount"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="remark">
                <Form.Label>Remark</Form.Label>
                <Form.Control
                  value={remark}
                  name="remark"
                  onChange={onHandleValueChange}
                  required
                  type="text"
                  placeholder="Enter Remark"
                />
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

export default NewHoliday;
