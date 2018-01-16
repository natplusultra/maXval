import React, { Component } from "react";
import {Card, CardMedia} from "material-ui/Card";
import ProductCard from "../../components/ProductCard";
import "./User.css";

class User extends Component {
    state = {
        products: [
            {
                title: "Artisanal Wooden Bowls",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1501420896719-ad7fe0ee297e?auto=format&fit=crop&w=2550&q=80",
                userName: "Bobby Bob",
                userLocation: "San Diego",
                userImage: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=1302&q=80"
            },
            {
                title: "Handmade Ceramic Vases",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1481401908818-600b7a676c0d?auto=format&fit=crop&w=2551&q=80",
                userName: "Jane Doe",
                userLocation: "New York",
                userImage: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=2141&q=80"
            },
            {
                title: "Custom Leather Shoes",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?auto=format&fit=crop&w=1600&q=80",
                userName: "Mr. Shoe",
                userLocation: "Los Angeles",
                userImage: "https://images.unsplash.com/photo-1502980426475-b83966705988?auto=format&fit=crop&w=1273&q=80"
            }
        ]
    }

    render() {
        return (
            <div className="container"> 
                <div className="row"></div>
                    <div className="col s6 l3">
                    </div>
                    <div className="col s6 l9">

                    </div>
                <div className="row"></div>
            </div>
        );
    };
}

export default User;