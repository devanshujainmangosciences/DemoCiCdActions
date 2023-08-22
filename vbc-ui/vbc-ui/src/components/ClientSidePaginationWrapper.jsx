/**
 * This component is used for client side pagination wrapper for the Generic Admin list Component
 */
import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '@/redux/redux-hooks';
import {setClientPaginationData} from '@/services/utility';
import Search from './Search';

const ClientSidePaginationWrapper = ({children, dataList, readDataList}) => {
  const dispatch = useAppDispatch();
  const [paginatedData, setPaginatedData] = useState([]);
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

  useEffect(() => {
    setClientPaginationData(
      dataList,
      pagination.activePage,
      pagination.size,
      pagination,
      setpagination,
      setPaginatedData
    );
  }, [dataList]);
  /**
   * Callback function for reading the data
   * @param {Number} activePage
   */
  const readDataModified = (activePage, pageSize) => {
    if (dataList) {
      if (activePage === 0) activePage = activePage + 1;
      setClientPaginationData(
        dataList,
        activePage,
        pageSize,
        pagination,
        setpagination,
        setPaginatedData
      );
    } else dispatch(readDataList(activePage));
  };
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
      setPaginatedData
    );
  };

  /**
   * Returns modified Props
   */
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        pagination,
        dataList: paginatedData,
        readData: readDataModified,
        searchUI: (
          <Search
            searchKey="Search"
            placeholder="Search"
            value={searchKey}
            searchCallback={onSearchCallBack}
          />
        ),
      });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
};

export default ClientSidePaginationWrapper;
