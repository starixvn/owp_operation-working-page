import React from 'react';
import { useStableDispatch } from '../../ImportPrematchHelperNative';
import { sortByDefault } from '../league/shiftSlice/shiftSlice';

const SortDefault = () => {
  const dispatch = useStableDispatch();
  return (
    <button className='button-sort' onClick={() => dispatch(sortByDefault())}>
      Sort
    </button>
  );
};

export default SortDefault;
