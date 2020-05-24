import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployee } from './actions/employee';
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

  }

  componentDidMount(){
    axios.get('http://localhost:8000/users/test?offset=0&limit=30&maxSalary=4000&minSalary=0&sort=name')
      .then(res=>{
        const allEmployees=res.data;
        this.setState({
          allEmployees: allEmployees.results,
          previous: allEmployees.previous,
          next: allEmployees.next
        })
        console.log(this.state)
      })
  }


render(){
  return(
    <React.Fragment>
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
        {this.state.allEmployees.map(employee=> (
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
        <Pagination count={10} size="large" />
      </Box>
      </TableContainer>


      </React.Fragment>
  );
}
};

const mapStateToProps = (state) =>{
  console.log(state.employeeReducer)
	return {
		items: state.employeeReducer.allEmployee,
	}
}

const mapDispatchToProps= (dispatch)=>{


}

export default connect(mapStateToProps,mapDispatchToProps)(TableTest)
