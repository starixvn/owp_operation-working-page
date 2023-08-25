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

type DataSource = {
  userName: Required<string>;
  progress: Required<string>;
  target: Required<string>;
  gapWithTarget: Required<TTotalGameInfo>;
  achievedGames: Required<TTotalGameInfo>;
  reward: number;
};


export { DataSource, TState, TAction, TTotalGameInfo };
