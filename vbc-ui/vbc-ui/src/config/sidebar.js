/**
 * This module contains all the options in the application sidebar along with their role to render in sidebar.
 * Always try to add new route in the sidebar according to its role.
 */
import {
  SidebarClinicalIcon,
  SidebarCommunicationIcon,
  SidebarDrugIcon,
  SidebarFinancialIcon,
  SidebarPatientReportedOutcomesIcon,
  SidebarLandingIcon,
  ProfileIcon,
  HospitalIcon,
  ProfilePageIcon,
  ApplicationOverviewIcon,
  StartLoanApplicationIcon,
  SidebarDocumentIcon,
  ResourceIcon,
  VbcProgramIcon,
  TestResultIcon,
  TreatmentIcon,
  ClinicalNotesIcon,
  HelpIcon,
  DocumentIcon,
  SidebarPushNotificationIcon,
  SidebarSettingsIcons,
  CountryManagementIcon,
  ProfessionDataIcon,
  PersonalDataIcon,
  ClinicalDataIcon,
  SidebarLenderIcon,
  RegistrationRequest,
  IncompletePatients,
  PatientsIcon,
  MobileVersionManagementIcon,
} from '../assets/icons';
import {Routes} from '../routes';
export const colorMap = {
  patient: '#F78F27',
  admin: '#09A6E0',
  pharma: '#F2424D',
  doctor: '#08b4cc',
};
const {
  ClinicalNotes,
  LabReports,
  Medications,
  RadiologyReports,
  SurgicalDetails,
  // LoanDetails,
  // EmiDetails,
  // Doctor,
  // Lender,
  MyProfile,
  FinancialInformation,
  CareGiver,
  Documents,
  Resources,
  Settings,
  Resource,
  Permission,
  Route,
  Users,
  Hospitals,
  Manufacturers,
  VbcDrugSchedule,
  Doctors,
  Drugs,
  Roles,
  Lenders,
  // NewLender,
  PatientRecruitmentAndConversion,
  NewPatient,
  PatientLongitudinality,
  SurvivalAndResponse,
  DiscontinuationAndAdverseEvents,
  PatientReportedOutcomes,
  IndividualPatientData,
  SalesAndFreePacks,
  PerPatientRevenue,
  ProfileDetails,
  ApplicantSettings,
  ApplicantApplicationOverview,
  ApplicantFinancialInformation,
  ApplicantStartLoan,
  ApplicantDocuments,
  ApplicantResources,
  LoanApplication,
  PatientApplicant,
  VbcSchedule,
  DrugSchedule,
  MangoExecutiveProfile,
  MangoExecutivePatients,
  MangoExecutiveSettings,
  MangoExecutivePushNotification,
  MangoExecutiveIncompletePatients,
  MangoExecutivePendingApprovalPatients,
  // SecuredSubventionRebate,
  DoctorPatient,
  DoctorProfile,
  DoctorSettings,
  OtherTests,
  RadiationTherapy,
  OtherTreatment,
  help,
  HolidayList,
  VbcProgramList,
  FinancePatients,
  FinanceSettings,
  FinanceProfile,
  Countries,
  States,
  Banks,
  InsuranceCompanies,
  CompanyTypes,
  Employers,
  IndustryTypes,
  NatureOfBusiness,
  Occupations,
  Professions,
  Languages,
  ResidenceTypes,
  EducationLevels,
  Relationships,
  CancerTypes,
  DoctorChangeReasons,
  PatientStatus,
  ClinicalDropOutReasons,
  NonClinicalDropOutReasons,
  Cities,
  HospitalIpConfig,
  AndroidVersionList,
  BackendVersionList,
  IosVersionList,
} = Routes;

