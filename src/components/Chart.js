import React, {Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      chartOptions: props.chartOptions
    }
  }

  render() {
    return (
      <div classname="chart">
      <Bar
        data={this.state.chartData}
        options={this.state.chartOptions}
      />
      </div>
    )
  }
}

export default Chart;
