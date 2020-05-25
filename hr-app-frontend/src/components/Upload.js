import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { showSuccessSnackbar, clearSnackBar } from './actions/snackbar'

class Upload extends Component {

    state = {
      // Initially, no file is selected
      selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
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
        console.log(res)
        this.props.showSuccessSnackbar()
      })
      .catch(error=>{
        console.log(error)
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
    clearSnackBar: () => {dispatch(clearSnackBar())}
  }
}

export default connect(null, mapDispatchToProps)(Upload);
