import React from 'react';
import { DataSource } from '../type/TableType.native';
import TableBodyTotalGame from './TableBodyTotalGame';

const TableBody = (props: {
  dataSource: Array<DataSource>;
  isGap: boolean;
}) => {
  return (
    <>
      {props.dataSource.map((item, index) => (
        <tr
          className={`${index % 2 === 0 ? 'row-even' : 'row-odd'}`}
          key={`${item.userName}-${index}`}>
          <td>{index + 1}</td>
          <td>{item.userName}</td>
          {props.isGap && (
            <>
              <td>{item.progress}</td>
              <td>{item.target}</td>
              <TableBodyTotalGame {...item.gapWithTarget} />
            </>
          )}

          <TableBodyTotalGame {...item.achievedGames} />
          <td>{item.reward}</td>
        </tr>
      ))}
    </>
  );
};

export default TableBody;
