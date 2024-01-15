import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ButtonGroupFilter = () => {
  const { filterState } = useSelector((state: RootState) => state.filter);
  const handleSubmit = () => {
    console.log(filterState);
  };
  return (
    <div className='filter-control btn-block'>
      <button className='button-submit' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
export default ButtonGroupFilter;
