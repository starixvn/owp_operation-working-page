import React, { useEffect } from 'react';
import Filter from './filterArea/Filter';
import SyncUser from './syncUser/SyncUser';
import useStore from './app/useStoreNative';
import { REQUEST_STATUS } from '../Shared/Constants';
import Loading from '../components/Loading';

const UserManagement = () => {
  const { queryOptionsStatus, queryOptions } = useStore(state => ({
    queryOptionsStatus: state.queryOptionsStatus,
    queryOptions: state.queryOptions
  }));

  const { queryPermissionStatus, queryPermissions } = useStore(state => ({
    queryPermissionStatus: state.queryPermissionStatus,
    queryPermissions: state.queryPermissions
  }));

  useEffect(() => {
    queryOptions();
    queryPermissions();

  }, [queryOptions, queryPermissions]);

  if ([queryOptionsStatus, queryPermissionStatus].some(status => status === REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return (
    <>
      <SyncUser />
      <Filter />
    </>
  );
};

export default UserManagement;
