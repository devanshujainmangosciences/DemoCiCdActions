/**
 * This Component renders a Form to Create a new Doctor or Update a existing Doctor.
 * This Component gets showDoctor, doctor, readHospitals, hospitalsList
 * states from Redux store as props and  match, history, is mapped to props
 * which is used to navigate and get url details.
 * This component reads the doctor id if it is present in url and retrieve the doctor
 * details with doctor id and allow the user to edit
 */
import React, {useState, useEffect, Suspense} from 'react';
import {Col, Row, Form} from '@themesberg/react-bootstrap';
import {useAppDispatch} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {Routes} from '@/routes';
import PropTypes from 'prop-types';
import {
  createDoctor,
  showDoctor,
  updateDoctor,
  readDoctors,
  createBulkDoctor,
} from '@/actions/doctorActions';
import {readHospitals} from '../../actions/hospitalActions';
import {setToast} from '@/actions/appActions';

import {actionTypes} from '@/constants/actionTypes';
import {
  emailValidator,
  mobileValidator,
  validDateString,
  captalizeEveryWordOfSentence,
} from '@/services/utility';
import GoBack from '@/components/GoBack';
import RoutePage from '@/components/RoutePage';
import {Can} from '@/components';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {actionType, ALERT_MESSAGE} from '../../constants';
import {tableHeadersDoctorHandsonTable} from '@/config';
import CustomReactSelect from '@/components/CustomReactSelect';
import {GENDER} from '@/data/genericData';
import SuspenseFallbackLoader from '@/components/SuspenseFallbackLoader';
const ReactSpreadSheetComponent = React.lazy(() =>
  import('@/components/ReactSpreadSheetComponent')
);

const {SET_CREATE_DOCTOR, SET_UPDATE_DOCTOR, SET_READ_DOCTOR} = actionTypes;

