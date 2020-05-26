import axios from 'axios';
import { showSuccessSnackbar, showErrorSnackbar, clearSnackBar } from './snackbarActions'
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
