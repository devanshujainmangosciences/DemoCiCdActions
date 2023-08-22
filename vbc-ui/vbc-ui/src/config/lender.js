import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersLenders = [
  {
    keyName: 'ID',
    keyValue: 'lenderId',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Name',
    keyValue: 'lenderName',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'City',
    keyValue: 'lenderCity',
    className: '',
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
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: '/admin/lenders/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/lenders/update/:id',
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
