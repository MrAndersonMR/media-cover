//import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroPage/IntroPage';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/media-cover' element={ <IntroPage/> } />
          <Route path='/media-cover/about' element={ <About/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
