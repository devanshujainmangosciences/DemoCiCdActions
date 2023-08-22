import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CustomOverHoverToolTip from '@/components/CustomOverHoverToolTip';

export const tableHeadersPatientDetailsApplicants = [
  {
    keyName: 'Name',
    keyValue: 'fullName',
    className: 's',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Age',
    keyValue: 'age',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Gender',
    keyValue: 'gender',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Relationship',
    keyValue: 'relationToPatient',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Mobile',
    keyValue: 'mobile',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Email',
    keyValue: 'email',
    className: '',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Status',
    keyValue: 'status',
    className: '',
    showColumn: true,
    key: 6,
  },
];
export const tableHeadersPatientDetailsDrugSchedule = [
  {
    keyName: 'Cycle #',
    keyValue: 'cycleNo',
    className: 'text-pure-black',
    showColumn: true,
    key: 7,
  },
  {
    keyName: 'Payment Type Opted',
    keyValue: 'paymentTypeOpted',
    className: '',
    showColumn: true,
    key: 20.1,
  },
  {
    keyName: 'Treatment Date',
    keyValue: 'treatmentDate',
    className: '',
    showColumn: true,
    key: 8,
  },

  {
    keyName: 'Grant Transfer Date',
    keyValue: 'cycleDate',
    className: '',
    showColumn: true,
    key: 9,
  },
  {
    keyName: 'Grant Initiation Date',
    keyValue: 'grantInitiationDate',
    className: '',
    showColumn: true,
    key: 10,
  },
  {
    keyName: 'Grant Paid Status',
    keyValue: 'mangoGrantPaidFlag',
    className: '',
    showColumn: true,
    key: 11,
  },
  {
    keyName: 'Grant Received Status',
    keyValue: 'mangoGrantReceivedFlag',
    className: '',
    showColumn: true,
    component: (
      <CustomOverHoverToolTip
        toolTipText={'Only First Grant details are being captured'}
        placement="bottom">
        <FontAwesomeIcon icon={faInfoCircle} size="xs" />
      </CustomOverHoverToolTip>
    ),
    key: 12,
  },
  {
    keyName: 'Receipt of medication purchase',
    keyValue: 'drugReceiptUploadDate',
    className: '',
    showColumn: true,
    key: 13,
  },
  {
    keyName: 'Download',
    keyValue: 'download',
    className: '',
    showColumn: true,
    key: 14,
  },
  {
    keyName: 'Price paid by patient',
    keyValue: 'drugReceiptAmount',
    className: '',
    showColumn: true,
    key: 15,
  },
  {
    keyName: 'Drug Purchase Date',
    keyValue: 'actualPurchaseDate',
    className: '',
    showColumn: true,
    key: 15.2,
  },
  {
    keyName: 'Receipt Amount Date',
    keyValue: 'receiptAmountDate',
    className: '',
    showColumn: true,
    key: 16,
  },
  {
    keyName: 'Cumulative Amount',
    keyValue: 'cumulativeAmount',
    className: '',
    showColumn: true,
    key: 17,
  },

  {
    keyName: 'Grant Paid Date',
    keyValue: 'grantPaidDate',
    className: '',
    showColumn: false,
    key: 18,
  },

  {
    keyName: 'Grant Recieved Date',
    keyValue: 'grantReceivedDate',
    className: '',
    showColumn: false,
    component: (
      <CustomOverHoverToolTip
        toolTipText={'Only First Grant details are being captured'}
        placement="bottom">
        <FontAwesomeIcon icon={faInfoCircle} size="xs" />
      </CustomOverHoverToolTip>
    ),
    key: 19,
  },
  {
    keyName: 'Paid Cycle',
    keyValue: 'paidCycle',
    className: '',
    showColumn: true,
    key: 20,
  },
  {
    keyName: 'Trigger Grant Email',
    keyValue: 'triggerGrantEmail',
    className: '',
    showColumn: true,
    key: 40.1,
  },
];
export const tableHeadersPatientDetailsDrugScheduleSelfPay = [
  {
    keyName: 'Cycle #',
    keyValue: 'cycleNo',
    className: 'text-pure-black',
    showColumn: true,
    key: 20,
  },
  {
    keyName: 'Payment Type Opted',
    keyValue: 'paymentTypeOpted',
    className: '',
    showColumn: true,
    key: 20.1,
  },
  {
    keyName: 'Treatment Date',
    keyValue: 'treatmentDate',
    className: '',
    showColumn: true,
    key: 21,
  },
  {
    keyName: 'Receipt of medication purchase',
    keyValue: 'drugReceiptUploadDate',
    className: '',
    showColumn: true,
    key: 22,
  },
  {
    keyName: 'Medication Schedule Date',
    keyValue: 'cycleDate',
    className: '',
    showColumn: false,
    key: 23,
  },
  {
    keyName: 'Download',
    keyValue: 'download',
    className: '',
    showColumn: true,
    key: 24,
  },
  {
    keyName: 'Price paid by patient',
    keyValue: 'drugReceiptAmount',
    className: '',
    showColumn: true,
    key: 25,
  },
  {
    keyName: 'Drug Purchase Date',
    keyValue: 'actualPurchaseDate',
    className: '',
    showColumn: true,
    key: 25.2,
  },
  {
    keyName: 'Receipt Amount Date',
    keyValue: 'receiptAmountDate',
    className: '',
    showColumn: true,
    key: 26,
  },

  {
    keyName: 'Cumulative Amount',
    keyValue: 'cumulativeAmount',
    className: '',
    showColumn: true,
    key: 27,
  },
  {
    keyName: 'Paid Cycle',
    keyValue: 'paidCycle',
    className: '',
    showColumn: true,
    key: 28,
  },
  {
    keyName: 'Trigger Grant Email',
    keyValue: 'triggerGrantEmail',
    className: '',
    showColumn: false,
    key: 40.1,
  },
];
export const tblHeaderPatientDetailsDrugScheduleLenderPayout = [
  {
    keyName: 'Cycle #',
    keyValue: 'cycleNo',
    className: 'text-pure-black',
    showColumn: true,
    key: 28,
  },
  {
    keyName: 'Payment Type Opted',
    keyValue: 'paymentTypeOpted',
    className: '',
    showColumn: true,
    key: 20.1,
  },
  {
    keyName: 'Treatment Date',
    keyValue: 'treatmentDate',
    className: '',
    showColumn: true,
    key: 29,
  },
  {
    keyName: 'Grant Transfer Date',
    keyValue: 'lenderGrantDate',
    className: '',
    showColumn: true,
    key: 30,
  },
  {
    keyName: 'Grant Initiation Date',
    keyValue: 'grantInitiationDate',
    className: '',
    showColumn: true,
    key: 31,
  },
  {
    keyName: 'Grant Paid Status',
    keyValue: 'mangoGrantPaidFlag',
    className: '',
    showColumn: true,
    key: 32,
  },

  {
    keyName: 'Grant Received Status',
    keyValue: 'mangoGrantReceivedFlag',
    className: '',
    showColumn: false,
    component: (
      <CustomOverHoverToolTip
        toolTipText={'Only First Grant details are being captured'}
        placement="bottom">
        <FontAwesomeIcon icon={faInfoCircle} size="xs" />
      </CustomOverHoverToolTip>
    ),
    key: 33,
  },
  {
    keyName: 'Receipt of medication purchase',
    keyValue: 'drugReceiptUploadDate',
    className: '',
    showColumn: true,
    key: 34,
  },
  {
    keyName: 'Download',
    keyValue: 'download',
    className: '',
    showColumn: true,
    key: 35,
  },

  {
    keyName: 'Price paid by patient',
    keyValue: 'drugReceiptAmount',
    className: '',
    showColumn: true,
    key: 36,
  },
  {
    keyName: 'Drug Purchase Date',
    keyValue: 'actualPurchaseDate',
    className: '',
    showColumn: true,
    key: 36.1,
  },
  {
    keyName: 'Receipt Amount Date',
    keyValue: 'receiptAmountDate',
    className: '',
    showColumn: true,
    key: 37,
  },

  {
    keyName: 'Cumulative Amount',
    keyValue: 'cumulativeAmount',
    className: '',
    showColumn: true,
    key: 38,
  },
  {
    keyName: 'Grant Paid Date',
    keyValue: 'grantPaidDate',
    className: '',
    showColumn: false,
    key: 39,
  },
  {
    keyName: 'Grant Recieved Date',
    keyValue: 'grantReceivedDate',
    className: '',
    showColumn: false,
    component: (
      <CustomOverHoverToolTip
        toolTipText={'Only First Grant details are being captured'}
        placement="bottom">
        <FontAwesomeIcon icon={faInfoCircle} size="xs" />
      </CustomOverHoverToolTip>
    ),
    key: 40,
  },
  {
    keyName: 'Paid Cycle',
    keyValue: 'paidCycle',
    className: '',
    showColumn: true,
    key: 20,
  },
  {
    keyName: 'Trigger Grant Email',
    keyValue: 'triggerGrantEmail',
    className: '',
    showColumn: true,
    key: 40.1,
  },
];

