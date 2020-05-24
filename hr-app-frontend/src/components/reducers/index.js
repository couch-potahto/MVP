import React from 'react'
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer'
import {getEmployee} from '../actions/employee'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from '../../App';
import { Provider } from 'react-redux';


const rootReducer = combineReducers({
  employeeReducer: employeeReducer,
});
export default rootReducer;
