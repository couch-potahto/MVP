import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, getEmployee} from './actions/employee';
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
    this.props.changePage(page)

  }


render(){
  return(

    <TableContainer component={Paper}>
    <Toolbar>
      <Typography>
        Employees
      </Typography>
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
            <TableCell>{employee.id}</TableCell>
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

const mapStateToProps = (state) =>{
  console.log(state)
	return {
		allEmployees: state.employeeReducer.allEmployees,
    count: state.employeeReducer.count,
    previous: state.employeeReducer.previous,
    next: state.employeeReducer.next
	}
}

const mapDispatchToProps= (dispatch)=>{
  return{
    changePage: (page)=>{dispatch(changePage(page))},

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableTest)
