import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersHospitals = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Name',
    keyValue: 'hospitalName',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'City',
    keyValue: 'hospitalCity',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'State',
    keyValue: 'hospitalState',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 5,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: '/admin/hospital/get/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/hospital/update/:id',
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'confirmModal',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Remove',
        performingAction: 'can view remove',
      },
    ],
  },
];
export const tableHeadersHospitalsHandsOnTable = [
  {
    keyName: 'Name',
    keyValue: 'hospitalName',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Address',
    keyValue: 'hospitalAddress1',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'City',
    keyValue: 'hospitalCity',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'State',
    keyValue: 'hospitalState',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Country',
    keyValue: 'hospitalCountry',
    className: '',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Pincode',
    keyValue: 'pincode',
    className: '',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Hospital Group Name',
    keyValue: 'hospitalGroupName',
    className: '',
    showColumn: true,
    key: 6,
  },
  {
    keyName: 'Hospital Legal Name',
    keyValue: 'hospitalLegalName',
    className: '',
    showColumn: true,
    key: 7,
  },
  {
    keyName: 'GST Number',
    keyValue: 'gstNumber',
    className: '',
    showColumn: true,
    key: 8,
  },
  {
    keyName: 'Invoice Number',
    keyValue: 'invoiceDetails',
    className: '',
    showColumn: true,
    key: 9,
  },
  {
    keyName: 'No. Of Beds',
    keyValue: 'noOfBeds',
    className: '',
    showColumn: true,
    key: 10,
  },
  {
    keyName: 'Oncology Beds',
    keyValue: 'noOfOncologyBeds',
    className: '',
    showColumn: true,
    key: 10,
  },
];

export const tableHeadersHospitalIpConfig = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Hospital',
    keyValue: 'hospitalName',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Allowed IP',
    keyValue: 'allowedIps',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 4,
    options: [
      {
        type: 'view',
        keyName: '',
        icon: faEye,
        url: '/admin/users/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        url: '/admin/users/update/:id',
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      // {
      //   type: 'delete',
      //   keyName: '',
      //   className: 'text-danger',
      //   icon: faTrashAlt,
      //   label: 'Delete',
      //   performingAction: 'can view remove',
      // },
    ],
  },
];
