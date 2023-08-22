/**
 * This comonent is the landing page for the ME login, it displays the list of patients that re present in the system
 */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {Row, Col, Form, Card} from '@themesberg/react-bootstrap';
import {
  getMangoPatientList,
  mangoExecutiveAddPatient,
} from '@/actions/mangoExecutiveActions';
import {ProfilePageIcon} from '@/assets/icons';
import {mangoExecutivefilters, tableHeadersMangoPatient} from '@/config';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
// import {Multiselect} from 'multiselect-react-dropdown';
import {
  Filter,
  TableComponent,
  CustomPagination,
  TitleContainer,
  Can,
} from '../components';
import {
  drugsList,
  hospitalsList,
  hospitalsGroupList,
  getMasterData,
  doctorsList as doctorsListAction,
  setToast,
} from '@/actions';
// import {useNavigate} from 'react-router';
// import {Routes} from '@/routes';
import InputForm from './profile/children/InputForm';
import PatientDetails from './PatientDetails';
import CustomReactSelect from '@/components/CustomReactSelect';
import {ALERT_MESSAGE, MASTER_DATA_ME, VALIDATE_DATE_TYPE} from '../constants';
import {dateValidator} from '@/services/utility';

const MangoExecutive = () => {
  const {t} = useTranslation(['mangoExecutive']);
  const dispatch = useAppDispatch();
  // const history = useNavigate();
  const [patientsList, setPatientsList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [hospitalGroupsList, setHospitalsGroupList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filtersAppliedState, setfiltersAppliedState] = useState([]);
  const [hospitalGroup, setHospitalGroup] = useState('');
  const [statuses, setStatuses] = useState('');
  const [mrn, setMrn] = useState('');
  const [doctor, setDoctor] = useState('');
  const [vbcDrug, setVbcDrug] = useState('');
  const [identifiedDate, setIdentifiedDate] = useState('');
  const [isShowPatientDetails, setIsShowPatientDetails] = useState(false);
  const [selectedPatientId, setselectedPatientId] = useState(null);
  const [isAddPatient, setIsAddPatient] = useState(false);
  const patients = useAppSelector((state) => state.mangoExecutive.patientsList);
  const pagination = useAppSelector((state) => state.mangoExecutive.pagination);
  const doctors = useAppSelector((state) => state.template.doctorList);
  const drugs = useAppSelector((state) => state.template.drugList);
  const hospitals = useAppSelector((state) => state.template.hospitalList);
  const routeClicked = useAppSelector((state) => state.route.routeClicked);
  const [identifiedDateWarning, setidentifiedDateWarning] = useState(false);
  const [selectedColumns, setselectedColumns] = useState(
    tableHeadersMangoPatient.filter((item) => item.value !== 'email')
  );

  const patientStatuses = useAppSelector(
    (state) => state.template.masterData?.patientStatuses
  );
  const hospitalsGroup = useAppSelector(
    (state) => state.template.hospitalGroupList
  );

  // console.log('filtersAppliedState=>', filtersAppliedState);

  /** The below code is using the useEffect hook to update the patient list displayed on the page. It maps
through the patients array and creates a new array with modified patient objects that include
clickable spans and buttons for editing patient information. The modified patient objects are then
set to the patientsList state variable. The useEffect hook is triggered whenever there is a change
in the activePage, dispatch, pageSize, or patients variables. */
  useEffect(() => {
    if (patients) {
      const reqPatientList = patients.map((patient) => {
        return {
          ...patient,
          uniqueId: (
            <span
              onClick={() => handleClickEdit(patient?.id)}
              className="drug-link cursor-pointer">
              {patient?.uniqueId}
            </span>
          ),
          hospitalGroupName: (
            <span title={patient.hospitalGroupName}>
              {patient.hospitalGroupName}
            </span>
          ),
          hospitalUnitName: (
            <span title={patient.hospitalUnitName}>
              {patient.hospitalUnitName}
            </span>
          ),
          doctorName: (
            <span title={patient.doctorName}>{patient.doctorName}</span>
          ),
          drugName: <span title={patient.drugName}>{patient.drugName}</span>,
          edit: (
            <button
              className="btn-patient-theme-grid bg-admin"
              onClick={() => handleClickEdit(patient?.id)}>
              Edit
            </button>
          ),
        };
      });
      setPatientsList(reqPatientList);
    }
  }, [activePage, dispatch, pageSize, patients]);

  // console.log("ACTIVE PAGES=>", activePage);

  /** The below code is using the `useEffect` hook in a React component to dispatch an action to get a
list of patients from a Mango database. The `getMangoPatientList` function is called with parameters
for the current active page, page size, and any filters that have been applied. The `useEffect` hook
is triggered whenever there is a change in the `activePage`, `pageSize`, or `filtersAppliedState`
variables, causing the `getMangoPatientList` function to be called again with the updated values. */
  useEffect(() => {
    dispatch(
      getMangoPatientList(activePage - 1, pageSize, filtersAppliedState)
    );
  }, [activePage, pageSize, dispatch]);

  /**The above code is using the `useEffect` hook in a React component to either dispatch an action to
fetch a list of drugs or update the `drugList` state with the fetched drugs. If `drugs` is not null
or undefined, it maps over the drugs array and creates a new array of objects with additional
properties `id`, `label`, and `value`. It then filters the new array to only include drugs that have
a `visible` property set to true. The resulting array is then set as the new value of the `drugList`
state.  */
  useEffect(() => {
    if (!drugs) {
      dispatch(drugsList(false));
    } else {
      setDrugList(
        drugs
          .map((drug) => ({
            ...drug,
            id: drug.id,
            label: `${drug.brandName}-${drug.drugGenericName}`,
            value: drug.id,
          }))
          .filter((drug) => drug.visible)
      );
    }
  }, [dispatch, drugs]);
  /** The below code is using the `useEffect` hook in a React component to conditionally dispatch an
action to fetch a list of hospitals and set the hospital list state based on the response. If the
`hospitals` state is not yet available, the `hospitalsList` action is dispatched with a `false`
argument to fetch the list. Once the `hospitals` state is available, it is mapped to an array of
objects with `id`, `label`, and `value` properties, and set as the `hospitalList` state.  */
  useEffect(() => {
    if (!hospitals) {
      dispatch(hospitalsList(false));
    } else {
      setHospitalList(
        hospitals.map((hospital) => ({
          id: hospital.id,
          label: hospital.hospitalName,
          value: hospital.id,
        }))
      );
    }
  }, [dispatch, hospitals]);
  /** The below code is using the `useEffect` hook in a React component to either dispatch an action to
fetch a list of hospital groups or set the list of hospital groups as options for a select input. It
checks if the `hospitalsGroup` state is truthy, and if it is, it maps over the array to create an
array of objects with `id`, `label`, and `value` properties. The resulting array is then set as the
`hospitalsGroupList` state. */
  useEffect(() => {
    if (!hospitalsGroup) {
      dispatch(hospitalsGroupList(false));
    } else {
      setHospitalsGroupList(
        hospitalsGroup.map((hospitalGrp, index) => ({
          id: index,
          label: hospitalGrp,
          value: hospitalGrp,
        }))
      );
    }
  }, [dispatch, hospitalsGroup]);
  /** The below code is a React useEffect hook that is triggered when the component mounts or when the
`patientStatuses` state variable changes. If `patientStatuses` is falsy, it dispatches an action to
get master data. If `patientStatuses` is truthy, it maps the `patientStatuses` array to a new array
of objects with `id`, `label`, and `value` properties and sets the resulting array to the `statuses`
state variable. */
  useEffect(() => {
    if (!patientStatuses) dispatch(getMasterData(MASTER_DATA_ME, false));
    else
      setStatuses(
        patientStatuses.map((status) => ({
          id: status?.index,
          label: status?.name,
          value: status?.name,
        }))
      );
  }, [dispatch, patientStatuses]);

  /** The below code is using the `useEffect` hook in a React component to update the state of
`doctorsList` based on the `doctors` prop. If `doctors` is truthy, it maps over the array of doctors
and creates a new array of objects with `id`, `label`, and `value` properties. The resulting array
is then set as the new value of `doctorsList`. The `dispatch` and `doctors` variables are included
in the dependency array to ensure that the effect is re-run whenever they change. */
  useEffect(() => {
    if (doctors) {
      setDoctorsList(
        doctors.map((doctor) => ({
          id: doctor.id,
          label: doctor?.name,
          value: doctor.id,
        }))
      );
    }
  }, [dispatch, doctors]);

  /** The below code is using the `useEffect` hook in a React component to perform some actions when the
`routeClicked` state changes. */
  useEffect(() => {
    if (routeClicked?.Patients >= 0) {
      setfiltersAppliedState([]);
      onBackButtonClick();
    }
    if (routeClicked?.Patients >= 0 && isAddPatient) {
      setIsAddPatient(false);
      // console.log('EXECUTED IN ADD PATIENT=>', routeClicked);
    }
  }, [routeClicked]);

  /**
   * When patient edit button is clicked
   * @param {PatientId} id
   */
  const handleClickEdit = (id) => {
    setselectedPatientId(id);
    setIsShowPatientDetails(true);
    // const patientRoute = Routes.PatientDetails.path;
    // const correctRoute = patientRoute.replace(':id', id);
    // history(correctRoute);
  };
  /**
   * Function triggred when New Patient is added
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      middleName,
      lastName,
      hospitalId: parseInt(hospitalGroup),
      mrn,
      doctorId: parseInt(doctor),
      drugId: parseInt(vbcDrug),
      identifiedDate,
    };
    const onSuccess = () => {
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setHospitalGroup('');
      setMrn('');
      setDoctor('');
      setVbcDrug('');
      setIdentifiedDate('');
      dispatch(
        getMangoPatientList(activePage - 1, pageSize, filtersAppliedState)
      );
    };
    dispatch(mangoExecutiveAddPatient(data, onSuccess));
  };
  /**
   * Function trigger when back button is clicked to route to Patient list page and fetch the patients
   */
  const onBackButtonClick = () => {
    setIsShowPatientDetails(false);
    dispatch(getMangoPatientList(0, pageSize));
  };
  /**
   * When doctor is selected while creating patient
   * @param {*} e
   */
  const onDoctorSelect = (e) => {
    if (hospitalGroup) setDoctor(e.target.value);
    else dispatch(setToast(t('errorOnDoc'), true, 'warning'));
  };
  /**
   * When Hospital is selected while creating the patient
   * @param {*} e
   */
  const onHospitalSelect = (e) => {
    const value = e.target.value;
    setHospitalGroup(value);
    dispatch(doctorsListAction(value));
  };
  /**
   * This function is saved when filter are set
   * @param {Object} filters
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };
  // console.log('FILTERS=>', filtersAppliedState);
  // /**
  //  * When the hide/show input is selected the function triggers and set the state to latest value
  //  * @param {Array} data
  //  */
  // const onSelectComponent = (data) => {
  //   setselectedColumns(data.sort((a, b) => a.key - b.key));
  // };
  // /**
  //  * When the hide/show input is removed the function triggers and set the state latest value
  //  * @param {Array} data
  //  */
  // const onRemoveComponent = (data) => {
  //   setselectedColumns(data.sort((a, b) => a.key - b.key));
  // };

  /**
   * This data will change when the data in multi select input will change
   * @param {Array} data
   */
  const onMultiSelectInputChange = (data) => {
    setselectedColumns(data.sort((a, b) => a.key - b.key));
  };

  /**
   * This function updates the identified date state and checks if it is a future date, displaying a
   * warning if necessary.
   */
  const onIdentifiedDateChange = (e) => {
    const value = e.target.value;
    setIdentifiedDate(value);
    if (dateValidator(value, VALIDATE_DATE_TYPE.RESTRICT_FUTURE_DATE)) {
      dispatch(
        setToast(ALERT_MESSAGE.DATE_CANNOT_BE_IN_FUTURE, true, 'warning')
      );
      setidentifiedDateWarning(true);
    } else setidentifiedDateWarning(false);
  };

  if (isShowPatientDetails) {
    return (
      <PatientDetails
        patientId={selectedPatientId}
        goBack={onBackButtonClick}
      />
    );
  } else
    return (
      <div className="mt-4">
        <React.Fragment>
          {!isAddPatient ? (
            <React.Fragment>
              <div>
                <div className="mango-filter mt-4">
                  <Filter
                    filters={mangoExecutivefilters}
                    data={{
                      hospitalList,
                      doctorsList,
                      drugList,
                      hospitalGroupsList,
                      statuses,
                    }}
                    filterBody={true}
                    filterAppliedState={filtersAppliedState}
                    callback={getMangoPatientList}
                    filtersApplied={filtersApplied}
                    activePage={activePage - 1}
                    pageSize={pageSize}
                    type="mango-executive"
                    classes="ms-1-7 h-100">
                    <>
                      <div className="add-patient">
                        <Can
                          performingAction={{
                            component: 'mango-exe-add-patient',
                            action: 'can view details',
                          }}>
                          <button
                            onClick={() => setIsAddPatient(true)}
                            className="btn-patient-theme bg-white text-dark">
                            <FontAwesomeIcon icon={faPlus} className="me-2" />{' '}
                            {t('addPatient')}
                          </button>
                        </Can>
                      </div>
                      <div className="show-entries">
                        <select
                          value={pageSize}
                          onChange={(e) => setPageSize(e.target.value)}>
                          <option value="" hidden>
                            {t('selectOne')}
                          </option>
                          <option value={10}>{t('showTenEntries')}</option>
                          <option value={20}>{t('showTwentyEntries')}</option>
                          <option value={30}>{t('showThirtyEntries')}</option>
                        </select>
                      </div>
                    </>
                  </Filter>
                </div>
                <div className="mt-3 d-flex align-items-center hide-columns">
                  <div>Hide Columns:</div>
                  <div className="ms-3">
                    <CustomReactSelect
                      onInputChange={onMultiSelectInputChange}
                      optionData={tableHeadersMangoPatient}
                      defaultData={selectedColumns}
                      backgroundColor="#09a6e0"
                    />
                    {/* <Multiselect
                      options={tableHeadersMangoPatient}
                      selectedValues={selectedColumns}
                      onSelect={onSelectComponent} // Function will trigger on select event
                      onRemove={onRemoveComponent}
                      displayValue="keyName" // Property name to display in the dropdown options
                      showCheckbox={true}
                      placeholder=""
                    /> */}
                  </div>
                </div>
              </div>
              {patientsList && (
                <div className="page-container mt-3 p-4 pb-1">
                  <TableComponent
                    component={'mango-patient-listing'}
                    tableHeadersData={selectedColumns}
                    tableData={patientsList}
                    classes={'mango-executive-patient align-items-center'}
                    noCheck
                    headerClasses="border-0"
                  />
                  {pagination && (
                    <CustomPagination
                      paginationDetail={pagination}
                      activePage={activePage}
                      setActivePage={setActivePage}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Form
                onSubmit={handleSubmit}
                className="mt-4 myprofile-container">
                <div className="page-container p-4 pb-2">
                  <TitleContainer
                    icon={<ProfilePageIcon fill="#28252e" />}
                    title={t('addNewPatient')}
                    noBg={true}
                  />
                  <div className="mt-3">
                    <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('firstName')}
                              type="text"
                              placeholder={t('firstName')}
                              required
                              isView={false}
                              ipValue={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('middleName')}
                              type="text"
                              placeholder={t('middleName')}
                              required={false}
                              isView={false}
                              ipValue={middleName}
                              onChange={(e) => setMiddleName(e.target.value)}
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('lastName')}
                              type="text"
                              placeholder={t('lastName')}
                              required
                              isView={false}
                              ipValue={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('hospital')}
                              type="select"
                              placeholder="Select Hospital"
                              required
                              isView={false}
                              ipValue={hospitalGroup}
                              onChange={onHospitalSelect}
                              options={
                                hospitalList.length > 0 &&
                                hospitalList.map(({label, value}) => {
                                  return {label, value};
                                })
                              }
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('mrn')}
                              type="text"
                              placeholder="MRN"
                              required
                              isView={false}
                              ipValue={mrn}
                              onChange={(e) => setMrn(e.target.value)}
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('doctor')}
                              type="select"
                              placeholder="Select Doctor"
                              required
                              isView={false}
                              ipValue={doctor}
                              onChange={onDoctorSelect}
                              options={
                                hospitalGroup
                                  ? doctorsList && doctorsList.length > 0
                                    ? doctorsList
                                    : [
                                        {
                                          label: 'No Doctors Avaliable',
                                          value: '',
                                        },
                                      ]
                                  : [
                                      {
                                        label: 'Select Hospital First',
                                        value: '',
                                      },
                                    ]
                              }
                              // options={
                              //   doctorsList.length > 0
                              //     ? doctorsList
                              //     : !hospitalGroup
                              //     ? [
                              //         {
                              //           label: 'Select Hospital First',
                              //           value: '',
                              //         },
                              //       ]
                              //     : [{label: 'No Doctors Avaliable', value: ''}]
                              // }
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('vbcDrug')}
                              type="select"
                              placeholder="Select PBP Medication"
                              required
                              isView={false}
                              ipValue={vbcDrug}
                              onChange={(e) => setVbcDrug(e.target.value)}
                              options={
                                drugList.length > 0 &&
                                drugList.map(({label, value}) => {
                                  return {label, value};
                                })
                              }
                            />
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col>
                        <Card className="border-0">
                          <Card.Body>
                            <InputForm
                              label={t('identifiedDate')}
                              type="date"
                              placeholder="Identified Date"
                              required
                              isView={false}
                              ipValue={identifiedDate}
                              isInvalid={identifiedDateWarning}
                              warningText={t('invalidIdentifiedDate')}
                              onChange={onIdentifiedDateChange}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>{' '}
                  </div>
                </div>
                <div className="d-flex flex-row mt-4 ">
                  <button
                    className="btn-patient-theme bg-dark px-5"
                    onClick={() => setIsAddPatient(false)}>
                    {t('back')}
                  </button>
                  <button
                    type="submit"
                    disabled={identifiedDateWarning}
                    className="btn-patient-theme bg-admin ms-3 px-5">
                    {t('save')}
                  </button>
                </div>
              </Form>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    );
};

export default MangoExecutive;
