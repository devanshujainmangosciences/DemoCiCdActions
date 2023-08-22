/**
 * This is a resuable component for Tables to show in mobile view
 * It take three props:-tableClasses, tableHeader, tableData
 *
 * tableClasses: Used make changes to the UI using seperate class
 * tableHeader: Are the headers that is being used in Tables
 * tableData: This contains all the values that needs to be displayed
 */
import {Accordion} from '@themesberg/react-bootstrap';
import React from 'react';

const MobileTable = ({tableClasses, tableHeader, tableData}) => {
  const renderItems = (list) => {
    if (list != null && list.length > 0) {
      return list.map((item) => {
        return (
          <Accordion.Item eventKey={item?.id} key={item?.id} className="mb-2">
            <Accordion.Header>{item?.header}</Accordion.Header>
            <Accordion.Body>{renderData(item)}</Accordion.Body>
          </Accordion.Item>
        );
      });
    }
  };
  const renderData = (item) => {
    if (tableHeader) {
      return tableHeader.map((header, index) => {
        if (header?.showColumn) {
          return (
            <div className="d-flex justify-content-between mb-2" key={index}>
              <div>
                {header?.keyName}
                {header?.keyName && ':'}
              </div>
              <div className="cut-text">{item[header?.keyValue]}</div>
            </div>
          );
        }
      });
    }
  };
  return (
    <div className={`d-md-none d-block ${tableClasses}`}>
      {' '}
      <Accordion defaultActiveKey="0">{renderItems(tableData)}</Accordion>
    </div>
  );
};

export default MobileTable;
