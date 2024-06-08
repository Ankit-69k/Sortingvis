import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        Sorting Visualizer
      </header>
      <SortingVisualizer className="vis" />
    </div>
  );
}

export default App;
