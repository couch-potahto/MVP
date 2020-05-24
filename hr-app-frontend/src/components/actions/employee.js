import axios from 'axios';
import { CHANGE_PAGE, GET_EMPLOYEE } from './types';

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
    return axios.get(apiUrl + offset + 0 + maxSalary + 4000 + minSalary + 0 + sort + "name")
      .then(res=>{
        console.log("LOL")
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


export const changePage = (page) =>{
  //page * 30
  console.log(page)
  return(dispatch)=>{

    return axios.get(apiUrl + offset + ((page-1)*30) + maxSalary + 4000 + minSalary + 0 + sort + "name")
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
