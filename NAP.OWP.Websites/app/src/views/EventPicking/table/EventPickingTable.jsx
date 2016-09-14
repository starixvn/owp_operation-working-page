import React, { useEffect, useState } from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { selectTable, passColorRowTable } from './EventPickingTableHelper';
import { useSelector } from 'react-redux';
import { DefaultTableStyle } from './TableSchema.json';
import store from '../app/store';

const getTableSchema = () => {
  const { innerWidth } = window;
  return selectTable(innerWidth - DefaultTableStyle.widthResize);
};

const EventPickingTable = () => {
  const [tableSchema, setTableSchema] = useState(getTableSchema());
  const model = useSelector(state => state.eventPickingTable);
  const { isNoOfferAll, entities, ...rest } = model;
  const { permission } = store.getState().pagePolicy;
  const config = {
    ...tableSchema,
    onRowClassNameGetter: index => passColorRowTable(entities[index])
  };

  const handleResizeBrowser = () => {
    const { innerWidth } = window;
    setTableSchema(selectTable(innerWidth - DefaultTableStyle.widthResize));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeBrowser);
    return () => window.removeEventListener('resize', handleResizeBrowser);
  }, []);

  return (
    <CustomTable
      model={{
        entities,
        ...rest,
        isChecked: isNoOfferAll,
        canCheck: permission.HasWrite
      }}
      config={config}
    />
  );
};
export default EventPickingTable;
