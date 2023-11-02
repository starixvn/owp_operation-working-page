import React from 'react';
import CustomTable from '../../Shared/tableCommon/CustomTable';
import TableHeader from './tableHeader/TableHeader';
import TableBody from './tableBody/TableBody';
import { useSelector } from 'react-redux';
import { RootState } from '../app/storeNative';
import { isEqual } from 'lodash';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';
const LiveGameListTable = () => {
  const model = useSelector((state: RootState) => state.events);
  const { entities, loading } = model;

  return (
    <>
      {isEqual(loading, REQUEST_STATUS.pending) && <Loading />}
      <CustomTable
        data={entities}
        tableHeader={<TableHeader />}
        classNameTable={'table-live-game-list'}>
        <TableBody />
      </CustomTable>
    </>
  );
};
export default LiveGameListTable;
