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
} from './cell/index';
import {
  No,
  KOTime,
  League,
  Match,
  Ticket,
  Remark,
  FtTrader,
  FirstHalfTrader,
  OtherProductTrader,
  LA,
  IPTvStreaming,
  Provider
} from './TableSchema.json';

const dynamicCell = (rowIndex, cellModel) => {
  const { dataSource, columnKey, handleShowTicket } = cellModel;
  const columns = new Map()
    .set(No.columnKey, <NoCell dataSource={dataSource} rowIndex={rowIndex} />)
    .set(
      KOTime.columnKey,
      <KOTimeCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      League.columnKey,
      <LeagueCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      Match.columnKey,
      <MatchCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      Ticket.columnKey,
      <TicketCell
        dataSource={dataSource}
        rowIndex={rowIndex}
        handleShowTicket={handleShowTicket}
      />
    )
    .set(
      Remark.columnKey,
      <RemarkCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      FtTrader.columnKey,
      <FtTraderCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      FirstHalfTrader.columnKey,
      <FirstHalfTraderCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      OtherProductTrader.columnKey,
      <OtherProductTraderCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(LA.columnKey, <LaCell dataSource={dataSource} rowIndex={rowIndex} />)
    .set(
      IPTvStreaming.columnKey,
      <IpTvStreamingCell dataSource={dataSource} rowIndex={rowIndex} />
    )
    .set(
      Provider.columnKey,
      <ProviderCell dataSource={dataSource} rowIndex={rowIndex} />
    );
  return columns.get(columnKey);
};

export { dynamicCell };
