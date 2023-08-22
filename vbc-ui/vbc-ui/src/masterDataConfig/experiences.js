import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersExperiences = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Experiance',
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

export const ExperiencesDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Experiences',
  canComponent: 'experiences-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Experience',
  newDataPath: 'Routes.NewBank.path',
  lenderPath: 'Routes.Banks.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersExperiences',
  tableComponent: 'experiences-listing',
  isModal: true,
  modalData: {
    title: 'Experiences',
    items: [
      {
        label: 'Experiences',
        placeholder: 'enterExperiences',
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
  createTitle: 'Create Experience',
  updateTitle: 'Update Experience',
  viewTitle: 'View Experience',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Experiences',
      placeholder: 'enterExperiences',
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
