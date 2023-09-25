import React from 'react';
import { THANK_YOU, HEADER } from './const.json';

const {
  TITLE
} = HEADER;

const ThankYou = () => <div className='feed__back'>
  <div className='header'>
    <p className='title'>{TITLE}</p>
    <span className='description'>{THANK_YOU}</span>
  </div>
</div>;

export default ThankYou;
