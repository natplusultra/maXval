import React, { Component } from "react";
import "./Product.css";
import ProductCard from "../../components/ProductCard";
import {Bar, Line} from 'react-chartjs-2';
import MenuItem from 'material-ui/MenuItem';
import Card from 'material-ui/Card'

// Colors
const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ],
};

const cardChartOpts2 = {
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
        min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
        max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
      }
    }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandWarning,
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40]
    }
  ],
};

const cardChartOpts3 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }],
  },
  elements: {
    line: {
      borderWidth: 2
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}
// Card Chart 4

const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
    }
  ],
};

const cardChartOpts4 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false,
      barPercentage: 0.6,
    }],
    yAxes: [{
      display: false,
    }]
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  



  render() {

  	 return (
      <div className="animated fadeIn">
        <div className="row">
        <div className="col s6 l3">
          
            <Card className="pb-">
               
               
                <h4 className="mb-0">9.823</h4>
                <p>Average Quality</p>
                <div className="chart-wrapper px-3" style={{height:'70px'}}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
                </div>
                
             
            </Card>
           </div>

           <div className="col s6 l3">
          
            <Card className="text-white bg-primary">
              
               
                <h4 className="mb-0">9.823</h4>
                <p>Average Appeal</p>
                <div className="chart-wrapper px-3" style={{height:'70px'}}>
                <Line data={cardChartData2} options={cardChartOpts2} height={70}/>
              </div>

                
            </Card>
           </div>

           <div className="col s6 l3">
          
            <Card className="text-white bg-primary">
              
               
                <h4 className="mb-0">9.823</h4>
                <p>Average Value</p>
                 <div className="chart-wrapper px-0" style={{height:'70px'}}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70}/>
              </div>
             
            </Card>
           </div>

           <div className="col s6 l3">
          
            <Card className="text-white bg-primary">
              
               
                <h4 className="mb-0">9.823</h4>
                <p>Average Quality</p>
                <div className="chart-wrapper px-3" style={{height:'70px'}}>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70}/>
              </div>
             
            </Card>
           </div>
        </div>
      </div>
      )
  	}
  }

export default Dashboard