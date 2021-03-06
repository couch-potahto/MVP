import { SNACKBAR_SUCCESS,
         SNACKBAR_CLEAR,
         SNACKBAR_ERROR,
         SNACKBAR_WARNING,
         START_LOADING } from '../actions/types';

export const showSuccessSnackbar = (message) => {
  return dispatch => {
    dispatch({
      type: SNACKBAR_SUCCESS,
      message: message
    });
  };
};

export const showErrorSnackbar = (message) => {
  return dispatch => {
    dispatch({
      type: SNACKBAR_ERROR,
      message: message
    });
  };
};

export const showWarningSnackbar = (message) => {
  return dispatch => {
    dispatch({
      type: SNACKBAR_WARNING,
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

export const startLoading = () => {
  return dispatch => {
    dispatch({
      type: START_LOADING
    });
  };
};
