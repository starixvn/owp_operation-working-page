import React from 'react';
import ExportNative from './ExportNative';
import User from './User';
import DropdownList from './DropdownList';

const Filter = () => {
  return (
    <>
      <div className='filter'>
        <div className='filter-control'>
          <User />
        </div>
        <DropdownList />
        <div className='filter-control btn-block'>
          <button
            className='button-submit'
            onClick={() => { }}>
            Search
          </button>
        </div>
      </div>

      <div className='btn-upload-assignment'>

      </div>

    </>
  );
};
export default Filter;
