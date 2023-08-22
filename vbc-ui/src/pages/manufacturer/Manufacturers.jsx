/**
 * This Component renders Manufacturer List. User can create, edit and delete manufacturer from here
 * This Component gets ManufacturersList, deleteManufacturer and pagination states from
 * Redux store as props and history is mapped to props which is used to navigate.
 * On Component mount readManufacturers function is called
 * to get ManufacturersList Array which is mapped inside this component
 * IMPORTANT:
 * ManufacturersList, readManufacturers are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {
  readManufacturers,
  deleteManufacturer,
} from '@/actions/manufacturerActions';
import {tableHeadersManufacturers} from '@/config';
import {Routes} from '@/routes';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import PropTypes from 'prop-types';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {useNavigate} from 'react-router-dom';

const {SET_DELETE_MANUFACTURER} = actionTypes;

//import manufacturersData from '@/data/manufacturers'

function Manufacturer(props) {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const {manufacturersList, deleteManufacturer, pagination} = props;
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [title, setTitle] = useState('');
  const [removeManufacturerId, setRemoveManufacturerId] = useState();
  const [pageSize, setPageSize] = useState(10);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readManufacturers to get manufacturersList array
   */
  useEffect(() => {
    if (!manufacturersList) {
      dispatch(readManufacturers());
    }
  }, [manufacturersList, dispatch]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readManufacturers
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readManufacturers(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /**
   * This Function will handle View manufacture and remove manufacture
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
        setRemoveManufacturerId(id);
        setTitle('Remove manufacturer');
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * Deletes the manufacture when user click confirm delete
   * by dispatching deleteManufacturer
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'warning'));
      }
      dispatch(readManufacturers());
      return {type: SET_DELETE_MANUFACTURER, payload: response.data};
    };
    deleteManufacturer(removeManufacturerId, onSuccess);
    setShowRemoveModal(false);
  };

  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);
  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to remove this manufacturer</p>
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
          <h4>Manufacturer List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'manufacturer-listing',
            action: 'can add newManufacturer',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewManufacturer.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add New Manufacturer</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter ">
            <Filter
              filters={[]}
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
                      Select One
                    </option>
                    <option value={10}>Show Ten Entries</option>
                    <option value={20}>Show Twenty Entries</option>
                    <option value={30}>Show Thirty Entries</option>
                  </select>
                </div>
              </div>
            </Filter>
          </div>
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
                  <option> Active </option>
                  <option> Inactive</option>
                </select>
              </div>
            </Form>
          </div>
          <button className="btn-patient-theme-small bg-dark px-4">
            Apply
          </button>
        </div>
        {manufacturersList && (
          <TableComponent
            component={'manufacturer-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersManufacturers}
            tableData={manufacturersList}
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
  manufacturersList: state.manufacturers.manufacturersList,
  manufacturer: state.manufacturers.selectedManufacturer,
  pagination: state.manufacturers.pagination,
});
const mapDispatchToProps = {
  deleteManufacturer,
};
Manufacturer.propTypes = {
  manufacturersList: PropTypes.array,
  manufacturer: PropTypes.object,
  deleteManufacturer: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Manufacturer);
