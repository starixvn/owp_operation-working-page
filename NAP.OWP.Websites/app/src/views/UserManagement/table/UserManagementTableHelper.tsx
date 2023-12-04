import { No, EmployeeID, DefaultTableStyle, Language, SecondAccount, Address, Pickup, Level, Location } from './TableSchema.json';
import { Column, ColumnSchema, TDataTableResponse } from '../type';
import { dynamicCell } from './ConfigNative';
import { calculateCustomTableWidth } from '../../Shared/common/CustomTable/Helper';

const buildColumn = (width: number, column: Column) => {
  const { headerName, columnKey } = column;
  return {
    headerName,
    columnKey,
    width
  };
};

const selectTable = (widthWindow: number) => {
  const {
    minWidth,
    initialWidth,
    NoSize,
    CategorySize,
    LeagueSize,
    MaxBetSize,
    SpreadSize,
    RoundSize,
    SummarySize,
    ActionSize,
    LocationSize,
    LevelSize,
    PickupSize,
    AddressSize,
    SecondAccountSize
  } = DefaultTableStyle;
  const width = widthWindow < minWidth ? minWidth : widthWindow;

  return {
    columnSchema: [
      buildColumn(width * NoSize, No),
      buildColumn(width * CategorySize, EmployeeID),
      buildColumn(width * LocationSize, Location),
      buildColumn(width * LevelSize, Level),
      buildColumn(width * PickupSize, Pickup),
      buildColumn(width * AddressSize, Address),
      buildColumn(width * SecondAccountSize, SecondAccount),
      buildColumn(width * LeagueSize, Language),
    ],
    tableStyle: DefaultTableStyle,
    dynamicCell,
    tableWidth: (columnSchema: ColumnSchema) =>
      calculateCustomTableWidth(columnSchema, initialWidth)
  };
};

export { selectTable };
