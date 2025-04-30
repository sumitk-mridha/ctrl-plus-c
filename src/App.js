import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Clipboards from './pages/Clipboards/Clipboards';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clipboards" element={<Clipboards />} />
      </Routes>
    </Router>
  );
}

export default App;
