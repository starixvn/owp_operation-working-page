import React from 'react';
import { THANK_YOU, HEADER, NEXT_STEP } from './const.json';
import ThankImage from '../../assets/img/feedback-thank.png';

const {
  TITLE
} = HEADER;

const ThankYou = () => <div className='feed__back'>
  <div className='header'>
    <p className='title'>{TITLE}</p>
    <span className='description'>{THANK_YOU}</span>
  </div>
  <div className='body'>
    <p className='next__step' dangerouslySetInnerHTML={{ __html: NEXT_STEP }} />
    <img src={ThankImage} alt="" />
  </div>
</div>;

export default ThankYou;