const NewDoctor = (props) => {
  const {showDoctor, doctor, readHospitals, hospitalsList} = props;
  const history = useNavigate();
  const location = useLocation();
  const urlParams = useParams();
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [designation, setDesignation] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passwordWarning, setpasswordWarning] = useState('');
  const [dobWarning, setDobWarning] = useState('');
  const [mciRegNo, setMciRegNo] = useState('');
  // const [hospitalId, setHospitalIds] = useState(null);
  const [hospitalsSelected, setHospitalsSelected] = useState([]);
  const [isHandsonCreateTable, setIsHandsonCreateTable] = useState(false);
  const [errorInRows, seterrorInRows] = useState([]);
  const [errorMessageState, seterrorMessageState] = useState(null);
  const [isView, setisView] = useState(false);
  const [handsonTableData, sethandsonTableData] = useState([]);

  const doctor_id = urlParams.id;
  const stateRecieved = location.state;

  // console.log('HOSPITAL SELECTED=>', hospitalsSelected);
  // console.log('HOSPITAL IDS=>', hospitalId);

  /**
   * This Callback will set doctor details to corresponding
   * states if doctor and doctor id is not null else it will
   * set all states empty
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === actionType.VIEW) setisView(true);
    else if (stateRecieved && stateRecieved === actionType.MULTIPLE_CREATE)
      setIsHandsonCreateTable(true);
    if (doctor && doctor_id && hospitalsList) {
      // console.log('DOCTOR=>', doctor);
      // setHospitalIds(doctor?.hospitalIds ? doctor.hospitalIds : null);
      setFirstName(doctor?.firstName ? doctor.firstName : '');
      setMiddleName(doctor.middleName ? doctor.middleName : '');
      setLastName(doctor.lastName ? doctor.lastName : '');
      setGender(doctor.gender ? doctor.gender : '');
      setMobile(doctor.mobile ? doctor.mobile : '');
      setEmail(doctor.email ? doctor.email : '');
      setDesignation(doctor.designation ? doctor.designation : '');
      setMciRegNo(doctor.mciRegNo ? doctor.mciRegNo : '');
      setSpeciality(doctor.speciality ? doctor.speciality : '');
      setBirthDate(doctor.birthDate ? doctor.birthDate : '');
      const hospitalUnits =
        doctor?.hospitalUnits && doctor.hospitalUnits.length > 0
          ? doctor?.hospitalUnits.join(',')
          : '';
      const hospitalData = getHospitalData(hospitalsList).filter((item) =>
        hospitalUnits.includes(item.label)
      );
      setHospitalsSelected(hospitalData);
    } else {
      // setHospitalIds([]);
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setMobile('');
      setEmail('');
      setGender('');
      setDesignation('');
      setMciRegNo('');
    }
  }, [doctor, doctor_id, stateRecieved, hospitalsList]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * showDoctor Action if Doctor id is present to get
   * doctors array
   */
  useEffect(() => {
    if (doctor_id) {
      showDoctor(doctor_id);
    }
  }, [doctor_id, showDoctor]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch
   * readHospitals Action if hospitalsList is not null to get
   * hospitalsList array
   */
  useEffect(() => {
    readHospitals(0, 99999);
  }, []);

  /**
   * Validates the Email string and set warning if
   * regex test fails
   * @param {String} value
   */
  const emailValidatorFunction = (value) => {
    setEmail(value);

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
    setMobile(value);
    if (!mobileValidator(value)) {
      setpasswordWarning(false);
    } else {
      setpasswordWarning(true);
    }
  };
  /**
   * Validates the Date of Birth and set warning if
   * regex test fails
   * @param {String} value
   */
  const dobValidator = (value) => {
    setBirthDate(value);
    var myDate = new Date(value);
    var today = new Date();
    if (myDate > today) {
      setDobWarning(true);
      return;
    }
    setDobWarning(false);
  };

  /**
   * Function to create the array list for hospital
   * @param {Array} hospitalList
   * @returns {Array}
   */
  const getHospitalData = (hospitalList) => {
    if (hospitalList && hospitalList.length > 0) {
      const requiredValues = hospitalList.map((hospital) => {
        return {
          id: hospital?.id,
          label: hospital?.hospitalName,
          value: hospital?.id,
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
   * To save the data changedsf
   * @param {Array} data
   */
  const onSaveChanges = (data) => {
    const reqFields = [
      'firstName',
      'hospitalIds',
      'designation',
      'speciality',
      'mciRegNo',
      'email',
    ];
    sethandsonTableData(data);
    if (data && data.length > 0) {
      const errorRows = [];
      data.map((item, index) => {
        const email = item.email;
        const mobile = item.mobile;
        // const emailAndPhone = email + mobile;

        // if (
        //   emailAndPhone === 'undefined' ||
        //   !emailAndPhone ||
        //   emailAndPhone === 0 ||
        //   emailAndPhone === 'null' ||
        //   !emailAndPhone.trim()
        // ) {
        //   const reqError = {field: 'emailOrPhone', fieldNumber: 10, row: index};
        //   errorRows.push(reqError);
        // }
        if (email && email.trim() !== '' && emailValidator(email)) {
          const reqError = {field: 'Valid Email', fieldNumber: 10, row: index};
          errorRows.push(reqError);
        }
        if (mobile && mobile.trim() !== '' && mobileValidator(mobile)) {
          const reqError = {field: 'Valid mobile', fieldNumber: 10, row: index};
          errorRows.push(reqError);
        }
        if (!GENDER.includes(item.gender)) {
          const reqError = {
            field: 'gender(MALE/FEMALE) text',
            fieldNumber: 10,
            row: index,
          };
          errorRows.push(reqError);
        }

        reqFields.map((field) => {
          if (!item[field] || item[field].trim() === '') {
            const errorObj = {
              row: index,
              field: field,
              fieldNumber: tableHeadersDoctorHandsonTable.find(
                (item) => item.keyValue === field
              )?.key,
            };
            errorRows.push(errorObj);
          }
        });
      });
      seterrorInRows(errorRows);
      if (errorRows.length === 0) {
        const modifiedData = data.map((item) => {
          const hospNames = item.hospitalIds.split(',');
          const birthDate = item?.birthDate;
          const reqHospId = [];
          hospNames &&
            hospNames.map((hospName) => {
              const hospId = hospitalsList.find(
                (item) => item.hospitalName === hospName
              );
              if (hospId) reqHospId.push(hospId.id);
            });
          return {
            ...item,
            firstName: captalizeEveryWordOfSentence(item.firstName),
            middleName: captalizeEveryWordOfSentence(item.middleName),
            lastName: captalizeEveryWordOfSentence(item.lastName),
            designation: captalizeEveryWordOfSentence(item.designation),
            speciality: captalizeEveryWordOfSentence(item.speciality),
            mobile: item?.mobile ? item.mobile.trim() : null,
            email: item?.email && item.email.trim(),
            birthDate: validDateString(birthDate, true)
              ? validDateString(birthDate, true)
              : '',
            hospitalIds: reqHospId,
          };
        });
        const onApiCallback = (errorData) => {
          // console.log('ERROR DATA=>', errorData);
          if (errorData.length === 0) {
            history(Routes.Doctors.path);
            readDoctors();
          } else addErrorFromBackendValidation(errorData, data);
        };
        // console.log('CREATE DOCTORS=>', modifiedData);
        dispatch(createBulkDoctor(modifiedData, onApiCallback));
      } else {
        dispatch(setToast(ALERT_MESSAGE.ERROR_IN_SHEET, true, 'warning'));
      }
    } else {
      dispatch(setToast(ALERT_MESSAGE.ADD_DATA, true, 'warning'));
    }
  };

  useEffect(() => {
    if (errorInRows && errorInRows.length > 0) {
      addErrorFromUIValidation(errorInRows, handsonTableData);
    }
  }, [errorInRows]);
  /**
   * Add error in Message column when error is coming from backend
   * @param {Array} errorData
   * @param {Array} data
   */
  const addErrorFromBackendValidation = (errorData, data) => {
    let errorMessage = {};
    const reqHandonData = data.map((item, index) => {
      const errorByEmail = errorData.find(
        (error) => error.email === item.email
      );
      if (errorByEmail) {
        errorMessage[index] = errorByEmail.message;
        return {
          ...item,
          errorMessage: errorByEmail.message,
        };
      } else return {...item};
    });
    seterrorMessageState(errorMessage);
    sethandsonTableData(reqHandonData);
  };
  /**
   * Add error in message when front end validation fails
   * @param {Array} errorInRows
   * @param {Array} handsonTableData
   */
  const addErrorFromUIValidation = (errorInRows, handsonTableData) => {
    if (errorInRows && errorInRows.length > 0) {
      let errorMessage = {};
      errorInRows.map((error) => {
        const rowRequired = error.row;
        errorMessage[rowRequired] = `${
          errorMessage[rowRequired] ? errorMessage[rowRequired] + ',' : ''
        }${error.field} is required`;
        // console.log('ERROR=>', error);
        // console.log('handsonTableData=>', handsonTableData);
        // const children = tbody.childNodes[error.row];
        // const item = children.childNodes[error.fieldNumber];
        // const message = children.lastChild;
        // item.classList.add('cell-error-handonsTable');
        // console.log('Item=>', item);
        // console.log('message=>', message);
      });
      // console.log('ERROR MESSAGE=>', errorMessage);
      const reqHandonData = handsonTableData.map((item, index) => {
        if (errorMessage[index])
          return {
            ...item,
            errorMessage: `${errorMessage[index]} is required`,
          };
        else return {...item, errorMessage: ''};
      });
      // console.log('REQ HANDSON TABLE=>', reqHandonData);
      // console.log('ERRORS=>', errorMessage);
      seterrorMessageState(errorMessage);
      sethandsonTableData(reqHandonData);
    } else {
      // console.log('REMOVE ERROR FROM DOM');
    }
  };
  /**
   *On Multip select data change
   * @param {Array} data
   *
   */
  const onMultiselectHospitalChange = (data) => {
    setHospitalsSelected(data);
  };

  /**
   * Submits the user entered details to the api,
   * if Doctor id is null it will create doctor or this will update
   * the existing doctor with doctor id
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !mobile) {
      dispatch(
        setToast(ALERT_MESSAGE.ENTER_EITHER_EMAIL_MOBILE, true, 'warning')
      );
      return;
    }
    const data = {
      firstName: captalizeEveryWordOfSentence(firstName),
      middleName: captalizeEveryWordOfSentence(middleName),
      lastName: captalizeEveryWordOfSentence(lastName),
      mobile: mobile ? mobile : null,
      email: email,
      designation: captalizeEveryWordOfSentence(designation),
      mciRegNo: mciRegNo,
      gender: gender,
      birthDate: birthDate,
      speciality: captalizeEveryWordOfSentence(speciality),
    };
    if (hospitalsSelected && hospitalsSelected.length > 0) {
      const reqHospIds = hospitalsSelected.map((hosp) => hosp.id);
      data['hospitalIds'] = reqHospIds;
    } else {
      dispatch(
        setToast(ALERT_MESSAGE.SELECT_ATLEAST_ONE_HOSP, true, 'warning')
      );
      return;
    }
    if (!emailWarning && !passwordWarning && !dobWarning) {
      if (doctor_id) {
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          history(Routes.Doctors.path);
          readDoctors();
          return {
            type: SET_UPDATE_DOCTOR,
            payload: response.data,
          };
        };
        props.updateDoctor(doctor_id, data, onSuccess);
      } else {
        const onSuccess = (response) => {
          if (response.message) {
            dispatch(setToast(response.message, true, 'success'));
          }
          dispatch({type: SET_READ_DOCTOR, payload: {content: null}});
          history(Routes.Doctors.path);
          readDoctors();
          return {
            type: SET_CREATE_DOCTOR,
            payload: response.data,
          };
        };
        props.createDoctor(data, onSuccess);
      }
    }
  };

  // console.log('CEEROR IN ROWS=>', errorInRows);
  // console.log('handonTableData=>', handsonTableData);
  return (
    <>
      <div className="page-container p-4 mt-4 myprofile-container">
        <h3>
          {doctor_id && isView
            ? 'View Doctor'
            : doctor_id
            ? 'Update Doctor'
            : isHandsonCreateTable
            ? 'Create Doctors'
            : 'Create Doctor'}
        </h3>
        {isHandsonCreateTable ? (
          <div className="mt-3">
            <div>
              Paste the data of excel sheet below and click on save button(make
              sure to copy the rows in same order)
            </div>
            <div className="mt-3">
              <Suspense fallback={<SuspenseFallbackLoader />}>
                <ReactSpreadSheetComponent
                  tableHeadersData={tableHeadersDoctorHandsonTable}
                  errorMessages={errorMessageState}
                  onSaveChanges={onSaveChanges}
                />
              </Suspense>
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="row-cols-sm-3 row-cols-md-4 row-cols-lg-4 -3">
              <Col className="p-2 ps-0">
                <Form.Group controlId="firstName">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>First Name
                  </Form.Label>
                  <Form.Control
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    readOnly={isView}
                    type="firstName"
                    placeholder="Enter First Name"
                  />
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="middleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    readOnly={isView}
                    type="text"
                    placeholder="Enter Middle Name"
                  />
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    readOnly={isView}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="contactPersonMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    isInvalid={passwordWarning}
                    readOnly={isView}
                    value={mobile}
                    onChange={(e) => mobileValidatorFunction(e.target.value)}
                    type="text"
                    placeholder="Enter Mobile"
                  />
                  {passwordWarning && (
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid mobile number
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="contactPersonEmail">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>Email
                  </Form.Label>
                  <Form.Control
                    isInvalid={emailWarning}
                    required={true}
                    value={email}
                    readOnly={isView}
                    onChange={(e) => emailValidatorFunction(e.target.value)}
                    type="email"
                    placeholder="Enter Email"
                  />
                  {emailWarning && (
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="dateOfBirth">
                  <Form.Label>Enter Birth Date</Form.Label>
                  <Form.Control
                    isInvalid={dobWarning}
                    className="Dob"
                    readOnly={isView}
                    value={birthDate}
                    onChange={(e) => dobValidator(e.target.value)}
                    type="date"
                  />
                  {dobWarning && (
                    <Form.Control.Feedback type="invalid">
                      Date of Birth should not be greater than today&apos;s date
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="gender">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>Select Gender
                  </Form.Label>
                  <Form.Control
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    readOnly={isView}
                    as="select">
                    <option value="" hidden>
                      Gender
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    {/* <option value="THEY">others</option> */}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className="p-2 ps-0 " l>
                <Form.Group controlId="designation">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>Designation
                  </Form.Label>
                  <Form.Control
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    readOnly={isView}
                    type="text"
                    placeholder="Enter Designation"
                  />
                </Form.Group>
              </Col>
              <Col className="p-2 ps-0 ">
                <Form.Group controlId="speciality">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>Speciality
                  </Form.Label>
                  <Form.Control
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    required
                    readOnly={isView}
                    type="text"
                    placeholder="Enter Speciality"
                  />
                </Form.Group>
              </Col>

              <Col className="p-2 ps-0 ">
                <Form.Group controlId="mciRegNo">
                  <Form.Label>
                    {' '}
                    <span className="patient-color">*</span>Mci Reg No
                  </Form.Label>
                  <Form.Control
                    value={mciRegNo}
                    onChange={(e) => setMciRegNo(e.target.value)}
                    required
                    readOnly={isView}
                    type="text"
                    placeholder="Enter Mci Reg No"
                  />
                </Form.Group>
              </Col>
              <div className="p-2 ps-0 ">
                <Form.Label>
                  <span className="patient-color">*</span>Hospital
                </Form.Label>
                <CustomReactSelect
                  isDisabled={isView}
                  onInputChange={onMultiselectHospitalChange}
                  optionData={getHospitalData(hospitalsList)}
                  defaultData={hospitalsSelected}
                  backgroundColor="#09a6e0"
                  classes="remove-seperator-span-padding modified-settings input-form-settings "
                />
              </div>
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
                    component: 'doctor-listing',
                    action: 'can view editDetails',
                  }}>
                  <RoutePage url={Routes.UpdateDoctor.path} id={doctor_id}>
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
                  type="submit">
                  {doctor_id ? 'Update' : 'Add'}
                </button>
              )}
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  doctorsList: state.doctors.doctorsList,
  doctor: state.doctors.selectedDoctor,
  hospitalsList: state.hospitals.hospitalsList,
});

const mapDispatchToProps = {
  createDoctor,
  showDoctor,
  updateDoctor,
  readHospitals,
};
NewDoctor.propTypes = {
  doctorsList: PropTypes.array,
  createDoctor: PropTypes.func,
  showDoctor: PropTypes.func,
  updateDoctor: PropTypes.func,
  readHospitals: PropTypes.func,
  doctor: PropTypes.object,
  hospitalsList: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewDoctor);
