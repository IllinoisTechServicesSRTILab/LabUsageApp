import React, {Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import LabForm from './LabForm';

class AvgChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartOptions: {},
      currLab: 'DCL L416',
      allData: props.allData,
    }
    this.handler = this.handler.bind(this);
  }

  //This function takes in "e", a lab that is passed in from the Select Form
  handler(e) {
    //Get the averages for the new lab
    var avgs = [];
    this.state.allData.map(item => (
      avgs.push(item[e])
    ));
    //Update our chartData to display the lab's info
    this.setState({
      currLab: e,
      chartData: {
        labels: ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM",
      "9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
      "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"],
        datasets: [
          {
            label: 'In Use',
            data: avgs,
            backgroundColor: 'rgba(200, 150, 200,.6)'
          }
        ],
      }
    });
  }

  render() {
    //Return a line chart with the current lab data
    return (
      <div>
        <div classname="chart">
        <LabForm action={this.handler}/>
        <Line
          data={this.state.chartData}
          options={{
            elements: {
              line: {
                tension: 0
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
        </div>
      </div>
    )
  }
}

export default AvgChart;
