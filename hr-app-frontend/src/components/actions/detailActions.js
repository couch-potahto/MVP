import axios from 'axios';
import { showSuccessSnackbar, showErrorSnackbar, clearSnackBar } from './snackbarActions'
import {  getEmployee } from './employeeActions'
import { apiUrl } from '../Constants'
import { GET_DETAIL,
         CLEAR_DETAIL, } from './types';

export const getEmployeeDetail = (employee_id) => {
  return dispatch => {
    return axios.get(apiUrl + '/' + employee_id)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_DETAIL,
          payload: res.data
        })
      })
      .catch(error=>{
        dispatch(showErrorSnackbar('Employee Does Not Exist'))
      })
  }
}

export const clearEmployeeDetail = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_DETAIL,
    })
  }
}

export const updateEmployeeDetail = (employee_id, name, login, salary) => {
  console.log(employee_id)
  return dispatch => {
    return axios.patch(apiUrl + '/' + employee_id, {
      data: {
        'employee_id': employee_id,
        'name': name,
        'login': login,
        'salary': salary
        }
    })
    .then(res => {
      console.log(res.data)
      dispatch(showSuccessSnackbar('Employee Updated Successfully'))
      dispatch(clearEmployeeDetail())
      dispatch(getEmployee())
    })
    .catch(error=>{
      dispatch(showErrorSnackbar('Fields Invalid'))
    })
  }
}
