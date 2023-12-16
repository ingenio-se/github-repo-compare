/**
 * RepoGraph.js
 * 
 * This component renders a line graph visualizing GitHub repository commit activity.
 * It uses Chart.js to display commit activity data for selected repositories.
 */

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './RepoGraph.css';
import { fetchCommitActivity } from '../../api/apiClient';

/**
 * The RepoGraph component displays a line chart of commit activity for selected GitHub repositories.
 * 
 * @param {{selectedRepos: Array}} props - The component props.
 * @param {Array} props.selectedRepos - An array of repository objects to display in the graph.
 * @returns {React.Component} The rendered component.
 */
const RepoGraph = ({ selectedRepos }) => {
  const [chartData, setChartData] = useState({
    labels: [], // Labels for the x-axis (weeks)
    datasets: [] // Data sets for each repository
  });

  useEffect(() => {
    /**
     * Processes commit activity data for a single repository into a format suitable for Chart.js.
     * 
     * @param {Array} commitActivity - An array of commit activity data for a repository.
     * @param {Object} repo - The repository object.
     * @returns {Object} The processed data set for the given repository.
     */
    const processCommitData = (commitActivity, repo) => {
      const data = commitActivity.map(week => week.total); // Extract total commits per week
      return {
        label: repo.full_name,
        data: data,
        fill: false,
        borderColor: repo.color, // Use repository-specific color
        tension: 0.1 // Line smoothness
      };
    };

    /**
     * Updates the chart data state with new repositories' commit activity.
     */
    const updateChartData = async () => {
      const newDatasets = [];
      for (const repo of selectedRepos) {
        try {
          const commitActivity = await fetchCommitActivity(repo.full_name);
          if (Array.isArray(commitActivity)) {
            const newDataset = processCommitData(commitActivity, repo);
            newDatasets.push(newDataset);
          } else {
            console.warn('Commit activity data is not an array for repo:', repo.full_name);
          }
        } catch (error) {
          console.error("Error fetching commit activity for repo:", repo.full_name, error);
        }  
      }

      if (newDatasets.length > 0) {
        const labels = newDatasets[0].data.map((_, index) => `Week ${index + 1}`);
        setChartData({ labels, datasets: newDatasets });
      } else {
        setChartData({ labels: [], datasets: [] });
      }
    };

    updateChartData();
  }, [selectedRepos]); // Dependency array includes selectedRepos

  // Configuration options for Chart.js
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
