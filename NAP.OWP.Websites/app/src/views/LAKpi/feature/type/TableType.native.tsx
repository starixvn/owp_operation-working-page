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
  virtualMatches: Required<number>;
  multipleMatches: Required<number>;
  specialProducts: Required<number>;
  fiveMajorLeagues: Required<number>;
  multipleProducts: Required<number>;
};

type DataSource = {
  userName: Required<string>;
  progress: Required<string>;
  target: Required<string>;
  gapWithTarget: TTotalGameInfo;
  achievedGames: TTotalGameInfo;
  reward: number;
};

export { DataSource, TState, TAction };
