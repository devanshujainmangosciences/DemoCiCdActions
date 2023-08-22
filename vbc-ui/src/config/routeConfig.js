/**
 * This module contains all the routes in the application along with their component to render for that route.
 * Always try to add new route at the end.
 */
import {THEME_MODULE, ROLES} from '../constants';
import {Routes} from '../routes';
import React from 'react';
const Messages = React.lazy(() => import('../pages/Messages'));
const UserRoles = React.lazy(() => import('../pages/UserRoles'));
const ApplicationOverview = React.lazy(() =>
  import('../pages/ApplicationOverview')
);
const ApplicantFinancialInformation = React.lazy(() =>
  import('../pages/ApplicantFinancialInformation')
);
const StartLoanApplication = React.lazy(() =>
  import('../pages/StartLoanApplication/index')
);
const LoanApplication = React.lazy(() =>
  import('../pages/vbc-program/LoanApplication')
);
const Applicant = React.lazy(() => import('../pages/vbc-program/Applicant'));
const PatientTimeline = React.lazy(() =>
  import('../pages/clinical-details/PatientTimeline')
);
const ClinicalNotes = React.lazy(() =>
  import('../pages/clinical-details/ClinicalNotes')
);
const LabReports = React.lazy(() =>
  import('../pages/clinical-details/LabReports')
);
const Medications = React.lazy(() =>
  import('../pages/clinical-details/Medications')
);
const RadiologyReports = React.lazy(() =>
  import('../pages/clinical-details/RadiologyReports')
);
const SurgicalDetails = React.lazy(() =>
  import('../pages/clinical-details/SurgicalDetails')
);
// const Summaries = React.lazy(() => import('../pages/clinical-details/Summaries'));
// const DiscontinuationAndAdverseEvents = React.lazy(() =>
//   import('../pages/clinical-details/DiscontinuationAndAdverseEvents')
// );
// const IndividualPatientData = React.lazy(() =>
//   import('../pages/clinical-details/IndividualPatientData')
// );
// const SurvivalAndResponse = React.lazy(() =>
//   import('../pages/clinical-details/SurvivalandResponse')
// );
// const PatientReportedOutcomes = React.lazy(() =>
//   import('../pages/clinical-details/PatientReportedOutcomes')
// );

const LoanDetails = React.lazy(() =>
  import('../pages/financial-details/LoanDetails')
);
const EmiDetails = React.lazy(() =>
  import('../pages/financial-details/EmiDetails')
);
// const PerPatientRevenue = React.lazy(() =>
//   import('../pages/financial-details/PerPatientRevenue')
// );
// const SalesAndFreePacks = React.lazy(() =>
//   import('../pages/financial-details/SalesAndFreePacks')
// );

const ServerError = React.lazy(() => import('../pages/errors/ServerError'));
const NotPermitted = React.lazy(() => import('../pages/errors/NotPermitted'));
const NotFound = React.lazy(() => import('../pages/errors/NotFound'));
const Signin = React.lazy(() => import('../pages/registration/Signin'));
const Signup = React.lazy(() => import('../pages/registration/Signup'));
const ForgotPassword = React.lazy(() =>
  import('../pages/registration/ForgotPassword')
);
const ResetPassword = React.lazy(() =>
  import('../pages/registration/ResetPassword')
);
const Otp = React.lazy(() => import('../pages/registration/Otp'));
const Login = React.lazy(() => import('../pages/registration/Login'));
const CreatePassword = React.lazy(() =>
  import('../pages/registration/CreatePassword')
);
const Users = React.lazy(() => import('../pages/users/Users'));
const NewUser = React.lazy(() => import('../pages/users/NewUser'));
const Lenders = React.lazy(() => import('../pages/lender/Lenders'));
const NewLender = React.lazy(() => import('../pages/lender/NewLender'));
// const PatientRecruitmentAndConversion = React.lazy(() =>
//   import('../pages/operations/PatientRecruitmentAndConversion')
// );
// const NewPatient = React.lazy(() => import('../pages/operations/NewPatient'));
// const PatientLongitudinality = React.lazy(() =>
//   import('../pages/operations/PatientLongitudinality')
// );
const Roles = React.lazy(() => import('../pages/roles/Roles'));
const NewRole = React.lazy(() => import('../pages/roles/NewRole'));
const Doctor = React.lazy(() => import('../pages/communication/Doctor'));
const Lender = React.lazy(() => import('../pages/communication/Lender'));

const Existing = React.lazy(() =>
  import('../pages/patient-recorded-outcomes/Existing')
);
const New = React.lazy(() => import('../pages/patient-recorded-outcomes/New'));
const Resource = React.lazy(() => import('../pages/resources/Resource'));
const Permission = React.lazy(() => import('../pages/permission/Permission'));
const HospitalIpConfig = React.lazy(() =>
  import('../pages/hospital-ip-config/HospitalIpConfig')
);
const BackendVersionList = React.lazy(() =>
  import('../pages/mobile-version-management/BackendVersionList')
);
const NewBackendVersion = React.lazy(() =>
  import('../pages/mobile-version-management/NewBackendVersion')
);
const AndroidVersionList = React.lazy(() =>
  import('../pages/mobile-version-management/AndroidVersionList')
);
const IosVersionList = React.lazy(() =>
  import('../pages/mobile-version-management/IosVersionList')
);
const RouteController = React.lazy(() => import('../pages/route/Route'));

const NewDrug = React.lazy(() => import('../pages/drugs/NewDrug'));
const Drugs = React.lazy(() => import('../pages/drugs/Drugs'));

const Hospitals = React.lazy(() => import('../pages/hospital/Hospitals'));
const NewHospital = React.lazy(() => import('../pages/hospital/NewHospital'));

const Manufacturers = React.lazy(() =>
  import('../pages/manufacturer/Manufacturers')
);
const NewManufacturer = React.lazy(() =>
  import('../pages/manufacturer/NewManufacturer')
);

const MyProfile = React.lazy(() => import('../pages/profile/MyProfile'));
const FinancialInformation = React.lazy(() =>
  import('../pages/profile/FinancialInformation')
);
const CareGiver = React.lazy(() => import('../pages/profile/CareGiver'));
const Settings = React.lazy(() => import('../pages/profile/Settings'));
const Documents = React.lazy(() => import('../pages/profile/Documents'));
const CompleteProfile = React.lazy(() =>
  import('../pages/profile/CompleteProfile')
);
const ResourcesNewDesign = React.lazy(() =>
  import('../pages/profile/ResourcesNewDesign')
);
const Help = React.lazy(() => import('../pages/profile/Help'));

