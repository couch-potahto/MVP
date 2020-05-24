import { CHANGE_PAGE, GET_EMPLOYEE } from '../actions/types';

const initState = {
  allEmployees: [],
  previous: null,
  next: null,
  count: 0
}

const employeeReducer=(state=initState, action)=>{

  switch(action.type){
    case GET_EMPLOYEE:
      console.log(action.payload)
      return{
        ...state,
        allEmployees: [...action.payload.results],
        previous: action.payload.previous,
        next: action.payload.next,
        count: Math.ceil(action.payload.count/30)
      };
      case CHANGE_PAGE:
        return{
          ...state,
          allEmployees: [...action.payload.results],
          previous: action.payload.previous,
          next: action.payload.next,
          count: Math.ceil(action.payload.count/30)
      };
      default:
        return state;
  }


};

export default employeeReducer
