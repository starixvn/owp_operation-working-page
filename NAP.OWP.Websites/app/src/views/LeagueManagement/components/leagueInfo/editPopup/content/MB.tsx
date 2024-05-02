import React from 'react';
import { InputItem } from './InputItem';

const MB = () => {
  return (
    <div className='list'>
      <div className='title'>MB</div>
      <div className='content-container'>
        <InputItem label='Weekday HDP (K)' />
        <InputItem label='Weekday NO. HDP (K)' />
      </div>
      <div className='content-container'>
        <InputItem label='Weekday HDP (K)' />
        <InputItem label='Weekday NO. HDP (K)' />
      </div>
    </div>
  );
};

export default MB;