import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersUsers = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Name',
    keyValue: 'fullName',
    keyValueEmail: 'email',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Date Of Birth',
    keyValue: 'birthDate',
    className: '',
    showColumn: false,
    key: 2,
  },
  {
    keyName: 'Age',
    keyValue: 'age',
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
    keyName: 'Roles',
    keyValue: 'role',
    className: '',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 6,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: '/admin/users/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/users/update/:id',
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      // {
      //   type: 'disable',
      //   keyName: '',
      //   icon: faBan,
      //   className: 'text-warning',
      //   label: 'Disable User',
      //   performingAction: 'can view disable',
      // },
    ],
  },
];