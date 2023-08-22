/**
 * This Component renders Radiology Reports Details with yearwise Calendar and monthwise Calender
 * This Component gets clinicalNotes, count and getRadiologyReportsDetails states from
 * Redux store as props. On Component mount getRadiologyReportsDetails function is called
 * to get clinicalNotes Array which is mapped inside this component
 * IMPORTANT:
 * clinicalNotes, getRadiologyReportsDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Tab, Accordion, Table} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {DoctorNotesIcon, LocationIcon} from '@/assets/icons';
import {getRadiologyReportsDetails} from '@/actions';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';
import PropTypes from 'prop-types';
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

const {SET_RADIOLOGY_REPORTS} = actionTypes;

const RadiologyReports = function (props) {
  const {t} = useTranslation(['radiologyReports']);
  const {
    overallData,
    clinicalNotes,
    count,
    getRadiologyReportsDetails,
    pagination,
    dataSynchronized,
  } = props;
  const [reportsData, setReportsData] = useState([]);
  const [monthWise, setMonthWise] = useState([]);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isNoRadiologyData, setIsNoRadiologyData] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  // console.log('ACTIVE MONTH=>', activeMonth);
  // console.log('selectedYear =>', selectedYear);

  /** The below code is using the `useEffect` hook in a React component to check if certain data
  (`overallData`, `clinicalNotes`, and `count`) exist and set state variables
  (`setIsNoRadiologyData` and `setIsNoYearData`) accordingly. If `clinicalNotes` is not present in
  `overallData`, `setIsNoRadiologyData` is set to `true`. If `count` is not present,
  `setIsNoYearData` is set to `true`. Otherwise, both state variables are set to `false`. The
  `useEffect` hook */
  useEffect(() => {
    if (overallData) {
      if (!clinicalNotes) {
        setIsNoRadiologyData(true);
      } else {
        setIsNoRadiologyData(false);
      }
      if (!count) {
        setIsNoYearData(true);
      } else {
        setIsNoYearData(false);
      }
    }
  }, [count, overallData, clinicalNotes]);

  /**
   * On Component mount This callback function will call getradiologyReportsDetails to get
   * radiologyReports Array and set the array to notesData state
   */
  useEffect(() => {
    if (selectedYear && activeMonth)
      getRadiologyReportsDetails(0, selectedYear, activeMonth, onSuccess);
  }, [activeMonth, getRadiologyReportsDetails, selectedYear]);

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

  /** The below code is using the `useEffect` hook in a React component. It is watching for changes in the
`dataSynchronized` variable and when it changes, it calls the `getRadiologyReportsDetails` function
with the parameters `0`, `selectedYear`, `activeMonth`, and `onSuccess`. It also scrolls the window
to the top. This code is likely used to fetch radiology reports details when the `dataSynchronized`
variable changes. */
  useEffect(() => {
    if (dataSynchronized)
      getRadiologyReportsDetails(0, selectedYear, activeMonth, onSuccess);
    window.scrollTo(0, 0);
  }, [dataSynchronized]);
  /**
   * This callback will check for count if present it will set the active year, month and catagory
   * and update the year, month and catagory whenever user click on them
   */
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
   * The function sets the reports data and returns an object with a type and payload based on the
   * response.
   * @returns an object with two properties: "type" and "payload". The "type" property is set to the
   * value "SET_RADIOLOGY_REPORTS" and the "payload" property is set to the entire "response" object.
   */
  const onSuccess = (response) => {
    setReportsData(response.reports);
    return {type: SET_RADIOLOGY_REPORTS, payload: response};
  };

  /**
   * This Function handles the change in year, When a user click
   * on a year this function set that year in state
   * @param {Object} data
   * @param {Integer} year
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
    // getRadiologyReportsDetails(0, year, month, onSuccess);
  }

  /**
   * This Function will handle the change in month, When a user click
   * on a month this function set that month in state
   * @param {Integer} monthKey
   * @param {String} month
   */
  function onMonthChange(monthKey) {
    // setReportsData([]);
    setActiveMonth(monthKey);
    // getRadiologyReportsDetails(0, selectedYear, monthKey, onSuccess);
  }

  /**
   * @param {Number} month
   * @param {Number} year
   * The function sets the active month and selected year, and retrieves radiology report details based
   * on the selected month and year.
   */
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getRadiologyReportsDetails(0, year, month, onSuccess);
  };

  /**
   * On Scroll end this function gets triggered and get next page medication
   * and append it to the state
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        const customonSuccess = (response) => {
          setReportsData((current) => [...current, ...response.reports]);
          return {type: SET_RADIOLOGY_REPORTS, payload: response};
        };
        if (selectedYear && activeMonth) {
          getRadiologyReportsDetails(
            currentPage + 1,
            selectedYear,
            activeMonth,
            customonSuccess
          );
        }
      }
    }
  };

  // console.log('REPORTS DATA MAIN=>', reportsData);
  // console.log('monthWise=>', monthWise);
  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('radiology')}
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
                    'noRadiologyReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'radiologyReports'}
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
                            title={t('radiology')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          {isNoRadiologyData ? (
                            <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                              <h4 className="text-bold">
                                {t('noRadiologyFound')}
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
                                                item.orderDate,
                                                DateFormat.DD_MMM_YYYY
                                              )}
                                              {/* {format(
                                                new Date(item.orderDate),
                                                DateFormat.DD_MMM_YYYY
                                              )} */}
                                            </td>
                                            <td className="py-3">
                                              {item.radiologyProcedure}
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
                                                  <Row className="m-0 border-light-grey ">
                                                    {/* <h6>PROCEDURE:</h6> */}
                                                    <p className="m-0">
                                                      {checkValue(
                                                        item.radiologyReportNote,
                                                        true,
                                                        import.meta.env
                                                          .VITE_NO_RADIOLOGY_NOTE,
                                                        'No radiology report found'
                                                      )}
                                                    </p>
                                                    {/* <Col lg={8}></Col> */}
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
  overallData: state.clinicalDetails.radiologyReports,
  clinicalNotes:
    state.clinicalDetails.radiologyReports &&
    state.clinicalDetails.radiologyReports.reports,
  count:
    state.clinicalDetails.radiologyReports &&
    state.clinicalDetails.radiologyReports.years,
  pagination:
    state.clinicalDetails.radiologyReports &&
    state.clinicalDetails.radiologyReports.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getRadiologyReportsDetails,
};
RadiologyReports.propTypes = {
  radiologyReports: PropTypes.array,
  count: PropTypes.object,
  getRadiologyReportsDetails: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(RadiologyReports);
