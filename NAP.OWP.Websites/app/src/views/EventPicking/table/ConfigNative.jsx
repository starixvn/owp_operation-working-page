import React from 'react';

import {
  NoCell,
  KOTimeCell,
  MatchCell,
  LeagueCell,
  RemarkCell,
  MaxBetCell,
  IPTvStreamingCell,
  ProviderCell,
  RoundCell,
  RAndDUpdateCell,
  CheckedByLstCell,
  ActionCell
} from './Cell';

import {
  No,
  KOTime,
  Match,
  League,
  Remark,
  MaxBet,
  IPTvStreaming,
  Provider,
  Round,
  RAndDUpdate,
  CheckedByLst,
  Action
} from './TableSchema.json';

const dynamicCell = (rowIndex, cellModel) => {
  const { dataSource, columnKey } = cellModel;
  switch (columnKey) {
    case No.columnKey:
      return <NoCell dataSource={dataSource} rowIndex={rowIndex} />;
    case KOTime.columnKey:
      return <KOTimeCell dataSource={dataSource} rowIndex={rowIndex} />;
    case League.columnKey:
      return <LeagueCell dataSource={dataSource} rowIndex={rowIndex} />;
    case Match.columnKey:
      return <MatchCell dataSource={dataSource} rowIndex={rowIndex} />;
    case MaxBet.columnKey:
      return <MaxBetCell dataSource={dataSource} rowIndex={rowIndex} />;
    case IPTvStreaming.columnKey:
      return <IPTvStreamingCell dataSource={dataSource} rowIndex={rowIndex} />;
    case Provider.columnKey:
      return <ProviderCell dataSource={dataSource} rowIndex={rowIndex} />;
    case Round.columnKey:
      return <RoundCell dataSource={dataSource} rowIndex={rowIndex} />;
    case Remark.columnKey:
      return <RemarkCell dataSource={dataSource} rowIndex={rowIndex} />;
    case RAndDUpdateCell.columnKey:
      return <RAndDUpdate dataSource={dataSource} rowIndex={rowIndex} />;
    case CheckedByLstCell.columnKey:
      return <CheckedByLst dataSource={dataSource} rowIndex={rowIndex} />;
    case ActionCell.columnKey:
      return <Action dataSource={dataSource} rowIndex={rowIndex} />;
  }
  return null;
};

export { dynamicCell };
