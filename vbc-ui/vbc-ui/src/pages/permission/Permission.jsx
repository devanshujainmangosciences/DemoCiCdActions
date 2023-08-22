/**
 * This component renders Permissions List. In this page user can edit, view , delete and create permissions
 * on Component mount readPermissionList function is called to get permissionsList array
 * which mapped inside a table component
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {useTranslation} from 'react-i18next';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {tableHeadersPermissions} from '@/config';
import {
  readPermissionList,
  deletePermission,
  createPermission,
  updatePermssion,
} from '@/actions/permissionActions';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {permissionFilter} from '@/config';

const {SET_CREATE_PERMISSION, SET_UPDATE_PERMISSION, SET_DELETE_PERMISSION} =
  actionTypes;

const Permission = () => {
  const {t} = useTranslation(['permission', 'resource']);

  const permissionList = useAppSelector(
    (state) => state.permission.permissionList
  );
  const pagination = useAppSelector((state) => state.permission.pagination);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [action, setAction] = useState('');
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [UserId, setUserId] = useState();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const dispatch = useAppDispatch();

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readPermission to get PermissionList array
   */
  useEffect(() => {
    if (!permissionList) {
      dispatch(readPermissionList());
    }
  }, [readPermissionList, permissionList]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readPermission
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readPermissionList(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'view': {
        handleResource(id, action.type);
        break;
      }
      case 'update': {
        handleResource(id, action.type);
        break;
      }
      case 'delete': {
        setUserId(id);
        setTitle(t('removePermission'));
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * Function handles the operation update or view permission
   * based on action param
   * @param {Integer} id
   * @param {String} action
   */
  const handleResource = (id, action) => {
    const data = permissionList.filter((permission) => permission.id === id)[0];
    setUserId(id);
    setShowModal(true);
    setAction(data.action);
    setIsActive(data.active);
    setDescription(data.description);
    if (action === 'update') {
      setIsUpdate(true);
      setTitle(t('updatePermission'));
    } else {
      setTitle(t('viewPermission'));
      setIsDisabled(true);
    }
  };
  /**
   * Handles opening the modal for creating new permission
   */
  const handleClickCreate = () => {
    setIsUpdate(false);
    setAction('');
    setIsActive(true);
    setDescription('');
    setShowModal(true);
    setTitle(t('createPermission'));
  };
  /**
   * Handles close Modal
   *
   */
  const handleClickCloseModal = () => {
    setShowModal(false);
    setIsDisabled(false);
  };
  /**
   * Deletes the manufacture when user click confirm delete
   * by dispatching deleteManufacturer
   */
  const handleClickRemove = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'warning'));
      }
      dispatch(readPermissionList(activePage - 1, pageSize));
      return {type: SET_DELETE_PERMISSION, payload: response.data};
    };
    dispatch(deletePermission(UserId, onSuccess));
    setShowRemoveModal(false);
  };
  /**
   * Handle submit Function call updatePermssion with user entered data if
   * isUpdate state is true else call createPermission
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      action: action,
      active: isActive,
      description: description,
    };
    if (isUpdate) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readPermissionList(activePage - 1, pageSize));
        return {type: SET_UPDATE_PERMISSION, payload: response.data};
      };
      dispatch(updatePermssion(UserId, data, onSuccess));
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readPermissionList(activePage - 1, pageSize));
        return {type: SET_CREATE_PERMISSION, payload: response.data};
      };
      dispatch(createPermission(data, onSuccess));
    }
    handleClickCloseModal();
  };
  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);
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
          onClick={handleClickRemove}
          className="mt-3">
          {t('remove')}
        </Button>
      </CustomModal>
      <CustomModal
        Show={showModal}
        title={title}
        isView={isDisabled}
        handleClose={handleClickCloseModal}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="action">
            <Form.Label>{t('action')}</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Action"
              disabled={isDisabled}
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isActive">
            <Form.Label>{t('status')}</Form.Label>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                value={isActive}
                disabled={isDisabled}
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                label="Active"
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>{t('description')}</Form.Label>
            <Form.Control
              value={description}
              disabled={isDisabled}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          {!isDisabled && (
            <div className="d-flex flex-row justify-content-between">
              <Button
                variant="success"
                type="submit"
                className="mt-3 modal-btn">
                {isUpdate ? 'update' : 'create'}
              </Button>
              <Button
                variant="light"
                className="mt-3 modal-btn"
                onClick={handleClickCloseModal}>
                {t('close')}
              </Button>
            </div>
          )}
        </Form>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('permissionList')}</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            onClick={handleClickCreate}
            className="btn-patient-theme-small bg-dark px-4">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ps-1">{t('addNewPermission')}</span>
          </button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={permissionFilter}
              callback={readPermissionList}
              filtersApplied={filtersApplied}
              filtersAppliedState={filtersAppliedState}
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
          {/* <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  {t('show')}
                </Dropdown.Item>
                {[10, 20, 30].map((size) => (
                  <Dropdown.Item
                    key={uniqueId}
                    className="d-flex fw-bold"
                    value={size}
                    onClick={() => setPageSize(size)}>
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

        {permissionList && (
          <TableComponent
            component={'permission-listing'}
            tableHeadersData={tableHeadersPermissions}
            tableData={permissionList}
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

export default Permission;
