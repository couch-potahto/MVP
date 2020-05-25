import { SNACKBAR_SUCCESS, SNACKBAR_CLEAR, SNACKBAR_ERROR } from '../actions/types';

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

    case SNACKBAR_ERROR:
      return{
        state,
        errorSnackBarOpen: true,
        errorSnackBarMessage: action.message
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
