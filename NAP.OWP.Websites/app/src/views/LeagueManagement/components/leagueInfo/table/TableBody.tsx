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

    rows.push(
      <tr key={uniqueId()}>
        <CommonCell
          className={classNameCells.noCell}
          value={(i + 1).toString()}
        />
        <CommonCell
          className={classNameCells.leagueGroupCell}
          value={row.leagueGroup}
        />
        <LeagueCell className={classNameCells.leagueCell} value={row.league} />
        <CommonCell className={classNameCells.tvCell} value={row.tv} />
        <CommonCell className={classNameCells.roundCell} value={row.round} />
        <CommonCell
          className={classNameCells.leagueDivisionCell}
          value={row.leagueDivision}
        />
        <CommonCell className={classNameCells.remarkCell} value={row.remark} />
        <CommonCell
          className={classNameCells.spreadHDPCell}
          value={row.spreadHDP}
        />
        <CommonCell
          className={classNameCells.spreadOUCell}
          value={row.spreadOU}
        />
        <CommonCell
          className={classNameCells.mbWeekdayHDPCell}
          value={row.maxbetWeekdayHDP}
        />
        <CommonCell
          className={classNameCells.mbWeekdayNoHDPCell}
          value={row.maxbetWeekdayNoHDP}
        />
        <CommonCell
          className={classNameCells.mbWeekendHDPCell}
          value={row.maxbetWeekendHDP}
        />
        <CommonCell
          className={classNameCells.mbWeekendHDPCell}
          value={row.maxbetWeekendNoHDP}
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
  rows.push(
    <tr
      key='endRowFiller'
      style={{ height: (data.length - displayEnd) * itemRowHeight }}></tr>
  );

  return <>{rows}</>;
};

export default TableBody;
