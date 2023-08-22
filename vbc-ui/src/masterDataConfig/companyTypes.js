import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersCompanyTypes = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Company Type',
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

export const CompanyTypesDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Company Types',
  canComponent: 'company-types-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Income Range',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersCompanyTypes',
  tableComponent: 'company-types-listing',
  isModal: true,
  modalData: {
    title: 'Gross Annual Incomes',
    items: [
      {
        label: 'Company Types',
        placeholder: 'enterCompanyType',
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
  createTitle: 'Create Company Type',
  updateTitle: 'Update Company Type',
  viewTitle: 'View Company Type',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Company Types',
      placeholder: 'enterCompanyType',
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
