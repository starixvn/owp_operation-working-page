import { uniqBy } from "lodash";
import { formatTime } from "../../../Shared/DateTime/dateTimeHelper";
import { buildLabelItemOption, buildMaxbetItemInOption } from "./helper";
import { TDataSource } from "../../type/table";
import store from "../../app/storeNative";

const calculateMatchNoOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: buildLabelItemOption(x.MatchNo)
  })), v => v.label);
};
const calculateMatchStatusOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: buildLabelItemOption(x.MatchStatus)
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
    label: buildLabelItemOption(x.Provider)
  })), v => v.label);
};
const calculateOtherProviderOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: buildLabelItemOption(x.OtherProvider)
  })), v => v.label);
};
const calculateAgentOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.Agent ?? '',
    label: buildLabelItemOption(x.Agent)
  })), v => v.value);
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
    label: buildLabelItemOption(x.Remark)
  })), v => v.label);
};
const calculateRemarkByOption = (dataSource: TDataSource[]) => {
  return uniqBy([...dataSource].map(x => ({
    value: x.OWPMatchId,
    label: buildLabelItemOption(x.RemarkBy)
  })), v => v.label);
};

const calculateAgentConfirmOption = () => {
  const { agentConfirmOption } = store.getState().events;
  return [...agentConfirmOption, { value: -1, label: '(Blanks)' }];
};

const calculateEstNoteOption = (dataSource: TDataSource[]) => uniqBy([...dataSource].map(x => ({
  value: x.EstNote ?? '',
  label: buildLabelItemOption(x.EstNote)
})), v => v.value);

const helper = {
  MatchNo: (dataSource: TDataSource[]) => calculateMatchNoOption(dataSource),
  MatchStatus: (dataSource: TDataSource[]) => calculateMatchStatusOption(dataSource),
  KoTime: (dataSource: TDataSource[]) => calculateKoOption(dataSource),
  League: (dataSource: TDataSource[]) => calculateLeagueOption(dataSource),
  Match: (dataSource: TDataSource[]) => calculateMatchOption(dataSource),
  Runner: (dataSource: TDataSource[]) => calculateRunnerOption(dataSource),
  Agent: (dataSource: TDataSource[]) => calculateAgentOption(dataSource),
  Mb: (dataSource: TDataSource[]) => calculateMbOption(dataSource),
  Remark: (dataSource: TDataSource[]) => calculateRemarkOption(dataSource),
  RemarkBy: (dataSource: TDataSource[]) => calculateRemarkByOption(dataSource),
  AgentConfirm: (dataSource: TDataSource[]) => calculateAgentConfirmOption(),
  EstNote: (dataSource: TDataSource[]) => calculateEstNoteOption(dataSource),
  OtherProvider: (dataSource: TDataSource[]) => calculateOtherProviderOption(dataSource)
};

export default helper;

