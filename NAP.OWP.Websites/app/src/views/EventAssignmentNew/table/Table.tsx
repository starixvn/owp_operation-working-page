import React from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { buildTableInfo } from './tableHelper';
import { useAppSelector } from '../app/hooks';
import store from '../app/store';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';

const Table = () => {
  const { entities, loading } = useAppSelector(state => state.eventAssignmentTable);
  const { filterState } = store.getState().eventAssignmentTable;
  debugger
  if (loading === REQUEST_STATUS.pending) {
    return <Loading />;
  }

  return (
    <CustomTable
      model={{ entities, filterState, loading }}
      config={buildTableInfo()}
    />
  );
};

export default Table;
