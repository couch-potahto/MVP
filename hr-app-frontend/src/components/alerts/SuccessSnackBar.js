import React, { Component } from 'react';
import { connect } from "react-redux";
import { clearSnackBar } from "../actions/snackbarActions";
import { bindActionCreators } from 'redux';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SuccessSnackBar(props) {

  function handleClose() {
    props.clearSnackBar()
  }

  return (
    <Snackbar open={props.successSnackBarOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {props.successSnackBarMessage}!
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return{
    successSnackBarOpen: state.snackbarReducer.successSnackBarOpen,
    successSnackBarMessage: state.snackbarReducer.successSnackBarMessage,
    errorSnackBarOpen: state.snackbarReducer.errorSnackBarOpen,
    errorSnackBarMessage: state.snackbarReducer.errorSnackBarMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( {clearSnackBar}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessSnackBar)
