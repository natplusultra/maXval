import React, { Component } from "react";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import ExpandTransition from "material-ui/internal/ExpandTransition";
import TextField from "material-ui/TextField";
import ImageDrop from "../ImageDrop";
import "./ProductUpload.css";

class ProductUpload extends Component {

    state = {
        loading: false,
        finished: false,
        stepIndex: 0,
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (
            <div>
                <ImageDrop />
                <p>
                Please drag and drop an image of your product into the image uploader. When you are done uploading an image, please click Next to continue.
                </p>
            </div>
            );
        case 1:
            return (
            <div>
                <TextField style={{marginTop: 0, marginRight: "40px"}} floatingLabelText="Product name" />
                <TextField style={{marginTop: 0}} floatingLabelText="Location" />
                <TextField style={{marginTop: 0}} floatingLabelText="Description" />
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
            return 'You\'re a long way from home sonny jim!';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

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
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleNext}
                    style={{backgroundColor: "#5dbbb6"}}
                />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
                <ExpandTransition loading={loading} open={true}>
                {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

export default ProductUpload;