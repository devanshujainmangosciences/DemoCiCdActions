/**
 * This Component renders Doctors List. User can create, edit and delete Doctor from here
 * This Component gets doctorsList, deleteDoctor and pagination states from
 * Redux store as props and history is mapped to props which is used to navigate.
 * On Component mount readDoctors function is called
 * to get doctorsList Array which is mapped inside this component
 * IMPORTANT:
 * doctorsList, deleteDoctor are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Routes} from '@/routes';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import PropTypes from 'prop-types';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {readDoctors, deleteDoctor} from '@/actions/doctorActions';
import {tableHeadersDoctors} from '@/config';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  TableComponent,
  CustomModal,
  Can,
  CustomPagination,
  Filter,
} from '@/components';
import {userDoctorFilter} from '@/config';
import {useTranslation} from 'react-i18next';
import {hospitalsGroupList, hospitalsList} from '@/actions';
import {useNavigate} from 'react-router-dom';
import {actionType} from '../../constants';

const {SET_DELETE_DOCTOR} = actionTypes;

function Doctor(props) {
  const {t} = useTranslation(['doctor']);
  const {doctorsList, deleteDoctor, pagination} = props;
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  // const [isEditTable, setisEditTable] = useState(false);
  const [doctorListState, setdoctorListState] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [hospitalList, setHospitalList] = useState([]);
  const hospitals = useAppSelector((state) => state.template.hospitalList);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [title, setTitle] = useState('');
  // const [bulkAction, setBulkAction] = useState('');
  const [removeDoctorId, setRemoveDoctorId] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [hospitalGroupsList, setHospitalsGroupList] = useState([]);
  const hospitalsGroup = useAppSelector(
    (state) => state.template.hospitalGroupList
  );

  const dispatch = useAppDispatch();

  /**
   * To save the data changedsf
   * @param {Array} data
   */
  // const onSaveChanges = (data) => {
  //   console.log('DATA=>', data);
  // };
  /**
   * Discard the changes
   */
  // const onDiscardChanges = () => {
  //   setisEditTable(false);
  // };

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readDoctors to get doctorsList array
   */
  useEffect(() => {
    if (!doctorsList) {
      dispatch(readDoctors());
    }
  }, [doctorsList, dispatch]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readDoctor
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readDoctors(activePage - 1, pageSize, filtersAppliedState));
  }, [activePage, pageSize, dispatch]);

  // console.log('filtersAppliedState=>', filtersAppliedState);

  /** The below code is using the `useEffect` hook to update the state of `doctorListState` based on the
`doctorsList` prop. If `doctorsList` is not empty, it maps over each doctor object and creates a new
object with additional properties such as `fullName`, `hospitalGroup`, and `hospitalUnit`. The
`hospitalGroups` and `hospitalUnits` properties are joined into a string and displayed as a tooltip
when the user hovers over the corresponding element. The updated list is then set as the new state
of `doctorListState`. */
  useEffect(() => {
    if (doctorsList && doctorsList.length) {
      const newList = doctorsList.map((doctor) => {
        const fullName = `${doctor.firstName} ${
          doctor.middleName ? doctor.middleName : ''
        } ${doctor.lastName ? doctor.lastName : ''}`;
        const hospitalGroups = doctor?.hospitalGroups.join(',');
        const hospitalUnits = doctor?.hospitalUnits.join(',');
        return {
          ...doctor,
          fullName: fullName,
          hospitalGroup: <span title={hospitalGroups}>{hospitalGroups}</span>,
          hospitalUnit: <span title={hospitalUnits}>{hospitalUnits}</span>,
        };
      });
      setdoctorListState(newList);
    } else setdoctorListState([]);
  }, [dispatch, doctorsList]);

  // console.log('DOCTOR LIST STATE=>', doctorListState);

  /** The below code is using the `useEffect` hook in a React component to either fetch a list of
 hospitals or set the hospital list if it already exists. If `hospitals` is falsy, it dispatches an
 action to fetch the list of hospitals using the `hospitalsList` function. If `hospitals` is truthy,
 it sets the `hospitalList` state by mapping over the `hospitals` array and creating a new array of
 objects with `id`, `label`, and `value` properties.  */
  useEffect(() => {
    if (!hospitals) {
      dispatch(hospitalsList());
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
`hospitalsGroupList` state. The `useEffect` hook has a dependency array that includes `dispatch` and
`h */
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

  /**
   * This Function will handle View Doctor and remove Doctor
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'changeView': {
        let URL = action.url;
        URL = URL.replace(':id', id);
        history(URL, {state: action.label});
        break;
      }
      case 'confirmModal': {
        setRemoveDoctorId(id);
        setTitle('Remove doctor');
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * Deletes the Doctor when user click confirm delete
   * by dispatching deleteDoctor
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      readDoctors();
      return {
        type: SET_DELETE_DOCTOR,
        payload: response.data,
      };
    };
    deleteDoctor(removeDoctorId, onSuccess);
    setShowRemoveModal(false);
  };

  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to remove this doctor</p>
        <Button
          variant="danger"
          type="submit"
          onClick={handleClickYes}
          className="mt-3">
          remove
        </Button>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>Doctor List</h4>
          <p className="mb-0"></p>
        </div>
        <div className="d-flex gap-2">
          <Can
            performingAction={{
              component: 'doctor-listing',
              action: 'can add newDoctor',
            }}>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button
                onClick={() => history(Routes.NewDoctor.path)}
                className="btn-patient-theme-small bg-dark px-4">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ps-1">Add New Doctor</span>
              </button>
            </div>
          </Can>
          <Can
            performingAction={{
              component: 'doctor-listing',
              action: 'can add multipleData',
            }}>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button
                onClick={() =>
                  history(Routes.NewDoctor.path, {
                    state: actionType.MULTIPLE_CREATE,
                  })
                }
                className="btn-patient-theme-small bg-dark px-4">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ps-1">Add Multiple Doctor</span>
              </button>
            </div>
          </Can>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={userDoctorFilter}
              data={{
                hospitalList,
                hospitalGroupsList,
              }}
              filterAppliedState={filtersAppliedState}
              callback={readDoctors}
              filtersApplied={filtersApplied}
              filterBody={true}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="mango-executive"
              classes="h-100 row">
              <div className="children">
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
              </div>
            </Filter>
          </div>
          {/* <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                {[10, 20, 30].map((size) => (
                  <Dropdown.Item
                    className="d-flex fw-bold"
                    value={size}
                    onClick={() => setPageSize(size)}
                  >
                    {size}
                    {size === pageSize && (
                      <span className="icon icon-small ms-auto">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
        </Row>
      </div>
      <div className="px-0 bg-white px-4 rounded py-2">
        <div className="d-flex flex-row align-items-center py-4">
          <div className="ps-2 pe-4">
            <Form>
              <div className="select-box">
                <select>
                  <option value="" hidden>
                    Bulk Action
                  </option>
                  <option> ACTIVE </option>
                  <option> INACTIVE </option>
                </select>
              </div>
            </Form>
          </div>
          <button className="btn-patient-theme-small bg-dark px-4">
            Apply
          </button>
          {/* <button
            type="button"
            className="btn-patient-theme-small bg-dark px-4 ms-2"
            onClick={() => setisEditTable(!isEditTable)}>
            {isEditTable ? 'View Table' : 'Edit Table'}
          </button> */}
        </div>
        {doctorsList && (
          <>
            <TableComponent
              component={'doctor-listing'}
              classes="doctor-listing align-items-center"
              tableHeadersData={tableHeadersDoctors}
              tableData={doctorListState}
              actionCallback={actionCallback}
            />
            <CustomPagination
              paginationDetail={pagination}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </>
        )}
        {/* {doctorsList && isEditTable && (
          <>
            <HandsOnTable
              tableHeadersData={tableHeadersDoctorHandsonTable}
              tableData={doctorListState}
              onSaveChanges={onSaveChanges}
              onDiscardChanges={onDiscardChanges}
              height="auto"
            />
          </>
        )} */}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  doctorsList: state.doctors.doctorsList,
  doctor: state.doctors.selectedDoctor,
  pagination: state.doctors.pagination,
});

const mapDispatchToProps = {
  deleteDoctor,
};
Doctor.propTypes = {
  doctorsList: PropTypes.array,
  history: PropTypes.objectOf(PropTypes.any),
  deleteDoctor: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