const sidebarData = [
  //applicant sidebar
  {
    title: 'My Profile',
    fillColor: '#F78F27',
    eventKey: 'profile',
    role: 'applicant',
    isAccordion: true,
    uniqueKey: 'applicant-profile',
    icon: ProfilePageIcon,
    listItem: [
      {
        title: 'Profile Details',
        fillColor: '#F78F27',
        uniqueKey: 'profile-detail',
        pathName: ProfileDetails.path,
      },
      {
        title: 'Settings',
        fillColor: '#F78F27',
        uniqueKey: 'applicant-settings',
        pathName: ApplicantSettings.path,
      },
    ],
  },
  {
    title: 'Application Overview',
    eventKey: 'application-overview',
    icon: ApplicationOverviewIcon,
    uniqueKey: 'applicant-application-overview',
    isAccordion: false,
    pathName: ApplicantApplicationOverview.path,
  },
  {
    title: 'Financial Information',
    eventKey: 'financial-information',
    icon: SidebarFinancialIcon,
    uniqueKey: 'applicant-financial-information',
    isAccordion: false,
    pathName: ApplicantFinancialInformation.path,
  },
  {
    title: 'Start Loan',
    eventKey: 'start-loan',
    icon: StartLoanApplicationIcon,
    uniqueKey: 'applicant-start-loan',
    isAccordion: false,
    pathName: ApplicantStartLoan.path,
  },
  {
    title: 'Documents',
    eventKey: 'documents',
    icon: SidebarDocumentIcon,
    uniqueKey: 'applicant-documents',
    isAccordion: false,
    pathName: ApplicantDocuments.path,
    isLoanAgainstFD: true,
  },
  {
    title: 'Resources',
    eventKey: 'resources',
    uniqueKey: 'applicant-resources',
    icon: ResourceIcon,
    isAccordion: false,
    pathName: ApplicantResources.path,
  },
  //mango executive config
  {
    title: 'My Profile',
    fillColor: '#F78F27',
    eventKey: 'mango-executive-profile',
    icon: ProfilePageIcon,
    uniqueKey: 'admin-mango-executive',
    isAccordion: false,
    pathName: MangoExecutiveProfile.path,
  },
  {
    title: 'Patients',
    eventKey: 'patients',
    icon: PatientsIcon,
    uniqueKey: 'mango-patients',
    isAccordion: false,
    pathName: MangoExecutivePatients.path,
  },
  {
    title: 'Incomplete Patients',
    eventKey: 'mango-executive-incomplete-patients',
    icon: IncompletePatients,
    uniqueKey: 'mango-executive-incomplete-patients',
    isAccordion: false,
    pathName: MangoExecutiveIncompletePatients.path,
  },
  {
    title: 'Registration Request',
    eventKey: 'pending-approval-patients',
    icon: RegistrationRequest,
    uniqueKey: 'pending-approval-patients',
    isAccordion: false,
    pathName: MangoExecutivePendingApprovalPatients.path,
  },
  {
    title: 'Settings',
    eventKey: 'settings',
    icon: SidebarSettingsIcons,
    uniqueKey: 'mango-executive-settings',
    isAccordion: false,
    pathName: MangoExecutiveSettings.path,
  },
  {
    title: 'Send Push Notification',
    eventKey: 'send-push-notification',
    icon: SidebarPushNotificationIcon,
    uniqueKey: 'send-push-notification',
    isAccordion: false,
    pathName: MangoExecutivePushNotification.path,
  },
  // {
  //   title: 'Secured Subvention/Rebate',
  //   eventKey: 'secured-rebate-subvention',
  //   icon: SidebarPushNotificationIcon,
  //   uniqueKey: 'secured-rebate-subvention',
  //   isAccordion: false,
  //   pathName: SecuredSubventionRebate.path,
  // },

  //Doctor Config
  {
    title: 'My Profile',
    fillColor: '#F78F27',
    eventKey: 'doctor-profile',
    icon: ProfilePageIcon,
    uniqueKey: 'doctor-profile',
    isAccordion: false,
    pathName: DoctorProfile.path,
  },
  {
    title: 'Patients',
    eventKey: 'doctor-patient',
    icon: ResourceIcon,
    uniqueKey: 'doctor-patient',
    isAccordion: false,
    pathName: DoctorPatient.path,
  },
  {
    title: 'Settings',
    eventKey: 'settings',
    icon: SidebarSettingsIcons,
    uniqueKey: 'doctor-settings',
    isAccordion: false,
    pathName: DoctorSettings.path,
  },
  //patient sidebar config
  /*
      Commented from the side-bar @Anand-29th Sept Asana Requirements
  */
  // {
  //   title: "Landing Screen",
  //   eventKey: "landingscreen",
  //   icon: SidebarLandingIcon,
  //   uniqueKey: "landing-page",
  //   isAccordion: false,
  //   pathName: Messages.path
  // },
  {
    title: 'Patient Profile',
    fillColor: '#F78F27',
    eventKey: 'profile',
    role: 'patient',
    isAccordion: true,
    uniqueKey: 'patient-profile',
    icon: ProfilePageIcon,
    listItem: [
      {
        title: 'My Profile',
        fillColor: '#F78F27',
        uniqueKey: 'my-profile',
        pathName: MyProfile.path,
      },
      {
        title: 'Financial Information',
        fillColor: '#F78F27',
        uniqueKey: 'financial-information',
        pathName: FinancialInformation.path,
      },
      {
        title: 'CareGiver',
        fillColor: '#F78F27',
        uniqueKey: 'caregiver',
        pathName: CareGiver.path,
      },
      {
        title: 'Documents',
        fillColor: '#F78F27',
        uniqueKey: 'documents',
        pathName: Documents.path,
      },
      {
        title: 'Resources',
        fillColor: '#F78F27',
        uniqueKey: 'patient-resources',
        pathName: Resources.path,
      },
      {
        title: 'Settings',
        fillColor: '#F78F27',
        uniqueKey: 'settings',
        pathName: Settings.path,
      },
    ],
  },
  {
    title: 'Test Results',
    fillColor: '#F78F27',
    eventKey: 'test-results',
    uniqueKey: 'test-results',
    isAccordion: true,
    role: 'patient',
    icon: TestResultIcon,
    listItem: [
      {
        title: 'Lab Reports',
        fillColor: '#F78F27',
        uniqueKey: 'lab-reports',
        pathName: LabReports.path,
      },
      {
        title: 'Radiology',
        fillColor: '#F78F27',
        uniqueKey: 'radiology-reports',
        pathName: RadiologyReports.path,
      },
      {
        title: 'Other Tests',
        fillColor: '#F78F27',
        uniqueKey: 'other-tests',
        pathName: OtherTests.path,
      },
    ],
  },
  {
    title: 'Treatments',
    fillColor: '#F78F27',
    eventKey: 'treatments',
    uniqueKey: 'treatments',
    isAccordion: true,
    role: 'patient',
    icon: TreatmentIcon,
    listItem: [
      {
        title: 'Surgical Details',
        fillColor: '#F78F27',
        uniqueKey: 'surgical-details',
        pathName: SurgicalDetails.path,
      },
      {
        title: 'Medications',
        fillColor: '#F78F27',
        uniqueKey: 'medications',
        pathName: Medications.path,
      },
      {
        title: 'Radiation Therapy',
        fillColor: '#F78F27',
        uniqueKey: 'radiation-therapy',
        pathName: RadiationTherapy.path,
      },
      {
        title: 'Other Treatment',
        fillColor: '#F78F27',
        uniqueKey: 'other-treatment',
        pathName: OtherTreatment.path,
      },
    ],
  },
  {
    title: 'Clinical Notes',
    eventKey: 'clinicalNotes',
    icon: ClinicalNotesIcon,
    uniqueKey: 'clinical-notes',
    isAccordion: false,
    pathName: ClinicalNotes.path,
  },

  {
    title: 'VBC Program',
    fillColor: '#F78F27',
    eventKey: 'vbc-program',
    role: 'patient',
    isAccordion: true,
    uniqueKey: 'vbc-program',
    icon: VbcProgramIcon,
    listItem: [
      {
        title: 'Loan Application',
        fillColor: '#F78F27',
        uniqueKey: 'loan-application',
        pathName: LoanApplication.path,
      },
      {
        title: 'Applicants',
        fillColor: '#F78F27',
        uniqueKey: 'patient-applicant',
        pathName: PatientApplicant.path,
      },
      {
        title: 'VBC Schedule',
        fillColor: '#F78F27',
        uniqueKey: 'vbc-schedule',
        pathName: VbcSchedule.path,
      },
      {
        title: 'Drug Schedule',
        fillColor: '#F78F27',
        uniqueKey: 'drug-schedule',
        pathName: DrugSchedule.path,
      },
    ],
  },
  {
    title: 'Help',
    eventKey: 'help',
    icon: HelpIcon,
    uniqueKey: 'help',
    isAccordion: false,
    pathName: help.path,
  },
  /*
      Commented from the side-bar @Anand-29th Sept Asana Requirements
  */
  // {
  //   title: "Quality of Life Questionnaire",
  //   eventKey: "patientreportedoutcomes",
  //   icon: SidebarPatientReportedOutcomesIcon,
  //   uniqueKey: "patient-reported-outcomes",
  //   isAccordion: false,
  //   pathName: Existing.path
  // },
  // {
  //   title: 'Patient Reported Outcomes',
  //   fillColor: '#F78F27',
  //   eventKey: 'patientreportedoutcomes',
  //   role: 'patient',
  //   isAccordion: true,
  //   uniqueKey: 'patient-reported-outcomes',
  //   icon: SidebarPatientReportedOutcomesIcon,
  //   listItem: [
  //     {
  //       title: 'Existing',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'existing-patient-outcomes',
  //       pathName: Existing.path
  //     },
  //     {
  //       title: 'New',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'new-patient-outcomes',
  //       pathName: New.path
  //     }
  //   ]
  // },
  // {
  //   title: 'Financial Details',
  //   fillColor: '#F78F27',
  //   eventKey: 'financialdetails',
  //   role: 'patient',
  //   isAccordion: true,
  //   uniqueKey: 'financial-details',
  //   icon: SidebarFinancialIcon,
  //   listItem: [
  //     {
  //       title: 'Loan Details',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'loan-details',
  //       pathName: LoanDetails.path
  //     },
  //     {
  //       title: 'EMI Details',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'emi-details',
  //       pathName: EmiDetails.path
  //     }
  //   ]
  // },
  // {
  //   title: 'Communication',
  //   fillColor: '#F78F27',
  //   eventKey: 'communication',
  //   role: 'patient',
  //   isAccordion: true,
  //   uniqueKey: 'communication',
  //   icon: SidebarCommunicationIcon,
  //   listItem: [
  //     {
  //       title: 'Doctor',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'doctor',
  //       pathName: Doctor.path
  //     },
  //     {
  //       title: 'Lender',
  //       fillColor: '#F78F27',
  //       uniqueKey: 'lender',
  //       pathName: Lender.path
  //     }
  //   ]
  // },
  // pharma sidebar config
  {
    title: 'Operations',
    fillColor: ' #F2424D',
    eventKey: 'operations',
    uniqueKey: 'operations',
    role: 'pharma',
    isAccordion: true,
    icon: SidebarClinicalIcon,
    listItem: [
      {
        title: 'Patient recruitments and Conversion',
        fillColor: ' #F2424D',
        uniqueKey: 'patient-recruitments-and-conversion',
        pathName: PatientRecruitmentAndConversion.path,
      },
      {
        title: 'New Patients Starts',
        fillColor: ' #F2424D',
        uniqueKey: 'new-patients-starts',
        pathName: NewPatient.path,
      },
      {
        title: 'Patient Longitudinality',
        fillColor: ' #F2424D',
        uniqueKey: 'patient-longitudinality',
        pathName: PatientLongitudinality.path,
      },
    ],
  },
  {
    title: 'Clinical',
    fillColor: ' #F2424D',
    eventKey: 'clinical',
    role: 'pharma',
    uniqueKey: 'clinical',
    isAccordion: true,
    icon: SidebarPatientReportedOutcomesIcon,
    listItem: [
      {
        title: 'Survival and Response',
        fillColor: ' #F2424D',
        uniqueKey: 'survival-and-response',
        pathName: SurvivalAndResponse.path,
      },
      {
        title: 'Discontinuation and adverse Events',
        fillColor: ' #F2424D',
        uniqueKey: 'discontinuation-and-adverse-events',
        pathName: DiscontinuationAndAdverseEvents.path,
      },
      {
        title: 'Patient Reported Outcomes',
        fillColor: ' #F2424D',
        uniqueKey: 'patient-recorded-outcomes',
        pathName: PatientReportedOutcomes.path,
      },
      {
        title: 'Individual Patient data',
        fillColor: ' #F2424D',
        uniqueKey: 'individual-patient-data',
        pathName: IndividualPatientData.path,
      },
    ],
  },
  {
    title: 'Financial',
    fillColor: ' #F2424D',
    eventKey: 'financial',
    uniqueKey: 'financial',
    role: 'pharma',
    isAccordion: true,
    icon: SidebarFinancialIcon,
    listItem: [
      {
        title: 'Sales and Free Packs',
        fillColor: ' #F2424D',
        uniqueKey: 'sales-and-free-packs',
        pathName: SalesAndFreePacks.path,
      },
      {
        title: 'Per-Patient Revenue',
        fillColor: ' #F2424D',
        uniqueKey: 'per-patient-Revenue',
        pathName: PerPatientRevenue.path,
      },
    ],
  },
  {
    title: 'Documentation',
    fillColor: ' #F2424D',
    eventKey: 'documentation',
    uniqueKey: 'documentation',
    role: 'pharma',
    isAccordion: false,
    icon: SidebarCommunicationIcon,
  },
  // admin sidebar config
  {
    title: 'User Management',
    eventKey: 'users',
    icon: ProfileIcon,
    isAccordion: true,
    uniqueKey: 'admin-users',
    role: 'admin',
    listItem: [
      {
        title: 'Users',
        pathName: Users.path,
        uniqueKey: 'user-listing',
      },
    ],
  },
  {
    title: 'RBAC',
    eventKey: 'resource',
    icon: SidebarLandingIcon,
    isAccordion: true,
    uniqueKey: 'admin-resources',
    role: 'admin',
    listItem: [
      {
        title: 'Resources',
        pathName: Resource.path,
        uniqueKey: 'resource-listing',
      },
      {
        title: 'Permissions',
        pathName: Permission.path,
        uniqueKey: 'permission-listing',
      },
      {
        title: 'Roles',
        pathName: Roles.path,
        uniqueKey: 'role-listing',
      },
      {
        title: 'Routes',
        uniqueKey: 'route-listing',
        pathName: Route.path,
      },
    ],
  },
  {
    title: 'Manufacturer Management',
    eventKey: 'drug',
    icon: SidebarDrugIcon,
    isAccordion: true,
    uniqueKey: 'admin-manufacturers',
    role: 'admin',
    listItem: [
      {
        title: 'Drugs',
        uniqueKey: 'drug-listing',
        pathName: Drugs.path,
      },
      {
        title: 'Manufacturers',
        uniqueKey: 'manufacturer-listing',
        pathName: Manufacturers.path,
      },
      {
        title: 'VBC Drug Schedule',
        uniqueKey: 'vbc-drug-schedule',
        pathName: VbcDrugSchedule.path,
      },
    ],
  },
  {
    title: 'Lender Management',
    eventKey: 'lender',
    icon: SidebarLenderIcon,
    isAccordion: true,
    uniqueKey: 'admin-lenders',
    role: 'admin',
    listItem: [
      {
        title: 'Lenders',
        pathName: Lenders.path,
        uniqueKey: 'lender-listing',
      },
    ],
  },
  {
    title: 'Hospital Management',
    eventKey: 'hospital',
    icon: HospitalIcon,
    isAccordion: true,
    uniqueKey: 'admin-hospitals',
    role: 'admin',
    listItem: [
      {
        title: 'Hospitals',
        uniqueKey: 'hospital-listing',
        pathName: Hospitals.path,
      },
      {
        title: 'Hospital IP Config',
        uniqueKey: 'hospital-ip-config-list',
        pathName: HospitalIpConfig.path,
      },
      {
        title: 'Doctors',
        uniqueKey: 'doctor-listing',
        pathName: Doctors.path,
      },
    ],
  },
  {
    title: 'Holiday',
    eventKey: 'holiday-list',
    icon: ProfileIcon,
    isAccordion: false,
    uniqueKey: 'holiday-list',
    role: 'admin',
    pathName: HolidayList.path,
  },
  {
    title: 'VBC Program',
    eventKey: 'admin-vbc-program-list',
    icon: DocumentIcon,
    isAccordion: false,
    uniqueKey: 'admin-vbc-program-list',
    role: 'admin',
    pathName: VbcProgramList.path,
  },
  {
    title: 'Mobile Version Management',
    eventKey: 'mobile-version-management',
    icon: MobileVersionManagementIcon,
    isAccordion: true,
    uniqueKey: 'mobile-version-management',
    role: 'admin',
    listItem: [
      {
        title: 'Backend Version',
        uniqueKey: 'backend-version',
        pathName: BackendVersionList.path,
      },
      {
        title: 'Android Version',
        uniqueKey: 'android-version',
        pathName: AndroidVersionList.path,
      },
      {
        title: 'IOS Version',
        uniqueKey: 'ios-version',
        pathName: IosVersionList.path,
      },
    ],
  },
  //Finance Config
  {
    title: 'My Profile',
    fillColor: '#F78F27',
    eventKey: 'finance-profile',
    icon: ProfilePageIcon,
    uniqueKey: 'finance-profile',
    isAccordion: false,
    pathName: FinanceProfile.path,
  },
  {
    title: 'Patients',
    eventKey: 'finance-patients',
    icon: ResourceIcon,
    uniqueKey: 'finance-patients',
    isAccordion: false,
    pathName: FinancePatients.path,
  },
  {
    title: 'Settings',
    eventKey: 'settings',
    icon: SidebarSettingsIcons,
    uniqueKey: 'finance-settings',
    isAccordion: false,
    pathName: FinanceSettings.path,
  },
  //MASTER DATA SCREENS
  {
    title: 'Location Master Management',
    eventKey: 'country-management',
    icon: CountryManagementIcon,
    isAccordion: true,
    uniqueKey: 'Location Master Data',
    role: 'admin',
    listItem: [
      {
        title: 'Countries',
        pathName: Countries.path,
        uniqueKey: 'country-list',
      },
      {
        title: 'States',
        pathName: States.path,
        uniqueKey: 'state-list',
      },
      {
        title: 'Cities',
        pathName: Cities.path,
        uniqueKey: 'city-list',
      },
    ],
  },
  {
    title: 'Financial Management',
    eventKey: 'financial-management',
    icon: SidebarFinancialIcon,
    isAccordion: true,
    uniqueKey: 'Financial Master Data',
    role: 'admin',
    listItem: [
      {
        title: 'Banks',
        pathName: Banks.path,
        uniqueKey: 'bank-list',
      },

      {
        title: 'Insurance Companies',
        pathName: InsuranceCompanies.path,
        uniqueKey: 'insurance-companies',
      },
    ],
  },
  {
    title: 'Professional Data',
    eventKey: 'professional-data',
    icon: ProfessionDataIcon,
    isAccordion: true,
    uniqueKey: 'Professional Master Data',
    role: 'admin',
    listItem: [
      {
        title: 'Company Types',
        pathName: CompanyTypes.path,
        uniqueKey: 'company-types-list',
      },
      {
        title: 'Employer Types',
        pathName: Employers.path,
        uniqueKey: 'employer-list',
      },
      {
        title: 'Industry Types',
        pathName: IndustryTypes.path,
        uniqueKey: 'industry-types-list',
      },
      {
        title: 'Nature Of Business',
        pathName: NatureOfBusiness.path,
        uniqueKey: 'nature-of-businesss-list',
      },
      {
        title: 'Occupations',
        pathName: Occupations.path,
        uniqueKey: 'occupations-list',
      },
      {
        title: 'Professions',
        pathName: Professions.path,
        uniqueKey: 'professions-list',
      },
    ],
  },
  {
    title: 'Personal Data',
    eventKey: 'personal-data',
    icon: PersonalDataIcon,
    isAccordion: true,
    uniqueKey: 'Personal Master Data',
    role: 'admin',
    listItem: [
      {
        title: 'Languages',
        pathName: Languages.path,
        uniqueKey: 'languages-list',
      },
      {
        title: 'Residence Types',
        pathName: ResidenceTypes.path,
        uniqueKey: 'residence-types-list',
      },
      {
        title: 'Education Level',
        pathName: EducationLevels.path,
        uniqueKey: 'education-level-list',
      },
      {
        title: 'Relationships',
        pathName: Relationships.path,
        uniqueKey: 'relationships-list',
      },
    ],
  },
  {
    title: 'Clinical Data',
    eventKey: 'clinical-data',
    icon: ClinicalDataIcon,
    isAccordion: true,
    uniqueKey: 'Clinical Master Data',
    role: 'admin',
    listItem: [
      {
        title: 'Cancer Types',
        pathName: CancerTypes.path,
        uniqueKey: 'cancer-types-list',
      },
      {
        title: 'Doctor Change',
        pathName: DoctorChangeReasons.path,
        uniqueKey: 'doctor-change-reasons-list',
      },
      {
        title: 'Patient Statuses',
        pathName: PatientStatus.path,
        uniqueKey: 'patient-status-list',
      },
      {
        title: 'Clinical Dropout Reasons',
        pathName: ClinicalDropOutReasons.path,
        uniqueKey: 'clinical-drop-out-reasons-list',
      },
      {
        title: 'Non Clinical Dropout Reasons',
        pathName: NonClinicalDropOutReasons.path,
        uniqueKey: 'non-clinical-drop-out-reasons-list',
      },
    ],
  },
];

export default sidebarData;
