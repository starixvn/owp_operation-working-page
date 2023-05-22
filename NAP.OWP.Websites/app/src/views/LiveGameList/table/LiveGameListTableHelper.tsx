import { dynamicCell } from './ConfigNative';
import {
  AssignmentModel,
  Column,
  ColumnSchema,
  FilterState,
  MatchInfo
} from '../type/TableType';
import { calculateCustomTableWidth } from '../../Shared/common/CustomTable/Helper';
import { filterBySearchKey, clearFilter } from '../table/tableSlice/tableSlice';
import {
  DefaultTableStyle,
  No,
  KOTime,
  Match,
  League,
  Ticket,
  Remark,
  FtTrader,
  FirstHalfTrader,
  OtherProductTrader,
  LA,
  IPTvStreaming,
  Provider
} from './TableSchema.json';
import { MatchStatuses } from '../../Shared/Constants';
import { coefficientTable } from '../LiveGameListConst.json';
import { filterDataTable } from '../../Shared/Utils';

const buildColorRowTable = (dataSource: MatchInfo) => {
  if (!dataSource) {
    return 0;
  }
  switch (dataSource.MatchStatus) {
    case MatchStatuses.Cancel:
    case MatchStatuses.Postponed:
      return 'orange-row';
    case MatchStatuses.Suspended:
      return 'red-row';
    default:
      return '';
  }
};

const buildColumn = (width: number, column: Column) => {
  const { headerName, columnKey, isCanFilter } = column;
  return {
    headerName,
    columnKey,
    isCanFilter,
    width
  };
};

const buildColumnKOTime = (width: number, column: Column) => {
  const { isCanSort, sortState } = column;
  return {
    ...buildColumn(width, column),
    isCanSort,
    sortState
  };
};

const calculateRowOfColumn = (
  length: number,
  widthPercent: number,
  widthWindow: number
) => {
  return (length * widthPercent * coefficientTable) / widthWindow;
};

const calculateRowHeight = (dataSource: MatchInfo, width: number) => {
  if (!dataSource) {
    return 0;
  }
  const heightOfLeague = calculateRowOfColumn(
    dataSource.LengthLeague,
    League.size,
    width
  );

  const heightOfRemark = calculateRowOfColumn(
    dataSource.LengthRemark,
    Remark.size,
    width
  );

  const heightOfTraderHdp = dataSource.LengthTraderHdp;

  const heightOfTraderOu = dataSource.LengthTraderOu;

  const heightOfOtherProduct =
    dataSource.LengthOtherProductOneXTwo +
    dataSource.LengthOtherProduct1HOneXTwo +
    dataSource.LengthOtherProductAllInOne +
    dataSource.LengthOtherProductFastMarket +
    dataSource.LengthOtherProductFifteenMinutes +
    dataSource.LengthOtherProductTenMinutes;

  const heightOfIpTv = calculateRowOfColumn(
    dataSource.LengthIpTv,
    IPTvStreaming.size,
    width
  );

  const heightOfProvider = calculateRowOfColumn(
    dataSource.LengthProvider,
    Provider.size,
    width
  );

  const heights = [
    DefaultTableStyle.rowHeight,
    heightOfLeague,
    heightOfRemark,
    heightOfTraderHdp + heightOfTraderOu,
    heightOfOtherProduct,
    heightOfIpTv,
    heightOfProvider
  ];

  return Math.max(...heights);
};

const selectTable = (widthWindow: number) => {
  const minWidth = 950;
  const width = widthWindow < minWidth ? minWidth : widthWindow;
  return {
    columnSchema: [
      buildColumn(width * No.size, No),
      buildColumnKOTime(width * KOTime.size, KOTime),
      buildColumn(width * League.size, League),
      buildColumn(width * Match.size, Match),
      buildColumn(width * Ticket.size, Ticket),
      buildColumn(width * Remark.size, Remark),
      buildColumn(width * FtTrader.size, FtTrader),
      buildColumn(width * FirstHalfTrader.size, FirstHalfTrader),
      buildColumn(width * OtherProductTrader.size, OtherProductTrader),
      buildColumn(width * LA.size, LA),
      buildColumn(width * IPTvStreaming.size, IPTvStreaming),
      buildColumn(width * Provider.size, Provider)
    ],
    tableStyle: DefaultTableStyle,
    dynamicCell,
    filterFunc: filterBySearchKey,
    clearFilterFunc: clearFilter,
    tableWidth: (columnSchema: ColumnSchema) =>
      calculateCustomTableWidth(columnSchema, DefaultTableStyle.initialWidth)
  };
};

