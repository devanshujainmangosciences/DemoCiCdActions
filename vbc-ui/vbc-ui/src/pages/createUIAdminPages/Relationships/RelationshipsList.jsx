/**
 * Component Used to Display Relationship List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readRelationshipList, deleteRelationship} from '@/actions';
import {
  tableHeadersRelationships,
  RelationshipsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function RelationshipsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.relationships
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.relationships?.pagination
  );

  /**
   * The function reads a relationship list with a specified active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readRelationshipList(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a relationship with a given ID.
   */
  const deleteData = (id) => {
    dispatch(deleteRelationship(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readRelationshipList}>
        <GenericAdminListComponent
          transalation={RelationshipsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={RelationshipsDataVariables?.isModal}
          modalData={RelationshipsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filters={RelationshipsDataVariables?.filter}
          pageSizeFilter={RelationshipsDataVariables?.pageSizeFilter}
          title={RelationshipsDataVariables?.title}
          canComponent={RelationshipsDataVariables?.canComponent}
          canAction={RelationshipsDataVariables?.canAction}
          newDataTitle={RelationshipsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={RelationshipsDataVariables?.tableClasses}
          tableHeaders={tableHeadersRelationships}
          tableComponent={RelationshipsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default RelationshipsList;
