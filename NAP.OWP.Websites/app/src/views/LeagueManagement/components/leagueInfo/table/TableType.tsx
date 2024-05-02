type TDataSource = {
  leagueSettingId: number;
  owpLeagueId: number;
  leagueGroupId: number;
  leagueGroup: string;
  league: string;
  remark: string;
  spread_HDP_value: number;
  spread_OU_value: number;
  spread_Note: string;
  maxbetWD_HDP_value: number;
  maxbetWD_HDP_Note: string;
  maxbetWD_NoOfHDP_value: string;
  maxbetWD_NoOfHDP_Note: string;
  maxbetWK_HDP_value: number;
  maxbetWK_HDP_Note: string;
  maxbetWK_NoOfHDP_value: string;
  maxbetWK_NoOfHDP_Note: string;
  lstNote: string;
  remark2: string;
  comment: string;
  condition: {
    hasTv: boolean;
    hasIpTv: boolean;
    ipTv: Array<Condition>;
    round: Array<Condition>;
    division: Array<Condition>;
    remark: string;
  };
};

type Condition = {
  type: string;
  value: string;
};

type TTableSlice = {
  entities: Array<TDataSource>;
  entitiesOriginal: Array<TDataSource>;
  filterState: Array<TFilterState>;
  loading: string;
};

type TFilterState = {
  columnKey: string | undefined;
  keyword: string | undefined;
};

export { TDataSource, TFilterState, TTableSlice };
