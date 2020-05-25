import React from 'react'
import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer'
import snackbarReducer from './snackbarReducer'
import detailReducer from './detailReducer'


const rootReducer = combineReducers({
  employeeReducer: employeeReducer,
  snackbarReducer: snackbarReducer,
  detailReducer: detailReducer,
});

export default rootReducer;
