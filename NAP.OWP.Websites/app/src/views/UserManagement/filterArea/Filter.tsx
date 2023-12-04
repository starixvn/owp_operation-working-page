import React, { useEffect } from 'react';
import User from './User';
import DropdownList from './DropdownList';
import { getValueFilter } from '../utils';
import store from '../app/useStoreNative';

const Filter = () => {
  const { queryUserInfo } = store.getState();
  useEffect(() => {
    const filterValue = getValueFilter();
    queryUserInfo(filterValue);
  }, [queryUserInfo]);
  return (
    <>
      <div className='filter'>
        <div className='filter-control'>
          <User />
        </div>
        <DropdownList />
        <div className='filter-control btn-block'>
          <button className='button-submit' onClick={() => {}}>
            Search
          </button>
        </div>
      </div>

      <div className='btn-upload-assignment'></div>
    </>
  );
};
export default Filter;
