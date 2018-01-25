import React, { Component } from "react";
import "./Product.css";
import ProductCard from "../../components/ProductCard";
import {Bar, Line, HorizontalBar} from 'react-chartjs-2';
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
      itemId: this.props.match.params.id,
      XAxis: ["0", '1', '2', '3', '4', '5', '6', '7', "8", "9", "10"],

      qualityRawData: [],
      qualityYAxis: [],
      qualityAvg: 0,
      qualityMedian: 0,


      appealRawData: [],
      appealYAxis: [],
      appealAvg: 0,
      appealMedian: 0,

      valueRawData: [],
      valueYAxis: [],
      valueAvg: 0,
      valueMedian: 0,

    }

      // loads user's products
    componentDidMount() {
        this.loadReviews(this.state.itemId);
    }

    //Load reviews from API, and parse the reviews data
    loadReviews = (itemId) => {
        //API call to grab the reviews based on item ID
        API.getItemReview(itemId) 
        .then(res => {
            //Parse the reviews object into separate arrays
            this.parseReviewData(res.data)
            //set the reviews state.
            this.setState({ reviews: res.data })})
        .catch(err => console.log(err));
    };

    parseReviewData(arr) {
        //Arrays that will hold the individually parsed review data
        let quality = [];
        let appeal = [];
        let value = [];

        //loop through the reviews object, and create new arrays holding quality, appeal and value
        for (let i = 0; i < arr.length; i++){
            appeal.push(arr[i].appeal);
            quality.push(arr[i].quality);
            value.push(arr[i].value);
        }
        
        //Count the occurrences of each value.
        let qualityCount = (this.countOccurrence(quality))
        let appealCount = (this.countOccurrence(appeal))
        let valueCount = (this.countOccurrence(value))

        this.setState({
          //Quality data 
          qualityRawData: quality,
          qualityYAxis: qualityCount,
          qualityAvg: this.calAverage(quality),
          qualityMedian: this.calMedian(quality),

          //Appeal data
          appealRawData: appeal,
          appealYAxis: appealCount,
          appealAvg: this.calAverage(appeal),
          appealMedian: this.calMedian(appeal),

          //Value data
          valueRawData: value,
          valueYAxis: valueCount,
          valueAvg: this.calAverage(value),
          valueMedian: this.calMedian(value)
        });
    }

    countOccurrence(arr) {
      arr.sort((a, b) => a - b)
      var counts = {
        '0':0,
        '1':0,
        '2':0,
        '3':0,
        '4':0,
        '5':0,
        '6':0,
        '7':0,
        '8':0,
        '9':0,
        '10':0
      };

      //Create an object with keys of "counts", and 
      //value of the count of each number in the reviews
      for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      //Parse the counts into an array holding
      //The Y Axis data
      let temp = [];
        for (var key in counts){
          temp.push(counts[key])
        }

      return temp;
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
    let chartData = {
      labels: this.state.XAxis,
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
          data: this.state.qualityYAxis
        },
        {
          label: 'Appeal',
          fill: true,
          borderColor: "#3e95cd",
          fillColor: "#3e95cd",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.state.appealYAxis
        },
        {
          label: 'Value',
          borderColor: "#c45850",
          fill: true,
          data: this.state.valueYAxis
        }
      ],
    };

    const horizontalBarData = {
      labels: ['Quality', 'Appeal', 'Value'],
      datasets: [
        {
          label: 'Averages',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 2,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.state.qualityAvg, this.state.appealAvg, this.state.valueAvg]
        }
      ]
    };


     return (
      <div className="animated fadeIn">
        <div className="row">
           <div className="col s6 l3">          
              <div className="chart-wrapper px-3" style={{height:'300px'}, {width:'600px'} }>
                <Line data={chartData} />
              </div>               
           </div>
        </div>
        <div className="row">
          <div className="col s6 l3">
               <HorizontalBar data= {horizontalBarData} />
           </div>
        </div>
      </div>
      )
    }
  }

export default Dashboard