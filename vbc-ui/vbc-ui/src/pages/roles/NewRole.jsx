/**
 * This Component renders a Form to Create a new Lender or Update a existing Lender.
 * This Component gets showLender, Lender, manufacturersList, readManufacturers
 * from Redux as props and  match, history is mapped to props
 * which is used to navigate and get url details.
 * This component reads the Lender id if it is present in url and retrieve the Lender
 * details with Lender id and allow the user to edit
 */
import React, {useState, useEffect} from 'react';
// import {Multiselect} from 'multiselect-react-dropdown';
import {Col, Row, Form, Button, Container} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Routes} from '@/routes';
import {
  createRole,
  updateRole,
  showRole,
  routesList,
  modulesList,
  readResourcePermissionList,
  readRoleList,
} from '../../actions';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {ROLE_NAME_REGEX} from '../../constants';
import {
  addationSelect,
  // onRemoveItem,
  // onSelectItem,
} from '@/services/utility';
import GoBack from '@/components/GoBack';
import {useNavigate, useParams} from 'react-router-dom';
import CustomReactSelect from '@/components/CustomReactSelect';
import {useLocation} from 'react-router-dom';
import {Can} from '@/components';
import RoutePage from '@/components/RoutePage';
const {SET_CREATE_ROLE, SET_UPDATE_ROLE} = actionTypes;

