import React, { Component } from "react";
import Avatar from "material-ui/Avatar";
import ProductCard from "../../components/ProductCard";
import API from "../../utils/API";
import "./Product.css";
import {Bar, Line} from 'react-chartjs-2';
import MenuItem from 'material-ui/MenuItem';
import Card from 'material-ui/Card'

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// Card Chart 1
const cardChartData1 = {
  labels: ["0", '1', '2', '3', '4', '5', '6', '7', "8", "9", "10"],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ],
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'transparent',
        zeroLineColor: 'transparent'
      },
      ticks: {
        fontSize: 2,
        fontColor: 'transparent',
      }

    }],
    yAxes: [{
      display: false,
      ticks: {
        display: false,
        min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

class User extends Component {
    state = {
        reviews: [],
        itemId: this.props.match.params.id,
        // itemId: "5a5e6d2ce738f254a0b2a594",
        qualityData: [],
        appealData: [],
        valueData:[]
    }
    
    // loads user's products
    componentDidMount() {
        this.loadReviews(this.state.itemId);
    }

    loadReviews = (itemId) => {
        API.getItemReview(itemId) 
        .then(res => {
            this.parseReviewData(res.data)
            this.setState({ reviews: res.data })})
        .catch(err => console.log(err));
    };

    parseReviewData(arr) {
        console.log(arr)
        let quality = [];
        let appeal = [];
        let value = [];

        for (let i = 0; i < arr.length; i++){
            appeal.push(arr[i].appeal);
            quality.push(arr[i].quality);
            value.push(arr[i].value);
        }
        console.log(quality);
        console.log(appeal);
        console.log(value);
        this.setState({ qualityData: quality });
        this.setState({ appealData: appeal });
        this.setState({ valueData: value });
    }

    render() {
        return (
            <div className="wrapper"> 
                <div className="row"></div>
                    <div className="col s12 l12">
                        <h5 className="upload-text">Add a New Product</h5>
                        <ProductUpload />
                    </div>
                <div className="row products-header">
                    <h4>Your Products</h4>
                    <p>Click on a product to view ratings and stats.</p>
                </div>
            </div>
        );
    };
}

export default User;