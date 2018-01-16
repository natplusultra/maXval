import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import ProductCard from "../../components/ProductCard";
import ProductUpload from "../../components/ProductUpload";
import "./User.css";

class User extends Component {
    state = {
        products: [
            {
                title: "Handmade Ceramic Vases 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1481401908818-600b7a676c0d?auto=format&fit=crop&w=2551&q=80",
                userName: "Jane Doe",
                userLocation: "New York",
                userImage: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=2141&q=80"
            },
            {
                title: "Handmade Ceramic Vases 2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1481401908818-600b7a676c0d?auto=format&fit=crop&w=2551&q=80",
                userName: "Jane Doe",
                userLocation: "New York",
                userImage: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=2141&q=80"
            },
            {
                title: "Handmade Ceramic Vases 3",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1481401908818-600b7a676c0d?auto=format&fit=crop&w=2551&q=80",
                userName: "Jane Doe",
                userLocation: "New York",
                userImage: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=2141&q=80"
            }
        ]
    }

    render() {
        console.log(this.props.user);
        return (
            <div className="wrapper"> 
                <div className="row">
                    <Avatar src={this.props.user.image} size={60} style={{verticalAlign: "middle"}} />
                    <span className="greeting"> Hello, {this.props.user.name}!</span>
                </div>
                <div className="row"></div>
                    <div className="col s12 l12">
                        <h5 className="upload-text">Add a New Product</h5>
                        <ProductUpload />
                    </div>
                <div className="row">
                    <h4>Your Products</h4>
                    <p>Click on a product to view ratings and stats.</p>
                </div>
                <div className="row grid-div">
                    {this.state.products.map(product => (
                        <ProductCard 
                            productTitle={product.title}
                            productDesc={product.description}
                            productImage={product.image}
                            userName={product.userName}
                            userLocation={product.userLocation}
                            userImage={product.userImage}
                            style={{display: "inline"}}
                        />
                    ))}
                </div>
            </div>
        );
    };
}

export default User;