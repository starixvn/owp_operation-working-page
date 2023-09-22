import React from 'react';
import { BODY } from '../const.json';
import DefaultRateIcon from './DefaultRateIcon';

const RateFunction = () => {
  return (
    <div className='rate__function'>
      <p className='title'>{BODY.RATE_FUNCTION}</p>
      <div className='rate__icon'>
        <DefaultRateIcon />
      </div>
    </div>
  );
};

export default RateFunction;
