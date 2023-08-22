/**
 * This Component renders a Form to Create a new Manufacturer or Update a existing Manufacturer.
 * This Component gets showManufacturer, Manufacturer from Redux as props and
 * match, history is mapped to props which is used to navigate and get url details.
 * This component reads the Manufacturer id if it is present in url and retrieve the Manufacturer
 * details with Manufacturer id and allow the user to edit
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
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {Routes} from '@/routes';
import PropTypes from 'prop-types';
import {
  createManufacturer,
  showManufacturer,
  updateManufacturer,
  readManufacturers,
} from '@/actions/manufacturerActions';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {emailValidator, mobileValidator} from '@/services/utility';
import InputForm from '@/pages/profile/children/InputForm';
// import {getCitiesFromStateId} from '@/actions';
import GoBack from '@/components/GoBack';
import {Can} from '@/components';
import RoutePage from '@/components/RoutePage';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const {SET_CREATE_MANUFACTURER, SET_UPDATE_MANUFACTURER} = actionTypes;

const NewManufacturer = (props) => {
  const {showManufacturer, manufacturer} = props;
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturerCity, setManufacturerCity] = useState('');
  const [manufacturerState, setManufacturerState] = useState('');
  const [manufacturerCountry, setManufacturerCountry] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setpasswordWarning] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonDesignation, setContactPersonDesignation] = useState('');
  const [contactPersonEmail, setContactPersonEmail] = useState('');
  const [contactPersonMobile, setContactPersonMobile] = useState('');
  const [isView, setisView] = useState(false);
  // const masterData = useAppSelector((state) => state.template.masterData);
  const dispatch = useAppDispatch();

  const manufacturer_id = urlParams.id;
  const stateRecieved = location.state;

  /**
   * This Callback will set Manufacturer details to corresponding
   * states if Manufacturer and Manufacturer id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (manufacturer && manufacturer_id) {
      setManufacturerName(manufacturer.manufacturerName);
      setManufacturerCity(manufacturer.manufacturerCity);
      setManufacturerState(manufacturer.manufacturerState);
      setManufacturerCountry(manufacturer.manufacturerCountry);
      setContactPersonName(manufacturer.contactPersonName);
      setContactPersonDesignation(manufacturer.contactPersonDesignation);
      setContactPersonEmail(manufacturer.contactPersonEmail);
      setContactPersonMobile(manufacturer.contactPersonMobile);
    } else {
      setManufacturerName('');
      setManufacturerCity('');
      setManufacturerState('');
      setManufacturerCountry('');
      setContactPersonName('');
      setContactPersonDesignation('');
      setContactPersonEmail('');
      setContactPersonMobile('');
    }
  }, [manufacturer, manufacturer_id]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * showManufacturer Action if Manufacturer id is present to get
   * Manufacturers array
   */
  useEffect(() => {
    if (manufacturer_id) {
      showManufacturer(manufacturer_id);
    }
  }, [manufacturer_id, showManufacturer]);

  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidatorFunction = (value) => {
    setContactPersonEmail(value);
    if (!emailValidator(value)) {
      setEmailWarning(false);
    } else {
      setEmailWarning(true);
    }
  };
  /**
   * Validates the Mobile Number and set warning if
   * regex test fails
   * @param {String} value
   */
  const mobileValidatorFunction = (value) => {
    setContactPersonMobile(value);
    if (!mobileValidator(value)) {
      setpasswordWarning(false);
    } else {
      setpasswordWarning(true);
    }
  };

  /**
   * Submits the user entered details to the api,
   * if Manufacturer id is null it will create Manufacturer or this will update
   * the existing Manufacturer with Manufacturer id
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      manufacturerName: manufacturerName,
      manufacturerCity: manufacturerCity,
      manufacturerState: manufacturerState,
      manufacturerCountry: manufacturerCountry,
      contactPersonName: contactPersonName,
      contactPersonDesignation: contactPersonDesignation,
      contactPersonEmail: contactPersonEmail,
      contactPersonMobile: contactPersonMobile,
    };
    if (!emailWarning && !passwordWarning) {
      if (manufacturer_id) {
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          history(Routes.Manufacturers.path);
          readManufacturers();
          return {type: SET_CREATE_MANUFACTURER, payload: response.data};
        };

        props.updateManufacturer(manufacturer_id, data, onSuccess);
      } else {
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          history(Routes.Manufacturers.path);
          readManufacturers();
          return {type: SET_UPDATE_MANUFACTURER, payload: response.data};
        };

        props.createManufacturer(data, onSuccess);
      }
    }
  };

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>
          {manufacturer_id && isView
            ? 'View Manufacturer'
            : manufacturer_id
            ? 'Update Manufacturer'
            : 'Create Manufacturer'}
        </h3>
        <Form className="manufacturer-container" onSubmit={handleSubmit}>
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Manufacturer Name"
                    placeholder="Enter Manufacturer Name"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={manufacturerName}
                    onChange={(e) => setManufacturerName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>
            {/* To-do
          Commenting the country,state and city to accept text. Later it should be select
          */}
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Manufacturer Country"
                    placeholder="Enter Manufacturer Country"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={manufacturerCountry}
                    onChange={(e) => setManufacturerCountry(e.target.value)}
                    // options={returnMasterDataSelectValues(
                    //   masterData?.countries
                    // )}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Manufacturer State"
                    placeholder="Enter Manufacturer State"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={manufacturerState}
                    onChange={(e) => {
                      const value = e.target.value;
                      setManufacturerState(value);
                      // const relatedState = masterData.states.find(
                      //   (state) => state.name === value
                      // );

                      // if (relatedState)
                      //   dispatch(
                      //     getCitiesFromStateId(relatedState?.id, 'cities')
                      //   );
                    }}
                    // options={returnMasterDataSelectValues(masterData?.states)}
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
                    label="Manufacturer City"
                    placeholder="Enter Hospital City"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={manufacturerCity}
                    onChange={(e) => setManufacturerCity(e.target.value)}
                    // options={returnMasterDataSelectValues(masterData?.cities)}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Contact Person Name"
                    placeholder="Enter Contact Person Name"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={contactPersonName}
                    onChange={(e) => setContactPersonName(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Contact Person Designation"
                    placeholder="Enter Contact Person Designation"
                    type="text"
                    isView={false}
                    readOnly={isView}
                    ipValue={contactPersonDesignation}
                    onChange={(e) =>
                      setContactPersonDesignation(e.target.value)
                    }
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
                    label="Contact Person Mobile"
                    placeholder="Enter Contact Person Mobile"
                    isInvalid={passwordWarning}
                    warningText="Please enter a valid mobile number"
                    type="number"
                    isView={false}
                    readOnly={isView}
                    ipValue={contactPersonMobile}
                    onChange={(e) => mobileValidatorFunction(e.target.value)}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body>
                  <InputForm
                    label="Contact Person Email"
                    placeholder="Enter Contact Person Email"
                    isInvalid={emailWarning}
                    warningText="Please enter a valid email address"
                    type="email"
                    isView={false}
                    readOnly={isView}
                    ipValue={contactPersonEmail}
                    onChange={(e) => emailValidatorFunction(e.target.value)}
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
                Back
              </button>
            </GoBack>
            {isView ? (
              <Can
                performingAction={{
                  component: 'manufacturer-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage
                  url={Routes.UpdateManufacturer.path}
                  id={manufacturer_id}>
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
                {manufacturer_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  manufacturersList: state.manufacturers.manufacturersList,
  manufacturer: state.manufacturers.selectedManufacturer,
});

const mapDispatchToProps = {
  createManufacturer,
  showManufacturer,
  updateManufacturer,
};

NewManufacturer.propTypes = {
  manufacturersList: PropTypes.array,
  manufacturer: PropTypes.array,
  createManufacturer: PropTypes.func,
  showManufacturer: PropTypes.func,
  updateManufacturer: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewManufacturer);
