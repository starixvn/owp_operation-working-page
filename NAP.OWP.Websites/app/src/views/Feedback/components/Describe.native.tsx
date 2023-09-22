import React from 'react';
import { BODY } from '../const.json';

const Describe = () => {
  return (
    <div className='description'>
      <p className='title'>{BODY.DESCRIPTION}<span className='required'>*</span></p>
      <input type='text' />
    </div>
  );
};


export default Describe;