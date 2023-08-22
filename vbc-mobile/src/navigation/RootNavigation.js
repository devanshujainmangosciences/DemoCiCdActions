/**
 * Root Navigation to handle navigation when app is mounted
 */
import * as React from 'react';

// ref to identify if our app is cready tp handle navigation
export const isReadyRef = React.createRef();

// navigation container ref which we are passign as ref to Navigation container inside App.js
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}
