import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { clearEmployeeDetail, updateEmployeeDetail } from './actions/detailActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    marginTop: theme.spacing(5),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DetailDialog(props) {

  const classes = useStyles();

  function handleClose() {
    props.clearEmployeeDetail()
  }

  const handleUpdateClose = (prop) => (event) => {
    var name = document.getElementsByName('name')[0].value
    var login = document.getElementsByName('login')[0].value
    var salary = document.getElementsByName('salary')[0].value
    var employee_id = props.employeeDetail.employee_id
    console.log(employee_id)
    console.log(name)
    console.log(login)
    console.log(salary)
    props.updateEmployeeDetail(employee_id, name, login, salary)
  };

  return (
    <div>
      <Dialog fullScreen open={props.employeeDetail.isOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Employee Profile
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={classes.profile}>
          <Avatar className={classes.large} />
          <Typography variant="h3" gutterBottom>
            {props.employeeDetail.employee_id}
          </Typography>
        </div>

        <Container component="main" maxWidth="xs">
         <Paper className={classes.paper}>
         <form className={classes.form} noValidate>
           <TextField
             variant="outlined"
             margin="normal"
             fullWidth
             id="name"
             label="Name"
             name="name"
             defaultValue={props.employeeDetail.employee_name}
             autoFocus
           />
           <TextField
             variant="outlined"
             margin="normal"
             fullWidth
             name="login"
             label="Login"
             id="login"
             defaultValue={props.employeeDetail.login}
           />
           <TextField
             variant="outlined"
             margin="normal"
             fullWidth
             name="salary"
             label="Salary"
             id="salary"
             type="number"
             defaultValue={props.employeeDetail.salary}
           />
           <Button
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
             onClick={handleUpdateClose()}
           >
             Update
           </Button>
           </form>
         </Paper>
        </Container>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
	return {
		employeeDetail: state.detailReducer,
	}
}

const mapDispatchToProps = (dispatch) => {
  return{
    clearEmployeeDetail: () => {dispatch(clearEmployeeDetail())},
    updateEmployeeDetail: (employee_id, name, login, salary) => {dispatch(updateEmployeeDetail(employee_id, name, login, salary))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDialog)
