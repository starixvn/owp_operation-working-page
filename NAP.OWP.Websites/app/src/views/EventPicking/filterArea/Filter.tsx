import React from 'react';
import DateTimePicker from './DateTimePicker';
import SelectGame from './SelectGame';
import FilterMatch from './FilterMatch';
import HasProvider from './HasProvider';
import HasOtherProvider from './HasOtherProvider';
import Command from './Command';
import InfoIcon from '../../../assets/svg-element/InfoIcon';

const Filter = () => {
  return (
    <div className='filter-control'>
      <DateTimePicker />
      <SelectGame />
      <FilterMatch />
      <HasProvider />
      <HasOtherProvider />
      <Command />
      <InfoIcon />
    </div>
  );
};
export default Filter;
