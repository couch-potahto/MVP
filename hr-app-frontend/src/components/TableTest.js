import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, getEmployee} from './actions/employeeActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid';
import Dialog from './Dialog'
import { Box } from '@material-ui/core'
import Title from './Title';
import axios from 'axios'

class TableTest extends Component{

  state = {
   allEmployees: [],
   previous: null,
   next: null,
   count: 0
 }

  handleChangePage = (event, page)=>{
    console.log(this.props)
    this.props.changePage(page, this.props.minSalary, this.props.maxSalary, this.props.sort)
  }


render(){
  return(

    <TableContainer component={Paper}>
    <Toolbar>
      <Typography>
        Employees
      </Typography>
      <Grid container alignItems="flex-start" justify="flex-end" direction="row">
         <Dialog />
      </Grid>
    </Toolbar>
    <Table title ="Employees">
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="row">ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>Salary</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.props.allEmployees.map(employee=> (
          <TableRow key={employee.id}>
            <TableCell>{employee.employee_id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.login}</TableCell>
            <TableCell>{employee.salary}</TableCell>
            <TableCell> LOL</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pagination
        count={this.props.count}
        size="large"
        onChange={(event, page)=>{this.handleChangePage(event, page)}}
      />
      </Box>
      </TableContainer>

  );
}
};

const mapStateToProps = (state) => {
  console.log(state)
	return {
		allEmployees: state.employeeReducer.allEmployees,
    count: state.employeeReducer.count,
    previous: state.employeeReducer.previous,
    next: state.employeeReducer.next,
    minSalary: state.employeeReducer.minSalary,
    maxSalary: state.employeeReducer.maxSalary,
    sort: state.employeeReducer.sort

	}
}

const mapDispatchToProps = (dispatch) => {
  return{
    changePage: (page, min, max, q)=>{dispatch(changePage(page, min, max, q))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTest)
