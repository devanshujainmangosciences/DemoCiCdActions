import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersNonClinicalDropOutReasons = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Non Clinical Dropout Reason',
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

export const NonClinicalDropOutReasonsDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Non Clinical Dropout Reasons',
  canComponent: 'clinical-dropout-reasons-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Income Range',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersNonClinicalDropOutReasons',
  tableComponent: 'clinical-dropout-reasons-listing',
  isModal: true,
  modalData: {
    title: 'Non Clinical Drop Out',
    items: [
      {
        label: 'Non Clinical Dropout Reasons',
        placeholder: 'enterNonClinicalDropOutReasons',
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
  createTitle: 'Create Non Clinical Dropout Reason',
  updateTitle: 'Update Non Clinical Dropout Reason',
  viewTitle: 'View Non Clinical Dropout Reason',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Non Clinical Dropout Reasons',
      placeholder: 'enterNonClinicalDropOutReasons',
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
