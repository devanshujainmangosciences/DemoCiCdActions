/**
 * This Component renders Role List. User can create, edit and delete Role from here.
 * This Component gets role, readRoleList, deleteRole and pagination from Redux as props
 * and history is mapped to props which is used to navigate. On Component mount readRoles
 * function is calledto get RolesList Array which is mapped inside this component
 * IMPORTANT:
 * role, readRoleList are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Row, Form, Button} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {useAppDispatch} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {tableHeadersRole} from '@/config';
import {readRoleList, deleteRole} from '../../actions/roleActions';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {Routes} from '@/routes';
import {useNavigate} from 'react-router-dom';

const {SET_DELETE_ROLE} = actionTypes;

const Role = (props) => {
  const {t} = useTranslation(['roles', 'route']);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const {role, readRoleList, deleteRole, pagination} = props;
  const [activePage, setActivePage] = useState(1);
  const [userId, setUserId] = useState('');
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [title, setTitle] = useState('');
  const [pageSize, setPageSize] = useState(10);

  /**
   * Dispatches readRoleList when role is null
   */
  useEffect(() => {
    if (!role) {
      readRoleList();
    }
  }, [readRoleList, role]);

  /**
   * Dispatches readRoleList when activePage and pagesize changes
   */
  useEffect(() => {
    readRoleList(activePage - 1, pageSize);
  }, [activePage, pageSize, readRoleList]);

  /**
   * The function takes in an ID and an action object, and performs different actions based on the type
   * of action.
   * @param {Number} id
   * @param {Object} action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'changeView': {
        let URL = action.url;
        URL = URL.replace(':id', id);
        history(URL, {state: action.label});
        break;
      }
      case 'delete': {
        setUserId(id);
        setTitle(t('removeRole'));
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * Dispatch deleteRole when remove button is clicked
   * roleId is passed to deleteRole Action and closes the modal
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'warning'));
      }
      readRoleList();
      return {type: SET_DELETE_ROLE, payload: response.data};
    };
    deleteRole(userId, onSuccess);
    setShowRemoveModal(false);
  };
  const handleModalClose = () => {
    setShowRemoveModal(false);
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
          className="mt-3 modal-btn">
          {t('remove')}
        </Button>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('rolesList')}</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            className="btn-patient-theme-small bg-dark px-4"
            onClick={() => history(Routes.NewRole.path)}>
            <FontAwesomeIcon icon={faPlus} />
            <span className="ps-1">{t('addNewRole')}</span>
          </button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={[]}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="mango-executive"
              classes=" h-100 row">
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
          <div className=" ps-2 pe-4">
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
        {role && (
          <TableComponent
            component={'role-listing'}
            tableHeadersData={tableHeadersRole}
            tableData={role}
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
};

const mapStateToProps = (state) => ({
  role: state.role.roleList,
  selectedRole: state.role.selectedRole,
  pagination: state.role.pagination,
});
const mapDispatchToProps = {
  readRoleList,
  deleteRole,
};
Role.propTypes = {
  role: PropTypes.array,
  selectedRole: PropTypes.object,
  pagination: PropTypes.object,
  readRoleList: PropTypes.func,
  deleteRole: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Role);
