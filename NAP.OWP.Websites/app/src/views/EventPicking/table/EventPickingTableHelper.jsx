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
  Round,
  RAndDUpdate,
  CheckedByLst,
  Action
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

const calculateHeightOfColumn = (length, widthPercent, widthWindow) =>
  (length * widthPercent * DefaultTableStyle.coefficientTable) / widthWindow;

const calculateRowHeight = (dataSource, width) => {
  if (!dataSource) {
    return 0;
  }

  const heightOfStreaming = calculateHeightOfColumn(
    dataSource.lengthStreamingCell,
    0.15,
    width
  );

  const heightOfProvider = calculateHeightOfColumn(
    dataSource.lengthProviderCell,
    0.15,
    width
  );
  const heightOfRound = calculateHeightOfColumn(
    dataSource.lengthRoundCell,
    0.15,
    width
  );
  const heightOfRemark = calculateHeightOfColumn(
    dataSource.lengthRemarkCell,
    0.15,
    width
  );
  const heights = [
    DefaultTableStyle.rowHeight,
    heightOfStreaming,
    heightOfProvider,
    heightOfRound,
    heightOfRemark
  ];

  return Math.max(...heights);
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
      buildColumn(width * 0.15, League),
      buildColumn(width * 0.14, Match),
      buildColumn(width * 0.03, MaxBet),
      buildColumn(width * 0.15, IPTvStreaming),
      buildColumn(width * 0.15, Provider),
      buildColumn(width * 0.15, Round),
      buildColumn(width * 0.15, Remark),
      buildColumn(width * 0.15, RAndDUpdate),
      buildColumn(100, CheckedByLst),
      buildColumn(50, Action)
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

export { selectTable, passColorRowTable, calculateRowHeight };
