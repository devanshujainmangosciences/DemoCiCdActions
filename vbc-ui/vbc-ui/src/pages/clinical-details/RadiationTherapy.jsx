/**
 * This Component renders Surgical Details with yearwise Calendar and monthwise Calender
 * This Component gets radiationTherapy, count, pagination and getradiationTherapy states from
 * Redux store as props. On Component mount getradiationTherapy function is called
 * to get radiationTherapy Array which is mapped inside this component
 * IMPORTANT:
 * radiationTherapy, getradiationTherapy are required
 */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {MedicationIcon, LocationIcon} from '@/assets/icons';
import {getRadiationTherapy} from '@/actions';
import {Col, Row, Tab, Table} from '@themesberg/react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import {MonthWiseCount, YearwiseTimeline, TitleContainer} from '@/components';
import {actionTypes, DateFormat} from '../../constants';
import ReportsAndTestMobileView from './ReportsAndTestMobileView';
import format from 'date-fns/format';
import {
  checkValue,
  convertDateToUTC,
  selectMonthWithData,
  checkifReportsDataInSync,
  checkEnvVariablesText,
} from '@/services/utility';
import NoReportsFound from '@/components/NoReportsFound';

const {SET_RADIATION_THERAPY} = actionTypes;

const RadiationTherapy = function (props) {
  const {t} = useTranslation(['radiationTherapy']);
  const {
    overallData,
    radiationTherapy,
    getRadiationTherapy,
    count,
    pagination,
    dataSynchronized,
  } = props;
  const [radiationTherapyData, setRadiationTherapyData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activeMonth, setActiveMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [monthWise, setMonthWise] = useState({});
  const [isNoradiationTherapyData, setIsNoradiationTherapyData] =
    useState(false);
  const [isNoYearData, setIsNoYearData] = useState(false);

  /** This `useEffect` hook is checking if the `overallData` prop has a value and then setting the
 `isNoradiationTherapyData` and `isNoYearData` state variables based on the presence of
 `radiationTherapy` and `count` props respectively. It runs whenever `count`, `overallData`, or
 `radiationTherapy` props change. */
  useEffect(() => {
    if (overallData) {
      if (!radiationTherapy) {
        setIsNoradiationTherapyData(true);
      } else {
        setIsNoradiationTherapyData(false);
      }
      if (!count) {
        setIsNoYearData(true);
      } else {
        setIsNoYearData(false);
      }
    }
  }, [count, overallData, radiationTherapy]);

  /**
   * The function sets radiation therapy data and returns an object with a type and payload based on the
   * response.
   * @returns an object with two properties: "type" and "payload". The "type" property has a value of
   * "SET_RADIATION_THERAPY" and the "payload" property has a value of the entire "response" object.
   */
  const onSuccess = (response) => {
    setRadiationTherapyData(response.reports);
    return {type: SET_RADIATION_THERAPY, payload: response};
  };
  /**
   * This function fetches the next set of radiation therapy reports based on the current pagination,
   * selected year, and active month.
   */
  const fetchNextReports = () => {
    if (pagination) {
      const {currentPage, totalPages} = pagination;
      if (currentPage === totalPages - 1) {
        setHasMore(false);
      } else {
        if (selectedYear && activeMonth) {
          const onSuccess = (response) => {
            setRadiationTherapyData((current) => [
              ...current,
              ...response.reports,
            ]);
            return {type: SET_RADIATION_THERAPY, payload: response};
          };
          getRadiationTherapy(
            currentPage + 1,
            selectedYear,
            activeMonth,
            onSuccess
          );
        }
      }
    }
  };
  /** The below code is using the `useEffect` hook in a React component. It is setting the window scroll
position to the top of the page and then checking if `dataSynchronized` is true. If it is true, it
calls the `getRadiationTherapy` function with some parameters and a callback function `onSuccess`.
The `useEffect` hook will re-run whenever `dataSynchronized` changes. */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (dataSynchronized)
      getRadiationTherapy(0, selectedYear, activeMonth, onSuccess);
  }, [dataSynchronized]);

  /**
   * This function fetches the next set of radiation therapy reports based on the current pagination,
   * selected year, and active month.
   */
  useEffect(() => {
    if (selectedYear && activeMonth)
      getRadiationTherapy(0, selectedYear, activeMonth, onSuccess);
  }, [getRadiationTherapy, selectedYear, activeMonth]);

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

  /** The below code is using the `useEffect` hook in a React component to set the initial state of
 `selectedYear`, `activeMonth`, and `monthWise` based on the `count` prop passed to the component. */
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
   * The function updates the selected year, sets the month-wise data, and sets the active month based on
   * the provided data and year.
   */
  function onYearChange(data, year) {
    const month = selectMonthWithData(data.months)[0];
    if (year) {
      setSelectedYear(year);
    }
    setMonthWise(data.months);
    setHasMore(true);
    setActiveMonth(month);
  }

  /**
   * This function sets the active month and enables the "has more" feature.
   */
  function onMonthChange(month) {
    setHasMore(true);
    setActiveMonth(month);
  }

  /**
   * The function sets the active month and selected year, and retrieves radiation therapy data based on
   * the selected month and year.
   */
  const onFilter = (month, year) => {
    setActiveMonth(month);
    setSelectedYear(year);
    getRadiationTherapy(0, year, month, onSuccess);
  };
  return (
    <>
      <TitleContainer
        icon={<MedicationIcon fill="#fff" />}
        title={t('radiationTherapy')}
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
                    'noRadiationTherapyReports'
                  )
                )}
          </p>
        </div>
      ) : (
        <>
          <ReportsAndTestMobileView
            type={'radiationTherapy'}
            yearData={count}
            reportsData={radiationTherapyData}
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
                    {radiationTherapyData.length > 0 ? (
                      <Row>
                        <Col lg={12} className="mt-3">
                          <TitleContainer
                            icon={<LocationIcon fill="#28252e" />}
                            title={t('radiationTherapy')}
                            noBg
                          />
                        </Col>
                        <Col lg={12} className="px-5">
                          <Tab.Content>
                            <Tab.Pane eventKey="home" className="py-4">
                              {' '}
                              {isNoradiationTherapyData ? (
                                <div className="p-5 w-100 h-100 d-flex justify-content-center align-items-center">
                                  <h4 className="text-bold">
                                    {t('noRadiationTherapyFound')}
                                  </h4>
                                </div>
                              ) : (
                                <InfiniteScroll
                                  dataLength={radiationTherapyData.length}
                                  next={fetchNextReports}
                                  hasMore={hasMore}>
                                  <Table>
                                    <thead className="vbc-thead">
                                      <tr>
                                        <th>#</th>
                                        <th>{t('date')}</th>
                                        <th>{t('radiationTherapy')}</th>
                                        {/* <th>{t('radiationTechnique')}</th> */}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {radiationTherapyData.map((item) => (
                                        <tr key={item.index}>
                                          <td className="py-3">{item.index}</td>
                                          <td className="py-3">
                                            {convertDateToUTC(
                                              item.startDate,
                                              DateFormat.DD_MMM_YYYY
                                            )}
                                            {/* {format(
                                              new Date(item.startDate),
                                              DateFormat.DD_MMM_YYYY
                                            )} */}
                                          </td>
                                          <td className="py-3">
                                            {checkValue(item.technique)}
                                          </td>
                                          {/* <td className="py-3">{'N/A'}</td> */}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </InfiniteScroll>
                              )}
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
          </div>{' '}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  showLoader: state.app.showLoader,
  overallData: state.clinicalDetails.radiationTherapy,
  radiationTherapy:
    state.clinicalDetails.radiationTherapy &&
    state.clinicalDetails.radiationTherapy.reports,
  count:
    state.clinicalDetails.radiationTherapy &&
    state.clinicalDetails.radiationTherapy.years,
  pagination:
    state.clinicalDetails.radiationTherapy &&
    state.clinicalDetails.radiationTherapy.additionalData,
  dataSynchronized: state.clinicalDetails.dataSynchronized,
});

const mapDispatchToProps = {
  getRadiationTherapy,
};
export default connect(mapStateToProps, mapDispatchToProps)(RadiationTherapy);
