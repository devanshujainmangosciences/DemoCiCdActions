/**
 * Component to List IOS Version with add,edi,delete,capability
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';
import {iosVersionListFilter, tableHeaderIosVersionList} from '../../config';
import {Routes} from '../../routes';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
  // Filter,
} from '../../components';
import format from 'date-fns/format';
import {
  readMobileVersionsList,
  disableMobileVersion,
  createMobileVersion,
  updateMobileVersion,
  readIosMobileVersionsList,
} from '../../actions';
import {VERSION_TYPE, DateFormat} from '../../constants';
import uniqBy from 'lodash/uniqBy';
const IosVersionList = () => {
  const dispatch = useAppDispatch();

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [isInvalidCodePushVersion, setisInvalidCodePushVersion] =
    useState(false);
  const [showCodePushModal, setshowCodePushModal] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [isDisabled, setisDisabled] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [removeMobileVersion, setRemoveMobileVersion] = useState(null);
  const [mobileVersionState, setmobileVersionState] = useState([]);
  const [isInvalidIosVersion, setisInvalidIosVersion] = useState(false);
  const formDataInitialState = {
    id: '',
    iosVersion: '',
    releaseDate: '',
    codePushVersion: '',
  };
  const [formData, setformData] = useState(formDataInitialState);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const {iosVersion, releaseDate, codePushVersion} = formData;
  const mobileVersion = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.iosVersionList
  );
  const iosVersionAll = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.iosVersionListAll
  );

  const mobileVersionPagination = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.pagination
  );
  const [filtersAppliedState, setfiltersAppliedState] = useState({});

  /**Load Program list when components load */
  useEffect(() => {
    if (!mobileVersion) {
      dispatch(readMobileVersionsList(activePage, pageSize, VERSION_TYPE.IOS));
    }
  }, []);
  /**
   * Dispatches readMobileVersionsList when activePage and pagesize changes
   */
  useEffect(() => {
    if (activePage > 0) {
      dispatch(
        readMobileVersionsList(activePage - 1, pageSize, VERSION_TYPE.IOS)
      );
    }
  }, [activePage, pageSize, dispatch]);

  /* The below code is using the `useEffect` hook in a React component to conditionally dispatch an
action to read a list of mobile versions. If the `iosVersionAll` variable is falsy, the
`readMobileVersionsList` action is dispatched with the parameters `0` (for the starting index),
`pageSize` (for the number of items to fetch), `VERSION_TYPE.IOS` (for the type of mobile version to
fetch), `true` (to indicate that this is the initial fetch), and an empty array as the last
parameter. */
  useEffect(() => {
    if (!iosVersionAll)
      dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.IOS, true, []));
  }, [iosVersionAll]);

  /* The below code is using the `useEffect` hook in a React component to format the `releaseDate`
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
        readMobileVersionsList(activePage - 1, pageSize, VERSION_TYPE.IOS)
      );
    };
    const customOnFaliure = () => {
      setShowRemoveModal(false);
    };
    dispatch(
      disableMobileVersion(
        removeMobileVersion,
        VERSION_TYPE.IOS,
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
    setisInvalidIosVersion(false);
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  const filtersApplied = (filters) => {
    // console.log('FILTERS=>', filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };
  /**
   * Function triggers when Add new button is clicked
   */
  const onCreateNewClick = () => {
    dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.IOS, true, []));
    setisUpdate(false);
    setisDisabled(false);
    setshowModal(true);
    setformData(formDataInitialState);
    setTitle('Create IOS Version');
  };
  /**
   * The function sets various states and dispatches an action to read a list of mobile versions for iOS
   * and opens a modal to create a new Code Push version.
   */
  const onCreateNewCodePushVersion = () => {
    dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.IOS, true));
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

  /* The below code is a React useEffect hook that runs when the dependencies (iosVersion,
codePushVersion, selectedVersion, iosVersionAll) change. It checks if the codePushVersion and
iosVersion are available in the iosVersionAll array and sets the isInvalidCodePushVersion state
accordingly. It also checks if the selectedVersion is valid based on the iosVersion and sets the
isInvalidIosVersion state accordingly. */
  useEffect(() => {
    if (codePushVersion && iosVersion && iosVersionAll) {
      const selectedIosVersionCodePushVersions = iosVersionAll
        .filter((item) => item.iosVersion === iosVersion)
        .map((item) => item.codePushVersion);
      setisInvalidCodePushVersion(
        selectedIosVersionCodePushVersions.includes(codePushVersion)
      );
    }

    if (iosVersion && iosVersionAll) {
      const avaliableIosVersion = iosVersionAll.find(
        (item) => item.iosVersion === iosVersion
      );

      if (selectedVersion) {
        if (
          avaliableIosVersion &&
          avaliableIosVersion.iosVersion !== selectedVersion.iosVersion
        )
          setisInvalidIosVersion(true);
        else setisInvalidIosVersion(false);
      } else {
        if (avaliableIosVersion) setisInvalidIosVersion(true);
        else setisInvalidIosVersion(false);
      }
    }
  }, [iosVersion, codePushVersion, selectedVersion, iosVersionAll]);

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
      dispatch(readMobileVersionsList(0, pageSize, VERSION_TYPE.IOS));
      setformData(formDataInitialState);
      handleModalClose();
    };
    if (isUpdate) {
      dispatch(updateMobileVersion(reqData, VERSION_TYPE.IOS, customOnSuccess));
    } else {
      dispatch(createMobileVersion(reqData, VERSION_TYPE.IOS, customOnSuccess));
    }
  };

  return (
    <>
      {/* Delete MODAL */}
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
      {/* NEW IOS VERSION */}
      <CustomModal
        Show={showModal}
        title={title}
        isView={isDisabled}
        handleClose={handleModalClose}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="iosVersion">
            <Form.Label>IOS Version</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter ios Version"
              disabled={isDisabled}
              name="iosVersion"
              value={iosVersion}
              isInvalid={isInvalidIosVersion}
              onChange={handelFormChange}
            />
            {isInvalidIosVersion && (
              <Form.Control.Feedback type="invalid">
                IOS Version is already available
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
                placeholder="Enter codepush Version"
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
                disabled={isInvalidIosVersion}
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
      {/* ADD CODEPUSH VERSION */}
      <CustomModal
        Show={showCodePushModal}
        title={title}
        isView={isDisabled}
        handleClose={handleModalClose}>
        <Form onSubmit={handleSubmit} className="form-modal">
          <Form.Group controlId="iosVersion">
            <Form.Label>IOS Version</Form.Label>
            <Form.Select
              required
              type="select"
              className="version-select"
              disabled={isDisabled}
              name="iosVersion"
              value={iosVersion}
              onChange={handelFormChange}>
              <option value="" hidden>
                Select IOS Version
              </option>
              {iosVersionAll &&
                iosVersionAll.length > 0 &&
                uniqBy(iosVersionAll, 'iosVersion').map((item) => (
                  <option key={item.id} value={item.iosVersion}>
                    {item.iosVersion}
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
                For this ios version the codepush version is avaliable
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
          <h4>IOS Version List</h4>
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
              <span className="ps-1">Add IOS Version</span>
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
              filters={iosVersionListFilter}
              filterAppliedState={filtersAppliedState}
              callback={readIosMobileVersionsList}
              isDispatchCallback={false}
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
              tableHeadersData={tableHeaderIosVersionList}
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

export default IosVersionList;
