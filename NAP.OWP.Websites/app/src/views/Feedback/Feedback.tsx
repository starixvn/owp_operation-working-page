import React from 'react';
import Header from './Header.native';
import Body from './Body.native';
import Command from './components/Command';

type Props = {};

const Feedback = () => {
  return <div className='feed__back'>
    <Header />
    <Body />
    <Command />
  </div>;
};

export default Feedback;
