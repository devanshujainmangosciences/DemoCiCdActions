/**
 * This component renders Resources List. In this page user can edit, view , delete and create Resources.
 * on Component mount readResourceList function is called to get ResourcesList array
 * which mapped inside a table component
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Col, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {useTranslation} from 'react-i18next';
// import {Multiselect} from 'multiselect-react-dropdown';
import {tableHeadersResource} from '@/config';
import {
  readResourceList,
  deleteResource,
  createResource,
  updateResource,
  showResource,
} from '../../actions/resourceActions';
import {permissionsList, setToast} from '@/actions';
import {actionTypes} from '@/constants/actionTypes';
import {
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {
  addationSelect,

  // onRemoveItem,
  // onSelectItem,
} from '@/services/utility';
import {resourcesFilter} from '@/config';
import CustomReactSelect from '@/components/CustomReactSelect';

const {SET_UPDATE_RESOURCE, SET_CREATE_RESOURCE} = actionTypes;
const Resource = () => {
  const {t} = useTranslation(['resource']);
  const dispatch = useAppDispatch();
  const resource = useAppSelector((state) => state.resource.resourceList);
  const selectedResource = useAppSelector(
    (state) => state.resource.selectedResource
  );
  const pagination = useAppSelector((state) => state.resource.pagination);
  const permissionList = useAppSelector(
    (state) => state.template.permissionsList
  );
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [field, setField] = useState(null);
  const [UserId, setUserId] = useState();
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [permissions, setPermissions] = useState({});
  const [filtersAppliedState, setfiltersAppliedState] = useState({});

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate
   * which is used to dispatch readResourceList to get resource array
   */
  useEffect(() => {
    if (!resource) {
      dispatch(readResourceList());
    }
  }, [readResourceList, resource]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate
   * which is used to dispatch permissionsList to get permissionsList array
   */
  useEffect(() => {
    if (!permissionList) {
      dispatch(permissionsList());
    }
  }, [permissionList]);

  /**
   * set the state with label and value property If permissionList  have data
   */
  useEffect(() => {
    if (permissionList) {
      const converted = permissionList.map((object) => ({
        value: object.id,
        label: object.action,
      }));
      converted.unshift(...addationSelect);
      setPermissions(converted);
    }
  }, [permissionList]);

  /**
   * set to corresponding state If selectedResource have data
   */
  useEffect(() => {
    if (selectedResource) {
      setUserId(selectedResource.id);
      setName(selectedResource.name);
      setIsActive(selectedResource.active);
      setDescription(selectedResource.description);
      const permissionList = Object.keys(selectedResource.permissions);
      setField(
        permissionList.map((item) => ({
          value: item,
          label: selectedResource.permissions[item],
        }))
      );
    }
    return () => {
      setField(null);
    };
  }, [selectedResource]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readResourceList
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readResourceList(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /**
   * The function takes an ID and an action type as parameters and performs different actions based on
   * the type of action.
   * @param {Number} id
   * @param {Object} action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'view': {
        handleViewResource(id);
        break;
      }
      case 'update': {
        handleUpdateResource(id);
        break;
      }
      case 'delete': {
        setUserId(id);
        setTitle(t('removeResource'));
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };
  /**
   * When a user click edit resource, Modal is opened
   * with prefilled input values
   * @param {Interger} id
   */
  const handleUpdateResource = (id) => {
    dispatch(showResource(id));
    setUserId(id);
    setIsUpdate(true);
    setTitle(t('updateResource'));
    setShowModal(true);
  };

  /**
   * Opens View modal with resource details when user clicks view resource in any
   * of the resource dropdown
   * @param {Integer} id
   */
  const handleViewResource = (id) => {
    dispatch(showResource(id));
    setUserId(id);
    setIsUpdate(false);
    setTitle(t('viewResource'));
    setShowModal(true);
    setIsDisabled(true);
  };

  /**
   * Handle closes the remove resource modal view
   *
   */
  const handleCloseRemove = () => setShowRemoveModal(false);

  /**
   * Opens Create Resource Modal view when create resource ctx
   * is clicked
   */
  const handleClickCreate = () => {
    setIsUpdate(false);
    setName('');
    setIsActive(true);
    setDescription('');
    setField([]);
    setTitle(t('createResource'));
    setShowModal(true);
  };

  /**
   * Dispatch deleteResource when remove button is clicked
   * resourceId is passed to deleteResource Action and closes the modal
   */
  const handleClickRemove = () => {
    const onSuccess = (response) => {
      dispatch(readResourceList(activePage - 1, pageSize));
      if (response.message) {
        return dispatch(setToast(response.message, true, 'warning'));
      }
    };
    dispatch(deleteResource(UserId, onSuccess));
    setShowRemoveModal(false);
  };
  /**
   * Submits the user enter details to updateResource as param
   * if isUpdate is true else submit to createResource and closes
   * the modal
   * @param {any} e
   */
  const handleClickYes = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      active: isActive,
      description: description,
      permissions: field
        .map((item) => parseInt(item.value))
        .filter((item) => !isNaN(item)),
    };
    if (isUpdate) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readResourceList(activePage - 1, pageSize));
        return {
          type: SET_UPDATE_RESOURCE,
          payload: response.data,
        };
      };

      dispatch(updateResource(UserId, data, onSuccess));
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readResourceList(activePage - 1, pageSize));
        return {
          type: SET_CREATE_RESOURCE,
          payload: response.data,
        };
      };
      dispatch(createResource(data, onSuccess));
    }
    handleClickCloseModal();
  };

  /**
   * handle Close the modal view by changing the showModal state to false
   */
  const handleClickCloseModal = () => {
    setShowModal(false);
    setIsDisabled(false);
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   * @param {Array} filters
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  /**
   * This function updates the state of a field based on the selected data and a single data option.
   * @param {Array} data
   * @param {Object} singleData
   */
  const onMultiSelectPermissionChange = (data, singleData) => {
    if (singleData?.option?.value === 'all') {
      const newPermission = [...permissions];
      newPermission.shift();
      setField(newPermission);
    } else setField(data);
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleCloseRemove}>
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
        <Form onSubmit={handleClickYes} className="form-modal">
          <Form.Group controlId="name">
            <Form.Label>{t('name')}</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder={t('Name')}
              disabled={isDisabled}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <Form.Group as={Col} controlId="permission">
            <Form.Label>{t('permission')}</Form.Label>

            <CustomReactSelect
              isDisabled={isDisabled}
              onInputChange={onMultiSelectPermissionChange}
              optionData={permissions}
              defaultData={field}
              backgroundColor="#09a6e0"
              classes="remove-seperator-span-padding modified-settings"
            />

            {/* {field && (
              <Multiselect
                options={permissions}
                selectedValues={field}
                closeOnSelect={false}
                onSelect={(data) => onSelectItem(data, permissions, setField)} // Function will trigger on select event
                onRemove={(data) => onRemoveItem(data, permissions, setField)} // Function will trigger on remove event
                displayValue="label" // Property name to display in the dropdown options
                showCheckbox={true}
              />
            )} */}
          </Form.Group>
          {!isDisabled && (
            <div className="d-flex flex-row justify-content-between">
              <Button
                variant="success"
                type="submit"
                className="mt-3 modal-btn">
                {isUpdate ? t('update') : t('create')}
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
          <h4>{t('resourceList')}</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            onClick={() => handleClickCreate()}
            className="btn-patient-theme-small bg-dark px-4">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ps-1">{t('addNewResource')}</span>
          </button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={resourcesFilter}
              callback={readResourceList}
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
                    key={size}
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
        {resource && (
          <TableComponent
            component={'resource-listing'}
            tableHeadersData={tableHeadersResource}
            tableData={resource}
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

export default Resource;
