import React, { Fragment } from 'react';
import { DataSource, TTotalGameInfo } from '../type/TableType.native';
import { uniqueId } from 'lodash';
import TableBodyTotalGame from './TableBodyTotalGame';

type TableBodyRowProps = {
  dataSource: DataSource;
  rowIndex: number;
};

const TableBodyRow = (props: TableBodyRowProps) => {
  const { dataSource, rowIndex } = props;
  return (
    <tr>
      <td>{rowIndex + 1}</td>
      <td>{dataSource.userName}</td>
      <td>{dataSource.progress}</td>
      <td>{dataSource.target}</td>
      <TableBodyTotalGame data={dataSource.gapWithTarget} />
      <TableBodyTotalGame data={dataSource.achievedGames} />
      <td>{dataSource.reward}</td>
    </tr>
  );
};
export default TableBodyRow;
