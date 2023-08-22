/**
 * This module contains all the roles in the application.
 * Always try to add new role in the end.
 */
export const THEME_MODULE = {
  PATIENT: 'patient',
  PHARMA: 'pharma',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};
export const ROLE_ID_MAP = {
  applicant: 1009,
  patient: 2,
  doctor: 4,
  mangoExecutive: 1042,
  finance: 5001,
};
export const ROLES = {
  PATIENT: 'patient',
  PHARMA: 'pharma',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  SUBADMIN: 'sub_admin',
  FINANCE: 'finance',
  MANGO_EXECUTIVE: 'mango_executive',
  APPLICANT: 'applicant',
};

export const dynamicUrl = [
  '/patient/profile/resources',
  '/applicant/resources',
  '/admin/users/view',
  '/admin/users/update',
  '/admin/roles/view',
  '/admin/roles/update',
  '/admin/drug/view',
  '/admin/drug/update',
  '/admin/manufacturer/get',
  '/admin/manufacturer/update',
  '/admin/drug/pbp-drug-schedule/update',
  '/admin/lenders/view',
  '/admin/lenders/update',
  '/admin/hospital/get',
  '/admin/hospital/update',
  '/admin/doctor/view',
  '/admin/doctor/update',
  '/admin/pbp-program/get',
  '/admin/pbp-program/update',
  '/secured-forward',
];
