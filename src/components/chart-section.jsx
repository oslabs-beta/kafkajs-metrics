import React, { Component } from 'react';
import LineChart from './chart.jsx';
import { Chart as ChartJS } from 'chart.js/auto';

class ChartSection extends Component {

    render() {
        console.log('in chart section');
        console.log('props.data', this.props.data);
        return (
            <div>
            <LineChart data = {this.props.data.messagesConsumed} name = 'messagesConsumed'/>
            <LineChart data = {this.props.data.messageConsumptionRate} name = 'messageConsumptionRate'/>
            <LineChart data = {this.props.data.lastHeartbeat} name = 'lastHeartbeat'/>
            <LineChart data = {this.props.data.totalRequests} name = 'totalRequests'/>
            <LineChart data = {this.props.data.requestRate} name = 'requestRate'/>
            <LineChart data = {this.props.data.totalRequestTimeouts} name = 'totalRequestTimeouts'/>
            </div>
        )
    }

    componentDidMount() {
        // get data from redis, setState with it
        // then start the interval to get data from redis and setState with it over and over again
        console.log('mount data', this.props.data);
        setInterval(() => {
            this.props.update();
        }, 5000)
    }
}

export default ChartSection;