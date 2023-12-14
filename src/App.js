
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import RepoGraph from './components/RepoGraph/RepoGraph';
import './App.css'; // Global styles

function App() {
  // Initial dummy repositories state
  const [repos, setRepos] = useState([
    { id: 1, name: 'Repo 1', commits: [10, 20, 30], color: 'black' },
    // Add more dummy repo data if necessary
  ]);

  // Dummy data for RepoGraph
  const commitData = {
    labels: ['Week 1', 'Week 2', 'Week 3'], // This should be dynamic based on actual data
    datasets: repos.map(repo => ({
      label: repo.name,
      data: repo.commits, // Array of commit counts for each week
      borderColor: repo.color, // Use the repo's color
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Optional: Set background color to a semi-transparent white if you want
      pointBackgroundColor: 'white', // Points color to white
      pointBorderColor: 'white', // Points border color to white
    })),
  };

  // Function to handle search and add repo to the graph
  const handleSearch = (searchTerm) => {
    // You would implement the API call and state update here
    // For now, let's just add a dummy repo to the list when searching
    const newRepo = {
      id: repos.length + 1,
      name: `Repo ${repos.length + 1}`,
      commits: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Generate a random color
    };
    setRepos([...repos, newRepo]);
  };

  // Function to handle removal of a repo from the list and graph
  const handleRemoveRepo = (repoId) => {
    // You would implement the removal logic here
    setRepos(repos.filter(repo => repo.id !== repoId));
  };

  return (
    <div className="app-container">
      <div className="graph-container">
        {/* Pass the dynamic commitData based on the repos state */}
        {/*<RepoGraph commitData={commitData} />*/}
      </div>
      
      {/* Pass the handleSearch function to SearchBar */}
      <SearchBar onSearch={handleSearch} />
      
    </div>
  );
}

export default App;

