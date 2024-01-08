import React, { useState } from 'react';
import { SELECT_TURNOVER_OPTIONS } from './filterConst.json';
import SingleSelection from '../../Shared/SingleSelection/SingleSelection';
import { TurnoverMarginSelection } from '../types/filterType';

const TurnoverMargin = () => {
  const handleOnChange = (event: TurnoverMarginSelection) => {
    console.log(event);
  };

  return (
    <div className='multi-select-dropdown'>
      <div className='label'>Turnover & Margin Period</div>
      <SingleSelection
        option={SELECT_TURNOVER_OPTIONS}
        onSelectedChange={handleOnChange}
      />
    </div>
  );
};

export default TurnoverMargin;
