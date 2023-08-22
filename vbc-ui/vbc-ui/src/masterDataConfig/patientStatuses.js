import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersPatientStatus = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'PatientStatus',
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

export const PatientStatusDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Patient Status',
  canComponent: 'experiences-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Patient Status',
  newDataPath: 'Routes.PatientStatus.path',
  lenderPath: 'Routes.PatientStatus.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersPatientStatus',
  tableComponent: 'patient-status-listing',
  isModal: true,
  modalData: {
    title: 'Patient Status',
    items: [
      {
        label: 'Patient Status',
        placeholder: 'enterPatientStatus',
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
  createTitle: 'Create Patient Status',
  updateTitle: 'Update Patient Status',
  viewTitle: 'View PatientStatus',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Patient Status',
      placeholder: 'enterPatientStatus',
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
