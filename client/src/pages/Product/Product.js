import React, { Component } from "react";
import "./Product.css";
import ProductCard from "../../components/ProductCard";
import {Bar, Line} from 'react-chartjs-2';
import MenuItem from 'material-ui/MenuItem';
import Card from 'material-ui/Card'
import API from "../../utils/API";

// Colors
const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';



class Dashboard extends Component {

  state = {
      dropdownOpen: false,
      radioSelected: 2,
      reviews: [],
      //itemId: this.props.match.params.id
      itemId: "5a5e6d2ce738f254a0b2a594",
      qualityRawData: [],
      qualityXAxix: [],
      qualityYAxix: [],
      qualityAvg: 0,
      qualityMedian: 0,
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
        let quality = [];
        let appeal = [];
        let value = [];

        for (let i = 0; i < arr.length; i++){
            appeal.push(arr[i].appeal);
            quality.push(arr[i].quality);
            value.push(arr[i].value);
        }

        this.setState({ qualityRawData: quality });

        let qualityCount = (this.countOccurrence(quality))
        console.log(qualityCount[0])
        console.log(qualityCount[1])
        this.setState({ qualityXAxix: qualityCount[0] });
        this.setState({ qualityYAxix: qualityCount[1] });
        this.setState({ qualityAvg: this.calAverage(quality) });
        this.setState({ qualityMedian: this.calMedian(quality)});
        console.log(this.state.qualityRawData)


        this.setState({ appealData: appeal });
        this.setState({ valueData: value });
    }

    countOccurrence(arr) {
      var a = [], b = [], prev;
      arr.sort();
      for ( var i = 0; i < arr.length; i++ ) {
          if ( arr[i] !== prev ) {
              a.push(arr[i]);
              b.push(1);
          } else {
              b[b.length-1]++;
          }
          prev = arr[i];
      }
      return [a, b];
    }

    calAverage(arr){
      let sum = arr.reduce((previous, current) => current += previous);
      let avg = sum / arr.length;
      return avg;
    }

    calMedian(arr){
      arr.sort((a, b) => a - b);
      let lowMiddle = Math.floor((arr.length - 1) / 2);
      let highMiddle = Math.ceil((arr.length - 1) / 2);
      let median = (arr[lowMiddle] + arr[highMiddle]) / 2;
      return median;
    }





  render() {
    let qualityChartData = {
      labels: this.state.qualityXAxix,
      datasets: [
        {
          label: 'Quality',
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          fill: true,
          //lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.qualityYAxix
        }
      ],
    };


     return (
      <div className="animated fadeIn">
        <div className="row">

           <div className="col s6 l3">
          
            <Card className="text-white bg-primary">
              
               
                <p className="mb-0">Max Quality: {Math.max(...this.state.qualityRawData)}</p>
                <p className="mb-0">Min Quality: {Math.min(...this.state.qualityRawData)}</p>
                <p className="mb-0">Average Quality: {this.state.qualityAvg.toFixed(1)}</p>
                <p className="mb-0">Median Quality: {this.state.qualityMedian.toFixed(1)}</p>
                <div className="chart-wrapper px-3" style={{height:'300px'}}>
                  <Line data={qualityChartData} />
                </div>

                
            </Card>
           </div>

        </div>
      </div>
      )
    }
  }

export default Dashboard