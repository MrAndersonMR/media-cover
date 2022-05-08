import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { HashRouter, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '../About/About';

interface IntroPageProps {}

const IntroPage: FC<IntroPageProps> = () => (
  <div>
    IntroPage Component
    {/* <Link to='/media-cover/about'>APP</Link> */}
    <Link to='/media-cover/about'>APP</Link>
    <div>
      {/* <Route path='/media-cover/about' element={<About/>} /> */}
    </div>
  </div>
);

export default IntroPage;
