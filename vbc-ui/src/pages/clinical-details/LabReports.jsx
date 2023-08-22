/**
 * This Component renders Lab Reports Details with yearwise Calendar and monthwise Calender
 * This Component gets reportsData, count, getLabsReportsDetails and pagination states from
 * Redux store as props. On Component mount getLabsReportsDetails function is called
 * to get reportsData Array which is mapped inside this component
 * IMPORTANT:
 * reportsData, getLabsReportsDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  Col,
  Row,
  Tab,
  Nav,
  Table,
  Accordion,
} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {LabReportIcon, LocationIcon} from '@/assets/icons';
import {getLabsReportsDetails} from '@/actions';
import {
  MonthWiseCount,
  YearwiseTimeline,
  TitleContainer,
} from '../../components';
import CustomToggle from './children/CustomToggle';
import {actionTypes, DateFormat} from '../../constants';
import ReportsAndTestMobileView from './ReportsAndTestMobileView';
import {
  checkValue,
  selectMonthWithData,
  isValueNull,
  isObjectEmpty,
  convertDateToUTC,
  checkifReportsDataInSync,
  checkEnvVariablesText,
} from '@/services/utility';
import NoReportsFound from '@/components/NoReportsFound';

const {SET_LAB_REPORTS} = actionTypes;

const LabReports = function (props) {
  const {t} = useTranslation(['labReports']);
  const {
    overallData,
    reportsData,
    count,
    getLabsReportsDetails,
    pagination,
    dataSynchronized,
  } = props;
  const [labData, setLabData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthWise, setMonthWise] = useState({});
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isNoReportData, setIsNoReportData] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  // console.log('LAB DATA=>', labData);
  // console.log('HAS MORE=>', hasMore);
  /**
   * set the report from response to clinicalNotesData state
   * @param {Object} response
   *
   */
  // const onSuccess = (response) => {
  //   setLabData((current) => {
  //     const mergeData = [...current, ...response.reports];
  //     const reqData = uniqBy(mergeData, 'index');
  //     return reqData;
  //   });

  //   // return {type: SET_LAB_REPORTS, payload: response};
  // };
  const onSuccess = (response) => {
    setLabData(response.reports);
    return {type: SET_LAB_REPORTS, payload: response};
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
          getLabsReportsDetails(
            currentPage + 1,
            selectedYear,
            activeMonth,
            selectedCategory,
            onSuccess
          );
        }
      }
    }
  };

  /**
   * On Component Mount this Callback will call getLabsReportsDetails and
   * segregate the results and reports data and set it to the state
   */
  useEffect(() => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) setHasMore(false);
      else setHasMore(true);
    }
  }, [pagination]);

  /** The below code is a React useEffect hook that is triggered when the `dataSynchronized` variable
 changes. It first scrolls the window to the top. Then, it calls the `getLabsReportsDetails`
 function with some parameters and an `onSuccess` callback function. If the `dataSynchronized`
 variable is true, it sets the `labData` state with the `reports` property of the `response` object
 and returns an action object with a type of `SET_LAB_REPORTS` and a payload of the `response`
 object. */
  useEffect(() => {
    window.scrollTo(0, 0);
    const onSuccess = (response) => {
      setLabData(response.reports);
      return {type: SET_LAB_REPORTS, payload: response};
    };
    if (dataSynchronized)
      getLabsReportsDetails(
        0,
        selectedYear,
        activeMonth,
        selectedCategory,
        onSuccess
      );
  }, [dataSynchronized]);
  /**
   * This callback will call getLabsReportsDetails if overall data is empty
   */
  useEffect(() => {
    const onSuccess = (response) => {
      setLabData(response.reports);
      return {type: SET_LAB_REPORTS, payload: response};
    };
    if (selectedYear && activeMonth)
      getLabsReportsDetails(
        0,
        selectedYear,
        activeMonth,
        selectedCategory,
        onSuccess
      );
  }, [activeMonth, getLabsReportsDetails, selectedCategory, selectedYear]);

  /**
   * This callback will check for count if present it will set the active year, month and catagory
   * and update the year, month and catagory whenever user click on them
   */
  useEffect(() => {
    if (count) {
      if (!selectedYear) {
        const year = Object.keys(count).reverse()[0];
        setSelectedYear(year);
        const months = count[parseInt(year)].months;
        const month = selectMonthWithData(months)[0];
        setActiveMonth(month);
        setCategories(months[month].categories);
        setMonthWise(months);
        setSelectedCategory(Object.keys(months[month].categories)[0]);
      }
      if (!activeMonth) {
        if (selectedYear) {
          const months = count[selectedYear].months;
          const month = selectMonthWithData(months)[0];
          setActiveMonth(month);
          setCategories(months[month].categories);
          setMonthWise(months);
          setSelectedCategory(Object.keys(months[month].categories)[0]);
        } else {
          const year = Object.keys(count).reverse()[0];
          setSelectedYear(year);
          const months = count[year].months;
          const month = selectMonthWithData(months)[0];
          setCategories(months[month].categories);
          setActiveMonth(month);
          setMonthWise(months);
          setSelectedCategory(Object.keys(months[month].categories)[0]);
        }
      }
    }
  }, [selectedYear, activeMonth, count]);

  /**
   * This callback will set NoData state to true if will are not getting any value from
   * api
   */
  useEffect(() => {
    if (overallData) {
      if (!reportsData) setIsNoReportData(true);
      else setIsNoReportData(false);

      if (!count) setIsNoYearData(true);
      else setIsNoYearData(false);
    }
  }, [count, overallData, reportsData]);

  /**
   * This Function handles the change in year, When a user click
   * on a year this function set that year in state
   * @param {Object} data
   * @param {Integer} year
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];

    let procedure;

    const categories = count[year]['months'][month]['categories'];

    if (!isObjectEmpty(categories)) {
      procedure = Object.keys(categories)[0];
      setSelectedCategory(procedure);
      setCategories(categories);
    } else {
      setCategories([]);
      setSelectedCategory('');
    }
    // setLabData([]);
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    // getLabsReportsDetails(0, year, month, procedure, onSuccess);
  }

  /**
   * This Function will handle the change in month, When a user click
   * on a month this function set that month in state
   * @param {Integer} monthKey
   * @param {String} month
   */
  function onMonthChange(monthKey, month) {
    const procedure = Object.keys(month.categories)[0];
    setHasMore(true);
    // setLabData([]);
    setCategories(month.categories);
    setActiveMonth(monthKey);
    // getLabsReportsDetails(0, selectedYear, monthKey, procedure, onSuccess);
    setSelectedCategory(procedure);
    // console.log('LAB DATA=>', labData);
  }

  /**
   * The function sets various state variables based on the selected month, year, and category.
   */
  const onFilter = (monthKey, yearKey, month) => {
    const procedure = Object.keys(month.categories)[0];
    setCategories(month.categories);
    setActiveMonth(monthKey);
    setSelectedYear(yearKey);
    // getLabsReportsDetails(0, yearKey, monthKey, procedure, onSuccess);
    setSelectedCategory(procedure);
  };

  /**
   * This Function will handle change catagory, When a user changes the catagory
   * This function will get the corresponding data to that
   * @param {String} proc
   */
  function onProcedureChange(proc) {
    // setLabData([]);
    setSelectedCategory(proc);
    // getLabsReportsDetails(0, selectedYear, activeMonth, proc, onSuccess);
  }

  /**
   * This functions returns the lab result data inside accordian
   * @param {String} value
   * @param {String} unit
   * @param {String} note
   * @returns {String}
   */
  const getLabResultData = (value, unit, note) => {
    if (isValueNull(note)) {
      if (isValueNull(value))
        return (
          <span>
            {checkEnvVariablesText(
              import.meta.env.VITE_NULL_VALUE,
              'Information not available'
            )}
          </span>
        );
      else if (isValueNull(unit) && !isValueNull(value)) return value;
      else return `${value} ${unit}`;
    } else {
      if (isValueNull(value)) return note;
      else if (isValueNull(unit) && !isValueNull(value))
        return `${value},${note}`;
      else return `${value} ${unit},${note}`;
    }
  };

  return (
    <>
      <TitleContainer
        icon={<LabReportIcon fill="#fff" />}
        title={t('labReports')}
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
                    'noLabReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          {' '}
          <ReportsAndTestMobileView
            type={'labReports'}
            yearData={count}
            reportsData={labData}
            activeMonth={activeMonth}
            activeYear={selectedYear}
            monthData={monthWise}
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
            onFilter={onFilter}
            categories={categories}
            onProcedureChange={onProcedureChange}
            getLabResultData={getLabResultData}
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
                <div className="ps-4 py-5 h-100">
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
                <div className="py-5 h-100">
                  {labData && activeMonth && (
                    <Tab.Container
                      activeKey={selectedCategory}
                      onSelect={(k) => setSelectedCategory(k)}
                      defaultActiveKey="home">
                      <Row className="h-100">
                        <Col lg={12}>
                          <Nav
                            className="nav-tabs"
                            onSelect={(item) => onProcedureChange(item)}>
                            {categories &&
                              Object.keys(categories).map((item, index) => (
                                <Nav.Item key={`${item}-${index}`}>
                                  <Nav.Link
                                    eventKey={item}
                                    className={`mb-sm-3 catagory text-capitalize mb-md-0`}>
                                    {item.toLowerCase()} ({categories[item]})
                                  </Nav.Link>
                                </Nav.Item>
                              ))}
                          </Nav>
                        </Col>
                        <Col lg={12} className="h-100 pt-4">
                          {selectedCategory && (
                            <TitleContainer
                              icon={<LocationIcon fill="#28252e" />}
                              title={selectedCategory.toLowerCase()}
                              noBg
                            />
                          )}
                          {isNoReportData ? (
                            <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                              <h4 className="text-bold">
                                {t('noReportFound')}
                              </h4>
                            </div>
                          ) : (
                            <>
                              <Tab.Content>
                                {labData.length > 0 ? (
                                  <Tab.Pane
                                    eventKey={selectedCategory}
                                    className="">
                                    <div className="mx-3 mt-4">
                                      <InfiniteScroll
                                        dataLength={labData.length}
                                        next={fetchNextReports}
                                        hasMore={hasMore}>
                                        <Accordion>
                                          <Table>
                                            <thead className="vbc-thead">
                                              <tr>
                                                <th>{t('#')}</th>
                                                <th>
                                                  {' '}
                                                  {t('testCollectionDate')}{' '}
                                                </th>
                                                <th> {t('testResultDate')} </th>
                                                <th> {t('test')} </th>
                                                <th> </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {labData.map(
                                                (
                                                  {
                                                    testCollectionDate,
                                                    testResultsDate,
                                                    testName,
                                                    testParameters,
                                                  },
                                                  index
                                                ) => (
                                                  <React.Fragment key={index}>
                                                    <tr className="accordion-toggle">
                                                      <td className="py-3">
                                                        {index + 1}
                                                      </td>
                                                      <td className="py-3">
                                                        <span>
                                                          {/* {formatDate(
                                                            testCollectionDate
                                                          )} */}
                                                          {/* 
                                                          {format(
                                                            new Date(
                                                              testCollectionDate
                                                            ),
                                                            DateFormat.DD_MMM_YYYY
                                                          )} */}

                                                          {convertDateToUTC(
                                                            testCollectionDate,
                                                            DateFormat.DD_MMM_YYYY
                                                          )}
                                                        </span>
                                                      </td>
                                                      <td className="py-3">
                                                        {/* {formatDate(
                                                          testResultsDate
                                                        )} */}
                                                        {/* {format(
                                                          new Date(
                                                            testResultsDate
                                                          ),
                                                          DateFormat.DD_MMM_YYYY
                                                        )} */}

                                                        {convertDateToUTC(
                                                          testResultsDate,
                                                          DateFormat.DD_MMM_YYYY
                                                        )}
                                                      </td>
                                                      <td className="py-3">
                                                        {/* {testName.substr(
                                                        0,
                                                        testName.indexOf(' ')
                                                      )} */}
                                                        {checkValue(testName)}
                                                      </td>
                                                      <td className="py-3 d-flex justify-content-end">
                                                        <CustomToggle
                                                          callback={() =>
                                                            setIsAccordionOpen(
                                                              !isAccordionOpen
                                                            )
                                                          }
                                                          eventKey={index}
                                                        />
                                                      </td>
                                                    </tr>
                                                    <tr className={`border-0`}>
                                                      <td
                                                        className="border-0 p-0"
                                                        colSpan="12">
                                                        <Accordion.Collapse
                                                          eventKey={index}
                                                          className="border-0 accordion-table">
                                                          <Table>
                                                            <thead className="vbc-thead">
                                                              <tr>
                                                                <th className="text-capitalize">
                                                                  {t('metric')}
                                                                </th>
                                                                <th className="text-capitalize">
                                                                  {t('Result')}
                                                                </th>
                                                                {/* <th className="text-capitalize">
                                                                {t('value')}
                                                              </th>
                                                              <th className="text-capitalize">
                                                                {t(
                                                                  'unitsofMeasure'
                                                                )}
                                                              </th>
                                                              <th className="text-capitalize">
                                                                {' '}
                                                                {t('note')}{' '}
                                                              </th> */}
                                                              </tr>
                                                            </thead>
                                                            <tbody>
                                                              {testParameters.map(
                                                                (item) => (
                                                                  <tr
                                                                    key={
                                                                      item.index
                                                                    }>
                                                                    <td>
                                                                      {
                                                                        item.testParameter
                                                                      }
                                                                    </td>
                                                                    <td>
                                                                      {getLabResultData(
                                                                        item.numericResult,
                                                                        item.numericResultUnits,
                                                                        item.unstructuredResult
                                                                      )}
                                                                    </td>
                                                                    {/* <td>
                                                                    {
                                                                      item.numericResult
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      item.numericResultUnits
                                                                    }
                                                                  </td>
                                                                  <td className="white-space-pre-line">
                                                                    {item.unstructuredResultYN ===
                                                                    'Y'
                                                                      ? item.unstructuredResult
                                                                      : 'N/A'}
                                                                  </td> */}
                                                                  </tr>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </Table>
                                                        </Accordion.Collapse>
                                                      </td>
                                                    </tr>
                                                  </React.Fragment>
                                                )
                                              )}
                                            </tbody>
                                          </Table>
                                        </Accordion>
                                      </InfiniteScroll>
                                    </div>
                                  </Tab.Pane>
                                ) : (
                                  <NoReportsFound />
                                )}
                              </Tab.Content>
                            </>
                          )}
                        </Col>
                      </Row>
                    </Tab.Container>
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
  overallData: state.clinicalDetails.labReports,
  reportsData:
    state.clinicalDetails.labReports &&
    state.clinicalDetails.labReports.reports,
  count:
    state.clinicalDetails.labReports && state.clinicalDetails.labReports.years,
  pagination:
    state.clinicalDetails.labReports &&
    state.clinicalDetails.labReports.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getLabsReportsDetails,
};
LabReports.propTypes = {
  reportsData: PropTypes.array,
  count: PropTypes.object,
  getLabsReportsDetails: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(LabReports);
