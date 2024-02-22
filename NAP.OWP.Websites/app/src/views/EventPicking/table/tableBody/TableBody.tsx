import { Fragment } from 'react';
import NoCell from '../Cell/NoCell';
import KOTimeCell from '../Cell/KOTimeCell';
import LeagueCell from '../Cell/LeagueCell';
import MatchCell from '../Cell/MatchCell';
import MaxBetCell from '../Cell/MaxBetCell';
import IPTvStreamingCell from '../Cell/IPTvStreamingCell';
import TurnOverCell from '../Cell/TurnOverCell';
import MarginCell from '../Cell/MarginCell';
import ProviderCell from '../Cell/ProviderCell';
import RoundCell from '../Cell/RoundCell';
import RemarkCell from '../Cell/RemarkCell';
import RAndDUpdateCell from '../Cell/RAndDUpdateCell';
import CheckedByLstCell from '../Cell/CheckedByLstCell';
import ActionCell from '../Cell/ActionCell';
import { v4 as uuidv4 } from 'uuid';
import { itemRowHeight } from '../TableSchema.json';
import TDataTable, { TTurnOverInfo } from '../../types/dataTableType';
import PropTypes from 'prop-types';
import store from '../../app/store';

const propTypes = {
  data: PropTypes.array,
  displayStart: PropTypes.number,
  displayEnd: PropTypes.number
};

const TableBody = ({ data = [], displayStart = 0, displayEnd = 0 }) => {
  const rows = [];
  const {
    turnOverMarginPolicy: {
      permission: { HasRead }
    }
  } = store.getState();
  rows.push(
    <tr
      key='startRowFiller'
      style={{ height: displayStart * itemRowHeight }}></tr>
  );
  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i] as TDataTable;

    if (row) {
      const rowSpan = row.turnoverPeriod.length;
      const buildTurnoverMarginRow = () => {
        return row.turnoverPeriod.map(
          (_item: TTurnOverInfo, index: number) =>
            row.turnoverPeriod[index + 1] && (
              <tr className={`${row.rowColor}-row`}>
                <TurnOverCell
                  value={row.turnoverPeriod[index + 1].valueDisplay}
                  color={row.turnoverPeriod[index + 1].color}
                  name={row.turnoverPeriod[index + 1].title}
                />
                <MarginCell
                  value={row.marginPeriod[index + 1].valueDisplay}
                  color={row.marginPeriod[index + 1].color}
                />
              </tr>
            )
        );
      };
      rows.push(
        <Fragment key={uuidv4()}>
          <tr className={`${row.rowColor}-row`}>
            <td rowSpan={rowSpan}>
              <NoCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <KOTimeCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <LeagueCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <MatchCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <MaxBetCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <IPTvStreamingCell dataSource={data} rowIndex={i} />
            </td>
            {HasRead && (
              <>
                <TurnOverCell
                  value={row.turnoverPeriod[0]?.valueDisplay}
                  color={row.turnoverPeriod[0]?.color}
                  name={row.turnoverPeriod[0]?.title}
                />

                <MarginCell
                  value={row.marginPeriod[0]?.valueDisplay}
                  color={row.marginPeriod[0]?.color}
                />
              </>
            )}
            <td rowSpan={rowSpan}>
              <ProviderCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <RoundCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <RemarkCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <RAndDUpdateCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <CheckedByLstCell dataSource={data} rowIndex={i} />
            </td>
            <td rowSpan={rowSpan}>
              <ActionCell dataSource={data} rowIndex={i} />
            </td>
          </tr>
          {rowSpan > 1 && buildTurnoverMarginRow()}
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

TableBody.propTypes = propTypes;
export default TableBody;
