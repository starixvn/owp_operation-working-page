import React, { useEffect } from 'react';
import Filter from './filterArea/Filter';
import SyncUser from './syncUser/SyncUser';
import useStore from './app/useStoreNative';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';
import { shallow } from 'zustand/shallow';
import ExportButton from './filterArea/ExportNative';
import UserManagementTable from './table/UserManagementTable';

const UserManagement = () => {
  const {
    queryOptionsStatus,
    queryOptions,
    queryPermissionStatus,
    queryPermissions
  } = useStore(
    state => ({
      queryOptionsStatus: state.queryOptionsStatus,
      queryOptions: state.queryOptions,
      queryPermissionStatus: state.queryPermissionStatus,
      queryPermissions: state.queryPermissions
    }),
    shallow
  );

  useEffect(() => {
    queryOptions();
    queryPermissions();
  }, [queryOptions, queryPermissions]);

  if (
    [queryOptionsStatus, queryPermissionStatus].some(
      status => status === REQUEST_STATUS.pending
    )
  ) {
    return <Loading />;
  }

  return (
    <div className='user__management'>
      <div className='user__management--header'>
        <Filter />
        <SyncUser />
        <ExportButton />
      </div>
      <div>
        <UserManagementTable />
      </div>
    </div>
  );
};

export default UserManagement;
