import React from 'react';
import FunctionDropdown from './components/FunctionDropdown.native';
import Describe from './components/Describe.native';
import RateFunction from './components/RateFunction';

const Body = () =>
  <div className='body'>
    <FunctionDropdown />
    <Describe />
    <RateFunction />
  </div>;

export default Body;
