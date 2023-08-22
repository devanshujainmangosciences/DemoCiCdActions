/**
 * Component to list android version
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';
import {
  androidVersionFilter,
  tableHeaderAndroidVersionList,
} from '../../config';
import format from 'date-fns/format';

import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
  // Filter,
} from '../../components';

import {
  readMobileVersionsList,
  disableMobileVersion,
  createMobileVersion,
  updateMobileVersion,
  readAndroidMobileVersionsList,
} from '../../actions';
import {VERSION_TYPE, DateFormat} from '../../constants';
import uniqBy from 'lodash/uniqBy';

const AndroidVersionList = () => {
  const dispatch = useAppDispatch();

  const [isInvalidCodePushVersion, setisInvalidCodePushVersion] =
    useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [showCodePushModal, setshowCodePushModal] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [isDisabled, setisDisabled] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [removeMobileVersion, setRemoveMobileVersion] = useState(null);
  const [mobileVersionState, setmobileVersionState] = useState([]);
  const [isInvalidAndroidVersion, setIsInvalidAndroidVersion] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const formDataInitialState = {
    id: '',
    androidVersion: '',
    releaseDate: '',
    codePushVersion: '',
  };
  const [formData, setformData] = useState(formDataInitialState);
  const {androidVersion, releaseDate, codePushVersion} = formData;
  const androidVersionAll = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.androidVersionListAll
  );
  const mobileVersion = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.androidVersionList
  );

  const mobileVersionPagination = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.pagination
  );
  const [filtersAppliedState, setfiltersAppliedState] = useState({});

  /**Load Program list when components load */
  useEffect(() => {
    if (!mobileVersion) {
      dispatch(
        readMobileVersionsList(activePage, pageSize, VERSION_TYPE.ANDROID)
      );
    }
  }, []);

  /** The below code is using the `useEffect` hook in a React component to dispatch an action to read a
list of mobile versions if `androidVersionAll` is falsy. The action is dispatched with parameters
including a page number, page size, version type (in this case, Android), a boolean value indicating
whether to clear the existing list, and an empty array as a filter. The `useEffect` hook is
triggered whenever `androidVersionAll` changes. */
  useEffect(() => {
    if (!androidVersionAll)
      dispatch(
        readMobileVersionsList(0, pageSize, VERSION_TYPE.ANDROID, true, [])
      );
  }, [androidVersionAll]);
  /**
   * Dispatches readMobileVersionsList when activePage and pagesize changes
   */
  useEffect(() => {
    if (activePage > 0) {
      readMobileVersionsList(activePage - 1, pageSize, VERSION_TYPE.ANDROID);
    }
  }, [activePage, pageSize, dispatch]);

  /** The below code is using the `useEffect` hook in a React component to format the `releaseDate`
property of an array of mobile versions. It checks if the `mobileVersion` state has changed and if
it has, it maps over the array and formats the `releaseDate` using the `format` function from a
`DateFormat` utility object. The formatted array is then set as the new state using the
`setmobileVersionState` function. */
  useEffect(() => {
    if (mobileVersion) {
      const reqmobileVersion = mobileVersion.map((mobile) => {
        return {
          ...mobile,
          releaseDate: format(
            new Date(mobile.releaseDate),
            DateFormat.DD_MM_YYYY_SLASH
          ),
        };
      });
      setmobileVersionState(reqmobileVersion);
    }
  }, [mobileVersion]);

  /**
   * This Function will handle View manufacture and remove manufacture
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action) => {
    switch (action.type) {
      case 'changeView': {
        const requiredData = mobileVersion.find((item) => item.id === id);
        setSelectedVersion(requiredData);
        const reqState = {...requiredData};
        const requiredDate = format(
          new Date(reqState.releaseDate),
          DateFormat.US_DATE_DASH
        );
        reqState['releaseDate'] = requiredDate;
        setformData(reqState);

        if (action.label === 'View Details') {
          setisDisabled(true);
          setisUpdate(false);
          setshowModal(true);
        } else {
          setisDisabled(false);
          setisUpdate(true);
          setshowModal(true);
        }
        break;
      }
      case 'confirmModal': {
        setRemoveMobileVersion(id);
        setTitle('Disable Version');
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
    const customOnSuccess = () => {
      setShowRemoveModal(false);
      dispatch(
        readMobileVersionsList(activePage - 1, pageSize, VERSION_TYPE.ANDROID)
      );
    };
    const customOnFaliure = () => {
      setShowRemoveModal(false);
    };
    dispatch(
      disableMobileVersion(
        removeMobileVersion,
        VERSION_TYPE.ANDROID,
        customOnSuccess,
        customOnFaliure
      )
    );
  };
  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => {
    setShowRemoveModal(false);
    setshowModal(false);
    setshowCodePushModal(false);
    setisInvalidCodePushVersion(false);
    setIsInvalidAndroidVersion(false);
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  /**
   * The function sets various states and dispatches an action to create a new Android version.
   */
  const onCreateNewClick = () => {
    dispatch(
      readMobileVersionsList(0, pageSize, VERSION_TYPE.ANDROID, true, [])
    );
    setisUpdate(false);
    setisDisabled(false);
    setshowModal(true);
    setshowCodePushModal(false);
    setformData(formDataInitialState);
    setTitle('Create Android Version');
  };

  /**
   * The function sets various states and dispatches an action to read a list of mobile versions for
   * Android in order to create a new Code Push version.
   */
  const onCreateNewCodePushVersion = () => {
    dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.ANDROID, true));
    setisUpdate(false);
    setisDisabled(false);
    setshowCodePushModal(true);
    setformData(formDataInitialState);
    setTitle('Create Code Push Version');
  };

  /**
   * This function updates the state of a form data object with the new value of the input field that
   * triggered the change event.
   */
  const handelFormChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value});
  };

  /* The below code is a React useEffect hook that runs when any of the dependencies (androidVersion,
 codePushVersion, androidVersionAll, selectedVersion) change. It checks if the codePushVersion and
 androidVersion are both defined, and if so, it filters the androidVersionAll array to get the
 codePushVersions that match the androidVersion, and then checks if the current codePushVersion is
 included in that filtered array. If it is, it sets the isInvalidCodePushVersion state to true. */
  useEffect(() => {
    if (codePushVersion && androidVersion) {
      const selectedIosVersionCodePushVersions = androidVersionAll
        .filter((item) => item.androidVersion === androidVersion)
        .map((item) => item.codePushVersion);
      setisInvalidCodePushVersion(
        selectedIosVersionCodePushVersions.includes(codePushVersion)
      );
    }

    if (androidVersion && androidVersionAll) {
      const avaliableAndroidVersion = androidVersionAll.find(
        (item) => item.androidVersion === androidVersion
      );
      if (selectedVersion) {
        if (
          avaliableAndroidVersion &&
          avaliableAndroidVersion.androidVersion !==
            selectedVersion.androidVersion
        )
          setIsInvalidAndroidVersion(true);
        else setIsInvalidAndroidVersion(false);
      } else {
        if (avaliableAndroidVersion) setIsInvalidAndroidVersion(true);
        else setIsInvalidAndroidVersion(false);
      }
    }
  }, [androidVersion, codePushVersion, androidVersionAll, selectedVersion]);

  /**
   * This function handles the submission of form data for creating or updating a mobile version,
   * dispatches relevant actions, and executes a custom success function.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      ...formData,
      releaseDate: new Date(releaseDate),
    };
    const customOnSuccess = () => {
      dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.ANDROID));
      setformData(formDataInitialState);
      handleModalClose();
    };
    if (isUpdate) {
      dispatch(
        updateMobileVersion(reqData, VERSION_TYPE.ANDROID, customOnSuccess)
      );
    } else {
      dispatch(
        createMobileVersion(reqData, VERSION_TYPE.ANDROID, customOnSuccess)
      );
    }
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to disable this mobile version</p>
        <Button
          variant="danger"
          type="button"
          onClick={handleClickYes}
          className="mt-3">
          Disable
        </Button>
      </CustomModal>
      <CustomModal
        Show={showModal}
        title={title}
        isView={isDisabled}
        handleClose={handleModalClose}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="androidVersion">
            <Form.Label>Android Version</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter android Version"
              disabled={isDisabled}
              name="androidVersion"
              value={androidVersion}
              isInvalid={isInvalidAndroidVersion}
              onChange={handelFormChange}
            />
            {isInvalidAndroidVersion && (
              <Form.Control.Feedback type="invalid">
                Android Version is already available
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {/* <Form.Group controlId="codePushVersion" className="mt-2">
            <Form.Check
              disabled={isDisabled}
              name="isCodePushVersion"
              label="Is Code push Version"
              checked={isCodePushVersion}
              onChange={(e) => setisCodePushVersion(e.target.checked)}
            />
          </Form.Group> */}

          {codePushVersion && (
            <Form.Group controlId="codePushVersion">
              <Form.Label>Code Push Version</Form.Label>
              <Form.Control
                required={codePushVersion ? true : false}
                type="text"
                placeholder="Enter code push Version"
                disabled={isDisabled}
                name="codePushVersion"
                value={codePushVersion}
                onChange={handelFormChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId="releaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              required
              type="date"
              disabled={isDisabled}
              name="releaseDate"
              value={releaseDate}
              onChange={handelFormChange}
            />
          </Form.Group>

          <div className="d-flex flex-row justify-content-between">
            {!isDisabled && (
              <Button
                variant="success"
                type="submit"
                disabled={isInvalidAndroidVersion}
                className="mt-3 modal-btn">
                {isUpdate ? 'Update' : 'Create'}
              </Button>
            )}
            <Button
              variant="light"
              className="mt-3 modal-btn"
              onClick={handleModalClose}>
              Close
            </Button>
          </div>
        </Form>
      </CustomModal>
      <CustomModal
        Show={showCodePushModal}
        title={title}
        isView={isDisabled}
        handleClose={handleModalClose}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="androidVersion">
            <Form.Label>Android Version</Form.Label>
            <Form.Select
              required
              type="select"
              disabled={isDisabled}
              name="androidVersion"
              value={androidVersion}
              onChange={handelFormChange}>
              <option value="" hidden>
                Select Android Version
              </option>
              {androidVersionAll &&
                androidVersionAll.length > 0 &&
                uniqBy(androidVersionAll, 'androidVersion').map((item) => (
                  <option key={item.id} value={item.androidVersion}>
                    {item.androidVersion}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="codePushVersion">
            <Form.Label>Code Push Version</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter codepush Version"
              disabled={isDisabled}
              name="codePushVersion"
              value={codePushVersion}
              isInvalid={isInvalidCodePushVersion}
              onChange={handelFormChange}
            />
            {isInvalidCodePushVersion && (
              <Form.Control.Feedback type="invalid">
                For this android version the codepush version is avaliable
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="releaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control
              required
              type="date"
              disabled={isDisabled}
              name="releaseDate"
              value={releaseDate}
              onChange={handelFormChange}
            />
          </Form.Group>

          <div className="d-flex flex-row justify-content-between">
            {!isDisabled && (
              <Button
                variant="success"
                type="submit"
                disabled={isInvalidCodePushVersion}
                className="mt-3 modal-btn">
                {isUpdate ? 'Update' : 'Create'}
              </Button>
            )}
            <Button
              variant="light"
              className="mt-3 modal-btn"
              onClick={handleModalClose}>
              Close
            </Button>
          </div>
        </Form>
      </CustomModal>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>Android Version List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'mobile-version-listing',
            action: 'can view addData',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0 d-flex gap-2">
            <button
              onClick={onCreateNewClick}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add Android Version</span>
            </button>
            <button
              onClick={onCreateNewCodePushVersion}
              className="btn-patient-theme-small bg-dark px-4 ">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add Code Push Version</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-end">
          <div className="admin-filter">
            <Filter
              filters={androidVersionFilter}
              filterAppliedState={filtersAppliedState}
              callback={readAndroidMobileVersionsList}
              filtersApplied={filtersApplied}
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

        {mobileVersionState && mobileVersionState.length > 0 ? (
          <>
            <TableComponent
              component="mobile-version-listing"
              classes="align-items-center"
              tableHeadersData={tableHeaderAndroidVersionList}
              tableData={mobileVersionState}
              actionCallback={actionCallback}
            />

            <CustomPagination
              paginationDetail={mobileVersionPagination}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </>
        ) : (
          <>No Data Available</>
        )}
      </div>
    </>
  );
};

export default AndroidVersionList;
