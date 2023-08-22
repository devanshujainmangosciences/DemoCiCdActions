/**
 * This is HOC component is used to filter data based on different filters
 * filters:- Array of filters that comes from config files
 * classes:- to change the styling of filter
 * data:-Object that confains data to be displayed in each filter select boxes
 * callback:- callback to the parent component, when filter is applied
 * activePage:- Current page
 * pageSize
 * children:- UI component that needs to be rendered in HOC
 * type:- Which component/role is calling the filter =, eg:- mango-executive,doctor
 * filtersApplied:- Function to set when filters are applied
 */
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {doctorsList, setToast} from '../actions';
import {useTranslation} from 'react-i18next';
import cloneDeep from 'lodash/cloneDeep';
import {NAME} from '../constants';
import {convertToCorrectDataType} from '@/services/utility';

const Filter = ({
  filters,
  classes,
  callback,
  activePage,
  pageSize,
  children,
  data,
  type,
  filtersApplied,
  filterAppliedState,
  filterBody,
}) => {
  const {t} = useTranslation(['mangoExecutive']);
  const dispatch = useAppDispatch();
  const [key, setkey] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [filterId, setFilterId] = useState();
  const [list, setList] = useState([]);
  const [filterObject, setFilterObject] = useState('');
  const [filterBodyRequest, setFilterBodyRequest] = useState([]);
  const [fieldType, setFieldType] = useState('');
  const doctors = useAppSelector((state) => state.template.doctorList);

  // console.log('LIST=>', list);
  // console.log('KEY=>', key);
  // console.log('filterObject=>', filterObject);
  // console.log('options=>', options);
  // console.log("DATA", data);
  // console.log('FILTERS=>', filters);
  // console.log('TYPE=>', type);
  // console.log('value=>', value);

  /**
   * Using this to remove all the filters when filterApplied State is empty
   */
  useEffect(() => {
    if (filterAppliedState && filterAppliedState.length === 0) {
      setList([]);
    }
  }, [filterAppliedState]);
  /**
   * Set the key to key state
   * @param {Any} e
   */
  const handleChangeKey = (e) => {
    const value = e.target.value;
    setkey(value);
    setValue('');
    if (value === 'doctorId') {
      if (filterObject['hospitalId']) {
        dispatch(doctorsList(filterObject['hospitalId']));
        setOptions(data?.doctorsList);
      } else {
        dispatch(setToast(t('errorOnDoc'), true, 'warning'));
        setOptions([]);
      }
    } else {
      if (value === 'hospitalId') setOptions(data?.hospitalList);
      // else if (value === "doctorId") setOptions(data?.doctorsList);
      else if (value === 'drugId') setOptions(data?.drugList);
      else if (value === 'hospitalGroup') setOptions(data?.hospitalGroupsList);
      else if (value === 'status') {
        if (type === 'doctor') {
          /**
           * Removing  some filters for doctor
           */
          const removeFilters = ['Identified', 'Aware', 'Engaged'];
          const statuses = cloneDeep(data?.statuses);
          const newStatus = statuses.filter(
            (status) => !removeFilters.includes(status.value)
          );
          // console.log('NEW STATUS=>', newStatus);
          setOptions(newStatus);
        } else setOptions(data?.statuses);
      } else if (value === 'manufacturerId') setOptions(data?.manufactureList);
      else setOptions([]);
    }
  };

  /**
   * This callback filter the filter object to find the object with key found
   * and set the field type and options if it is there
   */
  useEffect(() => {
    if (key) {
      const data = filters.filter((item) => item.value === key);
      setFilterId(data[0].id);
      if (data[0].fieldType === 'text' || data[0].fieldType === 'number') {
        setFieldType(data[0].fieldType);
      } else if (data[0].fieldType === 'select') {
        setFieldType(data[0].fieldType);
        // setOptions(data[0].options);
      }
    }
  }, [filters, key]);

  useEffect(() => {
    if (doctors) {
      setOptions(
        doctors.map((doctor) => ({
          id: doctor.id,
          label: doctor?.name,
          value: doctor.id,
        }))
      );
    }
  }, [doctors]);

  /**
   * This function set the value to value state
   * @param {Any} e
   */
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  /**
   * Dispatchs the callback if filterObject has value in it
   */
  useEffect(() => {
    if (filterObject) {
      if (filterBody) {
        const filterBodyRequest = Object.keys(filterObject).map((key) => {
          const value = filterObject[key];
          if (key === 'name') {
            const dataRequired = NAME.map((item) => {
              return {
                arguments: [value],
                key: item,
                orOperation: true,
                searchOperation: 'ILIKE',
              };
            });
            return dataRequired;
          } else {
            const requiredFilter = filters.find(
              (filter) => filter.value === key
            );
            return {
              arguments: [
                convertToCorrectDataType(value, requiredFilter?.dataType),
              ],
              key: requiredFilter?.searchKey,
              orOperation: requiredFilter?.orOperation,
              searchOperation: requiredFilter?.searchOperation,
              value: requiredFilter?.value,
            };
          }
        });
        setFilterBodyRequest(filterBodyRequest.flat());
        filtersApplied(filterBodyRequest.flat());
        dispatch(callback(0, pageSize, filterBodyRequest.flat(), true));
      } else {
        dispatch(callback(0, pageSize, filterObject));
        filtersApplied(filterObject);
      }
    }
  }, [callback, dispatch, filterObject]);

  /**
   * This function will Add or edit filter based on the id
   * the function checks for the id, if it is already present
   * it will edit the filter else it will add a new filter
   * @param {Integer} id
   * @param {String} value
   *
   */
  const handleClick = (id, value) => {
    let reqLabel;
    const selectedOption = options.find(
      (item) => item.value === parseInt(value)
    );
    const displayValue = filters.find((item) => item.id === id).displayValue;
    const useValueToRemove = filters.find(
      (item) => item.id === id
    ).useValueToRemove;

    if (selectedOption) {
      reqLabel = selectedOption.label;
    }
    const listKey = `${id}${value}`;
    if (!key || !value) return;
    if (list.some((e) => e.id === listKey)) return;
    if (list.some((e) => e.key === key)) {
      let array = [...list];
      let objIndex = list.findIndex((obj) => obj.key === key);
      array[objIndex] = {
        id: listKey,
        key: key,
        value: reqLabel ? reqLabel : value,
        useValueToRemove: useValueToRemove,
        displayValue: displayValue,
      };
      setList(array);
    } else {
      setList([
        ...list,
        {
          id: listKey,
          key: key,
          value: reqLabel ? reqLabel : value,
          useValueToRemove: useValueToRemove,
          displayValue,
        },
      ]);
    }
    setFilterObject({
      ...filterObject,
      [key]: value,
    });
    setkey('');
    setValue('');
    setFieldType('');
  };

  /**
   * Removes the filter based on id and key passed
   * @param {Integer} id
   * @param {Integer} key
   */
  const handleRemove = (tag) => {
    const {id, key} = tag;

    setList(list.filter((item) => item.id !== id));
    delete filterObject[key];

    if (filterBody) {
      const requiredFilterBody = filterBodyRequest.filter((item) => {
        if (key === 'name') return !NAME.includes(item.key);
        if (tag?.useValueToRemove) return item.value !== key;
        return item.key !== key;
      });
      dispatch(callback(activePage, pageSize, requiredFilterBody, true));
      setFilterBodyRequest(requiredFilterBody);
      filtersApplied(requiredFilterBody);
    } else {
      dispatch(callback(activePage, pageSize, filterObject));
      filtersApplied(filterObject);
    }
  };

  /**
   * Reset all the states to its initial value
   */
  const handleClear = () => {
    setFilterObject({});
    setList([]);
    setkey('');
    setValue('');
  };

  /**
   * renders the input based on the type passed
   * @param {*} type
   * @returns {ReactNode}
   */
  const renderDropDown = (type) => {
    switch (type) {
      case 'text':
      case 'number':
        return (
          <input
            placeholder="Enter Value"
            className="w-100 h-100 "
            value={value}
            onChange={handleChangeValue}
            type={type}
          />
        );
      case 'select':
        return (
          <select
            onChange={handleChangeValue}
            value={value}
            className="w-100 h-100 ">
            <option value="" hidden>
              Select One
            </option>

            {options.map(({id, label, value}) => (
              <option id={id} value={value} key={id}>
                {label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            className="w-100 h-100 border-0"
            value={value}
            onChange={handleChangeValue}
            type={'text'}
          />
        );
    }

    // console.log("TYPE===>", type, extraFilters);
  };
  return (
    <>
      <div className={classes} data-testid="filter">
        <div className="d-flex flex-wrap-wrap gap-2 mb-2">
          {children}
          {filters && filters.length > 0 && (
            <div className="filter-select">
              <select
                onChange={handleChangeKey}
                value={key}
                className="w-100 h-100">
                <option value="" hidden>
                  Select One
                </option>
                {filters &&
                  filters.map((filter) => (
                    <option id={filter.id} value={filter.value} key={filter.id}>
                      {filter.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {fieldType && (
            <div className="selected-filter-dropdown p-0  bg-white min-width overflow-hidden filter-select">
              {renderDropDown(fieldType)}
            </div>
          )}

          {filters && filters.length > 0 && (
            <div className="submit-filter">
              <button
                onClick={() => handleClick(filterId, value, options)}
                className="btn-patient-theme bg-admin my-auto px-4 border-0 fw-medium">
                Submit
              </button>
            </div>
          )}

          {list.length > 0 && (
            <div className="reset-filter">
              <button
                onClick={handleClear}
                className="btn-patient-theme bg-admin-dark  my-auto px-4 border-0">
                Remove All Filters
              </button>
            </div>
          )}

          {/* <div className="break"></div>
        <div className="selected-tags d-flex flex-row">
          {list.map((tag) => (
            <Row
              key={tag.id}
              className="tag d-flex flex-row justify-content-between align-items-center me-4">
              <div className="w-auto">
                {tag.key}: {tag.value}
              </div>
              <div className="w-auto cursor-pointer">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemove(tag.id, tag.key)}
                />
              </div>
            </Row>
          ))}
        </div> */}
        </div>
      </div>
      {list.length > 0 && (
        <div className="ms-1-7 selected-filter-tags">
          {list.map((tag) => {
            return (
              <div key={tag.id} className="tag">
                <div className="tag-item">
                  {tag?.displayValue ? tag.displayValue : tag.key}: {tag.value}
                </div>
                <div className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => handleRemove(tag)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Filter;
