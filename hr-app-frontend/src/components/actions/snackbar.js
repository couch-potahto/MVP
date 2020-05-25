import { SNACKBAR_SUCCESS, SNACKBAR_CLEAR } from '../actions/types';

export const showSuccessSnackbar = (message) => {
  return dispatch => {
    dispatch({
      type: SNACKBAR_SUCCESS,
      message: message
    });
  };
};

export const clearSnackBar = () => {
  return dispatch => {
    dispatch({
      type: SNACKBAR_CLEAR
    });
  };
};
