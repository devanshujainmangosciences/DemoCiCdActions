/**
 * This Component renders Summaries Details with yearwise Calendar and monthwise Calender
 * This Component gets clinicalNotes, count, pagination and getSummaryNotesDetails states from
 * Redux store as props. On Component mount getSummaryNotesDetails function is called
 * to get clinicalNotes Array which is mapped inside this component
 * IMPORTANT:
 * clinicalNotes, getSummaryNotesDetails are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Nav, Tab} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * This Function will handle change catagory, When a user changes the catagory
 * This function will get the corresponding data to that
 * @param {String} proc
 */

import InfiniteScroll from 'react-infinite-scroll-component';
import {DoctorNotesIcon} from '@/assets/icons';
import {MonthWiseCount, YearwiseTimeline} from '@/components';
import {getSummaryNotesDetails} from '@/actions';
import TitleContainer from '@/components/TitleContainer';

const Summaries = function (props) {
  const {t} = useTranslation(['summaries']);
  const {summaries, count, pagination, getSummaryNotesDetails} = props;
  // const [yearWise, setYearWise] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [monthWise, setMonthWise] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  /**
   * On Component mount This callback function will call getSummaryNotesDetails to get
   * summaries Array and set the array to notesData state
   */
  useEffect(() => {
    if (!summaries) {
      getSummaryNotesDetails(0);
    }
  }, [summaries, getSummaryNotesDetails]);

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
        const month = Object.keys(count[year].months)[0];
        setActiveMonth(month);
        setMonthWise(count[year].months);
      }
      if (!activeMonth) {
        if (selectedYear) {
          const month = Object.keys(count[selectedYear].months)[0];
          setActiveMonth(month);
          setMonthWise(count[selectedYear].months);
        } else {
          const year = Object.keys(count).reverse()[0];
          setSelectedYear(year);
          const month = Object.keys(count[year].months)[0];
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
    const month = Object.keys(data.months)[0];
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
    setNotesData([]);
    getSummaryNotesDetails(0, year, month);
  }
  /**
   * This Function will handle the change in month, When a user click
   * on a month this function set that month in state
   * @param {Integer} monthKey
   * @param {String} month
   */
  function onMonthChange(month) {
    setHasMore(true);
    setNotesData([]);
    setActiveMonth(month);
    getSummaryNotesDetails(0, selectedYear, month);
  }

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
        if (selectedYear && activeMonth) {
          getSummaryNotesDetails(currentPage + 1, selectedYear, activeMonth);
        }
      }
    }
  };

  return (
    <>
      <TitleContainer
        icon={<DoctorNotesIcon fill="#fff" />}
        title={t('summaries')}
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
      <div className="page-container">
        <Row>
          <Col lg={3}>
            <div className="ps-4 py-5">
              {Object.keys(monthWise) && Object.keys(monthWise).length && (
                <MonthWiseCount
                  months={monthWise}
                  activeMonth={activeMonth}
                  onMonthChange={onMonthChange}
                />
              )}
            </div>
          </Col>
          <Col lg={9}>
            <div className="py-5">
              <Tab.Container defaultActiveKey="home">
                <Row>
                  <Col lg={12}>
                    <Nav className="nav-tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
                          {notesData && notesData[0] && notesData[0].noteType}
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="home" className="py-4">
                        <InfiniteScroll
                          dataLength={notesData.length}
                          next={fetchNextReports}
                          hasMore={hasMore}
                          loader={<h4>{t('loading')}</h4>}>
                          <div className="reports">
                            {notesData &&
                              notesData.map(
                                ({noteContent, noteDate}, index) =>
                                  noteContent && (
                                    <div
                                      key={index.toString()}
                                      className="mb-4">
                                      <h6 className="note-heading">
                                        {new Date(noteDate).toLocaleDateString(
                                          'en-US',
                                          {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                          }
                                        )}
                                      </h6>
                                      <p className="pb-4 pt-2">{noteContent}</p>
                                    </div>
                                  )
                              )}
                          </div>
                        </InfiniteScroll>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  showLoader: state.app.showLoader,
  summaries:
    state.clinicalDetails.summaries && state.clinicalDetails.summaries.reports,
  count:
    state.clinicalDetails.summaries && state.clinicalDetails.summaries.years,
  pagination:
    state.clinicalDetails.summaries &&
    state.clinicalDetails.summaries.additionalData,
});

const mapDispatchToProps = {
  getSummaryNotesDetails,
};

Summaries.propTypes = {
  summaries: PropTypes.array,
  count: PropTypes.object,
  getSummaryNotesDetails: PropTypes.func,
  pagination: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Summaries);
