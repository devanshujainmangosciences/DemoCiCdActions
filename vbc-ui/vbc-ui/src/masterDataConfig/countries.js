import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
export const tableHeadersCountries = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Country Name',
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
        label: 'View Country',
        performingAction: 'can view details',
      },
      {
        type: 'update',
        keyName: '',
        icon: faEdit,
        label: 'Edit Country',
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

export const CountryDataVariables = {
  translation: 'adminComponents',
  filter: false,
  pageSizeFilter: true,
  title: 'Countries',
  canComponent: 'country-listing',
  canAction: 'can view addNewData',
  newDataTitle: 'New Country',
  newDataPath: 'Routes.NewLender.path',
  lenderPath: 'Routes.lender.path',
  tableClasses: '',
  tableHeaders: 'tableHeadersCountries',
  tableComponent: 'country-listing',
  isModal: true,
  modalData: {
    title: 'Country',
    items: [
      {
        label: 'Country',
        placeholder: 'enterCountry',
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
  createTitle: 'Create Country',
  updateTitle: 'Update Country',
  viewTitle: 'View Country',
  createButton: 'Add',
  updateButton: 'Update',
};
