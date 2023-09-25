import React from 'react';
import { HEADER } from './const.json';

const {
  TITLE,
  DESCRIPTION
} = HEADER;

const Header = () =>
  <div className='header'>
    <p className='title'>{TITLE}</p>
    <span className='description'>{DESCRIPTION}</span>
  </div>;

export default Header;