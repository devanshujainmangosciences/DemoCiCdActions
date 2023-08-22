/**
 * This Component renders Surgical Details with yearwise Calendar and monthwise Calender
 * This Component gets surgicalDetails, count, pagination and getSurgicalDetails states from
 * Redux store as props. On Component mount getSurgicalDetails function is called
 * to get surgicalDetails Array which is mapped inside this component
 * IMPORTANT:
 * surgicalDetails, getSurgicalDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {MedicationIcon, LocationIcon} from '@/assets/icons';
import {getSurgicalDetails} from '@/actions';
import {Accordion, Col, Row, Tab, Table} from '@themesberg/react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';
import PropTypes from 'prop-types';
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

const {SET_SURGICAL_DETAILS} = actionTypes;

const SurgicalDetails = function (props) {
  const {t} = useTranslation(['surgicalDetails']);
  const {
    overallData,
    surgicalDetails,
    getSurgicalDetails,
    count,
    pagination,
    dataSynchronized,
  } = props;
  const [surgicalData, setSurgicalData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthWise, setMonthWise] = useState({});
  const [isNoYearData, setIsNoYearData] = useState(false);

  /** The below code is using the `useEffect` hook in a React component to check if `overallData` exists
and if `count` is equal to 0. If `count` is 0, it sets the state of `isNoYearData` to true. The
`useEffect` hook is triggered whenever `count` or `overallData` changes. */
  useEffect(() => {
    if (overallData) {
      if (!count) {
        setIsNoYearData(true);
      }
    }
  }, [count, overallData]);

  /** The below code is using the `useEffect` hook in a React component. It is setting the window scroll
position to the top of the page and then checking if `dataSynchronized` is true. If it is true, it
calls the `getSurgicalDetails` function with some parameters and an `onSuccess` callback function.
The `useEffect` hook will run whenever `dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getSurgicalDetails(0, selectedYear, activeMonth, onSuccess);
  }, [dataSynchronized]);

  /**
   * set the report from response to clinicalNotesData state
   * @param {Object} response
   *
   */
  const onSuccess = (response) => {
    setSurgicalData(response.reports);
    return {type: SET_SURGICAL_DETAILS, payload: response};
  };
  /**
   * On Scroll end this function gets triggered and get next page reportsData
   * and append it to the state
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        if (selectedYear && activeMonth) {
          const onSuccess = (response) => {
            setSurgicalData((current) => [...current, ...response.reports]);
            return {type: SET_SURGICAL_DETAILS, payload: response};
          };
          getSurgicalDetails(
            currentPage + 1,
            selectedYear,
            activeMonth,
            onSuccess
          );
        }
      }
    }
  };
  /**
   * On Component Mount this Callback will call getSurgicalDetails
   */
  useEffect(() => {
    if (selectedYear && activeMonth) {
      const onSuccess = (response) => {
        setSurgicalData(response.reports);
      };
      getSurgicalDetails(0, selectedYear, activeMonth, onSuccess);
    }
  }, [surgicalDetails, getSurgicalDetails, selectedYear, activeMonth]);

  /**
   * If surgical details have data this callback will append
   * the surgicalDetails data to state else it will set the data to the state
   */
  useEffect(() => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) setHasMore(false);
      else setHasMore(true);
    }
  }, [pagination]);
  /**
   * This callback will check for count if present it will set the active year, month and catagory
   * and update the year, month and catagory whenever user click on them
   */
  useEffect(() => {
    if (count) {
      if (!selectedYear) {
        const year = Object.keys(count).reverse()[0];
        setSelectedYear(year);
        const month = selectMonthWithData(count[year].months)[0];
        setActiveMonth(month);
        setMonthWise(count[year].months);
      }
      if (!activeMonth) {
        if (selectedYear) {
          const month = selectMonthWithData(count[selectedYear].months)[0];
          setActiveMonth(month);
          setMonthWise(count[selectedYear].months);
        } else {
          const year = Object.keys(count).reverse()[0];
          setSelectedYear(year);
          const month = selectMonthWithData(count[year].months)[0];
          setActiveMonth(month);
          setMonthWise(count[year].months);
        }
      }
    }
  }, [selectedYear, activeMonth, count]);
  /**
   * This Function handles the change in year, When a user click
   * on a year this function set that year in state
   * @param {Object} data
   * @param {Integer} year
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    // setSurgicalData([]);
    // getSurgicalDetails(0, year, month, onSuccess);
  }
  /**
   * This Function will handle the change in month, When a user click
   * on a month this function set that month in state
   * @param {Integer} monthKey
   * @param {String} month
   */
  function onMonthChange(month) {
    setHasMore(true);
    // setSurgicalData([]);
    setActiveMonth(month);
    // getSurgicalDetails(0, selectedYear, month, onSuccess);
  }
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getSurgicalDetails(0, year, month, onSuccess);
  };

  return (
    <>
      <TitleContainer
        icon={<MedicationIcon fill="#fff" />}
        title={t('surgery')}
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
                    'noSurgeryReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'surgicalDetails'}
            yearData={count}
            reportsData={surgicalData}
            activeMonth={activeMonth}
            activeYear={selectedYear}
            monthData={monthWise}
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
            onFilter={onFilter}
          />
          <div className="yearly-timeline">
            <Row className="mt-4">
              <Col lg={12}>
                {count && (
                  <YearwiseTimeline
                    data={count}
                    onYearChange={onYearChange}
                    show={4}
                  />
                )}
              </Col>
            </Row>
          </div>
          <div className="page-container report-section">
            <div className="flex-10">
              <div>
                <div className="ps-4 py-5 h-100 ">
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
                  <Tab.Container defaultActiveKey="home">
                    {surgicalData.length > 0 ? (
                      <Row>
                        <Col lg={12} className="mt-3">
                          <TitleContainer
                            icon={<LocationIcon fill="#28252e" />}
                            title={t('surgery')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          <Tab.Content>
                            <Tab.Pane eventKey="home" className="py-4">
                              <InfiniteScroll
                                dataLength={surgicalData.length}
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
                                      {surgicalData.map((item) => (
                                        <React.Fragment key={item.index}>
                                          <tr className="accordion-toggle">
                                            <td className="py-3">
                                              {item.index}
                                            </td>
                                            <td className="py-3">
                                              {convertDateToUTC(
                                                item.surgeryDate,
                                                DateFormat.DD_MMM_YYYY
                                              )}
                                            </td>
                                            <td className="py-3">
                                              {checkValue(item.procedureName)}
                                            </td>
                                            <td className="py-3">
                                              {/* <CustomToggle
                                                callback={() =>
                                                  setIsAccordionOpen(
                                                    !isAccordionOpen
                                                  )
                                                }
                                                eventKey={item.index.toString()}
                                              /> */}
                                            </td>
                                          </tr>
                                          <tr className="border-0">
                                            <td
                                              className="border-0 p-0"
                                              colSpan="12">
                                              <Accordion.Collapse
                                                eventKey={item.index.toString()}
                                                className="border-0 accordion-table">
                                                <Col className="m-0 p-4 border-bottom border-light-grey">
                                                  <Row className="m-0 border-bottom border-light-grey mb-3">
                                                    {/* <h6>PROCEDURE:</h6> */}
                                                    <p>
                                                      {checkValue(
                                                        item.procedureNote
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
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    ) : (
                      <NoReportsFound />
                    )}
                  </Tab.Container>
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
  overallData: state.clinicalDetails.surgicalDetails,
  surgicalDetails:
    state.clinicalDetails.surgicalDetails &&
    state.clinicalDetails.surgicalDetails.reports,
  count:
    state.clinicalDetails.surgicalDetails &&
    state.clinicalDetails.surgicalDetails.years,
  pagination:
    state.clinicalDetails.surgicalDetails &&
    state.clinicalDetails.surgicalDetails.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getSurgicalDetails,
};
SurgicalDetails.propTypes = {
  surgicalDetails: PropTypes.array,
  count: PropTypes.object,
  getSurgicalDetails: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(SurgicalDetails);
