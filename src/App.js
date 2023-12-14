
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import RepoGraph from './components/RepoGraph/RepoGraph';
import RepoList from './components/RepoList/RepoList';
import './App.css'; // Global styles

function App() {
  const [repos, setRepos] = useState([]); // This would be your state management for repositories

  // Dummy data for RepoGraph
  const commitData = {
    /*labels: ['Week 1', 'Week 2', 'Week 3'], // This should be dynamic based on actual data
    datasets: [
      {
        label: 'Repo 1',
        data: [10, 20, 30],
        borderColor: 'white', // Change the color to white
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }
    ]*/
    labels: ['Week 1', 'Week 2', 'Week 3'], // This should be dynamic based on actual data
    datasets: [
      {
        label: 'Repo 1',
        data: [10, 20, 30], // Array of commit counts for each week
        borderColor: 'black', // Change the color to white
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: Set background color to a semi-transparent white if you want
        pointBackgroundColor: 'white', // Points color to white
        pointBorderColor: 'white', // Points border color to white
      }
      // ... more datasets for each repo
    ]
  };

  // Function to handle search and add repo to the graph
  const handleSearch = (searchTerm) => {
    // You would implement the API call and state update here
  };

  // Function to handle removal of a repo from the list and graph
  const handleRemoveRepo = (repoId) => {
    // You would implement the removal logic here
  };

  return (
    <div className="app-container">
      <div className="graph-container">
        <RepoGraph commitData={commitData} />
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
    </div>
  );
}

export default App;
