import { createSlice, nanoid } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { REQUEST_STATUS } from '../../../../Shared/Constants';
import { NOTE_TYPE } from '../../../const/const';
import {
  changeExpandStateAllLeague,
  changeExpandStateOneLeague,
  changeOpenNoteStateOneLeague,
  changeOpenNoteStateOneMatch,
  clearState,
  mergeMatchesToLeagues,
  pasteCopied,
  pasteMultipleValue,
  sortLeaguesByColumnKey,
  sortLeaguesByDefault,
  updateLeagueData
} from './shiftHelper';
import {
  getAssignedLeagueId,
  getShiftByDateAndEmployee,
  restoreDeletedLeague
} from './shiftThunkNative';

const shiftSlice = createSlice({
  name: 'dayShift',
  initialState: {
    entities: [],
    matches: [],
    leagues: [],
    loading: REQUEST_STATUS.idle,
    currentRequestId: null,
    error: null,
    sortState: {},
    prematchIdUpdated: [],
    prematchIdDeleted: [],
    validateResult: {
      passed: true,
      message: ''
    },
    recoverStatus: '',
    isExpandAll: false,
    isShowUnreadMessage: false,
    tableKey: nanoid(),
    assignedLeagueId: {}
  },

  reducers: {
    updatePrematch: {
      reducer: (state, action) => {
        const { rowIndex, newValue, key } = action.payload;
        const newLeague = {
          index: rowIndex,
          objectKey: key,
          newValue
        };
        updateLeagueData(
          state.leagues,
          state.entities,
          state.prematchIdUpdated,
          newLeague
        );
      }
    },
    sortByColumnKey: {
      reducer: (state, action) => {
        const { columnKey, orderType, tableKey } = action.payload;
        state.tableKey = tableKey;
        state.sortState = { columnKey, orderType };
        state.leagues = sortLeaguesByColumnKey(
          state.leagues,
          columnKey,
          orderType
        );
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    sortByDefault: state => {
      state.leagues = sortLeaguesByDefault(state.leagues);
      state.entities = mergeMatchesToLeagues(
        state.matches,
        state.leagues,
        state.isShowUnreadMessage
      );
    },
    deleteRow: {
      reducer: (state, action) => {
        const { preMatchLeagueId } = action.payload;
        const { entities, prematchIdDeleted, leagues, matches } = state;
        state.entities = entities.filter(
          e => !isEqual(e.PreMatchLeagueId, preMatchLeagueId)
        );
        state.leagues = leagues.filter(
          l => !isEqual(l.PreMatchLeagueId, preMatchLeagueId)
        );
        state.matches = matches.filter(
          m => !isEqual(m.PreMatchLeagueId, preMatchLeagueId)
        );
        prematchIdDeleted.push(preMatchLeagueId);
      }
    },
    pasteCopiedValue: {
      reducer: (state, action) => {
        pasteCopied(
          state.leagues,
          state.entities,
          state.prematchIdUpdated,
          action.payload
        );
      }
    },
    pasteCopiedMultipleValue: {
      reducer: (state, action) => {
        pasteMultipleValue(
          state.leagues,
          state.entities,
          state.prematchIdUpdated,
          action.payload
        );
      }
    },
    clearStateDayShift: {
      reducer: state => clearState(state)
    },
    clearStateNightShift: {
      reducer: state => clearState(state)
    },
    restore: {
      reducer: (state, action) => {
        state.entities.push(action.payload);
      }
    },
    clearEntities: {
      reducer: state => {
        state.entities.length = 0;
        state.sortState.length = 0;
      }
    },
    changeStatePopupLeagueNote: {
      reducer: (state, action) => {
        const { PreMatchLeagueId, openState } = action.payload;
        changeOpenNoteStateOneLeague(
          state.leagues,
          state.matches,
          PreMatchLeagueId,
          openState
        );
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    changeStatePopupMatchNote: {
      reducer: (state, action) => {
        const { InfoSiteMatchId, openState } = action.payload;
        changeOpenNoteStateOneMatch(
          state.leagues,
          state.matches,
          InfoSiteMatchId,
          openState
        );
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    collapseOneLeague: {
      reducer: (state, action) => {
        const PreMatchLeagueId = action.payload;
        changeExpandStateOneLeague(state.leagues, PreMatchLeagueId, false);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    expandOneLeague: {
      reducer: (state, action) => {
        const PreMatchLeagueId = action.payload;
        changeExpandStateOneLeague(state.leagues, PreMatchLeagueId, true);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    collapseAllLeague: {
      reducer: state => {
        state.isExpandAll = false;
        changeExpandStateAllLeague(state.leagues, false);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    expandAllLeague: {
      reducer: state => {
        state.isExpandAll = true;
        changeExpandStateAllLeague(state.leagues, true);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    showUnreadMessageOnly: {
      reducer: state => {
        state.isShowUnreadMessage = true;
        state.isExpandAll = true;
        changeExpandStateAllLeague(state.leagues, true);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    unShowUnreadMessageOnly: {
      reducer: state => {
        state.isExpandAll = false;
        state.isShowUnreadMessage = false;
        changeExpandStateAllLeague(state.leagues, false);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    updatedIconIssueLeagueRow: {
      reducer: (state, action) => {
        const { PreMatchLeagueId, TicketId } = action.payload;
        const league = state.leagues.find(
          l => l.PreMatchLeagueId === PreMatchLeagueId
        );
        league.TicketList.find(m => m.TicketId === TicketId).IsRead = true;
        league.IsRead = league.TicketList.every(x => x.IsRead);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    updatedIconIssueMatchRow: {
      reducer: (state, action) => {
        const { InfoSiteMatchId, TicketId } = action.payload;
        const match = state.matches.find(
          m => m.InfoSiteMatchId === InfoSiteMatchId
        );
        match.TicketList.find(m => m.TicketId === TicketId).IsRead = true;
        match.IsRead = match.TicketList.every(x => x.IsRead);
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    addIssueIdToLeague: {
      reducer: (state, action) => {
        const { newCreatedIssueId, LeagueId } = action.payload;
        const league = state.leagues.find(l => l.LeagueId === LeagueId);

        league.PreMatchIssueId = newCreatedIssueId;
        league.HasMessages = true;
        league.IsRead = true;

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    addIssueIdToMatch: {
      reducer: (state, action) => {
        const { newCreatedIssueId, InfoSiteMatchId } = action.payload;
        const match = state.matches.find(
          m => m.InfoSiteMatchId === InfoSiteMatchId
        );

        match.PreMatchIssueId = newCreatedIssueId;
        match.HasMessages = true;
        match.IsRead = true;

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    changeRowHightLevelWhenPrepareTyping: {
      reducer: (state, action) => {
        const { PreMatchLeagueId, stateButtonPlus } = action.payload;
        const league = state.leagues.find(
          m => m.PreMatchLeagueId === PreMatchLeagueId
        );

        league.isInputTyping = stateButtonPlus;

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    updateIconNoteToPencil: {
      reducer: (state, action) => {
        const { key, value } = action.payload;
        const target = isEqual(key, NOTE_TYPE.LEAGUE)
          ? state.leagues.find(l => l.LeagueId === value)
          : state.matches.find(m => m.InfoSiteMatchId === value);
        target.PreMatchNoteId = null;
        target.HasNotes = false;
        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    addNoteIdToLeague: {
      reducer: (state, action) => {
        const { newCreatedNoteId, LeagueId } = action.payload;
        const league = state.leagues.find(l => l.LeagueId === LeagueId);
        league.PreMatchNoteId = newCreatedNoteId;
        league.HasNotes = true;

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    addNoteIdToMatch: {
      reducer: (state, action) => {
        const { newCreatedNoteId, InfoSiteMatchId } = action.payload;
        const match = state.matches.find(
          m => m.InfoSiteMatchId === InfoSiteMatchId
        );

        match.PreMatchNoteId = newCreatedNoteId;
        match.HasNotes = true;

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    },
    reloadTicketInTable: {
      reducer: (state, { payload }) => {
        const { id, isTicketLeague, ticketList } = payload;
        if (isTicketLeague) {
          const findLeague = state.leagues.find(
            league => league.LeagueId === id
          );
          if (findLeague) {
            findLeague.HasMessages = ticketList.length > 0;
            findLeague.TicketList = ticketList;
            findLeague.IsRead = ticketList.every(ticket => ticket.IsRead);
          }
        } else {
          const findMatch = state.matches.find(
            match => match.InfoSiteMatchId === id
          );
          if (findMatch) {
            findMatch.HasMessages = ticketList.length > 0;
            findMatch.TicketList = ticketList;
            findMatch.IsRead = ticketList.every(ticket => ticket.IsRead);
          }
        }

        state.entities = mergeMatchesToLeagues(
          state.matches,
          state.leagues,
          state.isShowUnreadMessage
        );
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getShiftByDateAndEmployee.pending, (state, action) => {
        const { loading } = state;
        if (isEqual(loading, REQUEST_STATUS.idle)) {
          state.loading = REQUEST_STATUS.pending;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getShiftByDateAndEmployee.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loading, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.loading = REQUEST_STATUS.idle;
          state.entities.length = 0;
          const { InfoSiteMatches, PreMatchLeagues } = action.payload;

          state.leagues = [...[], ...PreMatchLeagues];
          state.matches = [...[], ...InfoSiteMatches];

          changeExpandStateAllLeague(state.leagues, state.isShowUnreadMessage);

          state.entities = mergeMatchesToLeagues(
            state.matches,
            state.leagues,
            state.isShowUnreadMessage
          );
          state.currentRequestId = null;
        }
      })
      .addCase(getShiftByDateAndEmployee.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          isEqual(state.loading, REQUEST_STATUS.pending) &&
          isEqual(state.currentRequestId, requestId)
        ) {
          state.loading = REQUEST_STATUS.idle;
          state.error = action.error;
          state.currentRequestId = null;
        }
      })
      .addCase(restoreDeletedLeague.pending, state => {
        const { loading } = state;
        if (isEqual(loading, REQUEST_STATUS.idle)) {
          state.loading = REQUEST_STATUS.pending;
        }
      })
      .addCase(restoreDeletedLeague.fulfilled, (state, action) => {
        if (isEqual(state.loading, REQUEST_STATUS.pending)) {
          state.loading = REQUEST_STATUS.idle;
          if (action.payload) {
            const { InfoSiteMatches, PreMatchLeagues } = action.payload;
            PreMatchLeagues[0].No = state.leagues.length + 1;
            state.leagues.push(PreMatchLeagues[0]);
            state.matches.push(...InfoSiteMatches);
            state.entities = mergeMatchesToLeagues(
              state.matches,
              state.leagues,
              state.isShowUnreadMessage
            );
          }
        }
      })
      .addCase(restoreDeletedLeague.rejected, (state, action) => {
        if (isEqual(state.loading, REQUEST_STATUS.pending)) {
          state.loading = REQUEST_STATUS.idle;
          state.error = action.error;
        }
      })
      .addCase(getAssignedLeagueId.fulfilled, (state, action) => {
        state.assignedLeagueId = action.payload;
      });
  }
});

const { actions, reducer } = shiftSlice;
const {
  sortByColumnKey,
  pasteCopiedValue,
  pasteCopiedMultipleValue,
  deleteRow,
  updatePrematch,
  restore,
  clearEntities,
  clearStateDayShift,
  clearStateNightShift,
  collapseAllLeague,
  expandAllLeague,
  collapseOneLeague,
  expandOneLeague,
  updatedIconIssueLeagueRow,
  updatedIconIssueMatchRow,
  addIssueIdToMatch,
  addIssueIdToLeague,
  showUnreadMessageOnly,
  unShowUnreadMessageOnly,
  changeRowHightLevelWhenPrepareTyping,
  addNoteIdToLeague,
  addNoteIdToMatch,
  changeStatePopupLeagueNote,
  changeStatePopupMatchNote,
  updateIconNoteToPencil,
  sortByDefault,
  reloadTicketInTable
} = actions;
export {
  actions,
  addIssueIdToLeague,
  addIssueIdToMatch,
  addNoteIdToLeague,
  addNoteIdToMatch,
  changeRowHightLevelWhenPrepareTyping,
  changeStatePopupLeagueNote,
  changeStatePopupMatchNote,
  clearEntities,
  clearStateDayShift,
  clearStateNightShift,
  collapseAllLeague,
  collapseOneLeague,
  deleteRow,
  expandAllLeague,
  expandOneLeague,
  getShiftByDateAndEmployee,
  pasteCopiedMultipleValue,
  pasteCopiedValue,
  reloadTicketInTable,
  restore,
  restoreDeletedLeague,
  showUnreadMessageOnly,
  sortByColumnKey,
  sortByDefault,
  unShowUnreadMessageOnly,
  updateIconNoteToPencil,
  updatePrematch,
  updatedIconIssueLeagueRow,
  updatedIconIssueMatchRow
};

export default reducer;
