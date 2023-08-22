import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersNatureOfBusinesses = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Nature of Business',
    keyValue: 'name',
    className: '',
    showColumn: true,
    key: 1,
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
        url: '',
        label: 'View',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit',
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

export const NatureOfBusinessDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'NatureOfBusinesses',
  canComponent: 'nature-of-business-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Nature of Business',
  newDataPath: 'Routes.NewNature of Business.path',
  lenderPath: 'Routes.NatureOfBusinesses.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersNatureOfBusinesses',
  tableComponent: 'nature-of-business-listing',
  isModal: true,
  modalData: {
    title: 'Nature of Business',
    items: [
      {
        label: 'Nature of Business',
        placeholder: 'enterNature of Business',
        type: 'text',
        required: true,
        value: 'name',
        variable: 'name',
        warningText: '',
        rowGroup: 1,
        rowTitle: '',
      },
    ],
  },
  createTitle: 'Create Nature of Business',
  updateTitle: 'Update Nature of Business',
  viewTitle: 'View Nature of Business',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Nature of Business',
      placeholder: 'Enter Nature of Business',
      type: 'text',
      required: true,
      value: 'name',
      variable: 'name',
      warningText: '',
      rowGroup: 1,
      rowTitle: '',
    },
  ],
};
