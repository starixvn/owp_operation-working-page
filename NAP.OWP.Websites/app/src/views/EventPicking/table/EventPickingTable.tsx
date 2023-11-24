import React, { useEffect, useState } from 'react';
import CustomTable from '../../Shared/tableCommon/CustomTable';
import { useSelector } from 'react-redux';
import store from '../app/store';
import TableHeader from './tableHeader/TableHeader';
import TableBody from './tableBody/TableBody';
import Loading from '../../components/Loading';
import { REQUEST_STATUS } from '../../Shared/Constants';
import { RootState } from '../app/store';
import { isEqual } from 'lodash';
import { itemRowHeight } from './TableSchema.json';

const EventPickingTable = () => {
  const model = useSelector((state: RootState) => state.eventPickingTable);
  const { isNoOfferAll, isConfirmAll, entities, loading, ...rest } = model;
  // const [tableSchema, setTableSchema] = useState(
  //   selectTable(isNoOfferAll, isConfirmAll)
  // );

  const { permission } = store.getState().pagePolicy;
  // const config = {
  //   ...tableSchema,
  //   onCalculateRowHeight: index =>
  //     calculateRowHeight(
  //       entities[index],
  //       window.innerWidth - DefaultTableStyle.widthResize
  //     ),
  //   onRowClassNameGetter: index => passColorRowTable(entities[index])
  // };

  // const handleResizeBrowser = () =>
  //   setTableSchema(selectTable(isNoOfferAll, isConfirmAll));

  // useEffect(() => {
  //   window.addEventListener('resize', handleResizeBrowser);
  //   return () => window.removeEventListener('resize', handleResizeBrowser);
  // }, []);

  // useEffect(() => {
  //   setTableSchema(selectTable(isNoOfferAll, isConfirmAll));
  // }, [isNoOfferAll, isConfirmAll]);

  // return (
  //   <CustomTable
  //     model={{
  //       entities,
  //       ...rest,
  //       canCheck: permission.HasWrite
  //     }}
  //     config={config}
  //   />
  // );
  return (
    <>
      {isEqual(loading, REQUEST_STATUS.pending) && <Loading />}
      <CustomTable
        data={entities}
        tableHeader={<TableHeader />}
        classNameTable={'table-event-picking'}
        itemRowHeight={itemRowHeight}>
        <TableBody />
      </CustomTable>
    </>
  );
};
export default EventPickingTable;
