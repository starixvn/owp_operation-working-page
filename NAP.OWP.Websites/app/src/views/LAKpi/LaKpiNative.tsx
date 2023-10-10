import React, { useEffect } from 'react';
import LAKpiTable from './feature/table/LAKpiTable';
import Filter from './feature/filter/Filter';
import useStore from './app/store';

const LAKpiNative = () => {
  const { queryPermissions } = useStore(state => state);

  useEffect(() => {
    (async () => {
      await queryPermissions();
    })();
  }, [queryPermissions]);

  return <>
    <Filter />
    <LAKpiTable />
  </>;
};

export default LAKpiNative;
