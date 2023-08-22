/**
 * Permissions api mock response
 */
export default {
  status: true,
  message: '',
  data: {
    landingPage: {
      component: 'Dashboard',
      url: '/dashboard',
    },
    user: {
      gender: 'string',
      name: 'string string string',
      age: 0,
    },
    routes: {
      Patient: {
        url: '/patients',
        subSections: {
          RecoveredPatients: {
            url: '/patients/recovered',
            subSections: {},
          },
          ReportedOutcomes: {
            url: '/patients/reported',
            subSections: {},
          },
          NewOutcomes: {
            url: '/patients/newcases',
            subSections: {},
          },
        },
      },
      Dashboard: {
        url: '/dashboard',
        subSections: {},
      },
      Web: {
        url: '/dashboard',
        subSections: {},
      },
    },
    perms: {
      Patient: [
        'can add',
        'can edit',
        'can view',
        'can delete',
        'view webview',
      ],
      Dashboard: ['can view', 'view webview', 'view logout'],
    },
  },
};
