/**
 * Component Used to Display Doctor Change Reasons List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readDoctorChangeReasons, deleteDoctorChangeReason} from '@/actions';
import {
  tableHeadersDoctorChangeReasons,
  DoctorChangeReasonsDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function DoctorchangereasonsList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.doctorChangeReasons
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.doctorChangeReasons?.pagination
  );

  /**
   * The function calls a dispatch function to read doctor change reasons with specified active page and
   * page size parameters.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readDoctorChangeReasons(activePage, pageSize));
  };
  /**
   * The function deletes a doctor change reason using the provided ID.
   */
  const deleteData = (id) => {
    dispatch(deleteDoctorChangeReason(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readDoctorChangeReasons}>
        <GenericAdminListComponent
          transalation={DoctorChangeReasonsDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={DoctorChangeReasonsDataVariables?.isModal}
          modalData={DoctorChangeReasonsDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={DoctorChangeReasonsDataVariables?.filter}
          pageSizeFilter={DoctorChangeReasonsDataVariables?.pageSizeFilter}
          title={DoctorChangeReasonsDataVariables?.title}
          canComponent={DoctorChangeReasonsDataVariables?.canComponent}
          canAction={DoctorChangeReasonsDataVariables?.canAction}
          newDataTitle={DoctorChangeReasonsDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={DoctorChangeReasonsDataVariables?.tableClasses}
          tableHeaders={tableHeadersDoctorChangeReasons}
          tableComponent={DoctorChangeReasonsDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default DoctorchangereasonsList;
