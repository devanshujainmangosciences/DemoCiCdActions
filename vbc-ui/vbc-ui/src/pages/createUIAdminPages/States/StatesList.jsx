/**
 * Component Used to Display State List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readStates, deleteState} from '@/actions';
import {
  tableHeadersStates,
  StateDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function StatesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.states
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.states?.pagination
  );

  const readData = (activePage, pageSize) => {
    dispatch(readStates(activePage, pageSize));
  };
  const deleteData = (id) => {
    dispatch(deleteState(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readStates}>
        <GenericAdminListComponent
          transalation={StateDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={StateDataVariables?.isModal}
          modalData={StateDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={StateDataVariables?.filter}
          pageSizeFilter={StateDataVariables?.pageSizeFilter}
          title={StateDataVariables?.title}
          canComponent={StateDataVariables?.canComponent}
          canAction={StateDataVariables?.canAction}
          newDataTitle={StateDataVariables?.newDataTitle}
          // newDataPath={Routes.NewState.path}
          tableClasses={StateDataVariables?.tableClasses}
          tableHeaders={tableHeadersStates}
          tableComponent={StateDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default StatesList;
