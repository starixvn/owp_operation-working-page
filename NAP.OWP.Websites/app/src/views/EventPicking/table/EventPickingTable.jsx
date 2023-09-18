import React, { useEffect, useState } from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import {
  selectTable,
  passColorRowTable,
  calculateRowHeight
} from './EventPickingTableHelper';
import { useSelector } from 'react-redux';
import { DefaultTableStyle } from './TableSchema.json';
import store from '../app/store';

const EventPickingTable = () => {
  const model = useSelector(state => state.eventPickingTable);
  const { isNoOfferAll, isConfirmAll, entities, ...rest } = model;
  const [tableSchema, setTableSchema] = useState(
    selectTable(isNoOfferAll, isConfirmAll)
  );

  const { permission } = store.getState().pagePolicy;
  const config = {
    ...tableSchema,
    onCalculateRowHeight: index =>
      calculateRowHeight(
        entities[index],
        window.innerWidth - DefaultTableStyle.widthResize
      ),
    onRowClassNameGetter: index => passColorRowTable(entities[index])
  };

  const handleResizeBrowser = () =>
    setTableSchema(selectTable(isNoOfferAll, isConfirmAll));

  useEffect(() => {
    window.addEventListener('resize', handleResizeBrowser);
    return () => window.removeEventListener('resize', handleResizeBrowser);
  }, []);

  useEffect(() => {
    setTableSchema(selectTable(isNoOfferAll, isConfirmAll));
  }, [isNoOfferAll, isConfirmAll]);

  return (
    <CustomTable
      model={{
        entities,
        ...rest,
        canCheck: permission.HasWrite
      }}
      config={config}
    />
  );
};
export default EventPickingTable;
