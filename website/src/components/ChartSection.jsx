import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto';
import LineChart from './LineChart.jsx';

// ChartSection renders 6 line charts for a KafkaJS client's consumers, updating every 5 seconds
class ChartSection extends Component {
  render() {
    return (
      <div className="chart-section" style={{ width: '500px' }}>
        <LineChart
          data={this.props.data.messagesConsumed}
          name="messagesConsumed"
        />
        <LineChart
          data={this.props.data.messageConsumptionRate}
          name="messageConsumptionRate"
        />
        <LineChart data={this.props.data.lastHeartbeatDuration} name="lastHeartbeatDuration" />
        <LineChart data={this.props.data.totalRequests} name="totalRequests" />
        <LineChart data={this.props.data.requestRate} name="requestRate" />
        <LineChart
          data={this.props.data.totalRequestTimeouts}
          name="totalRequestTimeouts"
        />
      </div>
    );
  }

  componentDidMount() {
    // get data from redis, setState with it
    // then start the interval to get data from redis and setState with it over and over again
    setInterval(() => {
      this.props.updateState();
    }, 5000);
  }
}

export default ChartSection;
