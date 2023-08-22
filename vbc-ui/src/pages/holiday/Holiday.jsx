/**
 * This Component renders VBC Drug schedule List. User can create, edit and delete drug schedule from here
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons/faPlus';
import {Button, Row, Col, Tabs, ListGroup} from '@themesberg/react-bootstrap';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {Routes} from '@/routes';
import {Can, CustomModal, Filter} from '@/components';
import {useNavigate} from 'react-router';
import {getHolidaysForYear, getSundaysForYear} from '@/actions';
import {Tab} from 'bootstrap';
import {MONTH} from '@/data/months';
import format from 'date-fns/format';
import {DateFormat} from '../../constants';

const Holiday = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  // const [activePage, setActivePage] = useState(1);
  const [title, setTitle] = useState('');
  // const [removeManufacturerId, setRemoveManufacturerId] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());
  const holidayListStore = useAppSelector((state) => state.admin.holidayList);
  const [holidayList, setHolidayList] = useState([]);
  const [key, setKey] = useState('JANUARY');

  /**   This `useEffect` hook is watching for changes in the `holidayListStore` variable and updating the
`holidayList` state with the new value of `holidayListStore` if it exists. This is useful for
keeping the component's state in sync with the Redux store. */
  useEffect(() => {
    if (holidayListStore) {
      setHolidayList(holidayListStore);
    }
  }, [holidayListStore]);

  /** This is a `useEffect` hook that is watching for changes in the `selectedYear` variable. Whenever
 `selectedYear` changes, it dispatches the `getHolidaysForYear` action with the new value of
 `selectedYear`. This is useful for fetching the holidays for the selected year whenever the user
 changes the year. The `useEffect` hook only runs when `selectedYear` changes because it is passed
 as the second argument to the hook's dependency array. */
  useEffect(() => {
    if (selectedYear) {
      dispatch(getHolidaysForYear(selectedYear));
    }
  }, [selectedYear]);

  // console.log('HOLIDAY LIST=>', holidayList);

  /**
   * This Function will handle View manufacture and remove manufacture
   * @param { Integer } id
   * @param { Object } action
   */
  // const actionCallback = (id, action) => {
  //   switch (action.type) {
  //     case 'changeView': {
  //       let URL = action.url;
  //       URL = URL.replace(':id', id);
  //        history(URL, {state: action.label});
  //       break;
  //     }
  //     case 'confirmModal': {
  //       setRemoveManufacturerId(id);
  //       setTitle('Remove manufacturer');
  //       setShowRemoveModal(true);
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };

  // const onEditHoliday = (index, data, month) => {
  //   const dataToSend = {index, data, month};
  //   let URL = Routes.EditHoliday.path;
  //   URL = URL.replace(':id', data);
  //   history({pathname: URL, state: dataToSend});
  // };

  /**
   * The function sets the title and shows a modal for removing a holiday.
   */
  const onDeleteHoliday = () => {
    setTitle('Remove Holiday');
    setShowRemoveModal(true);
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
   * The function generates a list of year options based on the current year and a given number of
   * years.
   * @returns The function `renderYearOptions` returns an array of JSX `option` elements, each
   * representing a year starting from the current year and going up to `number` years in the future.
   * The `option` elements have a `key` attribute set to the year and a `value` attribute set to the
   * year as well. The text content of each `option` element is the year itself.
   * @param {Number} number
   */
  const renderYearOptions = (number) => {
    let years = [];
    for (let i = 0; i < number; i++) {
      const date = new Date().getFullYear() + i;
      years.push(date);
    }
    if (years.length > 0) {
      return years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ));
    }
  };

  /**
   * This function renders holiday tabs based on a given holiday list.
   * @returns The function `renderHolidayTabs` returns an array of `Tab` components, where each `Tab`
   * component has a title corresponding to a month name and an event key corresponding to the same
   * month name. The `Tab` component also contains a `ListGroup` component that renders the holiday data
   * for that month using the `renderHolidayData` function.
   * @param {Array} holidayList
   */
  const renderHolidayTabs = (holidayList) => {
    if (holidayList) {
      // console.log(holidayList);
      // const months = Object.keys(holidayList)
      //   .sort(function(a,b){
      //     return allMonths.indexOf(a) - allMonths.indexOf(b);
      // });;
      // console.log('HOLIDAY LIST=>',holidayList)
      const allMonths = MONTH.map((month) => month.name.toUpperCase());
      // console.log("ALL MONTHS=>",allMonths)
      // console.log("MONTHS=>",months)

      return allMonths.map((month) => (
        <Tab eventKey={month} title={month} key={month}>
          <ListGroup>{renderHolidayData(month, holidayList)}</ListGroup>
        </Tab>
      ));
    }
  };

  /**
   * The function renders a list of holidays for a given month, with the option to delete a holiday if
   * the user has permission.
   * @returns The function `renderHolidayData` returns either an array of `ListGroup.Item` components or
   * a `div` element with the text "No Holiday in {month}". The returned value depends on whether
   * `holidayData` exists and has a length greater than 0.
   * @param {String} month
   * @param {Array} holidayList
   */
  const renderHolidayData = (month, holidayList) => {
    const holidayData = holidayList[month];
    if (holidayData && holidayData.length > 0) {
      return holidayData.map((data, index) => (
        <ListGroup.Item key={data + index}>
          <div className="row">
            <div className="col-10">
              {format(new Date(data.date), DateFormat.LOCALIZED_LONG_DATE)}:{' '}
              {data.remark}
            </div>
            <div className="col">
              {/* <Button onClick={() => onEditHoliday(index, data, month)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>{' '} */}

              <Can
                performingAction={{
                  component: 'admin-holiday-listing',
                  action: 'can delete holiday invalid action',
                }}>
                <Button onClick={() => onDeleteHoliday(index, data, month)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Can>
            </div>
          </div>
        </ListGroup.Item>
      ));
    } else {
      <div> No Holiday in {month}</div>;
    }
  };

  /**
   * This function populates the Sundays for a selected year.
   */
  const populateSundayForYear = () => {
    if (selectedYear) {
      // console.log('SELECTED YEAR=>', selectedYear);
      dispatch(getSundaysForYear(selectedYear));
    }
  };

  return (
    <>
      <CustomModal
        Show={showRemoveModal}
        title={title}
        handleClose={handleModalClose}>
        <p>Are you sure you want to remove this Holiday</p>
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
          <h4>Holiday List</h4>
          <p className="mb-0"></p>
        </div>
        <Can
          performingAction={{
            component: 'admin-holiday-listing',
            action: 'can add holiday',
          }}>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button
              onClick={() => history(Routes.NewHoliday.path)}
              className="btn-patient-theme-small bg-dark px-4">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-1">Add New Holiday</span>
            </button>
          </div>
        </Can>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between ">
          <Col>
            <div className="admin-filter">
              <Filter
                filters={[]}
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
                    value={selectedYear}
                    name="selectedYear"
                    onChange={(e) => setselectedYear(e.target.value)}
                    required>
                    <option value="" hidden>
                      Select Year
                    </option>
                    {renderYearOptions(5)}
                  </select>
                </div>
              </div>
              <div>
                <Can
                  performingAction={{
                    component: 'admin-holiday-listing',
                    action: 'can populate sundays',
                  }}>
                  <button
                    onClick={populateSundayForYear}
                    className="btn-patient-theme-small bg-dark px-4">
                    <span>Populate Sunday</span>
                  </button>
                </Can>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="px-0 bg-white px-4 rounded py-2">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3">
          {renderHolidayTabs(holidayList)}
        </Tabs>
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

        {/* {VbcDrugScheduleData && (
          <TableComponent
            component={"manufacturer-listing"}
            classes="align-items-center"
            tableHeadersData={tableHeadersVbcDrugSchedule}
            tableData={VbcDrugScheduleData}
            actionCallback={actionCallback}
          />
        )}
        <CustomPagination
          // paginationDetail={pagination}
          activePage={activePage}
          setActivePage={setActivePage}
        /> */}
      </div>
    </>
  );
};

export default Holiday;
