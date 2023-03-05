import React, { Component } from 'react';
import LineChart from './chart.jsx';
import { Chart as ChartJS } from 'chart.js/auto';

class ChartSection extends Component {

    render() {
        console.log('in chart section');
        return(
            <div>
            <div>Hello, World!</div>
            <LineChart data = {this.props.data}/>
            <LineChart data = {this.props.data}/>
            <LineChart data = {this.props.data}/>
            <LineChart data = {this.props.data}/>
            <LineChart data = {this.props.data}/>
            <LineChart data = {this.props.data}/>
            </div>
        );
    }

    componentDidMount() {
        // get data from redis, setState with it
        // then start the interval to get data from redis and setState with it over and over again
        console.log('mount data', this.props.data);
        setInterval(()=> {
            const newData = [7, Math.random()*10, Math.random()*10, Math.random()*10, Math.random()*10, 15]
            this.props.update({datasets: [{
                label: 'Ummmmm',
                data: newData,
            }]});
        }, 5000);
    }
}

export default ChartSection;