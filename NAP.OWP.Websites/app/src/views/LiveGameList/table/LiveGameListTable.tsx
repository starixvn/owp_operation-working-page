import React, { useEffect, useState } from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import {
  selectTable,
  calculateRowHeight,
  buildColorRowTable
} from './LiveGameListTableHelper';
import { DefaultTableStyle } from './TableSchema.json';
import { useSelector } from 'react-redux';
import { RootState } from '../app/storeNative';
import { sortFunc } from './tableSlice/tableSlice';

const getTableSchema = () => {
  const { innerWidth } = window;
  return selectTable(innerWidth - DefaultTableStyle.widthResize);
};

const LiveGameListTable = () => {
  const [tableSchema, setTableSchema] = useState(getTableSchema());
  const model = useSelector((state: RootState) => state.events);
  const config = {
    ...tableSchema,
    onCalculateRowHeight: (index: number) =>
      calculateRowHeight(
        model.entities[index],
        window.innerWidth - DefaultTableStyle.widthResize
      ),
    onRowClassNameGetter: (index: number) =>
      buildColorRowTable(model.entities[index]),
    sortFunc
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
      model={model}
      config={config}
    />
  );
};
export default LiveGameListTable;
