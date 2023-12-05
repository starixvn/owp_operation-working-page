import React from 'react';

import { NoCell, EmployeeIdCell, RoleCell, CategoryCell } from './cell';
import {
  No,
  EmployeeID,
  Language,
  Location,
  Level,
  Pickup,
  SecondAccount,
  Role,
  Category,
  Address
} from './TableSchema.json';
import LanguageCell from './cell/language/LanguageCell';
import LocationCell from './cell/location/LocationCell';
import { TUserInfo } from '../type';
import LevelCell from './cell/level/LevelCell';
import PickupCell from './cell/pickup/PickupCell';
import SecondAccountCell from './cell/secondAccount/SecondAccountCell';
import AddressCell from './cell/address/AddressCell';
//import { CellModel } from '../../typing/tableType';

const dynamicCell = (
  rowIndex: number,
  cellModel: {
    dataSource: Array<TUserInfo>;
    columnKey: string;
  }
) => {
  const { columnKey, dataSource } = cellModel;
  switch (columnKey) {
    case No.columnKey:
      return <NoCell />;
    case EmployeeID.columnKey:
      return <EmployeeIdCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Language.columnKey:
      return <LanguageCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Role.columnKey:
      return <RoleCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Category.columnKey:
      return <CategoryCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Location.columnKey:
      return <LocationCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Level.columnKey:
      return <LevelCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Pickup.columnKey:
      return <PickupCell rowIndex={rowIndex} dataSource={dataSource} />;
    case SecondAccount.columnKey:
      return <SecondAccountCell rowIndex={rowIndex} dataSource={dataSource} />;
    case Address.columnKey:
      return <AddressCell rowIndex={rowIndex} dataSource={dataSource} />;
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
