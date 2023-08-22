import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersDoctorChangeReasons = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Doctor Change Reason',
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

export const DoctorChangeReasonsDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Doctor Change Reasons',
  canComponent: 'doctor-change-reasons-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Income Range',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersDoctorChangeReasons',
  tableComponent: 'doctor-change-reasons-listing',
  isModal: true,
  modalData: {
    title: 'Gross Annual Incomes',
    items: [
      {
        label: 'Doctor Change Reasons',
        placeholder: 'enterDoctorChangeReasons',
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
  createTitle: 'Create Doctor Change Reason',
  updateTitle: 'Update Doctor Change Reason',
  viewTitle: 'View Doctor Change Reason',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Doctor Change Reasons',
      placeholder: 'enterDoctorChangeReasons',
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
