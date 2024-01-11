import React from 'react';
import CustomTable from '../../Shared/common/CustomTable/CustomTable';
import { buildTableInfo } from './tableHelper';
import useStore from '../app/store';
import { shallow } from 'zustand/shallow';


const Table = () => {
  const { entities, loadingDataTable } = useStore(state => ({
    loadingDataTable: state.loadingDataTable,
    entities: state.dataTable
  }), shallow);

  return <CustomTable model={{ entities }} config={buildTableInfo()} />;
  ;
};

export default Table;