/**
 * Component Used to Display Nature Of Business in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readNatureOfBusiness, deleteNatureOfBusiness} from '@/actions';
import {
  tableHeadersNatureOfBusinesses,
  NatureOfBusinessDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function NatureofbusinessList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.natureOfBusinesses
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.natureOfBusinesses?.pagination
  );

  /**
   * The function calls a dispatch function to read data for a nature of business based on the active
   * page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readNatureOfBusiness(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a nature of business record with a given
   * ID.
   */
  const deleteData = (id) => {
    dispatch(deleteNatureOfBusiness(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readNatureOfBusiness}>
        <GenericAdminListComponent
          transalation={NatureOfBusinessDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={NatureOfBusinessDataVariables?.isModal}
          modalData={NatureOfBusinessDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={NatureOfBusinessDataVariables?.filter}
          pageSizeFilter={NatureOfBusinessDataVariables?.pageSizeFilter}
          title={NatureOfBusinessDataVariables?.title}
          canComponent={NatureOfBusinessDataVariables?.canComponent}
          canAction={NatureOfBusinessDataVariables?.canAction}
          newDataTitle={NatureOfBusinessDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={NatureOfBusinessDataVariables?.tableClasses}
          tableHeaders={tableHeadersNatureOfBusinesses}
          tableComponent={NatureOfBusinessDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default NatureofbusinessList;
