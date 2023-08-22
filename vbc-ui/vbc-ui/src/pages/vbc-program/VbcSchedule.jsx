/**
 * This components renders the VBC Schedule table for Patients
 * On Component load it check if schedlue is there or not, if it is present, then it makes the data for displaying in the Table Comonent
 */
import React, {useEffect, useState} from 'react';
import {DoctorNotesIcon} from '@/assets/icons';
import TableComponent from '@/components/Tables';
import {tableHeadersVbcSchedule} from '@/config';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {getVbcSchedule, myProfile} from '@/actions';
import {SELECTED_ROLE_NAME, Symbols} from '../../constants';
import {secureLocalStorage} from '@/services/web.storage';

const VbcSchedule = ({onlyTable = false}) => {
  const {t} = useTranslation(['vbcSchedule']);
  const dispatch = useAppDispatch();
  const myProfileData = useAppSelector((state) => state.app.myProfile);
  const schedule = useAppSelector((state) => state.loanApplication.schedule);
  const [scheduleTableData, setScheduleTableData] = useState([]);
  const selectedRole = secureLocalStorage.getItem(SELECTED_ROLE_NAME);
  const isApplicant = selectedRole === 'applicant';

  /**
   * Get the vbc schedule and set to the state
   */
  useEffect(() => {
    if (myProfileData) {
      if (!schedule) {
        dispatch(getVbcSchedule(myProfileData?.drugId));
      } else {
        setScheduleTableData(
          schedule.map((item) => ({
            ...item,
            id: item.cycleNo,
            marketPrice: `${Symbols.INDIAN_RUPEE} ${item.marketPrice}`,
            cumulativeAmount: `${Symbols.INDIAN_RUPEE} ${item.cumulativeAmount}`,
            payout: `${Symbols.INDIAN_RUPEE} ${item.payout}`,
          }))
        );
      }
    }
  }, [dispatch, myProfileData, schedule]);

  // Get my profile data if not present
  useEffect(() => {
    if (!myProfileData) {
      dispatch(myProfile(isApplicant));
    }
  }, [dispatch, myProfileData]);

  return (
    <div>
      {!onlyTable && (
        <div className="item p-4 mt-3">
          <div className="title-container">
            <DoctorNotesIcon fill="#28252e" />
            <h4 className="page-title ps-2">{t('vbcSchedule')}</h4>
          </div>
          <div className="note mt-3">
            <p className="text-muted m-0">{t('note')}</p>
          </div>
        </div>
      )}
      {scheduleTableData.length > 0 && (
        <div className="item p-4 mt-4 py-3">
          {/* {onlyTable} */}
          <TableComponent
            component={'vbc-schedule-listing'}
            tableHeadersData={tableHeadersVbcSchedule}
            tableData={scheduleTableData}
            classes={'vbc-schedule-patient-table align-items-center'}
            noCheck
            headerClasses=""
          />
        </div>
      )}
    </div>
  );
};

export default VbcSchedule;
