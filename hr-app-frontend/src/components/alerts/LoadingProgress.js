import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { clearSnackBar } from "../actions/snackbarActions";
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function LoadingProgress(props) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapStateToProps = (state) => {
  return{
    isLoading: state.snackbarReducer.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( {clearSnackBar}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoadingProgress)
