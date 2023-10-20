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
import updateConfirmAllEvent from '../helper/confirmedHelper';

const buildColumn = (width, column) => {
  const {
    headerName,
    columnKey,
    isCanFilter,
    isCheckBox,
    onCheckChange,
    checked,
    className,
    isFreeze,
    fixedRight
  } = column;
  return {
    headerName,
    columnKey,
    isCanFilter,
    isCheckBox,
    width,
    checked,
    className,
    onCheckChange,
    isFreeze,
    fixedRight
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

  const heightOfRAndD = calculateHeightOfColumn(115, 0.15, width);

  const heights = [
    DefaultTableStyle.rowHeight,
    heightOfStreaming,
    heightOfProvider,
    heightOfRound,
    heightOfRemark,
    heightOfRAndD
  ];

  return Math.max(...heights);
};
const passColorRowTable = dataSource => {
  if (!dataSource) {
    return '';
  }
  return `${dataSource.rowColor}-row`;
};

const selectTable = (isNoOfferAll, isConfirmAll) => {
  const widthWindow = window.innerWidth - DefaultTableStyle.widthResize;
  const minWidth = 880;
  const width = widthWindow < minWidth ? minWidth : widthWindow;
  return {
    columnSchema: [
      buildColumn(width * 0.03, {
        ...No,
        checked: isNoOfferAll,
        onCheckChange: handleNoOfferAllMatch
      }),
      buildColumn(width * 0.04, KOTime),
      buildColumn(width * 0.15, League),
      buildColumn(width * 0.14, Match),
      buildColumn(width * 0.03, MaxBet),
      buildColumn(width * 0.11, IPTvStreaming),
      buildColumn(width * 0.11, Provider),
      buildColumn(width * 0.11, Round),
      buildColumn(width * 0.11, Remark),
      buildColumn(width * 0.1, RAndDUpdate),
      buildColumn(width * 0.04, {
        ...CheckedByLst,
        checked: isConfirmAll,
        onCheckChange: updateConfirmAllEvent
      }),
      buildColumn(width * 0.03, Action)
    ],
    tableStyle: DefaultTableStyle,
    filterFunc: filterBySearchKey,
    clearFilterFunc: clearFilter,
    dynamicCell,
    tableWidth: columnSchema =>
      calculateCustomTableWidth(columnSchema, DefaultTableStyle.initialWidth)
  };
};

export { selectTable, passColorRowTable, calculateRowHeight };
