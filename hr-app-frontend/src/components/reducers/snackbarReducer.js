import { SNACKBAR_SUCCESS, SNACKBAR_CLEAR } from '../actions/types';

const initState = {
  successSnackBarOpen: false,
  errorSnackBarOpen: false,
  error_type: null,
  successSnackBarMessage: null,
  errorSnackBarMessage: null
}

const snackbarReducer=(state=initState, action)=>{

  switch(action.type){

    case SNACKBAR_SUCCESS:
      console.log(action)
      return {
        state,
        successSnackBarOpen: true,
        successSnackBarMessage: action.message
      };

    case SNACKBAR_CLEAR:
      return{
        ...state,
        successSnackBarOpen: false,
        errorSnackBarOpen: false
      };

    default:
      return state;
  }
};

export default snackbarReducer
