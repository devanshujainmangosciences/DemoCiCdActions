import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersCity = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'City Name',
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
        label: 'View City',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit City',
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

export const CityDataVariables = {
  translation: 'adminComponents',
  filter: true,
  pageSizeFilter: true,
  title: 'Cities',
  canComponent: 'city-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New City',
  tableClasses: '',
  tableComponent: 'city-listing',
  isModal: true,
  modalData: {
    title: 'Cities',
    items: [
      {
        label: 'City',
        placeholder: 'enterCity',
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
  createTitle: 'Create City',
  updateTitle: 'Update City',
  viewTitle: 'View City',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'City',
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
