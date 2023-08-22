/**
 * This Component renders VBC Drug schedule List. User can create, edit and delete drug schedule from here
 */
import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {tableHeadersVbcDrugSchedule} from '@/config';

import {
  Can,
  TableComponent,
  CustomModal,
  CustomPagination,
  Filter,
} from '../../components';
import {useNavigate, useLocation} from 'react-router';
import {getMedicationScheduleByDrugId, drugsList} from '@/actions';
import RoutePage from '@/components/RoutePage';
import {Routes} from '@/routes';
import {useTranslation} from 'react-i18next';

const VbcDrugSchedule = () => {
  const {t} = useTranslation(['drugSchedule']);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const recievedDrug = location?.state?.drugId;
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [title, setTitle] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [drugs, setDrugs] = useState([]);
  const [scheduleState, setscheduleState] = useState([]);
  const [selectedDrug, setselectedDrug] = useState('');
  const drugsListRedux = useAppSelector((state) => state.template.drugList);
  const medicationSchedule = useAppSelector(
    (state) => state.admin.medicationScheduleList
  );

  useEffect(() => {
    dispatch(drugsList());
  }, []);

  /** This `useEffect` hook is responsible for setting up the initial state of the component and updating
it whenever the `drugsListRedux` state changes. */
  useEffect(() => {
    if (!drugsListRedux) dispatch(drugsList());
    else {
      setDrugs(drugsListRedux);
      if (drugsListRedux && drugsListRedux.length > 0) {
        if (recievedDrug) setselectedDrug(recievedDrug);
        else setselectedDrug(drugsListRedux[0].id);
      }
    }
  }, [drugsListRedux]);

  /**This `useEffect` hook is responsible for fetching the medication schedule for the selected drug
whenever the `selectedDrug` state changes. It calls the `getMedicationScheduleByDrugId` action
creator with the `selectedDrug` as a parameter. The dependency array `[selectedDrug]` ensures that
the effect is only triggered when the `selectedDrug` state changes. */
  useEffect(() => {
    if (selectedDrug) {
      dispatch(getMedicationScheduleByDrugId(selectedDrug));
    }
  }, [selectedDrug]);

  /* This `useEffect` hook is responsible for updating the `scheduleState` state whenever the
`medicationSchedule` state changes. It checks if `medicationSchedule` is truthy and then sets the
`scheduleState` state to the value of `medicationSchedule`. The dependency array
`[medicationSchedule]` ensures that the effect is only triggered when the `medicationSchedule` state
changes. */
  useEffect(() => {
    if (medicationSchedule) {
      const newData = medicationSchedule.map((schedule) => {
        return {
          ...schedule,
          paidCycleHtml: schedule?.paidCycle ? t('paid') : t('free'),
        };
      });
      setscheduleState(newData);
    }
  }, [medicationSchedule]);

  /**
   * This Callback acts like ComponentDidMount and ComponentDidUpdate which is used to dispatch readManufacturers to get manufacturersList array
   */
  // useEffect(() => {
  //   if (!manufacturersList) {
  //     dispatch(readManufacturers());
  //   }
  // }, [manufacturersList, dispatch]);

  /**
   * Whenever currentPage or pageSize changes this callback will dispatch readManufacturers
   * to get currentPage data or data with specific size
   */
  // useEffect(() => {
  //   dispatch(readManufacturers(activePage - 1, pageSize));
  // }, [activePage, pageSize, dispatch]);

  /**
   * This Function will handle View manufacture and remove manufacture
   * @param { Integer } id
   * @param { Object } action
   */
  const actionCallback = (id, action, item) => {
    switch (action.type) {
      case 'changeView': {
        let URL = action.url;
        URL = URL.replace(':id', id);
        history(URL, {state: {type: action.label, item: item}});
        break;
      }
      case 'confirmModal': {
        setTitle('Remove manufacturer');
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
    // const onSuccess = (response) => {
    //   if (response.message) {
    //     dispatch(setToast(response.message, true, 'warning'));
    //   }
    //   dispatch(readManufacturers());
    //   // return {type: SET_DELETE_MANUFACTURER, payload: response.data};
    // };
    // deleteManufacturer(removeManufacturerId, onSuccess);
    setShowRemoveModal(false);
  };

  /**
   * Handles close Modal
   *
   */
  const handleModalClose = () => setShowRemoveModal(false);
  /**
   * This function renders a list of drug options with their brand and generic names as values.
   * @param {Array} drugs
   */
  const renderDrugOptions = (drugs) =>
    drugs &&
    drugs.length > 0 &&
    drugs.map((drug) => (
      <option key={drug.id} value={drug.id}>
        {`${drug.brandName}-${drug.drugGenericName}`}
      </option>
    ));

  /**
   * This function sets the selected drug value based on the user's input.
   */
  const onDrugSelect = (e) => {
    const value = e.target.value;
    setselectedDrug(value);
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to remove this PBP Drug Schedule</p>
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
          <h4>PBP Medication Schedule List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'manufacturer-listing',
            action: 'can add newManufacturer',
          }}>
          {/* <div className="btn-toolbar mb-2 mb-md-0">
            <Button
              onClick={() => history(Routes.newVbcDrugSchedule.path)}
              className="add-form"
              variant="dark"
              size="sm">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add New Drug Schedule</span>
            </Button>
          </div> */}
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-start">
          <Col>
            <div className="admin-filter">
              <Filter
                filters={[]}
                activePage={activePage - 1}
                pageSize={pageSize}
                type="mango-executive"
                classes="ms-3 h-100 row">
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
          </Col>
          <Col>
            <div className="d-flex flex-wrap gap-2">
              <div>
                <div className="select-box">
                  <select
                    value={selectedDrug}
                    name="selectedDrug"
                    onChange={onDrugSelect}
                    required>
                    <option value="" hidden>
                      Select Drug
                    </option>
                    {renderDrugOptions(drugs)}
                  </select>
                </div>
              </div>
              <div>
                {' '}
                <RoutePage
                  url={Routes.ViewDrug.path}
                  id={selectedDrug}
                  state="View Details">
                  <button className="btn-patient-theme-small bg-dark px-4">
                    View Medication
                  </button>
                </RoutePage>
              </div>
            </div>
          </Col>
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

        {scheduleState && (
          <TableComponent
            component={'admin-drug-schedule-listing'}
            classes="align-items-center"
            tableHeadersData={tableHeadersVbcDrugSchedule}
            tableData={scheduleState}
            actionCallback={actionCallback}
          />
        )}
        <CustomPagination
          // paginationDetail={pagination}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
    </>
  );
};

export default VbcDrugSchedule;
