import React from 'react';
import { FUNCTIONS } from '../const.json';
import Select from 'react-select-ts';

const FunctionDropdown = () => {
  return (
    <div className='market-filter-control'>
      <div className='label'>Market</div>
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
