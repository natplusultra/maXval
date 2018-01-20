import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import ProductCard from "../../components/ProductCard";
import ProductUpload from "../../components/ProductUpload";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./User.css";

class User extends Component {
    state = {
        products: []
    }

    // loads user's products
    componentDidMount() {
        this.loadProducts();
    }

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
            <div className="wrapper"> 
                <div className="row avatar-row">
                    <Avatar src={this.props.user.image} size={60} style={{verticalAlign: "middle"}} />
                    <span className="greeting"> Hello, {this.props.user.name}!</span>
                </div>
                <div className="row"></div>
                    <div className="col s12 l12">
                        <h5 className="upload-text">Add a New Product</h5>
                        <ProductUpload />
                    </div>
                <div className="row products-header">
                    <h4>Your Products</h4>
                    <p>Click on a product to view ratings and stats.</p>
                </div>
                <div className="row grid-div">
                    {this.state.products.map((product, i) => (
                        <a href={`/product/${product._id}`} className="product-card">
                            <ProductCard 
                                key={i}
                                productTitle={product.name}
                                productDesc={product.description}
                                productImage={product.img}
                                userLocation={product.location}
                                productID={product._id}
                                style={{display: "inline"}}
                            />
                        </a>
                    ))}
                </div>
            </div>
        );
    };
}

export default User;