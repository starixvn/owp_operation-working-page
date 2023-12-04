import { No, EmployeeID, DefaultTableStyle } from './TableSchema.json';
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
    ActionSize
  } = DefaultTableStyle;
  const width = widthWindow < minWidth ? minWidth : widthWindow;

  return {
    columnSchema: [
      buildColumn(width * NoSize, No),
      buildColumn(width * CategorySize, EmployeeID)
    ],
    tableStyle: DefaultTableStyle,
    dynamicCell,
    tableWidth: (columnSchema: ColumnSchema) =>
      calculateCustomTableWidth(columnSchema, initialWidth)
  };
};

export { selectTable };
