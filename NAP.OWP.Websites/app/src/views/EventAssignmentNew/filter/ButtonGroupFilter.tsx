import React from 'react';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import ExportSelector from './ExportSelector';

const ButtonGroupFilter = () => {
  const filterState = useAppSelector(
    (state: RootState) => state.filter.filterState
  );
  const handleSubmit = () => {
    console.log(filterState);
  };
  return (
    <div className='filter-control btn-block'>
      <button className='button-submit' onClick={handleSubmit}>
        Submit
      </button>
      <ExportSelector />
    </div>
  );
};
export default ButtonGroupFilter;
