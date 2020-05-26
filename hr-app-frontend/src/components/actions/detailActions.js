import axios from 'axios';
import { showSuccessSnackbar, showErrorSnackbar, clearSnackBar } from './snackbarActions'
import {  getEmployee, changePage } from './employeeActions'
import { apiUrl } from '../Constants'
import { GET_DETAIL,
         CLEAR_DETAIL,
         DELETE_EMPLOYEE, } from './types';

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

export const updateEmployeeDetail = (employee_id, name, login, salary, page, min, max, q) => {
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
      dispatch(changePage(page, min, max, q))
    })
    .catch(error => {
      dispatch(showErrorSnackbar('Fields Invalid'))
    })
  }
}

export const deleteEmployee = (employee_id, page, min, max, q) => {
  return dispatch => {
    return axios.delete(apiUrl + '/' + employee_id)
      .then(res => {
        dispatch(showSuccessSnackbar('Employee Deleted Successfully'))
        dispatch(changePage(page, min, max, q))
      })
      .catch(error => {
        dispatch(showErrorSnackbar('Something Went Wrong'))
      })
  }
}
