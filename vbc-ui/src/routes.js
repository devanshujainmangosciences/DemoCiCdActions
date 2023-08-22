/**
 * This module contains all the Routes used in the application
 * Always try to add new route in the end.
 */
export const Routes = {
  //login and signup
  Signin: {path: '/registration/sign-in'},
  Login: {path: '/registration/login'},
  Signup: {path: '/registration/sign-up'},
  Otp: {path: '/registration/otp'},
  CreatePassword: {path: '/registration/create-password'},
  ForgotPassword: {path: '/registration/forgot-password'},
  ResetPassword: {path: '/registration/reset-password'},

  //Terms and Privacy
  PrivacyPolicy: {path: '/privacy-policy'},
  TermsOfUse: {path: '/terms-of-use'},
  //error pages
  Lock: {path: '/errors/lock'},
  NotFound: {path: '/errors/404'},
  NotPermitted: {path: '/errors/not-permitted'},
  ServerError: {path: '/errors/500'},

  //Mango Executive
  MangoExecutivePatients: {path: '/admin/mango-executive/patients'},
  MangoExecutiveProfile: {path: '/admin/mango-executive/profile'},
  MangoExecutiveSettings: {path: '/admin/mango-executive/settings'},
  MangoExecutivePushNotification: {
    path: '/admin/mango-executive/send-push-notification',
  },
  MangoExecutiveIncompletePatients: {
    path: '/admin/mango-executive/incomplete-patients',
  },
  MangoExecutivePendingApprovalPatients: {
    path: '/admin/mango-executive/pending-approval-patients',
  },
  SecuredSubventionRebate: {path: '/secured-forward'},

  //Landing screen
  LandingPage: {path: '/'},
  Messages: {path: '/patient/messages'},
  //clinical details
  PatientTimeline: {path: '/patient/clinicaldetails/patient-timeline'},
  LabReports: {path: '/patient/test-results/lab-reports'},
  RadiologyReports: {path: '/patient/test-results/radiology-reports'},
  OtherTests: {path: '/patient/test-results/other-tests'},
  SurgicalDetails: {path: '/patient/treatments/surgical-details'},
  RadiationTherapy: {path: '/patient/treatments/radiation-therapy'},
  OtherTreatment: {path: '/patient/treatments/other-treatment'},
  Medications: {path: '/patient/treatments/medications'},
  ClinicalNotes: {path: '/patient/clinicaldetails/clinical-notes'},
  Summaries: {path: '/patient/clinicaldetails/summaries'},

  //vbc program
  LoanApplication: {path: '/patient/pbp-program/loan-application'},
  PatientApplicant: {path: '/patient/pbp-program/applicants'},
  VbcSchedule: {path: '/patient/pbp-program/vbc-schedule'},
  DrugSchedule: {path: '/patient/pbp-program/drug-schedule'},

  // financial details
  LoanDetails: {path: '/patient/financialdetails/loan-details'},
  EmiDetails: {path: '/patient/financialdetails/emi-details'},

  //patient recorded outcomes
  Existing: {path: '/patient/patientreportedoutcomes/existing'},
  New: {path: '/patient/patientreportedoutcomes/new'},

  //communication
  Doctor: {path: '/patient/communication/doctor'},
  Lender: {path: '/patient/communication/lender'},

  //mango executive profile
  MangoProfile: {path: '/admin/mango-executive/profile'},
  MangoPatients: {path: '/admin/mango-executive/patients'},
  MangoSettings: {path: '/admin/mango-executive/settings'},

  // PatientDetails: {path: '/admin/patient-details/:id'},

  //Doctor

  DoctorProfile: {path: '/doctor/profile'},
  DoctorPatient: {path: '/doctor/patient'},
  DoctorSettings: {path: '/doctor/settings'},

  //patient profile
  MyProfile: {path: '/patient/profile/details'},
  CompleteProfile: {path: '/patient/profile/complete-profile'},
  FinancialInformation: {path: '/patient/profile/financial-information'},
  CareGiver: {path: '/patient/profile/caregiver'},
  Documents: {path: '/patient/profile/documents'},
  Resources: {path: '/patient/profile/resources'},
  Settings: {path: '/patient/profile/settings'},
  help: {path: '/patient/help'},

  //Patient Resources inner pages
  AboutCancer: {path: '/patient/profile/resources/about-cancer'},
  CompleteProfileApplicant: {path: '/applicant/profile/complete-profile'},
  IsCancerHereditary: {
    path: '/patient/profile/resources/about-cancer/is-cancer-hereditary',
  },
  CancerAllYouNeedToKnow: {
    path: '/patient/profile/resources/about-cancer/cancer-all-you-need-to-know',
  },
  BreastCancer: {path: '/patient/profile/resources/about-cancer/breast-cancer'},
  LungCancer: {path: '/patient/profile/resources/about-cancer/lung-cancer'},
  MythsAboutCancer: {
    path: '/patient/profile/resources/about-cancer/myths-about-cancer',
  },
  CancerTreatment: {path: '/patient/profile/resources/cancer-treatment'},
  KnowYourOptions: {
    path: '/patient/profile/resources/cancer-treatment/know-your-options',
  },
  ImmunoForCancer: {
    path: '/patient/profile/resources/cancer-treatment/immunotherapy',
  },
  BiomarkerForCancer: {
    path: '/patient/profile/resources/cancer-treatment/biomarker',
  },
  HealthAndWellness: {
    path: '/patient/profile/resources/health-wellness',
  },
  MaintaningSoundMentalHealth: {
    path: '/patient/profile/resources/health-wellness/mental-health',
  },
  Covid19: {
    path: '/patient/profile/resources/health-wellness/covid-19',
  },
  LifestyleChanges: {
    path: '/patient/profile/resources/health-wellness/lifestyle-changes',
  },
  Nutrition: {
    path: '/patient/profile/resources/health-wellness/nutrition',
  },

  CaregiverSupport: {
    path: '/patient/profile/resources/caregiver-support',
  },
  SuccessfulCaregiver: {
    path: '/patient/profile/resources/caregiver-support/successfull-caregiver',
  },
  SupportGroups: {
    path: '/patient/profile/resources/caregiver-support/support-groups',
  },

  //Applicant profile
  ProfileDetails: {path: '/applicant/profile/details'},
  ApplicantSettings: {path: '/applicant/profile/settings'},
  ApplicantApplicationOverview: {path: '/applicant/application-overview'},
  ApplicantFinancialInformation: {path: '/applicant/financial-information'},
  ApplicantStartLoan: {path: '/applicant/start-loan'},
  ApplicantDocuments: {path: '/applicant/documents'},
  ApplicantResources: {path: '/applicant/resources'},

  //Applicant Resources inner pages
  AboutCancerApplicant: {path: '/applicant/resources/about-cancer'},
  IsCancerHereditaryApplicant: {
    path: '/applicant/resources/about-cancer/is-cancer-hereditary',
  },
  CancerAllYouNeedToKnowApplicant: {
    path: '/applicant/resources/about-cancer/cancer-all-you-need-to-know',
  },
  BreastCancerApplicant: {
    path: '/applicant/resources/about-cancer/breast-cancer',
  },
  LungCancerApplicant: {path: '/applicant/resources/about-cancer/lung-cancer'},
  MythsAboutCancerApplicant: {
    path: '/applicant/resources/about-cancer/myths-about-cancer',
  },
  CancerTreatmentApplicant: {path: '/applicant/resources/cancer-treatment'},
  KnowYourOptionsApplicant: {
    path: '/applicant/resources/cancer-treatment/know-your-options',
  },
  ImmunoForCancerApplicant: {
    path: '/applicant/resources/cancer-treatment/immunotherapy',
  },
  BiomarkerForCancerApplicant: {
    path: '/applicant/resources/cancer-treatment/biomarker',
  },
  HealthAndWellnessApplicant: {
    path: '/applicant/resources/health-wellness',
  },
  MaintaningSoundMentalHealthApplicant: {
    path: '/applicant/resources/health-wellness/mental-health',
  },
  Covid19Applicant: {
    path: '/applicant/resources/health-wellness/covid-19',
  },
  LifestyleChangesApplicant: {
    path: '/applicant/resources/health-wellness/lifestyle-changes',
  },
  NutritionApplicant: {
    path: '/applicant/resources/health-wellness/nutrition',
  },

  CaregiverSupportApplicant: {
    path: '/applicant/resources/caregiver-support',
  },
  SuccessfulCaregiverApplicant: {
    path: '/applicant/resources/caregiver-support/successfull-caregiver',
  },
  SupportGroupsApplicant: {
    path: '/applicant/resources/caregiver-support/support-groups',
  },

  //admin panel RBAC and user management
  Resource: {path: '/admin/resource/list'},
  Permission: {path: '/admin/permission/list'},
  Route: {path: '/admin/route/list'},
  Users: {path: '/admin/users/listing'},
  NewUser: {path: '/admin/users/new'},
  UpdateUser: {path: '/admin/users/update/:id'},
  ViewUser: {path: '/admin/users/view/:id'},
  UpdateHospital: {path: '/admin/hospital/update/:id'},
  ViewHospital: {path: '/admin/hospital/get/:id'},
  UpdateManufacturer: {path: '/admin/manufacturer/update/:id'},
  ViewManufacturer: {path: '/admin/manufacturer/get/:id'},
  ViewDrug: {path: '/admin/drug/view/:id'},
  UpdateDrug: {path: '/admin/drug/update/:id'},
  UpdateDoctor: {path: '/admin/doctor/update/:id'},
  ViewDoctor: {path: '/admin/doctor/view/:id'},
  UserRoles: {path: '/user-roles'},
  NewHospital: {path: '/admin/hospital/create'},
  NewManufacturer: {path: '/admin/manufacturer/create'},
  NewDoctor: {path: '/admin/doctor/create'},
  Hospitals: {path: '/admin/hospital/listing'},
  Manufacturers: {path: '/admin/manufacturer/listing'},
  Doctors: {path: '/admin/doctor/listing'},
  Role: {path: '/admin/role/list'},
  RouteView: {path: '/admin/route/list'},
  NewDrug: {path: '/admin/drug/create'},
  Drugs: {path: '/admin/drug/listing'},
  Roles: {path: '/admin/roles/list'},
  NewRole: {path: '/admin/roles/new'},
  UpdateRole: {path: '/admin/roles/update/:id'},
  ViewRole: {path: '/admin/roles/view/:id'},
  Lenders: {path: '/admin/lenders/listing'},
  NewLender: {path: '/admin/lenders/new'},
  UpdateLender: {path: '/admin/lenders/update/:id'},
  ViewLender: {path: '/admin/lenders/view/:id'},
  VbcDrugSchedule: {path: '/admin/drug/pbp-drug-schedule'},
  newVbcDrugSchedule: {path: '/admin/drug/pbp-drug-schedule/create'},
  viewVbcDrugSchedule: {path: '/admin/drug/pbp-drug-schedule/get/:id'},
  updateVbcDrugSchedule: {path: '/admin/drug/pbp-drug-schedule/update/:id'},
  HolidayList: {path: '/admin/holiday-list'},
  NewHoliday: {path: '/admin/holiday/create'},
  EditHoliday: {path: '/admin/holiday/update/:id'},
  VbcProgramList: {path: '/admin/pbp-program'},
  NewVbcProgram: {path: '/admin/pbp-program/create'},
  EditVbcProgram: {path: '/admin/pbp-program/update/:id'},
  ViewVbcProgram: {path: '/admin/pbp-program/get/:id'},
  HospitalIpConfig: {path: '/admin/hospital/ip-config/list'},
  BackendVersionList: {path: '/admin/backend-version/list'},
  BackendVersionCreate: {path: '/admin/backend-version/new'},
  BackendVersionEdit: {path: '/admin/backend-version/update'},
  BackendVersionView: {path: '/admin/backend-version/view'},
  AndroidVersionList: {path: '/admin/android-version/list'},
  IosVersionList: {path: '/admin/ios-version/list'},

  //pharma screens
  //operations
  PatientRecruitmentAndConversion: {
    path: '/pharma/operations/patient-recruitments-and-conversion',
  },
  NewPatient: {path: '/pharma/operations/new-patients-starts'},
  PatientLongitudinality: {
    path: '/pharma/operations/patient-longitudinality',
  },

  //clinical
  SurvivalAndResponse: {path: '/pharma/clinical/survival-and-response'},
  DiscontinuationAndAdverseEvents: {
    path: '/pharma/clinical/discontinuation-and-adverse-events',
  },
  PatientReportedOutcomes: {
    path: '/pharma/clinical/patient-reported-outcomes',
  },
  IndividualPatientData: {path: '/pharma/clinical/individual-patient-data'},

  //financial
  SalesAndFreePacks: {path: '/pharma/financial/sales-and-free-packs'},
  PerPatientRevenue: {path: '/pharma/financial/per-patient-Revenue'},

  //Documentation
  Documentation: {path: '/pharma/documentation'},

  //For managing Finance Role
  FinancePatients: {path: '/finance/patients'},
  FinanceProfile: {path: '/finance/profile'},
  FinanceSettings: {path: '/finance/settings'},
  // for managing user roles
  //MASTER DATA Routes
  Countries: {path: '/admin/countries/list'},
  States: {path: '/admin/states/list'},
  Cities: {path: '/admin/cities/list'},
  Banks: {path: '/admin/banks/list'},
  GrossAnnualIncomes: {path: '/admin/grossAnnualIncomes/list'},
  IncomeRange: {path: '/admin/income-range/list'},
  CompanyTypes: {path: '/admin/company-types/list'},
  Employers: {path: '/admin/employers/list'},
  Experiences: {path: '/admin/experiences/list'},
  IndustryTypes: {path: '/admin/industry-types/list'},
  Languages: {path: '/admin/languages/list'},
  NatureOfBusiness: {path: '/admin/nature-of-business/list'},
  Occupations: {path: '/admin/occupations/list'},
  Professions: {path: '/admin/professions/list'},
  ResidenceTypes: {path: '/admin/residence-types/list'},
  YearsInBusiness: {path: '/admin/years-in-business/list'},
  EducationLevels: {path: '/admin/education-levels/list'},
  Relationships: {path: '/admin/relationships/list'},
  CancerTypes: {path: '/admin/cancer-types/list'},
  DoctorChangeReasons: {path: '/admin/doctor-change-reasons/list'},
  ClinicalDropOutReasons: {path: '/admin/clincal-drop-out-reasons/list'},
  NonClinicalDropOutReasons: {path: '/admin/non-clincal-drop-out-reasons/list'},
  InsuranceCompanies: {path: '/admin/insurance-companies/list'},
  PatientStatus: {path: '/admin/patient-status/list'},
};

/** Array or routes that is accessible to all types of user */
export const GenericRoutes = [Routes.UserRoles];
