import { uniqBy } from "lodash";
import store from "../../app/storeNative";
import { formatTime } from "../../../Shared/DateTime/dateTimeHelper";
import { buildMaxbetItemInOption } from "./helper";
import { TDataSource } from "../../type/table";

const calculateMatchNoOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.MatchNo ?? '(Blanks)'
  })), v => v.label);
};
const calculateMatchStatusOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.MatchStatus ?? '(Blanks)'
  })), v => v.label);
};
const calculateKoOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: formatTime(x.EventDateTime, 'minute', 'hh:mm A') ?? '(Blanks)'
  })), v => v.label);
};
const calculateLeagueOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.League ?? '(Blanks)'
  })), v => v.label);
};
const calculateMatchOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: `${x.Home} -vs- ${x.Away}`
  })), v => v.label);
};
const calculateRunnerOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.Provider ?? '(Blanks)'
  })), v => v.label);
};
const calculateOtherProviderOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.OtherProvider ?? '(Blanks)'
  })), v => v.label);
};
const calculateAgentOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.Agent ?? '(Blanks)'
  })), v => v.label);
};

const calculateMbOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: buildMaxbetItemInOption({ HandicapSetting: x.HandicapSetting, OverUnderSetting: x.OverUnderSetting }) ?? '(Blanks)'
  })), v => v.label);
};
const calculateRemarkOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.Remark ?? '(Blanks)'
  })), v => v.label);
};
const calculateRemarkByOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: x.RemarkBy ?? '(Blanks)'
  })), v => v.label);
};
const calculateAgentConfirmOption = () => {
  const { agentConfirmOption } = store.getState().events;
  return [...agentConfirmOption, { value: -1, label: '(Blanks)' }];
};

const calculateEstNoteOption = (dataSource: TDataSource[]) => uniqBy([...dataSource].map(x => ({
  value: x.OWPMatchId,
  label: x.EstNote ?? '(Blanks)'
})), v => v.label);

const helper = {
  matchNo: (dataSource: TDataSource[]) => calculateMatchNoOption(dataSource),
  matchStatus: (dataSource: TDataSource[]) => calculateMatchStatusOption(dataSource),
  koTime: (dataSource: TDataSource[]) => calculateKoOption(dataSource),
  league: (dataSource: TDataSource[]) => calculateLeagueOption(dataSource),
  match: (dataSource: TDataSource[]) => calculateMatchOption(dataSource),
  runner: (dataSource: TDataSource[]) => calculateRunnerOption(dataSource),
  agent: (dataSource: TDataSource[]) => calculateAgentOption(dataSource),
  mb: (dataSource: TDataSource[]) => calculateMbOption(dataSource),
  remark: (dataSource: TDataSource[]) => calculateRemarkOption(dataSource),
  remarkBy: (dataSource: TDataSource[]) => calculateRemarkByOption(dataSource),
  agentConfirm: () => calculateAgentConfirmOption(),
  estNote: (dataSource: TDataSource[]) => calculateEstNoteOption(dataSource),
  otherProvider: (dataSource: TDataSource[]) => calculateOtherProviderOption(dataSource)
};

export default helper;

