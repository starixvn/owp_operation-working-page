import { uniqBy } from "lodash";
import store from "../../app/storeNative";
import { formatTime } from "../../../Shared/DateTime/dateTimeHelper";
import { buildMaxbetItemInOption } from "./helper";

const calculateMatchNoOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.MatchNo ?? '(Blanks)'
  })), v => v.label);
};
const calculateMatchStatusOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.MatchStatus ?? '(Blanks)'
  })), v => v.label);
};
const calculateKoOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: formatTime(x.EventDateTime, 'minute', 'hh:mm A') ?? '(Blanks)'
  })), v => v.label);
};
const calculateLeagueOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.League ?? '(Blanks)'
  })), v => v.label);
};
const calculateMatchOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: `${x.Home} -vs- ${x.Away}` ?? '(Blanks)'
  })), v => v.label);
};
const calculateRunnerOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.Provider ?? '(Blanks)'
  })), v => v.label);
};
const calculateOtherProviderOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.OtherProvider ?? '(Blanks)'
  })), v => v.label);
};
const calculateAgentOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.Agent ?? '(Blanks)'
  })), v => v.label);
};
const calculateMbOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: buildMaxbetItemInOption({ HandicapSetting: x.HandicapSetting, OverUnderSetting: x.OverUnderSetting }) ?? '(Blanks)'
  })), v => v.label);
};
const calculateRemarkOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.Remark ?? '(Blanks)'
  })), v => v.label);
};
const calculateRemarkByOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.RemarkBy ?? '(Blanks)'
  })), v => v.label);
};
const calculateAgentConfirmOption = () => {
  const { agentConfirmOption } = store.getState().events;
  return agentConfirmOption;
};

const calculateEstNoteOption = () => {
  const { dataSourceOriginal } = store.getState().events;
  return uniqBy([...dataSourceOriginal].map(x => ({
    value: x.OWPMatchId,
    label: x.EstNote ?? '(Blanks)'
  })), v => v.label);
};

const helper = {
  matchNo: () => calculateMatchNoOption(),
  matchStatus: () => calculateMatchStatusOption(),
  koTime: () => calculateKoOption(),
  league: () => calculateLeagueOption(),
  match: () => calculateMatchOption(),
  runner: () => calculateRunnerOption(),
  agent: () => calculateAgentOption(),
  mb: () => calculateMbOption(),
  remark: () => calculateRemarkOption(),
  remarkBy: () => calculateRemarkByOption(),
  agentConfirm: () => calculateAgentConfirmOption(),
  estNote: () => calculateEstNoteOption(),
  otherProvider: () => calculateOtherProviderOption()
};

export default helper;

