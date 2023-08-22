/**
 * This is the React Spreadsheet Component which will be used for inserting and editing the data.
 *
 * It accepts following props
 * tabeHeadersData:- Key and Value for table data
 * onSaveChanges and onDiscardChanges are callback function when clicked on save button and discard button
 * errorMessages:- Error Messages to display the error in respective columns
 */
import React, {useEffect, useState} from 'react';
import Spreadsheet from 'react-spreadsheet';
const ReactSpreadSheetComponent = ({
  tableHeadersData,
  errorMessages,
  onSaveChanges,
}) => {
  const [labels, setlabels] = useState([]);
  const [data, setData] = useState([[]]);
  const [keys, setkeys] = useState(null);
  const [temporaryData, settemporaryData] = useState(null);
  /**
   * Check for tableheadersData and create labels and keys for the table
   */
  useEffect(() => {
    if (tableHeadersData && tableHeadersData.length > 0) {
      setlabels(tableHeadersData.map((item) => item.keyName));
      setkeys(tableHeadersData.map((item) => item.keyValue));
    }
  }, [tableHeadersData]);

  /**
   *
   * @param {Array} value
   * When the value changes in the spreadsheet, the value is being saved in the temporary state
   */
  const onDataChange = (value) => {
    if (value && value.length > 0) {
      settemporaryData(value);
    }
  };

  /**
   * This lifecycle add or remove the error from the message column according to the errorMessages
   */
  useEffect(() => {
    if (errorMessages && Object.entries(errorMessages).length > 0) {
      // console.log('ERROR MESSAGE=>', errorMessages);
      const reqValue = data.map((item, index) => {
        const error = errorMessages[index];
        const errorInputIndex = keys.length - 1;
        if (error) {
          const reqError = {
            value: error,
            className: 'background-red',
            readOnly: true,
          };
          const newItem = [...item];
          newItem.splice(errorInputIndex, 1, reqError);
          // console.log('ERROR MESSAGE REQUIRED=>', errorMessages, newItem);
          return newItem;
        } else {
          const reqError = {
            value: '',
            className: 'background-white',
            readOnly: true,
          };
          const newItem = [...item];
          newItem.splice(errorInputIndex, 1, reqError);
          // console.log('ERROR MESSAGE NOT REQUIRED=>', errorMessages, newItem);
          return newItem;
        }
      });
      setData(reqValue);
    }
  }, [errorMessages]);

  /**
   * When we click outside the table the temporary data is being copied to the actual data that is being fed to the table
   */
  const onBlurChanges = () => {
    if (temporaryData) setData(temporaryData);
  };

  /**
   * Callback function called when save button is clicked
   */
  const onSaveButtonClick = () => {
    const newData = [];
    const reqKeys = keys.filter((item) => item !== 'errorMessage');
    // console.log('DATA IN SPREAD SHEET=>',data)
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const reqDataArray = element && element.map((item) => item?.value);
     
      const reqObject = reqKeys.reduce((accumulator, element, index) => {
        return {...accumulator, [element]: reqDataArray[index]};
      }, {});
      // console.log('REQ OBJECT=>',reqObject)
      newData.push(reqObject);
    }
    const reqData = [];
    newData.map((item) => {
      const isEmpty = Object.values(item).every((x) => x === null || x === '' || x===undefined);
      if (!isEmpty) reqData.push(item);
    });
    // console.log('REQ DATA=>', reqData);
    if (reqData.length > 0) onSaveChanges(reqData);
  };
  return (
    <>
      <div className="custom-spreadsheet">
        <Spreadsheet
          data={data}
          onChange={onDataChange}
          onBlur={onBlurChanges}
          hideRowIndicators={true}
          columnLabels={labels}
        />
      </div>
      <div className={`mt-3`}>
        <button
          className="btn-patient-theme-small bg-admin px-4"
          onClick={onSaveButtonClick}>
          Save
        </button>
      </div>
    </>
  );
};

export default ReactSpreadSheetComponent;
