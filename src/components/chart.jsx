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
  const dataArray = props.data.datasets.map((dataset) => ({
    ...dataset, backgroundColor: '#ff6b6b', borderColor: '#ff6b6b', color: '#2dc293'
  }));
  const redData = props.data;
  redData.datasets = dataArray;
  return (
         <div className='Chart'>
            <div className='chartTitle'>{props.name}</div>
            <Line data = {redData} options={options} />
        </div>
  );
}

export default LineChart;
