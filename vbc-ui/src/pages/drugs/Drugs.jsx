/**
 * This Component renders Drug List. User can create, edit and delete Drug from here
 * This Component gets drugsList, deleteDrug and pagination states from
 * Redux store as props and history is mapped to props which is used to navigate.
 * On Component mount readDrugs function is called
 * to get drugsList Array which is mapped inside this component
 * IMPORTANT:
 * drugsList, deleteDrug are required
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Form, Button, Row} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {connect} from 'react-redux';
import {Routes} from '@/routes';
import PropTypes from 'prop-types';
import {
  readDrugs,
  deleteDrug,
  toggelDrugVisibility,
} from '../../actions/drugActions';
import {tableHeadersDrug} from '@/config';
import {setToast} from '@/actions/appActions';
import {actionTypes} from '@/constants/actionTypes';
import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '@/components';
import {drugsFilter} from '@/config';
import {useTranslation} from 'react-i18next';
import {readManufacturers} from '@/actions';
import {Link, useNavigate} from 'react-router-dom';
import {ALERT_MESSAGE} from '../../constants';

const {SET_DELETE_DRUG} = actionTypes;

function Drug(props) {
  const {t} = useTranslation(['drugSchedule']);
  const {drugsList, deleteDrug, pagination} = props;
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const manufacturers = useAppSelector(
    (state) => state.manufacturers.manufacturersList
  );
  const [title, setTitle] = useState('');
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [manufactureList, setManufactureList] = useState([]);
  // const [bulkAction, setBulkAction] = useState('');
  const [removeDrugId, setRemoveDrugId] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [drugsListingState, setdrugsListingState] = useState([]);
  const dispatch = useAppDispatch();

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readDrugs to get drugsList array
   */
  useEffect(() => {
    if (!drugsList) {
      dispatch(readDrugs());
    } else {
      const newData = drugsList.map((drug) => {
        return {
          ...drug,
          drugId: (
            <Link
              to={Routes.VbcDrugSchedule.path}
              state={{drugId: drug?.id}}
              className="drug-link">
              Create PBP Medication Schedule
            </Link>
          ),
          toggleVisibleStatus: (
            <Form.Check
              type="switch"
              id="custom-switch"
              value={drug?.visible}
              onChange={(e) => onToggleMedication(e, drug)}
              checked={drug?.visible}
              label={drug?.visible ? 'Active' : 'Inactive'}
            />
          ),
        };
      });
      setdrugsListingState(newData);
    }
  }, [drugsList, dispatch]);

  const onToggleMedication = (e, drug) => {
    const prevVisibleValue = e.target.value === 'true' ? true : false;
    const customOnSuccess = () => {
      dispatch(readDrugs(activePage - 1, pageSize));
    };
    dispatch(
      toggelDrugVisibility(drug?.id, !prevVisibleValue, customOnSuccess)
    );
  };
  // console.log('drugsListingState=>', drugsListingState);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readDrugs
   * to get currentPage data or data with specific size
   */
  useEffect(() => {
    dispatch(readDrugs(activePage - 1, pageSize));
  }, [activePage, pageSize, dispatch]);

  /** This `useEffect` hook is used to fetch the list of manufacturers from the Redux store and set the
 `manufactureList` state based on the retrieved data. If the `manufacturers` array is not available
 in the Redux store, it dispatches the `readManufacturers` action to fetch the data. Once the data
 is available, it maps over the `manufacturers` array and creates a new array of objects with `id`,
 `label`, and `value` properties, and sets the `manufactureList` state with the new array. The
 `dispatch` and `manufacturers` variables are added as dependencies to the `useEffect` hook, so that
 it runs whenever either of these variables change. */
  useEffect(() => {
    if (!manufacturers) {
      dispatch(readManufacturers());
    } else {
      setManufactureList(
        manufacturers.map((manufacturer) => ({
          id: manufacturer.id,
          label: manufacturer.manufacturerName,
          value: manufacturer.id,
        }))
      );
    }
  }, [dispatch, manufacturers]);

  /**
   * This Function will handle View drugs and remove drugs
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
        const isDrugActive = drugsListingState.find(
          (drug) => drug.id === id
        ).visible;
        if (!isDrugActive) {
          setRemoveDrugId(id);
          setTitle('Remove drug');
          setShowRemoveModal(true);
        } else
          dispatch(setToast(ALERT_MESSAGE.DRUG_IS_ACTIVE, true, 'warning'));
        break;
      }
      default:
        break;
    }
  };
  /**
   * Deletes the Drug when user click confirm delete
   * by dispatching deleteDrug
   */
  const handleClickYes = () => {
    const onSuccess = (response) => {
      setShowRemoveModal(false);
      if (response.message) {
        dispatch(setToast(response.message, true, 'success'));
      }
      dispatch(readDrugs());
      // readDrugs();
      // return {
      //   type: SET_DELETE_DRUG,
      //   payload: response.data,
      // };
    };
    deleteDrug(removeDrugId, onSuccess);
  };

  /**
   * This function sets the state of a variable called "showRemoveModal" to false, effectively closing a
   * modal.
   */
  const handleModalClose = () => setShowRemoveModal(false);
  /**
   * This function sets the state of applied filters and resets the active page to 1.
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
        <p>Are you sure you want to remove this drug</p>
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
          <h4>{t('drug-list')}</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'drug-listing',
            action: 'can add newDrug',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewDrug.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span>{t('add-new-drug')}</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-end align-items-center">
          <div className="admin-filter">
            <Filter
              filters={drugsFilter}
              data={{
                manufactureList,
              }}
              filterBody={true}
              filterAppliedState={filtersAppliedState}
              callback={readDrugs}
              filtersApplied={filtersApplied}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="drugs"
              classes="h-100 row">
              <div className="children">
                <div className="show-entries">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}>
                    <option value="" hidden>
                      {t('selectOne')}
                    </option>
                    <option value={10}>{t('showTenEntries')}</option>
                    <option value={20}>{t('showTwentyEntries')}</option>
                    <option value={30}>{t('showThirtyEntries')}</option>
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
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                {[10, 20, 30].map((size) => (
                  <Dropdown.Item
                    className="d-flex fw-bold"
                    value={size}
                    onClick={() => setPageSize(size)}
                  >
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
        {drugsList && (
          <TableComponent
            component={'drug-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersDrug}
            tableData={drugsListingState}
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
  drugsList: state.drugs.drugsList,
  drug: state.drugs.selectedDrug,
  pagination: state.drugs.pagination,
});

const mapDispatchToProps = {
  deleteDrug,
};
Drug.propTypes = {
  drugsList: PropTypes.array,
  drug: PropTypes.object,
  deleteDrug: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Drug);
