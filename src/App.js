import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart';
import LabForm from './components/LabForm';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import AvgChart from './components/AvgChart';
import SpinningWheel from './components/SpinningWheel';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ics: [],
      ews: [],
      isLoaded: false,
      stackedICSData:{},
      stackedEWSData:{},
      currLab:"",
      labAverages:{},
      lineAvgs:{},
    }
  }

  componentDidMount() {
    //Fetch the API data in promise chain
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://69smoo2dc6.execute-api.us-east-1.amazonaws.com/api/ics";
    const url2 = "https://69smoo2dc6.execute-api.us-east-1.amazonaws.com/api/ews";
    const url3 = "https://pzgw0wp7ch.execute-api.us-east-1.amazonaws.com/default/getAverageCompLab";
    Promise.all([fetch(proxyurl + url), fetch(proxyurl + url2), fetch(proxyurl + url3)])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        //Parse the API data into lists
        var ics_actives = [];
        var ics_availables = [];
        var ics_names = [];
        data1.map(item => (
          ics_actives.push(item["usage_active"]),
          ics_availables.push(item["usage_total"] - item["usage_active"]),
          ics_names.push(item["site_displayname"])
        ));
        var ews_actives = [];
        var ews_availables = [];
        var ews_names = [];
        data2.map(item => (
          ews_actives.push(item["inusecount"]),
          ews_availables.push(item["machinecount"] - item["inusecount"]),
          ews_names.push(item["strlabname"])
        ));
        var avgs = [];
        data3.map(item => (
          avgs.push(item["DCL L416"])
        ));
        //Update all the state variables with the API data
        this.setState({
          labAverages: data3,
          isLoaded: true,
          ics: data1,
          ews: data2,
          stackedICSData: {
            labels: ics_names,
            datasets: [
              {
                label:'In Use',
                data: ics_actives,
                backgroundColor: 'rgba(200, 100, 100, .6)'
              },
              {
                label:'Available',
                data: ics_availables,
                backgroundColor: 'rgba(100, 200, 100, .6)'
              }
            ],
          },
          stackedEWSData: {
            labels: ews_names,
            datasets: [
              {
                label:'In Use',
                data: ews_actives,
                backgroundColor: 'rgba(200, 100, 100, .6)'
              },
              {
                label:'Available',
                data: ews_availables,
                backgroundColor: 'rgba(100, 200, 100, .6)'
              }
            ],
          },
          lineAvgs: {
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
        })
      });
  }

  render() {
    //Not important
    var { ics, ews, isLoaded, stackedICSData, stackedEWSData, test, labAverages } = this.state;
    var stackedOptions = {
      scales: {
        xAxes: [{
          stacked: true ,
          ticks: {
            display: true,
            autoSkip: false
          }
        }],
        yAxes: [{ stacked: true }]
      },
    };
    //If data isn't loaded, show loading screen, otherwise display app
    if (!isLoaded) {
      return (
        <div class="loading_box">
          Loading data...
          <SpinningWheel />
        </div>);
    } else {
      return (
        <div className="App">
          <div class="navbar_new">
            <div>Lab Usage Data</div>
            <div><a href="https://it.engineering.illinois.edu/ews" target="_blank">EWS</a></div>
            <div><a href="https://techservices.illinois.edu/content/computer-lab-locations-and-hours" target="_blank">ICS</a></div>
            <div><a href="https://srtilab.techservices.illinois.edu/" target="_blank">SRTI</a></div>
          </div>
          <div class="chart_title">EWS (Engineering Workstations)</div>
          <div class="chart_container">
            <Chart chartData={this.state.stackedEWSData} chartOptions={stackedOptions} />
          </div>
          <div class="chart_title">ICS (Instructional Computing Services)</div>
          <div class="chart_container">
            <Chart chartData={this.state.stackedICSData} chartOptions={stackedOptions} />
          </div>
          <div class="chart_title">Hourly Lab Trends</div>
          <div class="chart_container">
            <AvgChart chartData={this.state.lineAvgs} allData={this.state.labAverages} />
          </div>
        </div>
      );
    }
  }
}

export default App;
