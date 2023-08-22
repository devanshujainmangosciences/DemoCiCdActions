/**
 * Component Used to Display Industry Types List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readIndustryTypes, deleteIndustry} from '@/actions';
import {
  tableHeadersIndustryTypes,
  IndustryTypesDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function IndustrytypesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.industryTypes
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.industryTypes?.pagination
  );

  /**
   * The function calls a dispatch function to read industry types with the given active page and page
   * size parameters.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readIndustryTypes(activePage, pageSize));
  };
  /**
   * The function deletes an industry with a specific ID using the dispatch method.
   */
  const deleteData = (id) => {
    dispatch(deleteIndustry(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readIndustryTypes}>
        <GenericAdminListComponent
          transalation={IndustryTypesDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={IndustryTypesDataVariables?.isModal}
          modalData={IndustryTypesDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={IndustryTypesDataVariables?.filter}
          pageSizeFilter={IndustryTypesDataVariables?.pageSizeFilter}
          title={IndustryTypesDataVariables?.title}
          canComponent={IndustryTypesDataVariables?.canComponent}
          canAction={IndustryTypesDataVariables?.canAction}
          newDataTitle={IndustryTypesDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={IndustryTypesDataVariables?.tableClasses}
          tableHeaders={tableHeadersIndustryTypes}
          tableComponent={IndustryTypesDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default IndustrytypesList;
