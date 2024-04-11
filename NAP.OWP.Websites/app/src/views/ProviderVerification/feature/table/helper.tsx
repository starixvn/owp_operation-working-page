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
  tableFilter.MatchNo.selected = helper.MatchNo(dataSource);
  tableFilter.MatchStatus.selected = helper.MatchStatus(dataSource);
  tableFilter.KoTime.selected = helper.KoTime(dataSource);
  tableFilter.League.selected = helper.League(dataSource);
  tableFilter.Match.selected = helper.Match(dataSource);
  tableFilter.Runner.selected = helper.Runner(dataSource);
  tableFilter.OtherProvider.selected = helper.OtherProvider(dataSource);
  tableFilter.Agent.selected = helper.Agent(dataSource);
  tableFilter.Mb.selected = helper.Mb(dataSource);
  tableFilter.Remark.selected = helper.Remark(dataSource);
  tableFilter.RemarkBy.selected = helper.RemarkBy(dataSource);
  tableFilter.EstNote.selected = helper.EstNote(dataSource);
};

const executeFilterTable = (dataSource: TDataSource[], tableFilter: TMultipleFilter) => {
  const { MatchNo,
    MatchStatus,
    KoTime,
    League,
    Match,
    Runner,
    OtherProvider,
    Agent,
    Mb,
    Remark,
    RemarkBy,
    EstNote
  } = tableFilter;
  return dataSource.filter(e => MatchNo.selected.some(m => m.label === (e.MatchNo ?? '(Blanks)'))
    && MatchStatus.selected.some(m => m.label === (e.MatchStatus ?? '(Blanks)'))
    && Match.selected.some(m => m.label === `${e.Home} -vs- ${e.Away}`)
    && KoTime.selected.some(m => m.label === formatTime(e.EventDateTime, 'minute', 'hh:mm A'))
    && League.selected.some(m => m.label === e.League)
    && Runner.selected.some(m => m.label === (e.Provider ?? '(Blanks)'))
    && OtherProvider.selected.some(m => m.label === (e.OtherProvider ?? '(Blanks)'))
    && Agent.selected.some(m => m.label === (e.Agent ?? '(Blanks)'))
    && Mb.selected.some(m => m.label === (buildMaxbetItemInOption({ HandicapSetting: e.HandicapSetting, OverUnderSetting: e.OverUnderSetting }) ?? '(Blanks)'))
    && Remark.selected.some(m => m.label === (e.Remark ?? '(Blanks)'))
    && RemarkBy.selected.some(m => m.label === (e.RemarkBy ?? '(Blanks)'))
    && EstNote.selected.some(m => m.label === (e.EstNote ?? '(Blanks)')));
};

export { buildMaxbetItemInOption, buildDefaultTableFilter, executeFilterTable };