const Doctors = React.lazy(() => import('../pages/doctor/Doctors'));
const NewDoctor = React.lazy(() => import('../pages/doctor/NewDoctor'));

const VbcSchedule = React.lazy(() =>
  import('../pages/vbc-program/VbcSchedule')
);
const DrugSchedule = React.lazy(() =>
  import('../pages/vbc-program/DrugSchedule')
);
const MangoExecutive = React.lazy(() => import('../pages/MangoExecutive'));
const MangoExecutiveProfile = React.lazy(() =>
  import('../pages/mango-executive/MangoExecutiveProfile')
);
const SecuredSubventionRebate = React.lazy(() =>
  import('../pages/mango-executive/SecuredSubventionRebate')
);
const SendPushNotification = React.lazy(() =>
  import('../pages/mango-executive/SendPushNotification')
);
const InCompletePatientList = React.lazy(() =>
  import('../pages/mango-executive/InCompletePatientList')
);
const ApprovalPatientList = React.lazy(() =>
  import('../pages/mango-executive/ApprovalPatientList')
);
const DoctorLandingPage = React.lazy(() =>
  import('../pages/doctor/DoctorLandingPage')
);
const DoctorProfile = React.lazy(() => import('../pages/doctor/DoctorProfile'));

const OtherTests = React.lazy(() =>
  import('../pages/clinical-details/OtherTests')
);
const RadiationTherapy = React.lazy(() =>
  import('../pages/clinical-details/RadiationTherapy')
);
const OtherTreatment = React.lazy(() =>
  import('../pages/clinical-details/OtherTreatment')
);

const TermsOfUse = React.lazy(() => import('../pages/terms-policy/TermsOfUse'));
const PrivacyPolicy = React.lazy(() =>
  import('../pages/terms-policy/PrivacyPolicy')
);

const VbcDrugSchedule = React.lazy(() =>
  import('../pages/vbc-drug-schedule/VbcDrugSchedule')
);
const NewVbcDrugSchedule = React.lazy(() =>
  import('../pages/vbc-drug-schedule/NewVbcDrugSchedule')
);

const Holiday = React.lazy(() => import('../pages/holiday/Holiday'));
const NewHoliday = React.lazy(() => import('../pages/holiday/NewHoliday'));

const AdminVbcProgram = React.lazy(() =>
  import('../pages/admin-vbc-program/AdminVbcProgram')
);
const NewAdminVbcProgram = React.lazy(() =>
  import('../pages/admin-vbc-program/NewAdminVbcProgram')
);

// const PatientDetails = React.lazy(() => import('../pages/PatientDetails'));

const AboutCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/AboutCancer')
);
const BreastCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/BreastCancer')
);
const CancerAllYouNeedToKnow = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/CancerAllYouNeedToKnow')
);
const IsCancerHereditary = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/IsCancerHereditary')
);
const LungCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/LungCancer')
);
const MythsAboutCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/about-cancer/MythsAboutCancer')
);
const BiomarkerForCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/cancer-treatment/BiomarkerForCancer')
);
const CancerTreatment = React.lazy(() =>
  import('../pages/resources-inner-pages/cancer-treatment/CancerTreatment')
);
const ImmunoForCancer = React.lazy(() =>
  import('../pages/resources-inner-pages/cancer-treatment/ImmunoForCancer')
);
const KnowYourOptions = React.lazy(() =>
  import('../pages/resources-inner-pages/cancer-treatment/KnowYourOptions')
);
const CaregiverSupport = React.lazy(() =>
  import('../pages/resources-inner-pages/caregiverSupport/CaregiverSupport')
);
const SuccessfulCaregiver = React.lazy(() =>
  import('../pages/resources-inner-pages/caregiverSupport/SuccessfulCaregiver')
);
const SupportGroups = React.lazy(() =>
  import('../pages/resources-inner-pages/caregiverSupport/SupportGroups')
);
const Covid19 = React.lazy(() =>
  import('../pages/resources-inner-pages/healthAndWellness/Covid19')
);
const HealthAndWellness = React.lazy(() =>
  import('../pages/resources-inner-pages/healthAndWellness/HealthAndWellness')
);
const LifestyleChanges = React.lazy(() =>
  import('../pages/resources-inner-pages/healthAndWellness/LifestyleChanges')
);
const MaintaningSoundMentalHealth = React.lazy(() =>
  import(
    '../pages/resources-inner-pages/healthAndWellness/MaintaningSoundMentalHealth'
  )
);
const Nutrition = React.lazy(() =>
  import('../pages/resources-inner-pages/healthAndWellness/Nutrition')
);
//Finance
const FinanceProfile = React.lazy(() =>
  import('../pages/finance/FinanceProfile')
);
//MASTER DATA UI  PAGES
const CountriesList = React.lazy(() =>
  import('../pages/createUIAdminPages/Countries/CountriesList')
);
const StateList = React.lazy(() =>
  import('../pages/createUIAdminPages/States/StatesList')
);
const CityList = React.lazy(() =>
  import('../pages/createUIAdminPages/Cities/CitiesList')
);
const BanksList = React.lazy(() =>
  import('../pages/createUIAdminPages/Banks/BanksList')
);
// const GrossannualincomeList = React.lazy(() =>
//   import('../pages/createUIAdminPages/GrossAnnualIncome/GrossannualincomeList')
// );
// const IncomerangeList = React.lazy(() =>
//   import('../pages/createUIAdminPages/IncomeRange/IncomerangeList')
// );
const CancerTypesList = React.lazy(() =>
  import('../pages/createUIAdminPages/CancerType/CancertypeList')
);
const ClinicaldropoutreasonsList = React.lazy(() =>
  import(
    '../pages/createUIAdminPages/ClinicalDropOutReasons/ClinicaldropoutreasonsList'
  )
);
const NonClinicalDropOutReasonsList = React.lazy(() =>
  import(
    '../pages/createUIAdminPages/NonClinicalDropOutReasons/NonclinicaldropoutreasonsList'
  )
);
const CompanytypesList = React.lazy(() =>
  import('../pages/createUIAdminPages/CompanyTypes/CompanytypesList')
);
const DoctorChangeReasonsList = React.lazy(() =>
  import(
    '../pages/createUIAdminPages/DoctorChangeReasons/DoctorchangereasonsList'
  )
);
const EducationlevelList = React.lazy(() =>
  import('../pages/createUIAdminPages/EducationLevel/EducationlevelList')
);
const EmployersList = React.lazy(() =>
  import('../pages/createUIAdminPages/Employers/EmployersList')
);
// const ExperiencesList = React.lazy(() =>
//   import('../pages/createUIAdminPages/Experiences/ExperiencesList')
// );
const IndustryTypesList = React.lazy(() =>
  import('../pages/createUIAdminPages/IndustryTypes/IndustrytypesList')
);
const InsurancecompaniesList = React.lazy(() =>
  import(
    '../pages/createUIAdminPages/InsuranceCompanies/InsurancecompaniesList'
  )
);
const LanguagesList = React.lazy(() =>
  import('../pages/createUIAdminPages/Languages/LanguagesList')
);
const NatureofbusinessList = React.lazy(() =>
  import('../pages/createUIAdminPages/NatureOfBusiness/NatureofbusinessList')
);
const OccupationsList = React.lazy(() =>
  import('../pages/createUIAdminPages/Occupations/OccupationsList')
);
const PatientstatusList = React.lazy(() =>
  import('../pages/createUIAdminPages/PatientStatus/PatientstatusList')
);
const ProfessionsList = React.lazy(() =>
  import('../pages/createUIAdminPages/Professions/ProfessionsList')
);
const RelationshipsList = React.lazy(() =>
  import('../pages/createUIAdminPages/Relationships/RelationshipsList')
);
const ResidencetypesList = React.lazy(() =>
  import('../pages/createUIAdminPages/ResidenceTypes/ResidencetypesList')
);
// const YearsinbusinessList = React.lazy(() =>
//   import('../pages/createUIAdminPages/YearsInBusiness/YearsinbusinessList')
// );

