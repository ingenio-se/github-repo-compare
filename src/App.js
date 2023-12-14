
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import RepoGraph from './components/RepoGraph/RepoGraph';
import RepoList from './components/RepoList/RepoList';
import './App.css'; // Global styles

function App() {
  const [repos, setRepos] = useState([]); // This would be your state management for repositories

  // Dummy data for RepoGraph
  const commitData = {
    labels: ['Week 1', 'Week 2', 'Week 3'], // This should be dynamic based on actual data
    datasets: [
      {
        label: 'Repo 1',
        data: [10, 20, 30],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
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
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <RepoGraph commitData={commitData} />
      <RepoList repos={repos} onRemoveRepo={handleRemoveRepo} />
    </div>
  );
}

export default App;
