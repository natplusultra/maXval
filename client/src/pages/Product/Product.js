import React, { Component } from "react";
import "./Product.css";
import ProductCard from "../../components/ProductCard";
import {Bar, Line, HorizontalBar} from 'react-chartjs-2';
import MenuItem from 'material-ui/MenuItem';
import API from "../../utils/API";
import CircularProgressbar from 'react-circular-progressbar';


// Colors
const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}
var mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: true
  },
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Score'
      },
      gridLines: {
        drawOnChartArea: false,
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Votes'
      },
      ticks: {
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: 5,
        max: 15
      }
    }]
  },
  elements: {
    point: {
      radius: 2,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    }
  }
}


class Dashboard extends Component {

  state = {
      dropdownOpen: false,
      radioSelected: 2,
      reviews: [],
      itemId: this.props.match.params.id,
      product: [],
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

      totalVotes: 0,

    }

      // loads user's products
    componentDidMount() {
        this.loadReviews(this.state.itemId);
        this.loadProduct(this.state.itemId);
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

    // loads the product data
    loadProduct = (itemId) => {
      // API call to grab the product data by id
      API.getItem(itemId)
      .then(res => {
        console.log(res)
        this.setState({ product: res.data })})
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

        //Set maximum value on Y axis to length of array.
        // mainChartOpts.scales.yAxes[0].ticks.max = arr.length + 1;

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
          valueMedian: this.calMedian(value),

           //Total Vote Data
          totalVotes: this.calVotes(arr),
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

    calVotes(arr){
      let totalVotes = (arr.length + 1);
      return totalVotes;
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
          backgroundColor: convertHex(brandInfo, 10),
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
          borderColor: brandSuccess,
          backgroundColor: convertHex(brandSuccess, 10),
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
          borderColor: brandDanger,
          backgroundColor: convertHex(brandDanger, 10),
           borderDash: [8, 5],
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
      <div className="animated fadeIn page-wrapper">
        <div className="row">
          <div className="col s12 m4">
            <ProductCard 
              productTitle={this.state.product.name}
              productImage={this.state.product.img}
              userLocation={this.state.product.location}
              productDesc={this.state.product.description}
            />
          </div>
          <div className="col s12 m8">
            <h5 className="rating-title">Ratings Data</h5>
            <div className="row">
              <div className="col s12 m12">
                <div className="chart-wrapper px-3" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                  <Line data={chartData} options={mainChartOpts} height={100}/>
                </div>
              </div>
            </div>
            <div className="row donuts-div">
              <div className="col s6 m3">
              <CircularProgressbar
               percentage={100}
               textForPercentage={(percentage) => {return  `${(this.state.totalVotes)}`;}}
               className="CircularProgressbar-inverted"
                background
                backgroundPadding={5}
                strokeWidth={6}
                percentage={0} />
                <span className="text-graph">Total Votes</span>
              </div>
              <div className="col s6 m3">
                <CircularProgressbar percentage={this.state.qualityAvg*10} textForPercentage={(percentage) => {return  `${(percentage/10).toFixed(2)}`;}} className="progressbar-quality" />
              <span className="text-graph">Average Quality</span>
              </div>
              <div className="col s6 m3">
                <CircularProgressbar percentage={this.state.appealAvg*10} textForPercentage={(percentage) => {return  `${(percentage/10).toFixed(2)}`;}} className="progressbar-appeal" />
              <span className="text-graph">Average Appeal</span>
              </div>
              <div className="col s6 m3">
                <CircularProgressbar percentage={this.state.valueAvg*10} textForPercentage={(percentage) => {return  `${(percentage/10).toFixed(2)}`;}} className="progressbar-value" />
              <span className="text-graph">Average Value</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }

export default Dashboard;