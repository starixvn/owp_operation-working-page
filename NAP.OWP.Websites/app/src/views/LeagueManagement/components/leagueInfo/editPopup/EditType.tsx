import { TCondition, TDataSource } from "../table/TableType";

type TOption = {
  value: number;
  label: string | null;
};

type TProps = {
  data: TDataSource;
}
type TConditions = {
  ipTv: Array<TCondition>;
  round: Array<TCondition>;
  division: Array<TCondition>;
}

type TEditSetting = {
  leagueSettingId: number;
  league: string;
  owpLeagueId: number;
  leagueGroupId: number;
  leagueGroup: string;
  spread: string;
  maxbetWD_HDP: string;
  wD_NoOfHDP: string;
  maxbetWK_HDP: string;
  wK_NoOfHDP: string;
  lstNote: string;
  remark2: string;
  comment: string;
  hasTv: boolean;
  hasIpTv: boolean;
  remark: string;
} & TConditions;

type TExpression = {
  key: string;
  expression: {
    value: number;
    label: string;
  };
  value: string;
}

type TLeagueCategory = {
  RefName: string;
  Id: number;
  Value: string;
}

export { TEditSetting, TExpression, TOption, TProps, TConditions, TLeagueCategory };
