import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./ImageDrop.css";

// sets the Cloudinary variables
const CLOUDINARY_UPLOAD_PRESET = 'z3tji56i';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfkkuo5j8/image/upload';

class ImageDrop extends Component {
    // sets the initial state
    constructor(props) {
        super(props);

        this.state = {
            currentUserID: "",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ""
        };
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    // image upload handler
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);

        upload.end((err, response) => {
            if (err) {
                console.log(err);
            }

            if (response.body.secure_url !== "") {
                console.log(response.body.secure_url)
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="uploadDiv">
                    <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="image/*">
                        <div className="dropzone-text"> Drop an image or click to select a file to upload.</div>
                    </Dropzone>
                </div>
                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                    <div className="imageDiv">
                        <img className="imageThumb" src={this.state.uploadedFileCloudinaryUrl} alt="product" />
                    </div>}
                </div>
          </div>
        )
    }
}

export default ImageDrop;
