/**
 * Component to render ADD/VIEW/EDIT for master components
 */
import React, {useState, useEffect} from 'react';
import {Col, Row, Container, Button} from '@themesberg/react-bootstrap';
import {useTranslation} from 'react-i18next';
import {adminComponents} from '../constants';
import InputForm from '@/pages/profile/children/InputForm';

const GenericAdminAddViewEditComponent = ({
  transalation,
  componentType,
  variables,
  actualData,
  formClass,
  onFormSubmit,
}) => {
  const {t} = useTranslation(transalation);
  const [dataSets, setdataSets] = useState(null);
  const [dataState, setdataState] = useState(null);

  // console.log('dataState=>', dataState);
  useEffect(() => {
    if (variables) {
      const items = variables?.items;
      if (items && items.length > 0) {
        if (actualData) {
          // console.log('TEST=>', actualData)
          setdataState(actualData);
        } else setdataState(setDefaultState(variables.items));
        let displayData = [];
        /*
        Make data in format of to display the data in  multiple rows and columns Format
        [      
          { 
            items: []
            rowGroup: 1
            rowGroupTitle: 
          },
        ]
        */
        items.map((item, index, items) => {
          if (item?.rowGroup === index + 1) {
            const data = {
              rowGroup: item?.rowGroup,
              rowGroupTitle: item?.rowTitle,
              items: [
                ...items.map((item) => {
                  return {...item};
                }),
              ],
            };
            displayData.push(data);
          }
        });
        setdataSets(displayData);
      }
    }
  }, [variables, actualData]);

  const setDefaultState = () => {
    let state = {};
    // console.log('ITEMS=>', items);
    // const itemsList = items.map((item) => {
    //   state[item.variable] = '';
    //   return item;
    // });
    return state;
  };

  const renderDataRows = (dataSets) => {
    if (dataSets) {
      return dataSets.map((rowData) => (
        <>
          {rowData?.rowGroupTitle && <h5>{rowData?.rowGroupTitle}</h5>}
          <Row className="p-4 pb-0 pt-0" key={rowData?.rowGroup}>
            {renderDataColumns(rowData?.items)}
          </Row>
        </>
      ));
    } else {
      return <>Loading..</>;
    }
  };

  const renderDataColumns = (columnDataSets) => {
    if (columnDataSets && columnDataSets.length > 0) {
      return columnDataSets.map((colData) => (
        <Col
          className="col-sm-12 col-md-6 col-lg-4 mb-2"
          key={colData?.variable}>
          <InputForm
            isView={false}
            label={t(colData?.label)}
            ipValue={dataState[colData?.value]}
            name={colData?.variable}
            onChange={onDataChange}
            readOnly={componentType === adminComponents.VIEW_COMPONENT}
            required={colData?.required}
            warningText={t(colData?.warningText)}
            type={colData?.type}
          />
        </Col>
      ));
    }
  };

  const onDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdataState({...dataState, [name]: value});
  };

  const onDataSubmit = (e) => {
    e.preventDefault();
    // console.log('DATA SUBMITTED=>', dataState);
    if (dataState) {
      onFormSubmit(dataState);
    }
  };

  // console.log('ACTUAL DATA=>', actualData);

  return (
    <>
      <Container className="bg-white px-4 py-5 rounded mt-4">
        <h3>
          {componentType === adminComponents.UPDATE_COMPONENT
            ? t(variables?.updateTitle)
            : componentType === adminComponents.NEW_COMPONENT
            ? t(variables?.createTitle)
            : t(variables?.viewTitle)}
        </h3>
        <form className={formClass} onSubmit={onDataSubmit}>
          {renderDataRows(dataSets)}
          {(componentType === adminComponents.NEW_COMPONENT ||
            componentType === adminComponents.UPDATE_COMPONENT) && (
            <Button variant="primary" type="submit">
              {componentType === adminComponents.NEW_COMPONENT
                ? t(variables?.createButton)
                : t(variables?.updateButton)}
            </Button>
          )}
        </form>
      </Container>
    </>
  );
};

export default GenericAdminAddViewEditComponent;
