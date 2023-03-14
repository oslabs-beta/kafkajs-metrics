import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart(props) {
  const options = {
    scales: {
      x:
        {
          ticks: {
            color: 'white', // Change this value to the desired color for the x-axis labels
          },
        },
      y:
        {
          ticks: {
            color: 'white', // Change this value to the desired color for the y-axis labels
          },
        },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15
          },
          color: 'white'
        }
      }
    }
  };
  console.log('this is data', props.data);
  return (
         <div className='Chart'>
            <div className='chartTitle'>{props.name}</div>
            <Line data = {props.data} options={options} />
        </div>
  );
}

export default LineChart;
