import React from 'react';

import { NoCell, EmployeeIdCell } from './cell';
import { No, EmployeeID, Language } from './TableSchema.json';
import LanguageCell from './cell/language/LanguageCell';
import { TUserInfo } from '../type';
//import { CellModel } from '../../typing/tableType';

const dynamicCell = (rowIndex: number, cellModel: {
  dataSource: Array<TUserInfo>,
  columnKey: string
}) => {
  const { columnKey, dataSource } = cellModel;
  switch (columnKey) {
    case No.columnKey:
      return <NoCell />;
    case EmployeeID.columnKey:
      return <EmployeeIdCell />;
    case Language.columnKey:
      return <LanguageCell rowIndex={rowIndex} dataSource={dataSource} />;
    // case Category.columnKey:
    //   return <CategoryCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case League.columnKey:
    //   return <LeagueCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case MaxBet.columnKey:
    //   return <MaxBetCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case Spread.columnKey:
    //   return <SpreadCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case Round.columnKey:
    //   return <RoundCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case Summary.columnKey:
    //   return <SummaryCell dataSource={dataSource} rowIndex={rowIndex} />;
    // case Action.columnKey:
    //   return <ActionCell dataSource={dataSource} rowIndex={rowIndex} />;
  }
  return null;
};

export { dynamicCell };
