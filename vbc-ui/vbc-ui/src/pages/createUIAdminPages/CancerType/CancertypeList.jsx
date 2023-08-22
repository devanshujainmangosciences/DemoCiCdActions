/**
 * Component Used to Display Cancer Type List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readCancerTypeList, deleteCancerType} from '@/actions';
import {
  tableHeadersCancerTypes,
  CancerTypesDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function CancertypeList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.cancerTypes
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.cancerTypes?.pagination
  );

  /**
   * The function calls a dispatch function to read a list of cancer types with a specified active page
   * and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readCancerTypeList(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a cancer type with a given ID.
   */
  const deleteData = (id) => {
    dispatch(deleteCancerType(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readCancerTypeList}>
        <GenericAdminListComponent
          transalation={CancerTypesDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={CancerTypesDataVariables?.isModal}
          modalData={CancerTypesDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={CancerTypesDataVariables?.filter}
          pageSizeFilter={CancerTypesDataVariables?.pageSizeFilter}
          title={CancerTypesDataVariables?.title}
          canComponent={CancerTypesDataVariables?.canComponent}
          canAction={CancerTypesDataVariables?.canAction}
          newDataTitle={CancerTypesDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={CancerTypesDataVariables?.tableClasses}
          tableHeaders={tableHeadersCancerTypes}
          tableComponent={CancerTypesDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default CancertypeList;
