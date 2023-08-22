/**
 * Component Used to Display the List of Banks
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readBanks, deleteBank} from '@/actions';
import {tableHeadersBanks, BankDataVariables} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function BanksList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.template?.masterData?.banks);
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.banks?.pagination
  );

  /**
   * The function reads banks data with a specified active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readBanks(activePage, pageSize));
  };
  /**
   * The function deletes a bank with a specific ID using the dispatch method.
   */
  const deleteData = (id) => {
    dispatch(deleteBank(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper dataList={dataList} readDataList={readBanks}>
        <GenericAdminListComponent
          transalation={BankDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={BankDataVariables?.isModal}
          modalData={BankDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={BankDataVariables?.filter}
          pageSizeFilter={BankDataVariables?.pageSizeFilter}
          title={BankDataVariables?.title}
          canComponent={BankDataVariables?.canComponent}
          canAction={BankDataVariables?.canAction}
          newDataTitle={BankDataVariables?.newDataTitle}
          // newDataPath={Routes.NewBank.path}
          tableClasses={BankDataVariables?.tableClasses}
          tableHeaders={tableHeadersBanks}
          tableComponent={BankDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default BanksList;
