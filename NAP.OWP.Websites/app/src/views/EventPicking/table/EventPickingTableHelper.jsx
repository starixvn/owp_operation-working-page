import {
  DefaultTableStyle,
  No,
  KOTime,
  Match,
  League,
  Remark,
  MaxBet,
  IPTvStreaming,
  Provider,
  Round
} from './TableSchema.json';

import {
  filterBySearchKey,
  clearFilter
} from './eventPickingTableSlice/reducer';
import handleNoOfferAllMatch from '../helper/noOfferAllMatchHelper';
import { dynamicCell } from './ConfigNative';

import { calculateCustomTableWidth } from '../../Shared/common/CustomTable/Helper';

const buildColumn = (width, column) => {
  const { headerName, columnKey, isCanFilter, isCheckBox } = column;
  return {
    headerName,
    columnKey,
    isCanFilter,
    isCheckBox,
    width
  };
};

const passColorRowTable = dataSource => {
  if (!dataSource) {
    return '';
  }
  return `${dataSource.rowColor}-row`;
};

const selectTable = widthWindow => {
  const minWidth = 880;
  const width = widthWindow < minWidth ? minWidth : widthWindow;
  return {
    columnSchema: [
      buildColumn(width * 0.03, No),
      buildColumn(width * 0.05, KOTime),
      buildColumn(width * 0.12, League),
      buildColumn(width * 0.14, Match),
      buildColumn(width * 0.06, MaxBet),
      buildColumn(width * 0.15, IPTvStreaming),
      buildColumn(width * 0.15, Provider),
      buildColumn(width * 0.15, Round),
      buildColumn(width * 0.15, Remark)
    ],
    tableStyle: DefaultTableStyle,
    filterFunc: filterBySearchKey,
    clearFilterFunc: clearFilter,
    dynamicCell,
    tableWidth: columnSchema =>
      calculateCustomTableWidth(columnSchema, DefaultTableStyle.initialWidth),
    onCheckChange: handleNoOfferAllMatch
  };
};

export { selectTable, passColorRowTable };
