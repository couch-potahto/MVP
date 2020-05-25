import { SNACKBAR_SUCCESS,
         SNACKBAR_CLEAR,
         SNACKBAR_ERROR,
         SNACKBAR_WARNING,
         START_LOADING } from '../actions/types';

const initState = {
  successSnackBarOpen: false,
  errorSnackBarOpen: false,
  warningSnackBarOpen: false,
  warningSnackBarMessage: null,
  successSnackBarMessage: null,
  errorSnackBarMessage: null,
  isLoading: false,
}

const snackbarReducer=(state=initState, action)=>{

  switch(action.type){

    case SNACKBAR_SUCCESS:
      console.log(action)
      return {
        ...state,
        successSnackBarOpen: true,
        successSnackBarMessage: action.message,
        isLoading: false
      };

    case SNACKBAR_ERROR:
      return{
        ...state,
        errorSnackBarOpen: true,
        errorSnackBarMessage: action.message,
        isLoading: false,
      };

    case SNACKBAR_WARNING:
      console.log('LOLOLOLOLOOL')
      return{
        ...state,
        warningSnackBarOpen: true,
        warningSnackBarMessage: action.message,
        isLoading: false
      };

    case SNACKBAR_CLEAR:
      return{
        ...state,
        successSnackBarOpen: false,
        errorSnackBarOpen: false
      };

    case START_LOADING:
      return{
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export default snackbarReducer
