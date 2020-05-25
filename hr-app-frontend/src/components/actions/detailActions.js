import axios from 'axios';
import { GET_DETAIL } from './types';
import { showSuccessSnackbar, showErrorSnackbar, clearSnackBar } from './snackbarActions'
import { apiUrl } from '../Constants'

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
