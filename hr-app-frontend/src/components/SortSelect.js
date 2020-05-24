import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core'

class SortSelect extends Component{

  render(){
    return(

      <Grid container spacing={2}>
       <Grid item xs={1}>
       </Grid>
       <Grid item xs={3}>
       <FormControl size= "small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            //value={values.weight}
            //onChange={handleChange('weight')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
          <FormHelperText id="standard-weight-helper-text">Min.</FormHelperText>
       </FormControl>
       </Grid>
       <Grid item xs={3}>
       <FormControl size= "small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            helperText="Some important text"
            //value={values.weight}
            //onChange={handleChange('weight')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            labelWidth={0}
          />
          <FormHelperText id="standard-weight-helper-text">Max.</FormHelperText>
       </FormControl>
       </Grid>
       <Grid item xs={3}>
       </Grid>
    </Grid>



 )
}
}

export default SortSelect
