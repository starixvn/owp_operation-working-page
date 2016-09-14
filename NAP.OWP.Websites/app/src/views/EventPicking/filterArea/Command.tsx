import React from 'react';
import { getEventPickings } from '../table/eventPickingTableSlice/eventSliceThunkNative';
import store from '../app/store';
import { useAppDispatch } from '../app/hooks';
const Command = () => {
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const { filter } = store.getState();
    dispatch(getEventPickings(filter));
  };

  return (
    <button className='button-submit' onClick={handleSearch}>
      Search
    </button>
  );
};

export default Command;