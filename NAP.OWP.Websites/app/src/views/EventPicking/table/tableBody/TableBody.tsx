import React, { Fragment } from 'react';
import NoCell from '../Cell/NoCell';
import KOTimeCell from '../Cell/KOTimeCell';
import LeagueCell from '../Cell/LeagueCell';
import MatchCell from '../Cell/MatchCell';
import MaxBetCell from '../Cell/MaxBetCell';
import IPTvStreamingCell from '../Cell/IPTvStreamingCell';
import ProviderCell from '../Cell/ProviderCell';
import RoundCell from '../Cell/RoundCell';
import RemarkCell from '../Cell/RemarkCell';
import RAndDUpdateCell from '../Cell/RAndDUpdateCell';
import CheckedByLstCell from '../Cell/CheckedByLstCell';
import ActionCell from '../Cell/ActionCell';
import { v4 as uuidv4 } from 'uuid';
import { itemRowHeight } from '../TableSchema.json';
import TDataTable from '../../types/dataTableType';

const TableBody = ({ data = [], displayStart = 0, displayEnd = 0 }) => {
  const rows = [];
  rows.push(
    <tr
      key='startRowFiller'
      style={{ height: displayStart * itemRowHeight }}></tr>
  );
  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i] as TDataTable;
    if (row != undefined) {
      rows.push(
        <Fragment key={uuidv4()}>
          <tr className={`${row.rowColor}-row`}>
            <td>
              <NoCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <KOTimeCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <LeagueCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <MatchCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <MaxBetCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <IPTvStreamingCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <ProviderCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <RoundCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <RemarkCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <RAndDUpdateCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <CheckedByLstCell dataSource={data} rowIndex={i} />
            </td>
            <td>
              <ActionCell dataSource={data} rowIndex={i} />
            </td>
          </tr>
        </Fragment>
      );
    }
  }
  rows.push(
    <tr
      key='endRowFiller'
      style={{ height: (data.length - displayEnd) * itemRowHeight }}></tr>
  );
  return <>{rows}</>;
};
export default TableBody;
