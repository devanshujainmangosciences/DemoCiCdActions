/**
 * We can Store, Retrieve, Edit and Delete states in this reducers.
 * Here Combining all Reducers into a single object
 */

import {combineReducers} from 'redux';
import app from './app';
import clinicalDetails from './clinical-details';
import resource from './resource';
import users from './users';
import lenders from './lenders';
import pharma from './pharma';
import permission from './permission';
import role from './role';
import route from './route';
import drugs from './drugs';
import hospitals from './hospitals';
import manufacturers from './manufacturers';
import doctors from './doctors';
import template from './template';
import documents from './documents';
import loanApplication from './loan-application';
import applicants from './applicants';
import mangoExecutive from './mango-executive';
import admin from './admin';
import hospitalIpConfig from './hospitalIpConfig';

export default combineReducers({
  app,
  clinicalDetails,
  documents,
  users,
  lenders,
  manufacturers,
  doctors,
  hospitals,
  resource,
  drugs,
  pharma,
  permission,
  role,
  route,
  template,
  loanApplication,
  applicants,
  mangoExecutive,
  admin,
  hospitalIpConfig,
});
