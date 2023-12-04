import React, { useState, useEffect } from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { DefaultTableStyle } from './TableSchema.json';

import { selectTable } from './UserManagementTableHelper';
import store from '../app/useStoreNative';
const getTableSchema = () => {
  const { innerWidth } = window;
  return selectTable(innerWidth - DefaultTableStyle.widthResize);
};

const UserManagementTable = () => {
  const { queryDataTableStatus, dataSource } = store.getState();
  const model = {
    loading: queryDataTableStatus,
    entities: dataSource
  };
  const [tableSchema, setTableSchema] = useState(getTableSchema());

  const handleResizeBrowser = () => {
    const { innerWidth } = window;
    setTableSchema(selectTable(innerWidth - DefaultTableStyle.widthResize));
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeBrowser);
    return () => window.removeEventListener('resize', handleResizeBrowser);
  }, []);

  return <CustomTable config={tableSchema} model={model} />;
};

export default UserManagementTable;
