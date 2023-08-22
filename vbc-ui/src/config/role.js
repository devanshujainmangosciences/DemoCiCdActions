import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersRole = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Name',
    keyValue: 'name',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Resource-Permissions',
    keyValue: 'permissions',
    className: '',
    showColumn: false,
    key: 2,
  },
  {
    keyName: 'Default Route',
    keyValue: 'defaultRoute',
    className: 'text-success',
    keyValueInactive: 'inactive',
    classNameInactive: 'text-danger',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Active',
    keyValue: 'active',
    className: 'text-success',
    keyValueInactive: 'inactive',
    classNameInactive: 'text-danger',
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
        url: '/admin/roles/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/roles/update/:id',
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'delete',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Delete',
        performingAction: 'can view remove',
      },
    ],
  },
];
