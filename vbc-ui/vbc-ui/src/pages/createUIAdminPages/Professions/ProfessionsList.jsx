/**
 * Component Used to Display Professions List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readProfessionList, deleteProfession} from '@/actions';
import {
  tableHeadersProfessions,
  ProfessionsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function ProfessionsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.professions
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.professions?.pagination
  );

  /**
   * The function reads a list of professions with pagination.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readProfessionList(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a profession with a given ID.
   */
  const deleteData = (id) => {
    dispatch(deleteProfession(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readProfessionList}>
        <GenericAdminListComponent
          transalation={ProfessionsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={ProfessionsDataVariables?.isModal}
          modalData={ProfessionsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={ProfessionsDataVariables?.filter}
          pageSizeFilter={ProfessionsDataVariables?.pageSizeFilter}
          title={ProfessionsDataVariables?.title}
          canComponent={ProfessionsDataVariables?.canComponent}
          canAction={ProfessionsDataVariables?.canAction}
          newDataTitle={ProfessionsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={ProfessionsDataVariables?.tableClasses}
          tableHeaders={tableHeadersProfessions}
          tableComponent={ProfessionsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default ProfessionsList;
