import React from 'react';
import { InputItem } from './InputItem';

const MicsMatch = () => {
  return (
    <div className='list'>
      <div className='title'>Display in Misc match file</div>
      <div className='content-container'>
        <InputItem label='LST Note (Show under League)' />
        <InputItem label='Remark 2 (Show under Match)' />
      </div>
    </div>
  );
};

export default MicsMatch;