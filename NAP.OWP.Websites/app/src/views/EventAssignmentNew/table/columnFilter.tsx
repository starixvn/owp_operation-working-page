import Utils from '../../Shared/Utils';
import { findIndex, includes, filter } from 'lodash';
import { TAssignment, TColumnFilter, TColumnFilterByMbc, TDataTable } from '../type/type';

const { convertThousandToK, convertSpreadToPercent, toLowerCaseForFilter } =
  Utils;

const filterMatchNo = (events: TDataTable, keyword: string) =>
  filter(events, event => {
    return (
      includes(toLowerCaseForFilter(event.matchNo), keyword) ||
      includes(toLowerCaseForFilter(event.matchStatus), keyword)
    );
  });

const filterKickOffTime = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.kickOffTime || event.otherTime) {
      return (
        includes(toLowerCaseForFilter(event.kickOffTime), keyword) ||
        includes(toLowerCaseForFilter(event.otherTime), keyword)
      );
    }
    return false;
  });
};

const filterEvent = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    const isIncludeEventInfo =
      includes(toLowerCaseForFilter(event.league), keyword) ||
      includes(toLowerCaseForFilter(event.home), keyword) ||
      includes(toLowerCaseForFilter(event.away), keyword);
    const isIncludeNoOfHDP =
      event.noOfHDP && includes(toLowerCaseForFilter(event.noOfHDP), keyword);

    return (
      isIncludeEventInfo ||
      (isIncludeNoOfHDP ??
        findIndex(event.matchOffers, mo =>
          includes(toLowerCaseForFilter(mo.matchOfferValue), keyword)
        ) >= 0)
    );
  });
};

const filterTV = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    return (
      (event.channel &&
        includes(toLowerCaseForFilter(event.channel), keyword)) ||
      findIndex(event.televisions, tv =>
        includes(toLowerCaseForFilter(tv.tVCode), keyword)
      ) >= 0
    );
  });
};

const filterProvider = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (
      event.provider ||
      event.otherProvider ||
      event.watchBet ||
      event.phone
    ) {
      return (
        includes(toLowerCaseForFilter(event.provider), keyword) ||
        includes(toLowerCaseForFilter(event.otherProvider), keyword) ||
        includes(toLowerCaseForFilter(event.watchBet), keyword) ||
        includes(toLowerCaseForFilter(event.phone), keyword)
      );
    }
    return false;
  });
};

const includeMBC = (props: TColumnFilterByMbc) => {
  const { maxbetHDP, spreadHDP, spreadOU, maxBetToDisplay, keyword } = props;
  return (
    includes(toLowerCaseForFilter(maxbetHDP), keyword) ||
    includes(toLowerCaseForFilter(spreadHDP), keyword) ||
    includes(toLowerCaseForFilter(spreadOU), keyword) ||
    includes(toLowerCaseForFilter(maxBetToDisplay), keyword)
  );
};

const filterMaxbetSpread = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    let maxbetHDP = '';
    let spreadHDP = '';
    let spreadOU = '';
    let maxBetToDisplay = '';
    if (event.handicapSetting) {
      maxbetHDP = convertThousandToK(event.handicapSetting.maxbet, true);
      spreadHDP = convertSpreadToPercent(event.handicapSetting.spread, true);

      maxBetToDisplay = event.handicapSetting.maxBetToDisplay;
    }

    if (event.overUnderSetting) {
      spreadOU = convertSpreadToPercent(event.overUnderSetting.spread, true);
    }

    const isMBCValid = maxbetHDP || spreadHDP || spreadOU;

    const propMbc = {
      maxbetHDP,
      spreadHDP,
      spreadOU,
      maxBetToDisplay,
      keyword
    };
    const isIncludeMBC = includeMBC(propMbc);

    if (isMBCValid) {
      return isIncludeMBC;
    }

    return false;
  });
};
const isContainsAssignment = (assignment: TAssignment, keyword: string) =>
  includes(toLowerCaseForFilter(assignment.username), keyword) ||
  includes(toLowerCaseForFilter(assignment.assignmentNote), keyword);

