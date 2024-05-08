import { Option } from '../../../../Shared/MultipleSelection/type';

type TDataSource = {
  leagueSettingId: number;
  owpLeagueId: number;
  leagueGroupId: number;
  leagueGroup: string;
  league: string;
  remark: string;
  spread_HDP_Value: number;
  spread_OU_Value: number;
  spread_Note: string;
  maxbetWD_HDP_Show: string;
  maxbetWD_HDP_Value: number;
  maxbetWD_HDP_Note: string;
  wD_NoOfHDP_Show: string;
  WD_NoOfHDP_Value: string;
  wD_NoOfHDP_Note: string;
  maxbetWK_HDP_Show: string;
  maxbetWK_HDP_Value: number;
  maxbetWK_HDP_Note: string;
  wK_NoOfHDP_Show: string;
  wK_NoOfHDP_Value: string;
  wK_NoOfHDP_Note: string;
  lstNote: string;
  remark2: string;
  comment: string;
  condition: {
    hasTv: boolean;
    hasIpTv: boolean;
    ipTv: Array<TCondition>;
    round: Array<TCondition>;
    division: Array<TCondition>;
    remark: string;
  };
};

type TCondition = {
  type: string;
  value: string;
};

type TTableSlice = {
  entities: Array<TDataSource>;
  entitiesOriginal: Array<TDataSource>;
  loading: string;
  multipleFilter: TMultipleFilter;
};

type TColumnKey =
  | 'League_Group'
  | 'League'
  | 'Tv'
  | 'Round'
  | 'League_Division'
  | 'Remark'
  | 'Spread_HDP'
  | 'Spread_OU'
  | 'MB_WK_HDP'
  | 'MB_WK_NO_HDP'
  | 'MB_WD_HDP'
  | 'MB_WD_NO_HDP'
  | 'LST_Note'
  | 'Remark2'
  | 'Comment';

type TMultipleFilter = {
  [key in TColumnKey]: {
    isFilter: boolean;
    selected: Option[];
  };
};

export { TCondition, TDataSource, TTableSlice, TColumnKey, TMultipleFilter };
