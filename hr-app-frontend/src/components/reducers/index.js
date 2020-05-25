import React from 'react'
import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer'
import snackbarReducer from './snackbarReducer'


const rootReducer = combineReducers({
  employeeReducer: employeeReducer,
  snackbarReducer: snackbarReducer
});
export default rootReducer;
