/**
 * This Component renders Radiology Reports Details with yearwise Calendar and monthwise Calender
 * This Component gets otherTreatment, count and getOtherTreatment states from
 * Redux store as props. On Component mount getOtherTreatment function is called
 * to get otherTreatment Array which is mapped inside this component
 * IMPORTANT:
 * otherTreatment, getOtherTreatment are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Tab, Accordion, Table} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DoctorNotesIcon, LocationIcon} from '@/assets/icons';
import {getOtherTreatment} from '@/actions';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';
import InfiniteScroll from 'react-infinite-scroll-component';
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
const {SET_OTHER_TREATMENT} = actionTypes;

const OtherTreatment = function (props) {
  const {t} = useTranslation(['otherTreatment']);
  const {
    overallData,
    otherTreatment,
    count,
    getOtherTreatment,
    pagination,
    dataSynchronized,
  } = props;
  const [reportsData, setReportsData] = useState([]);
  const [monthWise, setMonthWise] = useState([]);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [isNoOtherTreatmentData, setIsNoOtherTreatmentData] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  /** The below code is using the `useEffect` hook in a React component to check if certain data
 (`overallData`, `otherTreatment`, and `count`) exist and set state variables
 (`setIsNoOtherTreatmentData` and `setIsNoYearData`) accordingly. If `otherTreatment` is not
 present, `setIsNoOtherTreatmentData` is set to `true`. If `count` is not present, `setIsNoYearData`
 is set to `true`. Otherwise, both state variables are set to `false`. The `useEffect` hook is
 triggered whenever ` */
  useEffect(() => {
    if (overallData) {
      if (!otherTreatment) {
        setIsNoOtherTreatmentData(true);
      } else {
        setIsNoOtherTreatmentData(false);
      }
      if (!count) {
        setIsNoYearData(true);
      } else {
        setIsNoYearData(false);
      }
    }
  }, [count, overallData, otherTreatment]);

  /** The below code is using the `useEffect` hook in a React component to fetch data from an API
 endpoint based on the `selectedYear` and `activeMonth` values. If both `selectedYear` and
 `activeMonth` are truthy, it calls the `getOtherTreatment` function with the parameters `0`,
 `selectedYear`, `activeMonth`, and a success callback function `onSuccess`. Once the API call is
 successful, the `setReportsData` function is called to update the state with the fetched data. This
 effect will re-run whenever `activeMonth`, `other */
  useEffect(() => {
    if (selectedYear && activeMonth) {
      const onSuccess = (response) => {
        setReportsData(response.reports);
      };
      getOtherTreatment(0, selectedYear, activeMonth, onSuccess);
    }
  }, [activeMonth, otherTreatment, getOtherTreatment, selectedYear]);

  /** The below code is using the `useEffect` hook in a React component to check if the current page of a
pagination component is the last page. If it is the last page, it sets the `hasMore` state to
`false`, indicating that there are no more pages to load. If it is not the last page, it sets the
`hasMore` state to `true`, indicating that there are more pages to load. The `pagination` variable
is a dependency of the `useEffect` hook, so the code will run whenever the `pagination` variable
changes. */
  useEffect(() => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) setHasMore(false);
      else setHasMore(true);
    }
  }, [pagination]);

  /** The below code is using the `useEffect` hook in a React component. It is scrolling the window to the
top and then checking if `dataSynchronized` is true. If it is true, it calls the `getOtherTreatment`
function with some parameters and a callback function `onSuccess`. The `useEffect` hook will re-run
whenever `dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getOtherTreatment(0, selectedYear, activeMonth, onSuccess);
  }, [dataSynchronized]);
  /** The below code is using the useEffect hook in a React component to set the initial state of the
  component based on the data in the "count" object. It checks if "count" exists and if
  "selectedYear" and "activeMonth" are not already set. If "selectedYear" is not set, it sets it to
  the latest year in the "count" object and sets the active month to the first month with data. If
  "activeMonth" is not set, it sets it to the first month with data in the latest year or the first
  month with data overall if "selected */
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
   * The function sets the reports data and returns an object with a payload containing the response.
   * @returns An object with two properties: "type" and "payload".
   */
  const onSuccess = (response) => {
    setReportsData(response.reports);
    return {type: SET_OTHER_TREATMENT, payload: response};
  };

  /**
   * The function sets the selected year, month-wise data, and active month based on the input data and
   * year.
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];
    // setReportsData([]);
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    // getOtherTreatment(0, year, month, onSuccess);
  }

  /**
   * The function updates the active month and selected year, and calls another function to retrieve
   * data based on the selected month and year.
   */
  function onMonthChange(monthKey) {
    // setReportsData([]);
    setActiveMonth(monthKey);
    // getOtherTreatment(0, selectedYear, monthKey, onSuccess);
  }
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getOtherTreatment(0, year, month, onSuccess);
  };

  /**
   * This function fetches the next set of reports data based on the current pagination state.
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        const customonSuccess = (response) => {
          setReportsData((current) => [...current, ...response.reports]);
          return {type: SET_OTHER_TREATMENT, payload: response};
        };
        if (selectedYear && activeMonth) {
          getOtherTreatment(
            currentPage + 1,
            selectedYear,
            activeMonth,
            customonSuccess
          );
        }
      }
    }
  };

  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('otherTreatment')}
      />{' '}
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
                    'noOtherTreatmentReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'otherTreatment'}
            yearData={count}
            reportsData={reportsData}
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
                  {reportsData && reportsData.length > 0 ? (
                    <Tab.Container
                      defaultActiveKey={reportsData[0].radiologyProcedure}>
                      <Row>
                        <Col lg={12} className="mt-3 mb-4">
                          <TitleContainer
                            icon={<LocationIcon fill="#28252e" />}
                            title={t('otherTreatment')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          {' '}
                          {isNoOtherTreatmentData ? (
                            <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                              <h4 className="text-bold">
                                {t('noOtherTreatmentFound')}
                              </h4>
                            </div>
                          ) : (
                            <InfiniteScroll
                              dataLength={reportsData.length}
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
                                    {reportsData.length > 0 &&
                                      reportsData.map((item, index) => (
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
                                            <td className="py-3">
                                              {/* <CustomToggle
                                                callback={() =>
                                                  setIsAccordionOpen(
                                                    !isAccordionOpen
                                                  )
                                                }
                                                eventKey={index.toString()}
                                              /> */}
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
                                                    {/* <h6>Clinical History:</h6> */}
                                                    <p>
                                                      {checkValue(
                                                        item.procedureNoteContent,
                                                        true,
                                                        import.meta.env
                                                          .VITE_NO_OTHER_TREATMENT_NOTE,
                                                        'No other treatment report found'
                                                      )}
                                                    </p>
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
          </div>{' '}
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  showLoader: state.app.showLoader,
  overallData: state.clinicalDetails.otherTreatment,
  otherTreatment:
    state.clinicalDetails.otherTreatment &&
    state.clinicalDetails.otherTreatment.reports,
  count:
    state.clinicalDetails.otherTreatment &&
    state.clinicalDetails.otherTreatment.years,
  pagination:
    state.clinicalDetails.otherTreatment &&
    state.clinicalDetails.otherTreatment.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getOtherTreatment,
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherTreatment);
