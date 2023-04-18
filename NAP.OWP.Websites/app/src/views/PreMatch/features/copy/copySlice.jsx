import { createSlice } from '@reduxjs/toolkit';

const copySlice = createSlice({
  name: 'copy',
  initialState: {
    isCopying: false,
    copiedValue: [],
    leagueIdStart: null,
    leagueIdEnd: null,
    highlightedCell: {
      PreMatchLeagueId: [],
      isTakeOver: false
    }
  },
  reducers: {
    copyElement: {
      reducer: (state, action) => {
        const { copiedValue, isCopying, leagueId } = action.payload;
        state.isCopying = isCopying;
        state.copiedValue.push(copiedValue);
        const { leagueIdStart, leagueIdEnd } = state;
        if (!leagueIdStart) {
          state.leagueIdStart = leagueId;
          state.leagueIdEnd = leagueId;
        }
        if (leagueId < leagueIdStart) {
          state.leagueIdStart = leagueId;
        }
        if (leagueId > leagueIdEnd) {
          state.leagueIdEnd = leagueId;
        }
      }
    },
    highlightElement: {
      reducer: (state, action) => {
        const { PreMatchLeagueId, isTakeOver } = action.payload;
        state.highlightedCell.PreMatchLeagueId.push(PreMatchLeagueId);
        state.isCopying = false;
        if (isTakeOver !== state.highlightedCell.isTakeOver) {
          state.highlightedCell.PreMatchLeagueId = [];
          state.highlightedCell.PreMatchLeagueId.push(PreMatchLeagueId);
          state.highlightedCell.isTakeOver = isTakeOver;
        }
      }
    },
    resetCopyInfo: {
      reducer: state => {
        state.highlightedCell.PreMatchLeagueId = [];
        state.highlightedCell.isTakeOver = false;
        state.copiedValue = [];
        state.isCopying = false;
      }
    }
  }
});

const { actions, reducer } = copySlice;
const { copyElement, highlightElement, resetCopyInfo } = actions;
export { copyElement, highlightElement, resetCopyInfo };
export default reducer;