const NewRole = (props) => {
  const {t} = useTranslation(['newRole']);

  const {
    createRole,
    updateRole,
    showRole,
    role,
    routesList,
    modulesList,
    resourcePermissions,
    routeList,
    moduleList,
    readResourcePermissionList,
  } = props;
  const history = useNavigate();
  const urlParams = useParams();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isView, setisView] = useState(false);
  const [description, setDescription] = useState('');
  const [defaultRoute, setDefaultRoute] = useState('');
  const [assignedRoutes, setAssignedRoutes] = useState(null);
  const [resourcePermission, setResourcePermission] = useState(null);
  const [availableRoutes, setAvailableRoutes] = useState(null);
  const [module, setModule] = useState('');
  const [modules, setModules] = useState([]);
  const [roleNameWarning, setroleNameWarning] = useState('');
  const [availableResourcePermission, setAvailableResourcePermission] =
    useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const role_id = urlParams.id;
  const stateRecieved = location?.state;
  // const addationSelect = [
  //   {
  //     value: 'all',
  //     label: 'Select All',
  //   },
  // ];

  /**
   * Dispatches readResourcePermissionList when resourcePermissions is empty
   */
  useEffect(() => {
    if (!resourcePermissions) {
      readResourcePermissionList(0, 999);
    }
  }, [readResourcePermissionList, resourcePermissions]);

  /**
   * Dispatches routesList when routeList is empty
   */
  useEffect(() => {
    if (!moduleList) {
      modulesList();
    }
  }, [modulesList, moduleList]);

  useEffect(() => {
    if (!routeList) {
      routesList();
    }
  }, [routesList, routeList]);

  /**
   * Set the converted routeList to the state when route has value in it
   */
  useEffect(() => {
    if (routeList) {
      const converted = routeList.map((object) => ({
        value: object.id,
        label: object.component,
      }));
      converted.unshift(...addationSelect);
      setAvailableRoutes(converted);
    }
  }, [routeList]);

  /**
   * Set the converted resourcePermissions to the state when resourcePermissions has value in it
   */
  useEffect(() => {
    if (moduleList) {
      const converted = moduleList.map((object) => ({
        value: object.id,
        label: object.name,
      }));
      setModules(converted);
    }
  }, [moduleList]);

  /**
   * Set the avaliable resource permission
   */
  useEffect(() => {
    if (resourcePermissions) {
      const converted = resourcePermissions.map((object) => ({
        value: object.id,
        label: object.describe,
      }));
      // console.log('CONVERTED=>', converted);
      converted.unshift(...addationSelect);
      setAvailableResourcePermission(converted);
    }
  }, [resourcePermissions]);

  /**
   * Set role properties to corresponding states if role and role_id has value
   * else it will clear all the state
   */
  useEffect(() => {
    if (stateRecieved && stateRecieved === 'View Details') setisView(true);
    if (role && role_id) {
      setName(role.name);
      setIsActive(role.active);
      setDescription(role.description);
      setDefaultRoute(role.defaultRoute.id);
      setModule(role.moduleId);
      if (parseInt(role_id) === parseInt(role.id)) {
        setAssignedRoutes(
          role.assignedRoutes.map((a) => {
            return {
              label: a.component,
              value: a.id,
              disabled: true,
            };
          })
        );

        setResourcePermission(
          Object.keys(role.permissions).map((a) => {
            return {
              label: role.permissions[a],
              value: a,
              disabled: true,
            };
          })
        );
      }
    } else {
      setIsDisabled(false);
      setName('');
      setIsActive(true);
      setDescription('');
      setDefaultRoute('');
      setAssignedRoutes([]);
      setResourcePermission([]);
    }
  }, [role, role_id, stateRecieved]);

  /**
   * Dispatches showRole when role_id have value in it
   */
  useEffect(() => {
    if (role_id) {
      showRole(role_id);
    }
  }, [role_id, showRole]);

  /**
   * Handle submit pass the user enter data to updateRole and dispatch it when role_id have value in it
   * else it will pass the data to createRole and dispatch
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      active: isActive,
      description: description,
      defaultRouteId: parseInt(defaultRoute),
      moduleId: parseInt(module),
      assignedRoutes: assignedRoutes
        .map((item) => parseInt(item.value))
        .filter((item) => !isNaN(item)),
      resourcePermissionIds: resourcePermission
        .map((item) => parseInt(item.value))
        .filter((item) => !isNaN(item)),
    };
    if (role_id) {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        history(Routes.Roles.path);
        readRoleList();
        return {type: SET_UPDATE_ROLE, payload: response.data};
      };
      updateRole(role_id, data, onSuccess);
    } else {
      const onSuccess = (response) => {
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        history(Routes.Roles.path);
        readRoleList();
        return {type: SET_CREATE_ROLE, payload: response.data};
      };
      createRole(data, onSuccess);
    }
  };

  /**
   * Validates the Role name string and set warning if
   * regex test fails
   * @param {String} value
   */
  const roleNameValidator = (value) => {
    // const regex = new RegExp(ROLE_NAME_REGEX).test(value);
    const regex = value.match(ROLE_NAME_REGEX);
    if (regex || value === '') {
      setroleNameWarning(false);
      setName(value);
    } else {
      setroleNameWarning(true);
    }
  };

  // console.log('assignedRoutes=>', assignedRoutes);
  /**
   * The function updates the assigned routes based on the selected data, with a special case for
   * selecting all routes.
   * @param {Array} data
   * @param {Object} singleData
   */
  const onMultiSelectRouteChange = (data, singleData) => {
    if (singleData?.option?.value === 'all') {
      // console.log('YAHA AAYA');
      const newRoutes = [...availableRoutes];
      newRoutes.shift();
      setAssignedRoutes(newRoutes);
    } else {
      setAssignedRoutes(data);
    }
  };
  /**
   * This function updates the state of resource permissions based on the selected options in a
   * multi-select dropdown, with a special case for selecting all options.
   * @param {Array} data
   * @param {Object} singleData
   */
  const onMultiSelectResourceChange = (data, singleData) => {
    if (singleData?.option?.value === 'all') {
      // console.log('YAHA AAYA');

      const newResources = [...availableResourcePermission];
      newResources.shift();
      setResourcePermission(newResources);
    } else {
      setResourcePermission(data);
    }
  };

  return (
    <>
      <Container className="bg-white p-4 rounded mt-4">
        <h3>
          {role_id ? 'Update' : 'Create'} {t('role')}
        </h3>
        <Form className="add-user" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>{t('name')}</Form.Label>
                <Form.Control
                  required
                  type="text"
                  isInvalid={roleNameWarning}
                  placeholder={t('name')}
                  disabled={isDisabled}
                  readOnly={isView}
                  value={name}
                  onChange={(e) => roleNameValidator(e.target.value)}
                />
                {roleNameWarning && (
                  <Form.Control.Feedback type="invalid">
                    {t('invalidRole')}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="isActive">
                <Form.Label>{t('status')}</Form.Label>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    value={isActive}
                    disabled={isDisabled}
                    readOnly={isView}
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    label="Active"
                  />
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Label>{t('description')}</Form.Label>
                <Form.Control
                  value={description}
                  disabled={isDisabled}
                  readOnly={isView}
                  onChange={(e) => setDescription(e.target.value)}
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="defaultRouteId">
                <Form.Label>{t('defaultRoute')}</Form.Label>
                {availableRoutes && (
                  <Form.Select
                    required
                    disabled={isDisabled}
                    value={defaultRoute}
                    readOnly={isView}
                    onChange={(e) => setDefaultRoute(e.target.value)}>
                    <option value="" hidden>
                      {t('selectDefaultRoute')}
                    </option>
                    {availableRoutes.map((route) => (
                      <option value={route.value} key={route.label}>
                        {' '}
                        {route.label}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="defaultModule">
                <Form.Label>Default Module</Form.Label>
                {modules && (
                  <Form.Select
                    required
                    readOnly={isView}
                    disabled={isDisabled}
                    value={module}
                    onChange={(e) => setModule(e.target.value)}>
                    <option value="" hidden>
                      select default module
                    </option>
                    {modules.map((module) => (
                      <option value={module.value} key={module.label}>
                        {module.label}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group as={Col} controlId="resourcePermissionId">
                <Form.Label>{t('resourcePermission')}</Form.Label>

                <CustomReactSelect
                  isDisabled={isView}
                  onInputChange={onMultiSelectResourceChange}
                  optionData={availableResourcePermission}
                  defaultData={resourcePermission}
                  backgroundColor="#09a6e0"
                  classes="remove-seperator-span-padding modified-settings"
                />

                {/* <Multiselect
                  options={availableResourcePermission} // Options to display in the dropdown
                  selectedValues={resourcePermission} // Preselected value to persist in dropdown
                  closeOnSelect={false} // false will not close the drop down after selecting
                  onSelect={(data) =>
                    onSelectItem(
                      data,
                      availableResourcePermission,
                      setResourcePermission
                    )
                  } // Function will trigger on select event
                  onRemove={(data) =>
                    onRemoveItem(
                      data,
                      availableResourcePermission,
                      setResourcePermission
                    )
                  } // Function will trigger on remove event
                  displayValue="label" // Property name to display in the dropdown options
                  showCheckbox={true}
                /> */}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group as={Col} controlId="assignRouteId">
                <Form.Label>{t('assignedRoutes')}</Form.Label>

                <CustomReactSelect
                  isDisabled={isView}
                  onInputChange={onMultiSelectRouteChange}
                  optionData={availableRoutes}
                  defaultData={assignedRoutes}
                  backgroundColor="#09a6e0"
                  classes="remove-seperator-span-padding modified-settings"
                />

                {/* <Multiselect
                  options={availableRoutes} // Options to display in the dropdown
                  selectedValues={assignedRoutes} // Preselected value to persist in dropdown
                  closeOnSelect={false}
                  onSelect={(data) =>
                    onSelectItem(data, availableRoutes, setAssignedRoutes)
                  } // Function will trigger on select event
                  onRemove={(data) =>
                    onRemoveItem(data, availableRoutes, setAssignedRoutes)
                  } // Function will trigger on remove event
                  displayValue="label" // Property name to display in the dropdown options
                  showCheckbox={true}
                /> */}
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-3">
            <GoBack>
              <button
                className="btn-patient-theme-small bg-dark px-4"
                type="button">
                {t('Back')}
              </button>
            </GoBack>
            {isView ? (
              <Can
                performingAction={{
                  component: 'role-listing',
                  action: 'can view editDetails',
                }}>
                <RoutePage url={Routes.UpdateRole.path} id={role_id}>
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
                type="submit"
                onSubmit={handleSubmit}>
                {role_id ? 'Update' : 'Add'}
              </button>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  role: state.role.selectedRole,
  routeList: state.template.routesList,
  moduleList: state.template.modulesList,
  resourcePermissions: state.role.resourcePermissions,
});

const mapDispatchToProps = {
  createRole,
  updateRole,
  showRole,
  routesList,
  modulesList,
  readResourcePermissionList,
};
NewRole.propTypes = {
  role: PropTypes.object,
  routeList: PropTypes.array,
  resourcePermissions: PropTypes.array,
  createRole: PropTypes.func,
  updateRole: PropTypes.func,
  showRole: PropTypes.func,
  routesList: PropTypes.func,
  readResourcePermissionList: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewRole);
