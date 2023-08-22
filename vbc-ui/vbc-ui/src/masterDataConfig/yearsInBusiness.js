import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersYearsInBusiness = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Years in Business',
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

export const YearsInBusinessDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Years In Business',
  canComponent: 'years-in-business-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Profession',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersYearsInBusiness',
  tableComponent: 'years-in-business-listing',
  isModal: true,
  modalData: {
    title: 'Years In Business',
    items: [
      {
        label: 'Years In Business',
        placeholder: 'enterYearsInBusiness',
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
  createTitle: 'Create Years In Business',
  updateTitle: 'Update Years In Business',
  viewTitle: 'View Years In Business',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Years In Business',
      placeholder: 'enterYearsInBusiness',
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
