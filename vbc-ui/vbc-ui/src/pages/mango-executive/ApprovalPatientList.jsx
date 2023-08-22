/**
 * Component renders patients which have registered in the VBC portal but not completed the profile
 */
import {
  getApprovalRegPatients,
  getAllApprovalRegPatients,
  handleRegRequest,
  setToast,
} from '@/actions';
import {
  CustomPagination,
  Filter,
  TableComponent,
  CustomModal,
} from '@/components';
import {tableHeadersMangoPendingApprovalPatients} from '../../config';
import {mangoExecutiveRegistrationRequiredfilters} from '../../config';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/redux/redux-hooks';
import {ALERT_MESSAGE, DateFormat} from '@/constants';
import {convertTimeToLocal} from '@/services/utility';
import {Col} from '@themesberg/react-bootstrap';

const ApprovalPatientList = () => {
  const {t} = useTranslation(['mangoExecutive']);
  const dispatch = useAppDispatch();
  const [selectedPatient, setselectedPatient] = useState(null);
  const [actionType, setactionType] = useState('');
  const [showModal, setshowModal] = useState(false);
  const [showAllPatients, setshowAllPatients] = useState(false);
  const patients = useAppSelector(
    (state) => state.mangoExecutive.pendingApprovalRequest
  );
  const pagination = useAppSelector((state) => state.mangoExecutive.pagination);
  const [filtersAppliedState, setfiltersAppliedState] = useState([
    {
      arguments: ['No'],
      key: 'accepted',
      orOperation: false,
      searchOperation: 'IS_NULL',
      value: 'accepted',
    },
  ]);
  const [patientsList, setPatientsList] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [remarks, setRemarks] = useState('');

  /**
   * Lifecycle to get the patient list
   */
  useEffect(() => {
    if (showAllPatients)
      dispatch(
        getAllApprovalRegPatients(activePage - 1, pageSize, filtersAppliedState)
      );
    else
      dispatch(
        getApprovalRegPatients(activePage - 1, pageSize, filtersAppliedState)
      );
  }, [activePage, pageSize, dispatch, showAllPatients]);

  // console.log('filtersAppliedState=>', filtersAppliedState);

  /**
   * Function when action button Approve/Delete is clicked
   * @param {Number} id
   * @param {String} type
   */
  const onActionClick = (id, type) => {
    if (!id || !type) return;
    setselectedPatient(id);
    setactionType(type);
    setshowModal(true);
  };
  /**
   * Function triggers when Modal closes ,resetting all the values
   */
  const onModalClose = () => {
    setselectedPatient('');
    setactionType('');
    setshowModal(false);
    setRemarks('');
  };

  /**
   * Function to call the approve/delete api when user click confirm button on the modal
   * @param {Number} id
   * @param {String} type
   *
   */
  const onConfirmClick = (id, type, remarks) => {
    if (!id) return;
    const reqData = {
      reqId: id,
    };
    switch (type) {
      case 'approve': {
        reqData['accepted'] = true;
        break;
      }
      case 'delete': {
        reqData['accepted'] = false;
        reqData['remark'] = remarks;
        break;
      }
      default:
        break;
    }
    const onSuccessCallback = (response) => {
      onModalClose();
      if (response.status)
        if (showAllPatients)
          dispatch(
            getAllApprovalRegPatients(
              activePage - 1,
              pageSize,
              filtersAppliedState
            )
          );
        else
          dispatch(
            getApprovalRegPatients(
              activePage - 1,
              pageSize,
              filtersAppliedState
            )
          );
      dispatch(
        setToast(
          type === 'approve'
            ? ALERT_MESSAGE.REG_APPROVED
            : ALERT_MESSAGE.REG_DELETED,
          true,
          'success'
        )
      );
    };
    dispatch(handleRegRequest(reqData, onSuccessCallback));
  };

  /**
   * Lifecycle to set the Patient List state with the value recieved in redux store
   */
  useEffect(() => {
    if (patients) {
      const reqPatientList = patients
        .map((patient) => {
          return {
            ...patient,
            date: patient?.dateCreated
              ? convertTimeToLocal(
                  patient?.dateCreated,
                  DateFormat.MMM_DD_YYYY_HH_SS
                )
              : null,
            act: (
              <div className="d-flex gap-2">
                {!patient.accepted ? (
                  <>
                    <button
                      className="btn-patient-theme-grid bg-admin"
                      onClick={() => onActionClick(patient?.id, 'approve')}>
                      Approve
                    </button>
                    <button
                      className="btn-patient-theme-grid bg-admin"
                      onClick={() => onActionClick(patient?.id, 'delete')}>
                      Delete
                    </button>
                  </>
                ) : (
                  'Approved'
                )}
              </div>
            ),
          };
        })
        .sort((a, b) => a.accepted - b.accepted);

      setPatientsList(reqPatientList);
    }
  }, [activePage, dispatch, pageSize, patients]);
  /**
   * This function is saved when filter are set
   * @param {Object} filters
   */
  const filtersApplied = (filters) => {
    setfiltersAppliedState(filters);
    setActivePage(1);
  };

  const accepted = [
    {
      id: 1,
      label: 'Remove Approved Patients',
      value: 'No',
    },
  ];

  return (
    <div>
      <CustomModal
        Show={showModal}
        title={''}
        handleClose={onModalClose}
        cssClass="admin-modal"
        closeButton={true}
        deleteModalText={
          actionType === 'approve' ? t('confirmApprovePatient') : null
        }
        onConfirmDelete={() => onConfirmClick(selectedPatient, actionType)}>
        <div>
          {actionType !== 'approve' && (
            <div>
              <div className="text-pure-black mb-3 text-center">
                <strong> {t('confirmDeletePatient')}</strong>
              </div>

              <div className="d-flex justify-content-center mb-3 ">
                <textarea
                  rows={5}
                  className="w-100 mx-4"
                  name="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Please add your remarks here..."
                />
              </div>
              <div className="buttons">
                <button className="btn-cancle-patient" onClick={onModalClose}>
                  {t('Cancel')}
                </button>
                <button
                  disabled={remarks ? false : true}
                  className={
                    remarks
                      ? 'btn-confirm-patient bg-admin'
                      : 'bg-admin btn-confirm-patient-disabled'
                  }
                  onClick={() =>
                    onConfirmClick(selectedPatient, actionType, remarks)
                  }>
                  {t('Confirm')}
                </button>
              </div>
            </div>
          )}
        </div>
      </CustomModal>
      <div className="mt-4">
        <div>
          <div className="mango-filter mt-4">
            <Filter
              filters={mangoExecutiveRegistrationRequiredfilters}
              data={{
                accepted,
              }}
              filterBody={true}
              callback={
                showAllPatients
                  ? getAllApprovalRegPatients
                  : getApprovalRegPatients
              }
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
          <Col xxl={3} xl={4} lg={4} md={6} className="mb-2">
            <p className="p-0 m-0 text-pure-black">Show All Patients</p>
            <div
              className={`toggle-container-2 ${
                showAllPatients ? 'bg-admin' : ''
              }`}
              onClick={() => setshowAllPatients(!showAllPatients)}>
              <p className="float-end p-0 m-0 text-white left">
                {!showAllPatients && 'Show'}
              </p>
              <div
                className={`dialog-button-2 ${
                  showAllPatients ? '' : 'disabled'
                }`}></div>
              <p className="float-start text-white p-0 m-0 right">
                {showAllPatients && 'Hide'}
              </p>
            </div>
          </Col>
        </div>
        {patientsList && patientsList.length > 0 ? (
          <div className="page-container mt-3 p-4 pb-1">
            <TableComponent
              component={'mango-patient-listing'}
              tableHeadersData={tableHeadersMangoPendingApprovalPatients}
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
          <div>{t('noPendingPatientAvaliable')}</div>
        )}
      </div>
    </div>
  );
};

export default ApprovalPatientList;
