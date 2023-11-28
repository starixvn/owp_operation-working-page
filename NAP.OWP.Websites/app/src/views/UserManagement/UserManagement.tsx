import React from 'react';
import Filter from './filterArea/Filter';
import SyncUser from './syncUser/SyncUser';

const UserManagement = () => {
  return (
    <SyncUser />
      <Filter />
  );
};

export default UserManagement;
