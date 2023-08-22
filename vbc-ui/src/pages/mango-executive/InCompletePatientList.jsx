/**
 * Component renders patients which have registered in the VBC portal but not completed the profile
 */
import {getPendingPatientList} from '@/actions/mangoExecutiveActions';
import {CustomPagination, Filter, TableComponent} from '@/components';
import {tableHeadersMangoIncompletePatients} from '../../config';
import {mangoExecutiveInCompletefilters} from '../../config';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {convertTimeToLocal} from '@/services/utility';
import {DateFormat} from '@/constants';

const InCompletePatientList = () => {
  const {t} = useTranslation(['mangoExecutive']);
  const dispatch = useAppDispatch();
  const patients = useAppSelector(
    (state) => state.mangoExecutive.pendingPatientsList
  );
  const pagination = useAppSelector((state) => state.mangoExecutive.pagination);
  const [filtersAppliedState, setfiltersAppliedState] = useState({});
  const [patientsList, setPatientsList] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /**
   * Lifecycle to get the patient list
   */
  useEffect(() => {
    dispatch(
      getPendingPatientList(activePage - 1, pageSize, filtersAppliedState)
    );
  }, [activePage, pageSize, dispatch]);
  /**
   * Lifecycle to set the Patient List state with the value recieved in redux store
   */
  useEffect(() => {
    if (patients) {
      const reqPatientList = patients.map((patient, index) => {
        return {
          ...patient,
          sn: index + 1,
          date: patient?.dateCreated
            ? convertTimeToLocal(
                patient?.dateCreated,
                DateFormat.MMM_DD_YYYY_HH_SS
              )
            : null,
        };
      });
      setPatientsList(reqPatientList);
    }
  }, [activePage, dispatch, pageSize, patients]);
  /**
   * This function is saved when filter are set
   * @param {Object} filters
   */
  const filtersApplied = (filters) => {
    // console.log("FILTERS=>", filters);
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  return (
    <div>
      <div className="mt-4">
        <div>
          <div className="mango-filter mt-4">
            <Filter
              filters={mangoExecutiveInCompletefilters}
              data={[]}
              filterBody={true}
              callback={getPendingPatientList}
              filtersApplied={filtersApplied}
              activePage={activePage - 1}
              pageSize={pageSize}
              type="mango-executive"
              classes="ms-1-7 h-100">
              <>
                <div className="show-entries">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}>
                    <option value="" hidden>
                      {t('selectOne')}
                    </option>
                    <option value={10}>{t('showTenEntries')}</option>
                    <option value={20}>{t('showTwentyEntries')}</option>
                    <option value={30}>{t('showThirtyEntries')}</option>
                  </select>
                </div>
              </>
            </Filter>
          </div>
        </div>
        {patientsList && patientsList.length > 0 ? (
          <div className="page-container mt-3 p-4 pb-1">
            <TableComponent
              component={'mango-patient-listing'}
              tableHeadersData={tableHeadersMangoIncompletePatients}
              tableData={patientsList}
              classes={'mango-executive-patient align-items-center'}
              noCheck
              headerClasses="border-0"
            />
            {pagination && (
              <CustomPagination
                paginationDetail={pagination}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </div>
        ) : (
          <div>Currently there are no patients with Incomplete profile</div>
        )}
      </div>
    </div>
  );
};

export default InCompletePatientList;
