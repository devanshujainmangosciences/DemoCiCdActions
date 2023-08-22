/**
 * This component renders Route List. In this page user can edit, view, delete and create Route.
 * on Component mount readResourceList function is called to get RouteList array
 * which mapped inside a table component
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {useTranslation} from 'react-i18next';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {tableHeadersRoute} from '@/config';
import {
  readRouteList,
  deleteRoute,
  showRoute,
  updateRoute,
  createRoute,
} from '../../actions/routeActions';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {routesFilter} from '@/config';

const {SET_CREATE_ROUTE, SET_UPDATE_ROUTE, SET_DELETE_ROUTE} = actionTypes;

const RouteResource = () => {
  const {t} = useTranslation(['route']);
  const dispatch = useAppDispatch();
  const route = useAppSelector((state) => state.route.routeList);
  const selectedRoute = useAppSelector((state) => state.route.selectedRoute);
  const pagination = useAppSelector((state) => state.route.pagination);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isUpdate, setIsUpdate] = useState(false);
  const [url, setUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [component, setComponent] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [title, setTitle] = useState('');
  const [removeUserId, setRemoveUserId] = useState();
  const [filtersAppliedState, setfiltersAppliedState] = useState({});

  /**
   * Dispatches readRoleList when activePage and pagesize changes
   */
  useEffect(() => {
    dispatch(readRouteList(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /**
   * Set selectedRoute properties to corresponding states if
   * selectedroute has value in it
   */
  useEffect(() => {
    if (selectedRoute) {
      setComponent(selectedRoute.component);
      setUrl(selectedRoute.url);
      setName(selectedRoute.name);
      setIsActive(selectedRoute.active);
    }
  }, [selectedRoute]);

  /**
   * The function resets certain state variables and opens a modal for creating a new route.
   */
  const handleClickCreate = () => {
    setIsUpdate(false);
    setUrl('');
    setComponent('');
    setName('');
    setIsActive(true);
    setTitle('Create Route');
    setShowModal(true);
  };

  /**
   * This Function will handle view, update and delete route
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'view': {
        handleViewRoute(id);
        break;
      }
      case 'update': {
        handleUpdateRoute(id);
        break;
      }
      case 'delete': {
        setRemoveUserId(id);
        setTitle(t('removeRoute'));
        setShowRemoveModal(true);
        break;
      }
      default:
        break;
    }
  };

  /**
   * When a user click edit role, Modal is opened
   * with prefilled input values
   * @param {Interger} id
   */
  const handleUpdateRoute = (id) => {
    dispatch(showRoute(id));
    setIsUpdate(true);
    setTitle(t('updateRoute'));
    setShowModal(true);
  };

  /**
   * Opens View modal with role details when user clicks view role in any
   * of the role dropdown
   * @param {Integer} id
   */
  const handleViewRoute = (id) => {
    dispatch(showRoute(id));
    setIsUpdate(false);
    setTitle(t('viewRoute'));
    setShowModal(true);
    setIsDisabled(true);
  };

  /**
   * Dispatch deleteRoute when remove button is clicked
   * routeid is passed to deleteRoute Action and closes the modal
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      dispatch(readRouteList(activePage - 1, pageSize));
      return {type: SET_DELETE_ROUTE, payload: response.data};
    };
    dispatch(deleteRoute(removeUserId, onSuccess));
    setShowRemoveModal(false);
  };
  const handleClickCloseModal = () => {
    setShowModal(false);
    setIsDisabled(false);
  };
  /**
   * handle Close the modal view by changing the ShowRemoveModal state to false
   */
  const handleModalClose = () => setShowRemoveModal(false);

  /**
   * Submits the user enter details to updateRoute as param
   * if isUpdate is true else submit to createRoute and closes
   * the modal
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      active: isActive,
      component: component,
      name: name,
      url: url,
    };
    if (isUpdate) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readRouteList(activePage - 1, pageSize));
        return {type: SET_UPDATE_ROUTE, payload: response.data};
      };
      dispatch(updateRoute(selectedRoute.id, data, onSuccess));
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readRouteList(activePage - 1, pageSize));
        return {type: SET_CREATE_ROUTE, payload: response.data};
      };
      dispatch(createRoute(data, onSuccess));
    }
    handleClickCloseModal();
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
      <CustomModal
        Show={showModal}
        title={title}
        isView={isDisabled}
        handleClose={handleClickCloseModal}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="name">
            <Form.Label>{t('name')}</Form.Label>
            <Form.Control
              value={name}
              disabled={isDisabled}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="component">
            <Form.Label>{t('component')}</Form.Label>
            <Form.Control
              value={component}
              disabled={isDisabled}
              onChange={(e) => setComponent(e.target.value)}
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
          <Form.Group controlId="url">
            <Form.Label>{t('url')}</Form.Label>
            <Form.Control
              value={url}
              disabled={isDisabled}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
          {!isDisabled && (
            <div className="d-flex flex-row justify-content-between">
              <Button variant="success" type="submit" className="mt-3">
                {isUpdate ? t('update') : t('create')}
              </Button>
              <Button
                variant="light"
                className="mt-3"
                onClick={handleClickCloseModal}>
                {t('close')}
              </Button>
            </div>
          )}
        </Form>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('routesList')}</h4>
          <p className="mb-0"></p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            className="btn-patient-theme-small bg-dark px-43"
            onClick={() => handleClickCreate()}>
            <FontAwesomeIcon icon={faPlus} />
            <span className="ps-1">{t('addNewRoute')}</span>
          </button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter ">
            <Filter
              filters={routesFilter}
              callback={readRouteList}
              filtersApplied={filtersApplied}
              filtersAppliedState={filtersAppliedState}
              filterBody={true}
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
        {route && (
          <TableComponent
            component={'route-listing'}
            tableHeadersData={tableHeadersRoute}
            tableData={route}
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

export default RouteResource;
