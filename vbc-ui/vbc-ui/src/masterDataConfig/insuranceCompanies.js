import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersInsuranceCompanies = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Insurance Company',
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
        label: 'View Insurance Company',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit Insurance Company',
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

export const InsuranceCompaniesDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Insurance Companies',
  canComponent: 'insurance-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Insurance',
  newDataPath: 'Routes.NewInsuranceCompanies.path',
  lenderPath: 'Routes.InsuranceCompanies.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersInsuranceCompanies',
  tableComponent: 'insurance-companies-listing',
  isModal: true,
  modalData: {
    title: 'Insurance Company',
    items: [
      {
        label: 'Insurance Compnay',
        placeholder: 'enter Insurance company',
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
  createTitle: 'Create Insurance Company',
  updateTitle: 'Update Insurance Company',
  viewTitle: 'View Insurance Company',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Insurance Company',
      placeholder: 'Enter Insurance Company',
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
