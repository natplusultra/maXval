import React, {Component} from 'react';
import Slider from 'material-ui/Slider';
import "./SliderCard.css";

// The slider bar can have a set minimum and maximum, and the value can be obtained through the value parameter fired on an onChange event.

class SliderCard extends Component {
    state = {
        sliderValue: 5
    };

    handleSlider = (event, value) => {
        this.setState({sliderValue: value});
    };

    render() {
        return (
            <div>
                <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={this.state.sliderValue}
                    onChange={this.handleSlider}
                    style={{margin: "0px"}}
                />
                <p>
                    <span>{"Rating: "}</span>
                    <span>{this.state.sliderValue}</span>
                    <span>{" from a range of 0 to 10."}</span>
                </p>
            </div>
        );
    }
}

export default SliderCard;