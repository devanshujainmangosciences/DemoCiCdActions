/**
 * This Component renders Radiology Reports Details with yearwise Calendar and monthwise Calender
 * This Component gets clinicalNotes, count and getOtherTestsDetails states from
 * Redux store as props. On Component mount getOtherTestsDetails function is called
 * to get clinicalNotes Array which is mapped inside this component
 * IMPORTANT:
 * clinicalNotes, getOtherTestsDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Tab, Accordion, Table} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DoctorNotesIcon, LocationIcon} from '@/assets/icons';
import {getOtherTests} from '@/actions';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';
import InfiniteScroll from 'react-infinite-scroll-component';
import CustomToggle from './children/CustomToggle';
import {actionTypes, DateFormat} from '../../constants';
import ReportsAndTestMobileView from './ReportsAndTestMobileView';

import {
  checkValue,
  convertDateToUTC,
  selectMonthWithData,
  checkifReportsDataInSync,
  checkEnvVariablesText,
} from '@/services/utility';
import NoReportsFound from '@/components/NoReportsFound';

const {SET_OTHER_TESTS} = actionTypes;

const OtherTests = function (props) {
  const {t} = useTranslation(['otherTests']);
  const {
    overallData,
    othertests,
    count,
    getOtherTests,
    pagination,
    dataSynchronized,
  } = props;
  const [otherTestsData, setOtherTestsData] = useState([]);
  const [monthWise, setMonthWise] = useState([]);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isNoOtherTestData, setIsNoOtherTestData] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  /** The above code is using the `useEffect` hook in a React component to check if certain data
  (`overallData`, `othertests`, and `count`) exist and set state variables (`setIsNoOtherTestData`
  and `setIsNoYearData`) accordingly. If `othertests` or `count` do not exist, the corresponding
  state variable is set to `true`, indicating that there is no data for that category. Otherwise,
  the state variable is set to `false`. */
  useEffect(() => {
    if (overallData) {
      if (!othertests) {
        setIsNoOtherTestData(true);
      } else {
        setIsNoOtherTestData(false);
      }
      if (!count) {
        setIsNoYearData(true);
      } else {
        setIsNoYearData(false);
      }
    }
  }, [count, overallData, othertests]);

  const onSuccess = (response) => {
    setOtherTestsData(response.reports);
    return {type: SET_OTHER_TESTS, payload: response};
  };

  /** The below code is using the `useEffect` hook in a React component. It is scrolling the window to
 the top and then checking if `dataSynchronized` is true. If it is true, it calls the
 `getOtherTests` function with some parameters and passes in an `onSuccess` callback function. The
 `useEffect` hook will re-run whenever `dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getOtherTests(0, selectedYear, activeMonth, onSuccess);
  }, [dataSynchronized]);

  /** The below code is using the `useEffect` hook in a React component. It is watching for changes in
 the `selectedYear` and `activeMonth` variables and calling the `getOtherTests` function with the
 parameters `0`, `selectedYear`, `activeMonth`, and `onSuccess` whenever there is a change. This
 code is likely part of a larger component that is responsible for fetching and displaying data
 related to tests. */
  useEffect(() => {
    if (selectedYear && activeMonth)
      getOtherTests(0, selectedYear, activeMonth, onSuccess);
  }, [getOtherTests, selectedYear, activeMonth]);

  /** The below code is implementing a `useEffect` hook in a React component. It is checking if the
 `pagination` object has a `currentPage` and `totalPages` property. If the `currentPage` is equal to
 `totalPages - 1`, it sets the `hasMore` state to `false`. Otherwise, it sets the `hasMore` state to
 `true`. This code is likely used for implementing pagination in a list or table component. */
  useEffect(() => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) setHasMore(false);
      else setHasMore(true);
    }
  }, [pagination]);

  /** The below code is using the useEffect hook in a React component to set the initial state of the
  selected year, active month, and month-wise data based on the count object passed as a prop. It
  checks if the count object exists and if the selected year and active month have been set. If not,
  it sets the selected year to the latest year in the count object, sets the active month to the
  first month with data in the selected year, and sets the month-wise data for the active month. If
  the selected year is set but the active month is not, it sets the active month to */
  useEffect(() => {
    if (count) {
      if (!selectedYear) {
        const year = Object.keys(count).reverse()[0];
        setSelectedYear(year);
        const months = count[year].months;
        const month = selectMonthWithData(months)[0];
        setActiveMonth(month);
        setMonthWise(months);
      }
      if (!activeMonth) {
        if (selectedYear) {
          const months = count[selectedYear].months;
          const month = selectMonthWithData(months)[0];
          setActiveMonth(month);
          setMonthWise(months);
        } else {
          const year = Object.keys(count).reverse()[0];
          setSelectedYear(year);
          const months = count[year].months;
          const month = selectMonthWithData(months)[0];
          setActiveMonth(month);
          setMonthWise(months);
        }
      }
    }
  }, [selectedYear, activeMonth, count]);

  /**
   * This function sets the selected year, month-wise data, and active month based on the input data and
   * year.
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];
    // setOtherTestsData([]);
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    // getOtherTests(0, year, month, onSuccess);
  }

  /**
   * This function sets the active month and calls another function to get other tests data.
   */
  function onMonthChange(monthKey) {
    // setOtherTestsData([]);
    setActiveMonth(monthKey);
    // getOtherTests(0, selectedYear, monthKey, onSuccess);
  }

  /**
   * The function sets the active month and selected year, and retrieves other tests based on the given
   * month and year.
   */
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getOtherTests(0, year, month, onSuccess);
  };

  /**
   * This function fetches the next set of reports based on the current pagination state and updates the
   * state accordingly.
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        if (selectedYear && activeMonth) {
          const onSuccess = (response) => {
            setOtherTestsData((current) => [...current, ...response.reports]);
            return {type: SET_OTHER_TESTS, payload: response};
          };
          getOtherTests(currentPage + 1, selectedYear, activeMonth, onSuccess);
        }
      }
    }
  };
  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('otherTests')}
      />
      {!dataSynchronized || isNoYearData ? (
        <div className="p-4 w-100 mt-4 h-100 item d-flex justify-content-start align-items-center">
          <p className="p-0 my-3 text-normal text-muted m-0 lh-base">
            {!checkifReportsDataInSync(dataSynchronized)
              ? t(
                  checkEnvVariablesText(
                    import.meta.env.VITE_SYNC_MESSAGE,
                    'noYearNote'
                  )
                )
              : t(
                  checkEnvVariablesText(
                    import.meta.env.VITE_NULL_VALUE,
                    'noOtherTestReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'otherTests'}
            yearData={count}
            reportsData={otherTestsData}
            activeMonth={activeMonth}
            activeYear={selectedYear}
            monthData={monthWise}
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
            onFilter={onFilter}
          />
          <div className="yearly-timeline">
            <Row>
              <Col lg={12}>
                {count && (
                  <YearwiseTimeline
                    data={count}
                    onYearChange={onYearChange}
                    show={6}
                  />
                )}
              </Col>
            </Row>
          </div>
          <div className="page-container report-section">
            <div className="flex-10">
              <div>
                <div className="ps-4 py-5">
                  {Object.keys(monthWise) &&
                    Object.keys(monthWise).length > 0 && (
                      <MonthWiseCount
                        months={monthWise}
                        activeMonth={activeMonth}
                        onMonthChange={onMonthChange}
                      />
                    )}
                </div>
              </div>
              <div className="break">
                <div className="py-5">
                  {otherTestsData && otherTestsData.length > 0 ? (
                    <Tab.Container
                      defaultActiveKey={otherTestsData[0].radiologyProcedure}>
                      <Row>
                        <Col lg={12} className="mb-4 mt-3">
                          <TitleContainer
                            icon={<LocationIcon fill="#28252e" />}
                            title={t('otherTests')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          {isNoOtherTestData ? (
                            <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                              <h4 className="text-bold">
                                {t('noOtherTestsFound')}
                              </h4>
                            </div>
                          ) : (
                            <InfiniteScroll
                              dataLength={otherTestsData.length}
                              next={fetchNextReports}
                              hasMore={hasMore}>
                              <Accordion>
                                <Table>
                                  <thead className="vbc-thead">
                                    <tr>
                                      <th>#</th>
                                      <th className="w-25">{t('date')}</th>
                                      <th>{t('procedure')}</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {otherTestsData.length > 0 &&
                                      otherTestsData.map((item, index) => (
                                        <React.Fragment key={index}>
                                          <tr className="accordion-toggle">
                                            <td className="py-3">
                                              {index + 1}
                                            </td>
                                            <td className="py-3">
                                              {convertDateToUTC(
                                                item.procedureDate,
                                                DateFormat.DD_MMM_YYYY
                                              )}
                                              {/* {format(
                                                new Date(item.procedureDate),
                                                DateFormat.DD_MMM_YYYY
                                              )} */}
                                            </td>
                                            <td className="py-3">
                                              {checkValue(
                                                item.vbcProcedureName
                                              )}
                                            </td>
                                            <td className="py-3 d-flex justify-content-end">
                                              <CustomToggle
                                                callback={() =>
                                                  setIsAccordionOpen(
                                                    !isAccordionOpen
                                                  )
                                                }
                                                eventKey={index.toString()}
                                              />
                                            </td>
                                          </tr>
                                          <tr className="border-0">
                                            <td
                                              className="border-0 p-0"
                                              colSpan="12">
                                              <Accordion.Collapse
                                                eventKey={index.toString()}
                                                className="border-0 accordion-table">
                                                <Col className="m-0 p-4 border-bottom border-light-grey">
                                                  <Row className="m-0 border-bottom border-light-grey mb-3">
                                                    {/* <h6>PROCEDURE:</h6> */}
                                                    <p>
                                                      {checkValue(
                                                        item.procedureNoteContent,
                                                        true,
                                                        import.meta.env
                                                          .VITE_NO_OTHER_TEST_NOTE,
                                                        'No other test report found'
                                                      )}
                                                    </p>
                                                    <Col lg={8}></Col>
                                                  </Row>
                                                </Col>
                                              </Accordion.Collapse>
                                            </td>
                                          </tr>
                                        </React.Fragment>
                                      ))}
                                  </tbody>
                                </Table>
                              </Accordion>
                            </InfiniteScroll>
                          )}
                        </Col>
                      </Row>
                    </Tab.Container>
                  ) : (
                    <NoReportsFound />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  showLoader: state.app.showLoader,
  overallData: state.clinicalDetails.otherTests,
  othertests:
    state.clinicalDetails.otherTests &&
    state.clinicalDetails.otherTests.reports,
  count:
    state.clinicalDetails.otherTests && state.clinicalDetails.otherTests.years,
  pagination:
    state.clinicalDetails.otherTests &&
    state.clinicalDetails.otherTests.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getOtherTests,
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherTests);
