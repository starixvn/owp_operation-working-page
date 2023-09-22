import React from 'react';
import { FUNCTIONS, BODY } from '../const.json';
import Select from 'react-select-ts';

const FunctionDropdown = () => {
  return (
    <div className='choose__function'>
      <p className='title'>{BODY.CHOOSE_FUNCTION}<span className='required'>*</span></p>
      <Select
        data-testId='select'
        options={FUNCTIONS}
        defaultValue={FUNCTIONS[0]}
        onChange={() => console.log('abc')}
        className='basic-filter-select'

      />
    </div>
  );
};

export default FunctionDropdown;
