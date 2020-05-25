import React, { Component } from 'react';
import { useDispatch, useSelector, connect } from "react-redux";
import { clearSnackBar } from "./actions/snackbar";
import { bindActionCreators } from 'redux';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import MuiAlert from '@material-ui/lab/Alert';
import { Icon } from "@material-ui/core";


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
  console.log(state)
  return{
    successSnackBarOpen: state.snackbarReducer.successSnackBarOpen,
    successSnackBarMessage: state.snackbarReducer.successSnackBarMessage,
    errorSnackBarOpen: state.snackbarReducer.errorSnackBarOpen,
    errorSnackBarMessage: state.snackbarReducer.errorSnackBarMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( {clearSnackBar}, dispatch);
  /*
    return{
      applyQueryParams: (val)=>{dispatch(applyQueryParams(val))}
    }
    */
}
export default connect(mapStateToProps, mapDispatchToProps)(SuccessSnackBar)
