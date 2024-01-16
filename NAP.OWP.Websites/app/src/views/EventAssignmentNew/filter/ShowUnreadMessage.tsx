import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateFilterState } from './filterSlice';

const ShowUnreadMessage = () => {
  const dispatch = useAppDispatch();
  const showUnreadMessage = useAppSelector(
    state => state.filter.filterState.showUnreadMessage
  );

  const handleOnChange = () => {
    const model = {
      key: 'selectedOffVRs',
      value: !showUnreadMessage
    };
    dispatch(updateFilterState(model));
  };

  return (
    <div className='filter-control-checkbox'>
      <label>
        <input
          className='unread-checkbox'
          type='checkbox'
          checked={showUnreadMessage}
          onChange={handleOnChange}
        />{' '}
        Show Unread Message Only
      </label>
    </div>
  );
};
export default ShowUnreadMessage;
