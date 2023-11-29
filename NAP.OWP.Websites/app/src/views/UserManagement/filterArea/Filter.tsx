import React from 'react';
import ExportNative from './ExportNative';
import MultipleSelection from '../../Shared/MultipleSelection/MultipleSelection';
import store from '../app/useStoreNative';

const Filter = () => {
  const { options, filterValue } = store.getState();
  const { roles, sections, departments, categories, locationCodes } = options;

  return (
    <>
      <div className='filter'>
        <div className='text-box'>
          <div className='label'>User</div>
          <input
            type='text'
            name='username'
            placeholder='Account Name or Nick Name'
            className='input-field'
            maxLength={100}
          />
        </div>
        <div className='filter-control multiselect'>
          <MultipleSelection
            label='Section'
            disabled={false}
            options={roles}
            value={filterValue.role}
            disableSearch
            onChange={() => { }}
          />
        </div>
        <div className='filter-control multiselect'>
          <MultipleSelection
            label='Section'
            disabled={false}
            options={sections}
            value={filterValue.section}
            disableSearch
            onChange={() => { }}
          />
        </div>
        <div className='filter-control multiselect'>
          <MultipleSelection
            label='Department'
            disabled={false}
            className='match-status'
            options={departments}
            value={filterValue.department}
            onChange={() => { }}
          />
        </div>
        <div className='filter-control multiselect'>
          <MultipleSelection
            label='Category'
            disabled={false}
            options={categories}
            disableSearch
            value={filterValue.category}
            onChange={() => { }}
          />
        </div>
        <div className='filter-control multiselect'>
          <MultipleSelection
            label='Category'
            disabled={false}
            options={locationCodes}
            disableSearch
            value={filterValue.locationCode}
            onChange={() => { }}
          />
        </div>
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
      <ExportNative />
    </>
  );
};
export default Filter;
