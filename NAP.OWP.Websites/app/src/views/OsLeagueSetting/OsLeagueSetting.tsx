import React, { useEffect, useState } from 'react';
import useStore from './app/store';
import FilterManagementNative from './features/filter/FilterManagementNative';
import OsLeagueSettingTable from './features/OsLeagueSettingTable/OsLeagueSettingTable';
import { shallow } from 'zustand/shallow';
import Loading from '../components/Loading';
import getPermission from '../Shared/permission/getPermission';
import { functionKey, localStoreKey } from './osLeague.json';
import PopupWrapper from './features/popup/PopupWrapper';

const OsLeagueSetting = () => {
  const [loading, setLoading] = useState(true);

  const { setPolicy } = useStore(state => (
    {
      setPolicy: state.setPolicy
    }), shallow);

  useEffect(() => {
    (async () => {
      const policy = await getPermission(functionKey);
      setPolicy(policy);
      setLoading(false);
    })();

    for (const key in localStoreKey) {
      sessionStorage.removeItem(localStoreKey[key as keyof typeof localStoreKey]);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='os-league-setting'>
      <FilterManagementNative />
      <PopupWrapper />
      <OsLeagueSettingTable />
    </div>
  );
};

export default OsLeagueSetting;
