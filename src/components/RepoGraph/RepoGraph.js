import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './RepoGraph.css';
import { fetchCommitActivity } from '../../api/apiClient';

const RepoGraph = ({ selectedRepos }) => {
  const [chartData, setChartData] = useState({
    labels: [], // This will be common for all datasets, representing weeks
    datasets: []
  });

  useEffect(() => {
    // Function to process the GitHub commit activity into chart data for a single repo
    const processCommitData = (commitActivity, repo) => {
      // Assuming commitActivity is an array of 52 weeks of activity
      const data = commitActivity.map(week => week.total);
      return {
        label: repo.full_name,
        data: data,
        fill: false,
        borderColor: repo.color,
        tension: 0.1
      };
    };

    // Function to update the chart data with new repositories' commit activity
    const updateChartData = async () => {
      const newDatasets = [];
      for (const repo of selectedRepos) {
        const commitActivity = await fetchCommitActivity(repo.full_name);
        console.log(commitActivity);
        const newDataset = processCommitData(commitActivity, repo);
        newDatasets.push(newDataset);
      }

      // Assuming all repositories have commit data for the same 52 weeks
      const labels = newDatasets[0]?.data.map((_, index) => `Week ${index + 1}`);

      setChartData({
        labels,
        datasets: newDatasets
      });
    };

    updateChartData();
  }, [selectedRepos]); // Run this effect whenever selectedRepos changes

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
        <Line data={chartData} options={options} />
    </div>
  );
};


export default RepoGraph;
