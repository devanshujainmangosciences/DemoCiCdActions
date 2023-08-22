/**
 * Component Used to Display Occupations List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readOccupationList, deleteOccupation} from '@/actions';
import {
  tableHeadersCity,
  OccupationsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function OccupationsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.occupations
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.occupations?.pagination
  );

  /**
   * This function dispatches an action to read a list of occupations with a specified page and page
   * size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readOccupationList(activePage, pageSize));
  };
  /**
   * The function deletes an occupation using the dispatch method.
   */
  const deleteData = (id) => {
    dispatch(deleteOccupation(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readOccupationList}>
        <GenericAdminListComponent
          transalation={OccupationsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={OccupationsDataVariables?.isModal}
          modalData={OccupationsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={OccupationsDataVariables?.filter}
          pageSizeFilter={OccupationsDataVariables?.pageSizeFilter}
          title={OccupationsDataVariables?.title}
          canComponent={OccupationsDataVariables?.canComponent}
          canAction={OccupationsDataVariables?.canAction}
          newDataTitle={OccupationsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={OccupationsDataVariables?.tableClasses}
          tableHeaders={tableHeadersCity}
          tableComponent={OccupationsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default OccupationsList;
