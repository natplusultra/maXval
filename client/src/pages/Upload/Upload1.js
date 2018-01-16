import React, { Component } from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import ProductCard from "../../components/ProductCard";
import SliderCard from "../../components/SliderCard";
import API from "../../utils/API";
import axios from 'axios';
import Dropzone from 'react-dropzone';
import request from 'superagent';


// Setting Cloudinary Preset 
const CLOUDINARY_UPLOAD_PRESET = 'z3tji56i';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfkkuo5j8/image/upload';


//User can drop an image & the component will send it to Cloudinary
//and receives a transformed image URL for us to use.


  // Setting our component's initial state
  export default class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

// Image Upload handler

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </form>
    )
  }
}



// var CLOUDINARY_UPLOAD_PRESET = 'z3tji56i';
// var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfkkuo5j8/image/upload';


//  var imgPreview = document.getElementById('img-preview');
//  var fileUpload = document.getElementById('file-upload');

//  fileUpload.addEventListener('change', function(event){
//   var file = event.target.files[0];
//   var formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
//   console.log(file);
 

//  axios({
//   url: CLOUDINARY_URL,
//   method: 'POST',
//   headers: {
//     'Content-Type':'application/x-www-form-urlencoded'
//   },
//   data: formData
//  }).then(function(res) {
//   console.log(res);
//   imgPreview.src = res.data.secure_url;
//  }).catch(function(err) {
//   console.error(err);
//  });

// });