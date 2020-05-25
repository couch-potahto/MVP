import { GET_DETAIL } from '../actions/types';

const initState = {
  id: null,
  employee_name: null,
  employee_id: null,
  login: null,
  salary: null
}

const detailReducer = (state=initState, action) => {

  switch(action.type){
    case GET_DETAIL:
      console.log('get deets')
      return{
        ...state,
        id: action.payload.id,
        employee_name: action.payload.name,
        employee_id: action.payload.employee_id,
        login: action.payload.login,
        salary: action.payload.salary
      };
    default:
      return state;
  }

}

export default detailReducer
