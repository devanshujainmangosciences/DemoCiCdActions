/**
 * Component Used to Display Residence Type List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readResidenceTypeList, deleteResidenceType} from '@/actions';
import {
  tableHeadersResidenceTypes,
  ResidenceTypesDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function ResidencetypesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.residenceTypes
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.residenceTypes?.pagination
  );

  /**
   * The function calls a dispatch function to read a list of residence types with a specified active
   * page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readResidenceTypeList(activePage, pageSize));
  };
  /**
   * The function deletes a residence type using the dispatch method.
   */
  const deleteData = (id) => {
    dispatch(deleteResidenceType(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readResidenceTypeList}>
        <GenericAdminListComponent
          transalation={ResidenceTypesDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={ResidenceTypesDataVariables?.isModal}
          modalData={ResidenceTypesDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={ResidenceTypesDataVariables?.filter}
          pageSizeFilter={ResidenceTypesDataVariables?.pageSizeFilter}
          title={ResidenceTypesDataVariables?.title}
          canComponent={ResidenceTypesDataVariables?.canComponent}
          canAction={ResidenceTypesDataVariables?.canAction}
          newDataTitle={ResidenceTypesDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={ResidenceTypesDataVariables?.tableClasses}
          tableHeaders={tableHeadersResidenceTypes}
          tableComponent={ResidenceTypesDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default ResidencetypesList;
