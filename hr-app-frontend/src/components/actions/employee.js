import axios from 'axios';
import { GET_EMPLOYEE } from './types';

const apiUrl = 'http://localhost:8000/users/test?offset=0&limit=30&maxSalary=4000&minSalary=0&sort=name'

export const getEmployees = () =>{
  return(dispatch)=>{
    return axios.get(apiUrl)
      .then(res=>{
        dispatch({
          type:GET_EMPLOYEE,
          payload: res.data
        })
      })
      .catch(error=>{
        throw(error);
      });
  };
};
