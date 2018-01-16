import React, { Component } from "react";
import TextField from "material-ui/TextField";
import API from "../../utils/API";
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import RaisedButton from 'material-ui/RaisedButton';

// Setting Cloudinary Preset 
const CLOUDINARY_UPLOAD_PRESET = 'z3tji56i';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfkkuo5j8/image/upload';

class Upload extends Component {
  // Setting our component's initial state

  constructor(props) {
    super(props);


    this.state = {
      currentUserID: '',
      itemTitle: '',
      itemLocation: '',
      itemDescription: '',
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }


    onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

// Image Upload handler

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body.secure_url)
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveItem = () => {
      API.saveItem({
        img: this.state.uploadedFileCloudinaryUrl,
        name: this.state.itemTitle,
        description: this.state.itemDescription,
        location: this.state.itemLocation,
        ownerId: localStorage.getItem('user-id')
        
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
  };





  render() {
    return (
	    <div>
	        <div className="container">
	         <h1> File Uploader </h1>
            <form encType="multipart/form-data">
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                multiple={false}
                accept="image/*">
                <div>Drop an image or click to select a file to upload.</div>
              </Dropzone>

              

				      <label> Title:</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="Item-Title"
                        value={this.state.itemTitle}
                        onChange={this.handleInputChange}
                        name="itemTitle"
                        placeholder="Title of Item" 
                      />
              <label> Location:</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="Item-Location"
                        value={this.state.itemLocation}
                        onChange={this.handleInputChange}
                        name="itemLocation"
                        placeholder="Location of Item" 
                      />
              <label> Description:</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="Item-Description"
                        value={this.state.itemDescription}
                        onChange={this.handleInputChange}
                        name="itemDescription"
                        placeholder="Description of Item" 
                      />
				    <RaisedButton label="Submit" onClick={() => this.saveItem()}/>
            <br/>
            <br/>
				  </form>
          <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                <div>
                  <img src={this.state.uploadedFileCloudinaryUrl} />
                </div>}
          </div>
	        </div>
	    </div>
    )
  }
}

export default Upload;
