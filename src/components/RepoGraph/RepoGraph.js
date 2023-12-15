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
        try{
          const commitActivity = await fetchCommitActivity(repo.full_name);
          console.log(commitActivity);
          if (Array.isArray(commitActivity)) { // Check if commitActivity is an array
            const newDataset = processCommitData(commitActivity, repo);
            newDatasets.push(newDataset);
          } else {
            console.warn('Commit activity data is not an array for repo:', repo.full_name);
            // Handle the case where commitActivity is not an array
            // You might choose to push a default dataset or skip this repo
          }
        } catch (error) {
          console.error("Error fetching commit activity for repo:", repo.full_name, error);
          // Handle errors in fetching commit activity
        }  
      }

      if (newDatasets.length > 0) {
        const labels = newDatasets[0].data.map((_, index) => `Week ${index + 1}`);
        setChartData({
          labels,
          datasets: newDatasets
        });
      } else {
        // Handle the case where no valid datasets were created
        setChartData({
          labels: [],
          datasets: []
        });
      }
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
        },
        position: 'bottom',
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Commits'
        },
        
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
