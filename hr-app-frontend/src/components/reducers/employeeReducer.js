import { GET_EMPLOYEE } from '../actions/types';

const initState = {
  allEmployee: []
}
export default function employeeReducer(state=[], action){
  switch(action.type){
    case GET_EMPLOYEE:
      return{
        ...state,
        allEmployee: action.payload
      };
    default:
      return state;
  }
};