const filterRemark = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.remark || event.division || event.round) {
      return (
        includes(toLowerCaseForFilter(event.remark), keyword) ||
        includes(toLowerCaseForFilter(event.division), keyword) ||
        includes(toLowerCaseForFilter(event.round), keyword)
      );
    }
    return false;
  });
};
const filterNote = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.Notes) {
      const notes = filter(event.Notes, note =>
        includes(toLowerCaseForFilter(note.Note), keyword)
      ).map(x => toLowerCaseForFilter(x.Note));
      return notes.length > 0;
    }
    return false;
  });
};
const filterLA = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.lA) {
      const assignments = filter(event.lA, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterHandicap = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.handicap) {
      const assignments = filter(event.handicap, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterOverUnder = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.overUnder) {
      const assignments = filter(event.overUnder, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterHandicap1st = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.handicap1st) {
      const assignments = filter(event.handicap1st, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterOverUnder1st = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.overUnder1st) {
      const assignments = filter(event.overUnder1st, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterOneXTwo = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.oneXTwo) {
      const assignments = filter(event.oneXTwo, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterOneXTwo1st = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.oneXTwo1st) {
      const assignments = filter(event.oneXTwo1st, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};

const filterSpecific15Mins = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.specific15Mins) {
      const assignments = filter(event.specific15Mins, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};

const filterSpecific10Mins = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.specific10Mins) {
      const assignments = filter(event.specific10Mins, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterFM = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.fM) {
      const assignments = filter(event.fM, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};
const filterAIO = (events: TDataTable, keyword: string) => {
  return filter(events, event => {
    if (event.aIO) {
      const assignments = filter(event.aIO, assignment =>
        isContainsAssignment(assignment, keyword)
      );
      return assignments.length > 0;
    }
    return false;
  });
};

const filterByColumn = (events: TDataTable, column: TColumnFilter) => {
  const keyword = toLowerCaseForFilter(column.keyword);
  if (!keyword.trim().length) {
    return events;
  }
  switch (column.columnKey) {
    case 'MatchNo':
      return filterMatchNo(events, keyword);
    case 'KickOffTime':
      return filterKickOffTime(events, keyword);
    case 'Event':
      return filterEvent(events, keyword);
    case 'TV':
      return filterTV(events, keyword);
    case 'Provider':
      return filterProvider(events, keyword);
    case 'MaxBet_Spread':
      return filterMaxbetSpread(events, keyword);
    case 'Remark':
      return filterRemark(events, keyword);
    case 'Note':
      return filterNote(events, keyword);
    case 'LA':
      return filterLA(events, keyword);
    case 'Handicap':
      return filterHandicap(events, keyword);
    case 'OverUnder':
      return filterOverUnder(events, keyword);
    case 'Handicap1st':
      return filterHandicap1st(events, keyword);
    case 'OverUnder1st':
      return filterOverUnder1st(events, keyword);
    case 'OneXTwo':
      return filterOneXTwo(events, keyword);
    case 'OneXTwo1st':
      return filterOneXTwo1st(events, keyword);
    case 'Specific15Mins':
      return filterSpecific15Mins(events, keyword);
    case 'Specific10Mins':
      return filterSpecific10Mins(events, keyword);
    case 'FM':
      return filterFM(events, keyword);
    case 'AIO':
      return filterAIO(events, keyword);
  }
  return null;
};

const handleFilterByColumn = (events: TDataTable, columnFilters: Array<TColumnFilter>) => {
  columnFilters.forEach(column => {
    events = filterByColumn(events, column);
  });
  return events;
};

const updateColumnFilter = (currentState: TColumnFilter[], newFilter: TColumnFilter) => {
  const { columnKey, keyword } = newFilter;
  const columnFilter = currentState.find(a => a.columnKey === columnKey);
  if (columnFilter) {
    columnFilter.keyword = keyword;
  } else {
    currentState.push(newFilter);
  }
};

export {
  handleFilterByColumn,
  updateColumnFilter
};