export const routeConfig = [
  //login and signup
  {
    id: 1,
    path: Routes.Signin.path,
    component: Signin,
    isProtected: false,
    isSidebar: false,
  },
  {
    id: 2,
    path: Routes.Login.path,
    component: Signin,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 3,
    path: Routes.Signup.path,
    component: Signup,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 4,
    path: Routes.Otp.path,
    component: Otp,
    isProtected: false,
    isSidebar: false,
  },
  {
    id: 5,
    path: Routes.ForgotPassword.path,
    component: ForgotPassword,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 6,
    path: Routes.ResetPassword.path,
    component: ResetPassword,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 7,
    path: Routes.CreatePassword.path,
    component: CreatePassword,
    isSidebar: false,
    isProtected: false,
  },

  //error pages
  // Lock: { path: '/errors/lock' },
  {
    id: 8,
    path: Routes.NotFound.path,
    component: NotFound,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 9,
    path: Routes.NotPermitted.path,
    component: NotPermitted,
    isSidebar: false,
    isProtected: false,
  },
  {
    id: 9.1,
    path: Routes.ServerError.path,
    component: ServerError,
    isSidebar: false,
    isProtected: false,
  },

  //Patient Routes
  {
    id: 10,
    path: Routes.LandingPage.path,
    component: Login,
    isProtected: true,
    isSidebar: false,
  },
  {
    id: 11,
    path: Routes.Messages.path,
    component: Messages,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'messages',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'landingScreen'},
    ],
  },
  //clinical details
  {
    id: 12,
    path: Routes.PatientTimeline.path,
    component: PatientTimeline,
    isProtected: true,
    role: ROLES.PATIENT,
    isSidebar: true,
    theme: THEME_MODULE.PATIENT,
    translatePage: 'patientTimeline',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'clinicalDetails'},
      {id: 3, name: 'patientTimeline'},
    ],
  },
  {
    id: 13,
    path: Routes.ClinicalNotes.path,
    component: ClinicalNotes,
    isProtected: true,
    role: ROLES.PATIENT,
    isSidebar: true,
    theme: THEME_MODULE.PATIENT,
    translatePage: 'clinicalNotes',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'clinicalNotes'},
    ],
  },
  {
    id: 14,
    path: Routes.LabReports.path,
    component: LabReports,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'labReports',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'testResults'},
      {id: 3, name: 'labReports'},
    ],
  },
  {
    id: 15,
    path: Routes.Medications.path,
    component: Medications,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'medications',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'treatment'},
      {id: 3, name: 'medications'},
    ],
  },
  {
    id: 16,
    path: Routes.RadiologyReports.path,
    component: RadiologyReports,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'radiologyReports',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'testResults'},
      {id: 3, name: 'radiology'},
    ],
  },
  {
    id: 86,
    path: Routes.OtherTests.path,
    component: OtherTests,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'otherTests',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'testResults'},
      {id: 3, name: 'otherTests'},
    ],
  },
  {
    id: 87,
    path: Routes.RadiationTherapy.path,
    component: RadiationTherapy,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'radiationTherapy',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'treatment'},
      {id: 3, name: 'radiationTherapy'},
    ],
  },
  {
    id: 88,
    path: Routes.OtherTreatment.path,
    component: OtherTreatment,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'otherTreatment',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'treatment'},
      {id: 3, name: 'otherTreatment'},
    ],
  },
  {
    id: 17,
    path: Routes.SurgicalDetails.path,
    component: SurgicalDetails,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'surgicalDetails',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'treatment'},
      {id: 3, name: 'surgery'},
    ],
  },
  // {
  //   id: 18,
  //   path: Routes.Summaries.path,
  //   component: Summaries,
  //   isProtected: true,
  //   role: ROLES.PATIENT,
  //   theme: THEME_MODULE.PATIENT,
  //   isSidebar: true,
  //   translatePage: 'summaries',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'clinicalDetails'},
  //     {id: 3, name: 'summaries'},
  //   ],
  // },

  //vbc program
  {
    id: 19,
    path: Routes.LoanApplication.path,
    component: LoanApplication,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'loanApplication',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'PBP Program'},
      {id: 3, name: 'Application'},
    ],
  },
  {
    id: 20,
    path: Routes.PatientApplicant.path,
    component: Applicant,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'applicants',
    breadcrumb: [
      {id: 1, name: 'Home'},
      {id: 2, name: 'PBP Program'},
      {id: 3, name: 'Applicants'},
    ],
  },
  {
    id: 21,
    path: Routes.VbcSchedule.path,
    component: VbcSchedule,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'vbcSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbcProgram'},
      {id: 3, name: 'vbcSchedule'},
    ],
  },
  {
    id: 22,
    path: Routes.DrugSchedule.path,
    component: DrugSchedule,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'drugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbcProgram'},
      {id: 3, name: 'drugSchedule'},
    ],
  },

  // financial details
  {
    id: 23,
    path: Routes.LoanDetails.path,
    component: LoanDetails,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'loanDetails',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'financialDetails'},
      {id: 3, name: 'loanDetails'},
    ],
  },
  {
    id: 24,
    path: Routes.EmiDetails.path,
    component: EmiDetails,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'emiDetails',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'financialDetails'},
      {id: 3, name: 'loanDetails'},
    ],
  },

  //patient recorded outcomes
  {
    id: 25,
    path: Routes.Existing.path,
    component: Existing,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'existing',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'patientReportedOutcomes'},
      {id: 3, name: 'existing'},
    ],
  },
  {
    id: 26,
    path: Routes.New.path,
    component: New,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'neww',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'patientReportedOutcomes'},
      {id: 3, name: 'new'},
    ],
  },

  //communication
  {
    id: 27,
    path: Routes.Doctor.path,
    component: Doctor,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'doctor',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'communication'},
      {id: 3, name: 'doctor'},
    ],
  },
  {
    id: 28,
    path: Routes.Lender.path,
    component: Lender,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'lender',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'communication'},
      {id: 3, name: 'lender'},
    ],
  },

  //profile
  {
    id: 29,
    path: Routes.MyProfile.path,
    component: MyProfile,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile'},
    ],
  },
  {
    id: 30,
    path: Routes.CompleteProfile.path,
    component: CompleteProfile,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: false,
  },
  {
    id: 124,
    path: Routes.CompleteProfileApplicant.path,
    component: CompleteProfile,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: false,
  },
  {
    id: 31,
    path: Routes.FinancialInformation.path,
    component: FinancialInformation,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'financialInformation'},
    ],
  },
  {
    id: 32,
    path: Routes.CareGiver.path,
    component: CareGiver,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile'},
      {id: 3, name: 'caregivers'},
    ],
  },
  {
    id: 33,
    path: Routes.Documents.path,
    component: Documents,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'documents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 2, name: 'documents'},
    ],
  },
  {
    id: 34,
    path: Routes.Settings.path,
    component: Settings,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'settings',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 2, name: 'settings'},
    ],
  },

  //Mango Executive Pages
  {
    id: 35,
    path: Routes.MangoExecutiveProfile.path,
    component: MangoExecutiveProfile,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile'},
    ],
  },
  {
    id: 36,
    path: Routes.MangoExecutivePatients.path,
    component: MangoExecutive,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'mangoExecutive',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'patients'},
    ],
  },
  {
    id: 37,
    path: Routes.MangoExecutiveSettings.path,
    component: Settings,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'settings',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'settings'},
    ],
  },
  {
    id: 37,
    path: Routes.SecuredSubventionRebate.path,
    component: SecuredSubventionRebate,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'settings',
  },
  // Applicant Pages
  {
    id: 38,
    path: Routes.ProfileDetails.path,
    component: MyProfile,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile'},
    ],
  },
  {
    id: 39,
    path: Routes.ApplicantSettings.path,
    component: Settings,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'settings'},
    ],
  },
  {
    id: 40,
    path: Routes.ApplicantApplicationOverview.path,
    component: ApplicationOverview,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'applicationOverview',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'applicationOverview'},
    ],
  },
  {
    id: 41,
    path: Routes.ApplicantFinancialInformation.path,
    component: ApplicantFinancialInformation,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'financialInformation'},
    ],
  },
  {
    id: 42,
    path: Routes.ApplicantStartLoan.path,
    component: StartLoanApplication,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'loanApplication',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'completeApplication'},
    ],
  },
  {
    id: 43,
    path: Routes.ApplicantDocuments.path,
    component: Documents,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'documents'},
    ],
  },
  {
    id: 44,
    path: Routes.ApplicantResources.path,
    component: ResourcesNewDesign,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources'},
    ],
  },
  //Admin Routes
  {
    id: 45,
    path: Routes.Users.path,
    component: Users,
    isProtected: true,
    role: ROLES.ADMIN,
    isSidebar: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'users',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'users'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 46,
    path: Routes.NewUser.path,
    component: NewUser,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newUser',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'users', push: Routes.Users.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 47,
    path: Routes.UpdateUser.path,
    component: NewUser,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newUser',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'users', push: Routes.Users.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 48,
    path: Routes.ViewUser.path,
    component: NewUser,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'viewUser',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'users', push: Routes.Users.path},
      {id: 3, name: 'view'},
    ],
  },

  {
    id: 49,
    path: Routes.Lenders.path,
    component: Lenders,
    isProtected: true,
    role: ROLES.ADMIN,
    isSidebar: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'lenders',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'lenders'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 50,
    path: Routes.NewLender.path,
    component: NewLender,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newLender',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'lenders', push: Routes.Lenders.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 51,
    path: Routes.UpdateLender.path,
    component: NewLender,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newLender',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'lenders', push: Routes.Lenders.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 52,
    path: Routes.ViewLender.path,
    component: NewLender,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'viewLender',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'lenders', push: Routes.Lenders.path},
      {id: 3, name: 'view'},
    ],
  },

  //RBAC
  {
    id: 53,
    path: Routes.Resource.path,
    component: Resource,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'resource',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'resources'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 54,
    path: Routes.Permission.path,
    component: Permission,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'permission',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'permissions'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 55,
    path: Routes.Route.path,
    component: RouteController,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'route',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'routes'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 56,
    path: Routes.Roles.path,
    component: Roles,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'roles',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'roles'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 57,
    path: Routes.NewRole.path,
    component: NewRole,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newRole',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'roles', push: Routes.Roles.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 58,
    path: Routes.UpdateRole.path,
    component: NewRole,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newRole',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'roles', push: Routes.Roles.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 59,
    path: Routes.ViewRole.path,
    component: NewRole,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'newRole',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'roles', push: Routes.Roles.path},
      {id: 3, name: 'view'},
    ],
  },

  {
    id: 60,
    path: Routes.Hospitals.path,
    component: Hospitals,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'hospitals',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'hospitals'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 61,
    path: Routes.NewHospital.path,
    component: NewHospital,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'hospitals',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'hospitals', push: Routes.Hospitals.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 62,
    path: Routes.UpdateHospital.path,
    component: NewHospital,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'hospitals',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'hospital', push: Routes.Hospitals.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 63,
    path: Routes.ViewHospital.path,
    component: NewHospital,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'hospitals',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'hospitals', push: Routes.Hospitals.path},
      {id: 3, name: 'view'},
    ],
  },
  {
    id: 64,
    path: Routes.Doctors.path,
    component: Doctors,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'doctor',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'doctors'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 65,
    path: Routes.NewDoctor.path,
    component: NewDoctor,
    isProtected: true,
    role: ROLES.ADMIN,
    isSidebar: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'doctor',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'doctors', push: Routes.Doctors.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 66,
    path: Routes.UpdateDoctor.path,
    component: NewDoctor,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'doctor',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'doctors', push: Routes.Doctors.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 67,
    path: Routes.ViewDoctor.path,
    component: NewDoctor,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'doctor',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'doctors', push: Routes.Doctors.path},
      {id: 3, name: 'view'},
    ],
  },
  {
    id: 68,
    path: Routes.Manufacturers.path,
    component: Manufacturers,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'manufacturers'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 69,
    path: Routes.NewManufacturer.path,
    component: NewManufacturer,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'manufacturers', push: Routes.Manufacturers.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 70,
    path: Routes.UpdateManufacturer.path,
    component: NewManufacturer,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'manufacturers', push: Routes.Manufacturers.path},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 71,
    path: Routes.ViewManufacturer.path,
    component: NewManufacturer,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'manufacturers', push: Routes.Manufacturers.path},
      {id: 3, name: 'view'},
    ],
  },
  {
    id: 72,
    path: Routes.Drugs.path,
    component: Drugs,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'drugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'drugs'},
      {id: 3, name: 'list'},
    ],
  },
  {
    id: 73,
    path: Routes.NewDrug.path,
    component: NewDrug,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'drugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'drugs', push: Routes.Drugs.path},
      {id: 3, name: 'new'},
    ],
  },
  {
    id: 74,
    path: Routes.ViewDrug.path,
    component: NewDrug,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'drugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'drugs', push: Routes.Drugs.path},
      {id: 3, name: 'view'},
    ],
  },
  {
    id: 75,
    path: Routes.UpdateDrug.path,
    component: NewDrug,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'drugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'drugs', push: Routes.Drugs.path},
      {id: 3, name: 'update'},
    ],
  },

  //pharma Routes

  //operations
  // {
  //   id: 76,
  //   path: Routes.PatientRecruitmentAndConversion.path,
  //   component: PatientRecruitmentAndConversion,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'patientRecruitment'},
  //   ],
  // },
  // {
  //   id: 77,
  //   path: Routes.NewPatient.path,
  //   component: NewPatient,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'newPatient'},
  //   ],
  // },
  // {
  //   id: 78,
  //   path: Routes.PatientLongitudinality.path,
  //   component: PatientLongitudinality,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'patientLongitudinality'},
  //   ],
  // },

  //clinical
  // {
  //   id: 79,
  //   path: Routes.SurvivalAndResponse.path,
  //   component: SurvivalAndResponse,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'survivalAndResponse'},
  //   ],
  // },
  // {
  //   id: 80,
  //   path: Routes.DiscontinuationAndAdverseEvents.path,
  //   component: DiscontinuationAndAdverseEvents,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'discontinuation'},
  //   ],
  // },
  // {
  //   id: 81,
  //   path: Routes.PatientReportedOutcomes.path,
  //   component: PatientReportedOutcomes,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'patientReportedOutcomes'},
  //   ],
  // },
  // {
  //   id: 82,
  //   path: Routes.IndividualPatientData.path,
  //   component: IndividualPatientData,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: true,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'individualPatientData'},
  //   ],
  // },

  //financial
  // {
  //   id: 83,
  //   path: Routes.SalesAndFreePacks.path,
  //   component: SalesAndFreePacks,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: false,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'salesAndFreePack'},
  //   ],
  // },
  // {
  //   id: 84,
  //   path: Routes.PerPatientRevenue.path,
  //   component: PerPatientRevenue,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   isProtected: false,
  //   theme: THEME_MODULE.PHARMA,
  //   translatePage: 'newPatient',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'perPatientRevenue'},
  //   ],
  // },

  //Documentation
  // {
  //   id: 85,
  //   path: Routes.Documentation.path,
  //   component: New,
  //   isSidebar: true,
  //   role: ROLES.PHARMA,
  //   theme: THEME_MODULE.PHARMA,
  //   isProtected: true,
  // },

  // for managing user roles
  {
    id: 86,
    path: Routes.UserRoles.path,
    component: UserRoles,
    isSidebar: false,
    isProtected: true,
  },
  //Privacy Policy

  {
    id: 87,
    path: Routes.PrivacyPolicy.path,
    component: PrivacyPolicy,
    isProtected: true,
    role: ROLES.PATIENT,
    // theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'privacyPolicy',
    breadcrumb: [
      {id: 1, name: 'Home'},
      {id: 2, name: 'Privacy Policy'},
    ],
  },
  {
    id: 88,
    path: Routes.TermsOfUse.path,
    component: TermsOfUse,
    isProtected: true,
    role: ROLES.PATIENT,
    // theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'termsofuse',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'termsOfUse'},
    ],
  },
  {
    id: 89,
    path: Routes.help.path,
    component: Help,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'help',
    breadcrumb: [
      {id: 1, name: 'Home'},
      {id: 3, name: 'Help'},
    ],
  },
  {
    id: 90,
    path: Routes.Resources.path,
    component: ResourcesNewDesign,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources'},
    ],
  },
  //DOCTOR
  {
    id: 91,
    path: Routes.DoctorPatient.path,
    component: DoctorLandingPage,
    isProtected: true,
    role: ROLES.DOCTOR,
    theme: THEME_MODULE.DOCTOR,
    isSidebar: true,
    translatePage: 'mangoExecutive',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'patients'},
    ],
  },
  {
    id: 92,
    path: Routes.DoctorProfile.path,
    component: DoctorProfile,
    isProtected: true,
    role: ROLES.DOCTOR,
    theme: THEME_MODULE.DOCTOR,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile'},
    ],
  },
  {
    id: 93,
    path: Routes.DoctorSettings.path,
    component: Settings,
    isProtected: true,
    role: ROLES.DOCTOR,
    theme: THEME_MODULE.DOCTOR,
    isSidebar: true,
    translatePage: 'settings',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'settings'},
    ],
  },
  {
    id: 94,
    path: Routes.VbcDrugSchedule.path,
    component: VbcDrugSchedule,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'vbcDrugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbc-drug-schedule'},
    ],
  },
  {
    id: 95,
    path: Routes.newVbcDrugSchedule.path,
    component: NewVbcDrugSchedule,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'vbcDrugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbc-drug-schedule'},
      {id: 3, name: 'create-new'},
    ],
  },
  {
    id: 96,
    path: Routes.updateVbcDrugSchedule.path,
    component: NewVbcDrugSchedule,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'vbcDrugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbc-drug-schedule'},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 97,
    path: Routes.viewVbcDrugSchedule.path,
    component: NewVbcDrugSchedule,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'vbcDrugSchedule',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'vbc-drug-schedule'},
      {id: 3, name: 'view'},
    ],
  },
  {
    id: 98,
    path: Routes.HolidayList.path,
    component: Holiday,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'holiday',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'holiday-list'},
    ],
  },
  {
    id: 99,
    path: Routes.NewHoliday.path,
    component: NewHoliday,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'holiday',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'holiday'},
      {id: 3, name: 'create-new'},
    ],
  },
  {
    id: 100,
    path: Routes.EditHoliday.path,
    component: NewHoliday,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'holiday',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'holiday'},
      {id: 3, name: 'update'},
    ],
  },
  {
    id: 101,
    path: Routes.VbcProgramList.path,
    component: AdminVbcProgram,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'pbp-program'},
    ],
  },
  {
    id: 102,
    path: Routes.EditVbcProgram.path,
    component: NewAdminVbcProgram,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'pbp-program'},
      {id: 2, name: 'edit'},
    ],
  },
  {
    id: 103,
    path: Routes.NewVbcProgram.path,
    component: NewAdminVbcProgram,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'pbp-program'},
      {id: 3, name: 'create'},
    ],
  },
  {
    id: 104,
    path: Routes.ViewVbcProgram.path,
    component: NewAdminVbcProgram,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'pbp-program'},
      {id: 3, name: 'view'},
    ],
  },
  // {
  //   id: 105,
  //   path: Routes.PatientDetails.path,
  //   component: PatientDetails,
  //   isProtected: true,
  //   role: ROLES.ADMIN,
  //   theme: THEME_MODULE.ADMIN,
  //   isSidebar: true,
  //   translatePage: 'mangoExecutive',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 2, name: 'patients'},
  //     {id: 3, name: 'details'},
  //   ],
  // },
  //PATIENT CANCER RESOURCES PAGES
  {
    id: 106,
    path: Routes.AboutCancer.path,
    component: AboutCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer'},
    ],
  },
  {
    id: 107,
    path: Routes.IsCancerHereditary.path,
    component: IsCancerHereditary,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancer.path},
      {id: 5, name: 'IsCancerHereditary'},
    ],
  },
  {
    id: 108,
    path: Routes.CancerAllYouNeedToKnow.path,
    component: CancerAllYouNeedToKnow,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancer.path},
      {id: 5, name: 'CancerAllYouNeedToKnow'},
    ],
  },
  {
    id: 109,
    path: Routes.BreastCancer.path,
    component: BreastCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancer.path},
      {id: 5, name: 'BreastCancer'},
    ],
  },
  {
    id: 110,
    path: Routes.LungCancer.path,
    component: LungCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancer.path},
      {id: 5, name: 'LungCancer'},
    ],
  },
  {
    id: 111,
    path: Routes.MythsAboutCancer.path,
    component: MythsAboutCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancer.path},
      {id: 5, name: 'MythsAboutCancer'},
    ],
  },
  {
    id: 112,
    path: Routes.CancerTreatment.path,
    component: CancerTreatment,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CancerTreatment'},
    ],
  },
  {
    id: 113,
    path: Routes.BiomarkerForCancer.path,
    component: BiomarkerForCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CancerTreatment', push: Routes.CancerTreatment.path},
      {id: 5, name: 'BiomarkerForCancer'},
    ],
  },
  {
    id: 114,
    path: Routes.KnowYourOptions.path,
    component: KnowYourOptions,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CancerTreatment', push: Routes.CancerTreatment.path},
      {id: 5, name: 'KnowYourOptions'},
    ],
  },
  {
    id: 115,
    path: Routes.ImmunoForCancer.path,
    component: ImmunoForCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CancerTreatment', push: Routes.CancerTreatment.path},
      {id: 5, name: 'ImmunoForCancer'},
    ],
  },
  {
    id: 116,
    path: Routes.HealthAndWellness.path,
    component: HealthAndWellness,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'HealthAndWellness'},
    ],
  },
  {
    id: 117,
    path: Routes.Covid19.path,
    component: Covid19,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'HealthAndWellness', push: Routes.HealthAndWellness.path},
      {id: 5, name: 'Covid19'},
    ],
  },
  {
    id: 118,
    path: Routes.LifestyleChanges.path,
    component: LifestyleChanges,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'HealthAndWellness', push: Routes.HealthAndWellness.path},
      {id: 5, name: 'LifestyleChanges'},
    ],
  },
  {
    id: 119,
    path: Routes.MaintaningSoundMentalHealth.path,
    component: MaintaningSoundMentalHealth,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'HealthAndWellness', push: Routes.HealthAndWellness.path},
      {id: 5, name: 'MaintaningSoundMentalHealth'},
    ],
  },
  {
    id: 120,
    path: Routes.Nutrition.path,
    component: Nutrition,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'HealthAndWellness', push: Routes.HealthAndWellness.path},
      {id: 5, name: 'Nutrition'},
    ],
  },
  {
    id: 121,
    path: Routes.CaregiverSupport.path,
    component: CaregiverSupport,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CaregiverSupport'},
    ],
  },
  {
    id: 122,
    path: Routes.SuccessfulCaregiver.path,
    component: SuccessfulCaregiver,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CaregiverSupport', push: Routes.CaregiverSupport.path},
      {id: 5, name: 'SuccessfulCaregiver'},
    ],
  },
  {
    id: 123,
    path: Routes.SupportGroups.path,
    component: SupportGroups,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'profile', push: Routes.MyProfile.path},
      {id: 3, name: 'resources', push: Routes.Resources.path},
      {id: 4, name: 'CaregiverSupport', push: Routes.CaregiverSupport.path},
      {id: 5, name: 'SupportGroups'},
    ],
  },
  //APPLICANT CANCER RESOURCES PAGES
  {
    id: 106,
    path: Routes.AboutCancerApplicant.path,
    component: AboutCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer'},
    ],
  },
  {
    id: 107,
    path: Routes.IsCancerHereditaryApplicant.path,
    component: IsCancerHereditary,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancerApplicant.path},
      {id: 5, name: 'IsCancerHereditary'},
    ],
  },
  {
    id: 108,
    path: Routes.CancerAllYouNeedToKnowApplicant.path,
    component: CancerAllYouNeedToKnow,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancerApplicant.path},
      {id: 5, name: 'CancerAllYouNeedToKnow'},
    ],
  },
  {
    id: 109,
    path: Routes.BreastCancerApplicant.path,
    component: BreastCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancerApplicant.path},
      {id: 5, name: 'BreastCancer'},
    ],
  },
  {
    id: 110,
    path: Routes.LungCancerApplicant.path,
    component: LungCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancerApplicant.path},
      {id: 5, name: 'LungCancer'},
    ],
  },
  {
    id: 111,
    path: Routes.MythsAboutCancerApplicant.path,
    component: MythsAboutCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'about-cancer', push: Routes.AboutCancerApplicant.path},
      {id: 5, name: 'MythsAboutCancer'},
    ],
  },
  {
    id: 112,
    path: Routes.CancerTreatmentApplicant.path,
    component: CancerTreatment,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'CancerTreatment'},
    ],
  },
  {
    id: 113,
    path: Routes.BiomarkerForCancerApplicant.path,
    component: BiomarkerForCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'CancerTreatment',
        push: Routes.CancerTreatmentApplicant.path,
      },
      {id: 5, name: 'BiomarkerForCancer'},
    ],
  },
  {
    id: 114,
    path: Routes.KnowYourOptionsApplicant.path,
    component: KnowYourOptions,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'CancerTreatment',
        push: Routes.CancerTreatmentApplicant.path,
      },
      {id: 5, name: 'KnowYourOptions'},
    ],
  },
  {
    id: 115,
    path: Routes.ImmunoForCancerApplicant.path,
    component: ImmunoForCancer,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},

      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'CancerTreatment',
        push: Routes.CancerTreatmentApplicant.path,
      },
      {id: 5, name: 'ImmunoForCancer'},
    ],
  },
  {
    id: 116,
    path: Routes.HealthAndWellnessApplicant.path,
    component: HealthAndWellness,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},

      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'HealthAndWellness'},
    ],
  },
  {
    id: 117,
    path: Routes.Covid19Applicant.path,
    component: Covid19,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},

      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'HealthAndWellness',
        push: Routes.HealthAndWellnessApplicant.path,
      },
      {id: 5, name: 'Covid19'},
    ],
  },
  {
    id: 118,
    path: Routes.LifestyleChangesApplicant.path,
    component: LifestyleChanges,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},

      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'HealthAndWellness',
        push: Routes.HealthAndWellnessApplicant.path,
      },
      {id: 5, name: 'LifestyleChanges'},
    ],
  },
  {
    id: 119,
    path: Routes.MaintaningSoundMentalHealthApplicant.path,
    component: MaintaningSoundMentalHealth,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'HealthAndWellness',
        push: Routes.HealthAndWellnessApplicant.path,
      },
      {id: 5, name: 'MaintaningSoundMentalHealth'},
    ],
  },
  {
    id: 120,
    path: Routes.NutritionApplicant.path,
    component: Nutrition,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'HealthAndWellness',
        push: Routes.HealthAndWellnessApplicant.path,
      },
      {id: 5, name: 'Nutrition'},
    ],
  },
  {
    id: 121,
    path: Routes.CaregiverSupportApplicant.path,
    component: CaregiverSupport,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {id: 4, name: 'CaregiverSupport'},
    ],
  },
  {
    id: 122,
    path: Routes.SuccessfulCaregiverApplicant.path,
    component: SuccessfulCaregiver,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'CaregiverSupport',
        push: Routes.CaregiverSupportApplicant.path,
      },
      {id: 5, name: 'SuccessfulCaregiver'},
    ],
  },
  {
    id: 123,
    path: Routes.SupportGroupsApplicant.path,
    component: SupportGroups,
    isProtected: true,
    role: ROLES.PATIENT,
    theme: THEME_MODULE.PATIENT,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'resources', push: Routes.ApplicantResources.path},
      {
        id: 4,
        name: 'CaregiverSupport',
        push: Routes.CaregiverSupportApplicant.path,
      },
      {id: 5, name: 'SupportGroups'},
    ],
  },
  {
    id: 124,
    path: Routes.FinanceProfile.path,
    component: FinanceProfile,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'finance',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'profile'},
    ],
  },
  {
    id: 125,
    path: Routes.FinancePatients.path,
    component: MangoExecutive,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'finance',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'patients'},
    ],
  },
  {
    id: 126,
    path: Routes.FinanceSettings.path,
    component: Settings,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'finance',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'settings'},
    ],
  },
  {
    id: 127,
    path: Routes.MangoExecutivePushNotification.path,
    component: SendPushNotification,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Send Push Notification'},
    ],
  },
  {
    id: 128,
    path: Routes.MangoExecutiveIncompletePatients.path,
    component: InCompletePatientList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'In-Complete Patient List'},
    ],
  },
  {
    id: 152,
    path: Routes.MangoExecutivePendingApprovalPatients.path,
    component: ApprovalPatientList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'myProfile',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Registration Requests'},
    ],
  },
  //ADMIN SCREENS
  {
    id: 128.2,
    path: Routes.Countries.path,
    component: CountriesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'countries'},
    ],
  },
  {
    id: 129,
    path: Routes.States.path,
    component: StateList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'states'},
    ],
  },
  {
    id: 130,
    path: Routes.Cities.path,
    component: CityList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Cities'},
    ],
  },
  {
    id: 131,
    path: Routes.Banks.path,
    component: BanksList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'banks'},
    ],
  },
  // {
  //   id: 132,
  //   path: Routes.GrossAnnualIncomes.path,
  //   component: GrossannualincomeList,
  //   isProtected: true,
  //   role: ROLES.ADMIN,
  //   theme: THEME_MODULE.ADMIN,
  //   isSidebar: true,
  //   translatePage: 'adminComponents',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 3, name: 'Gross Annual Income'},
  //   ],
  // },
  // {
  //   id: 133,
  //   path: Routes.IncomeRange.path,
  //   component: IncomerangeList,
  //   isProtected: true,
  //   role: ROLES.ADMIN,
  //   theme: THEME_MODULE.ADMIN,
  //   isSidebar: true,
  //   translatePage: 'adminComponents',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 3, name: 'Income Range List'},
  //   ],
  // },
  {
    id: 134,
    path: Routes.CancerTypes.path,
    component: CancerTypesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Cancer Type List'},
    ],
  },
  {
    id: 135,
    path: Routes.ClinicalDropOutReasons.path,
    component: ClinicaldropoutreasonsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Clinical Dropout Reasons'},
    ],
  },
  {
    id: 136,
    path: Routes.NonClinicalDropOutReasons.path,
    component: NonClinicalDropOutReasonsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Non-Clinical Dropout Reasons'},
    ],
  },
  {
    id: 137,
    path: Routes.CompanyTypes.path,
    component: CompanytypesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Company Types'},
    ],
  },
  {
    id: 138,
    path: Routes.DoctorChangeReasons.path,
    component: DoctorChangeReasonsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Doctor Change Reasons'},
    ],
  },
  {
    id: 139,
    path: Routes.EducationLevels.path,
    component: EducationlevelList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Education Levels'},
    ],
  },
  {
    id: 140,
    path: Routes.Employers.path,
    component: EmployersList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Employers List'},
    ],
  },
  // {
  //   id: 141,
  //   path: Routes.Experiences.path,
  //   component: ExperiencesList,
  //   isProtected: true,
  //   role: ROLES.ADMIN,
  //   theme: THEME_MODULE.ADMIN,
  //   isSidebar: true,
  //   translatePage: 'adminComponents',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 3, name: 'Experiences List'},
  //   ],
  // },
  {
    id: 142,
    path: Routes.IndustryTypes.path,
    component: IndustryTypesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Industry Types List'},
    ],
  },
  {
    id: 143,
    path: Routes.InsuranceCompanies.path,
    component: InsurancecompaniesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Insurance Companies'},
    ],
  },
  {
    id: 144,
    path: Routes.Languages.path,
    component: LanguagesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Languages'},
    ],
  },
  {
    id: 145,
    path: Routes.NatureOfBusiness.path,
    component: NatureofbusinessList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Nature Of Business'},
    ],
  },
  {
    id: 146,
    path: Routes.Occupations.path,
    component: OccupationsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Occupations'},
    ],
  },
  {
    id: 147,
    path: Routes.PatientStatus.path,
    component: PatientstatusList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Patient Status'},
    ],
  },
  {
    id: 148,
    path: Routes.Professions.path,
    component: ProfessionsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Professions'},
    ],
  },
  {
    id: 149,
    path: Routes.Relationships.path,
    component: RelationshipsList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Relationship'},
    ],
  },
  {
    id: 150,
    path: Routes.ResidenceTypes.path,
    component: ResidencetypesList,
    isProtected: true,
    role: ROLES.ADMIN,
    theme: THEME_MODULE.ADMIN,
    isSidebar: true,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 3, name: 'Residence Types'},
    ],
  },
  {
    id: 151,
    path: Routes.HospitalIpConfig.path,
    component: HospitalIpConfig,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'hospitalIpConfig',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'hospitalIpConfig'},
      {id: 3, name: 'list'},
    ],
  },

  {
    id: 152,
    path: Routes.BackendVersionList.path,
    component: BackendVersionList,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Backend Versions'},
      {id: 3, name: 'List'},
    ],
  },
  {
    id: 153,
    path: Routes.BackendVersionCreate.path,
    component: NewBackendVersion,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Backend Versions'},
      {id: 3, name: 'Create'},
    ],
  },
  {
    id: 154,
    path: Routes.BackendVersionEdit.path,
    component: NewBackendVersion,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Backend Versions'},
      {id: 3, name: 'Edit'},
    ],
  },
  {
    id: 155,
    path: Routes.BackendVersionView.path,
    component: NewBackendVersion,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Backend Versions'},
      {id: 3, name: 'View'},
    ],
  },
  {
    id: 156,
    path: Routes.AndroidVersionList.path,
    component: AndroidVersionList,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'Android Versions'},
      {id: 3, name: 'List'},
    ],
  },
  {
    id: 157,
    path: Routes.IosVersionList.path,
    component: IosVersionList,
    isSidebar: true,
    role: ROLES.ADMIN,
    isProtected: true,
    theme: THEME_MODULE.ADMIN,
    translatePage: 'adminComponents',
    breadcrumb: [
      {id: 1, name: 'home'},
      {id: 2, name: 'IOS Versions'},
      {id: 3, name: 'List'},
    ],
  },
  // {
  //   id: 151,
  //   path: Routes.YearsInBusiness.path,
  //   component: YearsinbusinessList,
  //   isProtected: true,
  //   role: ROLES.ADMIN,
  //   theme: THEME_MODULE.ADMIN,
  //   isSidebar: true,
  //   translatePage: 'adminComponents',
  //   breadcrumb: [
  //     {id: 1, name: 'home'},
  //     {id: 3, name: 'Years In Business'},
  //   ],
  // },
];
