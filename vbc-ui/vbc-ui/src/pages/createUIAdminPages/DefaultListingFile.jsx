/**
 * Component is used in the nodejs Script to create the Listing component
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readListAction, deleteDataAction} from '@/actions';
import {tableHeadersPath, dataVariables} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';

function ComponentName() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => reduxDataListState);
  const pagination = useAppSelector((state) => reduxPaginationData);

  const readData = (activePage, pageSize) => {
    dispatch(readListAction(activePage, pageSize));
  };
  const deleteData = (id) => {
    dispatch(deleteDataAction(id));
  };

  return (
    <>
      <GenericAdminListComponent
        transalation={dataVariables?.translation}
        dataList={dataList}
        pagination={pagination}
        isModal={dataVariables?.isModal}
        modalData={dataVariables?.modalData}
        readData={readData}
        deleteData={deleteData}
        filter={dataVariables?.filter}
        pageSizeFilter={dataVariables?.pageSizeFilter}
        title={dataVariables?.title}
        canComponent={dataVariables?.canComponent}
        canAction={dataVariables?.canAction}
        newDataTitle={dataVariables?.newDataTitle}
        // newDataPath={Routes.newPath.path}
        tableClasses={dataVariables?.tableClasses}
        tableHeaders={tableHeadersPath}
        tableComponent={dataVariables?.tableComponent}
      />
    </>
  );
}

export default ComponentName;
