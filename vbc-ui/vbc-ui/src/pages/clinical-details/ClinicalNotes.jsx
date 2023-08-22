/**
 * This Component renders Surgical Details with yearwise Calendar and monthwise Calender
 * This Component gets clinicalNotes, count, pagination and getClinicalNotesDetails states from
 * Redux store as props. On Component mount getClinicalNotesDetails function is called
 * to get clinicalNotes Array which is mapped inside this component
 * IMPORTANT:
 * clinicalNotes, getClinicalNotesDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {LocationIcon, ClinicalNotesIcon} from '@/assets/icons';
import {getClinicalNotesDetails} from '@/actions';
import {Accordion, Col, Row, Tab, Table} from '@themesberg/react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  MonthWiseCount,
  YearwiseTimeline,
  TitleContainer,
} from '../../components';
import CustomToggle from './children/CustomToggle';
import {DateFormat} from '../../constants';
import ReportsAndTestMobileView from './ReportsAndTestMobileView';

import uniqBy from 'lodash/uniqBy';
import {
  checkValue,
  convertDateToUTC,
  selectMonthWithData,
  checkifReportsDataInSync,
  checkEnvVariablesText,
} from '@/services/utility';
import NoReportsFound from '@/components/NoReportsFound';

const ClinicalNotes = function (props) {
  const {t} = useTranslation(['clinicalNotes']);
  const {
    overallData,
    getClinicalNotesDetails,
    count,
    pagination,
    dataSynchronized,
  } = props;
  const [clinicalNotesData, setclinicalNotesData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthWise, setMonthWise] = useState({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  // console.log('CLINICAL NOTES DATA=>', clinicalNotesData);

  /**
   * set the report from response to clinicalNotesData state
   * @param {Object} response
   *
   */
  const onSuccessAddOnTop = (response) => {
    // console.log('RESPONSE=>', response);
    setclinicalNotesData((current) => {
      const mergeData = [...current, ...response.reports];
      const reqData = uniqBy(mergeData, 'index');
      return reqData;
    });
  };
  const onSuccessReplace = (response) => {
    setclinicalNotesData(response.reports);
  };
  /**
   * On Page Scroll down this function is triggered and call the api for next page
   * and the new data to state
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        if (selectedYear && activeMonth) {
          // console.log('FETCHING NEW RECORDS');
          getClinicalNotesDetails(
            currentPage + 1,
            selectedYear,
            activeMonth,
            onSuccessAddOnTop
          );
        }
      }
    }
  };
  /** The below code is using the `useEffect` hook in a React component. It is setting the window scroll
position to the top of the page and then checking if `dataSynchronized` is true. If it is true, it
calls the `getClinicalNotesDetails` function with some parameters and passes in the
`onSuccessReplace` function as a callback. The `useEffect` hook will only run again if
`dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getClinicalNotesDetails(0, selectedYear, activeMonth, onSuccessReplace);
  }, [dataSynchronized]);

  /**  The below code is using the `useEffect` hook in a React component to call the
 `getClinicalNotesDetails` function with specific parameters (`0`, `selectedYear`, `activeMonth`,
 and `onSuccessReplace`) when the `activeMonth` or `selectedYear` variables change. This is likely
 part of a larger component that is responsible for displaying clinical notes details and is using
 this effect to update the data being displayed based on the selected year and month. */
  useEffect(() => {
    if (selectedYear && activeMonth)
      getClinicalNotesDetails(0, selectedYear, activeMonth, onSuccessReplace);
  }, [activeMonth, selectedYear]);

  /**
   * This callback will call getClinicalNotesDetails action if clinicalNotes is empty
   */
  useEffect(() => {
    if (overallData) {
      if (!count) {
        setIsNoYearData(true);
      }
    }
  }, [count, overallData]);

  /**
   * This will set hasMore to false if currentpage is equal to total no of pages
   */
  useEffect(() => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) setHasMore(false);
      else setHasMore(true);
    }
  }, [pagination]);
  /** Commenting out previous logic */
  // useEffect(() => {
  //   if (pagination) {
  //     const {currentPage, totalPages} = pagination;
  //     const currPage = currentPage;
  //     const totPage = totalPages;
  //     if (currPage === totPage - 1) {
  //       setHasMore(false);
  //     } else {
  //       if (selectedYear && activeMonth) {
  //         if (pagination.totalItems > 0)
  //           console.log(
  //             'USE EFFECT 2(currentPage,selectedYear,activeMonth):-',
  //             currPage + 1,
  //             selectedYear,
  //             activeMonth
  //           );
  //         getClinicalNotesDetails(currPage + 1, selectedYear, activeMonth);
  //       }
  //     }
  //   }
  // }, [pagination]);

  // console.log('HAS MORE=>', hasMore);

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
  }, [count]);

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
    // setclinicalNotesData([]);
    // getClinicalNotesDetails(0, year, month, onSuccessReplace);
  }

  /**
   * Handles the change in months and set the new data to state if any change occured
   * in month
   * @param {String} month
   */
  function onMonthChange(month) {
    setHasMore(true);
    // setclinicalNotesData([]);
    setActiveMonth(month);
    // getClinicalNotesDetails(0, selectedYear, month, onSuccessReplace);
  }
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getClinicalNotesDetails(0, year, month, onSuccessReplace);
  };

  return (
    <>
      <TitleContainer
        icon={<ClinicalNotesIcon fill="#fff" />}
        title={t('clinicalNotes')}
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
                    'noClinicalNotesReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'clinicalNotes'}
            yearData={count}
            reportsData={clinicalNotesData}
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
                  <>
                    <YearwiseTimeline
                      data={count}
                      onYearChange={onYearChange}
                      show={4}
                    />
                  </>
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
                    {clinicalNotesData && clinicalNotesData.length > 0 ? (
                      <Row>
                        <Col lg={12} className="mt-3">
                          <TitleContainer
                            icon={<LocationIcon fill="#28252e" />}
                            title={t('clinicalNotes')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          <Tab.Content>
                            <Tab.Pane eventKey="home" className="py-4">
                              <InfiniteScroll
                                dataLength={clinicalNotesData.length}
                                next={fetchNextReports}
                                hasMore={hasMore}>
                                <Accordion>
                                  <Table>
                                    <thead className="vbc-thead">
                                      <tr>
                                        <th>#</th>
                                        <th className="w-25">{t('date')}</th>
                                        <th>{t('noteType')}</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {clinicalNotesData.map((item) => (
                                        <React.Fragment key={item.index}>
                                          <tr className="accordion-toggle">
                                            <td className="py-3">
                                              {item.index}
                                            </td>
                                            <td className="py-3">
                                              {/* {format(
                                                new Date(item.noteDate),
                                                DateFormat.DD_MMM_YYYY
                                              )} */}
                                              {convertDateToUTC(
                                                item.noteDate,
                                                DateFormat.DD_MMM_YYYY
                                              )}
                                            </td>
                                            <td className="py-3">
                                              {checkValue(item.noteType)}
                                            </td>
                                            <td className="py-3 d-flex justify-content-end">
                                              <CustomToggle
                                                callback={() =>
                                                  setIsAccordionOpen(
                                                    !isAccordionOpen
                                                  )
                                                }
                                                eventKey={item.index.toString()}
                                              />
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
                                                  <Row>
                                                    <Col>
                                                      <p className="white-space-pre-line px-3">
                                                        {checkValue(
                                                          item.noteContent,
                                                          true,
                                                          import.meta.env
                                                            .VITE_NO_CLINICAL_NOTE,
                                                          'No clinical note found'
                                                        )}
                                                      </p>
                                                    </Col>
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
  overallData: state.clinicalDetails.clinicalNotes,
  clinicalNotes:
    state.clinicalDetails.clinicalNotes &&
    state.clinicalDetails.clinicalNotes.reports,
  count:
    state.clinicalDetails.clinicalNotes &&
    state.clinicalDetails.clinicalNotes.years,
  pagination:
    state.clinicalDetails.clinicalNotes &&
    state.clinicalDetails.clinicalNotes.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getClinicalNotesDetails,
};
ClinicalNotes.propTypes = {
  clinicalNotes: PropTypes.array,
  count: PropTypes.object,
  getClinicalNotesDetails: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(ClinicalNotes);
