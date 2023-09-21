type TState = {
  dataTable: {
    loadingStatus: string;
    entities: Array<DataSource>;
    dataSourcesFiltered: Array<DataSource>;
    isGap: boolean;
  };
  filterHeaderValue: string;
  conditionData: Array<TCondition>;
  levelOption: Array<TargetOption>;
  sortState: SortState;
};

type SortState = {
  columnKeySelected: string;
  orderType: string;
  propertySelected: string;
};

type TAction = {
  queryDataTable: (
    fromDate: Required<Date>,
    toDate: Required<Date>
  ) => Promise<void>;
  exportDataTable: (
    fromDate: Required<Date>,
    toDate: Required<Date>
  ) => Promise<void>;
  queryConditionData: () => Promise<void>;
  queryLevelOption: () => Promise<void>;
  updateTargetLevel: (model: Target[]) => Promise<void>;
  setDataSourcesFiltered: (data: DataSource[]) => void;
  sortDataSources: (sortState: SortState) => void;
  setFilterHeader: (value: string) => void;
};

type TTotalGameInfo = {
  virtualMatches: number;
  multipleMatches: number;
  specialProducts: number;
  fiveMajorLeagues: number;
  multipleProducts: number;
};

interface TTotalGameConditionInfo extends TTotalGameInfo {
  totalVirtualMultipleMatches: number;
}

type DataSource = {
  userId: Required<number>;
  userName: Required<string>;
  progress: Required<string>;
  target: string | null;
  targetId: number | null;
  gapWithTarget: Required<TTotalGameInfo>;
  achievedGames: Required<TTotalGameInfo>;
  reward: number;
};

type TCondition = {
  progress: string;
  level: string;
  conditionFirst: TTotalGameConditionInfo;
  conditionSecond: TTotalGameConditionInfo;
  timeRange: string;
  reward: string;
};

type TargetOption = {
  value: number | null;
  label: string;
};

type Target = {
  userId: number;
  targetId: number | null;
};

export {
  TState,
  TAction,
  DataSource,
  TTotalGameInfo,
  TCondition,
  TTotalGameConditionInfo,
  SortState,
  TargetOption,
  Target
};
