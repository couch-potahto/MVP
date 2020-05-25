import { CHANGE_PAGE, GET_EMPLOYEE, QUERY_PAGE, SUCCESS_QUERY } from '../actions/types';

const initState = {
  allEmployees: [],
  previous: null,
  next: null,
  minSalary: 0,
  maxSalary: 9999999999999,
  sort: "name",
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

      case QUERY_PAGE:
        return{
          ...state,
          allEmployees: [...action.payload.results],
          previous: action.payload.previous,
          next: action.payload.next,
          count: Math.ceil(action.payload.count/30)
      };

      case SUCCESS_QUERY:
      console.log(action.payload)
        return{
          ...state,
          minSalary: action.payload.minSalary,
          maxSalary: action.payload.maxSalary,
          sort: action.payload.orderBy
        }
      default:
        return state;
  }


};

export default employeeReducer