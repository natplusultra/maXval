import React, { Component } from "react";
import ProductCard from "../../components/ProductCard";
import RatingPanel from "../../components/RatingPanel";
import API from "../../utils/API";
import "./Rate.css";

class Rate extends Component {
    constructor(props) {
        super(props);
        this.handleQualitySlider = this.handleQualitySlider.bind(this);
        this.handleAppealSlider = this.handleAppealSlider.bind(this);
        this.handleValueSlider = this.handleValueSlider.bind(this);
        this.state = {
            products: [],
            prodIndex: 0,
            qualitySlider: 5,
            appealSlider: 5,
            valueSlider: 5
        }
    }

    handleQualitySlider = (value) => {
        console.log(value);
        this.setState({
            qualitySlider: value
        });
    };


    handleAppealSlider = (value) => {
        console.log(value);
        this.setState({
            appealSlider: value
        });
    };

    handleValueSlider = (value) => {
        console.log(value);
        this.setState({
            valueSlider: value
        });
    };
    
    submitProduct = () => {

    }


    //loads products
    componentDidMount() {
        this.loadProducts();
    }

    //loads all products in the database
    loadProducts = () => {
        API.getAllItems()
        .then(res => {
            console.log(res)
            this.setState({ products: res.data })})
        .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                {this.state.products.map(product => (
                    <div className="row productDiv">
                        <div className="col s12 l6">          
                            <ProductCard 
                                productTitle={product.name}
                                productDesc={product.description}
                                productImage={product.img}
                                userName={product.userName}
                                userLocation={product.location}
                                userImage={product.userImage}
                                style={{display: "inline-block"}}
                            />
                        </div>
                        <div className="col s12 l6">
                            <RatingPanel
                                qualitySlider={this.state.qualitySlider}
                                appealSlider={this.state.appealSlider}
                                valueSlider={this.state.valueSlider}
                                handleQualitySlider={this.handleQualitySlider}
                                handleAppealSlider={this.handleAppealSlider}
                                handleValueSlider={this.handleValueSlider}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };
}

export default Rate;