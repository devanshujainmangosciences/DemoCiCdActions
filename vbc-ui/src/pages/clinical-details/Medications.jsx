/**
 * This Component renders Lab Reports Details with yearwise Calendar and monthwise Calender
 * This Component gets medication, count, getMedicationDetails and pagination states from
 * Redux store as props. On Component mount getMedicationDetails function is called
 * to get medication Array which is mapped inside this component
 * IMPORTANT:
 * medication, getMedicationDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {MedicationIcon, LocationIcon} from '@/assets/icons';
import {getMedicationDetails} from '@/actions';
import {Col, Nav, Row, Tab, Table} from '@themesberg/react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  MonthWiseCount,
  YearwiseTimeline,
  TitleContainer,
} from '../../components';
import PropTypes from 'prop-types';
import {actionTypes, DateFormat} from '../../constants';
import ReportsAndTestMobileView from './ReportsAndTestMobileView';
import {
  checkValue,
  convertMedicationName,
  convertDateToUTC,
  isObjectEmpty,
  selectMonthWithData,
  sortObjectKeysByName,
  checkifReportsDataInSync,
  checkEnvVariablesText,
} from '@/services/utility';
import NoReportsFound from '@/components/NoReportsFound';

const {SET_MEDICATION_DETAILS} = actionTypes;

const Medications = function (props) {
  const {t} = useTranslation('medications');
  const {
    overallData,
    medication,
    count,
    pagination,
    getMedicationDetails,
    dataSynchronized,
  } = props;
  const [medicationsData, setMedicationsData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthWise, setMonthWise] = useState({});
  const [isNoMedicationData, setIsNoMedicationData] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

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
        const onSuccess = (response) => {
          setMedicationsData((current) => [...current, ...response.reports]);
          return {type: SET_MEDICATION_DETAILS, payload: response};
        };
        if (selectedYear && activeMonth) {
          getMedicationDetails(
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
  /**  The below code is using the `useEffect` hook in a React component. It is setting the window scroll
  position to the top of the page and then checking if `dataSynchronized` is true. If it is true, it
  calls the `getMedicationDetails` function with some parameters and an `onSuccess` callback
  function. The `useEffect` hook will only run again if `dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getMedicationDetails(
        0,
        selectedYear,
        activeMonth,
        selectedCategory,
        onSuccess
      );
  }, [dataSynchronized]);
  /**
   * On Component Mount this Callback will call getMedicationDetails and
   * set the medication array to state if array is empty else it will append the value
   */
  useEffect(() => {
    if (overallData) {
      if (!medication) {
        setIsNoMedicationData(true);
      } else {
        setIsNoMedicationData(false);
      }
      if (!count) {
        setIsNoYearData(true);
      } else {
        setIsNoYearData(false);
      }
    }
  }, [count, overallData, medication]);

  /** The below code is using the `useEffect` hook in a React component to fetch medication details data
 from an API based on the selected year, month, and category. It sets the fetched data to the
 `medicationsData` state using the `setMedicationsData` function. The `getMedicationDetails`
 function is called with the necessary parameters to fetch the data. The `onSuccess` function is
 called when the data is successfully fetched and it returns an action object with the fetched data
 as the payload. The `useEffect` hook is triggered whenever there is a change in */
  useEffect(() => {
    const onSuccess = (response) => {
      setMedicationsData(response.reports);
      return {type: SET_MEDICATION_DETAILS, payload: response};
    };
    if (selectedYear && activeMonth)
      getMedicationDetails(
        0,
        selectedYear,
        activeMonth,
        selectedCategory,
        onSuccess
      );
  }, [activeMonth, getMedicationDetails, selectedCategory, selectedYear]);

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
        const categories = months[month].categories;
        setCategories(categories);
        setSelectedCategory(sortObjectKeysByName(categories)[0]);
      }
      if (!activeMonth) {
        if (selectedYear) {
          const months = count[selectedYear].months;
          const month = selectMonthWithData(months)[0];
          setActiveMonth(month);
          setMonthWise(months);
          const categories = months[month].categories;
          setCategories(categories);
          setSelectedCategory(sortObjectKeysByName(categories)[0]);
        } else {
          const year = Object.keys(count).reverse()[0];
          setSelectedYear(year);
          const months = count[year].months;
          const month = selectMonthWithData(months)[0];
          setActiveMonth(month);
          setMonthWise(months);
          const categories = months[month].categories;
          setCategories(categories);
          setSelectedCategory(sortObjectKeysByName(categories)[0]);
        }
      }
    }
  }, [selectedYear, activeMonth, count]);

  /**
   * set the report from response to clinicalNotesData state
   * @param {Object} response
   *
   */
  const onSuccess = (response) => {
    setMedicationsData(response.reports);
    return {type: SET_MEDICATION_DETAILS, payload: response};
  };

  /**
   * This Function handles the change in year, When a user click
   * on a year this function set that year in state
   * @param {Object} data
   * @param {Integer} year
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];
    let procedure;
    const categories = count?.[year]?.['months']?.[month]?.['categories'];

    if (!isObjectEmpty(categories)) {
      procedure = sortObjectKeysByName(categories)[0];
      setSelectedCategory(procedure);
      setCategories(categories);
    } else {
      setCategories([]);
      setSelectedCategory('');
    }

    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    // setMedicationsData([]);
    // getMedicationDetails(0, year, month, procedure, onSuccess);
  }
  /**
   * This Function will handle the change in month, When a user click
   * on a month this function set that month in state
   * @param {Integer} monthKey
   * @param {String} month
   */
  function onMonthChange(month) {
    const selectedMonth = count[selectedYear]['months'][month];
    const procedure = sortObjectKeysByName(
      selectedMonth?.categories || {}
    )?.[0];
    setHasMore(true);
    setActiveMonth(month);
    // getMedicationDetails(0, selectedYear, month, procedure, onSuccess);
    setCategories(selectedMonth?.categories);
    setSelectedCategory(procedure);
  }
  const onFilter = (monthKey, yearKey, month) => {
    const procedure = sortObjectKeysByName(month.categories)[0];
    setActiveMonth(monthKey);
    setSelectedYear(yearKey);
    getMedicationDetails(0, yearKey, monthKey, procedure, onSuccess);
    setCategories(month?.categories);
    setSelectedCategory(procedure);
  };
  /**
   * This Function will handle change catagory, When a user changes the catagory
   * This function will get the corresponding data to that
   * @param {String} proc
   */
  function onProcedureChange(proc) {
    setSelectedCategory(proc);
    // getMedicationDetails(0, selectedYear, activeMonth, proc, onSuccess);
  }

  return (
    <>
      <TitleContainer
        icon={<MedicationIcon fill="#fff" />}
        title={t('medications')}
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
                    'noMedicationReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'medications'}
            yearData={count}
            reportsData={medicationsData}
            activeMonth={activeMonth}
            activeYear={selectedYear}
            monthData={monthWise}
            onYearChange={onYearChange}
            onMonthChange={onMonthChange}
            onFilter={onFilter}
            categories={categories}
            onProcedureChange={onProcedureChange}
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
                <div className="py-5">
                  <Tab.Container
                    activeKey={selectedCategory ? selectedCategory : 'home'}
                    onSelect={(k) => setSelectedCategory(k)}
                    defaultActiveKey="home">
                    <Row>
                      {' '}
                      <Col lg={12}>
                        <Nav
                          className="nav-tabs"
                          onSelect={(item) => onProcedureChange(item)}>
                          {categories &&
                            sortObjectKeysByName(categories).map(
                              (item, index) => (
                                <Nav.Item key={index}>
                                  <Nav.Link
                                    eventKey={item}
                                    className={`mb-sm-3 catagory mb-md-0`}>
                                    {convertMedicationName(
                                      item,
                                      categories[item]
                                    )}
                                    {/* {item.charAt(0).toUpperCase() +
                                    item.slice(1).toLowerCase()}{' '} */}
                                    {/* ({categories[item]}) */}
                                  </Nav.Link>
                                </Nav.Item>
                              )
                            )}
                        </Nav>
                      </Col>
                      <Col lg={12}>
                        <Tab.Content>
                          <Tab.Pane
                            eventKey={
                              selectedCategory ? selectedCategory : 'home'
                            }
                            className="py-4">
                            <div className="mx-3 mt-0">
                              {selectedCategory && (
                                <TitleContainer
                                  icon={<LocationIcon fill="#28252e" />}
                                  title={
                                    convertMedicationName(selectedCategory)
                                    // selectedCategory.toLowerCase()
                                  }
                                  noBg
                                />
                              )}
                              {isNoMedicationData ? (
                                <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                                  <h4 className="text-bold">
                                    {t('noMedicationFound')}
                                  </h4>
                                </div>
                              ) : (
                                <InfiniteScroll
                                  className="mt-4"
                                  dataLength={medicationsData.length}
                                  next={fetchNextReports}
                                  hasMore={hasMore}>
                                  {medicationsData.length > 0 ? (
                                    <Table>
                                      <thead className="vbc-thead">
                                        <tr>
                                          <th> # </th>
                                          <th> {t('date')} </th>
                                          <th> {t('brandName')} </th>
                                          <th> {t('genericName')} </th>
                                          <th> {t('strength')} </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {medicationsData.map(
                                          ({
                                            issueDate,
                                            brandName,
                                            genericName,
                                            strength,
                                            index,
                                          }) => (
                                            <tr key={index}>
                                              <td className="py-3">{index}</td>
                                              <td className="py-3">
                                                {/* {format(
                                                  new Date(issueDate),
                                                  DateFormat.DD_MMM_YYYY
                                                )} */}
                                                {convertDateToUTC(
                                                  issueDate,
                                                  DateFormat.DD_MMM_YYYY
                                                )}
                                              </td>
                                              <td className="py-3">
                                                {checkValue(brandName)}
                                              </td>
                                              <td>{checkValue(genericName)}</td>
                                              <td>{checkValue(strength)}</td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </Table>
                                  ) : (
                                    <NoReportsFound />
                                  )}
                                </InfiniteScroll>
                              )}
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
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
  overallData: state.clinicalDetails.medications,
  medication:
    state.clinicalDetails.medications &&
    state.clinicalDetails.medications.reports,
  count:
    state.clinicalDetails.medications &&
    state.clinicalDetails.medications.years,
  pagination:
    state.clinicalDetails.medications &&
    state.clinicalDetails.medications.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getMedicationDetails,
};
Medications.propTypes = {
  medication: PropTypes.array,
  count: PropTypes.object,
  getMedicationDetails: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Medications);
