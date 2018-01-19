import React, { Component } from "react";
import ProductCard from "../../components/ProductCard";
import RatingPanel from "../../components/RatingPanel";
import API from "../../utils/API";
import "./Rate.css";

class Rate extends Component {
    state = {
        products: [],
        prodIndex: 0
        
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
        console.log(this.props.user);
        return (
            <div className="container">
                {this.state.products.map(product => (
                    
                    <div className="row productDiv">
                        <div className="col s12 l6">
                            {console.log(product)}             
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
                            <RatingPanel />
                        </div>
                    </div>
                ))}
            </div>
        );
    };
}

export default Rate;