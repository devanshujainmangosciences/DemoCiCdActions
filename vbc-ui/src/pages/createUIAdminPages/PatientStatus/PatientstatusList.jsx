/**
 * Component Used to Display Patient Status List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readPatientStatuses, deletePatientStatus} from '@/actions';
import {
  tableHeadersPatientStatus,
  PatientStatusDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function PatientstatusList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.patientStatuses
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.patientStatuses?.pagination
  );

  /**
   * The function reads patient statuses with the given active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readPatientStatuses(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a patient's status based on their ID.
   */
  const deleteData = (id) => {
    dispatch(deletePatientStatus(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readPatientStatuses}>
        <GenericAdminListComponent
          transalation={PatientStatusDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={PatientStatusDataVariables?.isModal}
          modalData={PatientStatusDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={PatientStatusDataVariables?.filter}
          pageSizeFilter={PatientStatusDataVariables?.pageSizeFilter}
          title={PatientStatusDataVariables?.title}
          canComponent={PatientStatusDataVariables?.canComponent}
          canAction={PatientStatusDataVariables?.canAction}
          newDataTitle={PatientStatusDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={PatientStatusDataVariables?.tableClasses}
          tableHeaders={tableHeadersPatientStatus}
          tableComponent={PatientStatusDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default PatientstatusList;
