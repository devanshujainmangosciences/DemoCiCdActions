/**
 * Component Used to Display Non Clinical Dropout Reasons in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {
  readNonClinicalDropoutReasons,
  deleteNonClinicalDropout,
} from '@/actions';
import {
  tableHeadersNonClinicalDropOutReasons,
  NonClinicalDropOutReasonsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function NonclinicaldropoutreasonsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.nonClinicalDropReasons
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.nonClinicalDropReasons?.pagination
  );

  /**
   * The function reads non-clinical dropout reasons with the given active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readNonClinicalDropoutReasons(activePage, pageSize));
  };
  /**
   * This function dispatches an action to delete non-clinical dropout data with a specified ID.
   */
  const deleteData = (id) => {
    dispatch(deleteNonClinicalDropout(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readNonClinicalDropoutReasons}>
        <GenericAdminListComponent
          transalation={NonClinicalDropOutReasonsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={NonClinicalDropOutReasonsDataVariables?.isModal}
          modalData={NonClinicalDropOutReasonsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={NonClinicalDropOutReasonsDataVariables?.filter}
          pageSizeFilter={
            NonClinicalDropOutReasonsDataVariables?.pageSizeFilter
          }
          title={NonClinicalDropOutReasonsDataVariables?.title}
          canComponent={NonClinicalDropOutReasonsDataVariables?.canComponent}
          canAction={NonClinicalDropOutReasonsDataVariables?.canAction}
          newDataTitle={NonClinicalDropOutReasonsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={NonClinicalDropOutReasonsDataVariables?.tableClasses}
          tableHeaders={tableHeadersNonClinicalDropOutReasons}
          tableComponent={
            NonClinicalDropOutReasonsDataVariables?.tableComponent
          }
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default NonclinicaldropoutreasonsList;
