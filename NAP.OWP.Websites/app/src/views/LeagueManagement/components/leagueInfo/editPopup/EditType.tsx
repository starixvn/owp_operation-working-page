import { TCondition } from "../table/TableType";

type TOption = {
  value: number;
  label: string | null;
};

type TProps = {
  data: TEditSetting;
  updateSetting: Function;
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
  spread_HDP: string;
  spread_OU: string;
  maxbetWD_HDP: string;
  maxbetWD_NoOfHDP: string;
  maxbetWK_HDP: string;
  maxbetWK_NoOfHDP: string;
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

export { TEditSetting, TExpression, TOption, TProps, TConditions };
