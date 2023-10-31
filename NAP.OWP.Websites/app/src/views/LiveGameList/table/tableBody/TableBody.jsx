import React from 'react';
import {
  NoCell,
  KOTimeCell,
  LeagueCell,
  MatchCell,
  TicketCell,
  RemarkCell,
  FtTraderCell,
  FirstHalfTraderCell,
  OtherProductTraderCell,
  LaCell,
  IpTvStreamingCell,
  ProviderCell
} from '../cell';
import { v4 as uuidv4 } from 'uuid';
import { buildSpecialListModel } from '../LiveGameListTableHelper';

const TableBody = ({ data = '', displayStart = '', displayEnd = '' }) => {
  const itemRowHeight = 32;
  const rows = [];

  const ouSpecificBetTypeGroupListModel = buildSpecialListModel(data);

  const buildElementOtherTrader = () => {
    return ouSpecificBetTypeGroupListModel.map(
      (value, index) =>
        ouSpecificBetTypeGroupListModel[index + 1] && (
          <tr className={rowClass} key={`other-${rowIndex}-${index}`}>
            <>
              <OtherProductTraderCell
                name={ouSpecificBetTypeGroupListModel[index + 1].BetTypeName}
                maxBet={ouSpecificBetTypeGroupListModel[index + 1].Maxbet}
                traders={
                  ouSpecificBetTypeGroupListModel[index + 1].MainAssignment
                }
                others={
                  ouSpecificBetTypeGroupListModel[index + 1].OthersAssignment
                }
                rowIndex={rowIndex}
              />
            </>
          </tr>
        )
    );
  };
  rows.push(
    <tr
      key='startRowFiller'
      style={{ height: displayStart * itemRowHeight }}></tr>
  );

  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i];
    if (row !== undefined) {
      rows.push(
        <tr key={uuidv4()}>
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
            <TicketCell dataSource={data} rowIndex={i} />
          </td>
          <td>
            <RemarkCell dataSource={data} rowIndex={i} />
          </td>
          <td>Test1</td>
          <td>Test2</td>
          <td>Test3</td>
          <td>
            <LaCell dataSource={data} rowIndex={i} />
          </td>
          <td>
            <IpTvStreamingCell dataSource={data} rowIndex={i} />
          </td>
          <td>
            <ProviderCell dataSource={data} rowIndex={i} />
          </td>
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
