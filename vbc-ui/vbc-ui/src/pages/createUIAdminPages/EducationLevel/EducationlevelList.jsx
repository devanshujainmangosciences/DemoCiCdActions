/**
 * Component Used to Display Education Level List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readEducationLevelList, deleteEducationLevel} from '@/actions';
import {
  tableHeadersEducationLevels,
  EducationLevelsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function EducationlevelList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.educationLevelList
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.educationLevelList?.pagination
  );

  /**
   * The function reads education level data with pagination.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readEducationLevelList(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete an education level with a specified ID.
   */
  const deleteData = (id) => {
    dispatch(deleteEducationLevel(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readEducationLevelList}>
        <GenericAdminListComponent
          transalation={EducationLevelsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={EducationLevelsDataVariables?.isModal}
          modalData={EducationLevelsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={EducationLevelsDataVariables?.filter}
          pageSizeFilter={EducationLevelsDataVariables?.pageSizeFilter}
          title={EducationLevelsDataVariables?.title}
          canComponent={EducationLevelsDataVariables?.canComponent}
          canAction={EducationLevelsDataVariables?.canAction}
          newDataTitle={EducationLevelsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={EducationLevelsDataVariables?.tableClasses}
          tableHeaders={tableHeadersEducationLevels}
          tableComponent={EducationLevelsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default EducationlevelList;
