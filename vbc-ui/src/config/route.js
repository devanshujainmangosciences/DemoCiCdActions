import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersRoute = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Route Name',
    keyValue: 'name',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Component',
    keyValue: 'component',
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
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
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
