/**
 * This Component renders hospital List. User can create, edit and delete hospital from here
 * This Component gets hospitalList, deleteHospital and pagination states from
 * Redux store as props and history is mapped to props which is used to navigate.
 * On Component mount readHospital function is called
 * to get hospitalList Array which is mapped inside this component
 * IMPORTANT:
 * hospitalList, deleteHospital are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {Routes} from '@/routes';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {readHospitals, deleteHospital} from '../../actions/hospitalActions';
import {tableHeadersHospitals} from '@/config';
import {useAppDispatch} from '@/redux/redux-hooks';
import PropTypes from 'prop-types';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {hospitalFilter} from '@/config';
import {useNavigate} from 'react-router-dom';

const {SET_DELETE_HOSPITAL} = actionTypes;

function Hospital(props) {
  const {hospitalsList, deleteHospital, pagination} = props;
  const history = useNavigate();
  const {t} = useTranslation(['hospitals']);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [title, setTitle] = useState('');
  // const [bulkAction, setBulkAction] = useState('');
  const [removeHospitalId, setRemoveHospitalId] = useState();
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readHospitals to get hospitalsList array
   */
  useEffect(() => {
    if (!hospitalsList) {
      dispatch(readHospitals());
    }
  }, [hospitalsList, dispatch]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readHospitals
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readHospitals(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /**
   * This Function will handle View hospital and remove hospital
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
        setRemoveHospitalId(id);
        setTitle('Remove hospital');
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };
  /**
   * Deletes the hospital when user click confirm delete
   * by dispatching deletehospital
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'warning'));
      }
      history(Routes.Hospitals.path);
      readHospitals();
      return {
        type: SET_DELETE_HOSPITAL,
        payload: response.data,
      };
    };
    deleteHospital(removeHospitalId, onSuccess);
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
        <p>{t('areYouSure')}</p>
        <Button
          variant="danger"
          type="submit"
          onClick={handleClickYes}
          className="mt-3">
          {t('remove')}
        </Button>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4> {t('hospitalList')}</h4>
          <p className="mb-0"></p>
        </div>
        <div className="d-flex gap-2">
          <Can
            performingAction={{
              component: 'hospital-listing',
              action: 'can add newHospital',
            }}>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button
                onClick={() => history(Routes.NewHospital.path)}
                className="btn-patient-theme-small bg-dark px-4">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ps-1">{t('addNewHospital')} </span>
              </button>
            </div>
          </Can>
          <Can
            performingAction={{
              component: 'hospital-listing',
              action: 'can add multipleData',
            }}>
            <div className="btn-toolbar mb-2 mb-md-0">
              {/* <button
                onClick={() =>
                  history(Routes.NewHospital.path, {
                    state: actionType.MULTIPLE_CREATE,
                  })
                }
                className="btn-patient-theme-small bg-dark px-4">
                <FontAwesomeIcon icon={faPlus} />
                <span className="ps-1">Add Multiple Hospital</span>
              </button> */}
            </div>
          </Can>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={hospitalFilter}
              callback={readHospitals}
              filtersApplied={filtersApplied}
              filterAppliedState={filtersAppliedState}
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
                  {t('Show')}
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
          <div className=" ps-2 pe-4">
            <Form>
              <div className="select-box">
                {/* onChange={e => setBulkAction(e.target.value)} */}
                <select>
                  <option value="" hidden>
                    Bulk Action
                  </option>
                  <option> Active</option>
                  <option> {t('inActive')}</option>
                </select>
              </div>
            </Form>
          </div>
          <button className="btn-patient-theme-small bg-dark px-4">
            Apply
          </button>
        </div>
        {hospitalsList && (
          <TableComponent
            component={'hospital-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersHospitals}
            tableData={hospitalsList}
            actionCallback={actionCallback}
          />
        )}
        <CustomPagination
          paginationDetail={pagination}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  hospitalsList: state.hospitals.hospitalsList,
  hospital: state.hospitals.selectedHospital,
  pagination: state.hospitals.pagination,
});

const mapDispatchToProps = {
  deleteHospital,
};

Hospital.propTypes = {
  hospitalsList: PropTypes.array,
  hospital: PropTypes.object,
  deleteHospital: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
