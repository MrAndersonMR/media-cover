import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IntroPageProps {}

const IntroPage: FC<IntroPageProps> = () => (
  <div>
    IntroPage Component
    <Link to='/media-cover/about'>APP</Link>
  </div>
);

export default IntroPage;
