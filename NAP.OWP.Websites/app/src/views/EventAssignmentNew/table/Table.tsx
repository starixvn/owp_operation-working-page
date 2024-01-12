import React from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { buildTableInfo } from './tableHelper';
import { useAppSelector } from '../app/hooks';

const Table = () => {
  const entities = useAppSelector(state => state.eventAssignmentTable.entities);
  return <CustomTable model={{ entities }} config={buildTableInfo()} />;
};

export default Table;