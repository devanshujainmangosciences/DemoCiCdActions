/**
 * Component renders list of patients for doctor login
 */
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {getDoctorPatientsList} from '@/actions/doctorActions';
import {doctorFilters, tableHeadersDoctorPatients} from '@/config';
import {Filter, TableComponent, CustomPagination} from '@/components';
import {readDoctors} from '@/actions/doctorActions';
// import {Multiselect} from 'multiselect-react-dropdown';
import {
  drugsList,
  hospitalsList,
  hospitalsGroupList,
  getMasterData,
} from '@/actions';
import PatientDetails from '@/pages/PatientDetails';
import CustomReactSelect from '@/components/CustomReactSelect';
import {MASTER_DATA_ME} from '../../constants';

// import {useNavigate} from 'react-router';
// import {Routes} from '@/routes';

const DoctorLandingPage = () => {
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
  const [statuses, setStatuses] = useState('');
  const [isShowPatientDetails, setIsShowPatientDetails] = useState(false);
  const [selectedPatientId, setselectedPatientId] = useState(null);
  const patients = useAppSelector(
    (state) => state.doctors?.doctorsPatientsList
  );
  const pagination = useAppSelector((state) => state.doctors.pagination);
  const doctors = useAppSelector((state) => state.doctors.doctorsList);
  const drugs = useAppSelector((state) => state.template.drugList);
  const hospitals = useAppSelector((state) => state.template.hospitalList);
  const routeClicked = useAppSelector((state) => state.route.routeClicked);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const patientStatuses = useAppSelector(
    (state) => state.template.masterData?.patientStatuses
  );
  const hospitalsGroup = useAppSelector(
    (state) => state.template.hospitalGroupList
  );
  const [selectedColumns, setselectedColumns] = useState(
    tableHeadersDoctorPatients
  );
  /**   This `useEffect` hook is responsible for updating the `patientsList` state whenever the `patients`
state changes. It maps through the `patients` array and creates a new array of patient objects with
additional properties such as `hospitalGroupName`, `hospitalUnitName`, `doctorName`, `drugName`, and
`edit`. These properties are JSX elements that will be rendered in the table component. Finally, it
sets the `patientsList` state to the new array of patient objects. The dependencies of this hook are
`activePage`, `dispatch`, `pageSize`, and `patients`, which means it will run whenever any of these
values change. */
  useEffect(() => {
    if (patients) {
      const reqPatientList = patients.map((patient) => {
        return {
          ...patient,
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

  /** This `useEffect` hook is responsible for fetching the list of patients for a doctor based on the
current `activePage`, `pageSize`, and `filtersAppliedState` values. It dispatches the
`getDoctorPatientsList` action with these values as parameters. The dependencies of this hook are
`activePage`, `pageSize`, and `dispatch`, which means it will run whenever any of these values
change. */
  useEffect(() => {
    dispatch(
      getDoctorPatientsList(activePage - 1, pageSize, filtersAppliedState)
    );
  }, [activePage, pageSize, dispatch]);

  /**  This `useEffect` hook is responsible for setting the `drugList` state based on the `drugs` array
fetched from the Redux store. If `drugs` is falsy, it dispatches the `drugsList` action with `false`
as a parameter to fetch the list of drugs. If `drugs` is truthy, it maps through the `drugs` array
and creates a new array of drug objects with additional properties such as `label` and `value`.
These properties are used to render the options in a custom React select component. Finally, it sets
the `drugList` state to the new array of drug objects. The dependencies of this hook are `dispatch`
and `drugs`, which means it will run whenever either of these values change. */
  useEffect(() => {
    if (!drugs) {
      dispatch(drugsList(false));
    } else {
      setDrugList(
        drugs.map((drug) => ({
          id: drug.id,
          label: `${drug.brandName}-${drug.drugGenericName}`,
          value: drug.id,
        }))
      );
    }
  }, [dispatch, drugs]);

  /* The below code is using the `useEffect` hook in a React component to conditionally dispatch an
action to fetch a list of hospitals and set the hospital list state based on the response. If the
`hospitals` state is not yet available, the `hospitalsList` action is dispatched with a `false`
argument to fetch the list. Once the `hospitals` state is available, it is mapped to an array of
objects with `id`, `label`, and `value` properties, and then set as the `hospitalList` state. */
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
 fetch a list of hospitals groups or set the list of hospitals groups as options for a select input.
 It checks if the `hospitalsGroup` state is truthy, and if it is, it maps over the array to create
 an array of objects with `id`, `label`, and `value` properties. The resulting array is then set as
 the `hospitalsGroupList` state. The `useEffect` hook is triggered whenever the `dispatch` or
 `hospitals */
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
of objects with `id`, `label`, and `value` properties and sets the resulting array as the `statuses`
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

  /** The below code is using the `useEffect` hook in a React component to fetch a list of doctors and set
the `doctorsList` state variable. If `doctors` is not already defined, it dispatches an action to
read the list of doctors. If `doctors` is defined, it maps over the list of doctors to create a new
array of objects with `id`, `label`, and `value` properties, and sets the `doctorsList` state
variable to this new array. The `useEffect` hook is triggered whenever `dispatch` or `doctors */
  useEffect(() => {
    if (!doctors) {
      dispatch(readDoctors(0, 1000, [], 'removePaginationData'));
    } else {
      setDoctorsList(
        doctors.map((doctor) => ({
          id: doctor.id,
          label: `${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`,
          value: doctor.mangoAccountId,
        }))
      );
    }
  }, [dispatch, doctors]);
  /** The below code is using the `useEffect` hook in a React component to check if the `routeClicked`
object has a property called `Patients` with a value greater than or equal to 0. If it does, it
clears the `filtersAppliedState` object and calls the `onBackButtonClick` function. This code is
likely used to handle a specific navigation scenario in the application. */
  useEffect(() => {
    if (routeClicked?.Patients >= 0) {
      setfiltersAppliedState({});
      onBackButtonClick();
    }
  }, [routeClicked]);
  /**
   * Function called when edit button is clicked from the patient table
   * @param {Number} id
   */
  const handleClickEdit = (id) => {
    setselectedPatientId(id);
    setIsShowPatientDetails(true);
    // const patientRoute = Routes.PatientDetails.path;
    // const correctRoute = patientRoute.replace(':id', id);
    // history(correctRoute);
  };
  /**
   * Function trigger when back button is clicked to route to Patient list page and fetch the patients
   */
  const onBackButtonClick = () => {
    setIsShowPatientDetails(false);
    dispatch(getDoctorPatientsList(0, pageSize));
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

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
        <>
          <div>
            <div className="mango-filter mt-4">
              <Filter
                filters={doctorFilters}
                data={{
                  hospitalList,
                  doctorsList,
                  drugList,
                  hospitalGroupsList,
                  statuses,
                }}
                filterBody={true}
                filterAppliedState={filtersAppliedState}
                callback={getDoctorPatientsList}
                filtersApplied={filtersApplied}
                activePage={activePage - 1}
                pageSize={pageSize}
                type="doctor"
                classes="ms-1-7 h-100">
                <>
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
                  optionData={tableHeadersDoctorPatients}
                  defaultData={selectedColumns}
                  backgroundColor="#09a6e0"
                />
                {/* <Multiselect
                  options={tableHeadersDoctorPatients}
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
                tableData={patientsList ? patientsList : []}
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
        </>
      </div>
    );
};

export default DoctorLandingPage;
