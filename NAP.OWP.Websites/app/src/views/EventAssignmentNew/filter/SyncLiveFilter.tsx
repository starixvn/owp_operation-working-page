import React from 'react';
import Select from 'react-select';
import { SYNC_LIVE_OPTION } from './FilterConst.json';

const SyncLiveFilter = () => {
  return (
    <div className='filter-control multiselect sync-live'>
      <div className='label'>Sync Live</div>
      <Select
        defaultValue={SYNC_LIVE_OPTION[0]}
        className='basic-multi-select'
        classNamePrefix='select'
        options={SYNC_LIVE_OPTION}
        //onChange={e => this.setState({ selectedSyncLive: e.value })}
      />
    </div>
  );
};
export default SyncLiveFilter;
