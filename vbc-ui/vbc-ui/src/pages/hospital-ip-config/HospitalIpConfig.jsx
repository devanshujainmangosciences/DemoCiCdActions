/**
 * This component renders Permissions List. In this page user can edit, view , delete and create permissions
 * on Component mount readHospitalIpConfigList function is called to get permissionsList array
 * which mapped inside a table component
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faSave} from '@fortawesome/free-solid-svg-icons/faSave';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {useTranslation} from 'react-i18next';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {tableHeadersHospitalIpConfig} from '@/config';
import {
  readHospitalIpConfigList,
  deleteHospitalIpConfig,
  createHospitalIpConfig,
  updateHospitalIpConfig,
} from '@/actions';
import {setToast} from '@/actions/appActions';
import {TableComponent, CustomModal, CustomPagination, Can} from '@/components';
import {readHospitals} from '@/actions/hospitalActions';
import InputForm from '@/pages/profile/children/InputForm';
import groupBy from 'lodash/groupBy';
import {ALERT_MESSAGE} from '@/constants';

const HospitalIpConfig = () => {
  const {t} = useTranslation(['hospitalIpConfig']);

  const hospitalIpConfigList = useAppSelector(
    (state) => state.hospitalIpConfig.hospitalIpConfigList
  );
  const [hospitalIpConfigListState, sethospitalIpConfigListState] = useState(
    []
  );
  const pagination = useAppSelector(
    (state) => state.hospitalIpConfig.pagination
  );

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [hospitalId, setHospitalId] = useState('');
  const [allowedIps, setAllowedIps] = useState('');
  const [isDeleteWarning, setisDeleteWarning] = useState(false);
  const [allowedIpsWithId, setallowedIpsWithId] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [configId, setConfigId] = useState();
  const [activePage, setActivePage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [ipError, setipError] = useState(false);
  const pageSize = 10;
  // const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const hospitalsList = useAppSelector(
    (state) => state.hospitals.hospitalsList
  );
  const dispatch = useAppDispatch();

  /**
   * Lifecycle to read hospitals
   */
  useEffect(() => {
    dispatch(readHospitals(0, 99999));
  }, []);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readPermission
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    if (hospitalsList && hospitalsList.length > 0)
      dispatch(readHospitalIpConfigList(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch, hospitalsList]);

  /** This useEffect hook  is triggered when the dependencies
 `hospitalIpConfigList` and `hospitalsList` change. It checks if both lists have data and then
 groups the `hospitalIpConfigList` by `hospitalId`. It then creates a new array `reqData` by
 iterating over the grouped data and mapping it to a new object that contains the hospital name,
 hospital id, allowed IPs with their IDs, and allowed IPs as a comma-separated string. Finally, it
 sets the state of `hospitalIpConfigListState` to the `reqData` array. */
  useEffect(() => {
    if (
      hospitalIpConfigList &&
      hospitalIpConfigList.length > 0 &&
      hospitalsList &&
      hospitalsList.length > 0
    ) {
      const requiredGroup = groupBy(hospitalIpConfigList, 'hospitalId');
      // console.log('REQUIRED GROUP=>', requiredGroup);
      const reqData = [];
      Object.keys(requiredGroup).map((key) => {
        const hospital = hospitalsList.find(
          (hospital) => hospital.id === parseInt(key)
        );
        const allowedIpsWithId = requiredGroup[key].map((item) => {
          return {
            ip: item.allowedIp,
            id: item.id,
          };
        });
        // console.log('allowedIP=>', allowedIps);
        if (hospital)
          reqData.push({
            id: key,
            hospitalName: hospital.hospitalName,
            hospitalId: key,
            allowedIpsWithId: allowedIpsWithId,
            allowedIps: allowedIpsWithId.map((item) => item.ip).join(','),
          });
      });

      sethospitalIpConfigListState(reqData);
    }
  }, [hospitalIpConfigList, hospitalsList]);

  // console.log('HOSPITAL IP CONFIG STATE=>', hospitalIpConfigListState);

  /**
   * This function takes in an ID and an action type, and performs different actions based on the type of
   * action.
   * @param {Number} id
   * @param {Object} action
   */
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
        setConfigId(id);
        setTitle(t('removePermission'));
        setisDeleteWarning(true);
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
    // console.log('hospitalIpConfigListState=>', hospitalIpConfigListState);
    const data = hospitalIpConfigListState.find(
      (config) => config.hospitalId === id
    );
    // console.log('DATA=>', data);
    setConfigId(id);
    setShowModal(true);
    setHospitalId(data?.hospitalId);
    setAllowedIps(data?.allowedIps);
    setallowedIpsWithId(data?.allowedIpsWithId);
    if (action === 'update') {
      setIsUpdate(true);
      setTitle(t('updateIp'));
    } else {
      setTitle(t('viewIp'));
      setIsDisabled(true);
    }
  };
  /**
   * Handles opening the modal for creating new permission
   */
  const handleClickCreate = () => {
    setIsUpdate(false);
    setHospitalId('');
    setAllowedIps('');
    setShowModal(true);
    setTitle(t('createIp'));
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
  const handleClickRemove = (id) => {
    const onSuccess = (response) => {
      handleClickCloseModal();
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      dispatch(readHospitalIpConfigList(activePage - 1, pageSize));
    };
    dispatch(deleteHospitalIpConfig(id, onSuccess));
    setShowRemoveModal(false);
  };
  /**
   * Handle submit Function call updateHospitalIpConfig with user entered data if
   * isUpdate state is true else call createHospitalIpConfig
   * @param {any} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      hospitalId: hospitalId,
      allowedIp: allowedIps,
    };
    if (!isUpdate) {
      const onSuccess = (response) => {
        handleClickCloseModal();
        if (response.message) {
          dispatch(setToast(response.message, true, 'success'));
        }
        dispatch(readHospitalIpConfigList(activePage - 1, pageSize));
      };
      dispatch(createHospitalIpConfig(data, onSuccess));
    }
  };
  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);
  // const filtersApplied = (filters) => {
  //   // console.log("FILTERS=>", filters);
  //   setfiltersAppliedState(filters);
  //   setActivePage(1);
  // };
  /**
   * Validated the IP Address
   * @param {*} e
   */
  // const ipValidator = (e) => {
  //   const value = e.target.value;
  //   setipError(validateCommaSeperatedIP(value));
  //   setAllowedIps(value);
  // };

  /**
   * This function updates the IP value of an item in an array of objects based on the provided ID.
   */
  const onIpValueChange = (e, id) => {
    const value = e.target.value;
    const newAllowedIpsWithId = allowedIpsWithId.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ip: value,
        };
      } else
        return {
          ...item,
        };
    });
    setallowedIpsWithId(newAllowedIpsWithId);
  };

  /**
   * The function handles updating a hospital's IP configuration.
   * @param {Object} item
   */
  const handleUpdate = (item) => {
    const data = {
      hospitalId: hospitalId,
      allowedIp: item.ip,
    };
    if (isUpdate) {
      const onSuccess = (response) => {
        handleClickCloseModal();
        if (response.status) {
          dispatch(setToast(ALERT_MESSAGE.UPDATE_IP_SUCCESS, true, 'success'));
        }
        dispatch(readHospitalIpConfigList(activePage - 1, pageSize));
      };
      dispatch(updateHospitalIpConfig(item.id, data, onSuccess));
    }
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
          <InputForm
            readOnly={isDisabled}
            label={t('Hospital')}
            placeholder="Select Hospital"
            type="select"
            isView={false}
            ipValue={hospitalId}
            onChange={(e) => setHospitalId(e.target.value)}
            options={
              hospitalsList &&
              hospitalsList.map((item) => {
                return {
                  id: item.id,
                  label: item.hospitalName,
                  value: item.id,
                };
              })
            }
          />

          {isUpdate ? (
            <>
              <div>
                {allowedIpsWithId &&
                  allowedIpsWithId.length > 0 &&
                  allowedIpsWithId.map((item, index) => {
                    const i = index + 1;
                    return (
                      <div
                        className="d-flex w-100 align-items-center"
                        key={item.ip}>
                        <div className="flex-grow-1">
                          <InputForm
                            readOnly={isDisabled}
                            label={t('Allowed IP') + ' ' + i}
                            placeholder="Enter Allowed IP"
                            type="text"
                            isView={false}
                            ipValue={item.ip}
                            onChange={(e) => onIpValueChange(e, item.id)}
                          />
                        </div>

                        <span
                          className="mt-4 ps-2 cursor-pointer"
                          onClick={() => handleUpdate(item)}>
                          <FontAwesomeIcon icon={faSave} />
                        </span>

                        <Can
                          performingAction={{
                            component: 'hospital-ip-config',
                            action: 'can view remove',
                          }}
                          removeDiv={true}>
                          <span
                            className="mt-4 ps-2 cursor-pointer"
                            onClick={() =>
                              actionCallback(item.id, {type: 'delete'})
                            }>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </span>
                          {isDeleteWarning && configId === item?.id && (
                            <div className="mt-4 ps-2">
                              <span className="badge rounded-pill text-bg-danger">
                                Are you sure?
                              </span>
                              <button
                                className="btn btn-xxs ms-2 btn-admin-color"
                                type="button"
                                onClick={() => handleClickRemove(item.id)}>
                                Yes
                              </button>
                              <button
                                type="button"
                                className="btn btn-xxs ms-1 btn-admin-color"
                                onClick={() => setisDeleteWarning(false)}>
                                No
                              </button>
                            </div>
                          )}
                        </Can>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <InputForm
              readOnly={isDisabled}
              label={t('Allowed IPs')}
              placeholder="Enter Allowed IPs"
              type="text"
              isView={false}
              ipValue={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
            />
          )}
          {!isDisabled && (
            <div className="d-flex flex-row justify-content-between">
              {!isUpdate && (
                <Button
                  variant="success"
                  type="submit"
                  className="mt-3 modal-btn">
                  Create
                </Button>
              )}
              <Button
                variant="light"
                className="mt-3 modal-btn"
                onClick={handleClickCloseModal}>
                {t('Close')}
              </Button>
            </div>
          )}
        </Form>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>{t('hospitalIpConfigList')}</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'hospital-ip-config',
            action: 'can view addData',
          }}
          removeDiv={true}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={handleClickCreate}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">{t('addNewHospitalIP')}</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          {/* <div className="admin-filter">
            <Filter
              filters={permissionFilter}
              callback={readHospitalIpConfigList}
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
          </div> */}
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
        {/* <div className="d-flex flex-row align-items-center py-4">
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
        </div> */}

        {hospitalIpConfigList && (
          <TableComponent
            component={'hospital-ip-config'}
            tableHeadersData={tableHeadersHospitalIpConfig}
            tableData={hospitalIpConfigListState}
            actionCallback={actionCallback}
            noCheck={true}
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

export default HospitalIpConfig;
