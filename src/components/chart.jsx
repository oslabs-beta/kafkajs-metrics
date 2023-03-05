import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart (props) {
    console.log('line props', props.data);
    return <Line data = {props.data} />
}

export default LineChart;