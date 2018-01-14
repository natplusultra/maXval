import React from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import SliderCard from "../SliderCard";
import "./RatingPanel.css";

const RatingPanel = () => {
        <div>
            <Card>
                <CardTitle 
                    title="Quality" 
                    style={{padding: "10px 20px"}} 
                />
                <CardText style={{padding: "10px 20px"}}>
                    <SliderCard/>
                </CardText>
            </Card>
            <Card>
                <CardTitle 
                    title="Appeal" 
                    style={{padding: "10px 20px"}} 
                />
                <CardText style={{padding: "10px 20px"}}>
                    <SliderCard/>
                </CardText>
            </Card>
            <Card>
                <CardTitle 
                    title="Value" 
                    style={{padding: "10px 20px"}} 
                />
                <CardText style={{padding: "10px 20px"}}>
                    <SliderCard/>
                </CardText>
            </Card>
        </div>
}

export default RatingPanel;
