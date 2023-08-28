type TState = {
  dataTable: {
    loadingStatus: string,
    entities: Array<DataSource>
  }
}

type TAction = {
  queryDataTable: (fromDate: Required<Date>, toDate: Required<Date>) => Promise<void>
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
  userName: Required<string>;
  progress: Required<string>;
  target: Required<string>;
  gapWithTarget: Required<TTotalGameInfo>;
  achievedGames: Required<TTotalGameInfo>;
  reward: number;
};

type TCondition = {
  level: string;
  conditionFirst: TTotalGameConditionInfo;
  conditionSecond: TTotalGameConditionInfo;
  timeRange: string;
  reward: string;
};

export { DataSource, TTotalGameInfo, TCondition, TTotalGameConditionInfo };
