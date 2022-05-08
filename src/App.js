//import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { HashRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/IntroPage/IntroPage';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path='/media-cover' element={ <IntroPage/> } />
          <Route path='/media-cover/about' element={ <About/> } />
        </Routes>
      </Router> */}
      <HashRouter hashType='noslash'>
        {/* <IntroPage /> */}
        <Routes>
          <Route path='/' element={ <IntroPage /> } />
          <Route path='/media-cover/about' element={ <About/> } />
        </Routes>
      </HashRouter>
      {/* <Routes> */}
        {/* <Route path='/media-cover/about' component={<About/>} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
