import React, { useEffect } from 'react';
import LAKpiTable from './feature/table/LAKpiTable';
import Filter from './feature/filter/Filter';
import useStore from './app/store';

const LAKpiNative = () => {
  const queryPermissionsAndSections = useStore(
    state => state.queryPermissionsAndSections
  );

  useEffect(() => {
    queryPermissionsAndSections();
  }, []);

  return (
    <>
      <Filter />
      <LAKpiTable />
    </>
  );
};

export default LAKpiNative;
