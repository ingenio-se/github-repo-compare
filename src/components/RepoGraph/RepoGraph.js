import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './RepoGraph.css'; // Make sure to create a corresponding CSS file

const RepoGraph = ({ commitData }) => {
  // Prepare the data for the graph
  const data = {
    labels: commitData.labels,
    datasets: commitData.datasets
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Commit Activity',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Week'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Commits'
        }
      }
    }
  };

  return (
    <div className="repo-graph">
      <Line data={data} options={options} />
    </div>
  );
};

export default RepoGraph;
