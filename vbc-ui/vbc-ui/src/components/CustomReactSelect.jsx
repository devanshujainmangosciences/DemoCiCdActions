import {FormCheck} from '@themesberg/react-bootstrap';
import React, {useEffect, useState} from 'react';
import Select from 'react-select';
/**
 *This is used as a select component can be used as a multi select as well as single select
 *
 * @param {String} classes Class to override the basic style
 * @param {String} name  Name for the select component
 * @param {Boolean} isMulti To make it multi select
 * @param {Boolean} isSearchable  To Make it searchable
 * @param {Boolean} isClearable  To make it clearable
 * @param {Boolean} isRtl To change the view
 * @param {Boolean} closeMenuOnSelect  if true it will close the menu
 * @param {Function} onInputChange Function called when data is changed
 * @param {Array} optionData Array of all data in form of value and label
 * @param {Array} defaultData  Array of default selected data
 */
const CustomReactSelect = ({
  classes = '',
  name = 'select',
  isMulti = true,
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  isRtl = false,
  closeMenuOnSelect = false,
  onInputChange,
  optionData,
  defaultData,
  color = 'white',
  backgroundColor = 'rgb(230, 230, 230)',
}) => {
  // const [defaultSelectedOptionsList, setdefaultSelectedOptionsList] =
  //   useState(null);
  // const [optionDataList, setoptionDataList] = useState(null);

  const CustomOption = (props) => {
    const {innerProps, label} = props;

    return (
      <div {...innerProps} className="m-1 option-data">
        <div className="d-flex gap-1">
          <div>
            <FormCheck checked={false} readOnly={true} />
          </div>
          <div>{label}</div>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   if (optionData && defaultData) {
  //     setdefaultSelectedOptionsList(defaultData);
  //     setoptionDataList(optionData);
  //   }
  // }, [optionData, defaultData]);

  return (
    <Select
      value={defaultData}
      data-testid="select"
      onChange={(data, singleData) => onInputChange(data, singleData)}
      isMulti={isMulti}
      name={name}
      closeMenuOnSelect={closeMenuOnSelect}
      options={optionData}
      className={`basic-multi-select ${classes}`}
      classNamePrefix="select"
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isRtl={isRtl}
      components={{Option: CustomOption}}
      styles={{
        menu: (styles) => ({
          ...styles,
          zIndex: 210,
        }),
        multiValueLabel: (base) => ({
          ...base,
          borderRadius: '0px',
          borderEndStartRadius: '2px',
          borderTopLeftRadius: '2px',
          backgroundColor: backgroundColor,
          color: color,
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          color: color,
          borderRadius: '0px',
          borderEndEndRadius: '2px',
          borderTopRightRadius: '2px',
          backgroundColor: backgroundColor,
          ':hover': {
            backgroundColor: backgroundColor,
            color: color,
          },
        }),
      }}
    />
  );
};

export default CustomReactSelect;
