import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { applyQueryParams } from './actions/employeeActions';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function FormDialog(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({
    orderBy: '',
    minSalary: '',
    maxSalary: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (prop) => (e) => {
    setOpen(false);
  };

  const handleSubmitClose = (prop) => (e) => {
    setOpen(false);
    props.applyQueryParams(values)
  };

  const handleChange = (prop) => (event) => {
     setValues({ ...values, [prop]: event.target.value });
   };
  return (

    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Queries
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Apply Filter/Sort</DialogTitle>
        <DialogContent>
        <form className={classes.container} noValidate autoComplete="off">
         <FormControl className={classes.formControl} size= "small" variant="outlined">
           <OutlinedInput
             id="outlined-adornment-weight"
             value={values.minSalary}
             onChange={handleChange('minSalary')}
             startAdornment={<InputAdornment position="start">$</InputAdornment>}
             aria-describedby="outlined-weight-helper-text"
             inputProps={{
               'aria-label': 'weight',
             }}
             labelWidth={0}
           />
           <FormHelperText id="standard-weight-helper-text">Min.</FormHelperText>
         </FormControl>
         <FormControl className={classes.formControl} size= "small" variant="outlined">
           <OutlinedInput
             id="outlined-adornment-weight"
             value={values.maxSalary}
             onChange={handleChange('maxSalary')}
             startAdornment={<InputAdornment position="start">$</InputAdornment>}
             aria-describedby="outlined-weight-helper-text"
             inputProps={{
               'aria-label': 'weight',
             }}
             labelWidth={0}
           />
           <FormHelperText id="standard-weight-helper-text">Max.</FormHelperText>
         </FormControl>
         <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Sort</InputLabel>
              <Select
                value={values.orderBy}
                onChange={handleChange('orderBy')}
                input={<Input id="demo-dialog-native" />}>
                <MenuItem value={'id'}>+Id</MenuItem>
                <MenuItem value={'-id'}>-Id</MenuItem>
                <MenuItem value={'name'}>+Name</MenuItem>
                <MenuItem value={'-name'}>-Name</MenuItem>
                <MenuItem value={'login'}>+Login</MenuItem>
                <MenuItem value={'-login'}>-Login</MenuItem>
                <MenuItem value={'salary'}>+Salary</MenuItem>
                <MenuItem value={'-salary'}>-Salary</MenuItem>
              </Select>
            </FormControl>
         </form>
        </DialogContent>
        <DialogActions>
          <Button id='close' color="primary" onClick={handleClose()}>
            Cancel
          </Button>
          <Button id='apply' color="primary" onClick={handleSubmitClose()}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators( {applyQueryParams}, dispatch);

}
export default connect(null, mapDispatchToProps)(FormDialog)