export const tableHeadersProm = [
  {
    keyName: 'Treatment',
    keyValue: 'treatment',
    className: 'text-pure-black w-50 fw-normal',
    showColumn: true,
    key: 41,
  },
  {
    keyName: 'Date',
    keyValue: 'date',
    className: 'w-25',
    showColumn: true,
    key: 42,
  },
  {
    keyName: 'Status',
    keyValue: 'status',
    className: '',
    showColumn: true,
    key: 43,
  },
];
export const tableHeadersLenderHistory = [
  {
    keyName: 'Lender',
    keyValue: 'name',
    className: '',
    showColumn: true,
    key: 44,
  },
  {
    keyName: 'Application Submission Date',
    keyValue: 'applicationSubmitDate',
    className: 'w-25',
    showColumn: true,
    key: 45,
  },
  {
    keyName: 'Application Status',
    keyValue: 'status',
    className: '',
    showColumn: true,
    key: 46,
  },
  {
    keyName: 'Actions',
    keyValue: 'actionButton',
    className: '',
    showColumn: true,
    key: 47,
  },
];
export const tableHeadersTreatmentBreaks = [
  {
    keyName: 'Event',
    keyValue: 'eventType',
    className: '',
    showColumn: true,
    key: 48,
  },
  {
    keyName: 'Date',
    keyValue: 'dateCreated',
    className: 'w-25',
    showColumn: true,
    key: 49,
  },
  {
    keyName: 'Restart Date',
    keyValue: 'restartDate',
    className: '',
    showColumn: true,
    key: 50,
  },
  {
    keyName: 'Reason',
    keyValue: 'remark',
    className: '',
    showColumn: true,
    key: 51,
  },
];
