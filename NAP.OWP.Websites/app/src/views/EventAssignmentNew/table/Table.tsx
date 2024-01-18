import React from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { buildTableInfo } from './tableHelper';
import { useAppSelector } from '../app/hooks';

const Table = () => {
  const entities = useAppSelector(state => state.eventAssignmentTable.entities,);
  const filterState = useAppSelector(state => state.eventAssignmentTable.filterState);
  return <CustomTable model={{ entities, filterState }} config={buildTableInfo()} />;
};

export default Table;