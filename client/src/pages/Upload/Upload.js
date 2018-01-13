import React, { Component } from "react";
import API from "../../utils/API";
import axios from 'axios';



class Upload extends Component {
  // Setting our component's initial state
  state = {
  };



  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //This will be changed to use the API format
  handleUploadFile = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'Simeon Utubor');
    data.append('description', 'Some random stuff');
    data.append('location', 'San Diego');
    data.append('owner', localStorage.getItem('user-id'));

    // '/files' is your node.js route that triggers our middleware
    axios.post('/files', data).then((response) => {
      console.log(response); // do something with the response
    });
  }




  render() {
    return (
	    <div>
	        <div className="container">
	        	<h1> File Uploader </h1>
	              <form encType="multipart/form-data">
				    <div className="file-field input-field">
				      <div className="btn">
				        <span>File</span>
				        <input name="myImage" type="file" onChange={this.handleUploadFile}/>
				      </div>
				      <div className="file-path-wrapper">
				        <input className="file-path validate" type="text"/>
				      </div>
				    </div>
				    <button type="submit"> Submit </button>
				  </form>
	        </div>
	    </div>
    )
  }
}

export default Upload;
