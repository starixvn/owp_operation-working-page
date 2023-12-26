import React from 'react';
import useStore from '../../app/store';
import { MultiSelect } from 'react-multi-select-component';

const UserStatus = () => {
  const userStatusOption = useStore(state => state.userStatusOption);
  const statusSelected = useStore(state => state.userStatusSelected);
  const setStatusSelected = useStore(state => state.setUserStatusSelected);

  return (
    <div className='multi-select-dropdown'>
      <div className='label'>User</div>
      <MultiSelect
        labelledBy='Select user status'
        className='status'
        options={userStatusOption}
        value={statusSelected}
        disableSearch
        ClearSelectedIcon={null}
        onChange={setStatusSelected}
      />
    </div>
  );
};

export default UserStatus;
