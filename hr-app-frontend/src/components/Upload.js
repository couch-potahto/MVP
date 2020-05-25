import React, { Component } from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { getEmployee } from './actions/employeeActions'
import { showSuccessSnackbar, showErrorSnackbar, showWarningSnackbar, clearSnackBar } from './actions/snackbarActions'
import { apiUrl } from './Constants'

class Upload extends Component {

    state = {
      selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
      const formData = new FormData();
      formData.append(
        "file",
        this.state.selectedFile,
      );

      axios.post(apiUrl + "/upload", formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res=>{
        this.props.showSuccessSnackbar()
        this.props.getEmployee()
      })
      .catch(error=>{
        console.log('----------------------------')
        console.log(error.response)
        console.log('----------------------------')
        console.log(error.response.status)
        if(error.response.status=='503'){
          this.props.showWarningSnackbar("Oops, Try Again Later!")
        }
        else{
          this.props.showErrorSnackbar("File Type/Content Invalid")
        }
      });
    };


    fileData = () => {

      if (this.state.selectedFile) {

        return (
          <div>
            <h3>File Details:</h3>
            <p>File Name: {this.state.selectedFile.name}</p>
            <p>File Type: {this.state.selectedFile.type}</p>
            <p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
          </div>
        );
      }
    };

    render() {
      return (

        <Grid container justify="center">
            <Box alignItems="center" component="span" m={1}>

              <input type="file" id="input-file-id" onChange={this.onFileChange}  style={{ display: "none" }}/>

                <Button
                 variant="contained"
                 color="default"
                >
                  <label for="input-file-id" class="md-button md-raised md-primary">
                   <Typography variant="caption" display="block">
                    Choose Files
                   </Typography>
                  </label>
                </Button>
                {this.fileData()}
              <Button
               variant="contained"
               color="default"
               startIcon={<CloudUploadIcon />}
               onClick={this.onFileUpload}>
                Upload!
              </Button>
            </Box>
        </Grid>
      );
    }
  }

const mapDispatchToProps = (dispatch) => {
  return{
    showSuccessSnackbar: () => {dispatch(showSuccessSnackbar('Upload Success'))},
    showErrorSnackbar: (error) => {dispatch(showErrorSnackbar(error))},
    showWarningSnackbar: (warning) => {dispatch(showWarningSnackbar(warning))},
    clearSnackBar: () => {dispatch(clearSnackBar())},
    getEmployee: () => {dispatch(getEmployee())}
  }
}

export default connect(null, mapDispatchToProps)(Upload);
