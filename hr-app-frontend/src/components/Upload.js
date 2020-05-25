import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getEmployee } from './actions/employeeActions'
import { showSuccessSnackbar,
         showErrorSnackbar,
         showWarningSnackbar,
         clearSnackBar } from './actions/snackbarActions'

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

      axios.post("http://localhost:8000/users/upload", formData,
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
        console.log(error.response.data.indexOf('OperationalError'))
        if(error.response.data.indexOf('OperationalError') != -1){
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
            <h2>File Details:</h2>
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
        <div>
            <div>
                <input type="file" id='file' onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
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
