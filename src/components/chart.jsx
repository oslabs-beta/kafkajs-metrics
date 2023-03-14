import React from 'react';
import { Line } from 'react-chartjs-2';

// LineChart generates a line chart with chartJS given metrics data
function LineChart(props) {
  const options = {
    scales: {
      x: {
        ticks: {
          color: 'white', // Change this value to the desired color for the x-axis labels
        },
      },
      y: {
        ticks: {
          color: 'white', // Change this value to the desired color for the y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
          },
          color: 'white',
        },
      },
    },
  };
  return (
    <div className="Chart">
      <div className="chartTitle">{props.name}</div>
      <Line data={props.data} options={options} />
    </div>
  );
}

export default LineChart;
