import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {Routes} from '../routes';

/*
Program_ID
Hospital_ID
Manufacturer_ID
VBC_Drug_ID
Program_Name
Program_Description
Indication
Program_Start_Date
Program_End_Date
Patient_Enrollment_Goal
*/

export const tableHeaderVbcProgram = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },

  {
    keyName: 'Name',
    keyValue: 'programName',
    className: '',
    showColumn: true,
    key: 2,
  },

  {
    keyName: 'VBC Drug Id',
    keyValue: 'drugName',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Hospital Unit',
    keyValue: 'hospitalName',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Manufacturer',
    keyValue: 'manufacturerName',
    className: '',
    showColumn: true,
    key: 5,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 6,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: Routes.ViewVbcProgram.path,
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: Routes.EditVbcProgram.path,
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'confirmModal',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Remove',
        performingAction: 'can view remove',
      },
    ],
  },
];

export const tableHeaderAndroidVersionList = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Android Version',
    keyValue: 'androidVersion',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Release Date',
    keyValue: 'releaseDate',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Code Push Version',
    keyValue: 'codePushVersion',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 6,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,

        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,

        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'confirmModal',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Disable',
        performingAction: 'can view remove',
      },
    ],
  },
];
export const tableHeaderIosVersionList = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'IOS Version',
    keyValue: 'iosVersion',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'Release Date',
    keyValue: 'releaseDate',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Code Push Version',
    keyValue: 'codePushVersion',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 6,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'confirmModal',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Disable',
        performingAction: 'can view remove',
      },
    ],
  },
];
export const tableHeaderBackendVersionList = [
  {
    keyName: 'ID',
    keyValue: 'id',
    className: '',
    showColumn: true,
    key: 0,
  },
  {
    keyName: 'Backend Version',
    keyValue: 'backendVersion',
    className: '',
    showColumn: true,
    key: 1,
  },
  {
    keyName: 'Release Date',
    keyValue: 'releaseDate',
    className: '',
    showColumn: true,
    key: 2,
  },
  {
    keyName: 'IOS Mappings',
    keyValue: 'iosMappedVersions',
    className: '',
    showColumn: true,
    key: 3,
  },
  {
    keyName: 'Android Mappings',
    keyValue: 'androidMappedVersions',
    className: '',
    showColumn: true,
    key: 4,
  },
  {
    keyName: 'Actions',
    keyValue: 'actions',
    className: '',
    showColumn: true,
    key: 6,
    options: [
      {
        type: 'changeView',
        keyName: '',
        icon: faEye,
        url: Routes.BackendVersionView.path,
        label: 'View Details',
        performingAction: 'can view details',
      },
      {
        type: 'changeView',
        keyName: '',
        icon: faEdit,
        url: Routes.BackendVersionEdit.path,
        label: 'Edit Details',
        performingAction: 'can view editDetails',
      },
      {
        type: 'confirmModal',
        keyName: '',
        className: 'text-danger',
        icon: faTrashAlt,
        label: 'Disable',
        performingAction: 'can view remove',
      },
    ],
  },
];
