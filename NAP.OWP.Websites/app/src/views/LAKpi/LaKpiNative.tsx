import React from 'react';
import LAKpiTable from './feature/table/LAKpiTable';
import Filter from './feature/filter/Filter';

const LAKpiNative = () => {
  return <>
    <Filter />
    <LAKpiTable />
  </>;
};

export default LAKpiNative;
