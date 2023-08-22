import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersStates = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'State Name',
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
        label: 'View State',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit State',
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

export const StateDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'States',
  canComponent: 'state-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New State',
  tableClasses: '',
  tableComponent: 'state-listing',
  isModal: true,
  modalData: {
    title: 'States',
    items: [
      {
        label: 'State',
        placeholder: 'enterState',
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
  createTitle: 'Create State',
  updateTitle: 'Update State',
  viewTitle: 'View State',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'State',
      placeholder: 'enterState',
      type: 'text',
      required: true,
      value: 'lenderState',
      variable: 'lenderState',
      warningText: '',
      rowGroup: 1,
      rowTitle: '',
    },
  ],
};
