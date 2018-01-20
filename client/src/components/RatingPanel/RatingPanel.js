import React, { Component } from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import "./RatingPanel.css";
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';



class RatingPanel extends Component {
    constructor(props) {
        super(props);
        this.handleQualitySlider = this.handleQualitySlider.bind(this);
        this.handleAppealSlider = this.handleAppealSlider.bind(this);
        this.handleValueSlider = this.handleValueSlider.bind(this);
        this.saveReview = this.saveReview.bind(this);
        console.log(props);
    }

    handleQualitySlider(event, value){
        this.props.handleQualitySlider(value);
    }

    handleAppealSlider(event, value){
        this.props.handleAppealSlider(value);
    }

    handleValueSlider(event, value){
        this.props.handleValueSlider(value);
    }

    saveReview(){
        this.props.saveReview();
    }

    render () {
        return (
            <div>
                <Card>
                    <CardTitle 
                        title="Quality" 
                        style={{padding: "20px 20px 0px 20px"}} 
                    />
                    <CardText style={{padding: "0px 20px 10px 20px"}}>
                        <div>
                            <Slider
                                name="qualitySlider"
                                min={0}
                                max={10}
                                step={1}
                                value={this.props.qualitySlider}
                                onChange={this.handleQualitySlider}
                                style={{margin: "0px"}}
                            />
                            <p>
                                <span>{"Rating: "}</span>
                                <span>{this.props.qualitySlider}</span>
                                <span>{" from a range of 0 to 10."}</span>
                            </p>
                        </div>
                    </CardText>
                </Card>
                <Card>
                    <CardTitle 
                        title="Appeal" 
                        style={{padding: "20px 20px 0px 20px"}} 
                    />
                    <CardText style={{padding: "0px 20px 10px 20px"}}>
                        <div>
                            <Slider
                                name="appealSlider"
                                min={0}
                                max={10}
                                step={1}
                                value={this.props.appealSlider}
                                onChange={this.handleAppealSlider}
                                style={{margin: "0px"}}
                            />
                            <p>
                                <span>{"Rating: "}</span>
                                <span>{this.props.appealSlider}</span>
                                <span>{" from a range of 0 to 10."}</span>
                            </p>
                        </div>
                    </CardText>
                </Card>
                <Card>
                    <CardTitle 
                        title="Value" 
                        style={{padding: "20px 20px 0px 20px"}} 
                    />
                    <CardText style={{padding: "0px 20px 10px 20px"}}>
                        What is the maximum you would pay for this product?
                        <br/>
                        <div>
                            <Slider
                                name="valueSlider"
                                min={0}
                                max={10}
                                step={1}
                                value={this.props.valueSlider}
                                onChange={this.handleValueSlider}
                                style={{margin: "0px"}}
                            />
                            <p>
                                <span>{"Rating: "}</span>
                                <span>{this.props.valueSlider}</span>
                                <span>{" from a range of 0 to 10."}</span>
                            </p>
                        </div>
                        <br/>
                        <RaisedButton onClick={this.saveReview} label="Submit Rating" backgroundColor="#4db6ac" labelColor="#ffffff" />
                    </CardText>
                </Card>
            </div>
        );
    }
}


export default RatingPanel;
