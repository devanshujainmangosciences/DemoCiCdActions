/**
 * Component Used to Clinical Dropout Reasons List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readClinicalDropoutReasons, deleteClinicalDropout} from '@/actions';
import {
  tableHeadersClinicalDropOutReasons,
  ClinicalDropOutReasonsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function ClinicaldropoutreasonsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.clinicalDropReasons
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.clinicalDropReasons?.pagination
  );

  /**
   * The function reads clinical dropout reasons with the given active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readClinicalDropoutReasons(activePage, pageSize));
  };
  /**
   * The function `deleteData` dispatches an action to delete a clinical dropout with a specified ID.
   */
  const deleteData = (id) => {
    dispatch(deleteClinicalDropout(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readClinicalDropoutReasons}>
        <GenericAdminListComponent
          transalation={ClinicalDropOutReasonsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={ClinicalDropOutReasonsDataVariables?.isModal}
          modalData={ClinicalDropOutReasonsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={ClinicalDropOutReasonsDataVariables?.filter}
          pageSizeFilter={ClinicalDropOutReasonsDataVariables?.pageSizeFilter}
          title={ClinicalDropOutReasonsDataVariables?.title}
          canComponent={ClinicalDropOutReasonsDataVariables?.canComponent}
          canAction={ClinicalDropOutReasonsDataVariables?.canAction}
          newDataTitle={ClinicalDropOutReasonsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={ClinicalDropOutReasonsDataVariables?.tableClasses}
          tableHeaders={tableHeadersClinicalDropOutReasons}
          tableComponent={ClinicalDropOutReasonsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default ClinicaldropoutreasonsList;
