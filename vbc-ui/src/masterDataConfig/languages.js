import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersLanguages = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Language',
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
        label: 'View Language',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit Language',
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

export const LanguageDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Languages',
  canComponent: 'language-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Language',
  newDataPath: 'Routes.NewLanguage.path',
  lenderPath: 'Routes.Languages.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersLanguages',
  tableComponent: 'language-listing',
  isModal: true,
  modalData: {
    title: 'Language',
    items: [
      {
        label: 'Language',
        placeholder: 'enterLanguage',
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
  createTitle: 'Create Language',
  updateTitle: 'Update Language',
  viewTitle: 'View Language',
  createButton: 'Add',
  updateButton: 'Update',
  items: [
    {
      label: 'Language',
      placeholder: 'Enter Language',
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
