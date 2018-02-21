import React, { Component } from "react";
import API from "../../utils/API";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import TextField from "material-ui/TextField";
import Dropzone from "react-dropzone";
import request from "superagent";
import "./ProductUpload.css";

// sets the Cloudinary variables
const CLOUDINARY_UPLOAD_PRESET = "z3tji56i";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfkkuo5j8/image/upload";

class ProductUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,
            currentUserID: "",
            itemTitle: "",
            itemLocation: "",
            itemDescription: "",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: "",
            isDesktop: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updatePredicate = this.updatePredicate.bind(this);
    }

        componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
      }
    
      componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
      }
    
      updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 992 });
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
        this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex - 1,
        }));
        }
    };

    resetState = () => {
        this.setState({
            currentUserID: "",
            itemTitle: "",
            itemLocation: "",
            itemDescription: "",
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ""
        });
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
            <div>
                <div className="row">
                    <div className="col s6 uploadDiv">
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*">
                            <div className="dropzone-text"> Drop an image or click to select a file to upload.</div>
                        </Dropzone>
                    </div>
                    <div className="col 6">
                        {this.state.uploadedFileCloudinaryUrl === "" ? null :
                        <div className="imageDiv">
                            <img className="imageThumb" src={this.state.uploadedFileCloudinaryUrl} alt="product" />
                        </div>}
                    </div>
                </div>
                <p>
                Please drag and drop an image of your product into the image uploader. When you are done selecting an image, please click Next to continue.
                </p>
            </div>
            );
        case 1:
            return (
            <div>
                <TextField 
                    name="itemTitle" 
                    value={this.state.itemTitle} 
                    onChange={this.handleInputChange} 
                    style={{marginTop: 0, marginRight: "40px"}} 
                    floatingLabelText="Product name" 
                />
                <TextField 
                    name ="itemLocation" 
                    value={this.state.itemLocation} 
                    onChange={this.handleInputChange} 
                    style={{marginTop: 0}} 
                    floatingLabelText="Location" 
                />
                <TextField 
                    name="itemDescription" 
                    value={this.state.itemDescription} 
                    onChange={this.handleInputChange} 
                    style={{marginTop: 0}} 
                    floatingLabelText="Description" 
                />
                <p>
                Please enter the product name, location, and a short description. When you have entered the correct information, please click Next to continue.
                </p>
            </div>
            );
        case 2:
            return (
            <p>
                Thanks for uploading a new product for review! We hope to have valuable feedback for you soon. You may go back to edit, or click Finish if you are done.
            </p>
            );
        default:
            return "You're a long way from home sonny jim!";
        }
    }

    saveItem = () => {
        API.saveItem({
            img: this.state.uploadedFileCloudinaryUrl,
            name: this.state.itemTitle,
            description: this.state.itemDescription,
            location: this.state.itemLocation,
            ownerId: localStorage.getItem("user-id")
        })
        .then(res => console.log(res))
        .then(this.handleNext())
        .then(this.resetState())
        .then(() => this.props.loadProducts(this.props.uid))
        .catch(err => console.log(err));
    };

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: "0 16px", overflow: "hidden"};

        if (finished) {
            return (
                <div style={contentStyle}>
                <p>
                    <a
                    href="#"
                    onClick={(event) => {
                        event.preventDefault();
                        this.setState({stepIndex: 0, finished: false});
                    }}
                    >
                    Click here
                    </a> to upload another product.
                </p>
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    label={stepIndex === 2 ? "Finish" : "Next"}
                    primary={true}
                    onClick={stepIndex === 2 ? () => this.saveItem() : this.handleNext}
                    style={{backgroundColor: "#5dbbb6"}}
                />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;
        const isDesktop = this.state.isDesktop;

        return (
            <div style={{width: "100%", maxWidth: 700, margin: "auto"}}>
                {isDesktop ? (
                        <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Upload product image</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Provide product details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Submit new product</StepLabel>
                        </Step>
                        </Stepper>
                    ) : (
                        <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Upload product image</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Provide product details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Submit new product</StepLabel>
                        </Step>
                        </Stepper>
                    )}

                <ExpandTransition loading={loading} open={true}>
                {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

export default ProductUpload;