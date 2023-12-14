import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './RepoGraph.css'; // Make sure to create a corresponding CSS file
import { fetchCommitActivity } from '../../api/apiClient';

const RepoGraph = ({ repo }) => {
  const [commitData, setCommitData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Fetch commit activity from GitHub API
    const getCommitActivity = async () => {
      const activity = await fetchCommitActivity(repo.full_name);
      // Process the data to fit the chart's data structure
      const processedData = processCommitData(activity);
      setCommitData(processedData);
    };

    getCommitActivity();
  }, [repo]);

  // Function to process the GitHub commit activity into chart data
  const processCommitData = (activity) => {
    // Example processing function, you'll need to write the actual logic based on the API's response
    const labels = activity.map((week, index) => `Week ${index + 1}`);
    const commitCounts = activity.map(week => week.total);

    return {
      labels,
      datasets: [{
        label: 'Commits',
        data: commitCounts,
        fill: false,
        backgroundColor: repo.color,
        borderColor: repo.color,
      }]
    };
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
       <Line data={commitData} options={options} />
    </div>
  );
};

export default RepoGraph;
