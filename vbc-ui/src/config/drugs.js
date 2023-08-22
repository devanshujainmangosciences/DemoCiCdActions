import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersDrug = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: false,
    key: 0,
  },
  {
    keyName: 'ID',
    keyValue: 'drugId',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Generic Name',
    keyValue: 'drugGenericName',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Brand Name',
    keyValue: 'brandName',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Medication Molecule',
    keyValue: 'drugMolecule',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Active Status',
    keyValue: 'toggleVisibleStatus',
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
        url: '/admin/drug/view/:id',
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: '/admin/drug/update/:id',
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
