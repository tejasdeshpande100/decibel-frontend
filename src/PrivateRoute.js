import React from 'react';
import {  Navigate } from 'react-router-dom';
import { isAuthenticated } from './api/auth';

export default function PrivateRoute({ children}) {
 
  // console.log()

  return isAuthenticated()? children : <Navigate to="/decibel-login" />;
}
