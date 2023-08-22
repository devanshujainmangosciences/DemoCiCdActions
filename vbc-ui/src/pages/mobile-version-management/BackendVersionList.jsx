/**
 * Component to List Backend Version with their mappings
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../redux/redux-hooks';
import {tableHeaderBackendVersionList} from '../../config';
import {Routes} from '../../routes';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  // Filter,
} from '../../components';
import format from 'date-fns/format';

import {
  readMobileVersionsList,
  disableMobileVersion,
  updateMobileVersion,
} from '../../actions';
import {VERSION_TYPE, DateFormat} from '../../constants';

import {useNavigate} from 'react-router-dom';

const BackendVersionList = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [title, setTitle] = useState('');
  const [requiredVersion, setRequiredVersion] = useState(null);
  const [mobileVersionState, setmobileVersionState] = useState([]);

  const mobileVersion = useAppSelector(
    (state) => state.admin.mobileVersionManagement?.backendVersionList
  );

  const mobileVersionPagination = useAppSelector(
    (state) => state.admin.mobileVersionManagement.pagination
  );

  /**Load Program list when components load */
  useEffect(() => {
    if (!mobileVersion) {
      dispatch(
        readMobileVersionsList(
          activePage,
          pageSize,
          VERSION_TYPE.BACKEND,
          false
        )
      );
    }
  }, []);
  /**
   * Dispatches readMobileVersionsList when activePage and pagesize changes
   */
  useEffect(() => {
    if (activePage > 0) {
      readMobileVersionsList(
        activePage - 1,
        pageSize,
        VERSION_TYPE.BACKEND,
        false
      );
    }
  }, [activePage, pageSize, dispatch]);

  /** This `useEffect` hook is used to transform the `mobileVersion` data received from the Redux store
into a format that can be easily displayed in the table. It maps over each version object in the
`mobileVersion` array and creates a new object with additional properties such as
`iosMappedVersions`, `androidMappedVersions`, and `releaseDate`. These properties are created by
manipulating the data in the original version object. The `format` function from the `date-fns`
library is used to format the `releaseDate` property into a specific date format. The transformed
version objects are then stored in the `mobileVersionState` state variable using the
`setmobileVersionState` function. This `useEffect` hook is triggered whenever the `mobileVersion`
state variable changes. */
  useEffect(() => {
    if (mobileVersion) {
      const reqmobileVersion = mobileVersion.map((version) => {
        return {
          ...version,
          iosMappedVersions:
            version.iosVersions.length > 0
              ? version.iosVersions.map((ios) => (
                  <span
                    className="badge text-bg-primary ms-1"
                    key={ios.iosVersion}>
                    {ios.iosVersion}(
                    {ios.codePushVersion ? ios.codePushVersion : 'N/A'})
                  </span>
                ))
              : 'N/A',
          androidMappedVersions:
            version.iosVersions.length > 0
              ? version.androidVersions.map((android) => (
                  <span
                    className="badge text-bg-primary ms-1"
                    key={android.androidVersion}>
                    {android.androidVersion}(
                    {android?.codePushVersion
                      ? android?.codePushVersion
                      : 'N/A'}
                    )
                  </span>
                ))
              : 'N/A',
          releaseDate: format(
            new Date(version.releaseDate),
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
        let URL = action.url;
        history(URL, {state: {label: action.label, id: id}});
        break;
      }
      case 'confirmModal': {
        setRequiredVersion(id);
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
        readMobileVersionsList(0, pageSize, VERSION_TYPE.BACKEND, false)
      );
    };
    const customOnSuccessUpdate = () => {
      dispatch(
        disableMobileVersion(
          requiredVersion,
          VERSION_TYPE.BACKEND,
          customOnSuccess
        )
      );
    };
    const reqData = {
      id: requiredVersion,
      backendVersion: '',
      releaseDate: new Date(),
      iosVersionIds: [],
      androidVersionIds: [],
    };

    dispatch(
      updateMobileVersion(reqData, VERSION_TYPE.BACKEND, customOnSuccessUpdate)
    );
  };
  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => {
    setShowRemoveModal(false);
  };

  /**
   * This function sets the state of applied filters and resets the active page to 1.
   */
  // const filtersApplied = (filters) => {
  //   // console.log("FILTERS=>", filters);
  //   setfiltersAppliedState(filters);
  //   setActivePage(1);
  // };

  return (
    <>
      {/* Delete Modal */}
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

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  mb-3">
        <div className="d-block mb-md-0">
          <h4>Backend Version List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'mobile-version-listing',
            action: 'can view addData',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              // onClick={onCreateNewClick}
              onClick={() => history(Routes.BackendVersionCreate.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add New Version</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-end">
          <div className="admin-filter">
            {/* <Filter
                filters={pbpProgramFilter}
                data={{
                  manufactureList,
                  hospitalList,
                  drugList,
                }}
                filterAppliedState={filtersAppliedState}
                callback={readProgram}
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
              </Filter> */}
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
              tableHeadersData={tableHeaderBackendVersionList}
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

export default BackendVersionList;
