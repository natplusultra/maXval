import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import ProductCard from "../../components/ProductCard";
import ProductUpload from "../../components/ProductUpload";
import API from "../../utils/API";
import "./User.css";

class User extends Component {
    state = {
        products: [],
        uid: this.props.match.params.id
    }
    
    // loads user's products
    componentDidMount() {
        this.loadProducts(this.state.uid);
    }

    loadProducts = (ownerId) => {
        API.getItemByOwner(ownerId) 
        .then(res => {
            console.log(res)
            this.setState({ products: res.data })})
        .catch(err => console.log(err));
    };

    deleteProduct = (productId) => {
        API.deleteItem(productId)
        .then(res => this.loadProducts(this.state.uid))
        .catch(err => console.log(err));
    };

    render() {
        console.log(this.props.user);
        console.log(this.state.uid);
        return (
            <div className="wrapper"> 
                <div className="row avatar-row">
                    <Avatar src={this.props.user.image} size={60} style={{verticalAlign: "middle"}} />
                    <span className="greeting"> Hello, {this.props.user.name}!</span>
                </div>
                <div className="row"></div>
                    <div className="col s12 l12">
                        <h5 className="upload-text">Add a New Product</h5>
                        <ProductUpload 
                            uid={this.state.uid}
                            loadProducts={this.loadProducts}
                        />
                    </div>
                <div className="row products-header">
                    <h4>Your Products</h4>
                    <p>Click on a product to view ratings and stats.</p>
                </div>
                <div className="row grid-div">
                    {this.state.products.map((product, i) => (
                        <div>
                            <div className="product-card">
                                <a href={`/product/${product._id}`} >
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
                            </div>
                            <div className="delete-btn">
                                <a className="waves-effect waves-light btn" onClick={() => {this.deleteProduct(product._id)}}>Delete</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
}

export default User;