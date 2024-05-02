import React from 'react';
import { InputItem } from './InputItem';

const FtSpread = () => {
  return (
    <div className='list'>
      <div className='title'>FT Spread</div>
      <div className='content-container'>
        <InputItem label='HDP(%)' />
        <InputItem label='OU(%)' />
      </div>
    </div >
  );
};

export default FtSpread;