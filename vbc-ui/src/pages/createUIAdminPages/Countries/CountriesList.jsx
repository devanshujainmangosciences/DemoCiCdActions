/**
 * Component Used to Display Countries List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readCountries, deleteCountry} from '@/actions';
import {
  tableHeadersCountries,
  CountryDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function CountriesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.countries
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.countries?.pagination
  );

  /**
   * This function dispatches an action to read countries with the given active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readCountries(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a country with a given ID.
   */
  const deleteData = (id) => {
    dispatch(deleteCountry(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readCountries}>
        <GenericAdminListComponent
          transalation={CountryDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={CountryDataVariables?.isModal}
          modalData={CountryDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={CountryDataVariables?.filter}
          pageSizeFilter={CountryDataVariables?.pageSizeFilter}
          title={CountryDataVariables?.title}
          canComponent={CountryDataVariables?.canComponent}
          canAction={CountryDataVariables?.canAction}
          newDataTitle={CountryDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCountry.path}
          tableClasses={CountryDataVariables?.tableClasses}
          tableHeaders={tableHeadersCountries}
          tableComponent={CountryDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default CountriesList;
