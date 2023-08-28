import React from 'react';
import { DataSource } from '../type/TableType.native';
import TableBodyTotalGame from './TableBodyTotalGame';

const TableBody = (props: {
  dataSource: Array<DataSource>
}) => {
  return <>
    {props.dataSource.map((item, index) => (
      <tr key={`${item.userName}-${index}`}>
        <td>{index + 1}</td>
        <td>{item.userName}</td>
        <td>{item.progress}</td>
        <td>{item.target}</td>
        <TableBodyTotalGame {...item.gapWithTarget} />
        <TableBodyTotalGame {...item.achievedGames} />
        <td>{item.reward}</td>
      </tr>
    ))
    }
  </>;
};

export default TableBody;
