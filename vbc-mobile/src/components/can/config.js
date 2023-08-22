export default {
  patient: {
    routes: [
      {component: 'Dashboard', url: '/landing'},
      {component: 'Add Patient', url: '/patienttimeline'},
      {component: 'Web', url: '/patienttimeline'},
    ],
    perm: [
      'Patient Timeline View:can visit',
      'Loan Details Component:can show',
      'Dashboard: addPatient',
    ],
  },
  doctor: {
    routes: [
      {component: 'Dashboard', url: '/patients'},
      {component: 'Edit Patient', url: '/patienttimeline'},
      {component: 'Web', url: '/patienttimeline'},
    ],
    perm: ['Patients:list', 'Patients:can show', 'Dashboard: editPatient'],
  },
  admin: {
    routes: [
      {component: 'Dashboard', url: '/landing'},
      {component: 'Add Patient', url: '/patienttimeline'},
      {component: 'Edit Patient', url: '/patienttimeline'},
      {component: 'Web', url: '/patienttimeline'},
    ],
    perm: [
      'Patients:list',
      'Patients:can add',
      'Patients:can edit',
      'Patients:can delete',
      'Patients:can show',
      'Dashboard: addPatient',
      'Dashboard: editPatient',
    ],
  },
};
