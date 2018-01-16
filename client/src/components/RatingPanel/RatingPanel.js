import React from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import SliderCard from "../SliderCard";
import TextField from "material-ui/TextField";
import "./RatingPanel.css";

const RatingPanel = () => {
    return (
        <div>
            <Card>
                <CardTitle 
                    title="Quality" 
                    style={{padding: "20px 20px 0px 20px"}} 
                />
                <CardText style={{padding: "0px 20px 10px 20px"}}>
                    <SliderCard/>
                </CardText>
            </Card>
            <Card>
                <CardTitle 
                    title="Appeal" 
                    style={{padding: "20px 20px 0px 20px"}} 
                />
                <CardText style={{padding: "0px 20px 10px 20px"}}>
                    <SliderCard/>
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
                    <TextField
                        hintText="Maximum value"
                        floatingLabelText="Price"
                        type="Maximum value"
                    />
                    <br/>
                    <a className="waves-effect waves-light btn">Submit Rating</a>
                </CardText>
            </Card>
        </div>
    )
}

export default RatingPanel;
