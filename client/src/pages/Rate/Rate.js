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
        this.saveReview = this.saveReview.bind(this);
        this.state = {
            products: [],
            prodIndex: 0,
            qualitySlider: 5,
            appealSlider: 5,
            valueSlider: 5,
            lastItem: false
        }
    }

    handleQualitySlider = (value) => {
        console.log(this.state.products);
        this.setState({
            qualitySlider: value
        });
    };


    handleAppealSlider = (value) => {
        this.setState({
            appealSlider: value
        });
    };

    handleValueSlider = (value) => {
        this.setState({
            valueSlider: value
        });
    };
    

    //loads products
    componentDidMount() {
        this.loadProducts();
    }

    //loads all products in the database
    loadProducts = () => {
        API.getAllItems()
        .then(res => {
            console.log(res.data)
            this.setState({ products: res.data })})
        .catch(err => console.log(err));
    };

    resetState = () => {
        if(this.state.products.length === this.state.prodIndex + 1) {
            this.setState({
                lastItem: true
            }) 
        } else {
            this.setState({
                qualitySlider: 5,
                appealSlider: 5,
                valueSlider: 5,
                prodIndex: this.state.prodIndex + 1
            })
        }
    }

    saveReview = () => {
        let ItemId;
            ItemId = this.state.products[this.state.prodIndex]._id.toString();
            API.saveReview({ 
                quality: this.state.qualitySlider,
                appeal: this.state.appealSlider,
                value: this.state.valueSlider,
                reviewer: this.props.user.uid,
                ItemId: ItemId
            })
            .then(this.resetState())
            .catch(err => console.log(err));
    }
    


    render() {
        let name;
        let description;
        let location;
        let img;
    if(this.state.products.length > 0 ){
        name = this.state.products[this.state.prodIndex].name
        description = this.state.products[this.state.prodIndex].description
        location = this.state.products[this.state.prodIndex].location
        img = this.state.products[this.state.prodIndex].img
        // console.log(this.state.products[0])
        // console.log(this.props.user)
    }
    
        return (


            <div className="container">
                {this.state.lastItem ? (
                    <div>
                        <h2 className="center"> Thank you for your responses.</h2>
                    </div>
                ) : (

                    <div className="row productDiv">
                    <div className="col s12 l6">  
                        <ProductCard 
                            productTitle={name}
                            productDesc={description}
                            productImage={img}
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
                            saveReview={this.saveReview}
                        />
                    </div>
                </div> 
                )}

            </div>
        )
    }
}

export default Rate;