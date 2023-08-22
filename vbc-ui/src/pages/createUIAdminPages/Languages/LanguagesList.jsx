/**
 * Component Used to Display Languages List in Admin login
 */
import React from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {readLanguageList, deleteLanguage} from '@/actions';
import {
  tableHeadersLanguages,
  LanguageDataVariables,
} from '../../../masterDataConfig';
import GenericAdminListComponent from '../../../components/GenericAdminListComponent';
import {ClientSidePaginationWrapper} from '@/components';

function LanguagesList() {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.template?.masterData?.languages
  );
  const pagination = useAppSelector(
    (state) => state.template?.masterData?.languages?.pagination
  );

  /**
   * The function reads a language list with a specified active page and page size.
   */
  const readData = (activePage, pageSize) => {
    dispatch(readLanguageList(activePage, pageSize));
  };
  /**
   * The function deletes a language using its ID.
   */
  const deleteData = (id) => {
    dispatch(deleteLanguage(id));
  };

  return (
    <>
      <ClientSidePaginationWrapper
        dataList={dataList}
        readDataList={readLanguageList}>
        <GenericAdminListComponent
          transalation={LanguageDataVariables?.translation}
          dataList={dataList}
          pagination={pagination}
          isModal={LanguageDataVariables?.isModal}
          modalData={LanguageDataVariables?.modalData}
          readData={readData}
          deleteData={deleteData}
          filter={LanguageDataVariables?.filter}
          pageSizeFilter={LanguageDataVariables?.pageSizeFilter}
          title={LanguageDataVariables?.title}
          canComponent={LanguageDataVariables?.canComponent}
          canAction={LanguageDataVariables?.canAction}
          newDataTitle={LanguageDataVariables?.newDataTitle}
          // newDataPath={Routes.NewCity.path}
          tableClasses={LanguageDataVariables?.tableClasses}
          tableHeaders={tableHeadersLanguages}
          tableComponent={LanguageDataVariables?.tableComponent}
        />
      </ClientSidePaginationWrapper>
    </>
  );
}

export default LanguagesList;
