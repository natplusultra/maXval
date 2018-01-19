import React from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
// import SliderCard from "../SliderCard";
import TextField from "material-ui/TextField";
import "./RatingPanel.css";
import Slider from 'material-ui/Slider';





const RatingPanel = () => {

    // handleSlider = (event, value) => {
    //     this.setState({sliderValue: value});
    // };

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
                            min={0}
                            max={10}
                            step={1}
                            // value={this.state.sliderValue}
                            // onChange={this.handleSlider}
                            style={{margin: "0px"}}
                        />
                        <p>
                            <span>{"Rating: "}</span>
                            {/* <span>{this.state.sliderValue}</span> */}
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
                            min={0}
                            max={10}
                            step={1}
                            // value={this.state.sliderValue}
                            // onChange={this.handleSlider}
                            style={{margin: "0px"}}
                        />
                        <p>
                            <span>{"Rating: "}</span>
                            {/* <span>{this.state.sliderValue}</span> */}
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
                            min={0}
                            max={10}
                            step={1}
                            // value={this.state.sliderValue}
                            // onChange={this.handleSlider}
                            style={{margin: "0px"}}
                        />
                        <p>
                            <span>{"Rating: "}</span>
                            {/* <span>{this.state.sliderValue}</span> */}
                            <span>{" from a range of 0 to 10."}</span>
                        </p>
                    </div>
                    <br/>
                    <a className="waves-effect waves-light btn">Submit Rating</a>
                </CardText>
            </Card>
        </div>
    )
}

export default RatingPanel;
