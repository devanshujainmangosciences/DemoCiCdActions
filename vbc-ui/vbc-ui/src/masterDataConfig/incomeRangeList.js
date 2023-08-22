import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersIncomeRangeList = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Income Range Name',
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

export const IncomeRangeListDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Incomes Range',
  canComponent: 'income-range-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Income Range',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersIncomeRangeList',
  tableComponent: 'income-listing',
  isModal: true,
  modalData: {
    title: 'Gross Annual Incomes',
    items: [
      {
        label: 'Income Range',
        placeholder: 'enterIncome',
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
  createTitle: 'Create Income Range',
  updateTitle: 'Update Income Range',
  viewTitle: 'View Income Range',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Income Range',
      placeholder: 'Enter Income Range',
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
