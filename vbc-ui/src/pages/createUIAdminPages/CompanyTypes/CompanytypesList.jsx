/**
 * Component Used to Display Company Types List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readCompanyTypes, deleteCompanyType} from '@/actions';
import {
  tableHeadersCompanyTypes,
  CompanyTypesDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function CompanytypesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.companyTypes
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.companyTypes?.pagination
  );

  /**
   * The function reads company types with pagination using the active page and page size parameters.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readCompanyTypes(activePage, pageSize));
  };
  /**
   * The function deletes a company type using its ID.
   */
  const deleteData = (id) => {
    dispatch(deleteCompanyType(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readCompanyTypes}>
        <GenericAdminListComponent
          transalation={CompanyTypesDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={CompanyTypesDataVariables?.isModal}
          modalData={CompanyTypesDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={CompanyTypesDataVariables?.filter}
          pageSizeFilter={CompanyTypesDataVariables?.pageSizeFilter}
          title={CompanyTypesDataVariables?.title}
          canComponent={CompanyTypesDataVariables?.canComponent}
          canAction={CompanyTypesDataVariables?.canAction}
          newDataTitle={CompanyTypesDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={CompanyTypesDataVariables?.tableClasses}
          tableHeaders={tableHeadersCompanyTypes}
          tableComponent={CompanyTypesDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default CompanytypesList;
