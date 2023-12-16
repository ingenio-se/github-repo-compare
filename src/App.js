import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css'; // Imports global styles for the application

/**
 * App Component
 * 
 * This is the main component of the application. It serves as the root container
 * and includes the SearchBar and a container for displaying graphs.
 */
function App() {
  return (
    <div className="app-container">
      {/* Container for graph visualization (to be implemented) */}
      <div className="graph-container"></div>

      {/* SearchBar component for searching and displaying GitHub repositories */}
      <SearchBar />
    </div>
  );
}

export default App;
