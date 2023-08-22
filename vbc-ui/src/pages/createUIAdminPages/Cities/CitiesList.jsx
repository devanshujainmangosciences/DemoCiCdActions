/**
 * Component Used to Display City List in Admin login
 */
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {deleteCity, readStates, getCitiesFromStateId} from '@/actions';
import {tableHeadersCity, CityDataVariables} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {setClientPaginationData} from '@/services/utility';
import Search from '@/components/Search';

function CitiesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.cities
  );
  const stateData = useAppSelector(
    (state) => state.template?.masterData?.states
  );
  const [searchKey, setsearchKey] = useState('');
  const paginationInitialState = {
    first: false,
    last: false,
    numberOfElements: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    empty: false,
    activePage: 1,
  };
  const [pagination, setpagination] = useState(paginationInitialState);
  const {activePage} = pagination;
  const [citiesData, setcitiesData] = useState([]);
  const [selectedState, setselectedState] = useState('');
  const [addationalSelectData, setaddationalSelectData] = useState([]);

  /** This `useEffect` hook is responsible for setting up the additional select data for the component. It
checks if the `stateData` is available in the Redux store, and if not, it dispatches an action to
fetch the state data. Once the state data is available, it creates an array of objects with the
required structure for the additional select data and sets it using the `setaddationalSelectData`
function. It also sets the `selectedState` to the first state in the `stateData` array. This effect
runs whenever the `stateData` changes. */
  useEffect(() => {
    if (!stateData) dispatch(readStates());
    else {
      const reqData = [
        {
          id: 1,
          label: 'Select State',
          optionData: [...stateData],
        },
      ];
      setaddationalSelectData(reqData);
      setselectedState(stateData[0].id);
    }
  }, [stateData]);

  /** This `useEffect` hook is responsible for fetching the list of cities from the server whenever the
`selectedState` value changes. It checks if `selectedState` is truthy, and if it is, it dispatches
an action to fetch the list of cities for that state. The dependency array `[selectedState]` ensures
that this effect runs only when the `selectedState` value changes. */
  useEffect(() => {
    if (selectedState) {
      dispatch(getCitiesFromStateId(selectedState, 'cities'));
    }
  }, [selectedState]);

  /** This `useEffect` hook is responsible for updating the pagination data and the list of cities
displayed whenever the `dataList` changes. It calls the `setClientPaginationData` function with the
current `dataList`, `activePage`, `pagination.size`, `pagination`, `setpagination`, and
`setcitiesData` as arguments. This function calculates the pagination data based on the current
`dataList` and updates the `pagination` state using the `setpagination` function. It also updates
the `citiesData` state using the `setcitiesData` function with the list of cities to be displayed on
the current page. The dependency array `[dataList]` ensures that this effect runs only when the
`dataList` value changes. */
  useEffect(() => {
    setClientPaginationData(
      dataList,
      activePage,
      pagination.size,
      pagination,
      setpagination,
      setcitiesData
    );
  }, [dataList]);
  /**
   * When user types in the search box
   * @param {String} value
   */
  const onSearchCallBack = (value) => {
    setsearchKey(value);
    const filteredData =
      dataList &&
      dataList.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
    setClientPaginationData(
      filteredData,
      pagination.activePage,
      pagination.size,
      pagination,
      setpagination,
      setcitiesData
    );
  };

  // console.log('STATE DATA=>', addationalSelectData);
  // console.log('DATA LIST=>', dataList);
  // console.log('Cities=>', citiesData);
  // console.log('PAGINATION DATA=>', pagination);

  /**
   * This function reads data based on the active page and page size, and sets client pagination data.
   * @param {Number} activePage
   * @param {Number} pageSize
   */
  const readData = (activePage, pageSize) => {
    if (selectedState && dataList) {
      if (activePage === 0) activePage = activePage + 1;
      setClientPaginationData(
        dataList,
        activePage,
        pageSize,
        pagination,
        setpagination,
        setcitiesData
      );
    }
  };
  /**
   * The function `deleteData` dispatches an action to delete a city with a given ID.
   */
  const deleteData = (id) => {
    dispatch(deleteCity(id));
  };

  /**
   * Function to get the value of the state selected and fire the cities api call
   * @param {Interger} value
   * @param {Object} selectedData
   */
  const onSelectDataCallback = (value) => {
    setselectedState(value);
  };

  return (
    <>
      <GenericAdminListComponent
        transalation={CityDataVariables?.translation}
        dataList={citiesData}
        pagination={pagination}
        isModal={CityDataVariables?.isModal}
        modalData={CityDataVariables?.modalData}
        readData={readData}
        deleteData={deleteData}
        filter={CityDataVariables?.filter}
        pageSizeFilter={CityDataVariables?.pageSizeFilter}
        title={CityDataVariables?.title}
        canComponent={CityDataVariables?.canComponent}
        canAction={CityDataVariables?.canAction}
        newDataTitle={CityDataVariables?.newDataTitle}
        // newDataPath={Routes.NewCity.path}
        tableClasses={CityDataVariables?.tableClasses}
        tableHeaders={tableHeadersCity}
        tableComponent={CityDataVariables?.tableComponent}
        addationalSelectData={addationalSelectData}
        onSelectDataCallback={onSelectDataCallback}
        searchUI={
          <Search
            searchKey="Search"
            placeholder="Search"
            value={searchKey}
            searchCallback={onSearchCallBack}
          />
        }
      />
    </>
  );
}

export default CitiesList;
