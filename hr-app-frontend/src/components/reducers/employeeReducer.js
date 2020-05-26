import { CHANGE_PAGE, GET_EMPLOYEE, QUERY_PAGE, SUCCESS_QUERY } from '../actions/types';

const initState = {
  allEmployees: [],
  previous: null,
  next: null,
  minSalary: 0,
  maxSalary: 9999999999999,
  sort: "name",
  count: 0,
  page: 1
}

const employeeReducer=(state=initState, action)=>{

  switch(action.type){

    case GET_EMPLOYEE:
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
          count: Math.ceil(action.payload.count/30),
          page: action.page,
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
