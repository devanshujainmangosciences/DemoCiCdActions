/**
 * Component Used to Display Insurance Companies List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readInsuranceCompanies, deleteInsuranceCompany} from '@/actions';
import {
  tableHeadersInsuranceCompanies,
  InsuranceCompaniesDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function InsurancecompaniesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.insuranceCompanies
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.insuranceCompanies?.pagination
  );

  /**
   * This function dispatches an action to read insurance companies with the given active page and page
   * size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readInsuranceCompanies(activePage, pageSize));
  };
  /**
   * This function dispatches an action to delete an insurance company with a specified ID.
   */
  const deleteData = (id) => {
    dispatch(deleteInsuranceCompany(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readInsuranceCompanies}>
        <GenericAdminListComponent
          transalation={InsuranceCompaniesDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={InsuranceCompaniesDataVariables?.isModal}
          modalData={InsuranceCompaniesDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={InsuranceCompaniesDataVariables?.filter}
          pageSizeFilter={InsuranceCompaniesDataVariables?.pageSizeFilter}
          title={InsuranceCompaniesDataVariables?.title}
          canComponent={InsuranceCompaniesDataVariables?.canComponent}
          canAction={InsuranceCompaniesDataVariables?.canAction}
          newDataTitle={InsuranceCompaniesDataVariables?.newDataTitle}
          // newDataPath={Routes.NewInsuranceCompany.path}
          tableClasses={InsuranceCompaniesDataVariables?.tableClasses}
          tableHeaders={tableHeadersInsuranceCompanies}
          tableComponent={InsuranceCompaniesDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default InsurancecompaniesList;
