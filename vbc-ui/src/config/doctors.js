import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersDoctors = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
    performingAction: 'can view id',
  },
  {
    keyName: 'Doctor Name',
    keyValue: 'fullName',
    className: '',
    showColumn: true,
    key: 1,
    performingAction: 'can view firstName',
  },
  {
    keyName: 'Designation',
    keyValue: 'designation',
    className: '',
    showColumn: true,
    key: 3,
    performingAction: 'can view designation',
  },
  {
    keyName: 'Speciality',
    keyValue: 'speciality',
    className: '',
    showColumn: true,
    key: 4,
    performingAction: 'can view speciality',
  },
  {
    keyName: 'Hospital Group',
    keyValue: 'hospitalGroup',
    className: 'name',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Hospital Unit',
    keyValue: 'hospitalUnit',
    className: 'name',
    showColumn: true,
    key: 6,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 7,
    performingAction: 'can view actions',
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: '/admin/doctor/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/doctor/update/:id',
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

export const tableHeadersDoctorHandsonTable = [
  {
    keyName: 'First Name*',
    keyValue: 'firstName',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Middle Name',
    keyValue: 'middleName',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Last Name',
    keyValue: 'lastName',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Mobile',
    keyValue: 'mobile',
    className: '',
    showColumn: true,
    key: 3,
    performingAction: 'can view designation',
  },
  {
    keyName: 'Email*',
    keyValue: 'email',
    className: '',
    showColumn: true,
    key: 4,
    performingAction: 'can view designation',
  },
  {
    keyName: 'Date Of Birth',
    keyValue: 'birthDate',
    className: '',
    showColumn: true,
    key: 5,
    performingAction: 'can view designation',
  },
  {
    keyName: 'Gender*',
    keyValue: 'gender',
    className: '',
    showColumn: true,
    key: 6,
    performingAction: 'can view designation',
  },
  {
    keyName: 'Hospital Id*',
    keyValue: 'hospitalIds',
    className: '',
    showColumn: true,
    key: 7,
  },
  {
    keyName: 'Designation*',
    keyValue: 'designation',
    className: '',
    showColumn: true,
    key: 8,
    performingAction: 'can view designation',
  },

  {
    keyName: 'Speciality*',
    keyValue: 'speciality',
    className: '',
    showColumn: true,
    key: 9,
    performingAction: 'can view speciality',
  },

  {
    keyName: 'Mci Reg No*',
    keyValue: 'mciRegNo',
    className: '',
    showColumn: true,
    key: 10,
  },
  {
    keyName: 'Message',
    keyValue: 'errorMessage',
    className: '',
    showColumn: true,
    key: 11,
  },
];