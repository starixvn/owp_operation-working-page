import { TDataSource } from './TableType';
import { classNameCells, itemRowHeight } from './TableSchema.json';
import { uniqueId } from 'lodash';
import CommonCell from './cell/CommonCell';
import CommentCell from './cell/CommentCell';
import LeagueCell from './cell/LeagueCell';

const TableBody = ({ data = [], displayStart = 0, displayEnd = 0 }) => {
  const rows = [];

  rows.push(
    <tr
      key='startRowFiller'
      style={{ height: displayStart * itemRowHeight }}></tr>
  );
  for (let i = displayStart; i < displayEnd; ++i) {
    let row = data[i] as TDataSource;
    if (row) {
      rows.push(
        <tr key={uniqueId()}>
          <CommonCell
            className={classNameCells.noCell}
            value={(i + 1).toString()}
          />
          <CommonCell
            className={classNameCells.leagueGroupCell}
            value={row.leagueGroup ?? ''}
          />
          <LeagueCell className={classNameCells.leagueCell} dataSource={row} />
          <CommonCell
            className={classNameCells.tvCell}
            value={row.condition.ipTv.map(x => x.value).join('/')}
          />
          <CommonCell
            className={classNameCells.roundCell}
            value={row.condition.round.map(x => x.value).join('/')}
          />
          <CommonCell
            className={classNameCells.leagueDivisionCell}
            value={row.condition.division.map(x => x.value).join('/')}
          />
          <CommonCell
            className={classNameCells.remarkCell}
            value={row.condition.remark}
          />
          <CommonCell
            className={classNameCells.spreadHDPCell}
            value={row.spread_HDP_value?.toString()}
          />
          <CommonCell
            className={classNameCells.spreadOUCell}
            value={row.spread_OU_value?.toString()}
          />
          <CommonCell
            className={classNameCells.mbWeekdayHDPCell}
            value={row.maxbetWD_HDP_Show}
          />
          <CommonCell
            className={classNameCells.mbWeekdayNoHDPCell}
            value={row.maxbetWD_NoOfHDP_Show}
          />
          <CommonCell
            className={classNameCells.mbWeekendHDPCell}
            value={row.maxbetWK_HDP_Show}
          />
          <CommonCell
            className={classNameCells.mbWeekendHDPCell}
            value={row.maxbetWK_NoOfHDP_Show}
          />
          <CommonCell
            className={classNameCells.lstNoteCell}
            value={row.lstNote}
          />
          <CommonCell
            className={classNameCells.remark2Cell}
            value={row.remark2}
          />
          <CommentCell
            className={classNameCells.commentCell}
            value={row.comment}
          />
        </tr>
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
