import { formatTime } from "../../../Shared/DateTime/dateTimeHelper";
import { Option } from "../../../Shared/MultipleSelection/type";
import { TDataSource, TMaxbetSetting, TMultipleFilter } from "../../type/table";
import helper from "./calculateFilterOption";

const buildMaxbetItemInOption = (maxbetSetting: TMaxbetSetting) => {
  const { HandicapSetting, OverUnderSetting } = maxbetSetting;
  const isDisplayHDPSetting =
    HandicapSetting?.SpreadToDisplay ?? OverUnderSetting?.SpreadToDisplay;
  const isHDPSpreadExisting = HandicapSetting?.SpreadToDisplay;
  return `${HandicapSetting?.MaxBetToDisplay}${isDisplayHDPSetting ? '(' + HandicapSetting?.SpreadToDisplay : ''}
${OverUnderSetting?.SpreadToDisplay ? (isHDPSpreadExisting ? '-' : '') + OverUnderSetting.SpreadToDisplay
      : ''}
  ${isDisplayHDPSetting ? ')' : ''}`;
};

const buildDefaultTableFilter = (dataSource: TDataSource[], agentOption: Option[], tableFilter: TMultipleFilter) => {
  tableFilter.matchNo.selected = helper.matchNo(dataSource);
  tableFilter.matchStatus.selected = helper.matchStatus(dataSource);
  tableFilter.koTime.selected = helper.koTime(dataSource);
  tableFilter.league.selected = helper.league(dataSource);
  tableFilter.match.selected = helper.match(dataSource);
  tableFilter.runner.selected = helper.runner(dataSource);
  tableFilter.otherProvider.selected = helper.otherProvider(dataSource);
  tableFilter.agent.selected = helper.agent(dataSource);
  tableFilter.mb.selected = helper.mb(dataSource);
  tableFilter.remark.selected = helper.remark(dataSource);
  tableFilter.remarkBy.selected = helper.remarkBy(dataSource);
  tableFilter.agentConfirm.selected = [...agentOption, { value: -1, label: '(Blanks)' }];
  tableFilter.estNote.selected = helper.estNote(dataSource);
};

const executeFilterTable = (dataSource: TDataSource[], tableFilter: TMultipleFilter) => {
  const { matchNo,
    matchStatus,
    koTime,
    league,
    match,
    runner,
    otherProvider,
    agent,
    mb,
    remark,
    remarkBy,
    agentConfirm,
    estNote
  } = tableFilter;
  return dataSource.filter(e => matchNo.selected.some(m => m.label === (e.MatchNo ?? '(Blanks)'))
    && matchStatus.selected.some(m => m.label === (e.MatchStatus ?? '(Blanks)'))
    && match.selected.some(m => m.label === `${e.Home} -vs- ${e.Away}`)
    && koTime.selected.some(m => m.label === formatTime(e.EventDateTime, 'minute', 'hh:mm A'))
    && league.selected.some(m => m.label === e.League)
    && runner.selected.some(m => m.label === (e.Provider ?? '(Blanks)'))
    && otherProvider.selected.some(m => m.label === (e.OtherProvider ?? '(Blanks)'))
    && agent.selected.some(m => m.label === (e.Agent ?? '(Blanks)'))
    && mb.selected.some(m => m.label === (buildMaxbetItemInOption({ HandicapSetting: e.HandicapSetting, OverUnderSetting: e.OverUnderSetting }) ?? '(Blanks)'))
    && remark.selected.some(m => m.label === (e.Remark ?? '(Blanks)'))
    && remarkBy.selected.some(m => m.label === (e.RemarkBy ?? '(Blanks)'))

    // TODO:
    && estNote.selected.some(m => m.label === (e.EstNote ?? '(Blanks)')))
    .filter(e => {
      debugger
      console.log(e)
      return agentConfirm.selected.some(m => e.AgentConfirm.some(a => a.Label === m.label));
    });
};

export { buildMaxbetItemInOption, buildDefaultTableFilter, executeFilterTable };
