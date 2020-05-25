import axios from 'axios';
import { CHANGE_PAGE, GET_EMPLOYEE, QUERY_PAGE, SUCCESS_QUERY } from './types';
import { showSuccessSnackbar, showErrorSnackbar, clearSnackBar } from './snackbarActions'
import { apiUrl, offset, maxSalary, minSalary, sort, limit } from '../Constants'


export const getEmployee = () => {
  return dispatch => {
    return axios.get(apiUrl + limit + offset + 0 + maxSalary + 9999999999999 + minSalary + 0 + sort + "name")
      .then(res => {
        console.log(res)
        dispatch({
          type: GET_EMPLOYEE,
          payload: res.data
        })
      })
      .catch(error=>{
        dispatch(showErrorSnackbar('Server Unavailable'))
      });
  };
};


export const changePage = (page, min, max, q) => {
  //page * 30
  console.log(page)
  return(dispatch) => {
    return axios.get(apiUrl + limit + offset + ((page-1)*30) + maxSalary + max + minSalary + min + sort + q)
      .then(res => {
        console.log(res)
        dispatch({
          type:CHANGE_PAGE,
          payload: res.data
        })
      })
      .catch(error=>{
        dispatch(showErrorSnackbar('Page Invalid'))
      });
  };
};

export const applyQueryParams = (val) =>{
  console.log(val)
  //{orderBy: "name", minSalary: "111", maxSalary: "111"}
  const q_orderBy = val.orderBy
  const q_minSalary = val.minSalary
  const q_maxSalary = val.maxSalary
  return(dispatch)=>{
    return axios.get(apiUrl + limit + offset + 0 + maxSalary + q_maxSalary + minSalary + q_minSalary + sort + q_orderBy)
      .then(res=>{
        dispatch({
          type: QUERY_PAGE,
          payload: res.data
        })

      })
      .then(
        res=>{
          dispatch({
            type: SUCCESS_QUERY,
            payload: val
          })
        }
      )
      .catch(error=>{
        dispatch(showErrorSnackbar('Invalid Query Parameters'))
      });
  };
};
