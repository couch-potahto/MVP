import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer'

const rootReducer = combineReducers({
  employeeReducer: employeeReducer,
});

export default rootReducer;
