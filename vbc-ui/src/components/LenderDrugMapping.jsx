import {Card, Col, Container, Form, Row} from '@themesberg/react-bootstrap';
import {
  ALERT_MESSAGE,
  GRANT_AMOUNT_TYPE,
  selectGrantAmountTypeOptions,
} from '../constants';
import InputForm from '@/pages/profile/children/InputForm';
import React, {useEffect, useState} from 'react';
import TableComponent from './Tables';
import {setToast} from '@/actions';
import {useAppDispatch} from '@/redux/redux-hooks';
import {checkMinMaxValue, formatEndpoint} from '@/services/utility';

/**
 * This component serves as the UI for Create/Update/View Drug and Lender in Grant Percentage Details
 *
 *@param {Object} apiData Api Data is the data recieved while edit/view, its null when creating lender/drug
 *@param {String} tableSelectValue, Which value we are going to select in select box
 *@param {String} selectLabel, Label name to be displayed in select input box
 *@param {Boolean}isView,
 *@param {Array}selectOptions, Options data to be displayed in select input
 *@param {Array}tableData, Table data
 *@param {Array}tableConfig, table configuration data from config file
 *@param {Function}onAddDataClick, call back when add button is clicked
 *@param {Function}setTableData, callback when table data is set
 *@param {String}containerClasses, css for container classes
 *@param {String}cardClasses, css for card classes
 *@param {String}addButtonClasses, css for add button class
 */

