import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersPermissions = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Description',
    keyValue: 'description',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Permission',
    keyValue: 'action',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Active',
    keyValue: 'active',
    className: 'text-success',
    keyValueInactive: 'inactive',
    classNameInactive: 'text-danger',
    showColumn: true,
    key: 3,
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
