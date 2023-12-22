import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Results from './components/Results';
import Vote from './components/Vote';
import './Styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/results/:pollId" element={<Results />} />
        <Route path="/vote/:pollId" element={<Vote />} />
      </Routes>
    </Router>
  );
}

export default App;