const LenderDrugMapping = ({
  apiData,
  tableSelectValue,
  selectLabel,
  isView,
  selectOptions,
  tableData,
  tableConfig,
  onAddDataClick,
  setTableData,
  containerClasses,
  cardClasses,
  addButtonClasses,
}) => {
  const dispatch = useAppDispatch();
  const [selectValue, setselectValue] = useState('');
  const [grantPercentage, setgrantPercentage] = useState('');
  const [isEditValue, setisEditValue] = useState(false);
  const [grantPercentError, setgrantPercentError] = useState(false);
  const [grantFixedError, setGrantFixedError] = useState(false);
  const [grantType, setGrantType] = useState('');

  /**
   * This useeffect run when EDIT/VIEW is opened, it does not run when creating new data
   * this sets the value of tableData to display
   */
  useEffect(() => {
    if (
      apiData &&
      apiData?.lenderDrugGrantSet &&
      apiData?.lenderDrugGrantSet.length > 0 &&
      selectOptions
    ) {
      // console.log('APIDATA=>', apiData);

      const reqData = [...apiData.lenderDrugGrantSet]
        .map((data, index) => {
          const requiredData = selectOptions.find(
            (option) => option.value === parseInt(data[tableSelectValue])
          );
          // console.log('REQUIRED DATA=>', requiredData);
          if (index === 0) setGrantType(data?.grantType);
          return {
            serialNo: index + 1,
            id: data?.id,
            selectValue: data[tableSelectValue],
            label: requiredData?.label,
            grantType: data?.grantType,
            grantPercentage:
              data?.grantType === GRANT_AMOUNT_TYPE.FIXED
                ? data?.grantAmount
                : data?.grantPercent,
            edit: isView ? (
              'N/A'
            ) : (
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn-patient-theme-grid bg-admin"
                  onClick={() =>
                    handleEditDrugPercentage({
                      selectValue: data[tableSelectValue],
                      grantPercentage:
                        data?.grantType === GRANT_AMOUNT_TYPE.FIXED
                          ? data?.grantAmount
                          : data?.grantPercent,
                      grantType: data?.grantType,
                    })
                  }>
                  Edit
                </button>
                {/* <button
                  type="button"
                  className="btn-patient-theme-grid bg-dark"
                  onClick={() =>
                    handelRemoveDrugPercentage({
                      selectValue: data[tableSelectValue],
                      grantPercentage: data?.grantPercent,
                    })
                  }>
                  Delete
                </button> */}
              </div>
            ),
          };
        })
        .sort((a, b) => a.serialNo - b.serialNo)
        .filter((item) => item.label);
      // console.log('REQ DATA=>', requiredData);
      setTableData(reqData);
    }
  }, [apiData, selectOptions, isView]);

  //   console.log('SELECT OPTIONS=>', selectOptions);
  /**
   * Function is called when edit is clicked
   * @param {Object} value
   */
  const handleEditDrugPercentage = (value) => {
    setselectValue(value?.selectValue);
    setgrantPercentage(value?.grantPercentage);
    setGrantType(value?.grantType);
    setisEditValue(true);
  };
  /**
   * Function called when delete button on the table is clicked, It fiters out the required values and sets the tableData
   * @param {Object} value
   */
  const handelRemoveDrugPercentage = (value) => {
    const newData = tableData.filter(
      (item) => item.selectValue !== value?.selectValue
    );
    setTableData(newData);
    setisEditValue(false);
    cleatData();
  };
  /**
   * Function Triggers when add button is clicked when adding a new configuration
   */
  const onAddClick = () => {
    let addedData = tableData.find(
      (data) => parseInt(data.selectValue) == parseInt(selectValue)
    );
    let labelValue = addedData?.label;
    const reqMessage = formatEndpoint(ALERT_MESSAGE.DUPLICATE_DATA, [
      labelValue,
    ]);
    //Run this IF only when some data addation is pending or we are editing the data
    if (selectOptions.length !== tableData.length || isEditValue) {
      const serialNo =
        tableData && tableData.length > 0 ? tableData.length + 1 : 1;
      const requiredData = selectOptions.find(
        (option) => option.value === parseInt(selectValue)
      );

      //Continue if it only have data or editing a value
      if (!addedData || isEditValue) {
        if (isEditValue) {
          const newData = tableData.map((item) => {
            if (item?.selectValue === selectValue) {
              return {
                ...item,
                selectValue,
                grantPercentage,
                grantType,
                edit: (
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn-patient-theme-grid bg-admin"
                      onClick={() =>
                        handleEditDrugPercentage({
                          selectValue,
                          grantPercentage,
                          grantType,
                        })
                      }>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-patient-theme-grid bg-dark"
                      onClick={() =>
                        handelRemoveDrugPercentage({
                          selectValue,
                          grantPercentage,
                        })
                      }>
                      Delete
                    </button>
                  </div>
                ),
              };
            } else return {...item};
          });
          setTableData(newData);
          cleatData();
          setisEditValue(false);
        } else {
          let requiredId;
          //Adding the ID to the data if drug/lender was already added so new data will not be appended
          if (
            apiData &&
            apiData.lenderDrugGrantSet &&
            apiData.lenderDrugGrantSet.length > 0
          )
            requiredId = apiData.lenderDrugGrantSet.find(
              (item) => item[tableSelectValue] === requiredData.value
            )?.id;

          const reqData = {
            id: requiredId,
            serialNo,
            selectValue,
            label: requiredData?.label,
            grantType,
            grantPercentage,
            edit: (
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn-patient-theme-grid bg-admin"
                  onClick={() =>
                    handleEditDrugPercentage({
                      selectValue,
                      grantPercentage,
                      grantType,
                    })
                  }>
                  Edit
                </button>
                <button
                  type="button"
                  className="btn-patient-theme-grid bg-dark"
                  onClick={() =>
                    handelRemoveDrugPercentage({selectValue, grantPercentage})
                  }>
                  Delete
                </button>
              </div>
            ),
          };
          const callback = () => {
            cleatData();
          };
          if (selectValue && grantPercentage) onAddDataClick(reqData, callback);
          else
            dispatch(
              setToast(
                grantType === GRANT_AMOUNT_TYPE.FIXED
                  ? ALERT_MESSAGE.ADD_GRANT_VALUE
                  : ALERT_MESSAGE.ADD_GRANT_PERCENTAGE,
                true,
                'warning'
              )
            );
        }
      } else {
        dispatch(setToast(reqMessage, true, 'warning'));
        cleatData();
      }
    } else {
      dispatch(setToast(reqMessage, true, 'warning'));
      cleatData();
    }
  };

  /**
   * This function clears the state of grant% and selected value
   */
  const cleatData = () => {
    setgrantPercentage('');
    setselectValue('');
    // setGrantType('');
  };

  /**
   * Function called when grant % is changed
   * @param {*} e
   */
  const onGrantPercentageChange = (e) => {
    const value = e.target.value;
    setgrantPercentage(value);

    if (value > 0) setGrantFixedError(false);
    else setGrantFixedError(true);
    if (checkMinMaxValue(0, 100, value)) setgrantPercentError(true);
    else setgrantPercentError(false);
  };
  return (
    <>
      <Container className={containerClasses}>
        <h5 className="mb-3">Grant percentage details</h5>
        {!isView && (
          <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3 align-items-center">
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body className={cardClasses}>
                  <InputForm
                    label={selectLabel}
                    type="select"
                    isView={false}
                    readOnly={isView}
                    required={false}
                    ipValue={selectValue}
                    onChange={(e) => {
                      setselectValue(e.target.value);
                      if (isEditValue) setisEditValue(false);
                    }}
                    options={selectOptions}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-sm-12 col-md-6 col-lg-4">
              <Card className="border-0">
                <Card.Body className={cardClasses}>
                  <div>
                    <Form.Label>Grant Amount</Form.Label>
                    <div className="d-flex">
                      {selectGrantAmountTypeOptions.map((type) => (
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            // disabled={
                            //   isView || isEditValue || tableData.length > 0
                            // }
                            name={type.value}
                            checked={type.value === grantType}
                            onChange={() => {
                              setGrantType(type.value);
                              // if (grantType && grantType !== type.value)
                              //   setTableData([]);
                            }}
                          />
                          <label className="form-check-label">
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-sm-12 col-md-6 col-lg-3">
              <Card className="border-0">
                <Card.Body className={cardClasses}>
                  <InputForm
                    label={
                      grantType === GRANT_AMOUNT_TYPE.PERCENT
                        ? 'Grant(%)'
                        : 'Grant(Fixed)'
                    }
                    type="number"
                    className="warning-position"
                    isView={false}
                    readOnly={isView || !grantType}
                    required={false}
                    ipValue={grantPercentage}
                    isInvalid={
                      grantType === GRANT_AMOUNT_TYPE.PERCENT
                        ? grantPercentError
                        : grantFixedError
                    }
                    onChange={onGrantPercentageChange}
                    warningText={
                      grantType === GRANT_AMOUNT_TYPE.PERCENT
                        ? 'Please enter a valid (0-100)%'
                        : 'Please enter positive number'
                    }
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col className={`col-sm-12 col-md-6 col-lg-4 ${addButtonClasses}`}>
              {/* <div className="mt-2">
              <Form.Label>{''}</Form.Label>
            </div> */}
              <div>
                <button
                  className="btn-patient-theme-small bg-dark px-4"
                  type="button"
                  disabled={
                    grantType === GRANT_AMOUNT_TYPE.PERCENT
                      ? grantPercentError
                      : grantFixedError
                  }
                  onClick={onAddClick}>
                  {isEditValue ? 'Update' : 'Add'}
                </button>
              </div>
            </Col>
          </Row>
        )}

        {/* <Row className="row-cols-sm-2 row-cols-md-3 row-cols-lg-3"> */}
        {tableData && tableData.length > 0 && (
          <div className="mt-2">
            <h6>List of Medication added</h6>
            <div className="page-container pb-1">
              <TableComponent
                component={'drug-schedule-listing'}
                tableHeadersData={tableConfig}
                tableData={tableData}
                classes={`mango-executive-patient align-items-center`}
                noCheck
                headerClasses="border-0"
              />
            </div>
          </div>
        )}
        {/* </Row> */}
      </Container>
    </>
  );
};

export default LenderDrugMapping;
