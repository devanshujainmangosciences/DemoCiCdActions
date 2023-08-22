/**
 This Module will only be triggered for mobile Browser.
 To show the data of radiology and other reports and test
 */
import React, {useEffect, useState} from 'react';
import CustomToggle from './children/CustomToggle';
import {Accordion, Col, Form, Row} from '@themesberg/react-bootstrap';
import {
  checkValue,
  convertMedicationName,
  convertDateToUTC,
  getMonthsDataSorted,
  sortObjectKeysByName,
} from '@/services/utility';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import {DateFormat} from '../../constants';
import format from 'date-fns/format';

const ReportsAndTestMobileView = ({
  type,
  yearData,
  reportsData,
  monthData,
  onYearChange,
  activeMonth,
  activeYear,
  onFilter,
  categories,
  onProcedureChange,
  getLabResultData,
}) => {
  //   console.log('PROPS=>', type, yearData, reportsData, monthData);
  const [isAccordion, setisAccordion] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [monthsDataList, setmonthsDataList] = useState({});
  const [yearDataList, setYearDataList] = useState({});
  const [label, setlabel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setselectedMonth] = useState('');
  const [viewRecordsToggle, setviewRecordsToggle] = useState(false);
  const [reportsDataList, setreportsDataList] = useState([]);

  /** The below code is a React useEffect hook that is triggered when the yearData or monthData state
variables are updated. It sets the state variables yearDataList, selectedYear, monthsDataList,
selectedMonth, and reportsDataList based on the values of yearData, monthData, and
activeYear/activeMonth (which are  props passed down from a parent component). */
  useEffect(() => {
    if (yearData) {
      setYearDataList(yearData);
      setSelectedYear(activeYear);
      // const recievedMonths = yearData[Object.keys(yearData)[0]]?.months;
      // console.log('monthData in useEffect=>', monthData);
      setmonthsDataList(monthData);
      setselectedMonth(activeMonth);
      setreportsDataList(reportsData);
    }
  }, [yearData, monthData]);

  /**  The below code is using the `useEffect` hook in a React component to update the state variables
`selectedYear` and `selectedMonth` whenever the `activeMonth` or `activeYear` props change. This is
achieved by passing an array of dependencies `[activeMonth, activeYear]` as the second argument to
the `useEffect` hook. When any of the dependencies change, the function inside the `useEffect` hook
is called, which updates the state variables `selectedYear` and `selectedMonth` to match the new
values of `activeYear` and `activeMonth`. */
  useEffect(() => {
    setSelectedYear(activeYear);
    setselectedMonth(activeMonth);
  }, [activeMonth, activeYear]);

  /** The below code is using the `useEffect` hook in a React component to update the state of
 `reportsDataList` with the value of `reportsData` whenever `reportsData` changes. This is achieved
 by passing `[reportsData]` as the second argument to `useEffect`, which tells React to re-run the
 effect whenever `reportsData` changes. */
  useEffect(() => {
    setreportsDataList(reportsData);
  }, [reportsData]);

  /** The below code is using the `useState` hook in a React component to set the label and isAccordion
state variables based on the value of the `type` prop. It is using a switch statement to check the
value of `type` and setting the label and isAccordion variables accordingly. The code is also using
a callback function as the initial state value for the `useState` hook, which will only be executed
once when the component is mounted. */
  useState(() => {
    if (type) {
      switch (type) {
        case 'radiologyReports':
          setlabel('Radiology');
          setisAccordion(true);
          break;
        case 'labReports':
          setlabel('Lab Reports');
          setisAccordion(true);
          break;
        case 'medications':
          setlabel('Medications');
          setisAccordion(false);
          break;
        case 'clinicalNotes':
          setlabel('Clinical Notes');
          setisAccordion(true);
          break;
        case 'otherTests':
          setlabel('Other Tests');
          setisAccordion(true);
          break;
        case 'surgicalDetails':
          setlabel('Surgery Details');
          setisAccordion(false);
          break;
        case 'radiationTherapy':
          setlabel('Radiation Therapy');
          setisAccordion(false);
          break;
        case 'otherTreatment':
          setlabel('Other Treatment');
          setisAccordion(false);
          break;
        default:
          break;
      }
    }
  }, [type]);

  // console.log('SELECTED MONTH=>', selectedMonth);
  // console.log('SELECTED YEAR=>', selectedYear);
  // console.log('YEAR LIST=>', yearDataList);
  // console.log('MONNTH=>', monthsDataList);
  // console.log('monthData=>', monthData);
  // console.log('Year Data=>', yearData);
  // console.log('reportsData=>', reportsData);
  // console.log('CATEGORIES=>', categories);

  /** The function `radiologyReports` that returns a React component. The
component renders an Accordion element that displays radiology reports. The report data is passed as
a parameter to the function. The component displays the date and procedure of the report in the
header of the Accordion. When the Accordion is expanded, it displays the radiology report note. The
component also includes a toggle button to expand and collapse the Accordion. 
*@param {Object} report
*@param {Number} index
*/
  const radiologyReports = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>
            {/* {format(new Date(report.orderDate), DateFormat.DD_MM_YYYY_SLASH)} */}
            {convertDateToUTC(report.orderDate, DateFormat.DD_MM_YYYY_SLASH)}
          </div>
          <div>
            <strong>Procedure:</strong>
            {checkValue(report?.radiologyProcedure)}
          </div>
        </div>
        <div className="accordation-button">
          {isAccordion && (
            <CustomToggle
              callback={() => setIsAccordionOpen(!isAccordionOpen)}
              eventKey={index.toString()}
            />
          )}
        </div>
      </div>
      <Accordion.Collapse
        eventKey={index.toString()}
        className="border-0 accordion-table">
        <Col className="m-2 p-2 border-bottom border-light-grey">
          <Row className="m-0 border-bottom border-light-grey">
            {/* <h6>PROCEDURE:</h6> */}
            <p>
              {checkValue(
                report?.radiologyReportNote,
                true,
                import.meta.env.VITE_NO_RADIOLOGY_NOTE,
                'No radiology report found'
              )}
            </p>
            <Col lg={8}></Col>
          </Row>
        </Col>
      </Accordion.Collapse>
    </Accordion>
  );
  /** The  functional component  `clinicalReports` that returns an
  Accordion component with collapsible content. The component takes in two props, `report` and
  `index`, and uses them to display information about a clinical report. The information displayed
  includes the date of the report, the type of note, and the note content. The component also
  includes a button to toggle the visibility of the note content. 
  *@param {Object} report
  *@param {Number} index
  */
  const clinicalReports = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>

            {convertDateToUTC(report.noteDate, DateFormat.DD_MM_YYYY_SLASH)}
            {/* {format(new Date(report?.noteDate), DateFormat.DD_MM_YYYY_SLASH)} */}
          </div>
          <div>
            <strong>Note Type:</strong>
            {checkValue(report?.noteType)}
          </div>
        </div>
        <div className="accordation-button">
          {isAccordion && (
            <CustomToggle
              callback={() => setIsAccordionOpen(!isAccordionOpen)}
              eventKey={index.toString()}
            />
          )}
        </div>
      </div>
      <Accordion.Collapse
        eventKey={index.toString()}
        className="border-0 accordion-table">
        <Col className="m-2 p-2 border-bottom border-light-grey">
          <Row className="m-0 border-bottom border-light-grey">
            {/* <h6>PROCEDURE:</h6> */}
            <p>
              {checkValue(
                report?.noteContent,
                true,
                import.meta.env.VITE_NO_CLINICAL_NOTE,
                'No clinical note found'
              )}
            </p>
            <Col lg={8}></Col>
          </Row>
        </Col>
      </Accordion.Collapse>
    </Accordion>
  );
  /** The `otherTestsReport` that takes in two
  parameters: `report` and `index`. It returns an `Accordion` component with a header section that
  displays the date and procedure name from the `report` object. The header also includes a button
  that toggles the display of a collapsible section containing the procedure note content from the
  `report` object. The `checkValue` function is used to ensure that the displayed values are not
  null or undefined. The `convertDateToUTC` function is used to format the date in UTC format. 
  *@param {Object} report
  *@param {Number} index
  */

  const otherTestsReport = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>
            {/* {format(
              new Date(report?.procedureDate),
              DateFormat.DD_MM_YYYY_SLASH
            )} */}
            {convertDateToUTC(
              report.procedureDate,
              DateFormat.DD_MM_YYYY_SLASH
            )}
          </div>
          <div>
            <strong>Procedure:</strong>
            {checkValue(report?.vbcProcedureName)}
          </div>
        </div>
        <div className="accordation-button">
          {isAccordion && (
            <CustomToggle
              callback={() => setIsAccordionOpen(!isAccordionOpen)}
              eventKey={index.toString()}
            />
          )}
        </div>
      </div>
      <Accordion.Collapse
        eventKey={index.toString()}
        className="border-0 accordion-table">
        <Col className="m-2 p-2 border-bottom border-light-grey">
          <Row className="m-0 border-bottom border-light-grey">
            {/* <h6>PROCEDURE:</h6> */}
            <p>
              {checkValue(
                report?.procedureNoteContent,
                true,
                import.meta.env.VITE_NO_OTHER_TEST_NOTE,
                'No other test report found'
              )}
            </p>
            <Col lg={8}></Col>
          </Row>
        </Col>
      </Accordion.Collapse>
    </Accordion>
  );
  /**
   * This function generates a report for surgical details using React and displays the date and
   * procedure name in an accordion format.
   * @param {Object} report
   * @param {Number} index
   */
  const surgicalDetailsReport = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>

            {/* {format(new Date(report?.surgeryDate), DateFormat.DD_MM_YYYY_SLASH)} */}
            {convertDateToUTC(report.surgeryDate, DateFormat.DD_MM_YYYY_SLASH)}
          </div>
          <div>
            <strong>Procedure:</strong>
            {checkValue(report?.procedureName)}
          </div>
        </div>
      </div>
    </Accordion>
  );
  /**
   * This is a JavaScript React function that generates a report for radiation therapy and displays it
   * in an accordion format.
   *@param {Object} report
   *@param {Number} index
   */
  const radiationTherapyReport = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>

            {/* {format(new Date(report?.startDate), DateFormat.DD_MM_YYYY_SLASH)} */}
            {format(new Date(report?.startDate), DateFormat.DD_MM_YYYY_SLASH)}
          </div>
          <div>
            <strong>Radiation Therapy:</strong>
            {checkValue(report?.technique)}
          </div>
        </div>
      </div>
    </Accordion>
  );
  /** The  `otherTreatmentReport` that takes two parameters:
`report` and `index`. The function returns a JSX element that renders an Accordion component with
some content inside. The content includes the date and procedure name from the `report` object,
formatted using the `format` function and displayed using the `checkValue` function. The
`import.meta.env.VITE_NO_OTHER_TREATMENT_NOTE` value is used as a fallback message if the procedure
name is not available. 
*@param {Object} report
*@param {Number} index
*/
  const otherTreatmentReport = (report, index) => (
    <Accordion>
      <div
        key={index}
        className="d-flex justify-content-between mt-3 p-2 mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Date:</strong>

            {/* {format(
              new Date(report?.procedureDate),
              DateFormat.DD_MM_YYYY_SLASH
            )} */}
            {format(
              new Date(report?.procedureDate),
              DateFormat.DD_MM_YYYY_SLASH
            )}
          </div>
          <div>
            <strong>Procedure:</strong>
            {checkValue(
              report?.vbcProcedureName,
              true,
              import.meta.env.VITE_NO_OTHER_TREATMENT_NOTE,
              'No other treatment report found'
            )}
          </div>
        </div>
      </div>
    </Accordion>
  );
  /** The above code is defining a function called `labReports` that takes in two parameters: `report` and
`index`. The function returns an `Accordion` component with collapsible sections that display
information about a lab report. The information displayed includes the test collection date, test
result date, and test name. If the `isAccordion` variable is true, a custom toggle button is
displayed to expand and collapse the section. The function also calls another function called
`renderTestParameters` to display additional information about the lab report in a table format. 
  *@param {Object} report
  *@param {Number} index
*/
  const labReports = (report, index) => (
    <Accordion>
      <div
        key={report?.labOrderId}
        className="d-flex justify-content-between mt-3 p-2  mb-3 bg-light-orange">
        <div>
          <div>
            <strong>Test Collection Date:</strong>

            {/* {format(
              new Date(report?.testCollectionDate),
              DateFormat.DD_MM_YYYY_SLASH
            )} */}
            {format(
              new Date(report?.testCollectionDate),
              DateFormat.DD_MM_YYYY_SLASH
            )}
          </div>
          <div>
            <strong>Test Result Date:</strong>
            {/* 
            {format(
              new Date(report?.testResultsDate),
              DateFormat.DD_MM_YYYY_SLASH
            )} */}
            {format(
              new Date(report?.testResultsDate),
              DateFormat.DD_MM_YYYY_SLASH
            )}
          </div>
          <div>
            <strong>Test:</strong>
            {checkValue(report?.testName)}
          </div>
        </div>
        <div className="accordation-button">
          {isAccordion && (
            <CustomToggle
              callback={() => setIsAccordionOpen(!isAccordionOpen)}
              eventKey={index.toString()}
            />
          )}
        </div>
      </div>
      <Accordion.Collapse
        eventKey={index.toString()}
        className="border-0 accordion-table">
        <Col className="m-2 p-2 border-bottom border-light-grey">
          <Row className="m-0 border-bottom border-light-grey">
            {renderTestParameters(report?.testParameters)}
          </Row>
        </Col>
      </Accordion.Collapse>
    </Accordion>
  );
  /**
   * The function displays medication reports in an accordion format with information such as date, brand
   * name, generic name, and strength.
   *@param {Object} report
   *@param {Number} index
   */
  const medicationReports = (report) => (
    <Accordion>
      <div
        key={report?.index}
        className="d-flex justify-content-between mt-3 p-2  mb-3 bg-light-orange">
        <div>
          <div>
            <strong> Date:</strong>
            {/* {format(new Date(report?.issueDate), DateFormat.DD_MM_YYYY_SLASH)} */}
            {format(new Date(report?.issueDate), DateFormat.DD_MM_YYYY_SLASH)}
          </div>
          <div>
            <strong>Brand Name:</strong>
            {checkValue(report?.brandName)}
          </div>
          <div>
            <strong>Generic Name:</strong>
            {checkValue(report?.genericName)}
          </div>
          <div>
            <strong>Strength:</strong>
            {checkValue(report?.strength)}
          </div>
        </div>
      </div>
    </Accordion>
  );

  /**
   * This function renders test parameters and their results in a specific format.
   * @returns The function `renderTestParameters` returns a JSX element that displays test parameters and
   * their results. If there are no test parameters, it returns a JSX element that says "No Data
   * Available".
   * @param {Array} testParameters
   */
  const renderTestParameters = (testParameters) => {
    if (testParameters && testParameters.length > 0) {
      return testParameters.map((test, index) => {
        return (
          <div className="mt-2 mb-2 bg-super-light-orange p-3" key={index}>
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Metric:</strong>
                </div>
                <div>{test?.testParameter}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Result:</strong>
                </div>
                <div>
                  {getLabResultData(
                    test?.numericResult,
                    test?.numericResultUnits,
                    test?.unstructuredResult
                  )}
                </div>
              </div>
              {/* <div className="d-flex justify-content-between">
                <div>
                  <strong>Units of Measure:</strong>
                </div>
                <div>{test?.numericResultUnits}</div>
              </div> */}
            </div>
            {/* <hr /> */}
            {/* <div>
              <div>
                <strong>Note:</strong>
              </div>
              <div>
                {test?.unstructuredResult ? test?.unstructuredResult : 'N/A'}
              </div>
            </div> */}
          </div>
        );
      });
    } else {
      <div>No Data Avaliable</div>;
    }
  };

  /**
   * This function takes in a list of reports data and renders a unique list of reports based on the type
   * of report.
   *
   * @returns The function `renderReportList` returns an array of components based on the `type` of
   * report passed as an argument. If `reportsData` is not empty, it maps over the unique data and
   * returns a component based on the `type` of report. If `reportsData` is empty, it returns a div with
   * the message "No Data Available!".
   * @param {Array} reportsData
   */
  const renderReportList = (reportsData) => {
    if (reportsData && reportsData.length > 0) {
      //   console.log('REPORTS DATA=>', reportsData);
      const uniqueData = uniqWith(reportsData, isEqual);
      //   console.log('UINQUE DATA=>', uniqueData);
      return uniqueData.map((report, index) => {
        switch (type) {
          case 'radiologyReports':
            return radiologyReports(report, index);
          case 'labReports':
            return labReports(report, index);
          case 'medications':
            return medicationReports(report, index);
          case 'clinicalNotes':
            return clinicalReports(report, index);
          case 'otherTests':
            return otherTestsReport(report, index);
          case 'surgicalDetails':
            return surgicalDetailsReport(report, index);
          case 'radiationTherapy':
            return radiationTherapyReport(report, index);
          case 'otherTreatment':
            return otherTreatmentReport(report, index);
          default:
            break;
        }
      });
    } else {
      return <div> No Data Avaliable!</div>;
    }
  };

  /**
   * The function renders a list of categories with their respective report counts and allows for
   * toggling of view records.
   * @returns The function `renderCategoriesData` is returning a mapped array of JSX elements. Each
   * element is a `div` with a class of `report-details item pointer mb-2` and an `onClick` event
   * listener that toggles the `viewRecordsToggle` state and calls the `onProcedureChange` function with
   * the `item` parameter. The `item` parameter is the current item being iter
   */
  const renderCategoriesData = () => {
    return sortObjectKeysByName(categories).map((item, index) => {
      return (
        <div
          className="report-details item pointer mb-2"
          onClick={() => {
            setviewRecordsToggle(!viewRecordsToggle);
            onProcedureChange(item);
          }}
          key={`${item}-${index}`}>
          <div className="p-3 d-flex ">
            <div className="report-details-desc">
              <div className="report-label mb-2">
                <strong>{convertMedicationName(item)}</strong>
              </div>
              <div className="report-count">
                Total Reports:{categories[item]}
              </div>
            </div>
            {/* <div className="report-icon d-flex justify-content-center aling-items-center">
      ICON
    </div> */}
          </div>
        </div>
      );
    });
  };
  if (!viewRecordsToggle)
    return (
      <div className="report-mobile-view">
        <div className="filter-month-year item mb-3 mt-3 justify-content-center">
          <div className="p-3 flex-basic-80">
            <div>
              <Form.Group>
                <Form.Control
                  value={selectedYear}
                  className="input-normal"
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    onYearChange(yearData[e.target.value], e.target.value);
                  }}
                  name="selectedYear"
                  as={'select'}>
                  <option value="" hidden>
                    Select Year
                  </option>

                  {Object.keys(yearDataList)
                    .reverse()
                    .map((key) => {
                      if (yearData)
                        return (
                          <option key={key} value={key}>
                            {key} ({yearData[key]?.total})
                          </option>
                        );
                    })}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="mt-3">
              <Form.Group>
                <Form.Control
                  value={selectedMonth}
                  className="input-normal"
                  onChange={(e) => {
                    setselectedMonth(e.target.value);
                    //   onMonthChange(selectedMonth, monthsDataList[selectedMonth]);
                  }}
                  name="selectedMonth"
                  as={'select'}>
                  <option value="" hidden>
                    Select Month
                  </option>
                  {getMonthsDataSorted(monthsDataList).map((key) => (
                    <option key={key} value={key}>
                      {key} ({monthsDataList[key]?.total})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={() =>
                  onFilter(
                    selectedMonth,
                    selectedYear,
                    monthsDataList[selectedMonth]
                  )
                }
                className="btn-patient-theme">
                Filter Now
              </button>
            </div>
          </div>
        </div>
        {categories ? (
          renderCategoriesData(categories)
        ) : (
          <div
            className="report-details item pointer"
            onClick={() => setviewRecordsToggle(!viewRecordsToggle)}>
            <div className="p-3 d-flex ">
              <div className="report-details-desc">
                <div className="report-label mb-2">
                  <strong>{label}</strong>
                </div>
                <div className="report-count">
                  Total Reports:{monthsDataList[selectedMonth]?.total}
                </div>
              </div>
              {/* <div className="report-icon d-flex justify-content-center aling-items-center">
            ICON
          </div> */}
            </div>
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="report-mobile-view">
        <div className="report-list">
          {renderReportList(reportsDataList, isAccordion)}
        </div>
        <button
          onClick={() => setviewRecordsToggle(!viewRecordsToggle)}
          className="btn-patient-theme">
          Back
        </button>
      </div>
    );
};

export default ReportsAndTestMobileView;
