import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart (props) {
    return (
         <div className='Chart'>
            <div>{props.name}</div>
            <Line data = {props.data} />
        </div>
    )
}

export default LineChart;