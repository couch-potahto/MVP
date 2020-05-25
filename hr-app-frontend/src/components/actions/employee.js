import axios from 'axios';
import { CHANGE_PAGE, GET_EMPLOYEE, QUERY_PAGE, SUCCESS_QUERY } from './types';

const apiUrl = 'http://localhost:8000/users/test?limit=30'
const offset = "&offset="
const maxSalary = "&maxSalary="
const minSalary = "&minSalary="
const sort = "&sort="
/*
export const getEmployee = () => async dispatch => {
  console.log('LOL')
  const res = await axios.get(apiUrl + offset + 0 + maxSalary + 4000 + minSalary + 0 + sort + "name");
  dispatch({
    type: GET_EMPLOYEE,
    payload: res.data
  })
};
*/

export const getEmployee = () =>{
  console.log('LOL')
  return dispatch=>{
    return axios.get(apiUrl + offset + 0 + maxSalary + 9999999999999 + minSalary + 0 + sort + "name")
      .then(res=>{
        console.log(res)
        dispatch({
          type: GET_EMPLOYEE,
          payload: res.data
        })
      })
      .catch(error=>{
        throw(error);
      });
  };
};


export const changePage = (page, min, max, q) =>{
  //page * 30
  console.log(page)
  return(dispatch)=>{

    return axios.get(apiUrl + offset + ((page-1)*30) + maxSalary + max + minSalary + min + sort + q)
      .then(res=>{
        console.log(res)
        dispatch({
          type:CHANGE_PAGE,
          payload: res.data
        })
      })
      .catch(error=>{
        throw(error);
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
    return axios.get(apiUrl + offset + 0 + maxSalary + q_maxSalary + minSalary + q_minSalary + sort + q_orderBy)
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
        throw(error);
      });
  };
};