const searchCommonInfo = (
  source: MatchInfo[],
  keys: Array<keyof MatchInfo>,
  keyword: string
) =>
  source.filter(x =>
    keys.some(i =>
      x[i]
        ?.toString()
        .toLowerCase()
        .includes(keyword.trim())
    )
  );

const searchTraderInfo = (
  source: MatchInfo[],
  nestedKeys: Array<keyof AssignmentModel>,
  keyword: string
) =>
  source.filter(({ Assignment }) =>
    isAssignment(Assignment, nestedKeys, keyword)
  );

const isAssignment = (
  assignment: AssignmentModel,
  assignmentKeys: Array<keyof AssignmentModel>,
  keyword: string
) =>
  assignmentKeys.some(i =>
    assignment[i].some(
      ({ Nickname, Username }) =>
        Nickname?.toLowerCase().includes(keyword.trim()) ||
        Username?.toLowerCase().includes(keyword.trim())
    )
  );

const commonKeys: { [key: string]: Array<keyof MatchInfo> } = {
  [No.columnKey]: ['MatchNo'],
  [League.columnKey]: ['League'],
  [Match.columnKey]: ['Home', 'Away'],
  [Provider.columnKey]: ['WatchBet', 'Phone', 'Provider', 'OtherProvider'],
  [IPTvStreaming.columnKey]: ['IPTVCopy']
};

const traderKeys: { [key: string]: Array<keyof AssignmentModel> } = {
  [FtTrader.columnKey]: [
    'Handicap',
    'HandicapOthers',
    'OverUnder',
    'OverUnderOthers'
  ],
  [FirstHalfTrader.columnKey]: [
    'Handicap1st',
    'Handicap1stOthers',
    'OverUnder1st',
    'OverUnder1stOthers'
  ],
  [OtherProductTrader.columnKey]: [
    'Specific10MinsOthers',
    'Specific15MinsOthers',
    'Specific10Mins',
    'Specific15Mins',
    'AllInOne',
    'AllInOneOthers',
    'FastMarket',
    'FastMarketOthers',
    'OneXTwo',
    'OneXTwoOthers',
    'OneXTwo1st',
    'OneXTwo1stOthers'
  ],
  [LA.columnKey]: ['LA', 'LAOthers']
};

const filterDataByKeys = (
  source: MatchInfo[],
  columnKey: string,
  keyword: string
) => {
  if (columnKey in commonKeys) {
    return searchCommonInfo(source, commonKeys[columnKey], keyword);
  }
  if (columnKey in traderKeys) {
    return searchTraderInfo(source, traderKeys[columnKey], keyword);
  }
  return [];
};

const filterDataTableByCriteria = (
  data: MatchInfo[],
  { columnKey, keyword }: FilterState
) =>
  columnKey && keyword
    ? filterDataByKeys(data, columnKey, keyword.toLowerCase())
    : data;

const filterIssueByUnreadMessageValue = (
  entities: MatchInfo[],
  isShowUnreadMessOnly: boolean
) => entities.filter(d => !d.IsRead || !isShowUnreadMessOnly);

const filterData = (entities: MatchInfo[]) => (
  isShowUnreadMessOnly: boolean
) => {
  const data = filterIssueByUnreadMessageValue(entities, isShowUnreadMessOnly);
  return (filters: FilterState[]) =>
    filterDataTable(data, filters, filterDataTableByCriteria);
};

const sortDataAsc = (entities: MatchInfo[]) => [...entities].sort((src, dest) => new Date(src.EventDateTime).getTime() - new Date(dest.EventDateTime).getTime() || src.MatchNo.localeCompare(dest.MatchNo));

const sortDataDesc = (entities: MatchInfo[]) => [...entities].sort((src, dest) => new Date(dest.EventDateTime).getTime() - new Date(src.EventDateTime).getTime() || dest.MatchNo.localeCompare(src.MatchNo));

export { buildColumnKOTime, selectTable, filterData, calculateRowHeight, buildColorRowTable, sortDataAsc, sortDataDesc };
