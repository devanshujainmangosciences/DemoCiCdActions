/**
 * Component Used to Display Employers List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readEmployerList, deleteEmployer} from '@/actions';
import {
  tableHeadersEmployers,
  EmployersDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function EmployersList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.employers
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.employers?.pagination
  );

  /**
   * The function reads employer data based on the active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readEmployerList(activePage, pageSize));
  };
  /**
   * The function deletes an employer with a specific ID using the dispatch method.
   */
  const deleteData = (id) => {
    dispatch(deleteEmployer(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readEmployerList}>
        <GenericAdminListComponent
          transalation={EmployersDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={EmployersDataVariables?.isModal}
          modalData={EmployersDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={EmployersDataVariables?.filter}
          pageSizeFilter={EmployersDataVariables?.pageSizeFilter}
          title={EmployersDataVariables?.title}
          canComponent={EmployersDataVariables?.canComponent}
          canAction={EmployersDataVariables?.canAction}
          newDataTitle={EmployersDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={EmployersDataVariables?.tableClasses}
          tableHeaders={tableHeadersEmployers}
          tableComponent={EmployersDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default EmployersList;
